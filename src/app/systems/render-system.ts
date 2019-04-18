import { Family, Engine, FamilyBuilder, System } from "../../ecs";
import { Display } from "rot-js";
import { PositionComponent, RenderComponent } from "../components";
import { DisplayOptions } from "rot-js/lib/display/types";

export class RenderSystem extends System {
    tileset: HTMLImageElement
    family: Family;

    onAttach(engine: Engine) {
        this.tileset = <HTMLImageElement>document.getElementById("tileset");
        // this.tileset.src = "img/tileset.png";

        // this.tileset.onload = function () {
        //     console.log('loaded image');
        //     this.tileset.id = 'tileset';
        //     this.update(engine, 0);
        // }.bind(this);

        // function loaded() {
        //     alert('loaded')
        //   }

        //   if (this.tileset.complete) {
        //     loaded()
        //   } else {
        //     this.tileset.addEventListener('load', loaded)
        //     this.tileset.addEventListener('error', function() {
        //         alert('error')
        //     })
        //   }

        let options = {
            layout: "tile",
            bg: "transparent",
            tileWidth: 16,
            tileHeight: 16,
            tileSet: this.tileset,
            tileMap: {
                "@": [0, 16],
                "#": [0, 64],
                '.': [0, 4]
            },
            width: 1,
            height: 1
        }

        engine['display'] = new Display();

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
