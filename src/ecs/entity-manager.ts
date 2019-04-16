import { Entity, System } from './';
import { Component } from './component';
import { GravitySystem } from '../app/systems/gravitySystem';

export class EntityManager {
    entities: Map<number, Entity>;
    components: [Component[]];
    systems: System[] = [];

    constructor() {
        this.createSystems();
    }

    update() {
        this.systems.forEach((system: System) => {
            system.update();
        });
    };

    createSystems() {
        var test = new GravitySystem();
        //var systems = System.GetImplementations();
        //console.log('controlPanels', systems);
        //var system = Object.create(window["SystemName"].prototype);

        // for (var x = 0; x < controlPanels.length; x++) {
        //     document.write(controlPanels[x].name + ", ");
        //     const panel = new controlPanels[x]();
        //     panel.init();
        // }
    };

    createEntity() {};

    destroyEntity() {};
}