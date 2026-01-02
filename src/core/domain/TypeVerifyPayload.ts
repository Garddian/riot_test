import {JsonObject} from "./TypeJsonObject";
import {StringEncoded} from "./TypeStringEncoded";

export type VerifyPayload = {
    data : JsonObject,
    signature: StringEncoded,
};