/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable, inject } from "inversify";
import { Disposable } from "@theia/core";
import { BaseLanguageClientContribution, Workspace, Languages, LanguageClientFactory, LogMessageNotification } from '@theia/languages/lib/browser';
import { GO_LANGUAGE_ID, GO_LANGUAGE_NAME } from '../common';
import { GoCommands } from "./go-commands";
import { LogModel } from "./logview/log-model";

@injectable()
export class GoClientContribution extends BaseLanguageClientContribution {

    readonly id = GO_LANGUAGE_ID;
    readonly name = GO_LANGUAGE_NAME;

    constructor(
        @inject(Workspace) protected readonly workspace: Workspace,
        @inject(Languages) protected readonly languages: Languages,
		@inject(LanguageClientFactory) protected readonly languageClientFactory: LanguageClientFactory,
		@inject(GoCommands) protected readonly commands: GoCommands,
		@inject(LogModel) protected readonly logModel: LogModel
    ) {
		super(workspace, languages, languageClientFactory);
		this.languageClient.then(client => client.onNotification(LogMessageNotification.type, this.logModel.log.bind(this.logModel)))
    }

    protected get globPatterns() {
        return [
            '**/*.go'
        ];
	}
	
	registerCommand(id: string, callback: (...args: any[]) => any, thisArg?: any): Disposable {
		return this.commands.registerCommand(id, callback, thisArg);
	}
}

