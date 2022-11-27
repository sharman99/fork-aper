const socket = new WebSocket('ws://localhost:3000/ws');
const socket2 = new WebSocket('ws://localhost:8080/testing_print');

var textinput = null;
var servertextbox = null;
var servertextbox2 = null;
var textdata = null;

socket.addEventListener('open', function (event) {
    socket.send('Hello rust Server!');
});

socket2.addEventListener('open', function (event) {
    socket2.send('Hello go Server!');
});

socket.addEventListener('message', function (event) {
    console.log('Message from rust server ', event.data);
    servertextbox.append(event.data+'\n')
});

socket2.addEventListener('message', function (event) {
    console.log('Message from go server ', event.data);
    servertextbox2.append(event.data+'\n')
});

window.onload = function() {
    servertextbox = document.getElementById('servertext');
    servertextbox2 = document.getElementById('servertext2');
    textinput = document.getElementById('data');

    textinput.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            sendo();
        }
    })
};

function sendo() {
    var data = textinput.value;
    if (data === null || data.trim() === "") {
        console.log('data was empty or null')
    } else {
        socket.send(data);
    }
}