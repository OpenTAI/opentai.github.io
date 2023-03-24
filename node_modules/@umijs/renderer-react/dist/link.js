import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
var _excluded = ["prefetch"];
import React from 'react';
import { Link } from 'react-router-dom';
import { useAppData } from "./appContext";
export function LinkWithPrefetch(props) {
  var _props$to;

  var prefetch = props.prefetch,
      linkProps = _objectWithoutProperties(props, _excluded);

  var appData = useAppData();
  var to = typeof props.to === 'string' ? props.to : (_props$to = props.to) === null || _props$to === void 0 ? void 0 : _props$to.pathname; // compatible with old code
  // which to might be undefined

  if (!to) return null;
  return /*#__PURE__*/React.createElement(Link, _extends({
    onMouseEnter: function onMouseEnter() {
      var _appData$preloadRoute;

      return prefetch && to && ((_appData$preloadRoute = appData.preloadRoute) === null || _appData$preloadRoute === void 0 ? void 0 : _appData$preloadRoute.call(appData, to));
    }
  }, linkProps), props.children);
}