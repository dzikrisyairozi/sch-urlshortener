import jwt from 'jsonwebtoken'
import User from '../models/user.js'

export const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        console.log("asdasdasdasdasdasdadsdasd\n");
        res.redirect('/auth/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/auth/login');
  }
};

// check current user
export const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          console.log(user);
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };

export default { 
    requireAuth,
    checkUser
};