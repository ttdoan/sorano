"use strict";

var _LandingPage = _interopRequireDefault(require("../client/js/components/LandingPage"));

var _react = _interopRequireDefault(require("react"));

var _server = require("react-dom/server");

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let router = _express.default.Router();
/* GET home page. */


router.get("/", (req, res, next) => {
  let reactComp = (0, _server.renderToString)( /*#__PURE__*/_react.default.createElement(_LandingPage.default, null));
  res.setHeader("Content-Type", "text/html");
  res.render("index", {
    reactComp: reactComp
  });
});
module.exports = router;
//# sourceMappingURL=index.js.map