import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  var _twoLine;
  return _defineProperty({}, token.componentCls, {
    '&-title': {
      marginBlockEnd: token.marginXL,
      fontWeight: 'bold'
    },
    '&-container': _defineProperty({
      flexWrap: 'wrap',
      maxWidth: '100%'
    }, "> div".concat(token.antCls, "-space-item"), {
      maxWidth: '100%'
    }),
    '&-twoLine': (_twoLine = {
      display: 'block',
      width: '100%'
    }, _defineProperty(_twoLine, "".concat(token.componentCls, "-title"), {
      width: '100%',
      margin: '8px 0'
    }), _defineProperty(_twoLine, "".concat(token.componentCls, "-container"), {
      paddingInlineStart: 16
    }), _defineProperty(_twoLine, "".concat(token.antCls, "-space-item,").concat(token.antCls, "-form-item"), {
      width: '100%'
    }), _defineProperty(_twoLine, "".concat(token.antCls, "-form-item"), {
      '&-control': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        '&-input': {
          alignItems: 'center',
          justifyContent: 'flex-end',
          '&-content': {
            flex: 'none'
          }
        }
      }
    }), _twoLine)
  });
};
export function useStyle(prefixCls) {
  return useAntdStyle('ProFormGroup', function (token) {
    var proToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}