import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import homeRoutes from './routes/home.js'
import reqAuth from './middleware/auth.js'
import apiRoutes from './routes/api.js'
import config from './config/index.js'
import dotenv from 'dotenv'

dotenv.config;

// mongoose.connect('mongodb://localhost/urlShortener', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

const app = express();
const { requireAuth, checkUser } = reqAuth;

mongoose.connect(config.dbUrl, { useNewUrlParser: true }, () => console.log('connected to db!'));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.use("/public",express.static("public"));
app.use('/', homeRoutes);
app.use('/api', apiRoutes);

const start =  (req, res) => {
    try{
        app.listen(config.PORT, console.log(`Server running on port: http://localhost:${config.PORT}`));
    }catch(err){
        console.log(err);
    }
}

start();