const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, required: true},
    authentication: {
        password: {type: String, required: true, select: false},
        salt: {type: String, select: false},
        sessionToken: {type: String, select: false},
    },
});

const UserModel = mongoose.model('User', UserSchema);

module.exports.getUsers = () => UserModel.find();
module.exports.getUserByEmail = (email) => UserModel.findOne({email});
module.exports.getUserBySessionToken = (sessionToken) => UserModel.findOne({
    'authentication.sessionToken': sessionToken,
});
module.exports.getUserById = (id) => UserModel.findById(id);
module.exports.createUser = (values) => new UserModel(values).save().then((user) => user.toObject());
module.exports.deleteUserById = (id) => UserModel.findOneAndDelete({_id: id});
module.exports.updateUserById = (id, values) => UserModel.findByIdAndUpdate(id, values);