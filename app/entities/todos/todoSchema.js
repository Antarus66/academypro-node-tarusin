const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.ObjectId;

const Todo = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
                return !(value.includes('зрада') || value.includes('zrada'));
            },
            message: 'Зрада не пройде! Нам порібна перемога!'
        }
    },
    done: {
        type: Boolean,
        required: false
    },
    note: {
        type: String,
        required: false
    }
});

Todo.methods.getViewModel = function(){
    return {
        _id: this._id,
        title: this.title,
        done: this.done
    };
};

module.exports = mongoose.model('Todo', Todo);