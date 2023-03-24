"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proProvider = require("@ant-design/pro-provider");
var genProStyle = function genProStyle(token) {
  var _ref;
  return _ref = {}, (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-collapse-label"), {
    paddingInline: 1,
    paddingBlock: 1
  }), (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-container"), (0, _defineProperty2.default)({}, "".concat(token.antCls, "-form-item"), {
    marginBlockEnd: 0
  })), _ref;
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('LightWrapper', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}