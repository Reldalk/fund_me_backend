'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

mongoose.Promise = global.Promise;

const localStrategy = require('./passport/local');
const jwtStrategy = require('./passport/jwt');

const { PORT, DATABASE_URL } = require('./config');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const databaseRouter = require('./routes/databases');
const query = require('./routes/query');

const app = express();
app.use(cors());
app.use(express.json());

passport.use(localStrategy);
passport.use(jwtStrategy);

app.use('/user', usersRouter);
app.use('/login', authRouter);
app.use('/query', query);
app.use('/', databaseRouter);


app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status) {
    const errBody = Object.assign({}, err, { message: err.message });
    res.status(err.status).json(errBody);
  } else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

let server;

function runServer(databaseUrl, port = PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl, { useNewUrlParser: true},
      err => {
        if (err) {
          return reject(err);
        }
        server = app
          .listen(port, () => {
            console.log(`Your app is listening on port ${port}`);
            resolve();
          })
          .on('error', err => {
            mongoose.disconnect();
            reject(err);
          });
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

if (require.main === module) {
  runServer(DATABASE_URL).catch(err => console.error(err));
}

module.exports = { app, runServer, closeServer };