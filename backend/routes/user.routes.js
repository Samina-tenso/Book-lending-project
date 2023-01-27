


const userAuth = require('../middelware/userAuth')
const authJWT = require('../middelware/authJwt')
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const { signup, signin } = authController
const { joinUserBook, findUsersWithBook, getUserBooks, getAvailableBooks, findUserApplications } = userController
const userRouter = require('express').Router()
userRouter.post("/signup", userAuth.checkDuplicateUsernameOrEmail, signup)
userRouter.post("/signin", signin)
userRouter.get("/my-shelf/:username/get-books", authJWT.verifyToken, getUserBooks)// get list of books by user
userRouter.get("/my-shelf/:username/get-books-available", authJWT.verifyToken, getAvailableBooks)//add constroller function 
userRouter.post("/my-shelf/:username/books/add-book", authJWT.verifyToken, joinUserBook)
userRouter.get("/my-shelf/:username/find-lenders/:id", authJWT.verifyToken, findUsersWithBook)// get list of books by user-createa application
userRouter.get("/my-shelf/:username/get-applications", authJWT.verifyToken, findUserApplications)// get list of application by 




module.exports = userRouter

// signup endpoint