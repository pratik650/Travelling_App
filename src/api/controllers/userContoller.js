const userModel = require("../../models/userModel.js");

const getAllUser = async (req, res) => {
    let users;
    try {
        users = await userModel.find();

    }
    catch(err) {
        return console.log(err);
    }
    if(!users) {
        return res.status(500).json({message : "error occure"});
    }
    return res.status(200).json({users});
};

module.exports = getAllUser;
