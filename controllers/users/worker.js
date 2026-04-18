"use strict";
import express from "express";
const instructor = express.Router();
instructor.get("/test", async (req, res) => {
    res.json("woker in users got it");
});
export default instructor;
