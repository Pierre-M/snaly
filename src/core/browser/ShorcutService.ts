"use strict";

export interface Shortcut {
    def: {
        key: number | string;
        ctrl?: boolean;
    };
    enabledOnInput?: boolean;
    action(): void;
}

export interface ShortcutService {
    register(shortcut: Shortcut): void;
}
