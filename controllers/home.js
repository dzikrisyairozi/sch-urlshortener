import UrlShortener from '../models/urlShortener.js'
import UrlShortenerService from '../service/urlShortener.js'

export const getHome = async (req, res) => {
    try{
        const shortUrls = await UrlShortener.find();

        return res.render(
            'newIndex',
            // 'index',
            { url: "local" }
        );
    }
    catch(err){
        return res.send(err);
    }
}

export const getShortUrl = async (req, res)=>{
    try{
        const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);

        const shortUrl = await urlShortenerServiceInstance.getShortUrl({ shortUrl : req.params.shortUrl });

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