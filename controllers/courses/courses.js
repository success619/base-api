"use strict";
import express from "express";
import bcrypt from "bcrypt";
import db from "../../database/db.js";
import jwtAuth from "../../middlewares/jwt.js";
const courses = express.Router();
export default courses;
