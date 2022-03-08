import jwt from 'jsonwebtoken'
import express from 'express'

export default function(req, res, next){
    const token = req.header('auth-token');
    // console.log(token);
    if(!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
}