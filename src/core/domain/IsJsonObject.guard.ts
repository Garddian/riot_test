import {JsonObject} from "./TypeJsonObject";

export function isJsonObject(value: unknown): value is JsonObject {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}