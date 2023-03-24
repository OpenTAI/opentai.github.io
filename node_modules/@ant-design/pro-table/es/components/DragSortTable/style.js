import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProListStyle = function genProListStyle(token) {
  return _defineProperty({}, token.componentCls, {
    '&-visible-cell': {
      display: 'flex',
      alignItems: 'center'
    },
    '&-icon': {
      marginInlineEnd: 8,
      color: '#999',
      cursor: 'grab'
    }
  });
};
export function useStyle(prefixCls) {
  return useAntdStyle('DragSortTable', function (token) {
    var proListToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProListStyle(proListToken)];
  });
}