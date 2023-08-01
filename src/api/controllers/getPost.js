const postModel = require("../../models/postModel");

const getPostById = async (req, res) => {

    try {
        const postId = req.params.id;
        const requiredPost = await postModel.findById(postId);
        console.log(requiredPost)
        if (!requiredPost) {
            res.status(404).json({ message: "No Post Found" });
        }
        res.status(200).json({ requiredPost });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
};
module.exports = getPostById;


