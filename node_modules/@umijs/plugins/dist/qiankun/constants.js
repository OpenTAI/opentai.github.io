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

// src/qiankun/constants.ts
var constants_exports = {};
__export(constants_exports, {
  MODEL_EXPORT_NAME: () => MODEL_EXPORT_NAME,
  defaultHistoryType: () => defaultHistoryType,
  defaultMasterRootId: () => defaultMasterRootId,
  qiankunStateForSlaveModelNamespace: () => qiankunStateForSlaveModelNamespace,
  qiankunStateFromMasterModelNamespace: () => qiankunStateFromMasterModelNamespace
});
module.exports = __toCommonJS(constants_exports);
var defaultMasterRootId = "root-master";
var defaultHistoryType = "browser";
var qiankunStateForSlaveModelNamespace = "@@qiankunStateForSlave";
var qiankunStateFromMasterModelNamespace = "@@qiankunStateFromMaster";
var MODEL_EXPORT_NAME = "useQiankunStateForSlave";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MODEL_EXPORT_NAME,
  defaultHistoryType,
  defaultMasterRootId,
  qiankunStateForSlaveModelNamespace,
  qiankunStateFromMasterModelNamespace
});
