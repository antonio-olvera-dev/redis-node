
import { basename } from 'path';
import { v4 as uuidv4 } from 'uuid';

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


export function set() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = async function () {

            addDates(arguments[0]);
            addId(arguments[0]);
            return await method.apply(this, arguments);
        };
    };

    function addDates(object: any) {
        const date = new Date();
        object.createdAt = date;
        object.updatedAt = date;
    }

    function addId(object: any) {
        object.id = uuidv4();
    }
}