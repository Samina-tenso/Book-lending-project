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

app.use(bodyParser.urlencoded({ extended: true }))
app.use(userRouter)

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

db.sequelize.sync().then(() => {
    console.log("Synced db.")
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}.`)
    });

}).catch((err) => {
    console.log("Failed to sync db:" + err.message)
});