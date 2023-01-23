const db = require('../models')
const User = db.users;
const Book = db.books;
const { userBooks } = require('../models');
const Application = db.application;


const myShelf = (req, res) => {
    console.log("myshelf")
    res.status(200).send('User shelf')

}

const createBook = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            isbnNo: req.body.isbnNo,
            genre: req.body.genre,
            author: req.body.author,
            description: req.body.description,
            image: req.body.image,
        }
        console.log(data)
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
        console.log(book, "book")
        if (book) {
            res.status(200).send(book)
        } else {
            return res.status(409).send({
                message: err.message || " Some error occured when registering book"
            })
        }

    } catch (error) {
        console.log(error.message)
    }
}
//does req contain user_id and book_id and book object?
const joinUserBook = async (req, res) => {
    console.log(req.body, "hj")
    const { isbnNo } = req.body
    console.log(isbnNo)
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
        user.addBook(book, { through: db.userBooks });
        console.log(`added book ${book.id} for user ${user.id}`)
        res.status(200).send(user)

    } catch (error) {
        console.log(error.message)
    }

}
//lookup users/lenders with book return list of users/lenders and book

const findUsersWithBook = async (req, res) => {
    try {
        const { count, rows } = await userBooks.findAndCountAll({ where: { book_id: book_id }, limit: 10 })
        console.log(count, rows)
        if (rows) {
            res.status(200).send(rows)
        } else {
            res.status(404).send(`no users found for book with id ${book_id}`)
        }
    } catch (error) {
        console.log(error.message)
    }
}
// need lender id lendee id book id 
//add a req for every user/lender+ bookid(FK) +lendeeId + date request = requested
const createApplication = async (req, res) => {
    // get user id of rows for lender 

    Application.create(data)
    try {
        const data = {
            lender_id: req.body.lender_id,
            lendee_id: req.body.lendee_id,
            book_id: req.body.book_id,
            status: req.body.status,
        }
        console.log(data)
        const application = await Application.findOrCreate(data)
        console.log(application, "application")
        if (application) {
            res.status(200).send(application)
        } else {
            return res.status(409).send({
                message: err.message || " Some error occured when registering application"
            })
        }
    } catch (error) {
        console.log(error)
    }
}
//const respondents (list of users+ book to frontend) = lookupfunction()
//
//in frontend go throguh list of users - add object- new req- book id/user(lendee) accept/deny
//on user(lender)send req accepted

//approval check request table ( req id) change req to approved remove req with same user2 and bookid
//set book status to NA for U1 in lookup table
//return book id UserID for user 1 
//return request accepted
module.exports = {
    myShelf,
    joinUserBook,
    findUsersWithBook,
    createApplication
}
