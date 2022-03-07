import mongoose from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
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
        validate:{
            validator:validator.isEmail,
            message: 'Please provide a valid email'
        },
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

USerSchema.pre('save',async function(){
    // console.log(this.password);

    // Hashing the password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
})

// Exporting the User collection
export default mongoose.model('User', USerSchema)