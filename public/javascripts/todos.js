(function() {
    var socket = io();

    var $$addTodo = document.getElementById('add-todo');
    var $$todosContainer = document.getElementById('todos-container');
    var todosList = [];

    socket.on('connect', function(){
        console.log('Connected to a socket');
    });

    fetch('/api/todo').then(function(response){
        if(response.ok) {
            return response.json();
        }
    }).then(function(todos){
        todosList = todos;
        renderTodos(todos);
        bindSocketHandlers();
    });

    bindEventListeners();

    function renderTodos(todos){
        for (var i = 0; i < todos.length; i++){
            appendTodo(todos[i]);
        }
    }

    function appendTodo(todo) {
        $$todosContainer.appendChild(renderTodo(todo));
    }

    function renderTodo(todo = {}){
        var $todoContainer = document.createElement('div');
        $todoContainer.className = 'todo-container';

        if (todo._id){
            $todoContainer.id = todo._id

            var $todoId = document.createElement('span');
            $todoId.innerText = todo._id;
            $todoContainer.appendChild($todoId);
        }

        var todoDone = document.createElement('input');
        todoDone.type = 'checkbox';
        todoDone.checked = todo.done || '';
        todoDone.className = 'todo-done';
        $todoContainer.appendChild(todoDone);

        var $todoTitle = document.createElement('input');
        $todoTitle.value = todo.title || '';
        $todoTitle.className = 'todo-title';
        $todoContainer.appendChild($todoTitle);

        var $saveTodoButton = document.createElement('button');
        $saveTodoButton.innerText = 'Save';
        $saveTodoButton.className = 'save-todo';
        $todoContainer.appendChild($saveTodoButton);

        var $deleteTodoButton = document.createElement('button');
        $deleteTodoButton.innerText = 'Delete';
        $deleteTodoButton.className = 'delete-todo';
        $todoContainer.appendChild($deleteTodoButton);
        return $todoContainer;
    }

    function bindEventListeners(){

        $$addTodo.addEventListener('click', function(){
            $$todosContainer.appendChild(renderTodo());
        });

        document.addEventListener('click', function(event){
            if (event.target.className === 'save-todo'){
                var todoContainer = event.target.parentNode;
                var id = todoContainer.id;
                if (id){
                    sendEditTodoReq(todoContainer, id);
                } else {
                    sendCreateTodoReq(todoContainer).then(function(response){
                        if(response.ok) {
                            return response.json();
                        }
                    }).then(function(todo){
                        if (!isRendered(todo._id)) {
                            appendTodo(todo);
                        }
                    });
                    todoContainer.remove();
                }
            } else if (event.target.className === 'delete-todo'){
                var todoContainer = event.target.parentNode;
                var id = todoContainer.id;

                sendDeleteTodoReq(id).then(function(response){
                    if(response.ok) {
                        return;
                    }
                }).then(function(){
                    todoContainer.remove();
                });
            }
        });

    }

    function sendEditTodoReq(todoContainer, id){

        var title = todoContainer.querySelector('.todo-title').value;
        var done = todoContainer.querySelector('.todo-done').checked;

        return fetch('/api/todo/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                done: done
            })
        })
    }

    function sendDeleteTodoReq(id){
        return fetch('/api/todo/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    function sendCreateTodoReq(todoContainer){

        var title = todoContainer.querySelector('.todo-title').value;
        var done = todoContainer.querySelector('.todo-done').checked;

        return fetch('/api/todo/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                done: done
            })
        })
    }

    function bindSocketHandlers() {
        socket.on('added', handleAdded);

        socket.on('edited', function (data) {
            console.log('edited');
            console.log(data);
        });

        socket.on('removed', function (data) {
            console.log('removed');
            console.log(data);
        });

        function handleAdded(todoData) {
            if (!isRendered(todoData._id)) {
                todosList.push(todoData);
                appendTodo(todoData);
            }

        }
    }

    function isRendered(_id) {
        var found = todosList.find(function(todoData) {
            return todoData._id === _id;
        });

        return Boolean(found);
    }
})();