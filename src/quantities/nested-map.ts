export default class NestedMap {
    get(keys: string[]) {
        // Allows to pass key1, key2, ... instead of [key1, key2, ...]
        if (arguments.length > 1) {
            // Slower with Firefox but faster with Chrome than
            // Array.prototype.slice.call(arguments)
            // See http://jsperf.com/array-apply-versus-array-prototype-slice-call
            keys = Array.apply(null, arguments);
        }

        return keys.reduce((map, key, index) => {
            if (map) {
                const childMap = map[key];

                if (index === keys.length - 1) {
                    return childMap ? childMap.data : undefined;
                } else {
                    return childMap;
                }
            }
        }, this);
    }

    set(keys: string[], value) {
        if (arguments.length > 2) {
            keys = Array.prototype.slice.call(arguments, 0, -1);
            value = arguments[arguments.length - 1];
        }

        return keys.reduce((map, key, index) => {
            let childMap = map[key];
            if (childMap === undefined) {
                childMap = map[key] = {};
            }

            if (index === keys.length - 1) {
                childMap.data = value;
                return value;
            } else {
                return childMap;
            }
        }, this);
    }
}
