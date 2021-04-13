import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PostSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    body: {
        type: String,
        required: true
    },

    poster: {
        type: String
    },
    
    images: [{
        type: String
    }],
    
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    isDraft: {
        type: Boolean,
        default: false
    },

    category: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    },

    createDate: {
        type: Date,
        default: Date.now
    },

    publishDate: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('Posts', PostSchema)

export default Post

