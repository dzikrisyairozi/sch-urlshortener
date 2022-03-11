import urlShortener from '../models/urlShortener.js';
import homeController from '../controllers/home.js'
import User from '../models/user.js';
import jwt from 'jsonwebtoken'

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.body.shortUrl;
    var userId = jwt.decode(req.cookies.jwt);
    try{
        userId = userId?userId.id:userId;
        if(shortUrl){
            const shortExist = await urlShortener.findOne({shortUrl : shortUrl});
            if(shortExist){
                return res.send("Short URL already exists, please change the short URL");
            }
            else{
                try{
                    const createdUrl = await urlShortener.create({
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
        const createdUrl = await urlShortener.create({ 
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