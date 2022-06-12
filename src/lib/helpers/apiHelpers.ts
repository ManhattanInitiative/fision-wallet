import { onMessage } from "webext-bridge";

/** Registers an method with the webext-bridge */
export function ApiEndpoint(id: string) {
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