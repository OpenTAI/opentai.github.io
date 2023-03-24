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
  var _$concat, _overlay, _$concat2, _ref;
  return _ref = {}, (0, _defineProperty2.default)(_ref, token.componentCls, {
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
    }, (0, _defineProperty2.default)(_overlay, "".concat(token.antCls, "-popover-inner-content"), {
      width: '200px',
      paddingBlock: 0,
      paddingInline: 0,
      paddingBlockEnd: 8
    }), (0, _defineProperty2.default)(_overlay, "".concat(token.antCls, "-tree-node-content-wrapper:hover"), {
      backgroundColor: 'transparent'
    }), (0, _defineProperty2.default)(_overlay, "".concat(token.antCls, "-tree-draggable-icon"), {
      cursor: 'grab'
    }), (0, _defineProperty2.default)(_overlay, "".concat(token.antCls, "-tree-treenode"), (_$concat = {
      alignItems: 'center',
      '&:hover': (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-list-item-option"), {
        display: 'block'
      })
    }, (0, _defineProperty2.default)(_$concat, "".concat(token.antCls, "-tree-checkbox"), {
      marginInlineEnd: '4px'
    }), (0, _defineProperty2.default)(_$concat, "".concat(token.antCls, "-tree-title"), {
      width: '100%'
    }), _$concat)), _overlay)
  }), (0, _defineProperty2.default)(_ref, "".concat(token.componentCls, "-list"), (_$concat2 = {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    paddingBlockStart: 8
  }, (0, _defineProperty2.default)(_$concat2, "&".concat(token.componentCls, "-list-group"), {
    paddingBlockStart: 0
  }), (0, _defineProperty2.default)(_$concat2, '&-title', {
    marginBlockStart: '6px',
    marginBlockEnd: '6px',
    paddingInlineStart: '24px',
    color: token.colorTextSecondary,
    fontSize: '12px'
  }), (0, _defineProperty2.default)(_$concat2, '&-item', {
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
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('ColumnSetting', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}