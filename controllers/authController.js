import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import {BadRequestError} from '../errors/index.js'

const register = async (req, res, next) => {
    // CHECK FOR EMPTY VALUES IN THE CONTROLLER
    const {name, email, password} = req.body

    if(!name || !email || !password) {
        throw new BadRequestError('Please provide all values ')
    }

    //It will look for the user with this specific email
    const userAlreadyExists = await User.findOne({email})
    if(userAlreadyExists){
        throw new BadRequestError('Email already in use')
    }
    // In req.body all the values will be located, and send them into MongoDB
    const user = await User.create({name, email, password})

    // Invoking a JWT method
    user.createJWT()
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser')
    user.save()
}

export {register, login, updateUser}