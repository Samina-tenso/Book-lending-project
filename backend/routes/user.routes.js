


const userAuth = require('../middelware/userAuth')
const authJWT = require('../middelware/authJwt')
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const { signup, signin } = authController
const { joinUserBook, findUsersWithBook, getUserBooks, getAvailableBooks } = userController
const userRouter = require('express').Router()
userRouter.post("/auth/signup", userAuth.checkDuplicateUsernameOrEmail, signup)
userRouter.post("/auth/signin/", signin)
userRouter.get("/my-shelf/:username/get-books", authJWT.verifyToken, getUserBooks)// get list of books by user
userRouter.get("/my-shelf/:username/get-books-available", authJWT.verifyToken, getAvailableBooks)//add constroller function 
userRouter.post("/my-shelf/:username/books/add-book", authJWT.verifyToken, joinUserBook)
userRouter.get("/my-shelf/:username/find-lenders", authJWT.verifyToken, findUsersWithBook)// get list of books by user



module.exports = userRouter

// signup endpoint