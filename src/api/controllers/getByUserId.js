const postModel = require("../../models/postModel");

const getByUserId = async (req, res) => {

    const userId = req.params.id;
    try {
        const requiredPost = await postModel.find({ userId: userId });
        res.status(200).json({ success: "ok", result: requiredPost });
    } catch (err) {
        res.status(500).json({ success: "Fail", result: { message: "unable to find at that moment."}});
    }
};
module.exports = getByUserId;


