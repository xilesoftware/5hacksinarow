"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var player_1 = require("./player");
var Server = (function () {
    function Server(name) {
        this.name = name;
        this.players = [];
        this.games = [];
        console.log("Server initiated: " + this.name);
    }
    Server.prototype.getName = function () {
        return this.name;
    };
    Server.prototype.playerConnect = function (socket) {
        this.players.push(new player_1.Player(socket.id, "Name of Player"));
    };
    Server.prototype.playerDisconnect = function (socket) {
        console.log(socket.id);
        this.players.forEach(function (player) {
            console.log(socket.id);
            console.log(player);
        });
    };
    Server.prototype.playerCount = function () {
        return this.players.length;
    };
    return Server;
}());
exports.Server = Server;
