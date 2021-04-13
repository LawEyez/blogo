import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SubSchema = new Schema({
    channel: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },

    subscriber: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
})

const Sub = mongoose.model('Subs', SubSchema)

export default Sub