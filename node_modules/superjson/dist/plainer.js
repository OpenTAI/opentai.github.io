"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.walker = exports.generateReferentialEqualityAnnotations = exports.applyReferentialEqualityAnnotations = exports.applyValueAnnotations = void 0;
var is_1 = require("./is");
var pathstringifier_1 = require("./pathstringifier");
var transformer_1 = require("./transformer");
var util_1 = require("./util");
var pathstringifier_2 = require("./pathstringifier");
var accessDeep_1 = require("./accessDeep");
function traverse(tree, walker, origin) {
    if (origin === void 0) { origin = []; }
    if (!tree) {
        return;
    }
    if (!is_1.isArray(tree)) {
        util_1.forEach(tree, function (subtree, key) {
            return traverse(subtree, walker, __spreadArray(__spreadArray([], __read(origin)), __read(pathstringifier_2.parsePath(key))));
        });
        return;
    }
    var _a = __read(tree, 2), nodeValue = _a[0], children = _a[1];
    if (children) {
        util_1.forEach(children, function (child, key) {
            traverse(child, walker, __spreadArray(__spreadArray([], __read(origin)), __read(pathstringifier_2.parsePath(key))));
        });
    }
    walker(nodeValue, origin);
}
function applyValueAnnotations(plain, annotations, superJson) {
    traverse(annotations, function (type, path) {
        plain = accessDeep_1.setDeep(plain, path, function (v) { return transformer_1.untransformValue(v, type, superJson); });
    });
    return plain;
}
exports.applyValueAnnotations = applyValueAnnotations;
function applyReferentialEqualityAnnotations(plain, annotations) {
    function apply(identicalPaths, path) {
        var object = accessDeep_1.getDeep(plain, pathstringifier_2.parsePath(path));
        identicalPaths.map(pathstringifier_2.parsePath).forEach(function (identicalObjectPath) {
            plain = accessDeep_1.setDeep(plain, identicalObjectPath, function () { return object; });
        });
    }
    if (is_1.isArray(annotations)) {
        var _a = __read(annotations, 2), root = _a[0], other = _a[1];
        root.forEach(function (identicalPath) {
            plain = accessDeep_1.setDeep(plain, pathstringifier_2.parsePath(identicalPath), function () { return plain; });
        });
        if (other) {
            util_1.forEach(other, apply);
        }
    }
    else {
        util_1.forEach(annotations, apply);
    }
    return plain;
}
exports.applyReferentialEqualityAnnotations = applyReferentialEqualityAnnotations;
var isDeep = function (object, superJson) {
    return is_1.isPlainObject(object) ||
        is_1.isArray(object) ||
        is_1.isMap(object) ||
        is_1.isSet(object) ||
        transformer_1.isInstanceOfRegisteredClass(object, superJson);
};
function addIdentity(object, path, identities) {
    var existingSet = identities.get(object);
    if (existingSet) {
        existingSet.push(path);
    }
    else {
        identities.set(object, [path]);
    }
}
function generateReferentialEqualityAnnotations(identitites) {
    var result = {};
    var rootEqualityPaths = undefined;
    identitites.forEach(function (paths) {
        if (paths.length <= 1) {
            return;
        }
        var _a = __read(paths
            .map(function (path) { return path.map(String); })
            .sort(function (a, b) { return a.length - b.length; })), shortestPath = _a[0], identicalPaths = _a.slice(1);
        if (shortestPath.length === 0) {
            rootEqualityPaths = identicalPaths.map(pathstringifier_1.stringifyPath);
        }
        else {
            result[pathstringifier_1.stringifyPath(shortestPath)] = identicalPaths.map(pathstringifier_1.stringifyPath);
        }
    });
    if (rootEqualityPaths) {
        if (is_1.isEmptyObject(result)) {
            return [rootEqualityPaths];
        }
        else {
            return [rootEqualityPaths, result];
        }
    }
    else {
        return is_1.isEmptyObject(result) ? undefined : result;
    }
}
exports.generateReferentialEqualityAnnotations = generateReferentialEqualityAnnotations;
var walker = function (object, identities, superJson, path, objectsInThisPath) {
    var _a;
    if (path === void 0) { path = []; }
    if (objectsInThisPath === void 0) { objectsInThisPath = []; }
    if (!is_1.isPrimitive(object)) {
        addIdentity(object, path, identities);
    }
    if (!isDeep(object, superJson)) {
        var transformed_1 = transformer_1.transformValue(object, superJson);
        if (transformed_1) {
            return {
                transformedValue: transformed_1.value,
                annotations: [transformed_1.type]
            };
        }
        else {
            return {
                transformedValue: object
            };
        }
    }
    if (util_1.includes(objectsInThisPath, object)) {
        return {
            transformedValue: null
        };
    }
    var transformationResult = transformer_1.transformValue(object, superJson);
    var transformed = (_a = transformationResult === null || transformationResult === void 0 ? void 0 : transformationResult.value) !== null && _a !== void 0 ? _a : object;
    if (!is_1.isPrimitive(object)) {
        objectsInThisPath = __spreadArray(__spreadArray([], __read(objectsInThisPath)), [object]);
    }
    var transformedValue = is_1.isArray(transformed) ? [] : {};
    var innerAnnotations = {};
    util_1.forEach(transformed, function (value, index) {
        var recursiveResult = exports.walker(value, identities, superJson, __spreadArray(__spreadArray([], __read(path)), [index]), objectsInThisPath);
        transformedValue[index] = recursiveResult.transformedValue;
        if (is_1.isArray(recursiveResult.annotations)) {
            innerAnnotations[index] = recursiveResult.annotations;
        }
        else if (is_1.isPlainObject(recursiveResult.annotations)) {
            util_1.forEach(recursiveResult.annotations, function (tree, key) {
                innerAnnotations[pathstringifier_1.escapeKey(index) + '.' + key] = tree;
            });
        }
    });
    if (is_1.isEmptyObject(innerAnnotations)) {
        return {
            transformedValue: transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type]
                : undefined
        };
    }
    else {
        return {
            transformedValue: transformedValue,
            annotations: !!transformationResult
                ? [transformationResult.type, innerAnnotations]
                : innerAnnotations
        };
    }
};
exports.walker = walker;
//# sourceMappingURL=plainer.js.map