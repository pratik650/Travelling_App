const mongoose = require("mongoose");
const userModel = require("../models/userModel");

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,  
    },
    image: {
        type: String,
        required: true,
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: userModel,
        required: true
    }
    
});

module.exports = mongoose.model("post", postSchema);