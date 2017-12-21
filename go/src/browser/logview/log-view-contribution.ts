/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { MenuContribution, CommandContribution, MenuModelRegistry, CommandRegistry, Command } from "@theia/core";
import { WidgetManager, FrontendApplication, CommonMenus } from "@theia/core/lib/browser";
import { inject, injectable } from "inversify";
import { LOG_VIEW_KIND } from "./log-view-widget";

export namespace LogViewCommands {
    export const OPEN: Command = {
        id: 'logView:open',
        label: 'Open Log View'
    };
}

@injectable()
export class LogViewContribution implements CommandContribution, MenuContribution {

	constructor(@inject(WidgetManager) protected readonly widgetManager: WidgetManager,
				@inject(FrontendApplication) protected readonly app: FrontendApplication) {
	}

	registerCommands(commands: CommandRegistry): void {
		commands.registerCommand(LogViewCommands.OPEN, {
            execute: () => this.openLogView()
        });
	}

	registerMenus(menus: MenuModelRegistry): void {
		menus.registerMenuAction(CommonMenus.VIEW, {
            commandId: LogViewCommands.OPEN.id
        });
	}

	protected async openLogView(): Promise<void> {
        const logViewWidget = await this.widgetManager.getOrCreateWidget(LOG_VIEW_KIND);
        if (!logViewWidget.isAttached) {
            this.app.shell.addToMainArea(logViewWidget);
        }
		this.app.shell.activateMain(logViewWidget.id);
		logViewWidget.update();
    }

}