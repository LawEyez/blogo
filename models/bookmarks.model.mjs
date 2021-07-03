import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BookmarkSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Posts'
    },
    
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
     
}, {timestamps: true})

const Bookmark = mongoose.model('Bookmarks', BookmarkSchema)

export default Bookmark

