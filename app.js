const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');

const app = express();

const users = require('./routes/users');
const config = require('./config/database')
const port = 3000; 

//DB Coneection
mongoose.connect(config.database);

mongoose.connection.on("connected", ()=>{
    console.log('DataBase Connected.'+config.database);
});

mongoose.connection.on("error", (err)=>{
    console.log('DataBase connection error => '+err);
});


app.use(cors());
app.use(express.static(path.join(__dirname,'public')));

//Body parser Middleware
app.use(bodyparser.json());

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Express Routers
app.use('/users',users);

app.get('/',(req, res) =>{
res.send('Invalid Endpoint!!');
});

app.listen(port, () =>{
    console.log('Applciation Started at '+port);
});





