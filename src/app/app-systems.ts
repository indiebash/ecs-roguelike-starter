import { System } from '@mesa-engine/core';
import * as app from "./systems";

const appSystems: System[] = [
    new app.MapGenerationSystem(),
    new app.RenderSystem(),
];

export { appSystems };