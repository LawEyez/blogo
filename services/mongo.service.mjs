import mongoose from 'mongoose'

let count = 0

const options = {
    poolSize: 10, // Maintain upto 10 socket connections
    bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
    useUnifiedTopology: true,
    useNewUrlParser: true
}

export const connectWithRetry = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/blogo', options)
        console.log('MongoDB connected...')

    } catch (err) {
        console.log(`MongoDB connection unsuccessful. Retrying in 5 seconds...`)
        setTimeout(connectWithRetry, 5000)
    }
}

