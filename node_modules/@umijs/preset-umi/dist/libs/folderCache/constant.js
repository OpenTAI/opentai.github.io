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

// src/libs/folderCache/constant.ts
var constant_exports = {};
__export(constant_exports, {
  DEFAULT_SRC_IGNORES: () => DEFAULT_SRC_IGNORES
});
module.exports = __toCommonJS(constant_exports);
var DEFAULT_SRC_IGNORES = [
  "**/*.d.ts",
  "**/*.{test,spec}.{js,ts,jsx,tsx}",
  "**/cypress/**",
  "**/.umi-production/**",
  "**/.umi-test/**",
  "**/node_modules/**",
  "**/.git/**",
  "**/dist/**",
  "**/coverage/**",
  "**/jest.config.{ts,js}",
  "**/jest-setup.{ts,js}"
];
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_SRC_IGNORES
});
