import UrlShortener from '../models/urlShortener.js'

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    await UrlShortener.create({ 
        fullUrl: fullUrl
    });
    res.redirect('/');
};

export default {
    postShortener
};