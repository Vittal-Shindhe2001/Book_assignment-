const Book = require("../models/book")
const fs=require('fs')

const book_controller = {}

book_controller.allbooks = async (req, res) => {
    try {
        const result = await Book.find()
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}

// specified book
book_controller.specified_book = async (req, res) => {
    try {
        const { id } = req.params
        
        const result = await Book.findById({_id:id})        
        res.json(result)
    } catch (error) {
        res.json(error)
    }
}
// add book
book_controller.add_book = async (req, res) => {
    try {
        const coverImage = req.file?.path
        const { body } = req
        body.user=req.user.id
        const result = await Book.create({...body,coverImage })
        res.json(result)
    } catch (error) {
        if (req.file?.path) fs.unlinkSync(req.file?.path)
        res.json(error)
    }
}

book_controller.search=async(req,res)=>{
    try {
        const {search}=req.query        
        const books=await Book.aggregate(
            [
                {$match: { title: { $regex: search, $options: "i" } }}
        ])
        res.json(books)
    } catch (error) {
        res.json(error)
        
    }
}

module.exports = book_controller