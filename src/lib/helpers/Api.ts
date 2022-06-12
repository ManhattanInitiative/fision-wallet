import { onMessage } from "webext-bridge";


const APIManagers = new Map()

// Not sure if this is good practice
// Usable just with classes definitions
export const ApiManager = <T extends { new(...args: any[]): {} }>(constructor: T) => {
    if (APIManagers.has(constructor.name)) {
        console.warn(`API[${constructor.name}] manager already registered!`)
        return;
    }

    APIManagers.set(constructor.name, new constructor)

    if (APIManagers.get(constructor.name) !== undefined)
        console.log("API manager registered:", constructor.name)
}

export function ApiEndpoint(id: string | number) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const method = target[propertyKey];

        if (method === undefined) {
            return;
        }

        if (typeof method === "function") {
            onMessage(id, method)
        }
    };
}
