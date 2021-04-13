import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        type: String,
        required: true
    },

    icon: {
        type: String
    }
})

const Category = mongoose.model('Categories', CategorySchema)

export default Category