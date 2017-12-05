import { MenuContribution, MenuModelRegistry } from "@theia/core";
import { EDITOR_CONTEXT_MENU } from "@theia/editor/lib/browser";
import { injectable } from "inversify";

@injectable()
export class GoMenuContribution implements MenuContribution {
    registerMenus(menus: MenuModelRegistry): void {
        // go.toggle.test.file: unmapped
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.add.tags",
            label :"Go: Add Tags To Struct Fields"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.remove.tags",
            label : "Go: Remove Tags From Struct Fields"
        })
        // go.test.cursor: unmapped
        // go.benchmark.cursor: unmapped
        // go.test.file: unmapped
        // go.test.package: unmapped
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.function",
            label : "Go: Generate Unit Tests For Function"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.file",
            label : "Go: Generate Unit Tests For File"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.test.generate.package",
            label : "Go: Generate Unit Tests For Package"
        })
        // go.import.add: unmapped as we cannot prompt for a name
        // go.test.coverage: unmapped
        // go.show.commands: unmapped TODO

        // additional context menu actions. 
        // TODO: remove when go.show.commands is active
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId: "go.install.package",
            label: "Go: Install Current Package"
        })        
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.lint.package",
            label: "Go: Lint Current Package"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.lint.workspace",
            label : "Go: Lint Workspace"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.vet.package",
            label : "Go: Vet Current Package"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.vet.workspace",
            label : "Go: Vet Workspace"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId : "go.get.package",
            label : "Go: Get Package"
        })
        menus.registerMenuAction(EDITOR_CONTEXT_MENU.concat("2_go"), {
            commandId: "go.playground",
            label: "Go: Run on Go Playground"
        })
    }
}

