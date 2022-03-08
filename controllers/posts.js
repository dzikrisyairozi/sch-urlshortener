import verify from '../routes/verifyToken.js'


export const getPosts = (verify, (req, res) => {
    res.json({
        posts: {
            title: 'My First Post',
            description: 'random data you shouldnt access'
        }
    });
});

export default {
    getPosts
};


