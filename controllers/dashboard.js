import UrlShortener from "../models/urlShortener.js";
import user from "../models/user.js";
import authController from "../controllers/auth.js";
import jwt from 'jsonwebtoken'
import UrlShortenerService from '../service/urlShortener.js'

const homeGetDashboard = async (req, res) => {
  // const userId = authController.parseJwt(req.cookies.jwt);
  const userId = jwt.decode(req.cookies.jwt);
  try{
    const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);

    const shortUrls = await urlShortenerServiceInstance.getShortUrls({ author: userId.id});
  

    return res.render("dashboard", { shortUrls: shortUrls });
  }
  catch(err){
    return res.send(err);
  }
};

const getDashboard = async (req, res) => {
  // const userId = authController.parseJwt(req.cookies.jwt);
  const userId = jwt.decode(req.cookies.jwt);
  try{
    const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);
    
    const shortUrls = await urlShortenerServiceInstance.getShortUrls({ author: userId.id});
    
    return res.status(201).json(shortUrls);
  }
  catch(err){
    return res.send(err);
  }
};

const deleteUrl = async (req, res) => {
  try{
    const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);

    const shortUrl = await urlShortenerServiceInstance.getShortUrlAndDelete({
      shortUrl: req.body.shortUrl,
    });
    return res.status(201).send("URL successfully deleted");
  }
  catch(err){
    return res.send(err);
  }

};

const updateUrl = async (req, res) => {
  const { shortUrl, newShortUrl, newFullUrl } = req.body;
  try{
    const urlShortenerServiceInstance = new UrlShortenerService(UrlShortener);

    const checkShortUrl = await urlShortenerServiceInstance.getShortUrl({ shortUrl: newShortUrl });

    if (!checkShortUrl || shortUrl == newShortUrl) {
      const updateShortUrl = await urlShortenerServiceInstance.getShortUrlAndUpdate(
        { shortUrl: shortUrl },
        { shortUrl: newShortUrl, fullUrl: newFullUrl }
      );
      return res.send("success");
    }
    return res.send("Short URL already exists, please change to a new one");
  }
  catch(err){
    return res.send(err);
  }

};

export default {
  homeGetDashboard,
  getDashboard,
  deleteUrl,
  updateUrl,
};
