"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = _interopRequireDefault(require("express"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express.default.Router();

router.get("/", (req, res) => {
  //   let reactComp = renderToString();
  //   res.setHeader("Content-Type", "text/html");
  //   res.render("signup", {reactComp: reactComp});
  res.send("yay");
});
var _default = router;
exports.default = _default;
//# sourceMappingURL=signup.js.map