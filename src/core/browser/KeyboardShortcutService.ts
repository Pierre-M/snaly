"use strict";

import { Shortcut, ShortcutService } from "@/core/browser/ShorcutService";
import { singleton } from "tsyringe";

@singleton()
export class KeyboardShortcutService implements ShortcutService {
    register(shortcut: Shortcut): void {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (KeyboardShortcutService.preventActionExecution(e, shortcut)) return;

            shortcut.action();
        });
    }

    private static preventActionExecution(e: KeyboardEvent, shortcut: Shortcut): boolean {
        return (
            !KeyboardShortcutService.canBeHandled(e, shortcut) ||
            !KeyboardShortcutService.shortcutDefIsMatching(e, shortcut)
        );
    }

    private static shortcutDefIsMatching(e: KeyboardEvent, shortcut: Shortcut): boolean {
        return e.key === shortcut.def.key && e.ctrlKey === !!shortcut.def.ctrl;
    }

    private static canBeHandled(e: KeyboardEvent, shortcut: Shortcut): boolean {
        if (shortcut.enabledOnInput) return true;

        return (
            (e.target as HTMLElement).nodeName !== "INPUT" &&
            (e.target as HTMLElement).nodeName !== "SELECT" &&
            (e.target as HTMLElement).nodeName !== "TEXTAREA"
        );
    }
}
