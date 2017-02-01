const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Todo = new mongoose.Schema({
    title: String,
    done: Boolean,
    note: String
});

Todo.methods.getViewModel = function(){
    return {
        _id: this._id,
        title: this.title,
        done: this.done
    };
};

module.exports = mongoose.model('Todo', Todo);