import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  var _layoutHorizonta, _layoutInline, _token$componentCls;
  return _defineProperty({}, token.componentCls, (_token$componentCls = {
    display: 'flex',
    fontSize: token.fontSize,
    '& + &': {
      marginBlockStart: 4
    },
    '&-tip': {
      marginInlineStart: 4
    },
    '&-wrapper': _defineProperty({
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
  }, _defineProperty(_token$componentCls, "".concat(token.antCls, "-statistic-title"), {
    color: token.colorText
  }), _defineProperty(_token$componentCls, '&-trend-up', _defineProperty({}, "".concat(token.antCls, "-statistic-content"), _defineProperty({
    color: '#f5222d'
  }, "".concat(token.componentCls, "-trend-icon"), {
    borderBlockEndColor: '#f5222d'
  }))), _defineProperty(_token$componentCls, '&-trend-down', _defineProperty({}, "".concat(token.antCls, "-statistic-content"), _defineProperty({
    color: '#389e0d'
  }, "".concat(token.componentCls, "-trend-icon"), {
    borderBlockEndColor: '#52c41a'
  }))), _defineProperty(_token$componentCls, '& &-layout-horizontal', (_layoutHorizonta = {
    display: 'flex',
    justifyContent: 'space-between'
  }, _defineProperty(_layoutHorizonta, "".concat(token.antCls, "-statistic-title"), {
    marginBlockEnd: 0
  }), _defineProperty(_layoutHorizonta, "".concat(token.antCls, "-statistic-content-value"), {
    fontWeight: 500
  }), _defineProperty(_layoutHorizonta, "".concat(token.antCls, "-statistic-title,").concat(token.antCls, "-statistic-content,").concat(token.antCls, "-statistic-content-suffix,").concat(token.antCls, "-statistic-content-prefix,").concat(token.antCls, "-statistic-content-value-decimal"), {
    fontSize: token.fontSize
  }), _layoutHorizonta)), _defineProperty(_token$componentCls, '& &-layout-inline', (_layoutInline = {
    display: 'inline-flex',
    color: token.colorTextSecondary
  }, _defineProperty(_layoutInline, "".concat(token.antCls, "-statistic-title"), {
    marginInlineEnd: '6px',
    marginBlockEnd: 0
  }), _defineProperty(_layoutInline, "".concat(token.antCls, "-statistic-content"), {
    color: token.colorTextSecondary
  }), _defineProperty(_layoutInline, "".concat(token.antCls, "-statistic-title,").concat(token.antCls, "-statistic-content,").concat(token.antCls, "-statistic-content-suffix,").concat(token.antCls, "-statistic-content-prefix,").concat(token.antCls, "-statistic-content-value-decimal"), {
    fontSize: token.fontSizeSM
  }), _layoutInline)), _token$componentCls));
};
export function useStyle(prefixCls) {
  return useAntdStyle('Statistic', function (token) {
    var proListToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proListToken)];
  });
}