import express from 'express';
import mongoose from 'mongoose';
import homeRoutes from './routes/home.js'
import UrlShortener from './models/urlShortener.js'

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/', homeRoutes);

app.post('/shortener', async (req, res) =>{
   await UrlShortener.create({ fullUrl: req.body.fullUrl });
   res.redirect('/');
})

const start =  (req, res) => {
    try{
        app.listen(PORT, console.log(`Server running on port: http://localhost:${PORT}`));
    }catch(err){
        console.log(err);
    }
}

start();