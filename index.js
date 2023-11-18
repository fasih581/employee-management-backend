const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");
const bodyparser = require("body-parser");

const connectDB = require("./server/database/connection")

const app = express();

dotenv.config({ path: "config.env" });
const PORT = process.env.PORT || 3000;

// log requests
app.use(morgan("tiny"));

// mongoDb connection
connectDB();

app.use(express.json())

// parser request to bady-parser
app.use(bodyparser.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");
//app.set("views", path.resolve(__dirname, "views/ejs"));

// load assets
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));

// load routers
// app.use("/", require("./server/routes/router"));
app.use("/", require("./server/routes/router"));

app.listen(PORT, () =>
  console.log(`server running on http://localhost:${PORT}`)
);
