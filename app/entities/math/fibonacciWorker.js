(() => {
    process.on('message', (m) => {
        if (!m.type || m.type !== 'start') {
            process.send({
                type: 'error',
                data: {
                    name: 'InvalidMessageTypeError'
                }
            });
        }

        var n = m.data.n;
        var returnTransitional = m.data.returnTransitional;

        var a = 1, b = 0, temp;

        while (n >= 0){
            temp = a;
            a = a + b;
            b = temp;

            if ((n % returnTransitional) === 0) {
                process.send({
                    type: 'intermediate',
                    data: {
                        value: b
                    }
                });
            }

            n--;
        }

        process.send({
            type: 'done',
            data: {
                value: b
            }
        });
    });
})();

