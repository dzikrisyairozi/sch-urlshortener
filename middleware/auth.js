import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  try{
      // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/auth/login');
      } else {
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
  }
  catch(err) {
    return res.send(err);
  }
};

// check current user
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    try{
      if (token) {
        jwt.verify(token, 'schematics url shortener', async (err, decodedToken) => {
          if (err) {
            res.locals.user = null;
            // console.log("iz null bois");
            next();
          } else {
            let user = await User.findById(decodedToken.id);
            res.locals.user = user;
            req.user = user;
            next();
          }
        });
      } else {
        res.locals.user = null;
        // console.log("iz null bois");
        next();
      }
    }
    catch(err) {
      return res.send(err);
    }
  };

export default { 
    requireAuth,
    checkUser
};