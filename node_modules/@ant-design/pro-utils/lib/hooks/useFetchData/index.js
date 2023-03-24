"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useFetchData = useFetchData;
var _regeneratorRuntime2 = _interopRequireDefault(require("@babel/runtime/helpers/regeneratorRuntime"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _react = require("react");
var _swr = _interopRequireDefault(require("swr"));
var testId = 0;
function useFetchData(props) {
  /** Key 是用来缓存请求的，如果不在是有问题 */
  var _useState = (0, _react.useState)(function () {
      if (props.proFieldKey) {
        return props.proFieldKey.toString();
      }
      testId += 1;
      return testId.toString();
    }),
    _useState2 = (0, _slicedToArray2.default)(_useState, 1),
    cacheKey = _useState2[0];
  var proFieldKeyRef = (0, _react.useRef)(cacheKey);
  var fetchData = /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/(0, _regeneratorRuntime2.default)().mark(function _callee() {
      var _props$request;
      var loadData;
      return (0, _regeneratorRuntime2.default)().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (_props$request = props.request) === null || _props$request === void 0 ? void 0 : _props$request.call(props, props.params, props);
          case 2:
            loadData = _context.sent;
            return _context.abrupt("return", loadData);
          case 4:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function fetchData() {
      return _ref.apply(this, arguments);
    };
  }();
  (0, _react.useEffect)(function () {
    return function () {
      testId += 1;
    };
  }, []);
  var _useSWR = (0, _swr.default)([proFieldKeyRef.current, props.params], fetchData, {
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateOnReconnect: false
    }),
    data = _useSWR.data,
    error = _useSWR.error;
  return [data || error];
}