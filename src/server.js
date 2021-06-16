var express = require("express");
var dotenv = require("dotenv").config();
var cors = require ("cors");

var routes = require("./routes.js") ;

var app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 5000, function () {
  console.log(`Listening ${process.env.PORT || 5000}`);
});
