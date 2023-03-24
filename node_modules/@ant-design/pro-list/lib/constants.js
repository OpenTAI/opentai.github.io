"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRO_LIST_KEYS_MAP = exports.PRO_LIST_KEYS = void 0;
var PRO_LIST_KEYS = ['title', 'subTitle', 'avatar', 'description', 'extra', 'content', 'actions', 'type'];
exports.PRO_LIST_KEYS = PRO_LIST_KEYS;
var PRO_LIST_KEYS_MAP = PRO_LIST_KEYS.reduce(function (pre, next) {
  pre.set(next, true);
  return pre;
}, new Map());
exports.PRO_LIST_KEYS_MAP = PRO_LIST_KEYS_MAP;