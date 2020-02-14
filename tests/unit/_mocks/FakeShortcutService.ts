"use strict";

import { Shortcut, ShortcutService } from "@/core/browser/ShorcutService";

export class FakeShortcutService implements ShortcutService {
    register(shortcut: Shortcut): void {}
}
