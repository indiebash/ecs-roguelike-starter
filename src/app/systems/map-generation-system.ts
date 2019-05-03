import { System, Engine } from '@mesa-engine/core';
import { Map } from 'rot-js';
import { TileType } from "../constants";
import { PositionComponent } from "../components";
import { RenderComponent } from "../components/render-component";
import { BlueprintType } from "../blueprints";
const bp = BlueprintType;

export class MapGenerationSystem extends System {
    

    onAttach(engine: Engine) {
        this.generateMapEntities(engine);
    }
 
    update() {

    }

    generateMapEntities(engine: Engine) {
        let digger = new Map.Digger(50, 50);
 
        var digCallback = function(x: any, y: any, value: any) {
            if (value) { return; } /* do not store walls */
            
            this.buildMapEntity(engine, x, y, TileType.ground);
        }

        digger.create(digCallback.bind(this));
    }

    buildMapEntity(engine: Engine, x: number, y: number, value: TileType) {
        let entity = engine.buildEntity(bp.Renderable);
        entity.getComponent(PositionComponent).x = x;
        entity.getComponent(PositionComponent).y = y;
        entity.getComponent(RenderComponent).value = value;
        entity.getComponent(RenderComponent).color = 'white';
        entity.getComponent(RenderComponent).background = 'brown';
        engine.addEntity(entity);
    }
}