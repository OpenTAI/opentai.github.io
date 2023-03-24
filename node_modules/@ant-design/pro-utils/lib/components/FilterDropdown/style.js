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
  return _ref = {}, (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-label"), {
    cursor: 'pointer'
  }), (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-overlay"), {
    minWidth: '200px',
    marginBlockStart: '4px',
    '*': {
      fontFamily: token.fontFamily,
      boxSizing: 'border-box'
    }
  }), (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-content"), {
    paddingBlock: 16,
    paddingInline: 16
  }), _ref;
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('FilterDropdown', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}