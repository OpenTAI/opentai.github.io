import _regeneratorRuntime from "@babel/runtime/helpers/esm/regeneratorRuntime";
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _asyncToGenerator from "@babel/runtime/helpers/esm/asyncToGenerator";
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { StaticRouter } from 'react-router-dom/server';
import { AppContext } from "./appContext";
import { Routes } from "./browser";
import { createClientRoutes } from "./routes";
// store helmet data
var helmetContext = {}; // get helmet context

export function getHelmetContext() {
  return helmetContext;
} // Get the root React component for ReactDOMServer.renderToString

export function getClientRootComponent(_x) {
  return _getClientRootComponent.apply(this, arguments);
}

function _getClientRootComponent() {
  _getClientRootComponent = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(opts) {
    var basename, components, clientRoutes, rootContainer, _i, _arr, key;

    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            basename = '/';
            components = _objectSpread({}, opts.routeComponents);
            clientRoutes = createClientRoutes({
              routesById: opts.routes,
              routeComponents: components
            });
            rootContainer = /*#__PURE__*/React.createElement(StaticRouter, {
              basename: basename,
              location: opts.location
            }, /*#__PURE__*/React.createElement(Routes, null));

            for (_i = 0, _arr = [// Lowest to the highest priority
            'innerProvider', 'i18nProvider', 'accessProvider', 'dataflowProvider', 'outerProvider', 'rootContainer']; _i < _arr.length; _i++) {
              key = _arr[_i];
              rootContainer = opts.pluginManager.applyPlugins({
                type: 'modify',
                key: key,
                initialValue: rootContainer,
                args: {}
              });
            }

            return _context.abrupt("return", /*#__PURE__*/React.createElement(Html, {
              loaderData: opts.loaderData,
              manifest: opts.manifest
            }, /*#__PURE__*/React.createElement(HelmetProvider, {
              context: helmetContext
            }, /*#__PURE__*/React.createElement(AppContext.Provider, {
              value: {
                routes: opts.routes,
                routeComponents: opts.routeComponents,
                clientRoutes: clientRoutes,
                pluginManager: opts.pluginManager,
                basename: basename,
                clientLoaderData: {},
                serverLoaderData: opts.loaderData
              }
            }, rootContainer))));

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getClientRootComponent.apply(this, arguments);
}

function Html(_ref) {
  var children = _ref.children,
      loaderData = _ref.loaderData,
      manifest = _ref.manifest;
  // TODO: 处理 head 标签，比如 favicon.ico 的一致性
  // TODO: root 支持配置
  return /*#__PURE__*/React.createElement("html", {
    lang: "en"
  }, /*#__PURE__*/React.createElement("head", null, /*#__PURE__*/React.createElement("meta", {
    charSet: "utf-8"
  }), /*#__PURE__*/React.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }), manifest.assets['umi.css'] && /*#__PURE__*/React.createElement("link", {
    rel: "stylesheet",
    href: manifest.assets['umi.css']
  })), /*#__PURE__*/React.createElement("body", null, /*#__PURE__*/React.createElement("noscript", {
    dangerouslySetInnerHTML: {
      __html: "<b>Enable JavaScript to run this app.</b>"
    }
  }), /*#__PURE__*/React.createElement("div", {
    id: "root"
  }, children), /*#__PURE__*/React.createElement("script", {
    dangerouslySetInnerHTML: {
      __html: "window.__UMI_LOADER_DATA__ = ".concat(JSON.stringify(loaderData))
    }
  })));
}