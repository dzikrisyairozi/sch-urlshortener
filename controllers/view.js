import UrlShortener from "../models/urlShortener.js";
import jwt from "jsonwebtoken";

export const getHome = async (req, res) => {
  try {
    const shortUrls = await UrlShortener.find();

    return res.render(
      "newIndex",
      // 'index',
      { shortUrls: shortUrls }
    );
  } catch (err) {
    return res.send(err);
  }
};

const getDashboard = async (req, res) => {
  // const userId = authController.parseJwt(req.cookies.jwt);
  const userId = jwt.decode(req.cookies.jwt);
  try {
    const shortUrls = await UrlShortener.find({ author: userId.id });
    return res.render("dashboard", { shortUrls: shortUrls });
  } catch (err) {
    return res.send(err);
  }
};

export const signup_get = (req, res) => {
  try {
    return res.render("signup");
  } catch (err) {
    return res.send(err);
  }
};

export const login_get = (req, res) => {
  try {
    return res.render("login");
  } catch (err) {
    return res.send(err);
  }
};

export default {
  getHome,
  getDashboard,
  signup_get,
  login_get
};
