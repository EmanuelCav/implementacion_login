const bcryptjs = require('bcryptjs');

const User = require('../model/user');

const users = async (req, res) => {

    try {

        const users = await User.find().select("-password")

        return res.status(200).json(users)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const login = async (req, res) => {

    const { email, password } = req.body

    try {

        const userLoggedIn = await User.findOne({ email })

        if (!userLoggedIn) {
            return res.status(400).json({ message: "Fields do not match" })
        }

        const comparePasswords = await bcryptjs.compare(password, userLoggedIn.password)

        if (!comparePasswords) {
            return res.status(400).json({ message: "Fields do not match" })
        }

        const user = await User.findOne({ email }).select("-password")

        if(!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        req.session.user = user

        req.flash("welcome", `¡Welcome ${user.firstname} ${user.lastname} with email ${user.email}! Enjoy our products`)

        res.redirect("/products")

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

const register = async (req, res) => {

    const { firstname, lastname, email, password, confirm, role } = req.body

    try {

        if (!firstname || !lastname || !email || !password || !confirm) {
            return res.status(400).json(({ message: "There are empty fields" }))
        }

        if (password !== confirm) {
            return res.status(400).json(({ message: "Passwords do not match" }))
        }

        if (password.length < 6) {
            return res.status(400).json(({ message: "The password must have at least 6 charactes" }))
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(401).json(({ message: "The email is already registered" }))
        }

        const salt = await bcryptjs.genSalt(8)
        const hash = await bcryptjs.hash(password, salt)

        const newUser = new User({
            firstname,
            lastname,
            email,
            password: hash,
            role: role ? role : 'usuario'
        })

        const userSaved = await newUser.save()

        const user = await User.findById(userSaved._id).select("-password")

        if(!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        req.session.user = user

        req.flash("welcome", `¡Welcome ${user.firstname} ${user.lastname} with email ${user.email}! Enjoy our products`)

        res.redirect("/products")

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}

module.exports = {
    users,
    login,
    register
}