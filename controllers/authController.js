import User from "../models/User.js"
import { StatusCodes } from "http-status-codes"
const register = async (req, res, next) => {
    // CHECK FOR EMPTY VALUES IN THE CONTROLLER
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        throw new Error('Please provide all values ')
    }
    // In req.body all the values will be located, and send them into MongoDB
    const user = await User.create({name, email, password})
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser')
}

export {register, login, updateUser}