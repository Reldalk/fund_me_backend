'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const kickstarterSchema = mongoose.Schema({
  name : {type: String},
  goal : {type: Number},
  urls : {type: String},
  category : {type : String},
  usd_pledged : {type : Number},
  backers_count : {type : Number}


  // grades will be an array of objects
});

kickstarterSchema.methods.serialize = function() {
  return {
    name: this.name,
    goal: this.goal,
    url : this.urls,
    category : this.category,
    usd_pledged : this.usd_pledged,
    backers_count : this.backers_count
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Kickstarter = mongoose.model('Kickstarter', kickstarterSchema);

module.exports = { Kickstarter };