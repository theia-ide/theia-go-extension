import { DefaultCommands, Disposable } from "@theia/languages/lib/browser";
import { injectable, inject } from "inversify";
import { EditorManager, EditorWidget } from "@theia/editor/lib/browser";
import { CommandRegistry } from "@theia/core";

@injectable()
export class GoCommands extends DefaultCommands {

    constructor(@inject(CommandRegistry) commandRegistry: CommandRegistry,
                @inject(EditorManager) private editorManager: EditorManager) {
        super(commandRegistry)
    }

    registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
        const boundCallback = callback.bind(thisArg);
        return this.registry.registerCommand({ id: id }, {
            execute: (...args: any[]) => {
                const currentEditor = this.editorManager.currentEditor
                if (this.isGoEditor(currentEditor)) {
                    const selection = currentEditor.editor.selection
                    boundCallback(...args, currentEditor.editor.document.uri, selection)
                }
            },
            isVisible: () => this.isGoEditor(this.editorManager.currentEditor)
        });
    }

    private isGoEditor(widget: EditorWidget | undefined): widget is EditorWidget {
        if (widget)
            return widget.editor.document.languageId === 'go';
        else
            return false;
    }

}