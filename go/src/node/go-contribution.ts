/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
import { GO_LANGUAGE_ID, GO_LANGUAGE_NAME } from '../common';
import { parseArgs } from '@theia/process/lib/node/utils';
import { SpawnOptions } from 'child_process';
import { ProcessErrorEvent } from '@theia/process/lib/node/process';

@injectable()
export class GoContribution extends BaseLanguageServerContribution {

    readonly id = GO_LANGUAGE_ID;
    readonly name = GO_LANGUAGE_NAME;

    async start(clientConnection: IConnection): Promise<void> {
        let command = "node";
        let args: string[] = [
			// '--inspect',
			//'--inspect-brk',
            __dirname + "/startserver.js",
            '--stdio'
        ];

        const goLsCommand = process.env.GO_LS_COMMAND;
        if (goLsCommand) {
            command = goLsCommand;
            args = parseArgs(process.env.GO_LS_ARGS || '');
        }

        const serverConnection = await this.createProcessStreamConnectionAsync(command, args, this.getSpawnOptions());
        this.forward(clientConnection, serverConnection);
    }

    protected getSpawnOptions(): SpawnOptions | undefined {
        return undefined;
    }

    protected onDidFailSpawnProcess(error: ProcessErrorEvent): void {
        super.onDidFailSpawnProcess(error);
        console.error("Error starting Go language server.");
    }
}
