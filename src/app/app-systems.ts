import { System } from "../ecs";
import * as app from "./systems";

const appSystems: System[] = [
    new app.MapGenerationSystem(),
    new app.RenderSystem(),
];

export { appSystems };