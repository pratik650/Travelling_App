const routes = require("express").Router();
const createPost = require("../controllers/addPost.js");
const getAllPost = require("../controllers/postContoller.js");
const getPostById = require("../controllers/getPost.js");
const updatePost = require("../controllers/updatePost.js");
const deletePost = require("../controllers/deletePost.js");
const getByUserId = require("../controllers/getByUserId.js");
const verifyaccessToken = require("../services/verifyaccessToken");

routes.get("/", getAllPost);
routes.post("/add" ,verifyaccessToken,createPost);
routes.put("/update/:id" , verifyaccessToken ,updatePost);
routes.delete("/delete/:id" ,verifyaccessToken, deletePost);
routes.get("/user/:id", getByUserId);

routes.get("/:id" , getPostById);
module.exports = routes;