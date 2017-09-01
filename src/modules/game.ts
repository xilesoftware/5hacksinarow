import { Map } from "./map";
import { Player } from "./player";

export class Game {

    name: string;
    password: string;
    players: Player[]; // This variable will hold all players connected to the game
    
    currentPlayersTurn: number; // This variable keep track of which players turn it is (index of this.players)
    currentTurn: number; // This variable keep track of what turn it is
    
    paused: boolean; // If this is true, the game will be frozen
    map: Map; // This variable will hold the map for this game

    constructor(name: string, password: string, players: Array<Player>) {
        this.name = name;
        this.password = password;
        this.players = players;
        this.currentPlayersTurn = 0; // For now the first player will start

        console.log("Starting game: " + this.name);

        // Generate a new map
        let mapSize = {
            x: 15,
            y: 30
        };

        this.map = new Map(mapSize);
    }

    tileSelection(socket: any, json: any) {

        console.log(this.currentPlayersTurn);
        this.players.forEach((player, index) => {
            if(socket.id == player.id && this.currentPlayersTurn == index){
                // This is a correct move
                console.log(socket.id + " checked a tile.");
                console.log(json);
            }else{
                console.log("It is not your turn");
            }
        });
    }
}
