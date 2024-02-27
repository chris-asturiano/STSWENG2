const express = require('express');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars')

//Routes
const regisRoute = require('./routes/registration_route')
const loginRoute = require('./routes/login_route')

const app = express();

//Routes - page
app.use('/registration_route', regisRoute)
app.use('/login_route', loginRoute)

app.use(express.static('public')); //styles??? I'm just checkin out old code

app.engine("hbs", exphbs.engine({extname: 'hbs'}));
app.set("view engine", "hbs")//set default file extenstion for views as .hbs
app.set("views", "./views")//set dir for views

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/STSWENG')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/', (req, res)=> {
  res.redirect('/registration_route')
})

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port ${port}`));

// ctrl + c in terminal to stop

app.use((req,res,next)=>{
  //console.log(req.url); // returns like the /users, /posts stuffs
  console.log(`${req.method}:${req.url}`)//log method and url, GET:/users
  next();
})