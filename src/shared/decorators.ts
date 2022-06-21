
import * as path from 'path';

export function logger() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        let method = descriptor.value!;
        descriptor.value = function () {
            var scriptName = path.basename(__filename);
            console.log(`*** Call --> ${scriptName} --> ${propertyKey} ***`);
            return method.apply(this, arguments);
        };
    };
}