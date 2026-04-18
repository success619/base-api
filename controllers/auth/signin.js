"use strict";
import express from "express";
import db from "../../database/db.js";
import bcrypt from "bcrypt";
import jwtAuth from "../../middlewares/jwt.js";
const auth = express.Router();
const maxAgeDuration = 300 * 24 * 60 * 60 * 1000;
auth.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    await db("signin")
        .where("email", email)
        .select("hash")
        .then(async (hash) => {
        const isValid = await bcrypt.compare(password, hash[0].hash);
        if (isValid) {
            db("users")
                .where("email", email)
                .select("*")
                .then(user => {
                const jwt = new jwtAuth().generatedAuthToken(user[0]);
                const isProduction = process.env.NODE_ENV === "production";
                res.cookie("auth", jwt, {
                    maxAge: maxAgeDuration, // Set the cookie expiration in milliseconds
                    httpOnly: true, // Recommended: makes the cookie inaccessible to client-side JavaScript
                    secure: isProduction, // Ensures cookie is only sent over HTTPS in production, // Recommended: ensures the cookie is only sent over HTTPS (in production)
                    sameSite: isProduction ? "none" : "lax" // Recommended: helps mitigate CSRF attacks
                });
                res.json(user[0]);
            })
                .catch(err => {
                res.status(400).json({ err: "server error" });
            });
        }
        else {
            res.json({ err: "wrong credentials" });
        }
    });
});
export default auth;
