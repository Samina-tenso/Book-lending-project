const db = require('../models')
const User = db.users;
const Book = db.books;
const { userBooks, sequelize } = require('../models');
const { Op } = require("sequelize")
const Application = db.application;

const createBook = async (req, res) => {
    try {
        const book = await Book.findOrCreate({
            where: {
                title: req.body.title,
                isbnNo: req.body.isbnNo,
                genre: req.body.genre,
                author: req.body.author,
                description: req.body.description,
                image: req.body.image,
            }, default: {
                title: req.body.title,
                isbnNo: req.body.isbnNo,
                genre: req.body.genre,
                author: req.body.author,
                description: req.body.description,
                image: req.body.image,
            }
        })
        if (book) {
            return res.status(200).send({
                book, message: "book was created"
            })
        } else {
            console.log(error.message)
            return res.status(409).send({
                message: error.message || " Some error occured when registering book"
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}
//does req contain user_id and book_id and book object?
const joinUserBook = async (req, res) => {
    const { isbnNo } = req.body
    const { id } = req.user
    try {
        await createBook(req)
        const book = await Book.findOne({ where: { isbnNo: isbnNo } })
        if (!book) {
            res.status(404).send("book not found");
        }
        const user = await User.findOne({ where: { id: id } })
        if (!user) {
            res.status(404).send("user not found");
        }
        try {
            user.addBook(book, { through: db.userBooks });
            console.log(`added book ${book.title} for user ${user.dataValues.id}`)
            res.status(200).send(user)
        } catch (error) {
            console.log(error.message)
        }
    } catch (error) {
        console.log(error.message)
    }
}
//lookup users/lenders with book return list of users/lenders and book

const findUsersWithBook = async (req, res) => {
    try {
        const user_id = req.user.id
        const { id } = req.params
        console.log(req.params.id)
        const { rows } = await userBooks.findAndCountAll({ where: { book_id: id, [Op.not]: { user_id: user_id } }, limit: 10 })
        if (rows) {
            let promise = rows.map((item) => {
                let lender = item.dataValues.user_id
                return Application.create({
                    lender_id: lender,
                    lendee_id: user_id,
                    book_id: id,
                }).then((response) => {
                    return response
                })
            })
            Promise.all(promise).then(function (response) {
                res.status(201).send(response)
            })
        } else {
            res.status(404).send(`no users found for book with id ${book_id}`)
        }
    } catch (error) {
        console.log(error.message)
    }
}

//const respondents (list of users+ book to frontend)
const getUserBooks = async (req, res) => {
    const { id } = req.user
    try {
        const books = await Book.findAll({ include: { model: User, as: 'users', where: { id: id } } })
        if (!books) {
            return res.status(404).send("books not found")
        } console.log(books)
        return res.status(201).send(books)
    } catch (error) {
        console.log(error.message)
    }
}

const getAvailableBooks = async (req, res) => {
    try {
        const books = await Book.findAll({ include: { model: userBooks, where: { status: "AV" } } })
        if (!books) {
            return res.status(404).send("no available books found")
        } return res.status(201).send(books)

    } catch (error) {
        console.log(error.message)
    }
}
//in frontend go throguh list of users - add object- new req- book id/user(lendee) accept/deny
const findUserApplications = async (req, res) => {
    const { id } = req.user
    try {
        const applications = await Application.findAll({ where: { lender_id: id } })
        if (!applications) {
            return res.status(404).send("No applications found")
        } console.log(applications)
        return res.status(201).send(applications)
    } catch (error) {
        console.log(error.message)
    }
}

//on user(lender)send req accepted

//approval check request table ( req id) change req to approved remove req with same user2 and bookid
//set book status to NA for U1 in lookup table
//return book id UserID for user 1 
//return request accepted
module.exports = {
    joinUserBook,
    findUsersWithBook,
    getUserBooks,
    getAvailableBooks,
    findUserApplications
}
