var paths = require("../config/paths");
var fs = require("fs");

let files = fs.readdirSync(paths.build + "/server");
files.forEach((name) => {
  if (name.match(/main/)) require(paths.build + "/server/" + name);
});
