const todos = require('../entities/todos/todoViewRoutes');
const math = require('../entities/math/mathViewRoutes');

const initializeRoutes = (app) => {
	app.use('/todo', todos);
	app.use('/math', math);
};

module.exports = initializeRoutes;