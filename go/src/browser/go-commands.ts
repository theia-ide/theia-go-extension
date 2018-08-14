/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from "inversify";
import { EditorManager, EditorWidget } from "@theia/editor/lib/browser";
import { CommandRegistry, Disposable } from "@theia/core";

@injectable()
export class GoCommands {

    static readonly TITLES: { [key: string]: string } = {
        "go.gopath": "Current GOPATH",
        "go.add.tags": "Add Tags To Struct Fields",
        "go.remove.tags": "Remove Tags From Struct Fields",
        "go.impl.cursor": "Generate Interface Stubs",
        "go.test.cursor": "Test Function At Cursor",
        "go.benchmark.cursor": "Benchmark Function At Cursor",
        "go.test.package": "Test Package",
        "go.test.file": "Test File",
        "go.test.workspace": "Test All Packages In Workspace",
        "go.test.previous": "Test Previous",
        "go.test.coverage": "Toggle Test Coverage In Current Package",
        "go.import.add": "Add Import",
        "go.tools.install": "Install/Update Tools",
        "go.browse.packages": "Browse Packages",
        "go.test.generate.package": "Generate Unit Tests For Package",
        "go.test.generate.file": "Generate Unit Tests For File",
        "go.test.generate.function": "Generate Unit Tests For Function",
        "go.toggle.test.file": "Toggle Test File",
        "go.show.commands": "Show All Commands...",
        "go.get.package": "Get Package",
        "go.playground": "Run on Go Playground",
        "go.lint.package": "Lint Current Package",
        "go.lint.workspace": "Lint Workspace",
        "go.vet.package": "Vet Current Package",
        "go.vet.workspace": "Vet Workspace",
        "go.build.package": "Build Current Package",
        "go.build.workspace": "Build Workspace",
		"go.install.package": "Install Current Package",
		"go.fill.struct": "Fill struct"
    }

    constructor(@inject(CommandRegistry) private registry: CommandRegistry,
                @inject(EditorManager) private editorManager: EditorManager) {
	}
	
	registerClientCommands(): Disposable[] {
		const disposables: Disposable[] = [];
		for (const id in GoCommands.TITLES) {
			const disposable = this.registry.registerCommand({ 
				id: id + '.client', 
				label: this.getTitle(id) 
			}, {
				execute: (...args: any[]) => {
					const currentEditor = this.editorManager.currentEditor
					if (this.isGoEditor(currentEditor)) {
						const selection = currentEditor.editor.selection
						this.registry.executeCommand(id, currentEditor.editor.document.uri, selection)
					}
				},
				isVisible: () => this.isGoEditor(this.editorManager.currentEditor),
				isEnabled: () => this.registry.getActiveHandler(id) !== undefined
			})
			disposables.push(disposable);
		}
		return disposables;
	}

    private isGoEditor(widget: EditorWidget | undefined): widget is EditorWidget {
        if (widget)
            return widget.editor.document.languageId === 'go';
        else
            return false;
    }

    private getTitle(commandId: string): string | undefined {
        const title = GoCommands.TITLES[commandId]
        return title ? 'Go: ' + title : undefined
    }
}

