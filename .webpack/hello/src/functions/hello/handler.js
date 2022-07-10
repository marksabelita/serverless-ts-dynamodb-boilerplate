/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../../../src/libs/api-gateway.ts":
/*!****************************************!*\
  !*** ../../../src/libs/api-gateway.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "formatJSONResponse": () => (/* binding */ formatJSONResponse)
/* harmony export */ });
const formatJSONResponse = (response) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    };
};


/***/ }),

/***/ "../../../src/libs/lambda.ts":
/*!***********************************!*\
  !*** ../../../src/libs/lambda.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "middyfy": () => (/* binding */ middyfy)
/* harmony export */ });
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @middy/core */ "../../@middy/core/index.js");
/* harmony import */ var _middy_core__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_middy_core__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @middy/http-json-body-parser */ "../../@middy/http-json-body-parser/index.js");
/* harmony import */ var _middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1__);


const middyfy = (handler) => {
    return _middy_core__WEBPACK_IMPORTED_MODULE_0___default()(handler).use(_middy_http_json_body_parser__WEBPACK_IMPORTED_MODULE_1___default()());
};


/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "../../@middy/core/index.js":
/*!**********************************!*\
  !*** ../../@middy/core/index.js ***!
  \**********************************/
/***/ ((module) => {



const middy = (baseHandler = () => {}, plugin) => {
  var _plugin$beforePrefetc;

  plugin === null || plugin === void 0 ? void 0 : (_plugin$beforePrefetc = plugin.beforePrefetch) === null || _plugin$beforePrefetc === void 0 ? void 0 : _plugin$beforePrefetc.call(plugin);
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];

  const instance = (event = {}, context = {}) => {
    var _plugin$requestStart;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$requestStart = plugin.requestStart) === null || _plugin$requestStart === void 0 ? void 0 : _plugin$requestStart.call(plugin);
    const request = {
      event,
      context,
      response: undefined,
      error: undefined,
      internal: {}
    };
    return runRequest(request, [...beforeMiddlewares], baseHandler, [...afterMiddlewares], [...onErrorMiddlewares], plugin);
  };

  instance.use = middlewares => {
    if (Array.isArray(middlewares)) {
      for (const middleware of middlewares) {
        instance.applyMiddleware(middleware);
      }

      return instance;
    }

    return instance.applyMiddleware(middlewares);
  };

  instance.applyMiddleware = middleware => {
    const {
      before,
      after,
      onError
    } = middleware;

    if (!before && !after && !onError) {
      throw new Error('Middleware must be an object containing at least one key among "before", "after", "onError"');
    }

    if (before) instance.before(before);
    if (after) instance.after(after);
    if (onError) instance.onError(onError);
    return instance;
  }; // Inline Middlewares


  instance.before = beforeMiddleware => {
    beforeMiddlewares.push(beforeMiddleware);
    return instance;
  };

  instance.after = afterMiddleware => {
    afterMiddlewares.unshift(afterMiddleware);
    return instance;
  };

  instance.onError = onErrorMiddleware => {
    onErrorMiddlewares.push(onErrorMiddleware);
    return instance;
  };

  instance.__middlewares = {
    before: beforeMiddlewares,
    after: afterMiddlewares,
    onError: onErrorMiddlewares
  };
  return instance;
};

const runRequest = async (request, beforeMiddlewares, baseHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin); // Check if before stack hasn't exit early

    if (request.response === undefined) {
      var _plugin$beforeHandler, _plugin$afterHandler;

      plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeHandler = plugin.beforeHandler) === null || _plugin$beforeHandler === void 0 ? void 0 : _plugin$beforeHandler.call(plugin);
      request.response = await baseHandler(request.event, request.context);
      plugin === null || plugin === void 0 ? void 0 : (_plugin$afterHandler = plugin.afterHandler) === null || _plugin$afterHandler === void 0 ? void 0 : _plugin$afterHandler.call(plugin);
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (e) {
    // Reset response changes made by after stack before error thrown
    request.response = undefined;
    request.error = e;

    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (e) {
      // Save error that wasn't handled
      e.originalError = request.error;
      request.error = e;
      throw request.error;
    } // Catch if onError stack hasn't handled the error


    if (request.response === undefined) throw request.error;
  } finally {
    var _plugin$requestEnd;

    await (plugin === null || plugin === void 0 ? void 0 : (_plugin$requestEnd = plugin.requestEnd) === null || _plugin$requestEnd === void 0 ? void 0 : _plugin$requestEnd.call(plugin, request));
  }

  return request.response;
};

const runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    var _plugin$beforeMiddlew, _plugin$afterMiddlewa;

    plugin === null || plugin === void 0 ? void 0 : (_plugin$beforeMiddlew = plugin.beforeMiddleware) === null || _plugin$beforeMiddlew === void 0 ? void 0 : _plugin$beforeMiddlew.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name);
    const res = await (nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware(request));
    plugin === null || plugin === void 0 ? void 0 : (_plugin$afterMiddlewa = plugin.afterMiddleware) === null || _plugin$afterMiddlewa === void 0 ? void 0 : _plugin$afterMiddlewa.call(plugin, nextMiddleware === null || nextMiddleware === void 0 ? void 0 : nextMiddleware.name); // short circuit chaining and respond early

    if (res !== undefined) {
      request.response = res;
      return;
    }
  }
};

module.exports = middy;


/***/ }),

/***/ "../../@middy/http-json-body-parser/index.js":
/*!***************************************************!*\
  !*** ../../@middy/http-json-body-parser/index.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const mimePattern = /^application\/(.+\+)?json(;.*)?$/;
const defaults = {
  reviver: undefined
};

const httpJsonBodyParserMiddleware = (opts = {}) => {
  const options = { ...defaults,
    ...opts
  };

  const httpJsonBodyParserMiddlewareBefore = async request => {
    var _headers$ContentType;

    const {
      headers,
      body
    } = request.event;
    const contentTypeHeader = (_headers$ContentType = headers === null || headers === void 0 ? void 0 : headers['Content-Type']) !== null && _headers$ContentType !== void 0 ? _headers$ContentType : headers === null || headers === void 0 ? void 0 : headers['content-type'];

    if (mimePattern.test(contentTypeHeader)) {
      try {
        const data = request.event.isBase64Encoded ? Buffer.from(body, 'base64').toString() : body;
        request.event.rawBody = body;
        request.event.body = JSON.parse(data, options.reviver);
      } catch (err) {
        const {
          createError
        } = __webpack_require__(/*! @middy/util */ "../../@middy/util/index.js"); // UnprocessableEntity


        throw createError(422, 'Content type defined as JSON but an invalid JSON was provided');
      }
    }
  };

  return {
    before: httpJsonBodyParserMiddlewareBefore
  };
};

module.exports = httpJsonBodyParserMiddleware;


/***/ }),

/***/ "../../@middy/util/index.js":
/*!**********************************!*\
  !*** ../../@middy/util/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



const {
  Agent
} = __webpack_require__(/*! https */ "https"); // const { NodeHttpHandler } = require('@aws-sdk/node-http-handler') // aws-sdk v3


const awsClientDefaultOptions = {
  // AWS SDK v3
  // Docs: https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/enforcing-tls.html

  /* requestHandler: new NodeHttpHandler({
    httpsAgent: new Agent(
      {
        secureProtocol: 'TLSv1_2_method'
      }
    )
  }) */
  // Docs: https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/enforcing-tls.html
  httpOptions: {
    agent: new Agent({
      secureProtocol: 'TLSv1_2_method'
    })
  }
};

const createPrefetchClient = options => {
  const awsClientOptions = { ...awsClientDefaultOptions,
    ...options.awsClientOptions
  };
  const client = new options.AwsClient(awsClientOptions); // AWS XRay

  if (options.awsClientCapture) {
    return options.awsClientCapture(client);
  }

  return client;
};

const createClient = async (options, request) => {
  let awsClientCredentials = {}; // Role Credentials

  if (options.awsClientAssumeRole) {
    if (!request) throw new Error('Request required when assuming role');
    awsClientCredentials = await getInternal({
      credentials: options.awsClientAssumeRole
    }, request);
  }

  awsClientCredentials = { ...awsClientCredentials,
    ...options.awsClientOptions
  };
  return createPrefetchClient({ ...options,
    awsClientOptions: awsClientCredentials
  });
};

const canPrefetch = options => {
  return !(options !== null && options !== void 0 && options.awsClientAssumeRole) && !(options !== null && options !== void 0 && options.disablePrefetch);
}; // Internal Context


const getInternal = async (variables, request) => {
  if (!variables || !request) return {};
  let keys = [];
  let values = [];

  if (variables === true) {
    keys = values = Object.keys(request.internal);
  } else if (typeof variables === 'string') {
    keys = values = [variables];
  } else if (Array.isArray(variables)) {
    keys = values = variables;
  } else if (typeof variables === 'object') {
    keys = Object.keys(variables);
    values = Object.values(variables);
  }

  const promises = [];

  for (const internalKey of values) {
    var _valuePromise;

    // 'internal.key.sub_value' -> { [key]: internal.key.sub_value }
    const pathOptionKey = internalKey.split('.');
    const rootOptionKey = pathOptionKey.shift();
    let valuePromise = request.internal[rootOptionKey];

    if (typeof ((_valuePromise = valuePromise) === null || _valuePromise === void 0 ? void 0 : _valuePromise.then) !== 'function') {
      valuePromise = Promise.resolve(valuePromise);
    }

    promises.push(valuePromise.then(value => pathOptionKey.reduce((p, c) => p === null || p === void 0 ? void 0 : p[c], value)));
  } // ensure promise has resolved by the time it's needed
  // If one of the promises throws it will bubble up to @middy/core


  values = await Promise.allSettled(promises);
  const errors = values.filter(res => res.status === 'rejected').map(res => res.reason.message);
  if (errors.length) throw new Error(JSON.stringify(errors));
  return keys.reduce((obj, key, index) => ({ ...obj,
    [sanitizeKey(key)]: values[index].value
  }), {});
};

const sanitizeKeyPrefixLeadingNumber = /^([0-9])/;
const sanitizeKeyRemoveDisallowedChar = /[^a-zA-Z0-9]+/g;

const sanitizeKey = key => {
  return key.replace(sanitizeKeyPrefixLeadingNumber, '_$1').replace(sanitizeKeyRemoveDisallowedChar, '_');
}; // fetch Cache


const cache = {}; // key: { value:{fetchKey:Promise}, expiry }

const processCache = (options, fetch = () => undefined, request) => {
  const {
    cacheExpiry,
    cacheKey
  } = options;

  if (cacheExpiry) {
    const cached = getCache(cacheKey);
    const unexpired = cached && (cacheExpiry < 0 || cached.expiry > Date.now());

    if (unexpired && cached.modified) {
      const value = fetch(request, cached.value);
      cache[cacheKey] = {
        value: { ...cached.value,
          ...value
        },
        expiry: cached.expiry
      };
      return cache[cacheKey];
    }

    if (unexpired) {
      return { ...cached,
        cache: true
      };
    }
  }

  const value = fetch(request);
  const expiry = Date.now() + cacheExpiry;

  if (cacheExpiry) {
    cache[cacheKey] = {
      value,
      expiry
    };
  }

  return {
    value,
    expiry
  };
};

const getCache = key => {
  return cache[key];
}; // Used to remove parts of a cache


const modifyCache = (cacheKey, value) => {
  if (!cache[cacheKey]) return;
  cache[cacheKey] = { ...cache[cacheKey],
    value,
    modified: true
  };
};

const clearCache = (keys = null) => {
  var _keys;

  keys = (_keys = keys) !== null && _keys !== void 0 ? _keys : Object.keys(cache);
  if (!Array.isArray(keys)) keys = [keys];

  for (const cacheKey of keys) {
    cache[cacheKey] = undefined;
  }
};

const jsonSafeParse = (string, reviver) => {
  if (typeof string !== 'string') return string;
  const firstChar = string[0];
  if (firstChar !== '{' && firstChar !== '[' && firstChar !== '"') return string;

  try {
    return JSON.parse(string, reviver);
  } catch (e) {}

  return string;
};

const normalizeHttpResponse = response => {
  var _response$headers, _response;

  // May require updating to catch other types
  if (response === undefined) {
    response = {};
  } else if (Array.isArray(response) || typeof response !== 'object' || response === null) {
    response = {
      body: response
    };
  }

  response.headers = (_response$headers = (_response = response) === null || _response === void 0 ? void 0 : _response.headers) !== null && _response$headers !== void 0 ? _response$headers : {};
  return response;
}; // smaller version of `http-errors`


const statuses = __webpack_require__(/*! ./codes.json */ "../../@middy/util/codes.json");

const {
  inherits
} = __webpack_require__(/*! util */ "util");

const createErrorRegexp = /[^a-zA-Z]/g;

const createError = (code, message, properties = {}) => {
  const name = statuses[code].replace(createErrorRegexp, '');
  const className = name.substr(-5) !== 'Error' ? name + 'Error' : name;

  function HttpError(message) {
    // create the error object
    const msg = message !== null && message !== void 0 ? message : statuses[code];
    const err = new Error(msg); // capture a stack trace to the construction point

    Error.captureStackTrace(err, HttpError); // adjust the [[Prototype]]

    Object.setPrototypeOf(err, HttpError.prototype); // redefine the error message

    Object.defineProperty(err, 'message', {
      enumerable: true,
      configurable: true,
      value: msg,
      writable: true
    }); // redefine the error name

    Object.defineProperty(err, 'name', {
      enumerable: false,
      configurable: true,
      value: className,
      writable: true
    });
    return err;
  }

  inherits(HttpError, Error);
  const desc = Object.getOwnPropertyDescriptor(HttpError, 'name');
  desc.value = className;
  Object.defineProperty(HttpError, 'name', desc);
  Object.assign(HttpError.prototype, {
    status: code,
    statusCode: code,
    expose: code < 500
  }, properties);
  return new HttpError(message);
};

module.exports = {
  createPrefetchClient,
  createClient,
  canPrefetch,
  getInternal,
  sanitizeKey,
  processCache,
  getCache,
  modifyCache,
  clearCache,
  jsonSafeParse,
  normalizeHttpResponse,
  createError
};


/***/ }),

/***/ "../../@middy/util/codes.json":
/*!************************************!*\
  !*** ../../@middy/util/codes.json ***!
  \************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"100":"Continue","101":"Switching Protocols","102":"Processing","103":"Early Hints","200":"OK","201":"Created","202":"Accepted","203":"Non-Authoritative Information","204":"No Content","205":"Reset Content","206":"Partial Content","207":"Multi-Status","208":"Already Reported","226":"IM Used","300":"Multiple Choices","301":"Moved Permanently","302":"Found","303":"See Other","304":"Not Modified","305":"Use Proxy","306":"(Unused)","307":"Temporary Redirect","308":"Permanent Redirect","400":"Bad Request","401":"Unauthorized","402":"Payment Required","403":"Forbidden","404":"Not Found","405":"Method Not Allowed","406":"Not Acceptable","407":"Proxy Authentication Required","408":"Request Timeout","409":"Conflict","410":"Gone","411":"Length Required","412":"Precondition Failed","413":"Payload Too Large","414":"URI Too Long","415":"Unsupported Media Type","416":"Range Not Satisfiable","417":"Expectation Failed","418":"I\'m a teapot","421":"Misdirected Request","422":"Unprocessable Entity","423":"Locked","424":"Failed Dependency","425":"Unordered Collection","426":"Upgrade Required","428":"Precondition Required","429":"Too Many Requests","431":"Request Header Fields Too Large","451":"Unavailable For Legal Reasons","500":"Internal Server Error","501":"Not Implemented","502":"Bad Gateway","503":"Service Unavailable","504":"Gateway Timeout","505":"HTTP Version Not Supported","506":"Variant Also Negotiates","507":"Insufficient Storage","508":"Loop Detected","509":"Bandwidth Limit Exceeded","510":"Not Extended","511":"Network Authentication Required"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!***********************************************!*\
  !*** ../../../src/functions/hello/handler.ts ***!
  \***********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "main": () => (/* binding */ main)
/* harmony export */ });
/* harmony import */ var _libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @libs/api-gateway */ "../../../src/libs/api-gateway.ts");
/* harmony import */ var _libs_lambda__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @libs/lambda */ "../../../src/libs/lambda.ts");


const hello = async (event) => {
    return (0,_libs_api_gateway__WEBPACK_IMPORTED_MODULE_0__.formatJSONResponse)({
        message: `Hello welcome to the exciting Serverless world!`,
        event,
    });
};
const main = (0,_libs_lambda__WEBPACK_IMPORTED_MODULE_1__.middyfy)(hello);

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=handler.js.map