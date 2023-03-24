"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proProvider = require("@ant-design/pro-provider");
var _antd = require("antd");
var _react = require("react");
var ConfigContext = _antd.ConfigProvider.ConfigContext;
var genActionsStyle = function genActionsStyle(token) {
  var _div, _$concat;
  var componentCls = token.componentCls,
    antCls = token.antCls;
  return (0, _defineProperty2.default)({}, "".concat(componentCls, "-actions"), (_$concat = {
    marginBlock: 0,
    marginInline: 0,
    paddingBlock: 0,
    paddingInline: 0,
    listStyle: 'none',
    display: 'flex',
    gap: 8,
    background: token.colorBgContainer,
    borderBlockStart: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit),
    minHeight: 42
  }, (0, _defineProperty2.default)(_$concat, "& > *", {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    display: 'flex',
    cursor: 'pointer',
    color: token.colorTextSecondary,
    transition: 'color 0.3s',
    '&:hover': {
      color: token.colorPrimaryHover
    }
  }), (0, _defineProperty2.default)(_$concat, "& > li > div", {
    flex: 1,
    width: '100%',
    marginBlock: token.marginSM,
    marginInline: 0,
    color: token.colorTextSecondary,
    textAlign: 'center',
    a: {
      color: token.colorTextSecondary,
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryHover
      }
    },
    div: (_div = {
      position: 'relative',
      display: 'block',
      minWidth: 32,
      fontSize: token.fontSize,
      lineHeight: token.lineHeight,
      cursor: 'pointer',
      '&:hover': {
        color: token.colorPrimaryHover,
        transition: 'color 0.3s'
      }
    }, (0, _defineProperty2.default)(_div, "a:not(".concat(antCls, "-btn),\n            > .anticon"), {
      display: 'inline-block',
      width: '100%',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryHover
      }
    }), (0, _defineProperty2.default)(_div, '.anticon', {
      fontSize: token.cardActionIconSize,
      lineHeight: '22px'
    }), _div),
    '&:not(:last-child)': {
      borderInlineEnd: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
    }
  }), _$concat));
};
function useStyle(prefixCls) {
  var _useContext = (0, _react.useContext)(ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var antCls = ".".concat(getPrefixCls());
  return (0, _proProvider.useStyle)('ProCardActions', function (token) {
    var proCardActionsToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      antCls: antCls,
      cardActionIconSize: 16
    });
    return [genActionsStyle(proCardActionsToken)];
  });
}