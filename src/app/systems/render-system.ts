import { Family, Engine, FamilyBuilder, System } from "../../ecs";
import { Display } from "rot-js";
import { PositionComponent, RenderComponent } from "../components";
import { DisplayOptions } from "rot-js/lib/display/types";
import tilesetImage from "../../img/tileset.png";

export class RenderSystem extends System {
    //tileset: HTMLImageElement
    family: Family;

    onAttach(engine: Engine) {
        let tileset = new Image();
        tileset.src = tilesetImage;
        //tileset.onload = function(){console.log('image works')};

        let options: Partial<DisplayOptions> = {
            layout: "tile",
            bg: "transparent",
            tileWidth: 16,
            tileHeight: 16,
            tileSet: tileset,
            tileMap: {
                "@": [16, 0],
                "#": [0, 64],
                '.': [176, 32]
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
        for (let entity of this.family.entities) {
            let position = entity.getComponent(PositionComponent);
            let render = entity.getComponent(RenderComponent);
            engine['display'].draw(position.x, position.y, render.value);
        }
    }
}
