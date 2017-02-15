const express = require('express');
const router = express.Router();

const mathService = require('./mathService');

router.get('/fibonacci', (req, res, next) => {
    mathService.getFibonacci(100, 10)
        .then((value) => {
            res.send({result: value});
        }).catch((err) => {
            res.status(400).end();
        }
    );
});

module.exports = router;
