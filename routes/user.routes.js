const express = require("express")
const {userModel} = require("../model/user.model")

const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

userRouter.post("/register",async(req,res)=>{    
    const {name,email,gender,password,age,city,is_married} = req.body
    try{
        bcrypt.hash(password, 5, async(err, hash)=> {
            // if(user){
            //     res.send({"msg":"User already exist, please login"})
            // }
            if(err){
                res.status(400).send({"msg":err.message})
            } else {
                const user =  new userModel ({name,email,gender,password:hash,age,city,is_married})
                await user.save()
                res.status(200).send({"msg":"Registration successufully done.."})
            }
        });
        
        // console.log(user)
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = (req.body)
    try{
        const user = await userModel.find({email})
        if(user.length>0){
            bcrypt.compare(password, user[0].password, (err, result) =>{
               if(result){
                let token = jwt.sign({userId:user[0]._id},"evaluation")
                res.status(200).send({"msg":"login done successfully","token":token})
               } else {
                res.send({"msg":"Something going wrong"})
               }
            })
    
        }else{
            res.send({"err":err.message})
        }
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})
module.exports = {userRouter}