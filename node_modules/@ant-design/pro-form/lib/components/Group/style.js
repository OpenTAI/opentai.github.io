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
  var _twoLine;
  return (0, _defineProperty2.default)({}, token.componentCls, {
    '&-title': {
      marginBlockEnd: token.marginXL,
      fontWeight: 'bold'
    },
    '&-container': (0, _defineProperty2.default)({
      flexWrap: 'wrap',
      maxWidth: '100%'
    }, "> div".concat(token.antCls, "-space-item"), {
      maxWidth: '100%'
    }),
    '&-twoLine': (_twoLine = {
      display: 'block',
      width: '100%'
    }, (0, _defineProperty2.default)(_twoLine, "".concat(token.componentCls, "-title"), {
      width: '100%',
      margin: '8px 0'
    }), (0, _defineProperty2.default)(_twoLine, "".concat(token.componentCls, "-container"), {
      paddingInlineStart: 16
    }), (0, _defineProperty2.default)(_twoLine, "".concat(token.antCls, "-space-item,").concat(token.antCls, "-form-item"), {
      width: '100%'
    }), (0, _defineProperty2.default)(_twoLine, "".concat(token.antCls, "-form-item"), {
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
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('ProFormGroup', function (token) {
    var proToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProStyle(proToken)];
  });
}