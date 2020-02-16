"use strict";

export interface Shortcut {
    def: {
        key: number | string;
        ctrl?: boolean;
    };
    enabledOnInput?: boolean;
    description?: string;
    action(): void;
}

export type ShortcutResume = Pick<Shortcut, "def" | "description">;

export interface ShortcutService {
    shortcuts: ShortcutResume[];
    register(shortcut: Shortcut): void;
}
