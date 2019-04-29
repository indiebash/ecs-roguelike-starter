import { expect } from "chai";
import "mocha";

import * as lib from "./index";

import { Engine } from "./engine";
import { Entity } from "./entity";
import { FamilyBuilder } from "./family";
import { System } from "./system";
import { EntityFactory } from "./entity-factory";
import { Blueprint, BlueprintComponent } from "./blueprint";

describe("ECS modules are exported", function() {
  it("Engine is exported", function() {
    expect(lib.Engine).to.equal(Engine);
    expect(lib.Engine).to.not.be.null;
    expect(lib.Engine).to.not.be.undefined;
  });
  it("Entity is exported", function() {
    expect(lib.Entity).to.equal(Entity);
    expect(lib.Entity).to.not.be.null;
    expect(lib.Entity).to.not.be.undefined;
  });
  it("FamilyBuilder is exported", function() {
    expect(lib.FamilyBuilder).to.equal(FamilyBuilder);
    expect(lib.FamilyBuilder).to.not.be.null;
    expect(lib.FamilyBuilder).to.not.be.undefined;
  });
  it("System is exported", function() {
    expect(lib.System).to.equal(System);
    expect(lib.System).to.not.be.null;
    expect(lib.System).to.not.be.undefined;
  });
  it("Entity factory is exported", function() {
    expect(lib.EntityFactory).to.equal(EntityFactory);
    expect(lib.EntityFactory).to.not.be.null;
    expect(lib.EntityFactory).to.not.be.undefined;
  });
  it("Blueprint is exported", function() {
    expect(lib.Blueprint).to.equal(Blueprint);
    expect(lib.Blueprint).to.not.be.null;
    expect(lib.Blueprint).to.not.be.undefined;
  });
  it("Blueprint component is exported", function() {
    expect(lib.BlueprintComponent).to.equal(BlueprintComponent);
    expect(lib.BlueprintComponent).to.not.be.null;
    expect(lib.BlueprintComponent).to.not.be.undefined;
  });
});
