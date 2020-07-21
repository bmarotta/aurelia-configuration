import { FrameworkConfiguration } from 'aurelia-framework';
import { AureliaConfigx } from './aurelia-configx';
export declare function configure(aurelia: FrameworkConfiguration, configCallback?: (config: AureliaConfigx) => Promise<any>): Promise<void>;
export { AureliaConfigx };
