const postModel = require("../../models/postModel");

const getAllPost = async (req, res) => {
    let posts;
    try {
        posts = await postModel.find().populate({path:"userId", select:["name", "username"]});

    }
    catch(err) {
        return console.log(err);
    }
    if(!posts) {
        res.status(500).json({message : "error occure"});
    }
    res.status(200).json({posts});
};

module.exports = getAllPost;

