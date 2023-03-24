"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  ProForm: true,
  ProFormContext: true,
  FieldContext: true,
  FormListContext: true
};
Object.defineProperty(exports, "FieldContext", {
  enumerable: true,
  get: function get() {
    return _FieldContext.FieldContext;
  }
});
Object.defineProperty(exports, "FormListContext", {
  enumerable: true,
  get: function get() {
    return _List.FormListContext;
  }
});
Object.defineProperty(exports, "ProForm", {
  enumerable: true,
  get: function get() {
    return _layouts.ProForm;
  }
});
Object.defineProperty(exports, "ProFormContext", {
  enumerable: true,
  get: function get() {
    return _proUtils.ProFormContext;
  }
});
exports.default = void 0;
var _layouts = require("./layouts");
Object.keys(_layouts).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _layouts[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _layouts[key];
    }
  });
});
require("antd/lib/drawer/style");
require("antd/lib/form/style");
require("antd/lib/modal/style");
require("antd/lib/rate/style");
require("antd/lib/row/style");
require("antd/lib/steps/style");
require("antd/lib/tabs/style");
require("antd/lib/upload/style");
var _proUtils = require("@ant-design/pro-utils");
var _components = require("./components");
Object.keys(_components).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _components[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _components[key];
    }
  });
});
var _FieldContext = require("./FieldContext");
var _List = require("./components/List");
// 兼容代码-----------
//----------------------
var _default = _layouts.ProForm;
exports.default = _default;