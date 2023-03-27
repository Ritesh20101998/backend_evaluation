const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
    title : String,
    body : String,
    device : String,
    no_of_comments : Number,
    userId : String
},{
    versionKey:false
})

const postModel = mongoose.model("post",postSchema)

module.exports = {
    postModel
}