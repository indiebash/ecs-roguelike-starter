import { Entity, Component, System } from '.';

export class EntityManager {
    entities: Map<number, Entity>;
    components: [Component[]];
    systems: System[] = [];

    constructor(systems: System[]) {
        this.createSystems(systems);
    }

    update() { 
        this.systems.forEach(system => system.update())
    };

    createSystems(systems: System[]) {
        this.systems = systems;
        this.systems.forEach(system => system.init());
    };

    createEntity() { };

    destroyEntity() { };
}


// Below is a sample of deserializing objects from json.
// Could be useful for deserialising entity blueprints. 

// interface Serializable<T> {
//     deserialize(input: Object): T;
// }

// class Member implements Serializable<Member> {
//     id: number;

//     deserialize(input) {
//         this.id = input.id;
//         return this;
//     }
// }

// class ExampleClass implements Serializable<ExampleClass> {
//     mainId: number;
//     firstMember: Member;
//     secondMember: Member;

//     deserialize(input) {
//         this.mainId = input.mainId;

//         this.firstMember = new Member().deserialize(input.firstMember);
//         this.secondMember = new Member().deserialize(input.secondMember);

//         return this;
//     }
// }

// var json = {
//     mainId: 42,
//     firstMember: {
//         id: 1337
//     },
//     secondMember: {
//         id: -1
//     }
// };

// var instance = new ExampleClass().deserialize(json);
// console.log(instance);
