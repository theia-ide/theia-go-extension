/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { LogMessageParams, Emitter } from "@theia/languages/lib/browser";
import { injectable } from "inversify";
import { VirtualElement, h } from "@phosphor/virtualdom";
import { MessageType } from "@theia/core";

const MAX_SIZE = 5000

@injectable()
export class LogModel {

	contents: VirtualElement[] = []

	private changeEmitter = new Emitter<LogModel>()

	onChange = this.changeEmitter.event

	log(message: LogMessageParams) {
		if (this.contents.length >= MAX_SIZE) {
			this.contents.splice(0, this.contents.length - MAX_SIZE + 1)
		}
		this.contents.push(h.div({ className: this.getCssClass(message) }, ...this.toHtmlText(message.message)));
		this.changeEmitter.fire(this);
	}

	private getCssClass(params: LogMessageParams): string {
		switch (params.type) {
			case MessageType.Error: return 'error';
			case MessageType.Warning: return 'warning';
			case MessageType.Info: return 'info';
			case MessageType.Log: return 'log';
			default: throw new Error('No such message type: ' + params.type);
		}
	}

	private toHtmlText(text: string): (VirtualElement | string)[] {
		const result: (VirtualElement | string)[] = []
		if (text) {
			const lines = text.split(/([\n\r]+)/)
			for(let line of lines) {
				result.push(h.div(line))
			}
		}
		return result;
	}
}