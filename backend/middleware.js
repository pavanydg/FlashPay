const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
    const authheader = req.headers.authorization;

    if(!authheader || !authheader.startsWith('Bearer ')){
        res.status(403).json({})
    }
    const token = authheader.split(" ")[1];
    try{
        const decoded = jwt.verify(token,JWT_SECRET);
        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }
        else{
            return res.status(403).json({})
        }
    }
    catch(err){
        console.log("hi")
        return res.status(403).json({})
    }
}

module.exports = {
    authMiddleware
}
