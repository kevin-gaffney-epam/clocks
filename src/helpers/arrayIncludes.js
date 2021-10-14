/* eslint-disable no-param-reassign */
import getObjectProperty from './getObjectProperty';

const deepCheck = (first, second) => {
    const firstType = typeof first;
    const secondType = typeof second;

    if (firstType === 'object' && secondType === 'object') {
        return JSON.stringify(first) === JSON.stringify(second);
    }
    if (firstType !== secondType) {
        return false;
    }
    return first === second;
};

const arrayIncludes = (search, array = [], path) => {
    if (!array || array.length === 0 || !Array.isArray(array)) return false;

    for (let i = 0; i < array.length; i += 1) {
        const element = array[i];
        if (typeof element === 'object' && path) {
            const isEqual = deepCheck(getObjectProperty(element, path), search);
            if (isEqual) return true;
        }
        if (element === search) return true;
    }
    return false;
};

export default arrayIncludes;
