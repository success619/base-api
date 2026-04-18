"use strict";
import express from "express";
import bcrypt from "bcrypt";
import db from "../../database/db.js";
import jwtAuth from "../../middlewares/jwt.js";
const student = express.Router();
student.post("/changetoinstructor", async (req, res) => {
    await db("users")
        .where("email", req.body.email)
        .update({
        role: "student"
    })
        .returning("*")
        .then(user => {
        console.log(user);
        res.json(user);
    });
});
export default student;
