require("dotenv").config();

const path = require("path");
const logger = require('morgan');
const parser = require( "body-parser" );
const expressValidator = require("express-validator");
const session = require("express-session");
const flash = require("express-flash");
const passportConfig = require("./passport-config");

module.exports = {
  init(app, express){

  app.use(expressValidator());
  app.use(logger('dev'));
  }
};
