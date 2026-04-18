"use strict";
import express from "express";
import db from "../../database/db.js";

const logout = express.Router();

logout.post("/logout", async (req, res) => {
    const isProduction = process.env.NODE_ENV === "production";
    await res.clearCookie("auth", {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax" // Recommended: helps mitigate CSRF attacks
    }); // Ensure options match
    res.json({ success: true });
});
export default logout;
