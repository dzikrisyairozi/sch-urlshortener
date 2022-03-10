import mongoose from 'mongoose';
import shortId from 'shortid';

const urlShortenerSchema = new mongoose.Schema({
    fullUrl:{
        type: String,
        required: true
    },
    shortUrl:{
        type: String,
        required: true,
        default: shortId.generate
    },
    clicks:{
        type: Number,
        required: true,
        default : 0
    },
    author:{
        type: String
    }
})

export default mongoose.model('UrlShortener', urlShortenerSchema);