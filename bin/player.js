"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = (function () {
    function Player(id, name) {
        this.id = id;
        this.name = name;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    return Player;
}());
exports.Player = Player;
