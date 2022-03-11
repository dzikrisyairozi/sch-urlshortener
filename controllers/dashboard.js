import UrlShortener from "../models/urlShortener.js";
import user from "../models/user.js";
import authController from "../controllers/auth.js";
import jwt from 'jsonwebtoken'

const homeGetDashboard = async (req, res) => {
  // const userId = authController.parseJwt(req.cookies.jwt);
  const userId = jwt.decode(req.cookies.jwt);
  try{
    const shortUrls = await UrlShortener.find({ author: userId.id });
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
    const shortUrls = await UrlShortener.find({ author: userId.id });
    return res.status(201).json(shortUrls);
  }
  catch(err){
    return res.send(err);
  }
};

const deleteUrl = async (req, res) => {
  try{
    const shortUrl = await UrlShortener.findOneAndDelete({
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
    const checkShortUrl = await UrlShortener.findOne({
      shortUrl: newShortUrl,
    });
    if (!checkShortUrl || shortUrl == newShortUrl) {
      const updater = await UrlShortener.findOneAndUpdate(
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
