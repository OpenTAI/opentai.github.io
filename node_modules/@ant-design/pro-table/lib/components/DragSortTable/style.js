"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proProvider = require("@ant-design/pro-provider");
var genProListStyle = function genProListStyle(token) {
  return (0, _defineProperty2.default)({}, token.componentCls, {
    '&-visible-cell': {
      display: 'flex',
      alignItems: 'center'
    },
    '&-icon': {
      marginInlineEnd: 8,
      color: '#999',
      cursor: 'grab'
    }
  });
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('DragSortTable', function (token) {
    var proListToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProListStyle(proListToken)];
  });
}