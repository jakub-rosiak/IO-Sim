import { DeviceStatus } from "../enums/device_status.js";
import { v4 } from "uuid";

export abstract class Device {
  private id: string;
  private name: string;
  private type: string;
  private status: DeviceStatus;
  private isRestarting: boolean = false;

  private errorChance: number = 5 * 10e-4;

  /**
   * Creates a new Device
   * @param type string
   * @param status DeviceStatus
   */
  constructor(name: string, type: string, status: DeviceStatus) {
    this.id = v4();
    this.name = name;
    this.type = type;
    this.status = status;
  }

  /**
   * Returns device ID
   * @returns string
   */
  public getId(): string {
    return this.id;
  }

  /**
   * Returns device name
   * @returns string
   */
  public getName(): string {
    return this.name;
  }

  /**
   * Returns device type
   * @returns string
   */
  public getType(): string {
    return this.type;
  }

  /**
   * Sets device type
   * @param type string
   */
  public setType(type: string): void {
    this.type = type;
  }

  /**
   * Returns device status
   * @returns string
   */
  public getStatus(): string {
    return this.status;
  }

  /**
   * Returns whether device is currently restarting
   * @returns boolean
   */
  public getIsRestarting(): boolean {
    return this.isRestarting;
  }

  /**
   * Tries to turn device on. If device is in ERROR state or is restarting, it cannot be turned on.
   * @returns boolean - true if successful, false otherwise
   */
  public on(): boolean {
    try {
      if (this.status === DeviceStatus.ERROR || this.isRestarting) {
        return false;
      }
      this.status = DeviceStatus.ON;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Tries to turn device off.
   * @returns boolean - true if successful, false otherwise
   */
  public off(): boolean {
    try {
      this.status = DeviceStatus.OFF;
      this.isRestarting = false;
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Restarts the device asynchronously. Turns off the device, waits for a delay,
   * then turns it back on. The operation happens in the background.
   * @param delayMs - Time in milliseconds to wait before turning device back on (default: 300_000)
   * @returns boolean - true if restart was initiated successfully, false otherwise
   */
  public restart(delayMs: number = 300_000): boolean {
    try {
      if (this.status === DeviceStatus.ERROR || this.isRestarting) {
        return false;
      }

      this.isRestarting = true;
      this.status = DeviceStatus.OFF;

      // TODO - handling kiedy sie program skonczy w czasie tego timeout
      setTimeout(() => {
        this.status = DeviceStatus.ON;
        this.isRestarting = false;
      }, delayMs);

      return true;
    } catch {
      this.isRestarting = false;
      return false;
    }
  }

  private error() {
    if (Math.random() < this.errorChance) {
      this.status = DeviceStatus.ERROR;
    }
  }

  public simulate() {
    if (this.status === DeviceStatus.OFF) {
      return;
    } else {
      this.error();
    }
  }
}
