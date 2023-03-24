var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/isStyleFile.ts
var isStyleFile_exports = {};
__export(isStyleFile_exports, {
  AUTO_CSS_MODULE_EXTS: () => AUTO_CSS_MODULE_EXTS,
  isStyleFile: () => isStyleFile
});
module.exports = __toCommonJS(isStyleFile_exports);
var import_path = require("path");
var AUTO_CSS_MODULE_EXTS = [
  ".css",
  ".less",
  ".sass",
  ".scss",
  ".stylus",
  ".styl"
];
var isStyleFile = ({
  filename,
  ext
}) => {
  return filename && AUTO_CSS_MODULE_EXTS.includes(ext || (0, import_path.extname)(filename));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AUTO_CSS_MODULE_EXTS,
  isStyleFile
});
