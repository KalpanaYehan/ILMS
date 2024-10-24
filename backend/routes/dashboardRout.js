import express from "express";
import {
  getBookCountByCategory,
   getOverdueBooks,
  getBookAcquisitionByYear ,
   getTotalBooks,
   getTotalUsers,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/categories/book-count", getBookCountByCategory); //  get the number of books in each category
 router.get("/overdue-books", getOverdueBooks); // get all overdue books
 router.get("/book-acquisition", getBookAcquisitionByYear ); // get the number of books acquired for 5 years
router.get("/total-books", getTotalBooks); // get the total number of books in the library
router.get("/total-users", getTotalUsers); // get the total number of members where role is equal to user

export default router;
