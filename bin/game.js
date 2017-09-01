"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = (function () {
    function Game(name, password) {
        this.name = name;
        this.password = password;
    }
    Game.prototype.getName = function () {
        return this.name;
    };
    return Game;
}());
exports.Game = Game;
