"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proUtils = require("@ant-design/pro-utils");
var genTopNavHeaderStyle = function genTopNavHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header;
  return (0, _defineProperty2.default)({}, token.componentCls, {
    '&-header-actions': {
      display: 'flex',
      height: '100%',
      '&-item': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBlock: 0,
        paddingInline: 2,
        color: token === null || token === void 0 ? void 0 : (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.colorTextRightActionsItem,
        fontSize: '16px',
        cursor: 'pointer',
        borderRadius: token.borderRadius,
        '> *': {
          paddingInline: 6,
          paddingBlock: 6,
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.colorBgRightActionsItemHover
          }
        }
      },
      '&-avatar': {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingInlineStart: token.padding,
        paddingInlineEnd: token.padding,
        cursor: 'pointer',
        color: token.colorTextSecondary,
        '> div': {
          height: '44px',
          color: token.colorTextSecondary,
          paddingInline: 8,
          paddingBlock: 8,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '44px',
          borderRadius: token.borderRadius,
          '&:hover': {
            backgroundColor: token === null || token === void 0 ? void 0 : (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorBgRightActionsItemHover
          }
        }
      }
    }
  });
};
function useStyle(prefixCls) {
  return (0, _proUtils.useStyle)('ProLayoutRightContent', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genTopNavHeaderStyle(proToken)];
  });
}