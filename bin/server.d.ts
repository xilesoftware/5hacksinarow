import { Player } from "./player";
import { Game } from "./game";
export declare class Server {
    name: string;
    players: Player[];
    games: Game[];
    constructor(name: string);
    getName(): string;
    playerConnect(socket: any): void;
    playerDisconnect(socket: any): void;
    playerCount(): number;
}
