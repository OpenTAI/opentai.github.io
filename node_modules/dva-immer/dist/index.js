'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var produce = require('immer');
var produce__default = _interopDefault(produce);

function index () {
  return {
    _handleActions: function _handleActions(handlers, defaultState) {
      return function () {
        var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
        var action = arguments.length > 1 ? arguments[1] : undefined;
        var type = action.type;
        var ret = produce__default(state, function (draft) {
          var handler = handlers[type];

          if (handler) {
            var compatiableRet = handler(draft, action);

            if (compatiableRet !== undefined) {
              // which means you are use redux pattern
              // it's compatiable. https://github.com/mweststrate/immer#returning-data-from-producers
              return compatiableRet;
            }
          }
        });
        return ret === undefined ? {} : ret;
      };
    }
  };
}

Object.defineProperty(exports, 'enableAllPlugins', {
  enumerable: true,
  get: function () {
    return produce.enableAllPlugins;
  }
});
Object.defineProperty(exports, 'enableES5', {
  enumerable: true,
  get: function () {
    return produce.enableES5;
  }
});
exports.default = index;
