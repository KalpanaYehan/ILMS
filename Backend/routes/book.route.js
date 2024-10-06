import express from 'express';
const router = express.Router();
import { getBook, getBooks } from '../controllers/book.controller.js';

// Endpoints
router.get('/', getBooks);
router.get('/:id', getBook);

export default router;

