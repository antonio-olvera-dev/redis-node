
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
            const numberOfElements: number | null = await method.apply(this, arguments)

            const message: string = numberOfElements != null ? `ok` : `error`;
            console.log(`--- Set ${message} --> ${numberOfElements} ---`);

            return numberOfElements;
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


export function update() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = async function () {

            addDates(arguments[0]);
            const result: string | null = await method.apply(this, arguments);

            const message: string = result != null ? `ok` : `error`;
            console.log(`--- Update ${message} --> ${result} ---`);

            return result;

        };
    };

    function addDates(object: any) {
        const date = new Date();
        object.updatedAt = date;
    }
}

export function remove() {

    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {

        const method = descriptor.value!;
        descriptor.value = async function () {


            const numberOfElementsDeleted: number | null = await method.apply(this, arguments)

            const message: string = numberOfElementsDeleted != null ? `ok` : `error`;
            console.log(`--- Remove ${message} --> ${numberOfElementsDeleted} ---`);

            return numberOfElementsDeleted;
        };
    };
}