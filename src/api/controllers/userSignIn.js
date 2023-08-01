const userModel = require("../../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');


const userLogin = async(req,res) => {
    try{
        const { username , password} = req.body;
        if(username === undefined || password === undefined){
            res.status(401).json({success:"ok",result:{message:"username and password are required."}});
        }
        else{
            const user = await userModel.findOne({username});
            // console.log(user);
            if(!user){
                res.status(404).json({success:"ok",result:{message:"Invaild username"}});
            }
            else{
                const validPassword = await bcrypt.compare(password, user.password);
                // console.log(password);
                // console.log(validPassword);
                // console.log(user.password);
                if(validPassword){
                    const token = jwt.sign({ username,id:user._id}, process.env.SECRETKEY);
                    res.status(200).json({success:"ok",user: user,token});
                }
                else{
                    res.status(403).json({success:"fail",result:{message:"password do not match."}})
                }
                
            }
            // return res.status(200).json({ message: "Login Successfull", user: user });
        }
    }
    catch(err){
        res.status(500).json({success:"fail",result:{message:"Try after some time."}});
    }
}
module.exports = userLogin;