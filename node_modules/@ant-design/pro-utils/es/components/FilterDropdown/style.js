import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { useStyle as useAntdStyle } from '@ant-design/pro-provider';
var genProStyle = function genProStyle(token) {
  var _ref;
  return _ref = {}, _defineProperty(_ref, "".concat(token.componentCls, "-label"), {
    cursor: 'pointer'
  }), _defineProperty(_ref, "".concat(token.componentCls, "-overlay"), {
    minWidth: '200px',
    marginBlockStart: '4px',
    '*': {
      fontFamily: token.fontFamily,
      boxSizing: 'border-box'
    }
  }), _defineProperty(_ref, "".concat(token.componentCls, "-content"), {
    paddingBlock: 16,
    paddingInline: 16
  }), _ref;
};
export function useStyle(prefixCls) {
  return useAntdStyle('FilterDropdown', function (token) {
    var proToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}