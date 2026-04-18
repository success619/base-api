"use strict";
import express from "express";
import createDOMPurify from "dompurify";
import jsdom from "jsdom";
import fs from "fs";
import db from "../../database/db.js";
const summariesRoute = express.Router();
const { JSDOM } = jsdom;
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const isProd = process.env.NODE_ENV === "production";

summariesRoute.get(
  "/get-topics-title-for-summary/:course_id",
  async (req, res) => {
    const course_id = req.params.course_id;
    db("topics")
      .select("topic", "topic_id")
      .where("course_id", course_id)
      .then((topics) => {
        db("summaries")
          .select("topic_id", "course_id")
          .where("course_id", course_id)
          .then((summa) => {
            let filteredTopics = [];
            for (let i = 0; i < topics.length; i++) {
              const x = topics[i];
              const y = summa.includes(x.topic_id);
              if (!y) filteredTopics.push(x);
              else return;
            }
            res.status(200).json(filteredTopics);
          })
          .catch(() => res.status(400).json("error getting topics"));
      })
      .catch(() => res.status(400).json("error getting topics"));
  },
);

summariesRoute.post("/new/submit", async function (req, res) {
  const { course_id, topic_id, tags, sections, readingTime, user_id } =
    req.body;
  const finalSections = DOMPurify.sanitize(JSON.stringify([...sections]));
  const finalTags = DOMPurify.sanitize(JSON.stringify(tags));
  let finalSummaryContent = `{
      sections: ${finalSections},
      readingTime: ${readingTime},
    }`;
  const fileName = `sm_${course_id}_${Date.now()}.base`;
  let dbContentPath;
  if (isProd) {
    const s3Key = `summaries/content/${fileName}`;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME.trim(),
        Key: s3Key,
        Body: finalSummaryContent,
        ContentType: "text/plain",
      }),
    );
    dbContentPath = s3Key;
  } else {
    const localPath = `public/files/summaries/${fileName}`;
    const dir = "public/files/summaries";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(localPath, finalSummaryContent);
    dbContentPath = localPath;
  }
  db("summaries")
    .insert({
      topic_id,
      course_id,
      user_id,
      summary_tags_keywords: JSON.parse(finalTags),
      summary_content_uri: dbContentPath,
      status: "pending",
      date_created: new Date(),
    })
    .returning("*")
    .then((summary) => {
      res.status(200).json(summary[0]);
    })
    .catch((err) => {
      res.status(400).json("unexpecteed error");
    });
});
export default summariesRoute;
