'use strict';

const express = require('express');

const Query = require('../models/queryModel');

const router = express.Router();

router.post('/', (req, res, next) => {
  const title = req.body.title;
  const description = req.body.description;
  const requiredFields = ['title', 'description'];
  const missingField = requiredFields.find(field => !(field in req.body));
  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['title', 'description'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  // of security by storing extra **unused** info
  const sizedFields = {
    title: {min: 1 },
    description: {min: 1}
  };
  
  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] &&
        req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmallField) {
    const err = new Error(`Field: '${tooSmallField}' can not be empty`);
    err.status = 422;
    return next(err);
  }

  const newQuery = {
    title,
    description
  };
  Query.create({});
  return Query.create(newQuery, () => console.log('trial'))
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('The query title already exists');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;