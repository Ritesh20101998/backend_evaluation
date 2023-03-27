const express = require("express")
const {postModel} = require("../model/post.model")

const postRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

postRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    
    const decoded = jwt.verify(token,"evalulation")
    try{
        if(decoded){
            const posts=await postModel.find({"userId":decoded.userId});
            res.status(200).send(posts)
        }
         else {
            res.status(400).send("No posts has been created..")
        }
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.post("/add",async(req,res)=>{
    try{
        const posts = new postModel(req.body)
        await posts.save()
        res.status(200).send({"msg":"A new post has added to the list"})
    } catch (err) {
        res.status(400).send({"msg":err.message})
    }
})

postRouter.get("/top",async(req,res)=>{
    const payload = req.body
    const post = new postModel(payload)
    await post.save()
    res.status(200).send({"msg":"All the post creation done.."})
})

postRouter.patch("/update/:postId",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"evaluation")
    const req_id=decoded.userId
    const post = postModel.findOne({_id:postId})
    const postId=post.userId
    try{
        if(req_id=postId){
            await postModel.findByIdAndUpdate({_id:postId})
            res.status(200).send({"msg":"Note has been updated..."})
        } else {
            res.status(400).send({"msg":"Not Authorised"})
        }
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

postRouter.delete("/delete/:postid",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token,"evaluation")
    const req_id=decoded.userId
    const note = postModel.findOne({_id:postId})
    const postId=post.userId
    try{
        if(req_id=postId){
            await postModel.findByIdAndDelete({_id:postId})
            res.status(200).send({"msg":"Note has been deleted."})
        } else {
            res.status(400).send({"msg":"Not Authorised"})
        }
        
    } catch(err){
        res.status(400).send({"msg":err.message})
    }
})

module.exports = {postRouter}