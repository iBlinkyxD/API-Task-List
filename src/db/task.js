const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {type: String, required: true, default: 'No title'},
    description: {type: String},
    dueDate: {type: Date},
    completed: {type: Boolean, default: false},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    createdOn: {type: Date, default: Date.now},
    editedOn: {type: Date, default: ''}
});

const TaskModel = mongoose.model('Task', TaskSchema);

module.exports.getTasks = () => TaskModel.find();
module.exports.userTasks = (id) => TaskModel.find({createdBy: id});
module.exports.createTask = (values) => new TaskModel(values).save().then((task) => task.toObject());
module.exports.getTaskById = (id) => TaskModel.findById(id);
module.exports.deleteTaskById = (id) => TaskModel.findOneAndDelete({_id: id});
module.exports.updateTaskById = (id, values) => TaskModel.findByIdAndUpdate(id, values);