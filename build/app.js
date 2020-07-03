"use strict";

var _express = _interopRequireDefault(require("express"));

var _signup = _interopRequireDefault(require("./routes/signup"));

var _index = _interopRequireDefault(require("./routes/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Routes
var createError = require("http-errors"); // var express = require("express");


var path = require("path");

var cookieParser = require("cookie-parser");

var logger = require("morgan");

var usersRouter = require("./routes/users");

var app = (0, _express.default)(); // view engine setup

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(_express.default.json());
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(cookieParser()); // app.use(express.static(path.join(__dirname, "public")));

app.use(_express.default.static("public"));
app.use(_express.default.static("dist")); // Routes

app.use("/", _index.default); // app.use("/users", usersRouter);

app.use("/signup", _signup.default); // catch 404 and forward to error handler

app.use(function (req, res, next) {
  next(createError(404));
}); // error handler

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {}; // render the error page

  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
//# sourceMappingURL=app.js.map