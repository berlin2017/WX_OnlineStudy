const rd = require('rd');
const path = require('path');
const fs = require('fs');
const config = require('../config');

var log_root = path.join(__dirname, '../logs');
var prefix = config.selfHost + "/weapp/utils/getlogfile?file=";

function listFiles(rootDir) {
  var body = "";
  return new Promise(function (resolve, reject) {
    rd.each(rootDir, function (f, s, next) {
      f = f.replace(log_root, ".");
      body += "<a href=\"" + prefix + f + "\">" + f + " ( " + parseInt(s.size / 1024) + "KB )</a><br>";
      next();
    }, function (err) {
      if (!err) {
        resolve(body);
      }
      else {
        reject(err);
      }
    })
  })
}

module.exports = async (ctx, next) => {
  try {
    ctx.body = await listFiles(log_root);
  } catch (e) {
    ctx.body = e;
  }
}
