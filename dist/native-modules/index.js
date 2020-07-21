import { AureliaConfigx } from './aurelia-configx';
export function configure(aurelia, configCallback) {
    var instance = aurelia.container.get(AureliaConfigx);
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
export { AureliaConfigx };
//# sourceMappingURL=index.js.map