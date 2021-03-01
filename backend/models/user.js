const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Le nom de l'utilisateur est requis"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est requis"]
    }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);