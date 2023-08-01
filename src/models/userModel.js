const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,  
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    }
    
});

module.exports = mongoose.model("userSignup", userSchema);