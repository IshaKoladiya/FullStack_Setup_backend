const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
})

const userModal = mongoose.model("userSchemas", userShema);

module.exports = userModal;