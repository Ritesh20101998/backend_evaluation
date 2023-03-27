const mongoose = require("mongoose")

const connection = mongoose.connect("mongodb+srv://riteshkothawade:riteshkothawade@cluster0.fbwxypy.mongodb.net/evalution4?retryWrites=true&w=majority")

module.exports={
    connection
}