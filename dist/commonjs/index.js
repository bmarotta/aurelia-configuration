"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AureliaConfiguration = exports.configure = void 0;
var aurelia_configuration_1 = require("./aurelia-configuration");
Object.defineProperty(exports, "AureliaConfiguration", { enumerable: true, get: function () { return aurelia_configuration_1.AureliaConfiguration; } });
function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(aurelia_configuration_1.AureliaConfiguration);
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