import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { operationUnit, resetComponent, useStyle as useAntdStyle } from '@ant-design/pro-utils';
var textOverflowEllipsis = function textOverflowEllipsis() {
  return {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis'
  };
};
var genPageHeaderStyle = function genPageHeaderStyle(token) {
  var _extra, _objectSpread4;
  return _defineProperty({}, token.componentCls, _objectSpread(_objectSpread({}, resetComponent === null || resetComponent === void 0 ? void 0 : resetComponent(token)), {}, (_objectSpread4 = {
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
    '& &-back': _defineProperty({
      marginInlineEnd: token.margin,
      fontSize: 16,
      lineHeight: 1,
      '&-button': _objectSpread(_objectSpread({
        fontSize: 16
      }, operationUnit === null || operationUnit === void 0 ? void 0 : operationUnit(token)), {}, {
        color: token.pageHeaderColorBack,
        cursor: 'pointer'
      })
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 0
    })
  }, _defineProperty(_objectSpread4, "& ".concat('ant', "-divider-vertical"), {
    height: 14,
    marginBlock: 0,
    marginInline: token.marginSM,
    verticalAlign: 'middle'
  }), _defineProperty(_objectSpread4, "& &-breadcrumb + &-heading", {
    marginBlockStart: token.marginXS
  }), _defineProperty(_objectSpread4, '& &-heading', {
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
    '&-title': _objectSpread(_objectSpread({
      marginInlineEnd: token.marginSM,
      marginBlockEnd: 0,
      color: token.colorTextHeading,
      fontWeight: 600,
      fontSize: token.pageHeaderFontSizeHeaderTitle,
      lineHeight: token.controlHeight + 'px'
    }, textOverflowEllipsis()), {}, _defineProperty({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    })),
    '&-avatar': _defineProperty({
      marginInlineEnd: token.marginSM
    }, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: token.marginSM
    }),
    '&-tags': _defineProperty({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right'
    }),
    '&-sub-title': _objectSpread(_objectSpread({
      marginInlineEnd: token.marginSM,
      color: token.colorTextSecondary,
      fontSize: token.pageHeaderFontSizeHeaderSubTitle,
      lineHeight: token.lineHeight
    }, textOverflowEllipsis()), {}, _defineProperty({}, "".concat(token.componentCls, "-rlt &"), {
      float: 'right',
      marginInlineEnd: 0,
      marginInlineStart: 12
    })),
    '&-extra': (_extra = {
      marginBlock: token.marginXS / 2,
      marginInlineEnd: 0,
      marginInlineStart: 0,
      whiteSpace: 'nowrap',
      '> *': _defineProperty({
        'white-space': 'unset'
      }, "".concat(token.componentCls, "-rlt &"), {
        marginInlineEnd: token.marginSM,
        marginInlineStart: 0
      })
    }, _defineProperty(_extra, "".concat(token.componentCls, "-rlt &"), {
      float: 'left'
    }), _defineProperty(_extra, '*:first-child', _defineProperty({}, "".concat(token.componentCls, "-rlt &"), {
      marginInlineEnd: 0
    })), _extra)
  }), _defineProperty(_objectSpread4, '&-content', {
    paddingBlockStart: token.pageHeaderPaddingContentPadding
  }), _defineProperty(_objectSpread4, '&-footer', {
    marginBlockStart: token.margin
  }), _defineProperty(_objectSpread4, '&-compact &-heading', {
    flexWrap: 'wrap'
  }), _defineProperty(_objectSpread4, '&-wide', {
    maxWidth: 1152,
    margin: '0 auto'
  }), _defineProperty(_objectSpread4, '&-rtl', {
    direction: 'rtl'
  }), _objectSpread4)));
};
export default function useStyle(prefixCls) {
  return useAntdStyle('ProLayoutPageHeader', function (token) {
    var proCardToken = _objectSpread(_objectSpread({}, token), {}, {
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