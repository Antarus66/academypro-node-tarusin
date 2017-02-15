const io = require('../../common/Sockets');

class MathService {
    getFibonacci(n, returnTransitional) {
        var promise = new Promise(function(resolve, reject) {
            var a = 1, b = 0, temp;

            while (n >= 0){
                temp = a;
                a = a + b;
                b = temp;
                n--;
            }

            resolve(b);
        });

        return promise;
    }
}

module.exports = new MathService();