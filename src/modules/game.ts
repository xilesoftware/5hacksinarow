import { Map } from "./map";

export class Game {

    name: string;
    password: string;
    paused: boolean; // If this is true, the game will be frozen
    map: Map; // This variable will hold the map for this game

    constructor(name: string, password: string) {
        this.name = name;
        this.password = password;
        console.log("Starting game: " + this.name);

        // Generate a new map
        let mapSize = {
            x: 15,
            y: 30
        };

        this.map = new Map(mapSize);
    }
}
