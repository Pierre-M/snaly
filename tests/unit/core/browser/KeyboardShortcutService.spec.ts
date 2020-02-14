"use strict";

import { KeyboardShortcutService } from "@/core/browser/KeyboardShortcutService";
import { clearDom, insertInDom, triggerDOMEvent } from "../../_utils";

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

    it("should not execute action when user is pressing shift by default", () => {
        service.register({ def: { key: "a" }, action });

        triggerDOMEvent(document, "keyup", { key: "a", shiftKey: true });

        expect(action).not.toHaveBeenCalled();
    });

    it("should not execute action when user is pressing meta by default", () => {
        service.register({ def: { key: "a" }, action });

        triggerDOMEvent(document, "keyup", { key: "a", metaKey: true });

        expect(action).not.toHaveBeenCalled();
    });

    it("should execute action when user is pressing ctrl key if configured", () => {
        service.register({ def: { key: "a", ctrl: true }, action });

        triggerDOMEvent(document, "keyup", { key: "a", ctrlKey: true });

        expect(action).toHaveBeenCalled();
    });

    it("should execute action when user is pressing shift key if configured", () => {
        service.register({ def: { key: "a", shift: true }, action });

        triggerDOMEvent(document, "keyup", { key: "a", shiftKey: true });

        expect(action).toHaveBeenCalled();
    });

    it("should execute action when user is pressing meta key if configured", () => {
        service.register({ def: { key: "a", meta: true }, action });

        triggerDOMEvent(document, "keyup", { key: "a", metaKey: true });

        expect(action).toHaveBeenCalled();
    });
});
