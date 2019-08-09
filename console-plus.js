/**
 * Super useful logger
 *
 * Currently no loggers out there that log time, filename and line number
 * 
 *
 * Example output:

 */

var fs = require("fs"),
  util = require("util");

var LOG_PREFIX =
  "[" +
  new Date().getDate() +
  "." +
  new Date().getMonth() +
  "." +
  new Date().getFullYear() +
  " / " +
  new Date().getHours() +
  ":" +
  new Date().getMinutes() +
  ":" +
  new Date().getSeconds() +
  "]";

require("callsite");

// Colours
var red = "\033[31m",
  blue = "\033[34m",
  reset = "\033[0m";

module.exports = {
  log: function() {
    var trace = getTrace(__stack[1]);
    var string = util.format(
      "%s [log] in %s:%d \n%s",
      trace.timestamp,
      getOrigin(trace.file),
      trace.lineno,
      util.format.apply(this, arguments)
    );

    process.stdout.write(string + "\n");
  },

  info: function() {
    var trace = getTrace(__stack[1]);

    var string = util.format(
      "%s [info] in %s:%d \n%s",
      trace.timestamp,
      getOrigin(trace.file),
      trace.lineno,
      util.format.apply(this, arguments)
    );

    process.stdout.write(colourise(36, string) + "\n");
  },

  error: function() {
    var trace = getTrace(__stack[1]);
    var string = util.format(
      "%s [error] in %s:%d \n%s",
      trace.timestamp,
      getOrigin(trace.file),
      trace.lineno,
      util.format.apply(this, arguments)
    );

    process.stdout.write(colourise(91, string) + "\n");
  }
};

function getTrace(call) {
  return {
    file: call.getFileName(),
    lineno: call.getLineNumber(),
    timestamp: LOG_PREFIX
  };
}

function colourise(colourCode, string) {
  return "\033[" + colourCode + "m" + string + "\033[0m";
}

function getOrigin(path) {
  return path.split("/").reverse()[1] + "/" + path.split("/").reverse()[0];
}
