const todoRepository = require('./todoRepository');
const Todo = require('./todoSchema');
const io = require('../../common/Sockets');
const todoValidator = require('./TodoValidator');

class TodoService {

    getAllTodos(){
        return todoRepository.findAll();
    }

    getTodoById(id){
        return todoRepository.findById(id);
    }

    editTodo(id, todoData){
        var promise = new Promise(function(resolve, reject) {
            if (!todoValidator.validate(todoData)) {
                reject({
                    name: 'ValidationError',
                    errors: todoValidator.getErrors()
                });
            } else {
                todoRepository.update({_id: id}, todoData)
                    .then(function () {
                        todoData._id = id;
                        io.emit('edited', todoData);
                        resolve(todoData);
                    }
                );
            }
        });

        return promise;
    }

    deleteTodo(id){
        let removed = todoRepository.delete({_id: id});
        io.emit('removed', {_id: id});

        return removed;
    }

    addTodo(todoData){
        var promise = new Promise(function(resolve, reject) {
            if (!todoValidator.validate(todoData)) {
                reject({
                    name: 'ValidationError',
                    errors: todoValidator.getErrors()
                });
            } else {
                // Using a promise from Mongoose query.exec()
                todoRepository.add(todoData).then(function (savedTodo) {
                    io.emit('added', savedTodo);
                    resolve(savedTodo);
                });
            }
        });

        return promise;
    }
}

module.exports = new TodoService();