(function () {
    var socket = io();

    socket.on('connect', function(){
        console.log('Connected to a socket');
    });

    bindEventListeners();

    function bindEventListeners() {
        document.addEventListener('click', function(event) {
            if (event.target.id !== 'get-fibonacci') {
                return;
            }

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

    function showRes(value) {
        var $$resContainer = document.getElementById('res-container');
        $$resContainer.innerText = value;
    }
})();