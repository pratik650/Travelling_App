const postModel = require("../../models/postModel");

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;
    if (postId) {
        try {
            const { title, description } = req.body;

            if (title === undefined || description === undefined) {
                res.status(400).json({ success: "fail", result: { message: "All fields are required." } });
            }
            else {
                const requiredPost = await postModel.findById(postId);
                if(requiredPost){
                    if (String(requiredPost.userId) === String(userId)) {
                        const requiredPostData = await postModel.findByIdAndUpdate(postId, { title, description });
                        res.status(200).json({ success: "OK", result: requiredPostData });
                    }
                    else {
                        res.status(401).json({ success: "Fail", result: { message: "You can access only your post.." } })
                    }
                }
                else{
                    res.status(404).json({ success: "Fail", result: { message: "RequiredPost is not found." } })
                }
                
            }
        }
        catch (err) {
            res.status(500).json({ success: "Fail", result: { message: "Please try after some time." } })
        }
    }
    else{
        res.status(404).json({success:"fail",result:{message:"Post not found."}});
    }
};

module.exports = updatePost;

