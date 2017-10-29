
let instance = null;

class Utils {

    constructor () {
        if(!instance){
            instance = this;
        }
        return instance;
    }

    /* Devuelve una copia del objeto pasado como parámetro (sin funciones, eventHandlers etc) */
    cloneObject (obj) {
        return JSON.parse(JSON.stringify(obj))
    } // cloneObject

    cloneArray (arr) {
        return arr.slice(0)
    } // cloneArray
    
    removeItemFromArray (arr, index) {
        let newArr = this.cloneArray(arr);
        newArr.splice(index, 1);
        return newArr;
    }


    areEqualObjects2 (obj1, obj2) {
        const objectKeys = Object.keys;
        const typeOfObj1 = typeof obj1;
        const typeOfObj2 = typeof obj2;
        return obj1 && obj2 && typeOfObj1 === 'object' && typeOfObj1 ===typeOfObj2 ? (
                objectKeys(obj1).length === objectKeys(obj2).length &&
                objectKeys(obj1).every(key => this.areEqualObjects(obj1[key], obj2[key]))
            ) : (obj1 === obj2);
    }

    areEqualObjects (obj1, obj2) {
        let a = JSON.stringify(obj1);
        let b = JSON.stringify(obj2);
        if (!a) { a = '' };
        if (!b) { b = '' };
        return (a.split('').sort().join('') == b.split('').sort().join(''));
    }



}

export default Utils;