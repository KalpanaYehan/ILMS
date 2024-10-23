import express from 'express'
import {addAuthor,getAuthorById,getAuthors,editAuthor,deleteAuthor} from '../controllers/authorsController.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const router = express.Router()

router.post('/',addAuthor)
router.get('/',getAuthors)
router.get('/:id',getAuthorById)
router.put('/:id',editAuthor)
router.delete('/:id',deleteAuthor)

export default router