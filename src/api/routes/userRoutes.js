const routes = require("express").Router();
const userRegister = require("../controllers/userSignUp.js");
const userLogin = require("../controllers/userSignIn.js");
const getAllUser = require("../controllers/userContoller.js");

routes.get("/" , getAllUser);
routes.post("/register", userRegister);
routes.post("/login" , userLogin);

module.exports = routes;