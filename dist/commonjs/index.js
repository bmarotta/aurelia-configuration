"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AureliaConfigx = exports.configure = void 0;
var aurelia_configx_1 = require("./aurelia-configx");
Object.defineProperty(exports, "AureliaConfigx", { enumerable: true, get: function () { return aurelia_configx_1.AureliaConfigx; } });
function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(aurelia_configx_1.AureliaConfigx);
    var promise = null;
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        promise = Promise.resolve(configCallback(instance));
    }
    else {
        promise = Promise.resolve();
    }
    return promise
        .then(function () {
        return instance.loadConfig();
    });
}
exports.configure = configure;
//# sourceMappingURL=index.js.map