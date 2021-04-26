const express = require('express');
const routes = require('./routes');
const passport = require('passport');
require('dotenv').config();
require('./auth')(passport);
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', '*');
    // res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
  });

app.listen(process.env.PORT || 3333);