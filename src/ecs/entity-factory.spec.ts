import { expect } from "chai";
import "mocha";

import { EntityFactory } from "./entity-factory";
import { Component } from "./Component";
import { Entity } from "./Entity";

describe("Entity factory works", function () {
    it("Can make entity", function () {
        class TestComponent1 implements Component {}
        let testComponents = { TestComponent1 };

        let testBlueprints = [
            {
                "name": "Base",
                "components": [
                    { "name": "TestComponent1" }
                ]
            }
        ];

        const factory = new EntityFactory(testBlueprints, testComponents);
        let entity = factory.buildEntity(<any>"Base");
        expect(entity.hasComponent(TestComponent1)).to.be.true;
    });

    it("Built entity inherits components from other blueprints", function () {
        class TestComponent1 implements Component {}
        class TestComponent2 implements Component {}
        class TestComponent3 implements Component {}
        class TestComponent4 implements Component {}
        let testComponents = { TestComponent1, TestComponent2, TestComponent3, TestComponent4 };

        let testBlueprints = [
            {
                "name": "Base",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
            {
                "name": "Inherits",
                "blueprints": ["Base"],
                "components": [
                    { "name": "TestComponent2" },
                    { "name": "TestComponent3" }
                ]
            },
            {
                "name": "InheritsTwice",
                "blueprints": ["Inherits"],
                "components": [
                    { "name": "TestComponent4" }
                ]
            }
        ];
        const factory = new EntityFactory(testBlueprints, testComponents);
        let entity = factory.buildEntity(<any>"InheritsTwice");
        expect(entity.hasComponent(TestComponent1)).to.be.true;
        expect(entity.hasComponent(TestComponent2)).to.be.true;
        expect(entity.hasComponent(TestComponent3)).to.be.true;
        expect(entity.hasComponent(TestComponent4)).to.be.true;
    });

    it("Child blueprint overrides inherited component values", function () {
        class TestComponent1 implements Component { value = 'default'; value2 = 'untouched' }
        class TestComponent2 implements Component { value = 'default'; }
        class TestComponent3 implements Component { value = 'default'; }
        let testComponents = { TestComponent1, TestComponent2, TestComponent3 };

        let testBlueprints = [
            {
                "name": "Base",
                "blueprints": [],
                "components": [
                    { "name": "TestComponent1", "values": {value: 'baseChanged'} },
                    { "name": "TestComponent2", "values": {value: 'baseChanged'} },
                    { "name": "TestComponent3", "values": {} }
                ]
            },
            {
                "name": "Inherits",
                "blueprints": ["Base"],
                "components": [
                    { "name": "TestComponent2", "values": {value: 'inheritsChanged'} }
                ]
            }
        ];
        const factory = new EntityFactory(testBlueprints, testComponents);
        let entity = factory.buildEntity(<any>"Inherits");
        expect(entity.getComponent(TestComponent1).value).to.equal('baseChanged');
        expect(entity.getComponent(TestComponent1).value2).to.equal('untouched');
        expect(entity.getComponent(TestComponent2).value).to.equal('inheritsChanged');
        expect(entity.getComponent(TestComponent3).value).to.equal('default');
    });

    it("Blueprint must implement at least one component", function () {
        const factory = new EntityFactory([], {});
        expect(() => factory['getComponentsFromJson']([])).to.throw();
    });
    
    it("Blueprint type must exist", function () {
        //TODO enter actual array of types
        const factory = new EntityFactory([], {});
        expect(() => factory['getBlueprintFromType'](<any>'NotFound')).to.throw();
    });

    it("JSON should exist", function () {
        expect(() => new EntityFactory(undefined, {})).to.throw('Must input json array of blueprints.');
    });

    it("JSON should be array", function () {
        expect(() => new EntityFactory({}, {})).to.throw('Must input json array of blueprints.');
    });

    it("JSON blueprints must all have a name", function () {
        let testBlueprints = [
            {
                "name": "Base",
                "blueprints": [],
                "components": [
                    { "name": "TestComponent1", "values": {value: 'baseChanged'} },
                    { "name": "TestComponent2", "values": {value: 'baseChanged'} },
                    { "name": "TestComponent3", "values": {} }
                ]
            },
            {
                "blueprints": ["Base"],
                "components": [
                    { "name": "TestComponent2", "values": {value: 'inheritsChanged'} }
                ]
            }
        ];
        expect(() => new EntityFactory(testBlueprints, {})).to.throw('All blueprints must have a name.');
    });

    it("JSON blueprints must all have a unique name", function () {
        let testBlueprints = [
            {
                "name": "Same",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
            {
                "name": "different",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
            {
                "name": "Same",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
        ];
        expect(() => new EntityFactory(testBlueprints, {})).to.throw('All blueprints must have a unique name.');
    });

    it("JSON blueprints must all implement one or more components", function () {
        let testBlueprints: any[] = [
            {
                "name": "Same",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
            {
                "name": "different",
                "components": []
            }
        ];
        expect(() => new EntityFactory(testBlueprints, {})).to.throw('All blueprints must implement one or more components.');
        
        testBlueprints = [
            {
                "name": "Same",
                "components": [
                    { "name": "TestComponent1" }
                ]
            },
            {
                "name": "different"
            }
        ];
        expect(() => new EntityFactory(testBlueprints, {})).to.throw('All blueprints must implement one or more components.');
    
    });
});
