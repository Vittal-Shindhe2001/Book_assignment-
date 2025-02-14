const express = require('express')
const count = require('../middleware/count')
const router = express.Router()
const authenticateUser = require('../middleware/authentication')
const authorizeUser = require('../middleware/authorization')
const userController = require('../app/controller/user_controller')
const book_controler = require('../app/controller/book_controller')
const review_controller = require('../app/controller/review_controlle')
const multer=require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Files will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    },
  })

  // Multer upload instance
const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
  });


// user routes
router.post('/user/signup', count, userController.signup)
router.post('/user/signin', userController.signin)
// GET /users/:id - Retrieve user profile
router.get('/users/:id', authenticateUser,userController.info)
// PUT /users/:id - Update user profile
router.put('/users/:id', authenticateUser,userController.update)


// book routes
// GET /books - Retrieve all books (with pagination)
router.get('/books', authenticateUser,book_controler.allbooks)
// GET /books/:id - Retrieve a specific book
router.get('/books/:id', authenticateUser,book_controler.specified_book)
// POST /books - Add a new book (admin only)
router.post('/books',authenticateUser, (req, res, next) => {    
    req.permittedRoles = ['admin']
    next()
}, authorizeUser,upload.single('coverImage'),book_controler.add_book)
// search
router.get('  ',authenticateUser,book_controler.search)
// GET /reviews - Retrieve reviews for a book
router.get('/reviews', authenticateUser,review_controller.getReview)
// POST /reviews - Submit a new review
router.post('/reviews', authenticateUser,review_controller.postReview)

module.exports = router