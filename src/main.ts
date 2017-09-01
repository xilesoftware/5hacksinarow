//#############################################################################
// Start web server
// console.log("Start");

// var express = require('express');
// var app = express();
// var http = require("http");

// app.get('/', function (req, res) {
//    res.send('Hello World');
// })

// http.createServer(function (request, response) {
//    // Send the HTTP header
//    // HTTP Status: 200 : OK
//    // Content Type: text/plain
//    response.writeHead(200, {'Content-Type': 'text/plain'});

//    // Send the response body as "Hello World"
//    response.end('Hello World\n');
// }).listen(8081);

// // Console will print the message
// console.log('Server running at http://127.0.0.1:8081/');

//#############################################################################
// Reading file

// var fs = require("fs");

// Non-blocking code
// var data = fs.readFileSync('db.txt');
// console.log(data.toString());

// Blocking code
// fs.readFile('db.txt', function (err, data) {
//    if (err) return console.error(err);
//    console.log(data.toString());
// });

// console.log("Program Ended");
//#############################################################################
// Import events module
// var events = require('events');


// // Create an eventEmitter object
// var eventEmitter = new events.EventEmitter();

// // Create an event handler as follows
// var connectHandler = function connected() {
//    console.log('connection succesful.');

//    // Fire the data_received event
//    eventEmitter.emit('data_received');
// }

// // Bind the connection event with the handler
// eventEmitter.on('connection', connectHandler);

// // Bind the data_received event with the anonymous function
// eventEmitter.on('data_received', function(){
//    console.log('data received succesfully.');
// });

// // Fire the connection event
// eventEmitter.emit('connection');

// console.log("Program Ended.");

//#############################################################################
// Server

import { Server } from "./modules/server";
import { Game } from "./modules/game";
import { Map } from "./modules/map";
import { Tile } from "./modules/tile";
import { Player } from "./modules/player";

// let player = new Player("world");
// console.log(player.getName());

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const BASEPATH = __dirname.substring(0, __dirname.length - 3);

//var map = [];
var server = new Server("Server #1");

app.get('/', function(req: any, res: any){
    res.sendFile(__dirname + '/index.html');
});

app.get('/map', function(req: any, res: any){
    res.sendFile(BASEPATH + '/src/views/map.html');
});

io.on('connection', function(socket: any){

    server.playerConnect(socket);

    console.log("There are now " + server.playerCount() + " player(s) connected.");

    if(server.playerCount() >= 2){
        // Only start a new game if there is none.
        if(server.games.length == 0){
            var game = server.createGame();
            // Send map to all players
            io.emit('update map', game.map);
        }
    }

    // startGame(socket, usersConnected);

    socket.on('chat message', function(msg: string){
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });

    socket.on('tile selection', function(msg: string){
        console.log("User: "+socket.id);
        console.log(msg);

        //map[msg.x][msg.y] = 1;

        // console.log('client made tile seleciton: ' + msg);
        //io.emit('update map', map);
    });

    socket.on('disconnect', function(){
        server.playerDisconnect(socket);
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

function generateMap(mapSize: any){
    var map = [];

    for(var x = 0; x < mapSize.x; x++){
        map[x] = [];

        for(var y = 0; y < mapSize.y; y++){
            //map[x][y] = 0;
        }
    }

    return map;
}

function startGame(socket: any, usersConnected: number){
    console.log("User ID: "+socket.id);
    if(usersConnected >= 2){
        console.log(usersConnected+" players connected...");
        console.log("Generating map...");

        let mapSize = {
            x: 15,
            y: 30
        };

        let map = generateMap(mapSize);

        io.emit('start game', map);
    }else{
        console.log("Not enough players connected ("+usersConnected+"/2)");
    }
}

//#############################################################################
