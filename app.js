const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/category');
// const passport = require('passport');
const keys = require('./config/keys');
const app = express();

mongoose.connect(keys.mongoURI, {useCreateIndex: true, useNewUrlParser: true})
    .then(() => console.log('MongoDB connected.'))
    .catch(error => console.log(error));


// app.use(passport.initialize());
// require('./middleware/passport')(passport);


app.use(require('morgan')('dev'));
app.use('/uploads', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());


app.use('/api/auth', authRoutes);
app.use('/api/', categoryRoutes);


module.exports = app;
