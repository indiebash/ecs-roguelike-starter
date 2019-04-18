import { System, Engine, Entity } from "../../ecs";
import { Map, RNG } from 'rot-js';
import { TileType } from "../constants";
import { PositionComponent } from "../components";
import { RenderComponent } from "../components/render-component";

export class MapGenerationSystem extends System {

    onAttach(engine: Engine) {
        this.generateMapEntities(engine);
        //map = this.generateBoxes(map, map);
        //this.buildMapEntity(engine, map);        
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
        let entity = new Entity();
        entity.putComponent(PositionComponent);
        entity.getComponent(PositionComponent).x = x;
        entity.getComponent(PositionComponent).y = y;
        entity.putComponent(RenderComponent);
        entity.getComponent(RenderComponent).value = value;
        engine.addEntity(entity);
    }

    // generateBoxes(freeCells: MapTile[], map: MapTile[]) {
    //     for (var i=0;i<10;i++) {
    //         var index = Math.floor(RNG.getUniform() * freeCells.length);
    //         map[index].value = TileType.box;
    //     }
    //     return map;
    // }
}