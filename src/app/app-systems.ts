import { System } from '@mesa-engine/core';
import * as s from "./systems";

const appSystems: System[] = [
    new s.MapGenerationSystem(),
    new s.RenderSystem(),
];

export { appSystems };