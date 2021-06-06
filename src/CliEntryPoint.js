"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var CliItems_1 = require("./CliItems");
var CliEntryPoint = /** @class */ (function () {
    function CliEntryPoint(items, io) {
        this.items = items;
        this.io = io;
    }
    CliEntryPoint.prototype.start = function () {
        var rootmenu = new CliItems_1.CliMenu("", this.items);
        var quitCommand = new QuitCommand(this.io);
        this.execMenu(rootmenu, quitCommand);
    };
    CliEntryPoint.prototype.execMenu = function (menu, backCommand) {
        var _this = this;
        var navMenu = menu.items();
        navMenu.push(backCommand);
        for (var k in navMenu) {
            this.io.print(+k + 1 + " - " + navMenu[k].message);
        }
        var actOnSelectedItem = function (choice) {
            var selectedItem = navMenu[+choice - 1];
            if (selectedItem instanceof CliItems_1.CliMenu) {
                _this.execMenu(selectedItem, new BackCommand(function () { return _this.execMenu(menu, backCommand); }));
            }
            else if (selectedItem instanceof CliItems_1.CliCommand) {
                _this.execCommand(selectedItem, function () { return _this.execMenu(menu, backCommand); });
            }
            else {
                _this.io.error('invalid selection');
            }
        };
        this.io.prompt(actOnSelectedItem);
    };
    CliEntryPoint.prototype.execCommand = function (cmd, actionAfterExecution) {
        cmd.action();
        actionAfterExecution();
    };
    return CliEntryPoint;
}());
exports["default"] = CliEntryPoint;
var NavCommand = /** @class */ (function () {
    function NavCommand(message, action) {
        this.message = message;
        this.action = action;
    }
    return NavCommand;
}());
var QuitCommand = /** @class */ (function (_super) {
    __extends(QuitCommand, _super);
    function QuitCommand(io) {
        return _super.call(this, 'quit', function () { return io.exitProgram(); }) || this;
    }
    return QuitCommand;
}(NavCommand));
var BackCommand = /** @class */ (function (_super) {
    __extends(BackCommand, _super);
    function BackCommand(action) {
        return _super.call(this, 'back', action) || this;
    }
    return BackCommand;
}(NavCommand));
