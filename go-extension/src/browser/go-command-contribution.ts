import { CommandContribution, CommandRegistry, Command } from "@theia/core";


export const CONVERTING_SHOW_REFERENCE_COMMAND = <Command> {
    id: 'converting.editor.action.showReferences'
}

export class GoCommandContribution implements CommandContribution {

    registerCommands(commands: CommandRegistry): void {
        throw new Error("Method not implemented.");
    }

}