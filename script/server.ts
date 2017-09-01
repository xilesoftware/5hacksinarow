import { Player } from "./player";
import { Game } from "./game";

export class Server {

    name: string; // In case we have multiple servers running
    players: Player[]; // This variable will hold all players connected to the game
    games: Game[]; // This variable will hold all games that is running

    constructor(name: string) {
        this.name = name;
        this.players = [];
        this.games = [];

        console.log("Server initiated: " + this.name);
    }

    getName() {
        return this.name;
    }

    playerConnect(socket: any) {
        // Create new player
        this.players.push(new Player(socket.id, "Name of Player"));
    }

    playerDisconnect(socket: any) {
            console.log(socket.id);
        // Find and remove player from the server
        this.players.forEach(player => {
            console.log(socket.id);
            console.log(player);
        });
    }
    
    playerCount() {
        return this.players.length;
    }
}
