/*
 * Copyright (C) 2017 TypeFox and others.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 */

import { ContainerModule, interfaces } from "inversify";
import { LogViewWidget, LOG_VIEW_KIND } from "./log-view-widget";
import { WidgetFactory } from "@theia/core/lib/browser";
import { MenuContribution, CommandContribution } from "@theia/core";
import { LogViewContribution } from "./log-view-contribution";
import { LogModel } from "./log-model";

export default new ContainerModule((bind: interfaces.Bind, unbind: interfaces.Unbind, isBound: interfaces.IsBound, rebind: interfaces.Rebind) => {
	bind(LogViewWidget).toSelf();

	bind(WidgetFactory).toDynamicValue(context => ({
		id: LOG_VIEW_KIND,
		createWidget: () => context.container.get<LogViewWidget>(LogViewWidget)
	}));

	bind(MenuContribution).to(LogViewContribution).inSingletonScope();
	bind(CommandContribution).to(LogViewContribution).inSingletonScope();
	bind(LogModel).toSelf().inSingletonScope();
});