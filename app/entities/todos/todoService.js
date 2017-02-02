const todoRepository = require('./todoRepository');
const Todo = require('./todoSchema');

class TodoService {

    getAllTodos(){
        return todoRepository.findAll();
    }

    getTodoById(id){
        console.log(id);
        return todoRepository.findById(id);
    }

    editTodo(id, todoData){
        var promise = new Promise(function(resolve, reject) {
            let todo = new Todo(todoData);
            let errors = todo.validateSync();

            if (errors) {
                reject(errors);
            } else {
                let saved = todoRepository.update({_id: id}, todoData);
                resolve(saved);
            }
        })

        return promise;
    }

    deleteTodo(id){
        return todoRepository.delete({_id: id});
    }

    addTodo(todoData){
        var promise = new Promise(function(resolve, reject) {
            let todo = new Todo(todoData);
            let errors = todo.validateSync();

            if (errors) {
                reject(errors);
            } else {
                let saved = todoRepository.add(todoData);
                resolve(saved);
            }
        })

        return promise;
    }
}

module.exports = new TodoService();