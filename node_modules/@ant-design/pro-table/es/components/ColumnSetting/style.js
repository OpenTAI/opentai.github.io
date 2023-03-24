import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  var _$concat, _overlay, _$concat2, _ref;
  return _ref = {}, _defineProperty(_ref, token.componentCls, {
    width: 'auto',
    '&-title': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '32px'
    },
    '&-overlay': (_overlay = {
      '*': {
        fontFamily: token.fontFamily,
        boxSizing: 'border-box'
      }
    }, _defineProperty(_overlay, "".concat(token.antCls, "-popover-inner-content"), {
      width: '200px',
      paddingBlock: 0,
      paddingInline: 0,
      paddingBlockEnd: 8
    }), _defineProperty(_overlay, "".concat(token.antCls, "-tree-node-content-wrapper:hover"), {
      backgroundColor: 'transparent'
    }), _defineProperty(_overlay, "".concat(token.antCls, "-tree-draggable-icon"), {
      cursor: 'grab'
    }), _defineProperty(_overlay, "".concat(token.antCls, "-tree-treenode"), (_$concat = {
      alignItems: 'center',
      '&:hover': _defineProperty({}, "".concat(token.componentCls, "-list-item-option"), {
        display: 'block'
      })
    }, _defineProperty(_$concat, "".concat(token.antCls, "-tree-checkbox"), {
      marginInlineEnd: '4px'
    }), _defineProperty(_$concat, "".concat(token.antCls, "-tree-title"), {
      width: '100%'
    }), _$concat)), _overlay)
  }), _defineProperty(_ref, "".concat(token.componentCls, "-list"), (_$concat2 = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBlockStart: 8
  }, _defineProperty(_$concat2, "&".concat(token.componentCls, "-list-group"), {
    paddingBlockStart: 0
  }), _defineProperty(_$concat2, '&-title', {
    marginBlockStart: '6px',
    marginBlockEnd: '6px',
    paddingInlineStart: '24px',
    color: token.colorTextSecondary,
    fontSize: '12px'
  }), _defineProperty(_$concat2, '&-item', {
    display: 'flex',
    alignItems: 'center',
    '&-title': {
      flex: 1
    },
    '&-option': {
      display: 'none',
      float: 'right',
      cursor: 'pointer',
      '> span': {
        '> span.anticon': {
          color: token.colorPrimary
        }
      },
      '> span + span': {
        marginInlineStart: 8
      }
    }
  }), _$concat2)), _ref;
};
export function useStyle(prefixCls) {
  return useAntdStyle('ColumnSetting', function (token) {
    var proToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}