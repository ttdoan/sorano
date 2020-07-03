"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LandingPage;

var _react = _interopRequireDefault(require("react"));

require("core-js/stable");

require("regenerator-runtime/runtime");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Needed to polyfill ECMAScript features
// Need to use transpiled generator functions
function LandingPage() {
  function signup() {
    (async () => {
      let data = await fetch("http://localhost:3000/signup");
      console.log(data.json());
    })();
  }

  function login() {}

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("nav", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: signup
  }, "Sign Up"), /*#__PURE__*/_react.default.createElement("button", {
    onClick: login
  }, "Log in")));
}
//# sourceMappingURL=LandingPage.js.map