const express = require('express');
const todoRouter = express.Router();

const todoService = require('./todoService');

todoRouter.get('/', (req, res, next) => {
    todoService.getAllTodos().then((todos) => {
        res.send(todos);
    }).catch((err) => {
        res.status(400).end();
    });
});

todoRouter.post('/', (req, res, next) => {
    todoService.addTodo(req.body).then((todo) => {
        res.status(201).send(todo);
    }).catch((err) => {
        if (err.name === 'ValidationError') {
            res.status(422).send(err);
        } else {
            res.status(400).end();
        }
    });
});

todoRouter.get('/:id', (req, res, next) => {
    todoService.getTodoById(req.params.id).then((todo) => {
        res.send(todo);
    }).catch((err) => {
        res.status(400).end();
    });
});

todoRouter.put('/:id', (req, res, next) => {
    todoService.editTodo(req.params.id, req.body).then(() => {
        res.end();
    }).catch((err) => {
        if (err.name === 'ValidationError') {
            res.status(422).send(err);
        } else {
            res.status(400).end();
        }
    });
});

todoRouter.delete('/:id', (req, res, next) => {
    todoService.deleteTodo(req.params.id).then(() => {
        res.status(200).end();
    }).catch((err) => {
        res.status(400).end();
    });
});

module.exports = todoRouter;
