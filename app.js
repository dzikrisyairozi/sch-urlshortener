import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import homeRoutes from './routes/home.js'
import shortenerRoutes from './routes/shortener.js'
import authRoutes from './routes/auth.js'
import reqAuth from './middleware/auth.js'

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
const PORT = process.env.PORT || 8000;
const { requireAuth, checkUser } = reqAuth;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.get('*', checkUser);
app.use('/', homeRoutes);
app.use('/shortener', shortenerRoutes);
app.use('/auth', authRoutes);
app.use(cookieParser());

const start =  (req, res) => {
    try{
        app.listen(PORT, console.log(`Server running on port: http://localhost:${PORT}`));
    }catch(err){
        console.log(err);
    }
}

start();