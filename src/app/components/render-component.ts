import { Component } from '@mesa-engine/core';

export class RenderComponent implements Component {
    value: string;
    color: string;
    background: string = "transparent";
}