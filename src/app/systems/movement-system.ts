import { System, Engine, FamilyBuilder, Family, Component, Entity, ComponentClass } from "../../ecs";
import { PositionComponent } from "../components";

class MyComponent implements Component {}

export class MovementSystem extends System {
    family: Family;

    onAttach(engine: Engine) {
        super.onAttach(engine);
        this.family = new FamilyBuilder(engine).include(PositionComponent).build();
    }

    update(engine: Engine, delta: number) {
        for (let entity of this.family.entities) {
            const position = entity.getComponent(PositionComponent);
            position.x += 1;
            console.log('movement system x', position.x);
        }
    }
}