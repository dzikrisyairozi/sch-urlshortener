import UrlShortener from "../models/urlShortener.js";

const getDashboard = async (req, res) => {
  // Add authentication to check if username is logged in
  const shortUrls = await UrlShortener.find();
  return res.render("dashboard", { shortUrls: shortUrls });
};

const deleteUrl = async (req, res) => {
  const shortUrl = await UrlShortener.findOneAndDelete({
    shortUrl: req.body.shortUrl,
  });
  res.redirect("/");
};

const updateUrl = async (req, res) => {
  const { shortUrl, newShortUrl, newFullUrl } = req.body;
  const checkShortUrl = await UrlShortener.findOne({
    shortUrl: newShortUrl,
  });
  if (!checkShortUrl || (shortUrl == newShortUrl)) {
    const updater = await UrlShortener.findOneAndUpdate(
      { shortUrl: shortUrl },
      { shortUrl: newShortUrl, fullUrl: newFullUrl }
    );
    return res.send("success");
  }
  return res.send("Short URL already exists, please change to a new one");
};

export default {
  getDashboard,
  deleteUrl,
  updateUrl,
};
