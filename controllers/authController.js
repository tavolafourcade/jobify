import User from "../models/User.js"
const register = async (req, res, next) => {
    // In req.body all the values will be located, and send them into MongoDB
    const user = await User.create(req.body)
    res.status(201).json({user})
}

const login = async (req, res) => {
    res.send('login user')
}

const updateUser = async (req, res) => {
    res.send('updateUser')
}

export {register, login, updateUser}