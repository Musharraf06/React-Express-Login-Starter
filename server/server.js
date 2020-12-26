require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const indexRouter = require("./routes");
const SESS_AGE = 1000 * 60 * 60 * 2; // 2hours

// Setting up the database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Connected to the database");
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
      maxAge: SESS_AGE,
      sameSite: true,
    },
  })
);

// Routes
app.use("/", indexRouter);

app.listen("5000", () => {
  console.log("Listening at port 5000");
});
