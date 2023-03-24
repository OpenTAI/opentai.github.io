import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
import { ConfigProvider } from 'antd';
import { useContext } from 'react';
var ConfigContext = ConfigProvider.ConfigContext;
var genActionsStyle = function genActionsStyle(token) {
  var _div, _$concat;
  var componentCls = token.componentCls,
    antCls = token.antCls;
  return _defineProperty({}, "".concat(componentCls, "-actions"), (_$concat = {
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
  }, _defineProperty(_$concat, "& > *", {
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
  }), _defineProperty(_$concat, "& > li > div", {
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
    }, _defineProperty(_div, "a:not(".concat(antCls, "-btn),\n            > .anticon"), {
      display: 'inline-block',
      width: '100%',
      color: token.colorTextSecondary,
      lineHeight: '22px',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryHover
      }
    }), _defineProperty(_div, '.anticon', {
      fontSize: token.cardActionIconSize,
      lineHeight: '22px'
    }), _div),
    '&:not(:last-child)': {
      borderInlineEnd: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
    }
  }), _$concat));
};
export default function useStyle(prefixCls) {
  var _useContext = useContext(ConfigContext),
    getPrefixCls = _useContext.getPrefixCls;
  var antCls = ".".concat(getPrefixCls());
  return useAntdStyle('ProCardActions', function (token) {
    var proCardActionsToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      antCls: antCls,
      cardActionIconSize: 16
    });
    return [genActionsStyle(proCardActionsToken)];
  });
}