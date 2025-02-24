const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    phone: String,
    image: String // Stores the file path of uploaded images
});

module.exports = mongoose.model("User", UserSchema);
