const JWT = require('jsonwebtoken');

const User = require('../models/user');
const {
    JWT_SECRET
} = require('../configuration')

const signtoken = (user) => {
    return JWT.sign({
        iss: 'kari',
        sub: user.id,
        iat: +new Date(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, JWT_SECRET)
}

module.exports = {
    signUp: async (req, res, next) => {
        // Email & Password
        console.log(`UsersController.signUp called`)

        const {
            email,
            password
        } = req.value.body;
        //check if there is an user with same email
        const foundUser = await User.findOne({
            email
        });
        if (foundUser) {
            return res.status(409).json({
                error: 'Email already in use'
            })
        }
        // create a New User
        const newUser = new User({
            email,
            password
        })
        await newUser.save();

        // generate token
        const token = signtoken(newUser)

        // Respond with token
        res.status(200).json({
            token
        });
    },
    signIn: async (req, res, next) => {
        // Generate Token
        console.log(`UsersController.signIn called`)
    },
    secret: async (req, res, next) => {
        res.status(200).json({
            secret: 'resource'
        })
    }
}