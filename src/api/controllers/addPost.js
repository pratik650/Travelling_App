const mongoose = require("mongoose");
const postModel = require("../../models/postModel");
const userModel = require("../../models/userModel");

const createPost = async (req, res) => {
    try {
        const loginUserId = req.user.id;
        const { title, description, image } = req.body;
        if (title === undefined || description === undefined || image === undefined) {
            res.status(400).json({ success: "fail", result: { message: "All fields are required." } });
        }
        const post = await postModel.create({ title, description, image, userId: loginUserId });
        res.status(200).json({ success: "ok", result: { post, message: "Successfully add post" } });
    }
    catch (err) {
        res.status(500).json({ success: "Fail", result: { error: err, message: "Try after some time" } });
    }
};

module.exports = createPost;

