
import * as path from 'path';

export function logger() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = function () {
            var scriptName = path.basename(__filename);
            console.log(`*** Call --> ${scriptName} --> ${propertyKey} ***`);
            return method.apply(this, arguments);
        };
    };
}


export function repositoryError() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = async function () {

            try {
               return await method.apply(this, arguments);
            } catch (error) {
                console.log(error);
                return null;
            }
        };
    };
}