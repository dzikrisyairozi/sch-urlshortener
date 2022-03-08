import express from 'express';
import mongoose from 'mongoose';
import homeRoutes from './routes/home.js'
import shortenerRoutes from './routes/shortener.js'
import authRoute from './routes/auth.js'

mongoose.connect('mongodb://localhost/urlShortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const app = express();
const PORT = process.env.PORT || 8000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use('/', homeRoutes);
app.use('/shortener', shortenerRoutes);

// Routes Middleware
app.use('/api/user', authRoute);

app.use('/api/posts/', postRoute);

const start =  (req, res) => {
    try{
        app.listen(PORT, console.log(`Server running on port: http://localhost:${PORT}`));
    }catch(err){
        console.log(err);
    }
}

start();