const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const {
    ExtractJwt
} = require('passport-jwt');

const {
    JWT_SECRET
} = require('./configuration')
const User = require('./models/user')

// JSON WEB TOKEN STRATEGY
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: JWT_SECRET
}, async (payload, done) => {
    try {
        // Find user specified in token
        const user = await User.findById(payload.sub)

        // if user does not exists, handle
        if (!user) {
            return done(null, false)
        }

        // Otherwise, return the user
        done(null, user)

    } catch (error) {
        done(error, false)
    }
}));


// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Find user givent email
    const user = await User.findOne({
        email
    })
    // If not handle it
    if (!user) {
        return done(null, false)
    }
    // Check if the password is correct

    // If not handle it

    // Otherwise return user 

}))