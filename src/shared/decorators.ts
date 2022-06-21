
import { basename } from 'path';

export function logger(pathFile: string) {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = function () {
            const scriptName = basename(pathFile);
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