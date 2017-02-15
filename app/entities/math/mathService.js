const io = require('../../common/Sockets');

class MathService {
    getFibonacci(n, returnTransitional) {
        var promise = new Promise(function(resolve, reject) {
            resolve(1);
        });

        return promise;
    }
}

module.exports = new MathService();