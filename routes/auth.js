import express from 'express'
import auth from '../controllers/auth.js'
// const { process } = require('@hapi/joi/lib/errors');

const router = express.Router();

router.route('/register').post(auth.register);

router.route('/login').post(auth.login);

export default router;