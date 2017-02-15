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

