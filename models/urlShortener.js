import mongoose from 'mongoose';

const urlShortenerSchema = new mongoose.Schema({
    fullUrl,
    shortUrl,
    clicks
})

export default mongoose.model('UrlShortener', urlShortenerSchema);