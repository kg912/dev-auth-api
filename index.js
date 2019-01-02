//Main starting point of the app
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser"); //middleware
const morgan = require("morgan"); //middleware
const router = require("./router");
const mongoose = require("mongoose");

const app = express();

//morgan -> logging framework

//DB setup
mongoose.connect(
	process.env.MONGO_URL,
  { useNewUrlParser: true }
);

// App setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: "*/*" })); //parse all requests as json
router(app);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Server listening on: ${port}`);
