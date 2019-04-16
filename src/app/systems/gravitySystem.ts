import { System } from "../../ecs";

export class GravitySystem implements System {
    init() {
        console.log('gravity system initialized');
    }

    update() {
        console.log('gravity system update');
    }
}