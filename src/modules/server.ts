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

    playerConnect(socket: any) {
        // Create new player
        this.players.push(new Player(socket.id, "Name of Player"));
        console.log("Player connected.");
    }

    playerDisconnect(socket: any) {
        // Find and remove player from the server
        this.players.forEach((player, index) => {
            if(socket.id == player.id){
                // This is the player that disconnected
                this.players.splice(index, 1);
                console.log(player.name + " disconnected.");
            }
        });
    }
    
    playerCount() {
        return this.players.length;
    }

    createGame() {
        // For now I will generate the game here
        let newGame = new Game("Game #1", "");
        this.games.push(newGame);

        return newGame;
    }
}
