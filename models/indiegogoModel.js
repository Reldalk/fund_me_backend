'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const indiegogoSchema = mongoose.Schema({
  title : {type: String},
  goal : {type: Number},
  urls : {type: String},
  category : {type: String},
  usd_pledged : {type: Number},
});

indiegogoSchema.methods.serialize = function() {
  return {
    name: this.title,
    goal: this.goal,
    url: this.urls,
    category : this.category,
    usd_pledged : this.usd_pledged,
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.
const Indiegogo = mongoose.model('Indiegogo', indiegogoSchema);

module.exports = { Indiegogo };