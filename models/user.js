const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

// Create a schema
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre('save', async function (next) { // arrow function not used, to have propper 'this'
    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // password hash (salt + hash)
        const passwordHash = await bcrypt.hash(this.password, salt); // this here is an user passed to function save
        this.password = passwordHash;
        next();
    } catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = function (newPassword) {
    try {
        return bcrypt.compare(newPassword, this.password);
    } catch (error) {
        throw new Error(error);
    }
}
// Create a model
const UserModel = mongoose.model('user', userSchema);
// Export a model
module.exports = UserModel;