import { Blueprint } from '@mesa-engine/core';
import * as c from '../components';

export class Renderable implements Blueprint {
    components = [{component: c.PositionComponent}, {component: c.RenderComponent}];
}

export class Player implements Blueprint {
    components = [{component: c.RenderComponent, values: {sprite: '@'}}];
    blueprints = [new Renderable]
}