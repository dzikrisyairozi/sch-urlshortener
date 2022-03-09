import urlShortener from '../models/urlShortener.js';
import UrlShortener from '../models/urlShortener.js'

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.body.shortUrl;
    if(shortUrl){
        const shortExist = await UrlShortener.findOne({shortUrl : shortUrl});
        if(shortExist){
            return res.send("err");
        }
        else{
            try{
                await urlShortener.create({shortUrl: shortUrl, fullUrl : fullUrl});
                return res.redirect("/");
            }
            catch(err){
                return res.send(err);
            }
        }
    }
    await UrlShortener.create({ 
        fullUrl: fullUrl
    });
    return res.redirect('/');
};

export default {
    postShortener
};