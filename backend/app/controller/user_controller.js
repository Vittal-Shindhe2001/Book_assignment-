const User = require("../models/user")
const jwt = require('jsonwebtoken')
require('dotenv').config()
const bcrypt = require('bcryptjs')

const userController = {}

// signup
userController.signup = async (req, res) => {
    try {
        const { body } = req
        const existingUser = await User.findOne({email:body.email  });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        const user = new User(body)
        const salt = await bcrypt.genSalt()
        const encrypted = await bcrypt.hash(user.password, salt)
        user.password = encrypted
        const result = await user.save()
        res.json(result)
    } catch (error) {
        res.json(error)
    }

}

// signin
userController.signin = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({ email: body.email })
        if (!user) {
            res.json({ error: "Invalid password or email" })
        } else {
            const match = await bcrypt.compare(body.password, user.password)
            if (match) {
                const tokendata = {
                    id: user._id,
                    name: user.name,
                    role: user.role
                }
                const token = jwt.sign(tokendata, process.env.JWT_KEY)
                res.json({
                    token: `Bearer ${token}`
                })
            } else {
                res.json({ error: "Invalid Password or Email" })
            }
        }
    } catch (error) {
        res.json(error)
    }
}

//user Info
userController.info = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id })
        // Create a new array of customers with password removed
        const { password, ...customersWithoutPassword } = user.toObject()
        res.json(customersWithoutPassword)
    } catch (error) {
        res.json(error)
    }
}

userController.update = async (req, res) => {
    try {
        const { body } = req
        const { id } = req.params
        const result = await User.findByIdAndUpdate(id, body, { new: true, runValidators: true })
        res.json(result)
    } catch (error) {
        console.log(error);

    }
}
module.exports = userController