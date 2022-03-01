import express from 'express';
import mongoose from 'mongoose';
import UrlShortener from './models/urlShortener.js'

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const shortUrls = await UrlShortener.find();
    res.render(
        'index',
        { shortUrls: shortUrls }
    );
})

app.post('/shortener', async (req, res) =>{
   await UrlShortener.create({ fullUrl: req.body.fullUrl });
   res.redirect('/');
})

app.get('/:shortUrl', async (req, res)=>{
    const shortUrl = await ShortUrl.findOne({ shortUrl: req.params.shortUrl })
    if ( shortUrl == null ) {
        return res.sendStatus(404).json({
            success: false,
            msg : 'URL nor found!'
        });
    }
})

app.listen(process.env.PORT || 8000);