
const jwt  = require("jsonwebtoken")

const auth = (req,res,next)=>{
    const token = req.header.authorization
    if(token){
        jwt.verify(token,"evaluation",(err,decoded)=>{
            console.log(token)
            if(decoded){
                req.body.userId = decoded.userId
                console.log(decoded)
                next()
            }else{
                res.send({"msg":"Login first"})
            }
        })
    } else {
        res.send({"msg":"Login first"})
    }
}

module.exports={auth}