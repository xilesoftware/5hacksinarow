import { Tile } from "./tile";

export class Map {

    map: Tile[][]; // This is a multi dimentional array of Tiles

    constructor(mapSize: any) {
        console.log("Generating map " + mapSize.x + "x" + mapSize.y);
        
        this.map = [];

        for(var x = 0; x < mapSize.x; x++){
            this.map[x] = [];

            for(var y = 0; y < mapSize.y; y++){
                this.map[x][y] = new Tile();
            }
        }
    }
}
