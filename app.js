import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser'
import homeRoutes from './routes/home.js'
import shortenerRoutes from './routes/shortener.js'
import authRoutes from './routes/auth.js'
import reqAuth from './middleware/auth.js'
import dashboardRoutes from './routes/dashboard.js'
import dotenv from 'dotenv'

dotenv.config();
// mongoose.connect('mongodb://localhost/urlShortener', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true }, () => console.log('connected to db!'));

const app = express();
const PORT = process.env.PORT || 8000;
const { requireAuth, checkUser } = reqAuth;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get('*', checkUser);
app.use("/public",express.static("public"));
app.use('/dashboard', requireAuth, dashboardRoutes);
app.use('/', homeRoutes);
app.use('/shortener', shortenerRoutes);
app.use('/auth', authRoutes);

const start =  (req, res) => {
    try{
        app.listen(PORT, console.log(`Server running on port: http://localhost:${PORT}`));
    }catch(err){
        console.log(err);
    }
}

start();