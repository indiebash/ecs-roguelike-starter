import { Component } from "./";

export class Entity {
    id: number;
    components: Map<number, Component>;
}