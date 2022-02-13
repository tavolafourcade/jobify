import mongoose from 'mongoose'

// function that will connect to the URL
// Mongoose return a promess so we'll use an async await
const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB