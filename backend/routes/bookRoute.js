import express from "express";
import { getBookById } from "../controllers/bookController.js";
const router = express.Router();

// getting user details of current user according to the id
router.get("/:id", getBookById);

export default router;
