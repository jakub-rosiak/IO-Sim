import { Room } from './room.js';

export class Floor {
    private id: string;
    private type: string;
    private rooms = new Map<string, Room>();

    constructor(id: string, type: string) {
        this.id = id;
        this.type = type;
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public addRoom(room: Room) {
        this.rooms.set(room.getId(), room);
    }

    public removeRoom(room: Room) {
        this.rooms.delete(room.getId());
    }

    public simulate() {
        for (const room of this.rooms.values()) {
            room.simulate();
        }
    }
}