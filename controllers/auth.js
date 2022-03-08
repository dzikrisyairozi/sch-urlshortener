import bcrypt from 'bcryptjs/dist/bcrypt.js'
import User from '../models/user.js'
import dotenv from 'dotenv'
import jwt from'jsonwebtoken'
import { 
    registerValidation, 
    loginValidation 
} from '../validation.js'


export const register = async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE WE CREATE A USER
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    // Checking if the user is already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try {
        const savedUser = await user.save();
        // res.send(savedUser);
        res.send( {user: user._id} );
    } catch (error) {
        res.status(400).send(error);
    }
};

// LOGIN
export const login = async (req, res) => {
    // LETS VALIDATE THE DATA BEFORE LOGIN
    const { error } = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email is not found!');

    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);

    // res.send('Logged in!');

};

export default {
    register,
    login
};
