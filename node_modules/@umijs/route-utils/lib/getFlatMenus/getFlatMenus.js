"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFlatMenus = exports.default = void 0;

var _transformRoute = require("../transformRoute/transformRoute");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * 获取打平的 menuData
 * 以 path 为 key
 * @param menuData
 */
var getFlatMenus = function getFlatMenus() {
  var menuData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var menus = {};
  menuData.forEach(function (mapItem) {
    var item = _objectSpread({}, mapItem);

    if (!item || !item.key) {
      return;
    }

    if (!item.children && item[_transformRoute.childrenPropsName]) {
      item.children = item[_transformRoute.childrenPropsName];
      delete item[_transformRoute.childrenPropsName];
    }

    var routerChildren = item.children || [];
    menus[(0, _transformRoute.stripQueryStringAndHashFromPath)(item.path || item.key || '/')] = _objectSpread({}, item);
    menus[item.key || item.path || '/'] = _objectSpread({}, item);

    if (routerChildren) {
      menus = _objectSpread(_objectSpread({}, menus), getFlatMenus(routerChildren));
    }
  });
  return menus;
};

exports.getFlatMenus = getFlatMenus;
var _default = getFlatMenus;
exports.default = _default;