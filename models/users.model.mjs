import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    
    lastName: {
        type: String,
        required: true
    },

    username: {
        type: String,
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    permissionLevel: {
        type: Number,
        default: 1
    },

    about: {
        type: String
    },

    avatar: {
        type: String
    }
})

const User = mongoose.model('Users', UserSchema)

export default User
