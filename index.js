const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');

//Import Routes
const authRoute = require('./routes/auth');
dotenv.config();

const postRoute = require('./routes/posts');

//Connect to DB
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to db!'));

app.use(express.json());

// Routes Middleware
app.use('/api/user', authRoute);

app.use('/api/posts/', postRoute);

app.listen(3000, () => console.log('Server Up and running'));