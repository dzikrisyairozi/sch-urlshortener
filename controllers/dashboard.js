import UrlShortener from '../models/urlShortener.js'

const getDashboard = async(req, res) => {
    // Add authentication to check if username is logged in
    const shortUrls = await UrlShortener.find();
    return res.render(
        'dashboard',
        { shortUrls: shortUrls }
    );
}

const deleteUrl = async(req, res) => {
    const shortUrl = await UrlShortener.findOneAndDelete({shortUrl : req.body.shortUrl});
    res.redirect("/");
}

const updateUrl = async(req, res) => {
    const shortUrl = await UrlShortener.findOneAndUpdate({shortUrl : req.body.shortUrl}, {shortUrl : req.body.newShortUrl, fullUrl : req.body.newFullUrl});
    res.redirect("/");
}

export default{
    getDashboard,
    deleteUrl,
    updateUrl
}