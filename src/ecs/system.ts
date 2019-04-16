export abstract class System {
    init: Function;
    update: Function;
}

// export namespace System {
//     type Constructor<T> = {
//       new(...args: any[]): T;
//       readonly prototype: T;
//     }
//     // const implementations: Constructor<System>[] = [];
//     // export function GetImplementations(): Constructor<System>[] {
//     //   return implementations;
//     // }
//     // export function register<T extends Constructor<System>>(ctor: T) {
//     //   implementations.push(ctor);
//     //   return ctor;
//     // }

//     export const registeredClasses = [];
//     export function register() {
//      return function(target: Function) {
//           registeredClasses.push(target);
//           console.log(registeredClasses);
//      };
// }
// }