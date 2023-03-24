"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useStyle;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _objectSpread5 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _proUtils = require("@ant-design/pro-utils");
var textOverflowEllipsis = function textOverflowEllipsis() {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };
};
var genPageHeaderStyle = function genPageHeaderStyle(token) {
  var _extra, _objectSpread4;
  return (0, _defineProperty2.default)({}, token.componentCls, (0, _objectSpread5.default)((0, _objectSpread5.default)({}, _proUtils.resetComponent === null || _proUtils.resetComponent === void 0 ? void 0 : (0, _proUtils.resetComponent)(token)), {}, (_objectSpread4 = {
    position: 'relative',
    backgroundColor: token.pageHeaderBgGhost,
    paddingBlock: token.pageHeaderPaddingVertical + 2,
    paddingInline: token.pageHeaderPadding,
    '& &-has-breadcrumb': {
      paddingBlockStart: token.pageHeaderPaddingBreadCrumb
    },
    '& &-has-footer': {
      paddingBlockEnd: 0
    },
    '& &-back': (0, _defineProperty2.default)({
      marginInlineEnd: token.margin,
      fontSize: 16,
      lineHeight: 1,
      '&-button': (0, _objectSpread5.default)((0, _objectSpread5.default)({
        fontSize: 16
      }, _proUtils.operationUnit === null || _proUtils.operationUnit === void 0 ? void 0 : (0, _proUtils.operationUnit)(token)), {}, {
        color: token.pageHeaderColorBack,
        cursor: 'pointer'
      })
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 0
    })
  }, (0, _defineProperty2.default)(_objectSpread4, "& ".concat('ant', "-divider-vertical"), {
    height: 14,
    marginBlock: 0,
    marginInline: token.marginSM,
    verticalAlign: 'middle'
  }), (0, _defineProperty2.default)(_objectSpread4, "& &-breadcrumb + &-heading", {
    marginBlockStart: token.marginXS
  }), (0, _defineProperty2.default)(_objectSpread4, '& &-heading', {
    display: 'flex',
    justifyContent: 'space-between',
    '&-left': {
      display: 'flex',
      alignItems: 'center',
      marginBlock: token.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      overflow: 'hidden'
    },
    '&-title': (0, _objectSpread5.default)((0, _objectSpread5.default)({
      marginInlineEnd: token.marginSM,
      marginBlockEnd: 0,
      color: token.colorTextHeading,
      fontWeight: 600,
      fontSize: token.pageHeaderFontSizeHeaderTitle,
      lineHeight: token.controlHeight + 'px'
    }, textOverflowEllipsis()), {}, (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    })),
    '&-avatar': (0, _defineProperty2.default)({
      marginInlineEnd: token.marginSM
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    }),
    '&-tags': (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right'
    }),
    '&-sub-title': (0, _objectSpread5.default)((0, _objectSpread5.default)({
      marginInlineEnd: token.marginSM,
      color: token.colorTextSecondary,
      fontSize: token.pageHeaderFontSizeHeaderSubTitle,
      lineHeight: token.lineHeight
    }, textOverflowEllipsis()), {}, (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 12
    })),
    '&-extra': (_extra = {
      marginBlock: token.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      whiteSpace: 'nowrap',
      '> *': (0, _defineProperty2.default)({
        'white-space': 'unset'
      }, "".concat(token.componentCls, "-rlt &"), {
        marginInlineEnd: token.marginSM,
        marginInlineStart: 0
      })
    }, (0, _defineProperty2.default)(_extra, "".concat(token.componentCls, "-rlt &"), {
      float: 'left'
    }), (0, _defineProperty2.default)(_extra, '*:first-child', (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0
    })), _extra)
  }), (0, _defineProperty2.default)(_objectSpread4, '&-content', {
    paddingBlockStart: token.pageHeaderPaddingContentPadding
  }), (0, _defineProperty2.default)(_objectSpread4, '&-footer', {
    marginBlockStart: token.margin
  }), (0, _defineProperty2.default)(_objectSpread4, '&-compact &-heading', {
    flexWrap: 'wrap'
  }), (0, _defineProperty2.default)(_objectSpread4, '&-wide', {
    maxWidth: 1152,
    margin: '0 auto'
  }), (0, _defineProperty2.default)(_objectSpread4, '&-rtl', {
    direction: 'rtl'
  }), _objectSpread4)));
};
function useStyle(prefixCls) {
  return (0, _proUtils.useStyle)('ProLayoutPageHeader', function (token) {
    var proCardToken = (0, _objectSpread5.default)((0, _objectSpread5.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls),
      pageHeaderBgGhost: 'transparent',
      pageHeaderPadding: 16,
      pageHeaderPaddingVertical: 4,
      pageHeaderPaddingBreadCrumb: token.paddingSM,
      pageHeaderColorBack: token.colorTextHeading,
      pageHeaderFontSizeHeaderTitle: token.fontSizeHeading4,
      pageHeaderFontSizeHeaderSubTitle: 14,
      pageHeaderPaddingContentPadding: token.paddingSM
    });
    return [genPageHeaderStyle(proCardToken)];
  });
}