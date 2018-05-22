"use strict";

var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

var stream = weex.requireModule("stream");

var isJson = _interopRequire(require("./is_json"));

function weexFetch(method, url, body, type) {
  var headers = arguments[4] === undefined ? {} : arguments[4];

  var params = Object.assign({
    method: "GET",
    type: "json",
    headers: {}
  }, {
    methods: methods, url: url, type: type, body: body, headers: headers
  });
  return new Promise(function (resolve, reject) {
    stream.fetch(params, function (response) {
      if (response.ok) {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

module.exports = {
  /**
   * get method
   * @param {String} url required
   * @param {Object} headers default {}
   */
  get: function get(url) {
    var headers = arguments[1] === undefined ? {} : arguments[1];

    return weexFetch("GET", url, null, "json", headers);
  },
  /**
   * post data by form
   * @param {String} url required
   * @param {Object} data 
   * @param {String} type default 'json'
   * @param {Object} headers default {}
   */
  post: function post(url) {
    var data = arguments[1] === undefined ? {} : arguments[1];
    var headers = arguments[2] === undefined ? {} : arguments[2];

    var body = "";
    if (typeof data === "string") {
      body = data;
    } else {
      body = isJson(data) ? null : JSON.stringify(data);
    }
    return weexFetch("POST", url, body, "json", headers);
  },
  /**
   * 
   * @param {String} url 
   * @param {Object} data 
   * @param {Object} headers 
   */
  postJSON: function postJSON(url) {
    var data = arguments[1] === undefined ? {} : arguments[1];
    var headers = arguments[2] === undefined ? {} : arguments[2];

    var body = isJson(data) ? null : JSON.stringify(data);
    return weexFetch("POST", url, body, type, Object.assign(headers, { "Content-Type": "application/json" }));
  }
};