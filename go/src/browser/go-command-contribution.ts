import { CommandContribution, CommandRegistry, Command } from "@theia/core";
import { EditorCommands } from "@theia/editor/lib/browser";
import { injectable } from "inversify";

export const SHOW_GO_REFERENCES = <Command> {
    id: 'go.editor.action.showReferences'
}

@injectable()
export class GoCommandContribution implements CommandContribution {

    registerCommands(commands: CommandRegistry): void {
        commands.registerCommand(SHOW_GO_REFERENCES, {
            execute: (uri: string, position: Position, locations: Location[]) =>
                commands.executeCommand(EditorCommands.SHOW_REFERENCES.id, uri, position, locations)
        });
    }
}