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

// src/features/routePrefetch/routePrefetch.ts
var routePrefetch_exports = {};
__export(routePrefetch_exports, {
  default: () => routePrefetch_default
});
module.exports = __toCommonJS(routePrefetch_exports);
var import_fs = require("fs");
var import_path = require("path");
var routePrefetch_default = (api) => {
  api.describe({
    config: {
      schema(Joi) {
        return Joi.object({});
      }
    },
    enableBy: api.EnableBy.config
  });
  api.onCheck(() => {
    if (!api.config.manifest) {
      throw new Error("You must enable manifest to use routePrefetch feature!");
    }
  });
  api.onBuildComplete(() => {
    const manifest = (0, import_fs.readFileSync)(
      (0, import_path.join)(
        api.paths.absOutputPath,
        api.config.manifest.fileName || "asset-manifest.json"
      ),
      "utf-8"
    );
    const manifestObj = JSON.parse(manifest);
    const umiJsFileKey = Object.keys(manifestObj).find(
      (key) => key.match(/^umi(.*)\.js$/)
    );
    if (!umiJsFileKey) {
      throw new Error("Cannot find umi.js in manifest.json");
    }
    const umiJsFileName = manifestObj[umiJsFileKey].replace(
      new RegExp("^" + api.config.publicPath),
      ""
    );
    const umiJsFile = (0, import_fs.readFileSync)(
      (0, import_path.join)(api.paths.absOutputPath, umiJsFileName),
      "utf-8"
    );
    const prependJS = `window.__umi_manifest__ = ` + manifest + ";";
    (0, import_fs.writeFileSync)(
      (0, import_path.join)(api.paths.absOutputPath, umiJsFileName),
      prependJS + umiJsFile
    );
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
