/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { LanguageGrammarDefinitionContribution, TextmateRegistry } from "@theia/monaco/lib/browser/textmate";

import { injectable } from "inversify";
import { GO_LANGUAGE_ID } from '../common';

@injectable()
export class GoGrammarContribution implements LanguageGrammarDefinitionContribution {

    readonly config: monaco.languages.LanguageConfiguration = {
		comments: {
			lineComment: '//',
			blockComment: ['/*', '*/'],
		},
		brackets: [
			['{', '}'],
			['[', ']'],
			['(', ')']
		],
		autoClosingPairs: [
			{ open: '{', close: '}' },
			{ open: '[', close: ']' },
			{ open: '(', close: ')' },
			{ open: '`', close: '`', notIn: ['string'] },
			{ open: '"', close: '"', notIn: ['string'] },
			{ open: '\'', close: '\'', notIn: ['string', 'comment'] },
		],
		surroundingPairs: [
			{ open: '{', close: '}' },
			{ open: '[', close: ']' },
			{ open: '(', close: ')' },
			{ open: '`', close: '`' },
			{ open: '"', close: '"' },
			{ open: '\'', close: '\'' },
		]
	};

	registerTextmateLanguage(registry: TextmateRegistry) {
        monaco.languages.register({
            id: GO_LANGUAGE_ID,
            extensions: ['.go'],
            aliases: ['Go', 'go']
        });

        monaco.languages.setLanguageConfiguration(GO_LANGUAGE_ID, this.config);

        const goGrammar = require('../../data/go.tmLanguage.json');
        registry.registerTextmateGrammarScope('source.go', {
            async getGrammarDefinition() {
                return {
                    format: 'json',
                    content: goGrammar
                };
            }
        });
        registry.mapLanguageIdToTextmateGrammar(GO_LANGUAGE_ID, 'source.go');
    }
}