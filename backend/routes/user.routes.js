


const userAuth = require('../middelware/userAuth')
const authJWT = require('../middelware/authJwt')
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller')
const { signup, signin } = authController
const { joinUserBook, findUsersWithBook, myShelf } = userController
const userRouter = require('express').Router()
userRouter.post("/auth/signup", userAuth.checkDuplicateUsernameOrEmail, signup)
userRouter.post("/auth/signin/", signin)
userRouter.get("/myshelf/user", authJWT.verifyToken, myShelf)// get list of user books
userRouter.post("/myshelf/user", authJWT.verifyToken, joinUserBook)


module.exports = userRouter

// signup endpoint