const express = require('express');

const path = require('path');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const morgan = require('morgan');
const cors = require('cors');
const getUser = require('../middlewares/getUser');

const sessionConfig = {
  store: new FileStore(),
  name: process.env.SESSION_COOKIE,
  secret: process.env.SESSION_SECRET ?? 'G(8x>|Ai^"+&',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    // maxAge: 10000,
    httpOnly: true,
  },
};

function config(app) {
  app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }));
  app.use(express.static(path.resolve('public')));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json({ limit: '1mb' }));
  app.use(session(sessionConfig));
  app.use(morgan('dev'));
  app.use(getUser);
}

module.exports = config;
