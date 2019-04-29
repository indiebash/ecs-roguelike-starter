import { appSystems } from "./app-systems";
import { Engine, Entity, EntityFactory } from "../ecs";
import { PositionComponent } from "./components";
import blueprints from '../app/app-blueprints.json';
import * as components from './components';

export class App {
    engine: Engine;

    constructor() {
        this.engine = new Engine(new EntityFactory(blueprints, components));
        this.engine.addSystems(...appSystems);
        let entity = new Entity();
        entity.putComponent(PositionComponent);
        this.engine.addEntity(entity);
        this.engine.update(0);
        this.engine.update(0);
        this.engine.update(0);
    }
}