import { configure } from '../../src/index';
import { AureliaConfigx } from '../../src/aurelia-configx';

let AureliaStub = {
    container: {
        get: (key: string) => {
            return null;
        }
    }
};

(<any>window).callback = function (config: any) {
    return config;
}

describe('Index', () => {

    beforeEach(() => {
        // spyOn(window, 'callback').and.callThrough();
        spyOn(AureliaStub.container, 'get').and.returnValue(new AureliaConfigx() as any);
    });

    it('expect callback to be called', () => {
        configure(AureliaStub as any, (<any>window).callback);

        // expect((<any>window).callback).toHaveBeenCalledWith(new AureliaConfigx);
        expect((<any>window).callback(new AureliaConfigx)).toEqual(new AureliaConfigx);
    });

});
