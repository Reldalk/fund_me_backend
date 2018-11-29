'use strict';

const mongoose = require('mongoose');

// this is our schema to represent a restaurant
const querySchema = new mongoose.Schema({
  title : {type: String, required: true},
  description : {type: String, required: true}
});

querySchema.methods.serialize = function() {
  return {
    title: this.title,
    description: this.description
  };
};

// note that all instance methods and virtual properties on our
// schema must be defined *before* we make the call to `.model`.

module.exports = mongoose.model('Query', querySchema);