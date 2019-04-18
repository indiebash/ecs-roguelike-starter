import { appSystems } from "./app-systems";
import { Engine, Entity } from "../ecs";
import { PositionComponent } from "./components";

export class App {
    engine: Engine;

    constructor() {
        this.engine = new Engine();
        this.engine.addSystems(...appSystems);
        let entity = new Entity();
        entity.putComponent(PositionComponent);
        this.engine.addEntity(entity);
        this.engine.update(0);
        this.engine.update(0);
        this.engine.update(0);
    }
}