/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { injectable } from "inversify";
import { BaseLanguageServerContribution, IConnection } from "@theia/languages/lib/node";
import { GO_LANGUAGE_ID, GO_LANGUAGE_NAME } from '../common';

@injectable()
export class GoContribution extends BaseLanguageServerContribution {

    readonly id = GO_LANGUAGE_ID;
    readonly name = GO_LANGUAGE_NAME;

    start(clientConnection: IConnection): void {
        const command = "node";
        const args: string[] = [
			// '--inspect',
			//'--inspect-brk',
            __dirname + "/startserver.js",
            '--stdio'
        ];
        const serverConnection = this.createProcessStreamConnection(command, args);
        this.forward(clientConnection, serverConnection);
    }
}
