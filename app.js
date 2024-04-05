const express = require('express');
// const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');

const app = express();

app.use(express.static(__dirname + '/public')); //styles??? I'm just checkin out old code
app.use(express.json()); //middleware to parse JSON bodies
app.use(express.urlencoded({ extended:true }));//more middle ware for URL-encoded bodies

app.use(session({ //session baybe
  secret: 'secretest-key', //maybe make something else
  resave: false,
  saveUninitialized: true
})); //session expires when closed browser, add cookie->Max age if we want it timed

//Routes
const regisRoute = require('./routes/registration_route')
const rformRoute = require('./routes/registration_form_route')
const loginRoute = require('./routes/login_route')

// const petSeRoute = require('./routes/petSearch_route')
const petPrRoute = require('./routes/profiles')
const logouRoute = require('./routes/logout')

//Routes - Pages
app.use('/registration_route', regisRoute)
app.use('/login_route', loginRoute)
app.use('/registration_form_route', rformRoute)

// app.use('/petSearch_route', petSeRoute)
app.use('/profiles', petPrRoute)
app.use('/logout', logouRoute)

app.engine('hbs', exphbs.engine({extname: 'hbs'}));
app.set('view engine', 'hbs');// set default file extenstion for views as .hbs
app.set('views', './views');// set dir for views

require('./database'); // mongodb stuff now in database

app.get('/', (req, res)=> {
  res.redirect('/registration_route');
});

// Start the server
const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Server listening on port ${port}`);
// });

// app listen without the console log
if (process.env.NODE_ENV !== 'test') {
  app.listen(port);
}

// ctrl + c in terminal to stop

app.use((req, res, next)=>{// should spy n see the get stuff but idk what???
  // console.log(req.url); // returns like the /users, /posts stuffs
  console.log(`${req.method}:${req.url}`);// log method and url, GET:/users
  next();
});

module.exports = {app: app}; // export app for testing