const express = require('express');
const todoRouter = express.Router();

const todoService = require('./todoService');

todoRouter.get('/', (req, res, next) => {
    res.render('todos');
});

todoRouter.get('/:id', (req, res, next) => {
    todoService.getTodoById(req.params.id).then((todo)=> {
        res.render('todo'); //todo: attach the model?
    }).catch((err) => {
        res.status(400).end();
    });
});

module.exports = todoRouter;
