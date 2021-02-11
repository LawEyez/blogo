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
    }
})

const User = mongoose.model('Users', UserSchema)


// Create user
export const createUser = async userData => {
    try {
        const user = new User(userData)
        await user.save()

        return user

    } catch (err) {
        console.log(err)
        throw err
    }
}

// Get user by id
export const findById = async id => {
    try {
        const user = await User.findById(id)
        return user

    } catch (err) {
        console.log(err)
        throw err
    }
}

// Get user by email
export const findByEmail = async email => {
    try {
        const user = await User.findOne({ email })
        return user

    } catch (err) {
        console.log(err)
        throw err
    }
}

// Get list of users
export const list = async (perPage, page) => {
    try {
        const users = await User.find().limit(perPage).skip(perPage * page).exec()
        return users

    } catch (err) {
        console.log(err)
        throw err
    }
}

// Update user
export const patchUser = async (id, userData) => {
    try {
        await User.findOneAndUpdate({_id: id}, userData)

    } catch (err) {
        console.log(err)
        throw err
    }
}

// Remove user
export const removeUser = async id => {
    try {
        await User.findByIdAndRemove(id)
        
    } catch (err) {
        console.log(err)
        throw err
    }
}