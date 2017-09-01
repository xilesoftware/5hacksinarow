"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./modules/server");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var BASEPATH = __dirname.substring(0, __dirname.length - 3);
var server = new server_1.Server("Server #1");
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.get('/map', function (req, res) {
    res.sendFile(BASEPATH + '/src/views/map.html');
});
io.on('connection', function (socket) {
    server.playerConnect(socket);
    console.log("There are now " + server.playerCount() + " connected.");
    socket.on('chat message', function (msg) {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('tile selection', function (msg) {
        console.log("User: " + socket.id);
        console.log(msg);
    });
    socket.on('disconnect', function (socket) {
        console.log(socket.id);
        server.playerDisconnect(socket);
    });
});
http.listen(3000, function () {
    console.log('listening on *:3000');
});
function generateMap(mapSize) {
    var map = [];
    for (var x = 0; x < mapSize.x; x++) {
        map[x] = [];
        for (var y = 0; y < mapSize.y; y++) {
        }
    }
    return map;
}
function startGame(socket, usersConnected) {
    console.log("User ID: " + socket.id);
    if (usersConnected >= 2) {
        console.log(usersConnected + " players connected...");
        console.log("Generating map...");
        var mapSize = {
            x: 15,
            y: 30
        };
        var map = generateMap(mapSize);
        io.emit('start game', map);
    }
    else {
        console.log("Not enough players connected (" + usersConnected + "/2)");
    }
}
