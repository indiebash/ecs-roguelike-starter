import { EntityManager } from "../ecs";

export class App {
    entityManager: EntityManager;

    constructor() {
        this.entityManager = new EntityManager();
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