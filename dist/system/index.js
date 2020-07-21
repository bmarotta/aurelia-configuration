System.register(["./aurelia-configuration"], function (exports_1, context_1) {
    "use strict";
    var aurelia_configuration_1;
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_configuration_1_1) {
                aurelia_configuration_1 = aurelia_configuration_1_1;
            }
        ],
        execute: function () {
            exports_1("AureliaConfiguration", aurelia_configuration_1.AureliaConfiguration);
        }
    };
});
//# sourceMappingURL=index.js.map