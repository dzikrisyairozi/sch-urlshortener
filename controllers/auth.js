export const signup_get = (req, res) => {
    res.render('signup');
}
  
  export const login_get = (req, res) => {
    res.render('login');
}
  
  export const signup_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send('new signup');
}
  
  export const login_post = async (req, res) => {
    const { email, password } = req.body;

    console.log(email, password);
    res.send('user login');
}

export default {
    signup_get,
    login_get,
    signup_post,
    login_post
}