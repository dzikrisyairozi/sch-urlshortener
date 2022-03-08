import express from 'express'
import posts from '../controllers/posts.js'

const router = express.Router();

router.route('/').get(posts.getPosts);

export default router;