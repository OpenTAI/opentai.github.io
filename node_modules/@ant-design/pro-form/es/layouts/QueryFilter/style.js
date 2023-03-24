import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  var _token$componentCls;
  return _defineProperty({}, token.proComponentsCls, _defineProperty({}, token.componentCls, (_token$componentCls = {
    padding: 24
  }, _defineProperty(_token$componentCls, "".concat(token.antCls, "-form-item"), {
    marginBlock: 0
  }), _defineProperty(_token$componentCls, "".concat(token.proComponentsCls, "-form-group-title"), {
    marginBlock: 0
  }), _defineProperty(_token$componentCls, '&-row', {
    rowGap: 24,
    '&-split-line': {
      '&:after': {
        position: 'absolute',
        width: '100%',
        content: '""',
        height: 1,
        insetBlockEnd: -12,
        borderBlockEnd: '1px dashed ' + token.colorSplit
      }
    }
  }), _defineProperty(_token$componentCls, '&-collapse-button', {
    display: 'flex',
    alignItems: 'center'
  }), _token$componentCls)));
};
export function useStyle(prefixCls) {
  return useAntdStyle('QueryFilter', function (token) {
    var proToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}