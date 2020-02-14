"use strict";

import { Shortcut, ShortcutService } from "@/core/browser/ShorcutService";
import { singleton } from "tsyringe";

@singleton()
export class KeyboardShortcutService implements ShortcutService {
    register(shortcut: Shortcut): void {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (
                e.key === shortcut.def.key &&
                (e.target as HTMLElement).nodeName !== "INPUT" &&
                (e.target as HTMLElement).nodeName !== "SELECT" &&
                (e.target as HTMLElement).nodeName !== "TEXTAREA" &&
                e.ctrlKey === !!shortcut.def.ctrl &&
                e.shiftKey === !!shortcut.def.shift &&
                e.metaKey === !!shortcut.def.meta
            ) {
                shortcut.action();
            }
        });
    }
}
