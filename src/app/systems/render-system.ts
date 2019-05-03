import { Family, Engine, FamilyBuilder, System } from '@mesa-engine/core';
import { Display } from "rot-js";
import { PositionComponent, RenderComponent } from "../components";
import { DisplayOptions } from "rot-js/lib/display/types";
// @ts-ignore
import tilesetImage from "../../img/tileset2.png";

export class RenderSystem extends System {
    //tileset: HTMLImageElement
    family: Family;

    onAttach(engine: Engine) {
        let tileset = new Image();
        tileset.src = tilesetImage;

        let options: Partial<DisplayOptions> = {
            layout: "tile",
            bg: "black",
            tileColorize: true,
            tileWidth: 16,
            tileHeight: 16,
            tileSet: tileset,
            tileMap: {
                "@": [16, 0],
                "#": [0, 64],
                '.': [175, 34]
            },
            width: 50,
            height: 50
        }

        engine['display'] = new Display(options);

        document.body.appendChild(engine['display'].getContainer());

        super.onAttach(engine);
        this.family = new FamilyBuilder(engine).include(PositionComponent, RenderComponent).build();
    }

    update(engine: Engine, delta: number) {
        console.log('update')
        for (let entity of this.family.entities) {
            let position = entity.getComponent(PositionComponent);
            let render = entity.getComponent(RenderComponent);
            engine['display'].draw(position.x, position.y, render.value, render.color, render.background);
        }
    }
}
