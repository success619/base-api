"use strict";
import express from "express";
import db from "../../database/db.js";
import fs from "fs";
import jsdom from "jsdom";
import createDOMPurify from "dompurify";
const testRoute = express.Router();
const { JSDOM } = jsdom;
const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);
const isProd = process.env.NODE_ENV === "production";

testRoute.post("/new-test", async (req, res) => {
    const { title, duration, courseId, user_id, questions } = req.body;
    const course_id = courseId;
    const fileName = `ts_${course_id}_${Date.now()}.base`;
    const sanitizedQuestions = DOMPurify.sanitize(JSON.stringify(questions));
   let dbContentPath;
    if (isProd) {
      const s3Key = `tests/content/${fileName}`;
      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET_NAME.trim(),
          Key: s3Key,
          Body: sanitizedQuestions,
          ContentType: "text/plain",
        }),
      );
      dbContentPath = s3Key;
    } else {
      const localPath = `public/files/tests/${fileName}`;
      const dir = "public/files/materials";
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(localPath, sanitizedQuestions);
      dbContentPath = localPath;
    }
             db("tests")
                .insert({
                test_title: title,
                user_id,
                course_id,
                duration: parseInt(duration),
                content_uri: dbContentPath,
                status: "pending",
                date_uploaded: new Date(),
            })
                .returning("*")
                .then((test) => {
                return res.status(200).json(test[0]);
            })
                .catch((err) => console.log("unable to upload to db"));
});
export default testRoute;
