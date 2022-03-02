import UrlShortener from '../models/urlShortener.js'

export const getHome = async (req, res) => {
    const shortUrls = await UrlShortener.find();
    res.render(
        'index',
        { shortUrls: shortUrls }
    );
}

export const getShortUrl = async (req, res)=>{
    const shortUrl = await UrlShortener.findOne({ shortUrl: req.params.shortUrl })
    if ( shortUrl == null ) {
        return res.sendStatus(404).json({
            success: false,
            msg : 'URL nor found!'
        });
    }

    shortUrl.clicks++;
    shortUrl.save();

    res.redirect(shortUrl.fullUrl);
};

export default {
    getHome,
    getShortUrl
};