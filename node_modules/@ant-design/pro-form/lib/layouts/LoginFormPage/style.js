"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _proProvider = require("@ant-design/pro-provider");
var genLoginFormStyle = function genLoginFormStyle(token) {
  var _ref;
  return _ref = {}, (0, _defineProperty2.default)(_ref, token.componentCls, {
    display: 'flex',
    width: '100%',
    height: '100%',
    backgroundSize: 'contain',
    '&-notice': {
      display: 'flex',
      flex: '1',
      alignItems: 'flex-end',
      '&-activity': {
        marginBlock: 24,
        marginInline: 24,
        paddingInline: 24,
        paddingBlock: 24,
        '&-title': {
          fontWeight: '500',
          fontSize: '28px'
        },
        '&-subTitle': {
          marginBlockStart: 8,
          fontSize: '16px'
        },
        '&-action': {
          marginBlockStart: '24px'
        }
      }
    },
    '&-container': {
      display: 'flex',
      flex: '1',
      flexDirection: 'column',
      maxWidth: '550px',
      height: '100%',
      paddingInline: 0,
      paddingBlock: 32,
      overflow: 'auto',
      background: token.colorBgContainer
    },
    '&-top': {
      textAlign: 'center'
    },
    '&-header': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '44px',
      lineHeight: '44px',
      a: {
        textDecoration: 'none'
      }
    },
    '&-title': {
      position: 'relative',
      tinsetBlockStartop: '2px',
      color: '@heading-color',
      fontWeight: '600',
      fontSize: '33px'
    },
    '&-logo': {
      width: '44px',
      height: '44px',
      marginInlineEnd: '16px',
      verticalAlign: 'top',
      img: {
        width: '100%'
      }
    },
    '&-desc': {
      marginBlockStart: '12px',
      marginBlockEnd: '40px',
      color: token.colorTextSecondary,
      fontSize: token.fontSize
    },
    '&-main': {
      width: '328px',
      margin: '0 auto',
      '&-other': {
        marginBlockStart: '24px',
        lineHeight: '22px',
        textAlign: 'start'
      }
    }
  }), (0, _defineProperty2.default)(_ref, "@media (max-width: ".concat(token.screenMDMin, "px)"), (0, _defineProperty2.default)({}, token.componentCls, {
    flexDirection: 'column-reverse',
    background: 'none !important',
    '&-notice': {
      display: 'flex',
      flex: 'none',
      alignItems: 'flex-start',
      width: '100%',
      '> div': {
        width: '100%'
      }
    }
  })), (0, _defineProperty2.default)(_ref, "@media (min-width: ".concat(token.screenMDMin, "px)"), (0, _defineProperty2.default)({}, token.componentCls, {
    '&-container': {
      paddingInline: 0,
      paddingBlockStart: 128,
      paddingBlockEnd: 24,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center 110px',
      backgroundSize: '100%'
    }
  })), (0, _defineProperty2.default)(_ref, "@media (max-width: ".concat(token.screenSM, "px)"), (0, _defineProperty2.default)({}, token.componentCls, {
    '&-main': {
      width: '95%',
      maxWidth: '328px'
    }
  })), _ref;
};
function useStyle(prefixCls) {
  return (0, _proProvider.useStyle)('LoginFormPage', function (token) {
    var loginFormToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genLoginFormStyle(loginFormToken)];
  });
}