import express from 'express'
import {getReviews,getReviewsByTitleId,addReview,deleteReview,getReviewsByUser,editReview} from '../controllers/reviewsController.js'

const router = express.Router()

router.get('/',getReviews)         //getting all the reviews
router.get('/review/:id', getReviewsByUser)  // get all reviews for a specific user
router.get('/:title_id',getReviewsByTitleId)     // getting review with title id
router.post('/',addReview)    //  add a review
router.put('/:id',editReview)  //update a review
router.delete('/:review_id',deleteReview)  //deleting a review    

export default router