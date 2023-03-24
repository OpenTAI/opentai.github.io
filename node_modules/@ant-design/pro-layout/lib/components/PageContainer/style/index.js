"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStyle = useStyle;
var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread2"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _proProvider = require("@ant-design/pro-provider");
var _map = [576, 768, 992, 1200].map(function (bp) {
    return "@media (max-width: ".concat(bp, "px)");
  }),
  _map2 = (0, _slicedToArray2.default)(_map, 4),
  sm = _map2[0],
  md = _map2[1],
  lg = _map2[2],
  xl = _map2[3];
var genPageContainerStyle = function genPageContainerStyle(token) {
  var _token$layout, _token$layout$pageCon, _token$layout2, _token$layout2$pageCo, _token$layout3, _token$layout3$pageCo, _token$layout$pageCon2, _token$layout4, _token$layout4$pageCo, _token$layout$pageCon3, _token$layout5, _token$layout5$pageCo, _token$layout6, _token$layout6$pageCo, _token$layout7, _token$layout7$pageCo, _token$layout$pageCon4, _token$layout8, _token$layout8$pageCo, _extraContent, _token$componentCls;
  return (0, _defineProperty2.default)({}, token.componentCls, (_token$componentCls = {
    position: 'relative',
    '&-children-content': {
      paddingBlock: (_token$layout = token.layout) === null || _token$layout === void 0 ? void 0 : (_token$layout$pageCon = _token$layout.pageContainer) === null || _token$layout$pageCon === void 0 ? void 0 : _token$layout$pageCon.paddingBlockPageContainerContent,
      paddingInline: (_token$layout2 = token.layout) === null || _token$layout2 === void 0 ? void 0 : (_token$layout2$pageCo = _token$layout2.pageContainer) === null || _token$layout2$pageCo === void 0 ? void 0 : _token$layout2$pageCo.paddingInlinePageContainerContent
    },
    '&-affix': (0, _defineProperty2.default)({}, "".concat(token.antCls, "-affix"), (0, _defineProperty2.default)({}, "".concat(token.componentCls, "-warp"), {
      backgroundColor: (_token$layout3 = token.layout) === null || _token$layout3 === void 0 ? void 0 : (_token$layout3$pageCo = _token$layout3.pageContainer) === null || _token$layout3$pageCo === void 0 ? void 0 : _token$layout3$pageCo.colorBgPageContainerFixed,
      transition: 'background-color 0.3s',
      boxShadow: '0 2px 8px #f0f1f2'
    }))
  }, (0, _defineProperty2.default)(_token$componentCls, '& &-warp-page-header', (0, _defineProperty2.default)({
    paddingBlockStart: ((_token$layout$pageCon2 = (_token$layout4 = token.layout) === null || _token$layout4 === void 0 ? void 0 : (_token$layout4$pageCo = _token$layout4.pageContainer) === null || _token$layout4$pageCo === void 0 ? void 0 : _token$layout4$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon2 !== void 0 ? _token$layout$pageCon2 : 40) / 2,
    paddingBlockEnd: ((_token$layout$pageCon3 = (_token$layout5 = token.layout) === null || _token$layout5 === void 0 ? void 0 : (_token$layout5$pageCo = _token$layout5.pageContainer) === null || _token$layout5$pageCo === void 0 ? void 0 : _token$layout5$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon3 !== void 0 ? _token$layout$pageCon3 : 40) / 2,
    paddingInlineStart: (_token$layout6 = token.layout) === null || _token$layout6 === void 0 ? void 0 : (_token$layout6$pageCo = _token$layout6.pageContainer) === null || _token$layout6$pageCo === void 0 ? void 0 : _token$layout6$pageCo.paddingInlinePageContainerContent,
    paddingInlineEnd: (_token$layout7 = token.layout) === null || _token$layout7 === void 0 ? void 0 : (_token$layout7$pageCo = _token$layout7.pageContainer) === null || _token$layout7$pageCo === void 0 ? void 0 : _token$layout7$pageCo.paddingInlinePageContainerContent
  }, "& ~ ".concat(token.proComponentsCls, "-grid-content"), (0, _defineProperty2.default)({}, "".concat(token.proComponentsCls, "-page-container-children-content"), {
    paddingBlock: ((_token$layout$pageCon4 = (_token$layout8 = token.layout) === null || _token$layout8 === void 0 ? void 0 : (_token$layout8$pageCo = _token$layout8.pageContainer) === null || _token$layout8$pageCo === void 0 ? void 0 : _token$layout8$pageCo.paddingBlockPageContainerContent) !== null && _token$layout$pageCon4 !== void 0 ? _token$layout$pageCon4 : 24) / 3
  }))), (0, _defineProperty2.default)(_token$componentCls, '&-detail', (0, _defineProperty2.default)({
    display: 'flex'
  }, sm, {
    display: 'block'
  })), (0, _defineProperty2.default)(_token$componentCls, '&-main', {
    width: '100%'
  }), (0, _defineProperty2.default)(_token$componentCls, '&-row', (0, _defineProperty2.default)({
    display: 'flex',
    width: '100%'
  }, md, {
    display: 'block'
  })), (0, _defineProperty2.default)(_token$componentCls, '&-content', {
    flex: 'auto',
    width: '100%'
  }), (0, _defineProperty2.default)(_token$componentCls, '&-extraContent', (_extraContent = {
    flex: '0 1 auto',
    minWidth: '242px',
    marginInlineStart: 88,
    textAlign: 'end'
  }, (0, _defineProperty2.default)(_extraContent, xl, {
    marginInlineStart: 44
  }), (0, _defineProperty2.default)(_extraContent, lg, {
    marginInlineStart: 20
  }), (0, _defineProperty2.default)(_extraContent, md, {
    marginInlineStart: 0,
    textAlign: 'start'
  }), (0, _defineProperty2.default)(_extraContent, sm, {
    marginInlineStart: 0
  }), _extraContent)), _token$componentCls));
};
function useStyle(prefixCls, componentsToken) {
  return (0, _proProvider.useStyle)('ProLayoutPageContainer', function (token) {
    var proCardToken = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, token), {}, {
      componentCls: ".".concat(prefixCls)
    }, componentsToken);
    return [genPageContainerStyle(proCardToken)];
  });
}