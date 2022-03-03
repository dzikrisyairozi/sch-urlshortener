import UrlShortener from '../models/urlShortener.js'

const getDashboard = async(req, res) => {
    // Add authentication to check if username is logged in
    const shortUrls = await UrlShortener.find();
    res.render(
        'dashboard',
        { shortUrls: shortUrls }
    );
}

export default{
    getDashboard
}