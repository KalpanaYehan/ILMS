import express from 'express'
import {addBook,getBooks,getBookById,editBook,deleteBook} from '../controllers/booksController.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post('/',addBook)
router.get('/',getBooks)
router.get('/:id',getBookById)
router.put('/:id',editBook)
router.delete('/:id',deleteBook)

export default router