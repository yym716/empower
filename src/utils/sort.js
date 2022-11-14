/**
 * @description 正序排序函数
 * @param prop 指定按值prop正序排序
 */
export function positiveSort(prop) {
    return function (obj1, obj2) {
        let val1 = obj1[prop];
        let val2 = obj2[prop];
        if (val1 < val2) {
            return -1;
        } else if (val1 > val2) {
            return 1;
        } else {
            return 0;
        }
    };
}

/**
 * @description 倒序排序函数
 * @param prop 指定按值prop倒序排序
 */
export function reverseSort(prop) {
    return function (objectN, objectM) {
        let valueN = objectN[prop];
        let valueM = objectM[prop];

        if (valueN < valueM) return 1;
        else if (valueN > valueM) return -1;
        else return 0;
    };
}
