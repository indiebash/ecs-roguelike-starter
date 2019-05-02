import { expect } from "chai";
import * as sinon from 'sinon';
import "mocha";

import { Engine } from "./engine";
import { EntityFactory } from "./entity-factory";

describe("Engine works", function () {
    it("BuildEntity gets called", function () {
        var mockBuildEntity = sinon.fake();
        var mockEntityFactory = {buildEntity: mockBuildEntity};
        let engine = new Engine({}, []);
        engine['entityFactory'] = <EntityFactory>mockEntityFactory;
        engine.buildEntity('test');
        sinon.assert.called(mockBuildEntity);
        sinon.assert.calledWith(mockBuildEntity, 'test')
    });
    it("BuildEntity gets name based off enum", function () {
        enum types { blueprint1, blueprint2 };
        var mockBuildEntity = sinon.fake();
        var mockEntityFactory = {buildEntity: mockBuildEntity};
        let engine = new Engine({}, [], types);
        engine['entityFactory'] = <EntityFactory>mockEntityFactory;
        engine.buildEntity(types.blueprint2);
        sinon.assert.calledWith(mockBuildEntity, 'blueprint2');
    });
    it("BuildEntity throws if type not found", function () {
        enum types { blueprint1, blueprint2 };
        var mockBuildEntity = sinon.fake();
        var mockEntityFactory = {buildEntity: mockBuildEntity};
        let engine = new Engine({}, [], types);
        engine['entityFactory'] = <EntityFactory>mockEntityFactory;
        expect(() => engine.buildEntity(`test`)).to.throw('Invalid blueprint type: test');
        sinon.assert.notCalled(mockBuildEntity);
    });
});