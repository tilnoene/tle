const slowAES = require('./aes.min');

function toNumbers(d) {
  var e = [];
  d.replace(/(..)/g, function (d) {
    e.push(parseInt(d, 16));
  });
  return e;
}

function toHex() {
  for (
    var d = [],
      d =
        1 == arguments.length && arguments[0].constructor == Array
          ? arguments[0]
          : arguments,
      e = "",
      f = 0;
    f < d.length;
    f++
  )
    e += (16 > d[f] ? "0" : "") + d[f].toString(16);
  return e.toLowerCase();
}

module.exports = () => {
  var a = toNumbers("e9ee4b03c1d0822987185d27bca23378"),
    b = toNumbers("188fafdbe0f87ef0fc2810d5b3e34705"),
    c = toNumbers("9960da1b100cd32267d0ed25ded823db");

  return toHex(slowAES.decrypt(c, 2, a, b));
}
