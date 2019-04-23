import { BlueprintType } from "../app/constants";
import { Blueprint, BlueprintComponent } from "./blueprint";
import { Entity } from "./entity";

export class EntityFactory {
    private blueprints;
    private components;

    constructor(blueprints, components) {
        this.blueprints = blueprints;
        this.components = components;
    }
    
    public buildEntity(type: BlueprintType): Entity {
        console.log('building from blueprint', this.getBlueprintFromType(type));
        return this.getEntityFromBlueprint(this.getBlueprintFromType(type), new Entity());
    }

    private getEntityFromBlueprint(blueprint: Blueprint, entity: Entity): Entity {
        blueprint.components.forEach(x => {
            entity.putComponent(<any>x.component);
            let component = entity.getComponent(<any>x.component);
            // TODO iterate over value properties and set.
            // TODO recursively build inherited components.
        });

        return entity;
    }

    private getBlueprintFromType(type: BlueprintType): Blueprint {
        let jsonBlueprint = this.blueprints.find(x => x.name === type);
        if (!jsonBlueprint) {
            throw new Error("Cannot find blueprint by that name.");
        }
        return this.buildBlueprintFromJson(jsonBlueprint);
    }

    private buildBlueprintFromJson(jsonBlueprint): Blueprint {
        return new Blueprint(
            jsonBlueprint.name,
            this.getComponentsFromJson(jsonBlueprint.components),
            this.hasBlueprints(jsonBlueprint) ? jsonBlueprint.blueprints.map(x => this.buildBlueprintFromJson(x)) : []
        );
    }

    private hasBlueprints(jsonBlueprint) {
        return jsonBlueprint.blueprints && jsonBlueprint.blueprints.length > 0;
    }

    private getComponentsFromJson(components): BlueprintComponent[] {
        console.log('trying to build components', components);
        if (!components || components.length === 0) {
            throw new Error("Blueprint must implement one or more components.");
        } else {
            return components.map(x => new BlueprintComponent(this.components[x.name], x.values));
        }
    }
}