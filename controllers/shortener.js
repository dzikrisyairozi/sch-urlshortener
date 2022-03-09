import urlShortener from '../models/urlShortener.js';
import UrlShortener from '../models/urlShortener.js'
import user from '../models/user.js';

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.body.shortUrl;
    console.log(res.locals.user);
    if(shortUrl){
        const shortExist = await UrlShortener.findOne({shortUrl : shortUrl});
        if(shortExist){
            return res.send("err");
        }
        else{
            try{
                await urlShortener.create({shortUrl: shortUrl, fullUrl : fullUrl, author : user.email || "hmm"});
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