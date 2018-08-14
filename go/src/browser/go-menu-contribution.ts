/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

 import { MenuContribution, MenuModelRegistry } from "@theia/core";
import { EDITOR_CONTEXT_MENU } from "@theia/editor/lib/browser";
import { injectable } from "inversify";

@injectable()
export class GoMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.add.tags.client",
            label :"Go: Add Tags To Struct Fields"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.remove.tags.client",
            label : "Go: Remove Tags From Struct Fields"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.function.client",
            label : "Go: Generate Unit Tests For Function"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.file.client",
            label : "Go: Generate Unit Tests For File"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.package.client",
            label : "Go: Generate Unit Tests For Package"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.show.commands.client",
            label : "Go: Show All Commands..."
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.fill.struct.client",
            label : "Go: Fill struct"
        })
    }
}

