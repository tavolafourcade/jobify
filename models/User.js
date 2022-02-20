import mongoose from "mongoose"

// Creating the structure of our user
const USerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlength:3,
        maxlength:20,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength:6,
    },
    lastname: {
        type: String,
        maxlength:20,
        trim: true,
        default: 'lastname'
    },
    lastname: {
        type: String,
        maxlength:20,
        trim: true,
        default: 'location'
    },
})

// Exporting the User collection
export default mongoose.model('User', USerSchema)