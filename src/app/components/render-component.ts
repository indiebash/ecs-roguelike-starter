import { Component } from "../../ecs";

export class RenderComponent implements Component {
    value: string;
    color: string;
    background: string = "transparent";
}