export abstract class System {
    init: Function;
    update: Function;
}

// type Constructor<T> = {
//     new(...args: any[]): T;
//     readonly prototype: T;
// }
// const implementations: Constructor<System>[] = [];
// export function GetImplementations(): Constructor<System>[] {
//     return implementations;
// }
// export function system<T extends Constructor<System>>(ctor: T) {
//     implementations.push(ctor);
//     console.log('systems implementations', implementations);
//     return ctor;
// }

    // export const registeredClasses = [];
    // export function register() {
    //  return function(target: Function) {
    //       registeredClasses.push(target);
    //       console.log(registeredClasses);
    //  };
    //}
