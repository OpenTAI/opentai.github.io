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
  var _token$componentCls;
  return (0, _defineProperty2.default)({}, token.proComponentsCls, (0, _defineProperty2.default)({}, token.componentCls, (_token$componentCls = {
    padding: 24
  }, (0, _defineProperty2.default)(_token$componentCls, "".concat(token.antCls, "-form-item"), {
    marginBlock: 0
  }), (0, _defineProperty2.default)(_token$componentCls, "".concat(token.proComponentsCls, "-form-group-title"), {
    marginBlock: 0
  }), (0, _defineProperty2.default)(_token$componentCls, '&-row', {
    rowGap: 24,
    '&-split-line': {
      '&:after': {
        position: 'absolute',
        width: '100%',
        content: '""',
        height: 1,
        insetBlockEnd: -12,
        borderBlockEnd: '1px dashed ' + token.colorSplit
      }
    }
  }), (0, _defineProperty2.default)(_token$componentCls, '&-collapse-button', {
    display: 'flex',
    alignItems: 'center'
  }), _token$componentCls)));
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('QueryFilter', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}