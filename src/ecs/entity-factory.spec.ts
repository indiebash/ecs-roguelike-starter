import { expect } from "chai";
import "mocha";

import { EntityFactory } from "./entity-factory";
import { Component } from "./Component";

class TestComponent1 implements Component{ }

describe("Entity factory works", function() {
    it("Can make entity", function() {
        let test = [
            {
                "name": "Base",
                "blueprints": [],
                "components": [
                    { "name": "PositionComponent", "values": {} },
                    { "name": "RenderComponent", "values": {} }
                ]
            }
        ];
        const factory = new EntityFactory(test, {TestComponent1});
        let entity = factory.buildEntity(<any>"Base");
        expect(() => entity.hasComponent(TestComponent1)).to.be.true;
      });
});
