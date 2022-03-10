import urlShortener from '../models/urlShortener.js';
import authController from '../controllers/auth.js'
import user from '../models/user.js';

export const postShortener = async (req, res) =>{
    const fullUrl = req.body.fullUrl;
    const shortUrl = req.body.shortUrl;
    const userId = authController.parseJwt(req.cookies.jwt);
    if(shortUrl && userId.id){
        const shortExist = await urlShortener.findOne({shortUrl : shortUrl});
        if(shortExist){
            return res.send("Short URL already exists, please change the short URL");
        }
        else{
            try{
                await urlShortener.create({shortUrl: shortUrl, fullUrl : fullUrl, author : userId.id});
                return res.redirect("/");
            }
            catch(err){
                return res.send(err);
            }
        }
    }
    await urlShortener.create({ 
        fullUrl: fullUrl,
        author: userId.id
    });
    return res.redirect('/');
};

export default {
    postShortener
};