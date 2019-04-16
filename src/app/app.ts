import { EntityManager } from "../ecs";
import { appSystems } from "./app-systems";

export class App {
    entityManager: EntityManager;

    constructor() {
        this.entityManager = new EntityManager(appSystems);
    }

    init() {
        this.update();
        this.update();
        this.update();
    };

    update() {
        console.log('updating');
        this.entityManager.update();
    };
}