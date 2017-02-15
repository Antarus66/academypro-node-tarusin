const io = require('../../common/Sockets');
const childProcess = require('child_process');

class MathService {
    getFibonacci(n, returnTransitional) {
        var promise = new Promise((resolve, reject) => {
            var child = childProcess.fork(`${__dirname}/fibonacciWorker.js`);
            child.on('message', (m) => {
                if (!m.type || !m.data || !m.data.value) {
                    reject({
                        error: "WorkerError"
                    });
                }

                if (m.type === 'done') {
                    resolve(m.data.value);
                }

            });

            child.send({
                type: 'start',
                data: {
                    n: n,
                    returnTransitional: returnTransitional
                }
            });
        });

        return promise;
    }
}

module.exports = new MathService();