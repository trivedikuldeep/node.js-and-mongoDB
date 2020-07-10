require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
//routers
const fetchRouter = require("./route");

// DB CONN
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

// PORT
port = process.env.PORT || 3000;

// MIDDLEWARES
app.use(
  bodyParser.json({
    type: "application/json",
  })
);
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

//ROUTERS
app.use("/", fetchRouter);

// SERVER
app.listen(port, () => console.log(`app running on ${port}`));
