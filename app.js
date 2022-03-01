import express from 'express';
import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

app.listen(process.env.PORT || 8000);