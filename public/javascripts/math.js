(function () {
    var socket = io();

    bindSocketHandlers();
    bindEventListeners();

    function bindEventListeners() {
        document.getElementById('get-fibonacci').addEventListener('click', function() {
            var $$list = document.getElementById('intermediate-results');
            $$list.innerHTML = '';

            fetch(
                'api/math/fibonacci'
            ).then(function (response) {
                if(response.ok) {
                    return response.json();
                }
            }).then(function (data) {
                showRes(data.result);
            });
        });
    }

    function bindSocketHandlers() {
        socket.on('connect', function() {
            console.log('Connected to a socket');
        });

        socket.on('intermediate', showIntermediate);
    }

    function showRes(value) {
        var $$resContainer = document.getElementById('res-container');
        $$resContainer.innerText = value;
    }

    function showIntermediate(data) {
        var $$list = document.getElementById('intermediate-results');
        var $$li = document.createElement('li');
        $$li.innerText = data.value;
        $$list.appendChild($$li);

        console.log('New intemediate value ' + data.value);
    }
})();