var socket = io();

// Listen
socket.on('connect', function () {
    console.log('Connect to server');
});

socket.on('disconnect', function () {
    console.log('Lost connection')
});