import type { Producer } from "../interfaces/producer.js";
import { Device } from "../abstract/device.js";
import type { DeviceStatus } from "../enums/device_status.js";

class HeatPump extends Device implements Producer {
  private power: number;

  constructor(
    power: number,
    name: string,
    type: string,
    status: DeviceStatus
  ) {
    super(name, type, status);
    this.power = power;
  }

  public write(): void {
    // TODO
    console.log(
      `HeatPump ${this.getName()} is producing ${this.power} kW of heat.`
    );
  }
}
