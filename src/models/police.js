const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 20
    },
    signupAs: {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 40
    },
    Phone: {
        type: String,
        required: true,
        trim: true,
        min: 11,
        max: 12
    },
    valid: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    accountStatus: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    Designation: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    zone: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },

    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },

    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'admin'
    },
    contactNumber: { type: String },
    profilePicture: { type: String }
}, { timestamps: true });

userSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });
userSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`
    })
userSchema.methods = {
    authenticate: function (password) {
        return bcrypt.compareSync(password, this.hash_password)
    }
}

module.exports = mongoose.model('policeAuth', userSchema)