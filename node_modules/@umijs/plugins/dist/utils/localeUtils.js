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

// src/utils/localeUtils.ts
var localeUtils_exports = {};
__export(localeUtils_exports, {
  exactLocalePaths: () => exactLocalePaths,
  getAntdLocale: () => getAntdLocale,
  getLocaleList: () => getLocaleList,
  getMomentLocale: () => getMomentLocale,
  isNeedPolyfill: () => isNeedPolyfill
});
module.exports = __toCommonJS(localeUtils_exports);
var import_fs = require("fs");
var import_path = require("path");
var import_plugin_utils = require("umi/plugin-utils");
var getMomentLocale = (lang, country, resolveKey) => {
  var _a, _b;
  const momentLocation = require.resolve(`${resolveKey}/locale/zh-cn`).replace(/zh\-cn\.js$/, "");
  if ((0, import_fs.existsSync)(
    (0, import_path.join)(momentLocation, `${lang}-${(_a = country == null ? void 0 : country.toLocaleLowerCase) == null ? void 0 : _a.call(country)}.js`)
  )) {
    const momentLocale = `${lang}-${(_b = country == null ? void 0 : country.toLocaleLowerCase) == null ? void 0 : _b.call(country)}`;
    return {
      momentLocale
    };
  }
  if ((0, import_fs.existsSync)((0, import_path.join)(momentLocation, `${lang}.js`))) {
    return {
      momentLocale: lang
    };
  }
  return { momentLocale: "" };
};
var getAntdLocale = (lang, country) => `${lang}_${(country || lang).toLocaleUpperCase()}`;
var modulesHasLocale = (localePath) => {
  try {
    require.resolve(localePath);
    return true;
  } catch (error) {
    return false;
  }
};
var getLocaleList = async (opts) => {
  const {
    localeFolder,
    separator = "-",
    absSrcPath = "",
    absPagesPath = "",
    addAntdLocales,
    resolveKey = "moment"
  } = opts;
  const localeFileMath = new RegExp(
    `^([a-z]{2})${separator}?([A-Z]{2})?.(js|json|ts)$`
  );
  const localeFiles = import_plugin_utils.glob.sync("*.{ts,js,json}", {
    cwd: (0, import_plugin_utils.winPath)((0, import_path.join)(absSrcPath, localeFolder))
  }).map((name) => (0, import_plugin_utils.winPath)((0, import_path.join)(absSrcPath, localeFolder, name))).concat(
    import_plugin_utils.glob.sync(`**/${localeFolder}/*.{ts,js,json}`, {
      cwd: absPagesPath
    }).map((name) => (0, import_plugin_utils.winPath)((0, import_path.join)(absPagesPath, name)))
  ).filter((p) => localeFileMath.test((0, import_path.basename)(p)) && (0, import_fs.existsSync)(p)).map((fullName) => {
    var _a, _b;
    const fileName = (0, import_path.basename)(fullName);
    const fileInfo = (_b = (_a = localeFileMath.exec(fileName)) == null ? void 0 : _a.slice(1, 3)) == null ? void 0 : _b.filter(Boolean);
    return {
      name: (fileInfo || []).join(separator),
      path: fullName
    };
  });
  const groups = import_plugin_utils.lodash.groupBy(localeFiles, "name");
  const promises = Object.keys(groups).map(async (name) => {
    const [lang, country = ""] = name.split(separator);
    const { momentLocale } = getMomentLocale(lang, country, resolveKey);
    const antdLocale = import_plugin_utils.lodash.uniq(await addAntdLocales({ lang, country })).filter((localePath) => modulesHasLocale(localePath));
    return {
      lang,
      name,
      // react-intl Function.supportedLocalesOf
      // Uncaught RangeError: Incorrect locale information provided
      locale: name.split(separator).join("-"),
      country,
      antdLocale,
      paths: groups[name].map((item) => (0, import_plugin_utils.winPath)(item.path)),
      momentLocale
    };
  });
  return Promise.all(promises);
};
var exactLocalePaths = (data) => {
  return import_plugin_utils.lodash.flatten(data.map((item) => item.paths));
};
function isNeedPolyfill(targets = {}) {
  const polyfillTargets = {
    ie: 10,
    firefox: 28,
    chrome: 23,
    safari: 9.1,
    opera: 12.1,
    ios: 9.3,
    ios_saf: 9.3,
    operamini: Infinity,
    op_mini: Infinity,
    android: 4.3,
    blackberry: Infinity,
    operamobile: 12.1,
    op_mob: 12.1,
    explorermobil: 10,
    ie_mob: 10,
    ucandroid: Infinity
  };
  return Object.keys(targets).find((key) => {
    const lowKey = key.toLocaleLowerCase();
    return polyfillTargets[lowKey] && polyfillTargets[lowKey] >= targets[key];
  }) !== void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exactLocalePaths,
  getAntdLocale,
  getLocaleList,
  getMomentLocale,
  isNeedPolyfill
});
