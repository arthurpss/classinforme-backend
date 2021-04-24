const express = require('express');
const routes = require('./routes');
const passport = require('passport');
require('dotenv').config();
require('./auth')(passport);
const cors = require('cors');
// const flash = require('express-flash');

const session = require('express-session')({
    key: "user_sid",
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 60 * 1000 }//30min
});

const app = express();

app.use(express.json());
app.use(cors());
// app.use(flash());
// app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

// This middleware will check if user's cookie is still saved in browser and user is not set, then automatically log the user out.
// This usually happens when you stop your express server after login, your cookie still remains saved in the browser.
/* app.use((req, res, next) => {
    if (req.cookies.user_sid && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});
 */
app.listen(process.env.PORT || 3333);