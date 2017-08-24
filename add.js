const express = require("express");
const mustache = require("mustache-express");
const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");
const server = express();

server.engine("mustache", mustache());
server.set("views", "./views");
server.set("view engine", "mustache");
server.use(express.static("views"));

let Collection = require("./mongoose");

mongoose.connect("mongodb://localhost:27017/collections");

let collection = new Collection ({
  name: "Tyrion Lannister",
  facts: [{
    amount: 2,
    hatColor: "green"
  }],
  steps: ["Place him near rose bush."]
})

Collection.create ({
  name: "Arya Stark",
  collectorsCount: 10,
  facts: [{
    amount: 1,
    hatColor: "grey"
  }],
  steps: ["Place her near front step."]
})
  .then(function(gnomeStatus){
    console.log(gnomeStatus);
  })
  .catch(function() {
    console.log("err");
  })

Collection.create ({
  name: "Jon Snow",
  collectorsCount: 5,
  facts: [{
    amount: 2,
    hatColor: "black"
  }],
  steps: ["Place him near mailbox."]
})
  .then(function(){
    console.log("ok")
  })
  .catch(function(){
    console.log("err")
  })

collection.save()
  .then(function(gnomeStatus) {
    console.log(gnomeStatus);
  })
  .catch(function() {
    console.log("err")
  })