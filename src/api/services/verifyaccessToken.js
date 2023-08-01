const jwt = require("jsonwebtoken");
const verifyaccessToken = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRETKEY, function(err, decoded) {
            if(err){
                res.status(401).json({ sucess: "fail", result: { message: "Token not valid" } })
            }
            req.user = decoded;
            next();
          })
            
    }
    else {
        res.status(401).json({ sucess: "fail", result: { message: "Token  is not set" } })
    }
}
module.exports = verifyaccessToken;