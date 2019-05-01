import { Component } from "./component";

export class BlueprintClass {
    name: string;
    blueprintComponents: BlueprintComponent[] = [];
    blueprintNames: string[] = [];

    constructor(blueprint?: Partial<BlueprintClass>) {
        Object.assign(this, blueprint);
    }
}

export class BlueprintComponent {
    component: Component;
    values: any;

    constructor(blueprintComponent?: Partial<BlueprintComponent>) {
        Object.assign(this, blueprintComponent);
    }
}

export interface Blueprint {
    name: string;
    components: { name: string, values?: any }[],
    blueprints?: string[]
}