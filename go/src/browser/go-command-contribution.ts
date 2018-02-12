/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { CommandContribution, CommandRegistry, Command } from "@theia/core";
import { EditorCommands } from "@theia/editor/lib/browser";
import { injectable, inject } from "inversify";
import { GoCommands } from './go-commands';
import { QuickOpenItem, CommandQuickOpenItem, QuickOpenModel, QuickOpenService, KeybindingRegistry } from "@theia/core/lib/browser";

export const SHOW_GO_REFERENCES = <Command> {
    id: 'go.editor.action.showReferences'
}

export const GO_SHOW_COMMANDS = <Command> {
    id: 'go.show.commands'
}

@injectable()
export class GoCommandContribution implements CommandContribution {

	constructor(@inject(KeybindingRegistry) private readonly keybindingRegistry: KeybindingRegistry,
				@inject(QuickOpenService) private readonly quickOpenService: QuickOpenService) {
	}

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(SHOW_GO_REFERENCES, {
            execute: (uri: string, position: Position, locations: Location[]) =>
                commands.executeCommand(EditorCommands.SHOW_REFERENCES.id, uri, position, locations)
		});
		commands.registerCommand(GO_SHOW_COMMANDS, {
			execute: () => this.showCommands(commands)
		});
	}
	
	private showCommands(commands: CommandRegistry): void {
		const items: CommandQuickOpenItem[] = []
		for (const commandId in GoCommands.TITLES) {
			const command = commands.getCommand(commandId);
			if (command && command.label)
				items.push(new CommandQuickOpenItem(command, commands, this.keybindingRegistry))
		}
		const model: QuickOpenModel = {
			onType: (lookFor: string, acceptor: (items: QuickOpenItem[]) => void) => {
				acceptor(items)
			}
		}
		this.quickOpenService.open(model)
	}
}