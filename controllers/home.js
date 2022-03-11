import UrlShortener from '../models/urlShortener.js'

export const getHome = async (req, res) => {
    try{
        const shortUrls = await UrlShortener.find();

        return res.render(
            'newIndex',
            // 'index',
            { shortUrls: shortUrls }
        );
    }
    catch(err){
        return res.send(err);
    }
}

export const getShortUrl = async (req, res)=>{
    try{
        const shortUrl = await UrlShortener.findOne({ shortUrl: req.params.shortUrl })
        if ( shortUrl == null ) {
            return res.status(404).render('404');
        }
    
        shortUrl.clicks++;
        shortUrl.save();
    
        const redirectUrl = shortUrl.fullUrl.includes("https://")?shortUrl.fullUrl:"https://"+shortUrl.fullUrl;
        return res.redirect(redirectUrl);
    }
    catch(err){
        return res.send(err);
    }
};

export default {
    getHome,
    getShortUrl
};