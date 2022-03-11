import UrlShortener from '../models/urlShortener.js';
import homeController from '../controllers/home.js'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'
import UrlShortenerService from '../service/urlShortener.js'

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.body.shortUrl;
    var userId = jwt.decode(req.cookies.jwt);

    const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);
    try{
        userId = userId?userId.id:userId;
        if(shortUrl){
            const shortExist = await urlShortenerServiceInstance.getShortUrl({ shortUrl : shortUrl });
            if(shortExist){
                return res.send("Short URL already exists, please change the short URL");
            }
            else{
                try{
                    const createdUrl = await urlShortenerServiceInstance.createShortUrl({
                        shortUrl: shortUrl, 
                        fullUrl : fullUrl, 
                        author : userId
                    });
                    const user = await User.findById(userId);
                    return res.render('newIndex', {url : createdUrl, user : user});
                }
                catch(err){
                    return res.send(err);
                }
            }
        }
        const createdUrl = await urlShortenerServiceInstance.createShortUrl({ 
            fullUrl: fullUrl,
            author: userId
        });
        const user = await User.findById(userId);
        return res.render('newIndex', {url : createdUrl, user : user});
    }
    catch(err){
        return res.send(err);
    }
};

export default {
    postShortener
};