const Review = require("../models/book_review")

const review_controller={}
// review
review_controller.getReview=async(req,res)=>{
    try {
        const result=await Review.find({book:req.query.book}).populate('user',"-password")
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

// post review
review_controller.postReview=async(req,res)=>{
    try {
        const {body}=req
        body.user=req.user.id
        
        const result=await(await Review.create(body)).populate('user',"-password")
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

module.exports=review_controller
