"use strict";

import { LocalStorageService } from "@/core/storage/LocalStorageService";

let service: LocalStorageService;

describe("LocalStorageService", () => {
    beforeEach(() => {
        service = new LocalStorageService();
    });

    afterEach(() => {
        service.clear();
    });

    it("should be able to set and get a string value", () => {
        const value = "myValue";
        const key = "myKey";

        service.set<string>(key, value);

        expect(service.get<string>(key)).toBe(value);
    });

    it("should be able to set and get a number value", () => {
        const value = 23;
        const key = "myKey";

        service.set<number>(key, value);

        expect(service.get<number>(key)).toBe(value);
    });

    it("should be able to set and get a boolean value", () => {
        const value = true;
        const key = "myKey";

        service.set<boolean>(key, value);

        expect(service.get<boolean>(key)).toBe(value);
    });

    it("should be able to set and get an object value", () => {
        const value = { foo: "bar" };
        const key = "myKey";

        service.set<object>(key, value);

        expect(service.get<object>(key)).toEqual(value);
    });

    it("should return null if value is not found", () => {
        const response = service.get<object>("myKey");

        expect(response).toEqual(null);
    });

    it("should return null if value is not found", () => {
        const response = service.get<object>("myKey");

        expect(response).toEqual(null);
    });

    it("should return modified value upon Set call", () => {
        const key = "myKey";
        const value = "myValue";

        const response = service.set<string>(key, value);

        expect(response).toEqual(value);
    });

    it("should be able to clear storage", () => {
        const key = "myKey";
        const value = "myValue";

        service.set<string>(key, value);
        service.clear();

        expect(service.get<string>(key)).toEqual(null);
    });
});
