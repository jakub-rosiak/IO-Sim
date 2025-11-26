import { Floor } from "./floor.js";

export class Building {
  private floors = new Map<string, Floor>();

  public addRoom(floor: Floor) {
    this.floors.set(floor.getId(), floor);
  }

  public removeRoom(floor: Floor) {
    this.floors.delete(floor.getId());
  }

  public simulate() {
    for (const floor of this.floors.values()) {
      floor.simulate();
    }
  }
}
