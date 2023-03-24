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
  var _layoutHorizonta, _layoutInline, _token$componentCls;
  return (0, _defineProperty2.default)({}, token.componentCls, (_token$componentCls = {
    display: 'flex',
    fontSize: token.fontSize,
    '& + &': {
      marginBlockStart: 4
    },
    '&-tip': {
      marginInlineStart: 4
    },
    '&-wrapper': (0, _defineProperty2.default)({
      display: 'flex',
      width: '100%'
    }, "".concat(token.componentCls, "-status"), {
      width: '14px'
    }),
    '&-icon': {
      marginInlineEnd: 16
    },
    '&-trend-icon': {
      width: 0,
      height: 0,
      borderInlineEnd: '3.5px solid transparent',
      borderBlockEnd: '9px solid #000',
      borderInlineStart: '3.5px solid transparent',
      '&-up': {
        transform: 'rotate(0deg)'
      },
      '&-down': {
        transform: 'rotate(180deg)'
      }
    },
    '&-content': {
      width: '100%'
    },
    '&-description': {
      width: '100%'
    }
  }, (0, _defineProperty2.default)(_token$componentCls, "".concat(token.antCls, "-statistic-title"), {
    color: token.colorText
  }), (0, _defineProperty2.default)(_token$componentCls, '&-trend-up', (0, _defineProperty2.default)({}, "".concat(token.antCls, "-statistic-content"), (0, _defineProperty2.default)({
    color: '#f5222d'
  }, "".concat(token.componentCls, "-trend-icon"), {
    borderBlockEndColor: '#f5222d'
  }))), (0, _defineProperty2.default)(_token$componentCls, '&-trend-down', (0, _defineProperty2.default)({}, "".concat(token.antCls, "-statistic-content"), (0, _defineProperty2.default)({
    color: '#389e0d'
  }, "".concat(token.componentCls, "-trend-icon"), {
    borderBlockEndColor: '#52c41a'
  }))), (0, _defineProperty2.default)(_token$componentCls, '& &-layout-horizontal', (_layoutHorizonta = {
    display: 'flex',
    justifyContent: 'space-between'
  }, (0, _defineProperty2.default)(_layoutHorizonta, "".concat(token.antCls, "-statistic-title"), {
    marginBlockEnd: 0
  }), (0, _defineProperty2.default)(_layoutHorizonta, "".concat(token.antCls, "-statistic-content-value"), {
    fontWeight: 500
  }), (0, _defineProperty2.default)(_layoutHorizonta, "".concat(token.antCls, "-statistic-title,").concat(token.antCls, "-statistic-content,").concat(token.antCls, "-statistic-content-suffix,").concat(token.antCls, "-statistic-content-prefix,").concat(token.antCls, "-statistic-content-value-decimal"), {
    fontSize: token.fontSize
  }), _layoutHorizonta)), (0, _defineProperty2.default)(_token$componentCls, '& &-layout-inline', (_layoutInline = {
    display: 'inline-flex',
    color: token.colorTextSecondary
  }, (0, _defineProperty2.default)(_layoutInline, "".concat(token.antCls, "-statistic-title"), {
    marginInlineEnd: '6px',
    marginBlockEnd: 0
  }), (0, _defineProperty2.default)(_layoutInline, "".concat(token.antCls, "-statistic-content"), {
    color: token.colorTextSecondary
  }), (0, _defineProperty2.default)(_layoutInline, "".concat(token.antCls, "-statistic-title,").concat(token.antCls, "-statistic-content,").concat(token.antCls, "-statistic-content-suffix,").concat(token.antCls, "-statistic-content-prefix,").concat(token.antCls, "-statistic-content-value-decimal"), {
    fontSize: token.fontSizeSM
  }), _layoutInline)), _token$componentCls));
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('Statistic', function (token) {
    var proListToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proListToken)];
  });
}