const todoRepository = require('./todoRepository');
const todoValidator = require('./todoValidator');

class TodoService {

    getAllTodos(){
        return todoRepository.findAll();
    }

    getTodoById(id){
        console.log(id);
        return todoRepository.findById(id);
    }

    editTodo(id, todo){
        //todoValidator.validateModel(todo);
        return todoRepository.update({_id: id}, todo);
    }

    deleteTodo(id){
        return todoRepository.delete({_id: id});
    }

    addTodo(todo){
        //todoValidator.validateModel(todo);
        return todoRepository.add(todo);
    }
}

module.exports = new TodoService();