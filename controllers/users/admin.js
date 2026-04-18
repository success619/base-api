"use strict";
import express from "express";
const admin = express.Router();
admin.get("/test", async (req, res) => {
    res.json("admin in users got it");
});
export default admin;
