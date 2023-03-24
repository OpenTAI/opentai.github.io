"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.openVisibleCompatible = exports.getVersion = void 0;
var _antd = require("antd");
var _omitUndefined = require("../omitUndefined");
var _index = require("./index");
var getVersion = function getVersion() {
  var _process, _process$env;
  if (typeof process === 'undefined') return _antd.version;
  return ((_process = process) === null || _process === void 0 ? void 0 : (_process$env = _process.env) === null || _process$env === void 0 ? void 0 : _process$env.ANTD_VERSION) || _antd.version;
};
exports.getVersion = getVersion;
var openVisibleCompatible = function openVisibleCompatible(open, onOpenChange) {
  var props = (0, _index.compareVersions)(getVersion(), '4.23.0') > -1 ? {
    open: open,
    onOpenChange: onOpenChange
  } : {
    visible: open,
    onVisibleChange: onOpenChange
  };
  return (0, _omitUndefined.omitUndefined)(props);
};
exports.openVisibleCompatible = openVisibleCompatible;