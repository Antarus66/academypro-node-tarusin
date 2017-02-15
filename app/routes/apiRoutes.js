const todos = require('../entities/todos/todoAPIRoutes');
const math = require('../entities/math/mathAPIRoutes');

const initializeRoutes = (app) => {
    app.use('/api/todo', todos);
    app.use('/api/math', math);
}

module.exports = initializeRoutes;