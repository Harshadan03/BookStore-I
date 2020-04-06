const express = require('express')
const router = express.Router()

//import middleware to ensure category only accessed by admin
const { requireSignIn } = require('../controller/auth')

const { bookById, createBook, bookPhoto, listOfBooks, readBook } = require('../controller/book')



//get a book
router.get('/book/:bookId', readBook)

// Create a book
router.post('/book/create', requireSignIn, createBook)

//get all books
router.get('/books', listOfBooks)

//send book photo
router.get('/book/photo/:bookId', bookPhoto)


router.param("bookId", bookById)

module.exports = router 
