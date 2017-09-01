export class Tile {

    walkable: boolean;

    constructor() {
        let randomInt = Math.floor(Math.random() * (100 - 0 + 1)) + 0;
        // console.log(randomInt);
        if(randomInt < 90){
            this.walkable = true;
        }else{
            this.walkable = false;
        }
    }
}
