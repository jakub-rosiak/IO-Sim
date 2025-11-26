import { Device } from "../abstract/device.js";

export class Room {
    private id: string;
    private type: string;
    private temperature: number;
    private humidity: number;
    private devices = new Map<string, Device>();

    constructor(id: string, type: string, temperature: number, humidity: number) {
        this.id = id;
        this.type = type;
        this.temperature = temperature;
        this.humidity = humidity;
    }

    public getId(): string {
        return this.id;
    }

    public getType(): string {
        return this.type;
    }

    public getTemperature(): number {
        return this.temperature;
    }

    public getHumidity(): number {
        return this.humidity;
    }

    public addDevice(device: Device) {
        this.devices.set(device.getId(), device);
    }

    public removeDevice(device: Device) {
        this.devices.delete(device.getId());
    }

    public simulate(): string {
        for (const device of this.devices.values()) {
            device.simulate();
        }
        return '';
    }
}