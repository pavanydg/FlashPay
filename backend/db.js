const mongoose = require("mongoose")

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URL)

const UserSchema = new mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String
})


const User = mongoose.model("User", UserSchema)

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
}
