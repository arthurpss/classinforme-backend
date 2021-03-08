const express = require('express');
const routes = require('./routes');
const passport = require('passport');
require('dotenv').config();
require('./auth')(passport);
const bodyParser = require('body-parser');
const cors = require('cors');

const session = require('express-session')({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
});

const app = express();

app.use(express.json());
app.use(cors());
// app.use(express.cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(process.env.PORT || 3333);