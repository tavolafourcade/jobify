import User from "../models/User.js"
const register = async (req, res, next) => {
    try {
        // In req.body all the values will be located, and send them into MongoDB
        const user = await User.create(req.body)
        res.status(201).json({user})
    } catch (error) {
        next(error)
    }
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser')
}

export {register, login, updateUser}