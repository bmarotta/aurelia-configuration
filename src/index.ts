import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaConfigx } from './aurelia-configx';

export function configure(aurelia: FrameworkConfiguration, configCallback?: (config: AureliaConfigx) => Promise<any>) {
    let instance = aurelia.container.get(AureliaConfigx) as AureliaConfigx;
    let promise: Promise<any> | null = null;

    // Do we have a callback function?
    if (configCallback !== undefined && typeof (configCallback) === 'function') {
        promise = Promise.resolve(configCallback(instance));
    } else {
        promise = Promise.resolve();
    }

    // Don't load the config until the configCallback has completed.
    return promise
        .then(function () {
            return instance.loadConfig();
        });
}

export { AureliaConfigx };
