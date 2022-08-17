/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"nttdata/employees/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
