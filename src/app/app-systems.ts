import { System } from "../ecs";
import * as app from "./systems";

const appSystems: System[] = [
    new app.GravitySystem(),
    new app.MovementSystem()
];

export { appSystems };