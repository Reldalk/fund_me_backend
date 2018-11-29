'use strict';

const express = require('express');
const { Kickstarter } = require('../models/kickstarterModel');
const { Indiegogo } = require('../models/indiegogoModel');

const router = express.Router();

router.get('/Kickstarter', (req, res) => {
  let value = req.query.value;
  let data_value_obj = {};
  data_value_obj[req.query.data_value] = -1;
  
  Kickstarter.find(value === '' ? {} : {'category' : value})
    .sort(data_value_obj)
    .limit(15)   
    .then(kickstarters => {
      res.json({
        kickstarters: kickstarters.map(kickstarter => kickstarter.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});


router.get('/Indiegogo', (req, res) => {
  let value = req.query.value;
  let data_value_obj = {};
  data_value_obj[req.query.data_value] = -1;

  Indiegogo.find(value === '' ? {} : {'category' : value})
    .sort(data_value_obj)
    .limit(15)  
    .then(indiegogos => {
      res.json({
        indiegogos: indiegogos.map(indiegogo => indiegogo.serialize())
      });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ message: 'Internal server error' });
    });
});

module.exports = router;