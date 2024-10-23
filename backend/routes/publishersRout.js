import express from 'express'
import { addPublisher,getPublishers,getPublisherById,editPublisher,deletePublisher } from '../controllers/publishersController.js'
import { verifyUser } from '../middlewares/verifyUser.js'


const router = express.Router()

router.post('/',addPublisher)
router.get('/',getPublishers)
router.get('/:id',getPublisherById)
router.put('/:id',editPublisher)
router.delete('/:id',deletePublisher)

export default router