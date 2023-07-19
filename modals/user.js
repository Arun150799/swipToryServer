const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
    name:String,
    password:String

})
module.exports = mongoose.model("User",productSchema);