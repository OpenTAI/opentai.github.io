"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proProvider = require("@ant-design/pro-provider");
var genGlobalHeaderStyle = function genGlobalHeaderStyle(token) {
  var _token$layout, _token$layout$header, _token$layout2, _token$layout2$header, _token$layout3, _token$layout3$header, _token$componentCls;
  return (0, _defineProperty2.default)({}, token.componentCls, (_token$componentCls = {
    position: 'relative',
    background: 'transparent',
    display: 'flex',
    alignItems: 'center',
    marginBlock: 0,
    marginInline: 16,
    height: ((_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$header = _token$layout.header) === null || _token$layout$header === void 0 ? void 0 : _token$layout$header.heightLayoutHeader) || 56,
    boxSizing: 'border-box',
    '> a': {
      height: '100%'
    }
  }, (0, _defineProperty2.default)(_token$componentCls, "".concat(token.proComponentsCls, "-layout-apps-icon"), {
    marginInlineEnd: 16
  }), (0, _defineProperty2.default)(_token$componentCls, '&-collapsed-button', {
    minHeight: '22px',
    color: token === null || token === void 0 ? void 0 : (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$header = _token$layout2.header) === null || _token$layout2$header === void 0 ? void 0 : _token$layout2$header.colorHeaderTitle,
    fontSize: '18px',
    marginInlineEnd: '16px'
  }), (0, _defineProperty2.default)(_token$componentCls, '&-logo', {
    position: 'relative',
    marginInlineEnd: '16px',
    a: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      minHeight: '22px',
      fontSize: '20px'
    },
    img: {
      height: '28px'
    },
    h1: {
      height: '32px',
      marginBlock: 0,
      marginInline: 0,
      marginInlineStart: 8,
      fontWeight: '600',
      color: ((_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$header = _token$layout3.header) === null || _token$layout3$header === void 0 ? void 0 : _token$layout3$header.colorHeaderTitle) || token.colorTextHeading,
      fontSize: '18px',
      lineHeight: '32px'
    },
    '&-mix': {
      display: 'flex',
      alignItems: 'center'
    }
  }), (0, _defineProperty2.default)(_token$componentCls, '&-logo-mobile', {
    minWidth: '24px',
    marginInlineEnd: 0
  }), _token$componentCls));
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('ProLayoutGlobalHeader', function (token) {
    var GlobalHeaderToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genGlobalHeaderStyle(GlobalHeaderToken)];
  });
}