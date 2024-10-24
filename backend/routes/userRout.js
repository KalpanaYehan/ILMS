import express from "express";
import { getUserById } from "../controllers/userController.js";
const router = express.Router();

// getting user details of current user according to the id
router.get('/:id',getUserById);

export default router;