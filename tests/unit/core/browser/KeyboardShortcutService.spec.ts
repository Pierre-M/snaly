"use strict";

import { KeyboardShortcutService } from "@/core/browser/KeyboardShortcutService";
import { clearDom, insertInDom, triggerDOMEvent } from "../../_utils";
import { Shortcut } from "@/core/browser/ShorcutService";

let service: KeyboardShortcutService;
let action: () => void;

describe("KeyboardShortcutService", () => {
    beforeEach(() => {
        service = new KeyboardShortcutService();
        action = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
        clearDom();
    });

    it("should be able to register a simple shortcut", () => {
        service.register({ def: { key: "a" }, action });
        triggerDOMEvent(document, "keyup", { key: "a" });
        expect(action).toHaveBeenCalled();
    });

    it("should not execute action when user is typing by default", () => {
        const input = document.createElement("input");
        const select = document.createElement("select");
        const textarea = document.createElement("textarea");
        insertInDom(input, select, textarea);
        service.register({ def: { key: "a" }, action });

        triggerDOMEvent(input, "keyup", { key: "a" });
        triggerDOMEvent(select, "keyup", { key: "a" });
        triggerDOMEvent(textarea, "keyup", { key: "a" });

        expect(action).not.toHaveBeenCalled();
    });

    it("should not execute action when user is pressing ctrl by default", () => {
        service.register({ def: { key: "a" }, action });

        triggerDOMEvent(document, "keyup", { key: "a", ctrlKey: true });

        expect(action).not.toHaveBeenCalled();
    });

    it("should execute action when user is pressing ctrl key if configured", () => {
        service.register({ def: { key: "a", ctrl: true }, action });

        triggerDOMEvent(document, "keyup", { key: "a", ctrlKey: true });

        expect(action).toHaveBeenCalled();
    });

    it("should execute action when user is typing if configured", () => {
        const input = document.createElement("input");
        const select = document.createElement("select");
        const textarea = document.createElement("textarea");

        insertInDom(input, select, textarea);
        service.register({ def: { key: "a" }, action, enabledOnInput: true });

        triggerDOMEvent(input, "keyup", { key: "a" });
        triggerDOMEvent(select, "keyup", { key: "a" });
        triggerDOMEvent(textarea, "keyup", { key: "a" });

        expect(action).toHaveBeenCalledTimes(3);
    });

    it("should be able to retrieve registered shortcut with description", () => {
        const shortcutWithoutDescription: Shortcut = {
            def: { key: "a" },
            action() {}
        };

        const shortcutWithDescription: Shortcut = {
            def: { key: "a" },
            description: "shortcut description",
            action() {}
        };

        service.register(shortcutWithoutDescription);
        service.register(shortcutWithDescription);

        expect(service.shortcuts).toEqual([
            { description: shortcutWithDescription.description, def: shortcutWithDescription.def }
        ]);
    });
});
