import UrlShortener from '../models/urlShortener.js'

export const getHome = async (req, res) => {
    const shortUrls = await UrlShortener.find();

    return res.render(
        'newIndex',
        // 'index',
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

    const redirectUrl = shortUrl.fullUrl.includes("https://")?shortUrl.fullUrl:"https://"+shortUrl.fullUrl;
    return res.redirect(redirectUrl);
};

export default {
    getHome,
    getShortUrl
};