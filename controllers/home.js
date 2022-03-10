import UrlShortener from '../models/urlShortener.js'

// Forbidden
// export const getHome = async (req, res) => {
//     try{
//         const shortUrls = await UrlShortener.find();
//         return res.status(201).json(shortUrls);
//     }
//     catch(err){
//         return res.send(err);
//     }
// }

export const getShortUrl = async (req, res)=>{
    try{
        const shortUrl = await UrlShortener.findOne({ shortUrl: req.params.shortUrl })
        if (!shortUrl) {
            return res.status(404).json({
                success: false,
                msg : 'URL not found!'
            });
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
    getShortUrl
};