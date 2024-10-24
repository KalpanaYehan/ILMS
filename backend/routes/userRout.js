import express from "express";
import {
  getUserById,
  getBookById,
  getIssueDetails,
  postIssueDetails,
  returnBook,
} from "../controllers/userController.js";
const router = express.Router();

// getting user details of current user according to the id
router.get("/user/:id", getUserById);
router.get("/book/:id", getBookById);
router.get("/issue", getIssueDetails);
router.post("/issue", postIssueDetails);
router.post("/return", returnBook);

export default router;
