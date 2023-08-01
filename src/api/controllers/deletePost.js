const postModel = require("../../models/postModel");

const deletePost = async (req, res) => {
    const postId = req.params.id;
    const loginUser = req.user;
    try {
        if (postId) {
            const requiredPost = await postModel.findById(postId);

            if (requiredPost) {
                if (String(loginUser.id) === String(requiredPost.userId)) {
                    const deletePost = await postModel.findByIdAndDelete(postId);
                    res.status(200).json({ success: "ok", result: { deletePost, message: "Successfully Delete" } });
                }
                else {
                    res.status(401).json({ success: "Fail", result: { message: "You can delete your post only." } })
                }
            }
            else {
                res.status(404).json({ success: "Fail", result: { message: "This post is not found." } })
            }
        }
        else{
            res.status(404).json({ success: "Fail", result: { message: "Please provide post Id." } })
        }

    }
    catch (error) {
        res.status(500).json({ success: "fail", result: { message: "Try after some time." } });
    }
};
module.exports = deletePost;


