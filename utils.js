"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Deep object merging
 */
function merge(to, from) {
    var copy = Object.assign({}, to);
    var _loop_1 = function (n) {
        if (Array.isArray(to[n])) {
            copy[n] = copy[n].concat(from[n].filter(function (el) { return copy[n].indexOf(el) === -1; }));
        }
        else if (typeof to[n] !== "object") {
            copy[n] = from[n];
        }
        else if (typeof from[n] === "object") {
            copy[n] = merge(copy[n], from[n]);
        }
    };
    for (var n in from) {
        _loop_1(n);
    }
    return copy;
}
exports.merge = merge;
/* class decorator */
function StaticImplements() {
    return function (constructor) { };
}
exports.StaticImplements = StaticImplements;
