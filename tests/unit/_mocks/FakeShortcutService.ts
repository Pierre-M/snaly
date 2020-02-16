"use strict";

import { ShortcutResume, ShortcutService } from "@/core/browser/ShorcutService";

export class FakeShortcutService implements ShortcutService {
    shortcuts: ShortcutResume[] = [];
    register = jest.fn(() => {});
}
