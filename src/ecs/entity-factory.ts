import { BlueprintType } from "../app/constants";
import { Blueprint, BlueprintComponent } from "./blueprint";
import { Entity } from "./entity";

export class EntityFactory {
    private blueprints: Blueprint[] = [];
    private components;

    // TODO - Validate json (no duplicate named blueprints etc);
    // TODO - Implement a caching strategy if we've already built an entity;
    
    constructor(blueprintJson, componentModule) {
        this.components = componentModule;
        this.blueprints = this.buildBlueprintsFromJson(blueprintJson);
    }

    public buildEntity(type: BlueprintType): Entity {
        return this.getEntityFromBlueprint(this.getBlueprintFromType(type), new Entity());
    }

    private getEntityFromBlueprint(blueprint: Blueprint, entity: Entity): Entity {

        // Recursively add components from inherited blueprints
        blueprint.blueprints.forEach(x => {
            entity = this.getEntityFromBlueprint(this.getBlueprintFromType(x), entity);
        });

        blueprint.components.forEach(x => {
            entity.putComponent(<any>x.component);

            // Overwrite values of component based off of blueprint;
            if (x.values) {
                let component = entity.getComponent(<any>x.component);
                Object.getOwnPropertyNames(x.values).forEach(value => component[value] = x.values[value]);
            }
        });

        return entity;
    }

    private getBlueprintFromType(type: BlueprintType): Blueprint {
        let blueprint = this.blueprints.find(x => x.name === type);
        if (!blueprint) {
            throw new Error("Cannot find blueprint by that name.");
        }
        return blueprint;
    }

    private buildBlueprintsFromJson(jsonBlueprints): Blueprint[] {
        return jsonBlueprints.map(x =>
            new Blueprint(
                x.name,
                this.getComponentsFromJson(x.components),
                this.hasBlueprints(x) ? x.blueprints : []
            )
        );
    }

    private hasBlueprints(jsonBlueprint) {
        return jsonBlueprint.blueprints && jsonBlueprint.blueprints.length > 0;
    }

    /**
     * Converts json components to blueprint components.
     * @throws if the list is empty.
     * @param components json array for the blueprints components.
    */
    private getComponentsFromJson(components): BlueprintComponent[] {
        if (!components || components.length === 0) {
            throw new Error("Blueprint must implement one or more components.");
        } else {
            return components.map(x => new BlueprintComponent(this.components[x.name], x.values));
        }
    }
}