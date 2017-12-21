/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { inject, injectable } from "inversify";
import { VirtualWidget } from "@theia/core/lib/browser";
import { LogModel } from "./log-model";

import "../../../src/browser/logview/style.css";

export const LOG_VIEW_KIND = 'logView'

@injectable()
export class LogViewWidget extends VirtualWidget {

	constructor(@inject(LogModel) protected readonly logModel: LogModel) {
		super();
		this.id = 'logView';
        this.title.label = 'Log';
        this.title.iconClass = 'fa fa-flag';
        this.title.closable = true;
		this.addClass('theia-log-view');
		logModel.onChange(this.update.bind(this));
	}

	render() {
		return this.logModel.contents;
	}

	update() {
		super.update();
		setTimeout(() => {
			const div = document.getElementById(this.id) as HTMLDivElement
			if (div.children.length > 0)
				div.children[div.children.length - 1].scrollIntoView(false)
		})
	}
}