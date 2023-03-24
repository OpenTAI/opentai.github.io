import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import { resetComponent, useStyle as useAntdStyle } from '@ant-design/pro-utils';
var genActiveStyle = function genActiveStyle(token) {
  return {
    backgroundColor: token.controlItemBgActive,
    borderColor: token.controlOutline
  };
};
var genProCardStyle = function genProCardStyle(token) {
  var _objectSpread2, _$concat2, _$concat9, _ref;
  var componentCls = token.componentCls;
  return _ref = {}, _defineProperty(_ref, componentCls, _objectSpread(_objectSpread({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    width: '100%',
    marginBlock: 0,
    marginInline: 0,
    paddingBlock: 0,
    paddingInline: 0,
    backgroundColor: token.colorBgContainer,
    borderRadius: token.borderRadius
  }, resetComponent === null || resetComponent === void 0 ? void 0 : resetComponent(token)), {}, (_objectSpread2 = {
    '*': {
      boxSizing: 'border-box',
      fontFamily: token.fontFamily
    },
    '&-box-shadow': {
      boxShadow: '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017',
      borderColor: 'transparent'
    },
    '&-col': {
      width: '100%'
    },
    '&-border': {
      border: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
    },
    '&-hoverable': _defineProperty({
      cursor: 'pointer',
      transition: 'box-shadow 0.3s, border-color 0.3s',
      '&:hover': {
        borderColor: 'transparent',
        boxShadow: '0 1px 2px -2px #00000029, 0 3px 6px #0000001f, 0 5px 12px 4px #00000017'
      }
    }, "&".concat(componentCls, "-checked:hover"), {
      borderColor: token.controlOutline
    }),
    '&-checked': _objectSpread(_objectSpread({}, genActiveStyle(token)), {}, {
      '&::after': {
        position: 'absolute',
        insetBlockStart: 2,
        insetInlineEnd: 2,
        width: 0,
        height: 0,
        border: "6px solid ".concat(token.colorPrimary),
        borderBlockEnd: '6px solid transparent',
        borderInlineStart: '6px solid transparent',
        borderStartEndRadius: 2,
        content: '""'
      }
    }),
    '&:focus': _objectSpread({}, genActiveStyle(token)),
    '&&-size-small': _defineProperty({}, componentCls, {
      '&-header': {
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingXS,
        paddingBlockEnd: 0,
        '&-border': {
          paddingBlockEnd: token.paddingXS
        }
      },
      '&-title': {
        fontSize: token.fontSize
      },
      '&-body': {
        paddingInline: token.paddingSM,
        paddingBlock: token.paddingSM
      }
    }),
    '&&-ghost': _defineProperty({
      backgroundColor: 'transparent'
    }, "> ".concat(componentCls), {
      '&-header': {
        paddingInlineEnd: 0,
        paddingBlockEnd: token.padding,
        paddingInlineStart: 0
      },
      '&-body': {
        paddingBlock: 0,
        paddingInline: 0,
        backgroundColor: 'transparent'
      }
    }),
    '&&-split > &-body': {
      paddingBlock: 0,
      paddingInline: 0
    },
    '&&-contain-card > &-body': {
      display: 'flex'
    }
  }, _defineProperty(_objectSpread2, "".concat(componentCls, "-body-direction-column"), {
    flexDirection: 'column'
  }), _defineProperty(_objectSpread2, "".concat(componentCls, "-body-wrap"), {
    flexWrap: 'wrap'
  }), _defineProperty(_objectSpread2, '&&-collapse', _defineProperty({}, "> ".concat(componentCls), {
    '&-header': {
      paddingBlockEnd: token.padding,
      borderBlockEnd: 0
    },
    '&-body': {
      display: 'none'
    }
  })), _defineProperty(_objectSpread2, "".concat(componentCls, "-header"), {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingInline: token.paddingLG,
    paddingBlock: token.padding,
    paddingBlockEnd: 0,
    '&-border': {
      '&': {
        paddingBlockEnd: token.padding
      },
      borderBlockEnd: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
    },
    '&-collapsible': {
      cursor: 'pointer'
    }
  }), _defineProperty(_objectSpread2, "".concat(componentCls, "-title"), {
    color: token.colorText,
    fontWeight: 500,
    fontSize: token.fontSizeLG,
    lineHeight: token.lineHeight
  }), _defineProperty(_objectSpread2, "".concat(componentCls, "-extra"), {
    color: token.colorText
  }), _defineProperty(_objectSpread2, "".concat(componentCls, "-type-inner"), _defineProperty({}, "".concat(componentCls, "-header"), {
    backgroundColor: token.colorFillAlter
  })), _defineProperty(_objectSpread2, "".concat(componentCls, "-collapsible-icon"), {
    marginInlineEnd: token.marginXS,
    color: token.colorIconHover,
    ':hover': {
      color: token.colorPrimaryHover
    },
    '& svg': {
      transition: "transform ".concat(token.motionDurationMid)
    }
  }), _defineProperty(_objectSpread2, "".concat(componentCls, "-body"), {
    display: 'block',
    boxSizing: 'border-box',
    height: '100%',
    paddingInline: token.paddingLG,
    paddingBlock: token.padding,
    '&-center': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }), _objectSpread2))), _defineProperty(_ref, "".concat(componentCls, "-col"), (_$concat2 = {}, _defineProperty(_$concat2, "&".concat(componentCls, "-split-vertical"), {
    borderInlineEnd: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
  }), _defineProperty(_$concat2, "&".concat(componentCls, "-split-horizontal"), {
    borderBlockEnd: "".concat(token.lineWidth, "px ").concat(token.lineType, " ").concat(token.colorSplit)
  }), _$concat2)), _defineProperty(_ref, "".concat(componentCls, "-tabs"), (_$concat9 = {}, _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-top > ").concat(token.antCls, "-tabs-nav"), _defineProperty({
    marginBlockEnd: 0
  }, "".concat(token.antCls, "-tabs-nav-list"), {
    marginBlockStart: token.marginXS,
    paddingInlineStart: token.padding
  })), _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-bottom > ").concat(token.antCls, "-tabs-nav"), _defineProperty({
    marginBlockEnd: 0
  }, "".concat(token.antCls, "-tabs-nav-list"), {
    paddingInlineStart: token.padding
  })), _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-left"), _defineProperty({}, "".concat(token.antCls, "-tabs-content-holder"), _defineProperty({}, "".concat(token.antCls, "-tabs-content"), _defineProperty({}, "".concat(token.antCls, "-tabs-tabpane"), {
    paddingInlineStart: 0
  })))), _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-left > ").concat(token.antCls, "-tabs-nav"), _defineProperty({
    marginInlineEnd: 0
  }, "".concat(token.antCls, "-tabs-nav-list"), {
    paddingBlockStart: token.padding
  })), _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-right"), _defineProperty({}, "".concat(token.antCls, "-tabs-content-holder"), _defineProperty({}, "".concat(token.antCls, "-tabs-content"), _defineProperty({}, "".concat(token.antCls, "-tabs-tabpane"), {
    paddingInlineStart: 0
  })))), _defineProperty(_$concat9, "".concat(token.antCls, "-tabs-right > ").concat(token.antCls, "-tabs-nav"), _defineProperty({}, "".concat(token.antCls, "-tabs-nav-list"), {
    paddingBlockStart: token.padding
  })), _$concat9)), _ref;
};
var GRID_COLUMNS = 24;
var genColStyle = function genColStyle(index, token) {
  var componentCls = token.componentCls;
  if (index === 0) {
    return _defineProperty({}, "".concat(componentCls, "-col-0"), {
      display: 'none'
    });
  }
  return _defineProperty({}, "".concat(componentCls, "-col-").concat(index), {
    flexShrink: 0,
    width: "".concat(index / GRID_COLUMNS * 100, "%")
  });
};
var genGridStyle = function genGridStyle(token) {
  return Array(GRID_COLUMNS + 1).fill(1).map(function (_, index) {
    return genColStyle(index, token);
  });
};
export default function useStyle(prefixCls) {
  return useAntdStyle('ProCard', function (token) {
    var proCardToken = _objectSpread(_objectSpread({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    });
    return [genProCardStyle(proCardToken), genGridStyle(proCardToken)];
  });
}