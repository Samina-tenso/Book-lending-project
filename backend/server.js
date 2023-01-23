const db = require("./models")
require('dotenv').config();
const userController = require("./controllers/user.controller")
const sequelize = require('sequelize')
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require('./routes/user.routes')
const cors = require("cors");
const app = express();
let corsOptions = {
    origin: "http://localhost:5173"
};

app.use(cors(corsOptions));

app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
    );
    next();
});
//parse req for content-type application-json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
//login
app.use(bodyParser.urlencoded({ extended: true }))
//simple route


app.use(userRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to the book-lending-application" });
// });
//require('./routes/user.routes')(app)
//connects async to the databse and then the express server starts
const run = async () => {
    // const user = await userController.signup({
    //     "email": "test1.new@gmail.com",
    //     "username": "testname",
    //     "password": "testpass",
    // })
    // console.log(user)


    userController.joinUserBook(2, 1,
        {
            "title": "test2",
            "isbnNo": "1234567891234",
            "genre": "Tragedy",
            "author": "testauthor",
            "description": "second book",
            "image": "http://google@imageurl.com"

        })
    userController.findUsersWithBook(1)

}
db.sequelize.sync().then(() => {
    console.log("Synced db.")
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`)
    });

}).catch((err) => {
    console.log("Failed to sync db:" + err.message)
});