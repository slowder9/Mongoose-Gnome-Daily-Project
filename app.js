const express = require("express");
const mustache = require("mustache-express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const server = express();

let Collection = require("./mongoose");

server.engine("mustache", mustache());
server.set("views", "./views");
server.set("view engine", "mustache");
server.use(express.static("views"));
server.use(bodyparser.urlencoded( { extended: false }));

mongoose.connect("mongodb://localhost:27017/collections");

server.get("/", function(req, res) {
  Collection.find()
    .then(function (collect) {
      res.render("index", {
        collection: collect,
        facts: collect,
      })
    })
    .catch(function() {
    });
});

server.post('/add', function(req, res) {
  Collection.create( {
    name: req.body.name,
    facts: [{
      amount: req.body.amount,
      hatColor: req.body.hatColor
    }],
    steps: req.body.steps
  })
    .then(function(){
      console.log("added")
      res.redirect("/");
    })
    .catch(function(err) {
      console.log("err");
    })
})

server.post("/delete/:id", function(req, res) {
  console.log(req.params.id)
  Collection.deleteOne({ _id: req.params.id })
    .then(function(){
      console.log("deleted")
      res.redirect("/");
    })
    .catch(function(){
      console.log("err");
    })
})

server.listen(3000, function() {
    console.log("Server Listening");
});