import { Component } from "./component";
import { BlueprintType } from "../app/constants";

export class Blueprint {
    name: BlueprintType;
    components: BlueprintComponent[] = [];
    blueprints: BlueprintType[] = [];

    constructor(name: BlueprintType, components: BlueprintComponent[], blueprints?: BlueprintType[]) {
        this.name = name;
        this.components = components;
        this.blueprints = blueprints ? blueprints : [];
    }
    
}

export class BlueprintComponent {
    component: Component;
    values: any;

    constructor(component: Component, values?: any) {
        this.component = component;
        this.values = values ? values : {};
    }
}