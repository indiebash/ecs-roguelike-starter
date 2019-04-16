import { Component } from "./component";

    export class Entity {
        id: number;
        components: Map<number, Component>;
    }
