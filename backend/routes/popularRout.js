import express from "express";
import {
  getPopularCategoriesByYear,
  getPopularCategoriesByMonth,
  getPopularCategoriesByWeek,
  getPopularAuthorsByYear,
  getPopularAuthorsByMonth,
  getPopularAuthorsByWeek
} from "../controllers/popularController.js";


const router = express.Router();

// popular categories
router.get('/popular-categories/year', getPopularCategoriesByYear);
router.get('/popular-categories/month', getPopularCategoriesByMonth);
router.get('/popular-categories/week', getPopularCategoriesByWeek);
// popular authors
router.get('/popular-authors/year', getPopularAuthorsByYear);
router.get('/popular-authors/month', getPopularAuthorsByMonth);
router.get('/popular-authors/week', getPopularAuthorsByWeek);


export default router;