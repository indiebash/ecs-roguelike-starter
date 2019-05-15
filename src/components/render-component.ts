import { Component } from '@mesa-engine/core';

export class RenderComponent implements Component {
    character: string;
    color: string;
    background: string = "transparent";
}