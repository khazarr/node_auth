const User = require('../models/user');

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

        // Respond with token
        res.json({
            user: 'created'
        });
    },
    signIn: async (req, res, next) => {
        // Generate Token
        console.log(`UsersController.signIn called`)
    },
    secret: async (req, res, next) => {
        console.log(`UsersController.secret called`)
    }
}