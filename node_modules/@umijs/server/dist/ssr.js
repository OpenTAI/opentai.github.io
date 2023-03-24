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

// src/ssr.ts
var ssr_exports = {};
__export(ssr_exports, {
  createMarkupGenerator: () => createMarkupGenerator,
  default: () => createRequestHandler
});
module.exports = __toCommonJS(ssr_exports);
var import_stream = require("stream");
var import_server = require("react-dom/server");
var import_react_router_dom = require("react-router-dom");
function createJSXGenerator(opts) {
  return async (url) => {
    const {
      routesWithServerLoader,
      PluginManager,
      getPlugins,
      getValidKeys,
      getRoutes,
      createHistory
    } = opts;
    createHistory({ type: "memory", initialEntries: [url], initialIndex: 1 });
    const pluginManager = PluginManager.create({
      plugins: getPlugins(),
      validKeys: getValidKeys()
    });
    const { routes, routeComponents } = await getRoutes(pluginManager);
    await pluginManager.applyPlugins({
      key: "patchRoutes",
      type: "event",
      args: {
        routes,
        routeComponents
      }
    });
    const matches = matchRoutesForSSR(url, routes);
    if (matches.length === 0) {
      return;
    }
    const loaderData = {};
    await Promise.all(
      matches.filter((id) => routes[id].hasServerLoader).map(
        (id) => new Promise(async (resolve) => {
          loaderData[id] = await executeLoader(id, routesWithServerLoader);
          resolve();
        })
      )
    );
    const manifest = typeof opts.manifest === "function" ? opts.manifest() : opts.manifest;
    const context = {
      routes,
      routeComponents,
      pluginManager,
      location: url,
      manifest,
      loaderData
    };
    return {
      element: await opts.getClientRootComponent(context),
      manifest
    };
  };
}
function createMarkupGenerator(opts) {
  const jsxGeneratorDeferrer = createJSXGenerator(opts);
  return async (url) => {
    const jsx = await jsxGeneratorDeferrer(url);
    if (jsx) {
      return new Promise(async (resolve, reject) => {
        let chunks = [];
        const writable = new import_stream.Writable();
        writable._write = (chunk, _encoding, next) => {
          chunks.push(Buffer.from(chunk));
          next();
        };
        writable.on("finish", () => {
          let html = Buffer.concat(chunks).toString("utf8");
          html = html.replace(
            /(<\/head>)/,
            [
              opts.helmetContext.helmet.title.toString(),
              opts.helmetContext.helmet.priority.toString(),
              opts.helmetContext.helmet.meta.toString(),
              opts.helmetContext.helmet.link.toString(),
              opts.helmetContext.helmet.script.toString(),
              "$1"
            ].filter(Boolean).join("\n")
          );
          resolve(html);
        });
        const stream = (0, import_server.renderToPipeableStream)(jsx.element, {
          onShellReady() {
            stream.pipe(writable);
          },
          onError: reject
        });
      });
    }
    return "";
  };
}
function createRequestHandler(opts) {
  const jsxGeneratorDeferrer = createJSXGenerator(opts);
  return async function(req, res, next) {
    if (req.url.startsWith("/__serverLoader") && req.query.route) {
      const data = await executeLoader(
        req.query.route,
        opts.routesWithServerLoader
      );
      res.status(200).json(data);
      return;
    }
    const jsx = await jsxGeneratorDeferrer(req.url);
    if (!jsx)
      return next();
    const stream = (0, import_server.renderToPipeableStream)(jsx.element, {
      bootstrapScripts: [jsx.manifest.assets["umi.js"] || "/umi.js"],
      onShellReady() {
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onError(x) {
        console.error(x);
      }
    });
  };
}
function matchRoutesForSSR(reqUrl, routesById) {
  var _a;
  return ((_a = (0, import_react_router_dom.matchRoutes)(createClientRoutes({ routesById }), reqUrl)) == null ? void 0 : _a.map(
    (route) => route.route.id
  )) || [];
}
function createClientRoutes(opts) {
  const { routesById, parentId } = opts;
  return Object.keys(routesById).filter((id) => routesById[id].parentId === parentId).map((id) => {
    const route = createClientRoute(routesById[id]);
    const children = createClientRoutes({
      routesById,
      parentId: route.id
    });
    if (children.length > 0) {
      route.children = children;
    }
    return route;
  });
}
function createClientRoute(route) {
  const { id, path, index } = route;
  return {
    id,
    path,
    index
  };
}
async function executeLoader(routeKey, routesWithServerLoader) {
  const mod = await routesWithServerLoader[routeKey]();
  if (!mod.serverLoader || typeof mod.serverLoader !== "function") {
    return;
  }
  return await mod.serverLoader();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMarkupGenerator
});
