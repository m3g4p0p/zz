/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/component-emitter/index.js":
/*!*************************************************!*\
  !*** ./node_modules/component-emitter/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


/**
 * Expose `Emitter`.
 */

if (true) {
  module.exports = Emitter;
}

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  function on() {
    this.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks['$' + event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks['$' + event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks['$' + event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks['$' + event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),

/***/ "./node_modules/li/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/li/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (name, definition, context) {

  //try CommonJS, then AMD (require.js), then use global.

  if ( true && module.exports) module.exports = definition();
  else if (typeof context['define'] == 'function' && context['define']['amd']) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  else context[name] = definition();

})('li', function () {
  // compile regular expressions ahead of time for efficiency
  var relsRegExp = /^;\s*([^"=]+)=(?:"([^"]+)"|([^";,]+)(?:[;,]|$))/;
  var sourceRegExp = /^<([^>]*)>/;
  var delimiterRegExp = /^\s*,\s*/;

  return {
    parse: function (linksHeader, options) {
      var match;
      var source;
      var rels;
      var extended = options && options.extended || false;
      var links = [];

      while (linksHeader) {
        linksHeader = linksHeader.trim();

        // Parse `<link>`
        source = sourceRegExp.exec(linksHeader);
        if (!source) break;

        var current = {
          link: source[1]
        };

        // Move cursor
        linksHeader = linksHeader.slice(source[0].length);

        // Parse `; attr=relation` and `; attr="relation"`

        var nextDelimiter = linksHeader.match(delimiterRegExp);
        while(linksHeader && (!nextDelimiter || nextDelimiter.index > 0)) {
          match = relsRegExp.exec(linksHeader);
          if (!match) break;

          // Move cursor
          linksHeader = linksHeader.slice(match[0].length);
          nextDelimiter = linksHeader.match(delimiterRegExp);


          if (match[1] === 'rel' || match[1] === 'rev') {
            // Add either quoted rel or unquoted rel
            rels = (match[2] || match[3]).split(/\s+/);
            current[match[1]] = rels;
          } else {
            current[match[1]] = match[2] || match[3];
          }
        }

        links.push(current);
        // Move cursor
        linksHeader = linksHeader.replace(delimiterRegExp, '');
      }

      if (!extended) {
        return links.reduce(function(result, currentLink) {
          if (currentLink.rel) {
            currentLink.rel.forEach(function(rel) {
              result[rel] = currentLink.link;
            });
          }
          return result;
        }, {});
      }

      return links;
    },
    stringify: function (params) {
      var grouped = Object.keys(params).reduce(function(grouped, key) {
        grouped[params[key]] = grouped[params[key]] || [];
        grouped[params[key]].push(key);
        return grouped;
      }, {});

      var entries = Object.keys(grouped).reduce(function(result, link) {
        return result.concat('<' + link + '>; rel="' + grouped[link].join(' ') + '"');
      }, []);

      return entries.join(', ');
    }
  };

}, this);


/***/ }),

/***/ "./node_modules/qs/lib/formats.js":
/*!****************************************!*\
  !*** ./node_modules/qs/lib/formats.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "./node_modules/qs/lib/index.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "./node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "./node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "./node_modules/qs/lib/parse.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/parse.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset);
            val = options.decoder(part.slice(pos + 1), defaults.decoder, charset);
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (val && options.comma && val.indexOf(',') > -1) {
            val = val.split(',');
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new Error('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        depth: typeof opts.depth === 'number' ? opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "./node_modules/qs/lib/stringify.js":
/*!******************************************!*\
  !*** ./node_modules/qs/lib/stringify.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "./node_modules/qs/lib/formats.js");
var has = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var isArray = Array.isArray;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaults = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    formatter: formats.formatters[formats['default']],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray(obj)) {
        obj = obj.join(',');
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder, charset) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder, charset);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder, charset))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (isArray(obj)) {
            pushToArray(values, stringify(
                obj[key],
                typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix,
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        } else {
            pushToArray(values, stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly,
                charset
            ));
        }
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.encoder !== null && opts.encoder !== undefined && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has.call(formats.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats.formatters[format];

    var filter = defaults.filter;
    if (typeof opts.filter === 'function' || isArray(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults.encodeValuesOnly,
        filter: filter,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

module.exports = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "./node_modules/qs/lib/utils.js":
/*!**************************************!*\
  !*** ./node_modules/qs/lib/utils.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray(target) && !isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray(target) && isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "./node_modules/superagent/lib/agent-base.js":
/*!***************************************************!*\
  !*** ./node_modules/superagent/lib/agent-base.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function Agent() {
  this._defaults = [];
}

["use", "on", "once", "set", "query", "type", "accept", "auth", "withCredentials", "sortQuery", "retry", "ok", "redirects",
 "timeout", "buffer", "serialize", "parse", "ca", "key", "pfx", "cert"].forEach(fn => {
  /** Default setting for all requests from this agent */
  Agent.prototype[fn] = function(...args) {
    this._defaults.push({fn, args});
    return this;
  }
});

Agent.prototype._setDefaults = function(req) {
    this._defaults.forEach(def => {
      req[def.fn].apply(req, def.args);
    });
};

module.exports = Agent;


/***/ }),

/***/ "./node_modules/superagent/lib/client.js":
/*!***********************************************!*\
  !*** ./node_modules/superagent/lib/client.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Root reference for iframes.
 */

let root;
if (typeof window !== 'undefined') { // Browser window
  root = window;
} else if (typeof self !== 'undefined') { // Web Worker
  root = self;
} else { // Other environments
  console.warn("Using browser-only version of superagent in non-browser environment");
  root = this;
}

const Emitter = __webpack_require__(/*! component-emitter */ "./node_modules/component-emitter/index.js");
const RequestBase = __webpack_require__(/*! ./request-base */ "./node_modules/superagent/lib/request-base.js");
const isObject = __webpack_require__(/*! ./is-object */ "./node_modules/superagent/lib/is-object.js");
const ResponseBase = __webpack_require__(/*! ./response-base */ "./node_modules/superagent/lib/response-base.js");
const Agent = __webpack_require__(/*! ./agent-base */ "./node_modules/superagent/lib/agent-base.js");

/**
 * Noop.
 */

function noop(){};

/**
 * Expose `request`.
 */

const request = exports = module.exports = function(method, url) {
  // callback
  if ('function' == typeof url) {
    return new exports.Request('GET', method).end(url);
  }

  // url first
  if (1 == arguments.length) {
    return new exports.Request('GET', method);
  }

  return new exports.Request(method, url);
};

exports.Request = Request;

/**
 * Determine XHR.
 */

request.getXHR = () => {
  if (root.XMLHttpRequest
      && (!root.location || 'file:' != root.location.protocol
          || !root.ActiveXObject)) {
    return new XMLHttpRequest;
  } else {
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch(e) {}
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch(e) {}
  }
  throw Error("Browser-only version of superagent could not find XHR");
};

/**
 * Removes leading and trailing whitespace, added to support IE.
 *
 * @param {String} s
 * @return {String}
 * @api private
 */

const trim = ''.trim
  ? s => s.trim()
  : s => s.replace(/(^\s*|\s*$)/g, '');

/**
 * Serialize the given `obj`.
 *
 * @param {Object} obj
 * @return {String}
 * @api private
 */

function serialize(obj) {
  if (!isObject(obj)) return obj;
  const pairs = [];
  for (const key in obj) {
    pushEncodedKeyValuePair(pairs, key, obj[key]);
  }
  return pairs.join('&');
}

/**
 * Helps 'serialize' with serializing arrays.
 * Mutates the pairs array.
 *
 * @param {Array} pairs
 * @param {String} key
 * @param {Mixed} val
 */

function pushEncodedKeyValuePair(pairs, key, val) {
  if (val != null) {
    if (Array.isArray(val)) {
      val.forEach(v => {
        pushEncodedKeyValuePair(pairs, key, v);
      });
    } else if (isObject(val)) {
      for(const subkey in val) {
        pushEncodedKeyValuePair(pairs, `${key}[${subkey}]`, val[subkey]);
      }
    } else {
      pairs.push(encodeURIComponent(key)
        + '=' + encodeURIComponent(val));
    }
  } else if (val === null) {
    pairs.push(encodeURIComponent(key));
  }
}

/**
 * Expose serialization method.
 */

request.serializeObject = serialize;

/**
  * Parse the given x-www-form-urlencoded `str`.
  *
  * @param {String} str
  * @return {Object}
  * @api private
  */

function parseString(str) {
  const obj = {};
  const pairs = str.split('&');
  let pair;
  let pos;

  for (let i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    pos = pair.indexOf('=');
    if (pos == -1) {
      obj[decodeURIComponent(pair)] = '';
    } else {
      obj[decodeURIComponent(pair.slice(0, pos))] =
        decodeURIComponent(pair.slice(pos + 1));
    }
  }

  return obj;
}

/**
 * Expose parser.
 */

request.parseString = parseString;

/**
 * Default MIME type map.
 *
 *     superagent.types.xml = 'application/xml';
 *
 */

request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'text/xml',
  urlencoded: 'application/x-www-form-urlencoded',
  'form': 'application/x-www-form-urlencoded',
  'form-data': 'application/x-www-form-urlencoded'
};

/**
 * Default serialization map.
 *
 *     superagent.serialize['application/xml'] = function(obj){
 *       return 'generated xml here';
 *     };
 *
 */

request.serialize = {
  'application/x-www-form-urlencoded': serialize,
  'application/json': JSON.stringify
};

/**
  * Default parsers.
  *
  *     superagent.parse['application/xml'] = function(str){
  *       return { object parsed from str };
  *     };
  *
  */

request.parse = {
  'application/x-www-form-urlencoded': parseString,
  'application/json': JSON.parse
};

/**
 * Parse the given header `str` into
 * an object containing the mapped fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

function parseHeader(str) {
  const lines = str.split(/\r?\n/);
  const fields = {};
  let index;
  let line;
  let field;
  let val;

  for (let i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    if (index === -1) { // could be empty line, just skip it
      continue;
    }
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }

  return fields;
}

/**
 * Check if `mime` is json or has +json structured syntax suffix.
 *
 * @param {String} mime
 * @return {Boolean}
 * @api private
 */

function isJSON(mime) {
  // should match /json or +json
  // but not /json-seq
  return /[\/+]json($|[^-\w])/.test(mime);
}

/**
 * Initialize a new `Response` with the given `xhr`.
 *
 *  - set flags (.ok, .error, etc)
 *  - parse header
 *
 * Examples:
 *
 *  Aliasing `superagent` as `request` is nice:
 *
 *      request = superagent;
 *
 *  We can use the promise-like API, or pass callbacks:
 *
 *      request.get('/').end(function(res){});
 *      request.get('/', function(res){});
 *
 *  Sending data can be chained:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' })
 *        .end(function(res){});
 *
 *  Or passed to `.send()`:
 *
 *      request
 *        .post('/user')
 *        .send({ name: 'tj' }, function(res){});
 *
 *  Or passed to `.post()`:
 *
 *      request
 *        .post('/user', { name: 'tj' })
 *        .end(function(res){});
 *
 * Or further reduced to a single call for simple cases:
 *
 *      request
 *        .post('/user', { name: 'tj' }, function(res){});
 *
 * @param {XMLHTTPRequest} xhr
 * @param {Object} options
 * @api private
 */

function Response(req) {
  this.req = req;
  this.xhr = this.req.xhr;
  // responseText is accessible only if responseType is '' or 'text' and on older browsers
  this.text = ((this.req.method !='HEAD' && (this.xhr.responseType === '' || this.xhr.responseType === 'text')) || typeof this.xhr.responseType === 'undefined')
     ? this.xhr.responseText
     : null;
  this.statusText = this.req.xhr.statusText;
  let status = this.xhr.status;
  // handle IE9 bug: http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
  if (status === 1223) {
    status = 204;
  }
  this._setStatusProperties(status);
  this.header = this.headers = parseHeader(this.xhr.getAllResponseHeaders());
  // getAllResponseHeaders sometimes falsely returns "" for CORS requests, but
  // getResponseHeader still works. so we get content-type even if getting
  // other headers fails.
  this.header['content-type'] = this.xhr.getResponseHeader('content-type');
  this._setHeaderProperties(this.header);

  if (null === this.text && req._responseType) {
    this.body = this.xhr.response;
  } else {
    this.body = this.req.method != 'HEAD'
      ? this._parseBody(this.text ? this.text : this.xhr.response)
      : null;
  }
}

ResponseBase(Response.prototype);

/**
 * Parse the given body `str`.
 *
 * Used for auto-parsing of bodies. Parsers
 * are defined on the `superagent.parse` object.
 *
 * @param {String} str
 * @return {Mixed}
 * @api private
 */

Response.prototype._parseBody = function(str) {
  let parse = request.parse[this.type];
  if (this.req._parser) {
    return this.req._parser(this, str);
  }
  if (!parse && isJSON(this.type)) {
    parse = request.parse['application/json'];
  }
  return parse && str && (str.length || str instanceof Object)
    ? parse(str)
    : null;
};

/**
 * Return an `Error` representative of this response.
 *
 * @return {Error}
 * @api public
 */

Response.prototype.toError = function(){
  const req = this.req;
  const method = req.method;
  const url = req.url;

  const msg = `cannot ${method} ${url} (${this.status})`;
  const err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;

  return err;
};

/**
 * Expose `Response`.
 */

request.Response = Response;

/**
 * Initialize a new `Request` with the given `method` and `url`.
 *
 * @param {String} method
 * @param {String} url
 * @api public
 */

function Request(method, url) {
  const self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {}; // preserves header name case
  this._header = {}; // coerces header names to lowercase
  this.on('end', () => {
    let err = null;
    let res = null;

    try {
      res = new Response(self);
    } catch(e) {
      err = new Error('Parser is unable to parse the response');
      err.parse = true;
      err.original = e;
      // issue #675: return the raw response if the response parsing fails
      if (self.xhr) {
        // ie9 doesn't have 'response' property
        err.rawResponse = typeof self.xhr.responseType == 'undefined' ? self.xhr.responseText : self.xhr.response;
        // issue #876: return the http status code if the response parsing fails
        err.status = self.xhr.status ? self.xhr.status : null;
        err.statusCode = err.status; // backwards-compat only
      } else {
        err.rawResponse = null;
        err.status = null;
      }

      return self.callback(err);
    }

    self.emit('response', res);

    let new_err;
    try {
      if (!self._isResponseOK(res)) {
        new_err = new Error(res.statusText || 'Unsuccessful HTTP response');
      }
    } catch(custom_err) {
      new_err = custom_err; // ok() callback can throw
    }

    // #1000 don't catch errors from the callback to avoid double calling it
    if (new_err) {
      new_err.original = err;
      new_err.response = res;
      new_err.status = res.status;
      self.callback(new_err, res);
    } else {
      self.callback(null, res);
    }
  });
}

/**
 * Mixin `Emitter` and `RequestBase`.
 */

Emitter(Request.prototype);
RequestBase(Request.prototype);

/**
 * Set Content-Type to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.xml = 'application/xml';
 *
 *      request.post('/')
 *        .type('xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 *      request.post('/')
 *        .type('application/xml')
 *        .send(xmlstring)
 *        .end(callback);
 *
 * @param {String} type
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.type = function(type){
  this.set('Content-Type', request.types[type] || type);
  return this;
};

/**
 * Set Accept to `type`, mapping values from `request.types`.
 *
 * Examples:
 *
 *      superagent.types.json = 'application/json';
 *
 *      request.get('/agent')
 *        .accept('json')
 *        .end(callback);
 *
 *      request.get('/agent')
 *        .accept('application/json')
 *        .end(callback);
 *
 * @param {String} accept
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.accept = function(type){
  this.set('Accept', request.types[type] || type);
  return this;
};

/**
 * Set Authorization field value with `user` and `pass`.
 *
 * @param {String} user
 * @param {String} [pass] optional in case of using 'bearer' as type
 * @param {Object} options with 'type' property 'auto', 'basic' or 'bearer' (default 'basic')
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = {
      type: 'function' === typeof btoa ? 'basic' : 'auto',
    };
  }

  const encoder = string => {
    if ('function' === typeof btoa) {
      return btoa(string);
    }
    throw new Error('Cannot use basic auth, btoa is not a function');
  };

  return this._auth(user, pass, options, encoder);
};

/**
 * Add query-string `val`.
 *
 * Examples:
 *
 *   request.get('/shoes')
 *     .query('size=10')
 *     .query({ color: 'blue' })
 *
 * @param {Object|String} val
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
  if (val) this._query.push(val);
  return this;
};

/**
 * Queue the given `file` as an attachment to the specified `field`,
 * with optional `options` (or filename).
 *
 * ``` js
 * request.post('/upload')
 *   .attach('content', new Blob(['<a id="a"><b id="b">hey!</b></a>'], { type: "text/html"}))
 *   .end(callback);
 * ```
 *
 * @param {String} field
 * @param {Blob|File} file
 * @param {String|Object} options
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.attach = function(field, file, options){
  if (file) {
    if (this._data) {
      throw Error("superagent can't mix .send() and .attach()");
    }

    this._getFormData().append(field, file, options || file.name);
  }
  return this;
};

Request.prototype._getFormData = function(){
  if (!this._formData) {
    this._formData = new root.FormData();
  }
  return this._formData;
};

/**
 * Invoke the callback with `err` and `res`
 * and handle arity check.
 *
 * @param {Error} err
 * @param {Response} res
 * @api private
 */

Request.prototype.callback = function(err, res){
  if (this._shouldRetry(err, res)) {
    return this._retry();
  }

  const fn = this._callback;
  this.clearTimeout();

  if (err) {
    if (this._maxRetries) err.retries = this._retries - 1;
    this.emit('error', err);
  }

  fn(err, res);
};

/**
 * Invoke callback with x-domain error.
 *
 * @api private
 */

Request.prototype.crossDomainError = function(){
  const err = new Error('Request has been terminated\nPossible causes: the network is offline, Origin is not allowed by Access-Control-Allow-Origin, the page is being unloaded, etc.');
  err.crossDomain = true;

  err.status = this.status;
  err.method = this.method;
  err.url = this.url;

  this.callback(err);
};

// This only warns, because the request is still likely to work
Request.prototype.buffer = Request.prototype.ca = Request.prototype.agent = function(){
  console.warn("This is not supported in browser version of superagent");
  return this;
};

// This throws, because it can't send/receive data as expected
Request.prototype.pipe = Request.prototype.write = () => {
  throw Error("Streaming is not supported in browser version of superagent");
};

/**
 * Check if `obj` is a host object,
 * we don't want to serialize these :)
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */
Request.prototype._isHost = function _isHost(obj) {
  // Native objects stringify to [object File], [object Blob], [object FormData], etc.
  return obj && 'object' === typeof obj && !Array.isArray(obj) && Object.prototype.toString.call(obj) !== '[object Object]';
}

/**
 * Initiate request, invoking callback `fn(res)`
 * with an instanceof `Response`.
 *
 * @param {Function} fn
 * @return {Request} for chaining
 * @api public
 */

Request.prototype.end = function(fn){
  if (this._endCalled) {
    console.warn("Warning: .end() was called twice. This is not supported in superagent");
  }
  this._endCalled = true;

  // store callback
  this._callback = fn || noop;

  // querystring
  this._finalizeQueryString();

  this._end();
};

Request.prototype._end = function() {
  if (this._aborted) return this.callback(Error("The request has been aborted even before .end() was called"));

  const self = this;
  const xhr = (this.xhr = request.getXHR());
  let data = this._formData || this._data;

  this._setTimeouts();

  // state change
  xhr.onreadystatechange = () => {
    const readyState = xhr.readyState;
    if (readyState >= 2 && self._responseTimeoutTimer) {
      clearTimeout(self._responseTimeoutTimer);
    }
    if (4 != readyState) {
      return;
    }

    // In IE9, reads to any property (e.g. status) off of an aborted XHR will
    // result in the error "Could not complete the operation due to error c00c023f"
    let status;
    try { status = xhr.status } catch(e) { status = 0; }

    if (!status) {
      if (self.timedout || self._aborted) return;
      return self.crossDomainError();
    }
    self.emit('end');
  };

  // progress
  const handleProgress = (direction, e) => {
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
    e.direction = direction;
    self.emit('progress', e);
  };
  if (this.hasListeners('progress')) {
    try {
      xhr.onprogress = handleProgress.bind(null, 'download');
      if (xhr.upload) {
        xhr.upload.onprogress = handleProgress.bind(null, 'upload');
      }
    } catch(e) {
      // Accessing xhr.upload fails in IE from a web worker, so just pretend it doesn't exist.
      // Reported here:
      // https://connect.microsoft.com/IE/feedback/details/837245/xmlhttprequest-upload-throws-invalid-argument-when-used-from-web-worker-context
    }
  }

  // initiate request
  try {
    if (this.username && this.password) {
      xhr.open(this.method, this.url, true, this.username, this.password);
    } else {
      xhr.open(this.method, this.url, true);
    }
  } catch (err) {
    // see #1149
    return this.callback(err);
  }

  // CORS
  if (this._withCredentials) xhr.withCredentials = true;

  // body
  if (!this._formData && 'GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !this._isHost(data)) {
    // serialize stuff
    const contentType = this._header['content-type'];
    let serialize = this._serializer || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (!serialize && isJSON(contentType)) {
      serialize = request.serialize['application/json'];
    }
    if (serialize) data = serialize(data);
  }

  // set header fields
  for (const field in this.header) {
    if (null == this.header[field]) continue;

    if (this.header.hasOwnProperty(field))
      xhr.setRequestHeader(field, this.header[field]);
  }

  if (this._responseType) {
    xhr.responseType = this._responseType;
  }

  // send stuff
  this.emit('request', this);

  // IE11 xhr.send(undefined) sends 'undefined' string as POST payload (instead of nothing)
  // We need null here if data is undefined
  xhr.send(typeof data !== 'undefined' ? data : null);
};

request.agent = () => new Agent();

["GET", "POST", "OPTIONS", "PATCH", "PUT", "DELETE"].forEach(method => {
  Agent.prototype[method.toLowerCase()] = function(url, fn) {
    const req = new request.Request(method, url);
    this._setDefaults(req);
    if (fn) {
      req.end(fn);
    }
    return req;
  };
});

Agent.prototype.del = Agent.prototype['delete'];

/**
 * GET `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.get = (url, data, fn) => {
  const req = request('GET', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * HEAD `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.head = (url, data, fn) => {
  const req = request('HEAD', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.query(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * OPTIONS query to `url` with optional callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.options = (url, data, fn) => {
  const req = request('OPTIONS', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * DELETE `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

function del(url, data, fn) {
  const req = request('DELETE', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
}

request['del'] = del;
request['delete'] = del;

/**
 * PATCH `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.patch = (url, data, fn) => {
  const req = request('PATCH', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * POST `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed} [data]
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.post = (url, data, fn) => {
  const req = request('POST', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};

/**
 * PUT `url` with optional `data` and callback `fn(res)`.
 *
 * @param {String} url
 * @param {Mixed|Function} [data] or fn
 * @param {Function} [fn]
 * @return {Request}
 * @api public
 */

request.put = (url, data, fn) => {
  const req = request('PUT', url);
  if ('function' == typeof data) (fn = data), (data = null);
  if (data) req.send(data);
  if (fn) req.end(fn);
  return req;
};


/***/ }),

/***/ "./node_modules/superagent/lib/is-object.js":
/*!**************************************************!*\
  !*** ./node_modules/superagent/lib/is-object.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Check if `obj` is an object.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isObject(obj) {
  return null !== obj && 'object' === typeof obj;
}

module.exports = isObject;


/***/ }),

/***/ "./node_modules/superagent/lib/request-base.js":
/*!*****************************************************!*\
  !*** ./node_modules/superagent/lib/request-base.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module of mixed-in functions shared between node and client code
 */
const isObject = __webpack_require__(/*! ./is-object */ "./node_modules/superagent/lib/is-object.js");

/**
 * Expose `RequestBase`.
 */

module.exports = RequestBase;

/**
 * Initialize a new `RequestBase`.
 *
 * @api public
 */

function RequestBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in RequestBase.prototype) {
    obj[key] = RequestBase.prototype[key];
  }
  return obj;
}

/**
 * Clear previous timeout.
 *
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.clearTimeout = function _clearTimeout(){
  clearTimeout(this._timer);
  clearTimeout(this._responseTimeoutTimer);
  delete this._timer;
  delete this._responseTimeoutTimer;
  return this;
};

/**
 * Override default response body parser
 *
 * This function will be called to convert incoming data into request.body
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.parse = function parse(fn){
  this._parser = fn;
  return this;
};

/**
 * Set format of binary response body.
 * In browser valid formats are 'blob' and 'arraybuffer',
 * which return Blob and ArrayBuffer, respectively.
 *
 * In Node all values result in Buffer.
 *
 * Examples:
 *
 *      req.get('/')
 *        .responseType('blob')
 *        .end(callback);
 *
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.responseType = function(val){
  this._responseType = val;
  return this;
};

/**
 * Override default request body serializer
 *
 * This function will be called to convert data set via .send or .attach into payload to send
 *
 * @param {Function}
 * @api public
 */

RequestBase.prototype.serialize = function serialize(fn){
  this._serializer = fn;
  return this;
};

/**
 * Set timeouts.
 *
 * - response timeout is time between sending request and receiving the first byte of the response. Includes DNS and connection time.
 * - deadline is the time from start of the request to receiving response body in full. If the deadline is too short large files may not load at all on slow connections.
 *
 * Value of 0 or false means no timeout.
 *
 * @param {Number|Object} ms or {response, deadline}
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.timeout = function timeout(options){
  if (!options || 'object' !== typeof options) {
    this._timeout = options;
    this._responseTimeout = 0;
    return this;
  }

  for(const option in options) {
    switch(option) {
      case 'deadline':
        this._timeout = options.deadline;
        break;
      case 'response':
        this._responseTimeout = options.response;
        break;
      default:
        console.warn("Unknown timeout option", option);
    }
  }
  return this;
};

/**
 * Set number of retry attempts on error.
 *
 * Failed requests will be retried 'count' times if timeout or err.code >= 500.
 *
 * @param {Number} count
 * @param {Function} [fn]
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.retry = function retry(count, fn){
  // Default to 1 if no count passed or true
  if (arguments.length === 0 || count === true) count = 1;
  if (count <= 0) count = 0;
  this._maxRetries = count;
  this._retries = 0;
  this._retryCallback = fn;
  return this;
};

const ERROR_CODES = [
  'ECONNRESET',
  'ETIMEDOUT',
  'EADDRINFO',
  'ESOCKETTIMEDOUT'
];

/**
 * Determine if a request should be retried.
 * (Borrowed from segmentio/superagent-retry)
 *
 * @param {Error} err
 * @param {Response} [res]
 * @returns {Boolean}
 */
RequestBase.prototype._shouldRetry = function(err, res) {
  if (!this._maxRetries || this._retries++ >= this._maxRetries) {
    return false;
  }
  if (this._retryCallback) {
    try {
      const override = this._retryCallback(err, res);
      if (override === true) return true;
      if (override === false) return false;
      // undefined falls back to defaults
    } catch(e) {
      console.error(e);
    }
  }
  if (res && res.status && res.status >= 500 && res.status != 501) return true;
  if (err) {
    if (err.code && ~ERROR_CODES.indexOf(err.code)) return true;
    // Superagent timeout
    if (err.timeout && err.code == 'ECONNABORTED') return true;
    if (err.crossDomain) return true;
  }
  return false;
};

/**
 * Retry request
 *
 * @return {Request} for chaining
 * @api private
 */

RequestBase.prototype._retry = function() {

  this.clearTimeout();

  // node
  if (this.req) {
    this.req = null;
    this.req = this.request();
  }

  this._aborted = false;
  this.timedout = false;

  return this._end();
};

/**
 * Promise support
 *
 * @param {Function} resolve
 * @param {Function} [reject]
 * @return {Request}
 */

RequestBase.prototype.then = function then(resolve, reject) {
  if (!this._fullfilledPromise) {
    const self = this;
    if (this._endCalled) {
      console.warn("Warning: superagent request was sent twice, because both .end() and .then() were called. Never call .end() if you use promises");
    }
    this._fullfilledPromise = new Promise((innerResolve, innerReject) => {
      self.on('error', innerReject);
      self.on('abort', () => {
        const err = new Error('Aborted');
        err.code = "ABORTED";
        err.status = this.status;
        err.method = this.method;
        err.url = this.url;
        innerReject(err);
      });
      self.end((err, res) => {
        if (err) innerReject(err);
        else innerResolve(res);
      });
    });
  }
  return this._fullfilledPromise.then(resolve, reject);
};

RequestBase.prototype['catch'] = function(cb) {
  return this.then(undefined, cb);
};

/**
 * Allow for extension
 */

RequestBase.prototype.use = function use(fn) {
  fn(this);
  return this;
};

RequestBase.prototype.ok = function(cb) {
  if ('function' !== typeof cb) throw Error("Callback required");
  this._okCallback = cb;
  return this;
};

RequestBase.prototype._isResponseOK = function(res) {
  if (!res) {
    return false;
  }

  if (this._okCallback) {
    return this._okCallback(res);
  }

  return res.status >= 200 && res.status < 300;
};

/**
 * Get request header `field`.
 * Case-insensitive.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

RequestBase.prototype.get = function(field){
  return this._header[field.toLowerCase()];
};

/**
 * Get case-insensitive header `field` value.
 * This is a deprecated internal API. Use `.get(field)` instead.
 *
 * (getHeader is no longer used internally by the superagent code base)
 *
 * @param {String} field
 * @return {String}
 * @api private
 * @deprecated
 */

RequestBase.prototype.getHeader = RequestBase.prototype.get;

/**
 * Set header `field` to `val`, or multiple fields with one object.
 * Case-insensitive.
 *
 * Examples:
 *
 *      req.get('/')
 *        .set('Accept', 'application/json')
 *        .set('X-API-Key', 'foobar')
 *        .end(callback);
 *
 *      req.get('/')
 *        .set({ Accept: 'application/json', 'X-API-Key': 'foobar' })
 *        .end(callback);
 *
 * @param {String|Object} field
 * @param {String} val
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.set = function(field, val){
  if (isObject(field)) {
    for (const key in field) {
      this.set(key, field[key]);
    }
    return this;
  }
  this._header[field.toLowerCase()] = val;
  this.header[field] = val;
  return this;
};

/**
 * Remove header `field`.
 * Case-insensitive.
 *
 * Example:
 *
 *      req.get('/')
 *        .unset('User-Agent')
 *        .end(callback);
 *
 * @param {String} field
 */
RequestBase.prototype.unset = function(field){
  delete this._header[field.toLowerCase()];
  delete this.header[field];
  return this;
};

/**
 * Write the field `name` and `val`, or multiple fields with one object
 * for "multipart/form-data" request bodies.
 *
 * ``` js
 * request.post('/upload')
 *   .field('foo', 'bar')
 *   .end(callback);
 *
 * request.post('/upload')
 *   .field({ foo: 'bar', baz: 'qux' })
 *   .end(callback);
 * ```
 *
 * @param {String|Object} name
 * @param {String|Blob|File|Buffer|fs.ReadStream} val
 * @return {Request} for chaining
 * @api public
 */
RequestBase.prototype.field = function(name, val) {
  // name should be either a string or an object.
  if (null === name || undefined === name) {
    throw new Error('.field(name, val) name can not be empty');
  }

  if (this._data) {
    throw new Error(".field() can't be used if .send() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObject(name)) {
    for (const key in name) {
      this.field(key, name[key]);
    }
    return this;
  }

  if (Array.isArray(val)) {
    for (const i in val) {
      this.field(name, val[i]);
    }
    return this;
  }

  // val should be defined now
  if (null === val || undefined === val) {
    throw new Error('.field(name, val) val can not be empty');
  }
  if ('boolean' === typeof val) {
    val = '' + val;
  }
  this._getFormData().append(name, val);
  return this;
};

/**
 * Abort the request, and clear potential timeout.
 *
 * @return {Request}
 * @api public
 */
RequestBase.prototype.abort = function(){
  if (this._aborted) {
    return this;
  }
  this._aborted = true;
  this.xhr && this.xhr.abort(); // browser
  this.req && this.req.abort(); // node
  this.clearTimeout();
  this.emit('abort');
  return this;
};

RequestBase.prototype._auth = function(user, pass, options, base64Encoder) {
  switch (options.type) {
    case 'basic':
      this.set('Authorization', `Basic ${base64Encoder(`${user}:${pass}`)}`);
      break;

    case 'auto':
      this.username = user;
      this.password = pass;
      break;

    case 'bearer': // usage would be .auth(accessToken, { type: 'bearer' })
      this.set('Authorization', `Bearer ${user}`);
      break;
  }
  return this;
};

/**
 * Enable transmission of cookies with x-domain requests.
 *
 * Note that for this to work the origin must not be
 * using "Access-Control-Allow-Origin" with a wildcard,
 * and also must set "Access-Control-Allow-Credentials"
 * to "true".
 *
 * @api public
 */

RequestBase.prototype.withCredentials = function(on) {
  // This is browser-only functionality. Node side is no-op.
  if (on == undefined) on = true;
  this._withCredentials = on;
  return this;
};

/**
 * Set the max redirects to `n`. Does noting in browser XHR implementation.
 *
 * @param {Number} n
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.redirects = function(n){
  this._maxRedirects = n;
  return this;
};

/**
 * Maximum size of buffered response body, in bytes. Counts uncompressed size.
 * Default 200MB.
 *
 * @param {Number} n
 * @return {Request} for chaining
 */
RequestBase.prototype.maxResponseSize = function(n){
  if ('number' !== typeof n) {
    throw TypeError("Invalid argument");
  }
  this._maxResponseSize = n;
  return this;
};

/**
 * Convert to a plain javascript object (not JSON string) of scalar properties.
 * Note as this method is designed to return a useful non-this value,
 * it cannot be chained.
 *
 * @return {Object} describing method, url, and data of this request
 * @api public
 */

RequestBase.prototype.toJSON = function() {
  return {
    method: this.method,
    url: this.url,
    data: this._data,
    headers: this._header,
  };
};

/**
 * Send `data` as the request body, defaulting the `.type()` to "json" when
 * an object is given.
 *
 * Examples:
 *
 *       // manual json
 *       request.post('/user')
 *         .type('json')
 *         .send('{"name":"tj"}')
 *         .end(callback)
 *
 *       // auto json
 *       request.post('/user')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // manual x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send('name=tj')
 *         .end(callback)
 *
 *       // auto x-www-form-urlencoded
 *       request.post('/user')
 *         .type('form')
 *         .send({ name: 'tj' })
 *         .end(callback)
 *
 *       // defaults to x-www-form-urlencoded
 *      request.post('/user')
 *        .send('name=tobi')
 *        .send('species=ferret')
 *        .end(callback)
 *
 * @param {String|Object} data
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.send = function(data){
  const isObj = isObject(data);
  let type = this._header['content-type'];

  if (this._formData) {
    throw new Error(".send() can't be used if .attach() or .field() is used. Please use only .send() or only .field() & .attach()");
  }

  if (isObj && !this._data) {
    if (Array.isArray(data)) {
      this._data = [];
    } else if (!this._isHost(data)) {
      this._data = {};
    }
  } else if (data && this._data && this._isHost(this._data)) {
    throw Error("Can't merge these send calls");
  }

  // merge
  if (isObj && isObject(this._data)) {
    for (const key in data) {
      this._data[key] = data[key];
    }
  } else if ('string' == typeof data) {
    // default to x-www-form-urlencoded
    if (!type) this.type('form');
    type = this._header['content-type'];
    if ('application/x-www-form-urlencoded' == type) {
      this._data = this._data
        ? `${this._data}&${data}`
        : data;
    } else {
      this._data = (this._data || '') + data;
    }
  } else {
    this._data = data;
  }

  if (!isObj || this._isHost(data)) {
    return this;
  }

  // default to json
  if (!type) this.type('json');
  return this;
};

/**
 * Sort `querystring` by the sort function
 *
 *
 * Examples:
 *
 *       // default order
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery()
 *         .end(callback)
 *
 *       // customized sort function
 *       request.get('/user')
 *         .query('name=Nick')
 *         .query('search=Manny')
 *         .sortQuery(function(a, b){
 *           return a.length - b.length;
 *         })
 *         .end(callback)
 *
 *
 * @param {Function} sort
 * @return {Request} for chaining
 * @api public
 */

RequestBase.prototype.sortQuery = function(sort) {
  // _sort default to true but otherwise can be a function or boolean
  this._sort = typeof sort === 'undefined' ? true : sort;
  return this;
};

/**
 * Compose querystring to append to req.url
 *
 * @api private
 */
RequestBase.prototype._finalizeQueryString = function(){
  const query = this._query.join('&');
  if (query) {
    this.url += (this.url.indexOf('?') >= 0 ? '&' : '?') + query;
  }
  this._query.length = 0; // Makes the call idempotent

  if (this._sort) {
    const index = this.url.indexOf('?');
    if (index >= 0) {
      const queryArr = this.url.substring(index + 1).split('&');
      if ('function' === typeof this._sort) {
        queryArr.sort(this._sort);
      } else {
        queryArr.sort();
      }
      this.url = this.url.substring(0, index) + '?' + queryArr.join('&');
    }
  }
};

// For backwards compat only
RequestBase.prototype._appendQueryString = () => {console.trace("Unsupported");}

/**
 * Invoke callback with timeout error.
 *
 * @api private
 */

RequestBase.prototype._timeoutError = function(reason, timeout, errno){
  if (this._aborted) {
    return;
  }
  const err = new Error(`${reason + timeout}ms exceeded`);
  err.timeout = timeout;
  err.code = 'ECONNABORTED';
  err.errno = errno;
  this.timedout = true;
  this.abort();
  this.callback(err);
};

RequestBase.prototype._setTimeouts = function() {
  const self = this;

  // deadline
  if (this._timeout && !this._timer) {
    this._timer = setTimeout(() => {
      self._timeoutError('Timeout of ', self._timeout, 'ETIME');
    }, this._timeout);
  }
  // response timeout
  if (this._responseTimeout && !this._responseTimeoutTimer) {
    this._responseTimeoutTimer = setTimeout(() => {
      self._timeoutError('Response timeout of ', self._responseTimeout, 'ETIMEDOUT');
    }, this._responseTimeout);
  }
};


/***/ }),

/***/ "./node_modules/superagent/lib/response-base.js":
/*!******************************************************!*\
  !*** ./node_modules/superagent/lib/response-base.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Module dependencies.
 */

const utils = __webpack_require__(/*! ./utils */ "./node_modules/superagent/lib/utils.js");

/**
 * Expose `ResponseBase`.
 */

module.exports = ResponseBase;

/**
 * Initialize a new `ResponseBase`.
 *
 * @api public
 */

function ResponseBase(obj) {
  if (obj) return mixin(obj);
}

/**
 * Mixin the prototype properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (const key in ResponseBase.prototype) {
    obj[key] = ResponseBase.prototype[key];
  }
  return obj;
}

/**
 * Get case-insensitive `field` value.
 *
 * @param {String} field
 * @return {String}
 * @api public
 */

ResponseBase.prototype.get = function(field) {
  return this.header[field.toLowerCase()];
};

/**
 * Set header related properties:
 *
 *   - `.type` the content type without params
 *
 * A response of "Content-Type: text/plain; charset=utf-8"
 * will provide you with a `.type` of "text/plain".
 *
 * @param {Object} header
 * @api private
 */

ResponseBase.prototype._setHeaderProperties = function(header){
    // TODO: moar!
    // TODO: make this a util

    // content-type
    const ct = header['content-type'] || '';
    this.type = utils.type(ct);

    // params
    const params = utils.params(ct);
    for (const key in params) this[key] = params[key];

    this.links = {};

    // links
    try {
        if (header.link) {
            this.links = utils.parseLinks(header.link);
        }
    } catch (err) {
        // ignore
    }
};

/**
 * Set flags such as `.ok` based on `status`.
 *
 * For example a 2xx response will give you a `.ok` of __true__
 * whereas 5xx will be __false__ and `.error` will be __true__. The
 * `.clientError` and `.serverError` are also available to be more
 * specific, and `.statusType` is the class of error ranging from 1..5
 * sometimes useful for mapping respond colors etc.
 *
 * "sugar" properties are also defined for common cases. Currently providing:
 *
 *   - .noContent
 *   - .badRequest
 *   - .unauthorized
 *   - .notAcceptable
 *   - .notFound
 *
 * @param {Number} status
 * @api private
 */

ResponseBase.prototype._setStatusProperties = function(status){
    const type = status / 100 | 0;

    // status / class
    this.status = this.statusCode = status;
    this.statusType = type;

    // basics
    this.info = 1 == type;
    this.ok = 2 == type;
    this.redirect = 3 == type;
    this.clientError = 4 == type;
    this.serverError = 5 == type;
    this.error = (4 == type || 5 == type)
        ? this.toError()
        : false;

    // sugar
    this.created = 201 == status;
    this.accepted = 202 == status;
    this.noContent = 204 == status;
    this.badRequest = 400 == status;
    this.unauthorized = 401 == status;
    this.notAcceptable = 406 == status;
    this.forbidden = 403 == status;
    this.notFound = 404 == status;
    this.unprocessableEntity = 422 == status;
};


/***/ }),

/***/ "./node_modules/superagent/lib/utils.js":
/*!**********************************************!*\
  !*** ./node_modules/superagent/lib/utils.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Return the mime type for the given `str`.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

exports.type = str => str.split(/ *; */).shift();

/**
 * Return header field parameters.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.params = str => str.split(/ *; */).reduce((obj, str) => {
  const parts = str.split(/ *= */);
  const key = parts.shift();
  const val = parts.shift();

  if (key && val) obj[key] = val;
  return obj;
}, {});

/**
 * Parse Link header fields.
 *
 * @param {String} str
 * @return {Object}
 * @api private
 */

exports.parseLinks = str => str.split(/ *, */).reduce((obj, str) => {
  const parts = str.split(/ *; */);
  const url = parts[0].slice(1, -1);
  const rel = parts[1].split(/ *= */)[1].slice(1, -1);
  obj[rel] = url;
  return obj;
}, {});

/**
 * Strip content related fields from `header`.
 *
 * @param {Object} header
 * @return {Object} header
 * @api private
 */

exports.cleanHeader = (header, changesOrigin) => {
  delete header['content-type'];
  delete header['content-length'];
  delete header['transfer-encoding'];
  delete header['host'];
  // secuirty
  if (changesOrigin) {
    delete header['authorization'];
    delete header['cookie'];
  }
  return header;
};


/***/ }),

/***/ "./node_modules/wpapi/lib/autodiscovery.js":
/*!*************************************************!*\
  !*** ./node_modules/wpapi/lib/autodiscovery.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Utility methods used when querying a site in order to discover its available
 * API endpoints
 *
 * @module autodiscovery
 */


const parseLinkHeader = __webpack_require__( /*! li */ "./node_modules/li/lib/index.js" ).parse;

/**
 * Attempt to locate a `rel="https://api.w.org"` link relation header
 *
 * @method locateAPIRootHeader
 * @param {Object} response A response object with a link or headers property
 * @returns {String} The URL of the located API root
 */
function locateAPIRootHeader( response ) {
	// See https://developer.wordpress.org/rest-api/using-the-rest-api/discovery/
	const rel = 'https://api.w.org/';

	// Extract & parse the response link headers
	const link = response.link || ( response.headers && response.headers.link );
	const headers = parseLinkHeader( link );

	const apiHeader = headers && headers[ rel ];

	if ( apiHeader ) {
		return apiHeader;
	}

	throw new Error( `No header link found with rel="${ rel }"` );
}

module.exports = {
	locateAPIRootHeader: locateAPIRootHeader,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/constructors/wp-request.js":
/*!***********************************************************!*\
  !*** ./node_modules/wpapi/lib/constructors/wp-request.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const qs = __webpack_require__( /*! qs */ "./node_modules/qs/lib/index.js" );

const alphaNumericSort = __webpack_require__( /*! ../util/alphanumeric-sort */ "./node_modules/wpapi/lib/util/alphanumeric-sort.js" );
const keyValToObj = __webpack_require__( /*! ../util/key-val-to-obj */ "./node_modules/wpapi/lib/util/key-val-to-obj.js" );
const paramSetter = __webpack_require__( /*! ../util/parameter-setter */ "./node_modules/wpapi/lib/util/parameter-setter.js" );
const objectReduce = __webpack_require__( /*! ../util/object-reduce */ "./node_modules/wpapi/lib/util/object-reduce.js" );
const unique = __webpack_require__( /*! ../util/unique */ "./node_modules/wpapi/lib/util/unique.js" );

/**
 * WPRequest is the base API request object constructor
 *
 * @constructor WPRequest
 * @param {Object} options A hash of options for the WPRequest instance
 * @param {String} options.endpoint The endpoint URI for the invoking WPAPI instance
 * @param {Object} options.transport An object of http transport methods (get, post, etc)
 * @param {String} [options.username] A username for authenticating API requests
 * @param {String} [options.password] A password for authenticating API requests
 * @param {String} [options.nonce] A WP nonce for use with cookie authentication
 */
function WPRequest( options ) {
	/**
	 * Configuration options for the request
	 *
	 * @property _options
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._options = [
		// Whitelisted options keys
		'auth',
		'endpoint',
		'headers',
		'username',
		'password',
		'nonce',
	].reduce( ( localOptions, key ) => {
		if ( options && options[ key ] ) {
			localOptions[ key ] = options[ key ];
		}
		return localOptions;
	}, {} );

	/**
	 * The HTTP transport methods (.get, .post, .put, .delete, .head) to use for this request
	 *
	 * @property transport
	 * @type {Object}
	 * @private
	 */
	this.transport = options && options.transport;

	/**
	 * A hash of query parameters
	 * This is used to store the values for supported query parameters like ?_embed
	 *
	 * @property _params
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._params = {};

	/**
	 * Methods supported by this API request instance:
	 * Individual endpoint handlers specify their own subset of supported methods
	 *
	 * @property _supportedMethods
	 * @type Array
	 * @private
	 * @default [ 'head', 'get', 'put', 'post', 'delete' ]
	 */
	this._supportedMethods = [ 'head', 'get', 'put', 'post', 'delete' ];

	/**
	 * A hash of values to assemble into the API request path
	 * (This will be overwritten by each specific endpoint handler constructor)
	 *
	 * @property _path
	 * @type Object
	 * @private
	 * @default {}
	 */
	this._path = {};
}

// Private helper methods
// ======================

/**
 * Identity function for use within invokeAndPromisify()
 * @private
 */
const identity = value => value;

/**
 * Process arrays of taxonomy terms into query parameters.
 * All terms listed in the arrays will be required (AND behavior).
 *
 * This method will not be called with any values unless we are handling
 * an endpoint with the filter mixin; however, since parameter handling
 * (and therefore `_renderQuery()`) are part of WPRequest itself, this
 * helper method lives here alongside the code where it is used.
 *
 * @example
 *     prepareTaxonomies({
 *         tag: [ 'tag1 ', 'tag2' ], // by term slug
 *         cat: [ 7 ] // by term ID
 *     }) === {
 *         tag: 'tag1+tag2',
 *         cat: '7'
 *     }
 *
 * @private
 * @param {Object} taxonomyFilters An object of taxonomy term arrays, keyed by taxonomy name
 * @returns {Object} An object of prepareFilters-ready query arg and query param value pairs
 */
function prepareTaxonomies( taxonomyFilters ) {
	if ( ! taxonomyFilters ) {
		return {};
	}

	return objectReduce(
		taxonomyFilters,
		( result, terms, key ) => {
			// Trim whitespace and concatenate multiple terms with +
			result[ key ] = terms
				// Coerce term into a string so that trim() won't fail
				.map( term => ( term + '' ).trim().toLowerCase() )
				.join( '+' );

			return result;
		},
		{}
	);
}

/**
 * Return an object with any properties with undefined, null or empty string
 * values removed.
 *
 * @example
 *
 *     populated({
 *       a: 'a',
 *       b: '',
 *       c: null
 *     }); // { a: 'a' }
 *
 * @private
 * @param {Object} obj An object of key/value pairs
 * @returns {Object} That object with all empty values removed
 */
const populated = ( obj ) => {
	if ( ! obj ) {
		return obj;
	}
	return objectReduce(
		obj,
		( values, val, key ) => {
			if ( val !== undefined && val !== null && val !== '' ) {
				values[ key ] = val;
			}
			return values;
		},
		{}
	);
};

/**
 * Assert whether a provided URL component is "valid" by checking it against
 * an array of registered path component validator methods for that level of
 * the URL path.
 *
 * @private
 * @param {object[]} levelDefinitions An array of Level Definition objects
 * @param {string}   levelContents    The URL path string that has been specified
 *                                    for use on the provided level
 * @returns {boolean} Whether the provided input matches any of the provided
 * level validation functions
 */
const validatePathLevel = ( levelDefinitions, levelContents ) => {
	// One "level" may have multiple options, as a route tree is a branching
	// structure. We consider a level "valid" if the provided levelContents
	// match any of the available validators.
	const valid = levelDefinitions.reduce( ( anyOptionValid, levelOption ) => {
		if ( ! levelOption.validate ) {
			// If there is no validator function, the level is implicitly valid
			return true;
		}
		return anyOptionValid || levelOption.validate( levelContents );
	}, false );

	if ( ! valid ) {
		throw new Error( [
			'Invalid path component:',
			levelContents,
			// awkward pluralization support:
			'does not match' + ( levelDefinitions.length > 1 ? ' any of' : '' ),
			levelDefinitions.reduce(
				( components, levelOption ) => components.concat( levelOption.component ),
				[]
			).join( ', ' ),
		].join( ' ' ) );
	}
};

// (Semi-)Private Prototype Methods
// ================================

/**
 * Process the endpoint query's filter objects into a valid query string.
 * Nested objects and Array properties are rendered with indexed array syntax.
 *
 * @example
 *     _renderQuery({ p1: 'val1', p2: 'val2' });  // ?p1=val1&p2=val2
 *     _renderQuery({ obj: { prop: 'val' } });    // ?obj[prop]=val
 *     _renderQuery({ arr: [ 'val1', 'val2' ] }); // ?arr[0]=val1&arr[1]=val2
 *
 * @private
 *
 * @method _renderQuery
 * @returns {String} A query string representing the specified filter parameters
 */
WPRequest.prototype._renderQuery = function() {
	// Build the full query parameters object
	const queryParams = {
		...populated( this._params ),
	};

	// Prepare any taxonomies and merge with other filter values
	const taxonomies = prepareTaxonomies( this._taxonomyFilters );
	queryParams.filter = {
		...populated( this._filters ),
		...taxonomies,
	};

	// Parse query parameters object into a query string, sorting the object
	// properties by alphabetical order (consistent property ordering can make
	// for easier caching of request URIs)
	const queryString = qs.stringify( queryParams, { arrayFormat: 'brackets' } )
		.split( '&' )
		.sort()
		.join( '&' );

	// Check if the endpoint contains a previous query and set the query character accordingly.
	const queryCharacter = /\?/.test( this._options.endpoint ) ? '&' : '?';

	// Prepend a "?" (or a "&") if a query is present, and return.
	return ( queryString === '' ) ? '' : queryCharacter + queryString;
};

/**
 * Validate & assemble a path string from the request object's _path
 *
 * @private
 * @returns {String} The rendered path
 */
WPRequest.prototype._renderPath = function() {
	// Call validatePath: if the provided path components are not well-formed,
	// an error will be thrown
	this.validatePath();

	const pathParts = this._path;
	const orderedPathParts = Object.keys( pathParts )
		.sort( ( a, b ) => {
			const intA = parseInt( a, 10 );
			const intB = parseInt( b, 10 );
			return intA - intB;
		} )
		.map( pathPartKey => pathParts[ pathPartKey ] );

	// Combine all parts of the path together, filtered to omit any components
	// that are unspecified or empty strings, to create the full path template
	const path = [
		this._namespace,
	].concat( orderedPathParts ).filter( identity ).join( '/' );

	return path;
};

// Public Prototype Methods
// ========================

/**
 * Parse the request into a WordPress API request URI string
 *
 * @method
 * @returns {String} The URI for the HTTP request to be sent
 */
WPRequest.prototype.toString = function() {
	// Render the path to a string
	const path = this._renderPath();

	// Render the query string
	const queryStr = this._renderQuery();

	return this._options.endpoint + path + queryStr;
};

/**
 * Set a component of the resource URL itself (as opposed to a query parameter)
 *
 * If a path component has already been set at this level, throw an error:
 * requests are meant to be transient, so any re-writing of a previously-set
 * path part value is likely to be a mistake.
 *
 * @method
 * @chainable
 * @param {Number|String} level A "level" of the path to set, e.g. "1" or "2"
 * @param {Number|String} val   The value to set at that path part level
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.setPathPart = function( level, val ) {
	if ( this._path[ level ] ) {
		throw new Error( 'Cannot overwrite value ' + this._path[ level ] );
	}
	this._path[ level ] = val;

	return this;
};

/**
 * Validate whether the specified path parts are valid for this endpoint
 *
 * "Path parts" are non-query-string URL segments, like "some" "path" in the URL
 * `mydomain.com/some/path?and=a&query=string&too`. Because a well-formed path
 * is necessary to execute a successful API request, we throw an error if the
 * user has omitted a value (such as `/some/[missing component]/url`) or has
 * provided a path part value that does not match the regular expression the
 * API uses to goven that segment.
 *
 * @method
 * @chainable
 * @returns {WPRequest} The WPRequest instance (for chaining), if no errors were found
 */
WPRequest.prototype.validatePath = function() {
	// Iterate through all _specified_ levels of this endpoint
	const specifiedLevels = Object.keys( this._path )
		.map( level => parseInt( level, 10 ) )
		.filter( pathPartKey => ! isNaN( pathPartKey ) );

	const maxLevel = Math.max.apply( null, specifiedLevels );

	// Ensure that all necessary levels are specified
	const path = [];
	let valid = true;

	for ( let level = 0; level <= maxLevel; level++ ) {

		if ( ! this._levels || ! this._levels[ level ] ) {
			continue;
		}

		if ( this._path[ level ] ) {
			// Validate the provided path level against all available path validators
			validatePathLevel( this._levels[ level ], this._path[ level ] );

			// Add the path value to the array
			path.push( this._path[ level ] );
		} else {
			path.push( ' ??? ' );
			valid = false;
		}
	}

	if ( ! valid ) {
		throw new Error( 'Incomplete URL! Missing component: /' + path.join( '/' ) );
	}

	return this;
};

/**
 * Set a parameter to render into the final query URI.
 *
 * @method
 * @chainable
 * @param {String|Object} props The name of the parameter to set, or an object containing
 *                              parameter keys and their corresponding values
 * @param {String|Number|Array} [value] The value of the parameter being set
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.param = function( props, value ) {
	if ( ! props || typeof props === 'string' && value === undefined ) {
		// We have no property to set, or no value to set for that property
		return this;
	}

	// We can use the same iterator function below to handle explicit key-value
	// pairs if we convert them into to an object we can iterate over:
	if ( typeof props === 'string' ) {
		props = keyValToObj( props, value );
	}

	// Iterate through the properties
	Object.keys( props ).forEach( ( key ) => {
		let value = props[ key ];

		// Arrays should be de-duped and sorted
		if ( Array.isArray( value ) ) {
			value = unique( value ).sort( alphaNumericSort );
		}

		// Set the value
		this._params[ key ] = value;
	} );

	return this;
};

// Globally-applicable parameters that impact the shape of the request or response
// ===============================================================================

/**
 * Set the context of the request. Used primarily to expose private values on a
 * request object by setting the context to "edit".
 *
 * @method
 * @chainable
 * @param {String} context The context to set on the request
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.context = paramSetter( 'context' );

/**
 * Convenience wrapper for `.context( 'edit' )`
 *
 * @method
 * @chainable
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.edit = function() {
	return this.context( 'edit' );
};

/**
 * Return embedded resources as part of the response payload.
 *
 * @method
 * @chainable
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.embed = function() {
	return this.param( '_embed', true );
};

// Parameters supported by all/nearly all default collections
// ==========================================================

/**
 * Set the pagination of a request. Use in conjunction with `.perPage()` for explicit
 * pagination handling. (The number of pages in a response can be retrieved from the
 * response's `_paging.totalPages` property.)
 *
 * @method
 * @chainable
 * @param {Number} pageNumber The page number of results to retrieve
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.page = paramSetter( 'page' );

/**
 * Set the number of items to be returned in a page of responses.
 *
 * @method
 * @chainable
 * @param {Number} itemsPerPage The number of items to return in one page of results
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.perPage = paramSetter( 'per_page' );

/**
 * Set an arbitrary offset to retrieve items from a specific point in a collection.
 *
 * @method
 * @chainable
 * @param {Number} offsetNumber The number of items by which to offset the response
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.offset = paramSetter( 'offset' );

/**
 * Change the sort direction of a returned collection
 *
 * @example <caption>order comments chronologically (oldest first)</caption>
 *
 *     site.comments().order( 'asc' )...
 *
 * @method
 * @chainable
 * @param {String} direction The order to use when sorting the response
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.order = paramSetter( 'order' );

/**
 * Order a collection by a specific field
 *
 * @method
 * @chainable
 * @param {String} field The field by which to order the response
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.orderby = paramSetter( 'orderby' );

/**
 * Filter results to those matching the specified search terms.
 *
 * @method
 * @chainable
 * @param {String} searchString A string to search for within post content
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.search = paramSetter( 'search' );

/**
 * Include specific resource IDs in the response collection.
 *
 * @method
 * @chainable
 * @param {Number|Number[]} ids An ID or array of IDs to include
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.include = paramSetter( 'include' );

/**
 * Exclude specific resource IDs in the response collection.
 *
 * @method
 * @chainable
 * @param {Number|Number[]} ids An ID or array of IDs to exclude
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.exclude = paramSetter( 'exclude' );

/**
 * Query a collection for members with a specific slug.
 *
 * @method
 * @chainable
 * @param {String} slug A post slug (slug), e.g. "hello-world"
 * @returns The request instance (for chaining)
 */
WPRequest.prototype.slug = paramSetter( 'slug' );

// HTTP Transport Prototype Methods
// ================================

// Chaining methods
// ================

/**
 * Set the namespace of the request, e.g. to specify the API root for routes
 * registered by wp core v2 ("wp/v2") or by any given plugin. Any previously-
 * set namespace will be overwritten by subsequent calls to the method.
 *
 * @method
 * @chainable
 * @param {String} namespace A namespace string, e.g. "wp/v2"
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.namespace = function( namespace ) {
	this._namespace = namespace;
	return this;
};

/**
 * Set a request to use authentication, and optionally provide auth credentials
 *
 * If auth credentials were already specified when the WPAPI instance was created, calling
 * `.auth` on the request chain will set that request to use the existing credentials:
 *
 * @example <caption>use existing credentials</caption>
 *
 *     request.auth().get...
 *
 * Alternatively, a username & password (or nonce) can be explicitly passed into `.auth`:
 *
 * @example <caption>use explicit basic authentication credentials</caption>
 *
 *     request.auth({
 *       username: 'admin',
 *       password: 'super secure'
 *     }).get...
 *
 * @example <caption>use a nonce for cookie authentication</caption>
 *
 *     request.auth({
 *       nonce: 'somenonce'
 *     })...
 *
 * @method
 * @chainable
 * @param {Object} credentials            An object with 'username' and 'password' string
 *                                        properties, or else a 'nonce' property
 * @param {String} [credentials.username] A WP-API Basic HTTP Authentication username
 * @param {String} [credentials.password] A WP-API Basic HTTP Authentication password
 * @param {String} [credentials.nonce]    A WP nonce for use with cookie authentication
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.auth = function( credentials ) {
	if ( typeof credentials === 'object' ) {
		if ( typeof credentials.username === 'string' ) {
			this._options.username = credentials.username;
		}

		if ( typeof credentials.password === 'string' ) {
			this._options.password = credentials.password;
		}

		if ( credentials.nonce ) {
			this._options.nonce = credentials.nonce;
		}
	}

	// Set the "auth" options flag that will force authentication on this request
	this._options.auth = true;

	return this;
};

/**
 * Specify a file or a file buffer to attach to the request, for use when
 * creating a new Media item
 *
 * @example <caption>within a server context</caption>
 *
 *     wp.media()
 *       // Pass .file() the file system path to a file to upload
 *       .file( '/path/to/file.jpg' )
 *       .create({})...
 *
 * @example <caption>within a browser context</caption>
 *
 *     wp.media()
 *       // Pass .file() the file reference from an HTML file input
 *       .file( document.querySelector( 'input[type="file"]' ).files[0] )
 *       .create({})...
 *
 * @method
 * @chainable
 * @param {string|object} file   A path to a file (in Node) or an file object
 *                               (Node or Browser) to attach to the request
 * @param {string}        [name] An (optional) filename to use for the file
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.file = function( file, name ) {
	this._attachment = file;
	// Explicitly set to undefined if not provided, to override any previously-
	// set attachment name property that might exist from a prior `.file()` call
	this._attachmentName = name ? name : undefined;
	return this;
};

// HTTP Methods: Public Interface
// ==============================

/**
 * Specify one or more headers to send with the dispatched HTTP request.
 *
 * @example <caption>Set a single header to be used on this request</caption>
 *
 *     request.setHeaders( 'Authorization', 'Bearer trustme' )...
 *
 * @example <caption>Set multiple headers to be used by this request</caption>
 *
 *     request.setHeaders({
 *       Authorization: 'Bearer comeonwereoldfriendsright',
 *       'Accept-Language': 'en-CA'
 *     })...
 *
 * @since 1.1.0
 * @method
 * @chainable
 * @param {String|Object} headers The name of the header to set, or an object of
 *                                header names and their associated string values
 * @param {String}        [value] The value of the header being set
 * @returns {WPRequest} The WPRequest instance (for chaining)
 */
WPRequest.prototype.setHeaders = function( headers, value ) {
	// We can use the same iterator function below to handle explicit key-value
	// pairs if we convert them into to an object we can iterate over:
	if ( typeof headers === 'string' ) {
		headers = keyValToObj( headers, value );
	}

	this._options.headers = {
		...( this._options.headers || {} ),
		...headers,
	};

	return this;
};

/**
 * Get (download the data for) the specified resource
 *
 * @method
 * @async
 * @param {Function} [callback] A callback to invoke with the results of the GET request
 * @returns {Promise} A promise to the results of the HTTP request
 */
WPRequest.prototype.get = function( callback ) {
	return this.transport.get( this, callback );
};

/**
 * Get the headers for the specified resource
 *
 * @method
 * @async
 * @param {Function} [callback] A callback to invoke with the results of the HEAD request
 * @returns {Promise} A promise to the header results of the HTTP request
 */
WPRequest.prototype.headers = function( callback ) {
	return this.transport.head( this, callback );
};

/**
 * Create the specified resource with the provided data
 *
 * This is the public interface for creating POST requests
 *
 * @method
 * @async
 * @param {Object} data The data for the POST request
 * @param {Function} [callback] A callback to invoke with the results of the POST request
 * @returns {Promise} A promise to the results of the HTTP request
 */
WPRequest.prototype.create = function( data, callback ) {
	return this.transport.post( this, data, callback );
};

/**
 * Update the specified resource with the provided data
 *
 * This is the public interface for creating PUT requests
 *
 * @method
 * @async
 * @private
 * @param {Object} data The data for the PUT request
 * @param {Function} [callback] A callback to invoke with the results of the PUT request
 * @returns {Promise} A promise to the results of the HTTP request
 */
WPRequest.prototype.update = function( data, callback ) {
	return this.transport.put( this, data, callback );
};

/**
 * Delete the specified resource
 *
 * @method
 * @async
 * @param {Object} [data] Data to send along with the DELETE request
 * @param {Function} [callback] A callback to invoke with the results of the DELETE request
 * @returns {Promise} A promise to the results of the HTTP request
 */
WPRequest.prototype.delete = function( data, callback ) {
	return this.transport.delete( this, data, callback );
};

/**
 * Calling .then on a query chain will invoke the query as a GET and return a promise
 *
 * @method
 * @async
 * @param {Function} [successCallback] A callback to handle the data returned from the GET request
 * @param {Function} [failureCallback] A callback to handle any errors encountered by the request
 * @returns {Promise} A promise to the results of the HTTP request
 */
WPRequest.prototype.then = function( successCallback, failureCallback ) {
	return this.transport.get( this ).then( successCallback, failureCallback );
};

module.exports = WPRequest;


/***/ }),

/***/ "./node_modules/wpapi/lib/data/default-routes.json":
/*!*********************************************************!*\
  !*** ./node_modules/wpapi/lib/data/default-routes.json ***!
  \*********************************************************/
/*! exports provided: /, /oembed/1.0, /oembed/1.0/embed, /oembed/1.0/proxy, /wp/v2, /wp/v2/posts, /wp/v2/posts/(?P<id>[\d]+), /wp/v2/posts/(?P<parent>[\d]+)/revisions, /wp/v2/posts/(?P<parent>[\d]+)/revisions/(?P<id>[\d]+), /wp/v2/posts/(?P<id>[\d]+)/autosaves, /wp/v2/posts/(?P<parent>[\d]+)/autosaves/(?P<id>[\d]+), /wp/v2/pages, /wp/v2/pages/(?P<id>[\d]+), /wp/v2/pages/(?P<parent>[\d]+)/revisions, /wp/v2/pages/(?P<parent>[\d]+)/revisions/(?P<id>[\d]+), /wp/v2/pages/(?P<id>[\d]+)/autosaves, /wp/v2/pages/(?P<parent>[\d]+)/autosaves/(?P<id>[\d]+), /wp/v2/media, /wp/v2/media/(?P<id>[\d]+), /wp/v2/blocks, /wp/v2/blocks/(?P<id>[\d]+), /wp/v2/blocks/(?P<id>[\d]+)/autosaves, /wp/v2/blocks/(?P<parent>[\d]+)/autosaves/(?P<id>[\d]+), /wp/v2/types, /wp/v2/types/(?P<type>[\w-]+), /wp/v2/statuses, /wp/v2/statuses/(?P<status>[\w-]+), /wp/v2/taxonomies, /wp/v2/taxonomies/(?P<taxonomy>[\w-]+), /wp/v2/categories, /wp/v2/categories/(?P<id>[\d]+), /wp/v2/tags, /wp/v2/tags/(?P<id>[\d]+), /wp/v2/users, /wp/v2/users/(?P<id>[\d]+), /wp/v2/users/me, /wp/v2/comments, /wp/v2/comments/(?P<id>[\d]+), /wp/v2/search, /wp/v2/block-renderer/(?P<name>core/block), /wp/v2/block-renderer/(?P<name>core/latest-comments), /wp/v2/block-renderer/(?P<name>core/archives), /wp/v2/block-renderer/(?P<name>core/categories), /wp/v2/block-renderer/(?P<name>core/latest-posts), /wp/v2/block-renderer/(?P<name>core/shortcode), /wp/v2/settings, /wp/v2/themes, default */
/***/ (function(module) {

module.exports = {"/":{"namespace":"","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{}}}]},"/oembed/1.0":{"namespace":"oembed/1.0","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"namespace":{},"context":{}}}]},"/oembed/1.0/embed":{"namespace":"oembed/1.0","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"url":{},"format":{},"maxwidth":{}}}]},"/oembed/1.0/proxy":{"namespace":"oembed/1.0","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"url":{},"format":{},"maxwidth":{},"maxheight":{},"discover":{}}}]},"/wp/v2":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"namespace":{},"context":{}}}]},"/wp/v2/posts":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"after":{},"author":{},"author_exclude":{},"before":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"slug":{},"status":{},"categories":{},"categories_exclude":{},"tags":{},"tags_exclude":{},"sticky":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/posts/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{},"password":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/posts/(?P<parent>[\\d]+)/revisions":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"context":{},"page":{},"per_page":{},"search":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{}}}]},"/wp/v2/posts/(?P<parent>[\\d]+)/revisions/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","DELETE"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"id":{},"context":{}}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/posts/(?P<id>[\\d]+)/autosaves":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"context":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/posts/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"id":{},"context":{}}}]},"/wp/v2/pages":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"after":{},"author":{},"author_exclude":{},"before":{},"exclude":{},"include":{},"menu_order":{},"offset":{},"order":{},"orderby":{},"parent":{},"parent_exclude":{},"slug":{},"status":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/pages/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{},"password":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/pages/(?P<parent>[\\d]+)/revisions":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"context":{},"page":{},"per_page":{},"search":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{}}}]},"/wp/v2/pages/(?P<parent>[\\d]+)/revisions/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","DELETE"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"id":{},"context":{}}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/pages/(?P<id>[\\d]+)/autosaves":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"context":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/pages/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"id":{},"context":{}}}]},"/wp/v2/media":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"after":{},"author":{},"author_exclude":{},"before":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"parent":{},"parent_exclude":{},"slug":{},"status":{},"media_type":{},"mime_type":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/media/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/blocks":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"after":{},"before":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"slug":{},"status":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/blocks/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{},"password":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/blocks/(?P<id>[\\d]+)/autosaves":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"context":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/blocks/(?P<parent>[\\d]+)/autosaves/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"parent":{},"id":{},"context":{}}}]},"/wp/v2/types":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{}}}]},"/wp/v2/types/(?P<type>[\\w-]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"type":{},"context":{}}}]},"/wp/v2/statuses":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{}}}]},"/wp/v2/statuses/(?P<status>[\\w-]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"status":{},"context":{}}}]},"/wp/v2/taxonomies":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{},"type":{}}}]},"/wp/v2/taxonomies/(?P<taxonomy>[\\w-]+)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"taxonomy":{},"context":{}}}]},"/wp/v2/categories":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"exclude":{},"include":{},"order":{},"orderby":{},"hide_empty":{},"parent":{},"post":{},"slug":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/categories/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/tags":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"hide_empty":{},"post":{},"slug":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/tags/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/users":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"slug":{},"roles":{},"who":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/users/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/users/me":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"context":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/comments":{"namespace":"wp/v2","methods":["GET","POST"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"after":{},"author":{},"author_exclude":{},"author_email":{},"before":{},"exclude":{},"include":{},"offset":{},"order":{},"orderby":{},"parent":{},"parent_exclude":{},"post":{},"status":{},"type":{},"password":{}}},{"methods":["POST"],"args":{}}]},"/wp/v2/comments/(?P<id>[\\d]+)":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH","DELETE"],"endpoints":[{"methods":["GET"],"args":{"id":{},"context":{},"password":{}}},{"methods":["POST","PUT","PATCH"],"args":{}},{"methods":["DELETE"],"args":{}}]},"/wp/v2/search":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"type":{},"subtype":{}}}]},"/wp/v2/block-renderer/(?P<name>core/block)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/block-renderer/(?P<name>core/latest-comments)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/block-renderer/(?P<name>core/archives)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/block-renderer/(?P<name>core/categories)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/block-renderer/(?P<name>core/latest-posts)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/block-renderer/(?P<name>core/shortcode)":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"name":{},"context":{},"attributes":{},"post_id":{}}}]},"/wp/v2/settings":{"namespace":"wp/v2","methods":["GET","POST","PUT","PATCH"],"endpoints":[{"methods":["GET"],"args":{}},{"methods":["POST","PUT","PATCH"],"args":{}}]},"/wp/v2/themes":{"namespace":"wp/v2","methods":["GET"],"endpoints":[{"methods":["GET"],"args":{"context":{},"page":{},"per_page":{},"search":{},"status":{}}}]}};

/***/ }),

/***/ "./node_modules/wpapi/lib/endpoint-factories.js":
/*!******************************************************!*\
  !*** ./node_modules/wpapi/lib/endpoint-factories.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Take a WP route string (with PCRE named capture groups), `such as /author/(?P<id>\d+)`,
 * and generate request handler factory methods for each represented endpoint.
 *
 * @module endpoint-factories
 */


const createResourceHandlerSpec = __webpack_require__( /*! ./resource-handler-spec */ "./node_modules/wpapi/lib/resource-handler-spec.js" ).create;
const createEndpointRequest = __webpack_require__( /*! ./endpoint-request */ "./node_modules/wpapi/lib/endpoint-request.js" ).create;
const objectReduce = __webpack_require__( /*! ./util/object-reduce */ "./node_modules/wpapi/lib/util/object-reduce.js" );

/**
 * Given an array of route definitions and a specific namespace for those routes,
 * recurse through the node tree representing all possible routes within the
 * provided namespace to define path value setters (and corresponding property
 * validators) for all possible variants of each resource's API endpoints.
 *
 * @method generate
 * @param {string} namespace         The namespace string for these routes
 * @param {object} routesByNamespace A dictionary of namespace - route definition
 *                                   object pairs as generated from buildRouteTree,
 *                                   where each route definition object is a dictionary
 *                                   keyed by route definition strings
 * @returns {object} A dictionary of endpoint request handler factories
 */
function generateEndpointFactories( routesByNamespace ) {

	return objectReduce( routesByNamespace, ( namespaces, routeDefinitions, namespace ) => {

		// Create
		namespaces[ namespace ] = objectReduce( routeDefinitions, ( handlers, routeDef, resource ) => {

			const handlerSpec = createResourceHandlerSpec( routeDef, resource );

			const EndpointRequest = createEndpointRequest( handlerSpec, resource, namespace );

			// "handler" object is now fully prepared; create the factory method that
			// will instantiate and return a handler instance
			handlers[ resource ] = function( options ) {
				return new EndpointRequest( {
					...this._options,
					...options,
				} );
			};

			// Expose the constructor as a property on the factory function, so that
			// auto-generated endpoint request constructors may be further customized
			// when needed
			handlers[ resource ].Ctor = EndpointRequest;

			return handlers;
		}, {} );

		return namespaces;
	}, {} );
}

module.exports = {
	generate: generateEndpointFactories,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/endpoint-request.js":
/*!****************************************************!*\
  !*** ./node_modules/wpapi/lib/endpoint-request.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module endpoint-request
 */


const WPRequest = __webpack_require__( /*! ./constructors/wp-request */ "./node_modules/wpapi/lib/constructors/wp-request.js" );
const mixins = __webpack_require__( /*! ./mixins */ "./node_modules/wpapi/lib/mixins/index.js" );

const applyMixin = __webpack_require__( /*! ./util/apply-mixin */ "./node_modules/wpapi/lib/util/apply-mixin.js" );

/**
 * Create an endpoint request handler constructor for a specific resource tree
 *
 * @method create
 * @param {Object} handlerSpec A resource handler specification object
 * @param {String} resource    The root resource of requests created from the returned factory
 * @param {String} namespace   The namespace string for the returned factory's handlers
 * @returns {Function} A constructor inheriting from {@link WPRequest}
 */
function createEndpointRequest( handlerSpec, resource, namespace ) {

	// Create the constructor function for this endpoint
	class EndpointRequest extends WPRequest {
		constructor( options ) {
			super( options );

			/**
			 * Semi-private instance property specifying the available URL path options
			 * for this endpoint request handler, keyed by ascending whole numbers.
			 *
			 * @property _levels
			 * @type {object}
			 * @private
			 */
			this._levels = handlerSpec._levels;

			// Configure handler for this endpoint's root URL path & set namespace
			this
				.setPathPart( 0, resource )
				.namespace( namespace );
		}
	}

	// Mix in all available shortcut methods for GET request query parameters that
	// are valid within this endpoint tree
	if ( typeof handlerSpec._getArgs === 'object' ) {
		Object.keys( handlerSpec._getArgs ).forEach( ( supportedQueryParam ) => {
			const mixinsForParam = mixins[ supportedQueryParam ];

			// Only proceed if there is a mixin available AND the specified mixins will
			// not overwrite any previously-set prototype method
			if ( typeof mixinsForParam === 'object' ) {
				Object.keys( mixinsForParam ).forEach( ( methodName ) => {
					applyMixin( EndpointRequest.prototype, methodName, mixinsForParam[ methodName ] );
				} );
			}
		} );
	}

	Object.keys( handlerSpec._setters ).forEach( ( setterFnName ) => {
		// Only assign setter functions if they do not overwrite preexisting methods
		if ( ! EndpointRequest.prototype[ setterFnName ] ) {
			EndpointRequest.prototype[ setterFnName ] = handlerSpec._setters[ setterFnName ];
		}
	} );

	return EndpointRequest;
}

module.exports = {
	create: createEndpointRequest,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/http-transport.js":
/*!**************************************************!*\
  !*** ./node_modules/wpapi/lib/http-transport.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module http-transport
 */


const agent = __webpack_require__( /*! superagent */ "./node_modules/superagent/lib/client.js" );
const parseLinkHeader = __webpack_require__( /*! li */ "./node_modules/li/lib/index.js" ).parse;

const WPRequest = __webpack_require__( /*! ./constructors/wp-request */ "./node_modules/wpapi/lib/constructors/wp-request.js" );
const checkMethodSupport = __webpack_require__( /*! ./util/check-method-support */ "./node_modules/wpapi/lib/util/check-method-support.js" );
const objectReduce = __webpack_require__( /*! ./util/object-reduce */ "./node_modules/wpapi/lib/util/object-reduce.js" );
const isEmptyObject = __webpack_require__( /*! ./util/is-empty-object */ "./node_modules/wpapi/lib/util/is-empty-object.js" );

/**
 * Set any provided headers on the outgoing request object. Runs after _auth.
 *
 * @method _setHeaders
 * @private
 * @param {Object} request A superagent request object
 * @param {Object} options A WPRequest _options object
 * @param {Object} A superagent request object, with any available headers set
 */
function _setHeaders( request, options ) {
	// If there's no headers, do nothing
	if ( ! options.headers ) {
		return request;
	}

	return objectReduce(
		options.headers,
		( request, value, key ) => request.set( key, value ),
		request
	);
}

/**
 * Conditionally set basic authentication on a server request object.
 *
 * @method _auth
 * @private
 * @param {Object} request A superagent request object
 * @param {Object} options A WPRequest _options object
 * @param {Boolean} forceAuthentication whether to force authentication on the request
 * @param {Object} A superagent request object, conditionally configured to use basic auth
 */
function _auth( request, options, forceAuthentication ) {
	// If we're not supposed to authenticate, don't even start
	if ( ! forceAuthentication && ! options.auth && ! options.nonce ) {
		return request;
	}

	// Enable nonce in options for Cookie authentication http://wp-api.org/guides/authentication.html
	if ( options.nonce ) {
		request.set( 'X-WP-Nonce', options.nonce );
		return request;
	}

	// Retrieve the username & password from the request options if they weren't provided
	const username = options.username;
	const password = options.password;

	// If no username or no password, can't authenticate
	if ( ! username || ! password ) {
		return request;
	}

	// Can authenticate: set basic auth parameters on the request
	return request.auth( username, password );
}

// Pagination-Related Helpers
// ==========================

/**
 * Extract the body property from the superagent response, or else try to parse
 * the response text to get a JSON object.
 *
 * @private
 * @param {Object} response      The response object from the HTTP request
 * @param {String} response.text The response content as text
 * @param {Object} response.body The response content as a JS object
 * @returns {Object} The response content as a JS object
 */
function extractResponseBody( response ) {
	let responseBody = response.body;
	if ( isEmptyObject( responseBody ) && response.type === 'text/html' ) {
		// Response may have come back as HTML due to caching plugin; try to parse
		// the response text into JSON
		try {
			responseBody = JSON.parse( response.text );
		} catch ( e ) {
			// Swallow errors, it's OK to fall back to returning the body
		}
	}
	return responseBody;
}

/**
 * If the response is not paged, return the body as-is. If pagination
 * information is present in the response headers, parse those headers into
 * a custom `_paging` property on the response body. `_paging` contains links
 * to the previous and next pages in the collection, as well as metadata
 * about the size and number of pages in the collection.
 *
 * The structure of the `_paging` property is as follows:
 *
 * - `total` {Integer} The total number of records in the collection
 * - `totalPages` {Integer} The number of pages available
 * - `links` {Object} The parsed "links" headers, separated into individual URI strings
 * - `next` {WPRequest} A WPRequest object bound to the "next" page (if page exists)
 * - `prev` {WPRequest} A WPRequest object bound to the "previous" page (if page exists)
 *
 * @private
 * @param {Object} result           The response object from the HTTP request
 * @param {Object} options          The options hash from the original request
 * @param {String} options.endpoint The base URL of the requested API endpoint
 * @param {Object} httpTransport    The HTTP transport object used by the original request
 * @returns {Object} The pagination metadata object for this HTTP request, or else null
 */
function createPaginationObject( result, options, httpTransport ) {
	let _paging = null;

	if ( ! result.headers ) {
		// No headers: return as-is
		return _paging;
	}

	// Guard against capitalization inconsistencies in returned headers
	Object.keys( result.headers ).forEach( ( header ) => {
		result.headers[ header.toLowerCase() ] = result.headers[ header ];
	} );

	if ( ! result.headers[ 'x-wp-totalpages' ] ) {
		// No paging: return as-is
		return _paging;
	}

	const totalPages = +result.headers[ 'x-wp-totalpages' ];

	if ( ! totalPages || totalPages === 0 ) {
		// No paging: return as-is
		return _paging;
	}

	// Decode the link header object
	const links = result.headers.link ?
		parseLinkHeader( result.headers.link ) :
		{};

	// Store pagination data from response headers on the response collection
	_paging = {
		total: +result.headers[ 'x-wp-total' ],
		totalPages: totalPages,
		links: links,
	};

	// Create a WPRequest instance pre-bound to the "next" page, if available
	if ( links.next ) {
		_paging.next = new WPRequest( {
			...options,
			transport: httpTransport,
			endpoint: links.next,
		} );
	}

	// Create a WPRequest instance pre-bound to the "prev" page, if available
	if ( links.prev ) {
		_paging.prev = new WPRequest( {
			...options,
			transport: httpTransport,
			endpoint: links.prev,
		} );
	}

	return _paging;
}

// HTTP-Related Helpers
// ====================

/**
 * Submit the provided superagent request object, invoke a callback (if it was
 * provided), and return a promise to the response from the HTTP request.
 *
 * @private
 * @param {Object} request A superagent request object
 * @param {Function} callback A callback function (optional)
 * @param {Function} transform A function to transform the result data
 * @returns {Promise} A promise to the superagent request
 */
function invokeAndPromisify( request, callback, transform ) {
	return new Promise( ( resolve, reject ) => {
		// Fire off the result
		request.end( ( err, result ) => {

			// Return the results as a promise
			if ( err || result.error ) {
				reject( err || result.error );
			} else {
				resolve( result );
			}
		} );
	} ).then( transform ).then( ( result ) => {
		// If a node-style callback was provided, call it, but also return the
		// result value for use via the returned Promise
		if ( callback && typeof callback === 'function' ) {
			callback( null, result );
		}
		return result;
	}, ( err ) => {
		// If the API provided an error object, it will be available within the
		// superagent response object as response.body (containing the response
		// JSON). If that object exists, it will have a .code property if it is
		// truly an API error (non-API errors will not have a .code).
		if ( err.response && err.response.body && err.response.body.code ) {
			// Forward API error response JSON on to the calling method: omit
			// all transport-specific (superagent-specific) properties
			err = err.response.body;
		}
		// If a callback was provided, ensure it is called with the error; otherwise
		// re-throw the error so that it can be handled by a Promise .catch or .then
		if ( callback && typeof callback === 'function' ) {
			callback( err );
		} else {
			throw err;
		}
	} );
}

/**
 * Return the body of the request, augmented with pagination information if the
 * result is a paged collection.
 *
 * @private
 * @param {WPRequest} wpreq The WPRequest representing the returned HTTP response
 * @param {Object} result The results from the HTTP request
 * @returns {Object} The "body" property of the result, conditionally augmented with
 *                  pagination information if the result is a partial collection.
 */
function returnBody( wpreq, result ) {
	const body = extractResponseBody( result );
	const _paging = createPaginationObject( result, wpreq._options, wpreq.transport );
	if ( _paging ) {
		body._paging = _paging;
	}
	return body;
}

/**
 * Extract and return the headers property from a superagent response object
 *
 * @private
 * @param {Object} result The results from the HTTP request
 * @returns {Object} The "headers" property of the result
 */
function returnHeaders( result ) {
	return result.headers;
}

// HTTP Methods: Private HTTP-verb versions
// ========================================

/**
 * @method get
 * @async
 * @param {WPRequest} wpreq A WPRequest query object
 * @param {Function} [callback] A callback to invoke with the results of the GET request
 * @returns {Promise} A promise to the results of the HTTP request
 */
function _httpGet( wpreq, callback ) {
	checkMethodSupport( 'get', wpreq );
	const url = wpreq.toString();

	let request = _auth( agent.get( url ), wpreq._options );
	request = _setHeaders( request, wpreq._options );

	return invokeAndPromisify( request, callback, returnBody.bind( null, wpreq ) );
}

/**
 * Invoke an HTTP "POST" request against the provided endpoint
 * @method post
 * @async
 * @param {WPRequest} wpreq A WPRequest query object
 * @param {Object} data The data for the POST request
 * @param {Function} [callback] A callback to invoke with the results of the POST request
 * @returns {Promise} A promise to the results of the HTTP request
 */
function _httpPost( wpreq, data, callback ) {
	checkMethodSupport( 'post', wpreq );
	const url = wpreq.toString();
	data = data || {};
	let request = _auth( agent.post( url ), wpreq._options, true );
	request = _setHeaders( request, wpreq._options );

	if ( wpreq._attachment ) {
		// Data must be form-encoded alongside image attachment
		request = objectReduce(
			data,
			( req, value, key ) => req.field( key, value ),
			request.attach( 'file', wpreq._attachment, wpreq._attachmentName )
		);
	} else {
		request = request.send( data );
	}

	return invokeAndPromisify( request, callback, returnBody.bind( null, wpreq ) );
}

/**
 * @method put
 * @async
 * @param {WPRequest} wpreq A WPRequest query object
 * @param {Object} data The data for the PUT request
 * @param {Function} [callback] A callback to invoke with the results of the PUT request
 * @returns {Promise} A promise to the results of the HTTP request
 */
function _httpPut( wpreq, data, callback ) {
	checkMethodSupport( 'put', wpreq );
	const url = wpreq.toString();
	data = data || {};

	let request = _auth( agent.put( url ), wpreq._options, true ).send( data );
	request = _setHeaders( request, wpreq._options );

	return invokeAndPromisify( request, callback, returnBody.bind( null, wpreq ) );
}

/**
 * @method delete
 * @async
 * @param {WPRequest} wpreq A WPRequest query object
 * @param {Object} [data] Data to send along with the DELETE request
 * @param {Function} [callback] A callback to invoke with the results of the DELETE request
 * @returns {Promise} A promise to the results of the HTTP request
 */
function _httpDelete( wpreq, data, callback ) {
	if ( ! callback && typeof data === 'function' ) {
		callback = data;
		data = null;
	}
	checkMethodSupport( 'delete', wpreq );
	const url = wpreq.toString();
	let request = _auth( agent.del( url ), wpreq._options, true ).send( data );
	request = _setHeaders( request, wpreq._options );

	return invokeAndPromisify( request, callback, returnBody.bind( null, wpreq ) );
}

/**
 * @method head
 * @async
 * @param {WPRequest} wpreq A WPRequest query object
 * @param {Function} [callback] A callback to invoke with the results of the HEAD request
 * @returns {Promise} A promise to the header results of the HTTP request
 */
function _httpHead( wpreq, callback ) {
	checkMethodSupport( 'head', wpreq );
	const url = wpreq.toString();
	let request = _auth( agent.head( url ), wpreq._options );
	request = _setHeaders( request, wpreq._options );

	return invokeAndPromisify( request, callback, returnHeaders );
}

module.exports = {
	delete: _httpDelete,
	get: _httpGet,
	head: _httpHead,
	post: _httpPost,
	put: _httpPut,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/mixins/filters.js":
/*!**************************************************!*\
  !*** ./node_modules/wpapi/lib/mixins/filters.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module mixins/filters
 */


const alphaNumericSort = __webpack_require__( /*! ../util/alphanumeric-sort */ "./node_modules/wpapi/lib/util/alphanumeric-sort.js" );
const keyValToObj = __webpack_require__( /*! ../util/key-val-to-obj */ "./node_modules/wpapi/lib/util/key-val-to-obj.js" );
const unique = __webpack_require__( /*! ../util/unique */ "./node_modules/wpapi/lib/util/unique.js" );

/**
 * Filter methods that can be mixed in to a request constructor's prototype to
 * allow that request to take advantage of the `?filter[]=` aliases for WP_Query
 * parameters for collection endpoints, when available.
 *
 * @mixin filters
 */
const filterMixins = {};

// Filter Methods
// ==============

/**
 * Specify key-value pairs by which to filter the API results (commonly used
 * to retrieve only posts meeting certain criteria, such as posts within a
 * particular category or by a particular author).
 *
 * @example
 *
 *     // Set a single property:
 *     wp.filter( 'post_type', 'cpt_event' )...
 *
 *     // Set multiple properties at once:
 *     wp.filter({
 *         post_status: 'publish',
 *         category_name: 'news'
 *     })...
 *
 *     // Chain calls to .filter():
 *     wp.filter( 'post_status', 'publish' ).filter( 'category_name', 'news' )...
 *
 * @method filter
 * @chainable
 * @param {String|Object} props A filter property name string, or object of name/value pairs
 * @param {String|Number|Array} [value] The value(s) corresponding to the provided filter property
 * @returns The request instance (for chaining)
 */
filterMixins.filter = function( props, value ) {
	if ( ! props || typeof props === 'string' && value === undefined ) {
		// We have no filter to set, or no value to set for that filter
		return this;
	}

	// convert the property name string `props` and value `value` into an object
	if ( typeof props === 'string' ) {
		props = keyValToObj( props, value );
	}

	this._filters = {
		...this._filters,
		...props,
	};

	return this;
};

/**
 * Restrict the query results to posts matching one or more taxonomy terms.
 *
 * @method taxonomy
 * @chainable
 * @param {String} taxonomy The name of the taxonomy to filter by
 * @param {String|Number|Array} term A string or integer, or array thereof, representing terms
 * @returns The request instance (for chaining)
 */
filterMixins.taxonomy = function( taxonomy, term ) {
	const termIsArray = Array.isArray( term );

	const termIsNumber = termIsArray ?
		term.reduce(
			( allAreNumbers, term ) => allAreNumbers && typeof term === 'number',
			true
		) :
		typeof term === 'number';

	const termIsString = termIsArray ?
		term.reduce(
			( allAreStrings, term ) => allAreStrings && typeof term === 'string',
			true
		) :
		typeof term === 'string';

	if ( ! termIsString && ! termIsNumber ) {
		throw new Error( 'term must be a number, string, or array of numbers or strings' );
	}

	if ( taxonomy === 'category' ) {
		if ( termIsString ) {
			// Query param for filtering by category slug is "category_name"
			taxonomy = 'category_name';
		} else {
			// The boolean check above ensures that if taxonomy === 'category' and
			// term is not a string, then term must be a number and therefore an ID:
			// Query param for filtering by category ID is "cat"
			taxonomy = 'cat';
		}
	} else if ( taxonomy === 'post_tag' ) {
		// tag is used in place of post_tag in the public query variables
		taxonomy = 'tag';
	}

	// Ensure the taxonomy filters object is available
	this._taxonomyFilters = this._taxonomyFilters || {};

	// Ensure there's an array of terms available for this taxonomy
	const taxonomyTerms = ( this._taxonomyFilters[ taxonomy ] || [] )
		// Insert the provided terms into the specified taxonomy's terms array
		.concat( term )
		// Sort array
		.sort( alphaNumericSort );

	// De-dupe
	this._taxonomyFilters[ taxonomy ] = unique( taxonomyTerms, true );

	return this;
};

/**
 * Query for posts published in a given year.
 *
 * @method year
 * @chainable
 * @param {Number} year integer representation of year requested
 * @returns The request instance (for chaining)
 */
filterMixins.year = function( year ) {
	return filterMixins.filter.call( this, 'year', year );
};

/**
 * Query for posts published in a given month, either by providing the number
 * of the requested month (e.g. 3), or the month's name as a string (e.g. "March")
 *
 * @method month
 * @chainable
 * @param {Number|String} month Integer for month (1) or month string ("January")
 * @returns The request instance (for chaining)
 */
filterMixins.month = function( month ) {
	let monthDate;
	if ( typeof month === 'string' ) {
		// Append a arbitrary day and year to the month to parse the string into a Date
		monthDate = new Date( Date.parse( month + ' 1, 2012' ) );

		// If the generated Date is NaN, then the passed string is not a valid month
		if ( isNaN( monthDate ) ) {
			return this;
		}

		// JS Dates are 0 indexed, but the WP API requires a 1-indexed integer
		month = monthDate.getMonth() + 1;
	}

	// If month is a Number, add the monthnum filter to the request
	if ( typeof month === 'number' ) {
		return filterMixins.filter.call( this, 'monthnum', month );
	}

	return this;
};

/**
 * Add the day filter into the request to retrieve posts for a given day
 *
 * @method day
 * @chainable
 * @param {Number} day Integer representation of the day requested
 * @returns The request instance (for chaining)
 */
filterMixins.day = function( day ) {
	return filterMixins.filter.call( this, 'day', day );
};

/**
 * Specify that we are requesting a page by its path (specific to Page resources)
 *
 * @method path
 * @chainable
 * @param {String} path The root-relative URL path for a page
 * @returns The request instance (for chaining)
 */
filterMixins.path = function( path ) {
	return filterMixins.filter.call( this, 'pagename', path );
};

module.exports = filterMixins;


/***/ }),

/***/ "./node_modules/wpapi/lib/mixins/index.js":
/*!************************************************!*\
  !*** ./node_modules/wpapi/lib/mixins/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * This module defines a mapping between supported GET request query parameter
 * arguments and their corresponding mixin, if available.
 */


const filterMixins = __webpack_require__( /*! ./filters */ "./node_modules/wpapi/lib/mixins/filters.js" );
const parameterMixins = __webpack_require__( /*! ./parameters */ "./node_modules/wpapi/lib/mixins/parameters.js" );

// `.context`, `.embed`, and `.edit` (a shortcut for `context(edit, true)`) are
// supported by default in WPRequest, as is the base `.param` method. Any GET
// argument parameters not covered here must be set directly by using `.param`.

// The initial mixins we define are the ones where either a single property
// accepted by the API endpoint corresponds to multiple individual mixin
// functions, or where the name we use for the function diverges from that
// of the query parameter that the mixin sets.
const mixins = {
	categories: {
		categories: parameterMixins.categories,
		/** @deprecated use .categories() */
		category: parameterMixins.category,
	},
	categories_exclude: {
		excludeCategories: parameterMixins.excludeCategories,
	},
	tags: {
		tags: parameterMixins.tags,
		/** @deprecated use .tags() */
		tag: parameterMixins.tag,
	},
	tags_exclude: {
		excludeTags: parameterMixins.excludeTags,
	},
	filter: filterMixins,
	post: {
		post: parameterMixins.post,
		/** @deprecated use .post() */
		forPost: parameterMixins.post,
	},
};

// All of these parameter mixins use a setter function named identically to the
// property that the function sets, but they must still be provided in wrapper
// objects so that the mixin can be `.assign`ed correctly: wrap & assign each
// setter to the mixins dictionary object.
[
	'after',
	'author',
	'before',
	'parent',
	'password',
	'status',
	'sticky',
].forEach( ( mixinName ) => {
	mixins[ mixinName ] = {};
	mixins[ mixinName ][ mixinName ] = parameterMixins[ mixinName ];
} );

module.exports = mixins;


/***/ }),

/***/ "./node_modules/wpapi/lib/mixins/parameters.js":
/*!*****************************************************!*\
  !*** ./node_modules/wpapi/lib/mixins/parameters.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Filter methods that can be mixed in to a request constructor's prototype to
 * allow that request to take advantage of top-level query parameters for
 * collection endpoints. These are most relevant to posts, pages and CPTs, but
 * pagination helpers are applicable to any collection.
 *
 * @module mixins/parameters
 */


const paramSetter = __webpack_require__( /*! ../util/parameter-setter */ "./node_modules/wpapi/lib/util/parameter-setter.js" );
const argumentIsNumeric = __webpack_require__( /*! ../util/argument-is-numeric */ "./node_modules/wpapi/lib/util/argument-is-numeric.js" );

/**
 * @mixin parameters
 */
const parameterMixins = {};

const filters = __webpack_require__( /*! ./filters */ "./node_modules/wpapi/lib/mixins/filters.js" );
// Needed for .author mixin, as author by ID is a parameter and by Name is a filter
const filter = filters.filter;
// Needed for .tag and .category mixin, for deprecated query-by-slug support
const taxonomy = filters.taxonomy;

// Parameter Methods
// =================

/**
 * Query for posts by a specific author.
 * This method will replace any previous 'author' query parameters that had been set.
 *
 * Note that this method will either set the "author" top-level query parameter,
 * or else the "author_name" filter parameter (when querying by nicename): this is
 * irregular as most parameter helper methods either set a top level parameter or a
 * filter, not both.
 *
 * _Usage with the author nicename string is deprecated._ Query by author ID instead.
 * If the "rest-filter" plugin is not installed, the name query will have no effect.
 *
 * @method author
 * @chainable
 * @param {String|Number} author The nicename or ID for a particular author
 * @returns The request instance (for chaining)
 */
parameterMixins.author = function( author ) {
	if ( author === undefined ) {
		return this;
	}
	if ( typeof author === 'string' ) {
		this.param( 'author', null );
		return filter.call( this, 'author_name', author );
	}
	if ( typeof author === 'number' ) {
		filter.call( this, 'author_name', null );
		return this.param( 'author', author );
	}
	if ( author === null ) {
		filter.call( this, 'author_name', null );
		return this.param( 'author', null );
	}
	throw new Error( 'author must be either a nicename string or numeric ID' );
};

/**
 * Search for hierarchical taxonomy terms that are children of the parent term
 * indicated by the provided term ID
 *
 * @example
 *
 *     wp.pages().parent( 3 ).then(function( pages ) {
 *       // console.log( 'all of these pages are nested below page ID#3:' );
 *       // console.log( pages );
 *     });
 *
 *     wp.categories().parent( 42 ).then(function( categories ) {
 *       console.log( 'all of these categories are sub-items of cat ID#42:' );
 *       console.log( categories );
 *     });
 *
 * @method parent
 * @chainable
 * @param {Number} parentId The ID of a (hierarchical) taxonomy term
 * @returns The request instance (for chaining)
 */
parameterMixins.parent = paramSetter( 'parent' );

/**
 * Specify the post for which to retrieve terms (relevant for *e.g.* taxonomy
 * and comment collection endpoints).
 *
 * @method post
 * @chainable
 * @param {String|Number} post The ID of the post for which to retrieve terms
 * @returns The request instance (for chaining)
 */
parameterMixins.post = paramSetter( 'post' );

/**
 * Specify the password to use to access the content of a password-protected post
 *
 * @method password
 * @chainable
 * @param {string} password A string password to access protected content within a post
 * @returns The request instance (for chaining)
 */
parameterMixins.password = paramSetter( 'password' );

/**
 * Specify for which post statuses to return posts in a response collection
 *
 * See https://codex.wordpress.org/Post_Status -- the default post status
 * values in WordPress which are most relevant to the API are 'publish',
 * 'future', 'draft', 'pending', 'private', and 'trash'. This parameter also
 * supports passing the special value "any" to return all statuses.
 *
 * @method status
 * @chainable
 * @param {string|string[]} status A status name string or array of strings
 * @returns The request instance (for chaining)
 */
parameterMixins.status = paramSetter( 'status' );

/**
 * Specify whether to return only, or to completely exclude, sticky posts
 *
 * @method sticky
 * @chainable
 * @param {boolean} sticky A boolean value for whether ONLY sticky posts (true) or
 *                         NO sticky posts (false) should be returned in the query
 * @returns The request instance (for chaining)
 */
parameterMixins.sticky = paramSetter( 'sticky' );

// Taxonomy Term Filter Methods
// ============================

/**
 * Retrieve only records associated with one of the provided categories
 *
 * @method categories
 * @chainable
 * @param {String|Number|Array} categories A term ID integer or numeric string, or array thereof
 * @returns The request instance (for chaining)
 */
parameterMixins.categories = paramSetter( 'categories' );

/**
 * Legacy wrapper for `.categories()` that uses `?filter` to query by slug if available
 *
 * @method tag
 * @deprecated Use `.categories()` and query by category IDs
 * @chainable
 * @param {String|Number|Array} tag A category term slug string, numeric ID, or array of numeric IDs
 * @returns The request instance (for chaining)
 */
parameterMixins.category = function( category ) {
	if ( argumentIsNumeric( category ) ) {
		return parameterMixins.categories.call( this, category );
	}
	return taxonomy.call( this, 'category', category );
};

/**
 * Exclude records associated with any of the provided category IDs
 *
 * @method excludeCategories
 * @chainable
 * @param {String|Number|Array} category A term ID integer or numeric string, or array thereof
 * @returns The request instance (for chaining)
 */
parameterMixins.excludeCategories = paramSetter( 'categories_exclude' );

/**
 * Retrieve only records associated with one of the provided tag IDs
 *
 * @method tags
 * @chainable
 * @param {String|Number|Array} tags A term ID integer or numeric string, or array thereof
 * @returns The request instance (for chaining)
 */
parameterMixins.tags = paramSetter( 'tags' );

/**
 * Legacy wrapper for `.tags()` that uses `?filter` to query by slug if available
 *
 * @method tag
 * @deprecated Use `.tags()` and query by term IDs
 * @chainable
 * @param {String|Number|Array} tag A tag term slug string, numeric ID, or array of numeric IDs
 * @returns The request instance (for chaining)
 */
parameterMixins.tag = function( tag ) {
	if ( argumentIsNumeric( tag ) ) {
		return parameterMixins.tags.call( this, tag );
	}
	return taxonomy.call( this, 'tag', tag );
};

/**
 * Exclude records associated with any of the provided tag IDs
 *
 * @method excludeTags
 * @chainable
 * @param {String|Number|Array} category A term ID integer or numeric string, or array thereof
 * @returns The request instance (for chaining)
 */
parameterMixins.excludeTags = paramSetter( 'tags_exclude' );

// Date Methods
// ============

/**
 * Retrieve only records published before a specified date
 *
 * @example <caption>Provide an ISO 8601-compliant date string</caption>
 *
 *     wp.posts().before('2016-03-22')...
 *
 * @example <caption>Provide a JavaScript Date object</caption>
 *
 *     wp.posts().before( new Date( 2016, 03, 22 ) )...
 *
 * @method before
 * @chainable
 * @param {String|Date} date An ISO 8601-compliant date string, or Date object
 * @returns The request instance (for chaining)
 */
parameterMixins.before = function( date ) {
	return this.param( 'before', new Date( date ).toISOString() );
};

/**
 * Retrieve only records published after a specified date
 *
 * @example <caption>Provide an ISO 8601-compliant date string</caption>
 *
 *     wp.posts().after('1986-03-22')...
 *
 * @example <caption>Provide a JavaScript Date object</caption>
 *
 *     wp.posts().after( new Date( 1986, 03, 22 ) )...
 *
 * @method after
 * @chainable
 * @param {String|Date} date An ISO 8601-compliant date string, or Date object
 * @returns The request instance (for chaining)
 */
parameterMixins.after = function( date ) {
	return this.param( 'after', new Date( date ).toISOString() );
};

module.exports = parameterMixins;


/***/ }),

/***/ "./node_modules/wpapi/lib/path-part-setter.js":
/*!****************************************************!*\
  !*** ./node_modules/wpapi/lib/path-part-setter.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module path-part-setter
 */


/**
 * Return a function to set part of the request URL path.
 *
 * Path part setter methods may be either dynamic (*i.e.* may represent a
 * "named group") or non-dynamic (representing a static part of the URL, which
 * is usually a collection endpoint of some sort). Which type of function is
 * returned depends on whether a given route has one or many sub-resources.
 *
 * @alias module:lib/path-part-setter.create
 * @param {Object} node An object representing a level of an endpoint path hierarchy
 * @returns {Function} A path part setter function
 */
function createPathPartSetter( node ) {
	// Local references to `node` properties used by returned functions
	const nodeLevel = node.level;
	const nodeName = node.names[ 0 ];
	const supportedMethods = node.methods || [];
	const dynamicChildren = node.children ?
		Object.keys( node.children )
			.map( key => node.children[ key ] )
			.filter( childNode => ( childNode.namedGroup === true ) ) :
		[];
	const dynamicChild = dynamicChildren.length === 1 && dynamicChildren[ 0 ];
	const dynamicChildLevel = dynamicChild && dynamicChild.level;

	if ( node.namedGroup ) {
		/**
		 * Set a dymanic (named-group) path part of a query URL.
		 *
		 * @example
		 *
		 *     // id() is a dynamic path part setter:
		 *     wp.posts().id( 7 ); // Get posts/7
		 *
		 * @chainable
		 * @param  {String|Number} val The path part value to set
		 * @returns {Object} The handler instance (for chaining)
		 */
		return function( val ) {
			this.setPathPart( nodeLevel, val );
			if ( supportedMethods.length ) {
				this._supportedMethods = supportedMethods;
			}
			return this;
		};
	} else {
		/**
		 * Set a non-dymanic (non-named-group) path part of a query URL, and
		 * set the value of a subresource if an input value is provided and
		 * exactly one named-group child node exists.
		 *
		 * @example
		 *
		 *     // revisions() is a non-dynamic path part setter:
		 *     wp.posts().id( 4 ).revisions();       // Get posts/4/revisions
		 *     wp.posts().id( 4 ).revisions( 1372 ); // Get posts/4/revisions/1372
		 *
		 * @chainable
		 * @param  {String|Number} [val] The path part value to set (if provided)
		 *                               for a subresource within this resource
		 * @returns {Object} The handler instance (for chaining)
		 */
		return function( val ) {
			// If the path part is not a namedGroup, it should have exactly one
			// entry in the names array: use that as the value for this setter,
			// as it will usually correspond to a collection endpoint.
			this.setPathPart( nodeLevel, nodeName );

			// If this node has exactly one dynamic child, this method may act as
			// a setter for that child node. `dynamicChildLevel` will be falsy if the
			// node does not have a child or has multiple children.
			if ( val !== undefined && dynamicChildLevel ) {
				this.setPathPart( dynamicChildLevel, val );
			}
			return this;
		};
	}
}

module.exports = {
	create: createPathPartSetter,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/resource-handler-spec.js":
/*!*********************************************************!*\
  !*** ./node_modules/wpapi/lib/resource-handler-spec.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module resource-handler-spec
 */


const createPathPartSetter = __webpack_require__( /*! ./path-part-setter */ "./node_modules/wpapi/lib/path-part-setter.js" ).create;

/** @private */
function addLevelOption( levelsObj, level, obj ) {
	levelsObj[ level ] = levelsObj[ level ] || [];
	levelsObj[ level ].push( obj );
}

/**
 * Assign a setter function for the provided node to the provided route
 * handler object setters dictionary (mutates handler by reference).
 *
 * @private
 * @param {Object} handler A route handler definition object
 * @param {Object} node    A route hierarchy level node object
 */
function assignSetterFnForNode( handler, node ) {
	let setterFn;

	// For each node, add its handler to the relevant "level" representation
	addLevelOption( handler._levels, node.level, {
		component: node.component,
		validate: node.validate,
		methods: node.methods,
	} );

	// First level is set implicitly, no dedicated setter needed
	if ( node.level > 0 ) {

		setterFn = createPathPartSetter( node );

		node.names.forEach( ( name ) => {
			// Convert from snake_case to camelCase
			const setterFnName = name.replace(
				/[_-]+\w/g,
				match => match.replace( /[_-]+/, '' ).toUpperCase()
			);

			// Don't overwrite previously-set methods
			if ( ! handler._setters[ setterFnName ] ) {
				handler._setters[ setterFnName ] = setterFn;
			}
		} );
	}
}

/**
 * Walk the tree of a specific resource node to create the setter methods
 *
 * The API we want to produce from the node tree looks like this:
 *
 *     wp.posts();                        /wp/v2/posts
 *     wp.posts().id( 7 );                /wp/v2/posts/7
 *     wp.posts().id( 7 ).revisions();    /wp/v2/posts/7/revisions
 *     wp.posts().id( 7 ).revisions( 8 ); /wp/v2/posts/7/revisions/8
 *
 * ^ That last one's the tricky one: we can deduce that this parameter is "id", but
 * that param will already be taken by the post ID, so sub-collections have to be
 * set up as `.revisions()` to get the collection, and `.revisions( id )` to get a
 * specific resource.
 *
 * @private
 * @param  {Object} node            A node object
 * @param  {Object} [node.children] An object of child nodes
 * // @returns {isLeaf} A boolean indicating whether the processed node is a leaf
 */
function extractSetterFromNode( handler, node ) {

	assignSetterFnForNode( handler, node );

	if ( node.children ) {
		// Recurse down to this node's children
		Object.keys( node.children ).forEach( ( key ) => {
			extractSetterFromNode( handler, node.children[ key ] );
		} );
	}
}

/**
 * Create a node handler specification object from a route definition object
 *
 * @name create
 * @param {object} routeDefinition A route definition object
 * @param {string} resource The string key of the resource for which to create a handler
 * @returns {object} A handler spec object with _path, _levels and _setters properties
 */
function createNodeHandlerSpec( routeDefinition, resource ) {

	const handler = {
		// A "path" is an ordered (by key) set of values composed into the final URL
		_path: {
			'0': resource,
		},

		// A "level" is a level-keyed object representing the valid options for
		// one level of the resource URL
		_levels: {},

		// Objects that hold methods and properties which will be copied to
		// instances of this endpoint's handler
		_setters: {},

		// Arguments (query parameters) that may be set in GET requests to endpoints
		// nested within this resource route tree, used to determine the mixins to
		// add to the request handler
		_getArgs: routeDefinition._getArgs,
	};

	// Walk the tree
	Object.keys( routeDefinition ).forEach( ( routeDefProp ) => {
		if ( routeDefProp !== '_getArgs' ) {
			extractSetterFromNode( handler, routeDefinition[ routeDefProp ] );
		}
	} );

	return handler;
}

module.exports = {
	create: createNodeHandlerSpec,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/route-tree.js":
/*!**********************************************!*\
  !*** ./node_modules/wpapi/lib/route-tree.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module route-tree
 */


const namedGroupRE = __webpack_require__( /*! ./util/named-group-regexp */ "./node_modules/wpapi/lib/util/named-group-regexp.js" ).namedGroupRE;
const splitPath = __webpack_require__( /*! ./util/split-path */ "./node_modules/wpapi/lib/util/split-path.js" );
const ensure = __webpack_require__( /*! ./util/ensure */ "./node_modules/wpapi/lib/util/ensure.js" );
const objectReduce = __webpack_require__( /*! ./util/object-reduce */ "./node_modules/wpapi/lib/util/object-reduce.js" );

/**
 * Method to use when reducing route components array.
 *
 * @private
 * @param {object} routeObj     A route definition object (set via .bind partial application)
 * @param {object} topLevel     The top-level route tree object for this set of routes (set
 *                              via .bind partial application)
 * @param {object} parentLevel  The memo object, which is mutated as the reducer adds
 *                              a new level handler for each level in the route
 * @param {string} component    The string defining this route component
 * @param {number} idx          The index of this component within the components array
 * @param {string[]} components The array of all components
 * @returns {object} The child object of the level being reduced
 */
function reduceRouteComponents( routeObj, topLevel, parentLevel, component, idx, components ) {
	// Check to see if this component is a dynamic URL segment (i.e. defined by
	// a named capture group regular expression). namedGroup will be `null` if
	// the regexp does not match, or else an array defining the RegExp match, e.g.
	// [
	//   'P<id>[\\d]+)',
	//   'id', // Name of the group
	//   '[\\d]+', // regular expression for this URL segment's contents
	//   index: 15,
	//   input: '/wp/v2/posts/(?P<id>[\\d]+)'
	// ]
	const namedGroup = component.match( namedGroupRE );
	// Pull out references to the relevant indices of the match, for utility:
	// `null` checking is necessary in case the component did not match the RE,
	// hence the `namedGroup &&`.
	const groupName = namedGroup && namedGroup[ 1 ];
	const groupPattern = namedGroup && namedGroup[ 2 ];

	// When branching based on a dynamic capture group we used the group's RE
	// pattern as the unique identifier: this is done because the same group
	// could be assigned different names in different endpoint handlers, e.g.
	// "id" for posts/:id vs "parent_id" for posts/:parent_id/revisions.
	//
	// There is an edge case where groupPattern will be "" if we are registering
	// a custom route via `.registerRoute` that does not include parameter
	// validation. In this case we assume the groupName is sufficiently unique,
	// and fall back to `|| groupName` for the levelKey string.
	const levelKey = namedGroup ? ( groupPattern || groupName ) : component;

	// Level name on the other hand takes its value from the group's name, if
	// defined, and falls back to the component string to handle situations where
	// `component` is a collection (e.g. "revisions")
	const levelName = namedGroup ? groupName : component;

	// Check whether we have a preexisting node at this level of the tree, and
	// create a new level object if not. The component string is included so that
	// validators can throw meaningful errors as appropriate.
	const currentLevel = parentLevel[ levelKey ] || {
		component: component,
		namedGroup: namedGroup ? true : false,
		level: idx,
		names: [],
	};

	// A level's "names" correspond to the list of strings which could describe
	// an endpoint's component setter functions: "id", "revisions", etc.
	if ( currentLevel.names.indexOf( levelName ) < 0 ) {
		currentLevel.names.push( levelName );
	}

	// A level's validate method is called to check whether a value being set
	// on the request URL is of the proper type for the location in which it
	// is specified. If a group pattern was found, the validator checks whether
	// the input string exactly matches the group pattern.
	const groupPatternRE = groupPattern === '' ?
		// If groupPattern is an empty string, accept any input without validation
		/.*/ :
		// Otherwise, validate against the group pattern or the component string
		new RegExp( groupPattern ? '^' + groupPattern + '$' : component, 'i' );

	// Only one validate function is maintained for each node, because each node
	// is defined either by a string literal or by a specific regular expression.
	currentLevel.validate = input => groupPatternRE.test( input );

	// Check to see whether to expect more nodes within this branch of the tree,
	if ( components[ idx + 1 ] ) {
		// and create a "children" object to hold those nodes if necessary
		currentLevel.children = currentLevel.children || {};
	} else {
		// At leaf nodes, specify the method capabilities of this endpoint
		currentLevel.methods = ( routeObj.methods || [] ).map( str => str.toLowerCase() );

		// Ensure HEAD is included whenever GET is supported: the API automatically
		// adds support for HEAD if you have GET
		if ( currentLevel.methods.indexOf( 'get' ) > -1 && currentLevel.methods.indexOf( 'head' ) === -1 ) {
			currentLevel.methods.push( 'head' );
		}

		// At leaf nodes also flag (at the top level) what arguments are
		// available to GET requests, so that we may automatically apply the
		// appropriate parameter mixins
		if ( routeObj.endpoints ) {
			topLevel._getArgs = topLevel._getArgs || {};
			routeObj.endpoints.forEach( ( endpoint ) => {
				// `endpoint.methods` will be an array of methods like `[ 'GET' ]`: we
				// only care about GET for this exercise. Validating POST and PUT args
				// could be useful but is currently deemed to be out-of-scope.
				endpoint.methods.forEach( ( method ) => {
					if ( method.toLowerCase() === 'get' ) {
						Object.keys( endpoint.args ).forEach( ( argKey ) => {
							// Reference param definition objects in the top _getArgs dictionary
							topLevel._getArgs[ argKey ] = endpoint.args[ argKey ];
						} );
					}
				} );
			} );
		}
	}

	// Return the child node object as the new "level"
	parentLevel[ levelKey ] = currentLevel;
	return currentLevel.children;
}

/**
 *
 * @private
 * @param {object}   namespaces The memo object that becomes a dictionary mapping API
 *                              namespaces to an object of the namespace's routes
 * @param {object}   routeObj   A route definition object
 * @param {string}   route      The string key of the `routeObj` route object
 * @returns {object} The namespaces dictionary memo object
 */
function reduceRouteTree( namespaces, routeObj, route ) {
	const nsForRoute = routeObj.namespace;

	const routeString = route
		// Strip the namespace from the route string (all routes should have the
		// format `/namespace/other/stuff`) @TODO: Validate this assumption
		.replace( '/' + nsForRoute + '/', '' )
		// Also strip any trailing "/?": the slash is already optional and a single
		// question mark would break the regex parser
		.replace( /\/\?$/, '' );

	// Split the routes up into hierarchical route components
	const routeComponents = splitPath( routeString );

	// Do not make a namespace group for the API root
	// Do not add the namespace root to its own group
	// Do not take any action if routeString is empty
	if ( ! nsForRoute || '/' + nsForRoute === route || ! routeString ) {
		return namespaces;
	}

	// Ensure that the namespace object for this namespace exists
	ensure( namespaces, nsForRoute, {} );

	// Get a local reference to namespace object
	const ns = namespaces[ nsForRoute ];

	// The first element of the route tells us what type of resource this route
	// is for, e.g. "posts" or "comments": we build one handler per resource
	// type, so we group like resource paths together.
	const resource = routeComponents[0];

	// @TODO: This code above currently precludes baseless routes, e.g.
	// myplugin/v2/(?P<resource>\w+) -- should those be supported?

	// Create an array to represent this resource, and ensure it is assigned
	// to the namespace object. The array will structure the "levels" (path
	// components and subresource types) of this resource's endpoint handler.
	ensure( ns, resource, {} );
	const levels = ns[ resource ];

	// Recurse through the route components, mutating levels with information about
	// each child node encountered while walking through the routes tree and what
	// arguments (parameters) are available for GET requests to this endpoint.
	routeComponents.reduce(
		reduceRouteComponents.bind( null, routeObj, levels ),
		levels
	);

	return namespaces;
}

/**
 * Build a route tree by reducing over a routes definition object from the API
 * root endpoint response object
 *
 * @method build
 * @param {object} routes A dictionary of routes keyed by route regex strings
 * @returns {object} A dictionary, keyed by namespace, of resource handler
 * factory methods for each namespace's resources
 */
function buildRouteTree( routes ) {
	return objectReduce( routes, reduceRouteTree, {} );
}

module.exports = {
	build: buildRouteTree,
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/alphanumeric-sort.js":
/*!**********************************************************!*\
  !*** ./node_modules/wpapi/lib/util/alphanumeric-sort.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility function for sorting arrays of numbers or strings.
 *
 * @module util/alphanumeric-sort
 * @param {String|Number} a The first comparator operand
 * @param {String|Number} a The second comparator operand
 * @returns -1 if the values are backwards, 1 if they're ordered, and 0 if they're the same
 */
module.exports = ( a, b ) => {
	if ( a > b ) {
		return 1;
	}
	if ( a < b ) {
		return -1;
	}
	return 0;
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/apply-mixin.js":
/*!****************************************************!*\
  !*** ./node_modules/wpapi/lib/util/apply-mixin.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Augment an object (specifically a prototype) with a mixin method
 * (the provided object is mutated by reference)
 *
 * @module util/apply-mixin
 * @param {Object} obj The object (usually a prototype) to augment
 * @param {String} key The property to which the mixin method should be assigned
 * @param {Function} mixin The mixin method
 * @returns {void}
 */
module.exports = ( obj, key, mixin ) => {
	// Will not overwrite existing methods
	if ( typeof mixin === 'function' && ! obj[ key ] ) {
		obj[ key ] = mixin;
	}
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/argument-is-numeric.js":
/*!************************************************************!*\
  !*** ./node_modules/wpapi/lib/util/argument-is-numeric.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Return true if the provided argument is a number, a numeric string, or an
 * array of numbers or numeric strings
 *
 * @module util/argument-is-numeric
 * @param {Number|String|Number[]|String[]} val The value to inspect
 * @param {String} key The property to which the mixin method should be assigned
 * @param {Function} mixin The mixin method
 * @returns {void}
 */
const argumentIsNumeric = ( val ) => {
	if ( typeof val === 'number' ) {
		return true;
	}

	if ( typeof val === 'string' ) {
		return /^\d+$/.test( val );
	}

	if ( Array.isArray( val ) ) {
		for ( let i = 0; i < val.length; i++ ) {
			// Fail early if any argument isn't determined to be numeric
			if ( ! argumentIsNumeric( val[ i ] ) ) {
				return false;
			}
		}
		return true;
	}

	// If it's not an array, and not a string, and not a number, we don't
	// know what to do with it
	return false;
};

module.exports = argumentIsNumeric;


/***/ }),

/***/ "./node_modules/wpapi/lib/util/check-method-support.js":
/*!*************************************************************!*\
  !*** ./node_modules/wpapi/lib/util/check-method-support.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Verify that a specific HTTP method is supported by the provided WPRequest
 *
 * @module util/check-method-support
 * @param {String} method An HTTP method to check ('get', 'post', etc)
 * @param {WPRequest} request A WPRequest object with a _supportedMethods array
 * @returns true iff the method is within request._supportedMethods
 */
module.exports = ( method, request ) => {
	if ( request._supportedMethods.indexOf( method.toLowerCase() ) === -1 ) {
		throw new Error(
			'Unsupported method; supported methods are: ' +
			request._supportedMethods.join( ', ' )
		);
	}

	return true;
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/ensure.js":
/*!***********************************************!*\
  !*** ./node_modules/wpapi/lib/util/ensure.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Ensure that a property is present in an object, initializing it to a default
 * value if it is not already defined. Modifies the provided object by reference.
 *
 * @module util/ensure
 * @param {object} obj              The object in which to ensure a property exists
 * @param {string} prop             The property key to ensure
 * @param {}       propDefaultValue The default value for the property
 * @returns {void}
 */
module.exports = ( obj, prop, propDefaultValue ) => {
	if ( obj && obj[ prop ] === undefined ) {
		obj[ prop ] = propDefaultValue;
	}
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/is-empty-object.js":
/*!********************************************************!*\
  !*** ./node_modules/wpapi/lib/util/is-empty-object.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determine whether an provided value is an empty object
 *
 * @module util/is-empty-object
 * @param {} value A value to test for empty-object-ness
 * @returns {boolean} Whether the provided value is an empty object
 */
module.exports = ( value ) => {
	// If the value is not object-like, then it is certainly not an empty object
	if ( typeof value !== 'object' ) {
		return false;
	}

	// For our purposes an empty array should not be treated as an empty object
	// (Since this is used to process invalid content-type responses, )
	if ( Array.isArray( value ) ) {
		return false;
	}

	for ( const key in value ) {
		if ( value.hasOwnProperty( key ) ) {
			return false;
		}
	}

	return true;
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/key-val-to-obj.js":
/*!*******************************************************!*\
  !*** ./node_modules/wpapi/lib/util/key-val-to-obj.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Convert a (key, value) pair to a { key: value } object
 *
 * @module util/key-val-to-obj
 * @param {string} key   The key to use in the returned object
 * @param {}       value The value to assign to the provided key
 * @returns {object} A dictionary object containing the key-value pair
 */
module.exports = ( key, value ) => {
	const obj = {};
	obj[ key ] = value;
	return obj;
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/named-group-regexp.js":
/*!***********************************************************!*\
  !*** ./node_modules/wpapi/lib/util/named-group-regexp.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module util/named-group-regexp
 */


const pattern = [
	// Capture group start
	'\\(\\?',
	// Capture group name begins either `P<`, `<` or `'`
	'(?:P<|<|\')',
	// Everything up to the next `>`` or `'` (depending) will be the capture group name
	'([^>\']+)',
	// Capture group end
	'[>\']',
	// Get everything up to the end of the capture group: this is the RegExp used
	// when matching URLs to this route, which we can use for validation purposes.
	'([^\\)]*)',
	// Capture group end
	'\\)',
].join( '' );

module.exports = {
	/**
	 * String representation of the exported Regular Expression; we construct this
	 * RegExp from a string to enable more detailed annotation and permutation
	 *
	 * @prop {String} pattern
	 */
	pattern: pattern,

	/**
	 * Regular Expression to identify a capture group in PCRE formats
	 * `(?<name>regex)`, `(?'name'regex)` or `(?P<name>regex)` (see
	 * regular-expressions.info/refext.html)
	 *
	 * @prop {RegExp} namedGroupRE
	 */
	namedGroupRE: new RegExp( pattern ),
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/object-reduce.js":
/*!******************************************************!*\
  !*** ./node_modules/wpapi/lib/util/object-reduce.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Utility method to permit Array#reduce-like operations over objects
 *
 * This is likely to be slightly more inefficient than using lodash.reduce,
 * but results in ~50kb less size in the resulting bundled code before
 * minification and ~12kb of savings with minification.
 *
 * Unlike lodash.reduce(), the iterator and initial value properties are NOT
 * optional: this is done to simplify the code, this module is not intended to
 * be a full replacement for lodash.reduce and instead prioritizes simplicity
 * for a specific common case.
 *
 * @module util/object-reduce
 * @private
 * @param {Object} obj An object of key-value pairs
 * @param {Function} iterator A function to use to reduce the object
 * @param {*} initialState The initial value to pass to the reducer function
 * @returns The result of the reduction operation
 */
module.exports = ( obj, iterator, initialState ) => Object
	.keys( obj )
	.reduce(
		( memo, key ) => iterator( memo, obj[ key ], key ),
		initialState
	);


/***/ }),

/***/ "./node_modules/wpapi/lib/util/parameter-setter.js":
/*!*********************************************************!*\
  !*** ./node_modules/wpapi/lib/util/parameter-setter.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Helper to create a simple parameter setter convenience method
 *
 * @module util/parameter-setter
 * @param {String} param The string key of the parameter this method will set
 * @returns {Function} A setter method that can be assigned to a request instance
 */
module.exports = ( param ) => {
	/**
	 * A setter for a specific parameter
	 *
	 * @chainable
	 * @param {*} val The value to set for the the parameter
	 * @returns The request instance on which this method was called (for chaining)
	 */
	return function( val ) {
		return this.param( param, val );
	};
};


/***/ }),

/***/ "./node_modules/wpapi/lib/util/split-path.js":
/*!***************************************************!*\
  !*** ./node_modules/wpapi/lib/util/split-path.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * @module util/split-path
 */


const namedGroupPattern = __webpack_require__( /*! ./named-group-regexp */ "./node_modules/wpapi/lib/util/named-group-regexp.js" ).pattern;

// Convert capture groups to non-matching groups, because all capture groups
// are included in the resulting array when an RE is passed to `.split()`
// (We re-use the existing named group's capture pattern instead of creating
// a new RegExp just for this purpose)
const patternWithoutSubgroups = namedGroupPattern
	.replace( /([^\\])\(([^?])/g, '$1(?:$2' );

// Make a new RegExp using the same pattern as one single unified capture group,
// so the match as a whole will be preserved after `.split()`. Permit non-slash
// characters before or after the named capture group, although those components
// will not yield functioning setters.
const namedGroupRE = new RegExp( '([^/]*' + patternWithoutSubgroups + '[^/]*)' );

/**
 * Divide a route string up into hierarchical components by breaking it apart
 * on forward slash characters.
 *
 * There are plugins (including Jetpack) that register routes with regex capture
 * groups which also contain forward slashes, so those groups have to be pulled
 * out first before the remainder of the string can be .split() as normal.
 *
 * @param {String} pathStr A route path string to break into components
 * @returns {String[]} An array of route component strings
 */
module.exports = pathStr => pathStr
	// Divide a string like "/some/path/(?P<with_named_groups>)/etc" into an
	// array `[ "/some/path/", "(?P<with_named_groups>)", "/etc" ]`.
	.split( namedGroupRE )
	// Then, reduce through the array of parts, splitting any non-capture-group
	// parts on forward slashes and discarding empty strings to create the final
	// array of path components.
	.reduce( ( components, part ) => {
		if ( ! part ) {
			// Ignore empty strings parts
			return components;
		}

		if ( namedGroupRE.test( part ) ) {
			// Include named capture groups as-is
			return components.concat( part );
		}

		// Split the part on / and filter out empty strings
		return components.concat( part.split( '/' ).filter( Boolean ) );
	}, [] );


/***/ }),

/***/ "./node_modules/wpapi/lib/util/unique.js":
/*!***********************************************!*\
  !*** ./node_modules/wpapi/lib/util/unique.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Return an array with all duplicate items removed.
 *
 * This functionality was previously provided by lodash.uniq, but this
 * modern JS solution yields a smaller bundle size.
 *
 * @param {Array} arr An array to de-duplicate
 * @returns {Array} A de-duplicated array
 */
module.exports = arr => Array.from( new Set( arr ) );


/***/ }),

/***/ "./node_modules/wpapi/lib/wp-register-route.js":
/*!*****************************************************!*\
  !*** ./node_modules/wpapi/lib/wp-register-route.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const buildRouteTree = __webpack_require__( /*! ./route-tree */ "./node_modules/wpapi/lib/route-tree.js" ).build;
const generateEndpointFactories = __webpack_require__( /*! ./endpoint-factories */ "./node_modules/wpapi/lib/endpoint-factories.js" ).generate;
const paramSetter = __webpack_require__( /*! ./util/parameter-setter */ "./node_modules/wpapi/lib/util/parameter-setter.js" );
const applyMixin = __webpack_require__( /*! ./util/apply-mixin */ "./node_modules/wpapi/lib/util/apply-mixin.js" );
const mixins = __webpack_require__( /*! ./mixins */ "./node_modules/wpapi/lib/mixins/index.js" );

/**
 * Create and return a handler for an arbitrary WP REST API endpoint.
 *
 * The first two parameters mirror `register_rest_route` in the REST API
 * codebase:
 *
 * @memberof! WPAPI#
 * @param {string}   namespace         A namespace string, e.g. 'myplugin/v1'
 * @param {string}   restBase          A REST route string, e.g. '/author/(?P<id>\d+)'
 * @param {object}   [options]         An (optional) options object
 * @param {object}   [options.mixins]  A hash of functions to apply as mixins
 * @param {string[]} [options.methods] An array of methods to whitelist (on the leaf node only)
 * @returns {Function} An endpoint handler factory function for the specified route
 */
function registerRoute( namespace, restBase, options = {} ) {
	// Support all methods until requested to do otherwise
	let supportedMethods = [ 'head', 'get', 'patch', 'put', 'post', 'delete' ];

	if ( Array.isArray( options.methods ) ) {
		// Permit supported methods to be specified as an array
		supportedMethods = options.methods.map( method => method.trim().toLowerCase() );
	} else if ( typeof options.methods === 'string' ) {
		// Permit a supported method to be specified as a string
		supportedMethods = [ options.methods.trim().toLowerCase() ];
	}

	// Ensure that if GET is supported, then HEAD is as well, and vice-versa
	if ( supportedMethods.indexOf( 'get' ) !== -1 && supportedMethods.indexOf( 'head' ) === -1 ) {
		supportedMethods.push( 'head' );
	} else if ( supportedMethods.indexOf( 'head' ) !== -1 && supportedMethods.indexOf( 'get' ) === -1 ) {
		supportedMethods.push( 'get' );
	}

	const fullRoute = namespace
		// Route should always have preceding slash
		.replace( /^[\s/]*/, '/' )
		// Route should always be joined to namespace with a single slash
		.replace( /[\s/]*$/, '/' ) + restBase.replace( /^[\s/]*/, '' );

	const routeObj = {};
	routeObj[ fullRoute ] = {
		namespace: namespace,
		methods: supportedMethods,
	};

	// Go through the same steps used to bootstrap the client to parse the
	// provided route out into a handler request method
	const routeTree = buildRouteTree( routeObj );
	// Parse the mock route object into endpoint factories
	const endpointFactories = generateEndpointFactories( routeTree )[ namespace ];
	const EndpointRequest = endpointFactories[ Object.keys( endpointFactories )[ 0 ] ].Ctor;

	if ( options && options.params ) {
		options.params.forEach( ( param ) => {
			// Only accept string parameters
			if ( typeof param !== 'string' ) {
				return;
			}

			// If the parameter can be mapped to a mixin, apply that mixin
			if ( typeof mixins[ param ] === 'object' ) {
				Object.keys( mixins[ param ] ).forEach( ( key ) => {
					applyMixin( EndpointRequest.prototype, key, mixins[ param ][ key ] );
				} );
				return;
			}

			// Attempt to create a simple setter for any parameters for which
			// we do not already have a custom mixin
			applyMixin( EndpointRequest.prototype, param, paramSetter( param ) );
		} );
	}

	// Set any explicitly-provided object mixins
	if ( options && typeof options.mixins === 'object' ) {

		// Set any specified mixin functions on the response
		Object.keys( options.mixins ).forEach( ( key ) => {
			applyMixin( EndpointRequest.prototype, key, options.mixins[ key ] );
		} );
	}

	function endpointFactory( options = {} ) {
		return new EndpointRequest( {
			...options,
			...( this ? this._options : {} ),
		} );
	}
	endpointFactory.Ctor = EndpointRequest;

	return endpointFactory;
}

module.exports = registerRoute;


/***/ }),

/***/ "./node_modules/wpapi/wpapi.js":
/*!*************************************!*\
  !*** ./node_modules/wpapi/wpapi.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * A WP REST API client for Node.js
 *
 * @example
 *     var wp = new WPAPI({ endpoint: 'http://src.wordpress-develop.dev/wp-json' });
 *     wp.posts().then(function( posts ) {
 *         console.log( posts );
 *     }).catch(function( err ) {
 *         console.error( err );
 *     });
 *
 * @license MIT
 })
 */


const objectReduce = __webpack_require__( /*! ./lib/util/object-reduce */ "./node_modules/wpapi/lib/util/object-reduce.js" );

// This JSON file provides enough data to create handler methods for all valid
// API routes in WordPress 4.7
const defaultRoutes = __webpack_require__( /*! ./lib/data/default-routes.json */ "./node_modules/wpapi/lib/data/default-routes.json" );
const buildRouteTree = __webpack_require__( /*! ./lib/route-tree */ "./node_modules/wpapi/lib/route-tree.js" ).build;
const generateEndpointFactories = __webpack_require__( /*! ./lib/endpoint-factories */ "./node_modules/wpapi/lib/endpoint-factories.js" ).generate;

// The default endpoint factories will be lazy-loaded by parsing the default
// route tree data if a default-mode WPAPI instance is created (i.e. one that
// is to be bootstrapped with the handlers for all of the built-in routes)
let defaultEndpointFactories;

// Constant used to detect first-party WordPress REST API routes
const apiDefaultNamespace = 'wp/v2';

// Pull in autodiscovery methods
const autodiscovery = __webpack_require__( /*! ./lib/autodiscovery */ "./node_modules/wpapi/lib/autodiscovery.js" );

// Pull in base module constructors
const WPRequest = __webpack_require__( /*! ./lib/constructors/wp-request */ "./node_modules/wpapi/lib/constructors/wp-request.js" );

// Pull in default HTTP transport
const httpTransport = __webpack_require__( /*! ./lib/http-transport */ "./node_modules/wpapi/lib/http-transport.js" );

/**
 * Construct a REST API client instance object to create
 *
 * @constructor WPAPI
 * @param {Object} options             An options hash to configure the instance
 * @param {String} options.endpoint    The URI for a WP-API endpoint
 * @param {String} [options.username]  A WP-API Basic Auth username
 * @param {String} [options.password]  A WP-API Basic Auth password
 * @param {String} [options.nonce]     A WP nonce for use with cookie authentication
 * @param {Object} [options.routes]    A dictionary of API routes with which to
 *                                     bootstrap the WPAPI instance: the instance will
 *                                     be initialized with default routes only
 *                                     if this property is omitted
 * @param {String} [options.transport] An optional dictionary of HTTP transport
 *                                     methods (.get, .post, .put, .delete, .head)
 *                                     to use instead of the defaults, e.g. to use
 *                                     a different HTTP library than superagent
 */
function WPAPI( options ) {

	// Enforce `new`
	if ( this instanceof WPAPI === false ) {
		return new WPAPI( options );
	}

	if ( typeof options.endpoint !== 'string' ) {
		throw new Error( 'options hash must contain an API endpoint URL string' );
	}

	// Dictionary to be filled by handlers for default namespaces
	this._ns = {};

	this._options = {
		// Ensure trailing slash on endpoint URI
		endpoint: options.endpoint.replace(  /\/?$/, '/' ),
	};

	// If any authentication credentials were provided, assign them now
	if ( options && ( options.username || options.password || options.nonce ) ) {
		this.auth( options );
	}

	return this
		// Configure custom HTTP transport methods, if provided
		.transport( options.transport )
		// Bootstrap with a specific routes object, if provided
		.bootstrap( options && options.routes );
}

/**
 * Set custom transport methods to use when making HTTP requests against the API
 *
 * Pass an object with a function for one or many of "get", "post", "put",
 * "delete" and "head" and that function will be called when making that type
 * of request. The provided transport functions should take a WPRequest handler
 * instance (_e.g._ the result of a `wp.posts()...` chain or any other chaining
 * request handler) as their first argument; a `data` object as their second
 * argument (for POST, PUT and DELETE requests); and an optional callback as
 * their final argument. Transport methods should invoke the callback with the
 * response data (or error, as appropriate), and should also return a Promise.
 *
 * @example <caption>showing how a cache hit (keyed by URI) could short-circuit a get request</caption>
 *
 *     var site = new WPAPI({
 *       endpoint: 'http://my-site.com/wp-json'
 *     });
 *
 *     // Overwrite the GET behavior to inject a caching layer
 *     site.transport({
 *       get: function( wpreq, cb ) {
 *         var result = cache[ wpreq ];
 *         // If a cache hit is found, return it via the same callback/promise
 *         // signature as the default transport method
 *         if ( result ) {
 *           if ( cb && typeof cb === 'function' ) {
 *             cb( null, result );
 *           }
 *           return Promise.resolve( result );
 *         }
 *
 *         // Delegate to default transport if no cached data was found
 *         return WPAPI.transport.get( wpreq, cb ).then(function( result ) {
 *           cache[ wpreq ] = result;
 *           return result;
 *         });
 *       }
 *     });
 *
 * This is advanced behavior; you will only need to utilize this functionality
 * if your application has very specific HTTP handling or caching requirements.
 * Refer to the "http-transport" module within this application for the code
 * implementing the built-in transport methods.
 *
 * @memberof! WPAPI
 * @method transport
 * @chainable
 * @param {Object}   transport          A dictionary of HTTP transport methods
 * @param {Function} [transport.get]    The function to use for GET requests
 * @param {Function} [transport.post]   The function to use for POST requests
 * @param {Function} [transport.put]    The function to use for PUT requests
 * @param {Function} [transport.delete] The function to use for DELETE requests
 * @param {Function} [transport.head]   The function to use for HEAD requests
 * @returns {WPAPI} The WPAPI instance, for chaining
 */
WPAPI.prototype.transport = function( transport ) {
	// Local reference to avoid need to reference via `this` inside forEach
	const _options = this._options;

	// Create the default transport if it does not exist
	if ( ! _options.transport ) {
		_options.transport = Object.create( WPAPI.transport );
	}

	// Whitelist the methods that may be applied
	[ 'get', 'head', 'post', 'put', 'delete' ].forEach( ( key ) => {
		if ( transport && transport[ key ] ) {
			_options.transport[ key ] = transport[ key ];
		}
	} );

	return this;
};

/**
 * Default HTTP transport methods object for all WPAPI instances
 *
 * These methods may be extended or replaced on an instance-by-instance basis
 *
 * @memberof! WPAPI
 * @static
 * @property transport
 * @type {Object}
 */
WPAPI.transport = Object.create( httpTransport );
Object.freeze( WPAPI.transport );

/**
 * Convenience method for making a new WPAPI instance
 *
 * @example
 * These are equivalent:
 *
 *     var wp = new WPAPI({ endpoint: 'http://my.blog.url/wp-json' });
 *     var wp = WPAPI.site( 'http://my.blog.url/wp-json' );
 *
 * `WPAPI.site` can take an optional API root response JSON object to use when
 * bootstrapping the client's endpoint handler methods: if no second parameter
 * is provided, the client instance is assumed to be using the default API
 * with no additional plugins and is initialized with handlers for only those
 * default API routes.
 *
 * @example
 * These are equivalent:
 *
 *     // {...} means the JSON output of http://my.blog.url/wp-json
 *     var wp = new WPAPI({
 *       endpoint: 'http://my.blog.url/wp-json',
 *       json: {...}
 *     });
 *     var wp = WPAPI.site( 'http://my.blog.url/wp-json', {...} );
 *
 * @memberof! WPAPI
 * @static
 * @param {String} endpoint The URI for a WP-API endpoint
 * @param {Object} routes   The "routes" object from the JSON object returned
 *                          from the root API endpoint of a WP site, which should
 *                          be a dictionary of route definition objects keyed by
 *                          the route's regex pattern
 * @returns {WPAPI} A new WPAPI instance, bound to the provided endpoint
 */
WPAPI.site = function( endpoint, routes ) {
	return new WPAPI( {
		endpoint: endpoint,
		routes: routes,
	} );
};

/**
 * Generate a request against a completely arbitrary endpoint, with no assumptions about
 * or mutation of path, filtering, or query parameters. This request is not restricted to
 * the endpoint specified during WPAPI object instantiation.
 *
 * @example
 * Generate a request to the explicit URL "http://your.website.com/wp-json/some/custom/path"
 *
 *     wp.url( 'http://your.website.com/wp-json/some/custom/path' ).get()...
 *
 * @memberof! WPAPI
 * @param {String} url The URL to request
 * @returns {WPRequest} A WPRequest object bound to the provided URL
 */
WPAPI.prototype.url = function( url ) {
	return new WPRequest( {
		...this._options,
		endpoint: url,
	} );
};

/**
 * Generate a query against an arbitrary path on the current endpoint. This is useful for
 * requesting resources at custom WP-API endpoints, such as WooCommerce's `/products`.
 *
 * @memberof! WPAPI
 * @param {String} [relativePath] An endpoint-relative path to which to bind the request
 * @returns {WPRequest} A request object
 */
WPAPI.prototype.root = function( relativePath ) {
	relativePath = relativePath || '';
	const options = {
		...this._options,
	};
	// Request should be
	const request = new WPRequest( options );

	// Set the path template to the string passed in
	request._path = { '0': relativePath };

	return request;
};

/**
 * Set the default headers to use for all HTTP requests created from this WPAPI
 * site instance. Accepts a header name and its associated value as two strings,
 * or multiple headers as an object of name-value pairs.
 *
 * @example <caption>Set a single header to be used by all requests to this site</caption>
 *
 *     site.setHeaders( 'Authorization', 'Bearer trustme' )...
 *
 * @example <caption>Set multiple headers to be used by all requests to this site</caption>
 *
 *     site.setHeaders({
 *       Authorization: 'Bearer comeonwereoldfriendsright',
 *       'Accept-Language': 'en-CA'
 *     })...
 *
 * @memberof! WPAPI
 * @since 1.1.0
 * @chainable
 * @param {String|Object} headers The name of the header to set, or an object of
 *                                header names and their associated string values
 * @param {String}        [value] The value of the header being set
 * @returns {WPAPI} The WPAPI site handler instance, for chaining
 */
WPAPI.prototype.setHeaders = WPRequest.prototype.setHeaders;

/**
 * Set the authentication to use for a WPAPI site handler instance. Accepts basic
 * HTTP authentication credentials (string username & password) or a Nonce (for
 * cookie authentication) by default; may be overloaded to accept OAuth credentials
 * in the future.
 *
 * @example <caption>Basic Authentication</caption>
 *
 *     site.auth({
 *       username: 'admin',
 *       password: 'securepass55'
 *     })...
 *
 * @example <caption>Cookie/Nonce Authentication</caption>
 *
 *     site.auth({
 *       nonce: 'somenonce'
 *     })...
 *
 * @memberof! WPAPI
 * @method
 * @chainable
 * @param {Object} credentials            An authentication credentials object
 * @param {String} [credentials.username] A WP-API Basic HTTP Authentication username
 * @param {String} [credentials.password] A WP-API Basic HTTP Authentication password
 * @param {String} [credentials.nonce]    A WP nonce for use with cookie authentication
 * @returns {WPAPI} The WPAPI site handler instance, for chaining
 */
WPAPI.prototype.auth = WPRequest.prototype.auth;

// Apply the registerRoute method to the prototype
WPAPI.prototype.registerRoute = __webpack_require__( /*! ./lib/wp-register-route */ "./node_modules/wpapi/lib/wp-register-route.js" );

/**
 * Deduce request methods from a provided API root JSON response object's
 * routes dictionary, and assign those methods to the current instance. If
 * no routes dictionary is provided then the instance will be bootstrapped
 * with route handlers for the default API endpoints only.
 *
 * This method is called automatically during WPAPI instance creation.
 *
 * @memberof! WPAPI
 * @chainable
 * @param {Object} routes The "routes" object from the JSON object returned
 *                        from the root API endpoint of a WP site, which should
 *                        be a dictionary of route definition objects keyed by
 *                        the route's regex pattern
 * @returns {WPAPI} The bootstrapped WPAPI client instance (for chaining or assignment)
 */
WPAPI.prototype.bootstrap = function( routes ) {
	let routesByNamespace;
	let endpointFactoriesByNamespace;

	if ( ! routes ) {
		// Auto-generate default endpoint factories if they are not already available
		if ( ! defaultEndpointFactories ) {
			routesByNamespace = buildRouteTree( defaultRoutes );
			defaultEndpointFactories = generateEndpointFactories( routesByNamespace );
		}
		endpointFactoriesByNamespace = defaultEndpointFactories;
	} else {
		routesByNamespace = buildRouteTree( routes );
		endpointFactoriesByNamespace = generateEndpointFactories( routesByNamespace );
	}

	// For each namespace for which routes were identified, store the generated
	// route handlers on the WPAPI instance's private _ns dictionary. These namespaced
	// handler methods can be accessed by calling `.namespace( str )` on the
	// client instance and passing a registered namespace string.
	// Handlers for default (wp/v2) routes will also be assigned to the WPAPI
	// client instance object itself, for brevity.
	return objectReduce( endpointFactoriesByNamespace, ( wpInstance, endpointFactories, namespace ) => {

		// Set (or augment) the route handler factories for this namespace.
		wpInstance._ns[ namespace ] = objectReduce(
			endpointFactories,
			( nsHandlers, handlerFn, methodName ) => {
				nsHandlers[ methodName ] = handlerFn;
				return nsHandlers;
			},
			wpInstance._ns[ namespace ] || {
				// Create all namespace dictionaries with a direct reference to the main WPAPI
				// instance's _options property so that things like auth propagate properly
				_options: wpInstance._options,
			}
		);

		// For the default namespace, e.g. "wp/v2" at the time this comment was
		// written, ensure all methods are assigned to the root client object itself
		// in addition to the private _ns dictionary: this is done so that these
		// methods can be called with e.g. `wp.posts()` and not the more verbose
		// `wp.namespace( 'wp/v2' ).posts()`.
		if ( namespace === apiDefaultNamespace ) {
			Object.keys( wpInstance._ns[ namespace ] ).forEach( ( methodName ) => {
				wpInstance[ methodName ] = wpInstance._ns[ namespace ][ methodName ];
			} );
		}

		return wpInstance;
	}, this );
};

/**
 * Access API endpoint handlers from a particular API namespace object
 *
 * @example
 *
 *     wp.namespace( 'myplugin/v1' ).author()...
 *
 *     // Default WP endpoint handlers are assigned to the wp instance itself.
 *     // These are equivalent:
 *     wp.namespace( 'wp/v2' ).posts()...
 *     wp.posts()...
 *
 * @memberof! WPAPI
 * @param {string} namespace A namespace string
 * @returns {Object} An object of route endpoint handler methods for the
 * routes within the specified namespace
 */
WPAPI.prototype.namespace = function( namespace ) {
	if ( ! this._ns[ namespace ] ) {
		throw new Error( 'Error: namespace ' + namespace + ' is not recognized' );
	}
	return this._ns[ namespace ];
};

/**
 * Take an arbitrary WordPress site, deduce the WP REST API root endpoint, query
 * that endpoint, and parse the response JSON. Use the returned JSON response
 * to instantiate a WPAPI instance bound to the provided site.
 *
 * @memberof! WPAPI
 * @static
 * @param {string} url A URL within a REST API-enabled WordPress website
 * @returns {Promise} A promise that resolves to a configured WPAPI instance bound
 * to the deduced endpoint, or rejected if an endpoint is not found or the
 * library is unable to parse the provided endpoint.
 */
WPAPI.discover = ( url ) => {
	// local placeholder for API root URL
	let endpoint;

	// Try HEAD request first, for smaller payload: use WPAPI.site to produce
	// a request that utilizes the defined HTTP transports
	const req = WPAPI.site( url ).root();
	return req.headers()
		.catch( () => {
			// On the hypothesis that any error here is related to the HEAD request
			// failing, provisionally try again using GET because that method is
			// more widely supported
			return req.get();
		} )
		// Inspect response to find API location header
		.then( autodiscovery.locateAPIRootHeader )
		.then( ( apiRootURL ) => {
			// Set the function-scope variable that will be used to instantiate
			// the bound WPAPI instance,
			endpoint = apiRootURL;

			// then GET the API root JSON object
			return WPAPI.site( apiRootURL ).root().get();
		} )
		.then( ( apiRootJSON ) => {
			// Instantiate & bootstrap with the discovered methods
			return new WPAPI( {
				endpoint: endpoint,
				routes: apiRootJSON.routes,
			} );
		} )
		.catch( ( err ) => {
			/* eslint-disable no-console */
			console.error( err );
			if ( endpoint ) {
				console.warn( 'Endpoint detected, proceeding despite error...' );
				console.warn( 'Binding to ' + endpoint + ' and assuming default routes' );
				return new WPAPI.site( endpoint );
			}
			throw new Error( 'Autodiscovery failed' );
		} );
};

module.exports = WPAPI;


/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _infinite_scrolling__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./infinite-scrolling */ "./src/js/infinite-scrolling.js");

Object(_infinite_scrolling__WEBPACK_IMPORTED_MODULE_0__["initInfiniteScrolling"])('tease');

/***/ }),

/***/ "./src/js/infinite-scrolling.js":
/*!**************************************!*\
  !*** ./src/js/infinite-scrolling.js ***!
  \**************************************/
/*! exports provided: InfiniteScrolling, initInfiniteScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrolling", function() { return InfiniteScrolling; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "initInfiniteScrolling", function() { return initInfiniteScrolling; });
/* harmony import */ var _wp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wp */ "./src/js/wp.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var ELEMENT_IDS = ['template', 'sentinel', 'container'];

var isIntersecting = function isIntersecting(_ref) {
  var isIntersecting = _ref.isIntersecting;
  return isIntersecting;
};

var InfiniteScrolling =
/*#__PURE__*/
function () {
  function InfiniteScrolling(_ref2) {
    var _this = this;

    var template = _ref2.template,
        sentinel = _ref2.sentinel,
        container = _ref2.container;

    _classCallCheck(this, InfiniteScrolling);

    new IntersectionObserver(function (entries) {
      if (entries.some(isIntersecting)) {
        _this.loadPosts();
      }
    }).observe(sentinel);
    this.template = template;
    this.container = container;
    this.pageSize = container.children.length;
    this.currentPage = 1;
    this.totalPages = Infinity;
    this.isLoading = false;
  }

  _createClass(InfiniteScrolling, [{
    key: "populateCategories",
    value: function populateCategories(tease, post) {
      var categories = tease.querySelector('.js-tease-categories');

      if (!categories) {
        return;
      }

      var term = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getValue"])('_embedded', 'wp:term', 0)(post);

      if (!term) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["removeElement"])(categories);
      }

      term.map(function (_ref3) {
        var name = _ref3.name,
            link = _ref3.link;
        return Object.assign(document.createElement('a'), {
          textContent: name,
          href: link
        });
      }).forEach(function (link) {
        return categories.appendChild(link);
      });
    }
  }, {
    key: "setThumbnail",
    value: function setThumbnail(tease, post) {
      var thumbnail = tease.querySelector('.js-tease-thumbnail');
      var featured = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getValue"])('_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'thumbnail', 'source_url')(post);

      if (!featured) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["removeElement"])(thumbnail);
      }

      thumbnail.querySelector('img').src = featured;
    }
  }, {
    key: "appendPost",
    value: function appendPost(post) {
      var tease = document.importNode(this.template, true).content;
      var item = document.createElement('li');
      this.populateCategories(tease, post);
      this.setThumbnail(tease, post);
      tease.querySelector('.js-tease-title').textContent = post.title.rendered;
      tease.querySelector('.js-tease-excerpt').innerHTML = post.excerpt.rendered;
      item.appendChild(tease);
      this.container.appendChild(item);
    }
  }, {
    key: "loadPosts",
    value: function loadPosts() {
      var _this2 = this;

      if (this.isLoading || this.currentPage >= this.totalPages) {
        return;
      }

      this.isLoading = true;
      this.currentPage++;
      _wp__WEBPACK_IMPORTED_MODULE_0__["default"].posts().perPage(this.pageSize).page(this.currentPage).embed().then(Object(_util__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_ref4) {
        var _paging = _ref4._paging;
        _this2.totalPages = _paging.totalPages;
      })).then(function (posts) {
        return posts.forEach(function (post) {
          return _this2.appendPost(post);
        });
      })["finally"](function () {
        _this2.isLoading = false;
      });
    }
  }]);

  return InfiniteScrolling;
}();
var initInfiniteScrolling = function initInfiniteScrolling(prefix) {
  var elements = ELEMENT_IDS.reduce(function (result, current) {
    return Object.assign(result, _objectSpread({}, Object(_util__WEBPACK_IMPORTED_MODULE_1__["toObject"])(current, document.getElementById("".concat(prefix, "-").concat(current)))));
  }, {});
  return Object.keys(elements).length === ELEMENT_IDS.length && new InfiniteScrolling(elements);
};

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: toObject, tap, removeElement, getValue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toObject", function() { return toObject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElement", function() { return removeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var toObject = function toObject(prop, value) {
  return value && _defineProperty({}, prop, value);
};
var tap = function tap(callback) {
  return function (value) {
    callback(value);
    return value;
  };
};
var removeElement = function removeElement(element) {
  return element.parentNode.removeChild(element);
};
var getValue = function getValue() {
  for (var _len = arguments.length, path = new Array(_len), _key = 0; _key < _len; _key++) {
    path[_key] = arguments[_key];
  }

  return function (object) {
    return path.reduce(function (result, prop) {
      return _typeof(result) === 'object' ? result[prop] : undefined;
    }, object);
  };
};

/***/ }),

/***/ "./src/js/wp.js":
/*!**********************!*\
  !*** ./src/js/wp.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var wpapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! wpapi */ "./node_modules/wpapi/wpapi.js");
/* harmony import */ var wpapi__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(wpapi__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (new wpapi__WEBPACK_IMPORTED_MODULE_0___default.a({
  endpoint: '/wp-json'
}));

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9hZ2VudC1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2F1dG9kaXNjb3ZlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9jb25zdHJ1Y3RvcnMvd3AtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2VuZHBvaW50LWZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2VuZHBvaW50LXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9odHRwLXRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL21peGlucy9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvbWl4aW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvbWl4aW5zL3BhcmFtZXRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9wYXRoLXBhcnQtc2V0dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvcmVzb3VyY2UtaGFuZGxlci1zcGVjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvcm91dGUtdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3V0aWwvYWxwaGFudW1lcmljLXNvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL2FwcGx5LW1peGluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9hcmd1bWVudC1pcy1udW1lcmljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9jaGVjay1tZXRob2Qtc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3V0aWwvZW5zdXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9pcy1lbXB0eS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL2tleS12YWwtdG8tb2JqLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9uYW1lZC1ncm91cC1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL29iamVjdC1yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3BhcmFtZXRlci1zZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3NwbGl0LXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3VuaXF1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3dwLXJlZ2lzdGVyLXJvdXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS93cGFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2luZmluaXRlLXNjcm9sbGluZy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvd3AuanMiXSwibmFtZXMiOlsiaW5pdEluZmluaXRlU2Nyb2xsaW5nIiwiRUxFTUVOVF9JRFMiLCJpc0ludGVyc2VjdGluZyIsIkluZmluaXRlU2Nyb2xsaW5nIiwidGVtcGxhdGUiLCJzZW50aW5lbCIsImNvbnRhaW5lciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsInNvbWUiLCJsb2FkUG9zdHMiLCJvYnNlcnZlIiwicGFnZVNpemUiLCJjaGlsZHJlbiIsImxlbmd0aCIsImN1cnJlbnRQYWdlIiwidG90YWxQYWdlcyIsIkluZmluaXR5IiwiaXNMb2FkaW5nIiwidGVhc2UiLCJwb3N0IiwiY2F0ZWdvcmllcyIsInF1ZXJ5U2VsZWN0b3IiLCJ0ZXJtIiwiZ2V0VmFsdWUiLCJyZW1vdmVFbGVtZW50IiwibWFwIiwibmFtZSIsImxpbmsiLCJPYmplY3QiLCJhc3NpZ24iLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJ0ZXh0Q29udGVudCIsImhyZWYiLCJmb3JFYWNoIiwiYXBwZW5kQ2hpbGQiLCJ0aHVtYm5haWwiLCJmZWF0dXJlZCIsInNyYyIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiaXRlbSIsInBvcHVsYXRlQ2F0ZWdvcmllcyIsInNldFRodW1ibmFpbCIsInRpdGxlIiwicmVuZGVyZWQiLCJpbm5lckhUTUwiLCJleGNlcnB0Iiwid3AiLCJwb3N0cyIsInBlclBhZ2UiLCJwYWdlIiwiZW1iZWQiLCJ0aGVuIiwidGFwIiwiX3BhZ2luZyIsImFwcGVuZFBvc3QiLCJwcmVmaXgiLCJlbGVtZW50cyIsInJlZHVjZSIsInJlc3VsdCIsImN1cnJlbnQiLCJ0b09iamVjdCIsImdldEVsZW1lbnRCeUlkIiwia2V5cyIsInByb3AiLCJ2YWx1ZSIsImNhbGxiYWNrIiwiZWxlbWVudCIsInBhcmVudE5vZGUiLCJyZW1vdmVDaGlsZCIsInBhdGgiLCJvYmplY3QiLCJ1bmRlZmluZWQiLCJXUEFQSSIsImVuZHBvaW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNo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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVRYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBOztBQUVBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDJCQUEyQixnQkFBZ0I7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QUNILEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsVUFBVTtBQUNyQixXQUFXLE9BQU87QUFDbEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsU0FBUztBQUNwQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ25YQTtBQUNBO0FBQ0E7QUFDYTs7QUFFYix5QkFBeUIsbUJBQU8sRUFBRSxxRkFBMkI7QUFDN0Qsb0JBQW9CLG1CQUFPLEVBQUUsK0VBQXdCO0FBQ3JELGVBQWUsbUJBQU8sRUFBRSwrREFBZ0I7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QixXQUFXLG9CQUFvQjtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xNQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUViLHFCQUFxQixtQkFBTyxFQUFFLDZEQUFXO0FBQ3pDLHdCQUF3QixtQkFBTyxFQUFFLG1FQUFjOztBQUUvQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFQUFFO0FBQ0Y7QUFDQTtBQUNBLEVBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNhOztBQUViLG9CQUFvQixtQkFBTyxFQUFFLG1GQUEwQjtBQUN2RCwwQkFBMEIsbUJBQU8sRUFBRSx5RkFBNkI7O0FBRWhFO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBTyxFQUFFLDZEQUFXO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLGdCQUFnQjtBQUMzQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxvQkFBb0I7QUFDL0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLG9CQUFvQjtBQUMvQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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XG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9qcy9pbmRleC5qc1wiKTtcbiIsIlxyXG4vKipcclxuICogRXhwb3NlIGBFbWl0dGVyYC5cclxuICovXHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICBtb2R1bGUuZXhwb3J0cyA9IEVtaXR0ZXI7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBJbml0aWFsaXplIGEgbmV3IGBFbWl0dGVyYC5cclxuICpcclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5mdW5jdGlvbiBFbWl0dGVyKG9iaikge1xyXG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIE1peGluIHRoZSBlbWl0dGVyIHByb3BlcnRpZXMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcclxuICogQHJldHVybiB7T2JqZWN0fVxyXG4gKiBAYXBpIHByaXZhdGVcclxuICovXHJcblxyXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcclxuICBmb3IgKHZhciBrZXkgaW4gRW1pdHRlci5wcm90b3R5cGUpIHtcclxuICAgIG9ialtrZXldID0gRW1pdHRlci5wcm90b3R5cGVba2V5XTtcclxuICB9XHJcbiAgcmV0dXJuIG9iajtcclxufVxyXG5cclxuLyoqXHJcbiAqIExpc3RlbiBvbiB0aGUgZ2l2ZW4gYGV2ZW50YCB3aXRoIGBmbmAuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9uID1cclxuRW1pdHRlci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gICh0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXSlcclxuICAgIC5wdXNoKGZuKTtcclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBBZGRzIGFuIGBldmVudGAgbGlzdGVuZXIgdGhhdCB3aWxsIGJlIGludm9rZWQgYSBzaW5nbGVcclxuICogdGltZSB0aGVuIGF1dG9tYXRpY2FsbHkgcmVtb3ZlZC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgZnVuY3Rpb24gb24oKSB7XHJcbiAgICB0aGlzLm9mZihldmVudCwgb24pO1xyXG4gICAgZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICB9XHJcblxyXG4gIG9uLmZuID0gZm47XHJcbiAgdGhpcy5vbihldmVudCwgb24pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIFJlbW92ZSB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGBldmVudGAgb3IgYWxsXHJcbiAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vZmYgPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbihldmVudCwgZm4pe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuXHJcbiAgLy8gYWxsXHJcbiAgaWYgKDAgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgdGhpcy5fY2FsbGJhY2tzID0ge307XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHNwZWNpZmljIGV2ZW50XHJcbiAgdmFyIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgaWYgKCFjYWxsYmFja3MpIHJldHVybiB0aGlzO1xyXG5cclxuICAvLyByZW1vdmUgYWxsIGhhbmRsZXJzXHJcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xyXG4gICAgZGVsZXRlIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8vIHJlbW92ZSBzcGVjaWZpYyBoYW5kbGVyXHJcbiAgdmFyIGNiO1xyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY2FsbGJhY2tzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjYiA9IGNhbGxiYWNrc1tpXTtcclxuICAgIGlmIChjYiA9PT0gZm4gfHwgY2IuZm4gPT09IGZuKSB7XHJcbiAgICAgIGNhbGxiYWNrcy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH1cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBFbWl0IGBldmVudGAgd2l0aCB0aGUgZ2l2ZW4gYXJncy5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7TWl4ZWR9IC4uLlxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG4gIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpXHJcbiAgICAsIGNhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF07XHJcblxyXG4gIGlmIChjYWxsYmFja3MpIHtcclxuICAgIGNhbGxiYWNrcyA9IGNhbGxiYWNrcy5zbGljZSgwKTtcclxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjYWxsYmFja3MubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcclxuICAgICAgY2FsbGJhY2tzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmV0dXJuIGFycmF5IG9mIGNhbGxiYWNrcyBmb3IgYGV2ZW50YC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEByZXR1cm4ge0FycmF5fVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgcmV0dXJuIHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gfHwgW107XHJcbn07XHJcblxyXG4vKipcclxuICogQ2hlY2sgaWYgdGhpcyBlbWl0dGVyIGhhcyBgZXZlbnRgIGhhbmRsZXJzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7Qm9vbGVhbn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbihldmVudCl7XHJcbiAgcmV0dXJuICEhIHRoaXMubGlzdGVuZXJzKGV2ZW50KS5sZW5ndGg7XHJcbn07XHJcbiIsIihmdW5jdGlvbiAobmFtZSwgZGVmaW5pdGlvbiwgY29udGV4dCkge1xuXG4gIC8vdHJ5IENvbW1vbkpTLCB0aGVuIEFNRCAocmVxdWlyZS5qcyksIHRoZW4gdXNlIGdsb2JhbC5cblxuICBpZiAodHlwZW9mIG1vZHVsZSAhPSAndW5kZWZpbmVkJyAmJiBtb2R1bGUuZXhwb3J0cykgbW9kdWxlLmV4cG9ydHMgPSBkZWZpbml0aW9uKCk7XG4gIGVsc2UgaWYgKHR5cGVvZiBjb250ZXh0WydkZWZpbmUnXSA9PSAnZnVuY3Rpb24nICYmIGNvbnRleHRbJ2RlZmluZSddWydhbWQnXSkgZGVmaW5lKGRlZmluaXRpb24pO1xuICBlbHNlIGNvbnRleHRbbmFtZV0gPSBkZWZpbml0aW9uKCk7XG5cbn0pKCdsaScsIGZ1bmN0aW9uICgpIHtcbiAgLy8gY29tcGlsZSByZWd1bGFyIGV4cHJlc3Npb25zIGFoZWFkIG9mIHRpbWUgZm9yIGVmZmljaWVuY3lcbiAgdmFyIHJlbHNSZWdFeHAgPSAvXjtcXHMqKFteXCI9XSspPSg/OlwiKFteXCJdKylcInwoW15cIjssXSspKD86WzssXXwkKSkvO1xuICB2YXIgc291cmNlUmVnRXhwID0gL148KFtePl0qKT4vO1xuICB2YXIgZGVsaW1pdGVyUmVnRXhwID0gL15cXHMqLFxccyovO1xuXG4gIHJldHVybiB7XG4gICAgcGFyc2U6IGZ1bmN0aW9uIChsaW5rc0hlYWRlciwgb3B0aW9ucykge1xuICAgICAgdmFyIG1hdGNoO1xuICAgICAgdmFyIHNvdXJjZTtcbiAgICAgIHZhciByZWxzO1xuICAgICAgdmFyIGV4dGVuZGVkID0gb3B0aW9ucyAmJiBvcHRpb25zLmV4dGVuZGVkIHx8IGZhbHNlO1xuICAgICAgdmFyIGxpbmtzID0gW107XG5cbiAgICAgIHdoaWxlIChsaW5rc0hlYWRlcikge1xuICAgICAgICBsaW5rc0hlYWRlciA9IGxpbmtzSGVhZGVyLnRyaW0oKTtcblxuICAgICAgICAvLyBQYXJzZSBgPGxpbms+YFxuICAgICAgICBzb3VyY2UgPSBzb3VyY2VSZWdFeHAuZXhlYyhsaW5rc0hlYWRlcik7XG4gICAgICAgIGlmICghc291cmNlKSBicmVhaztcblxuICAgICAgICB2YXIgY3VycmVudCA9IHtcbiAgICAgICAgICBsaW5rOiBzb3VyY2VbMV1cbiAgICAgICAgfTtcblxuICAgICAgICAvLyBNb3ZlIGN1cnNvclxuICAgICAgICBsaW5rc0hlYWRlciA9IGxpbmtzSGVhZGVyLnNsaWNlKHNvdXJjZVswXS5sZW5ndGgpO1xuXG4gICAgICAgIC8vIFBhcnNlIGA7IGF0dHI9cmVsYXRpb25gIGFuZCBgOyBhdHRyPVwicmVsYXRpb25cImBcblxuICAgICAgICB2YXIgbmV4dERlbGltaXRlciA9IGxpbmtzSGVhZGVyLm1hdGNoKGRlbGltaXRlclJlZ0V4cCk7XG4gICAgICAgIHdoaWxlKGxpbmtzSGVhZGVyICYmICghbmV4dERlbGltaXRlciB8fCBuZXh0RGVsaW1pdGVyLmluZGV4ID4gMCkpIHtcbiAgICAgICAgICBtYXRjaCA9IHJlbHNSZWdFeHAuZXhlYyhsaW5rc0hlYWRlcik7XG4gICAgICAgICAgaWYgKCFtYXRjaCkgYnJlYWs7XG5cbiAgICAgICAgICAvLyBNb3ZlIGN1cnNvclxuICAgICAgICAgIGxpbmtzSGVhZGVyID0gbGlua3NIZWFkZXIuc2xpY2UobWF0Y2hbMF0ubGVuZ3RoKTtcbiAgICAgICAgICBuZXh0RGVsaW1pdGVyID0gbGlua3NIZWFkZXIubWF0Y2goZGVsaW1pdGVyUmVnRXhwKTtcblxuXG4gICAgICAgICAgaWYgKG1hdGNoWzFdID09PSAncmVsJyB8fCBtYXRjaFsxXSA9PT0gJ3JldicpIHtcbiAgICAgICAgICAgIC8vIEFkZCBlaXRoZXIgcXVvdGVkIHJlbCBvciB1bnF1b3RlZCByZWxcbiAgICAgICAgICAgIHJlbHMgPSAobWF0Y2hbMl0gfHwgbWF0Y2hbM10pLnNwbGl0KC9cXHMrLyk7XG4gICAgICAgICAgICBjdXJyZW50W21hdGNoWzFdXSA9IHJlbHM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGN1cnJlbnRbbWF0Y2hbMV1dID0gbWF0Y2hbMl0gfHwgbWF0Y2hbM107XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGlua3MucHVzaChjdXJyZW50KTtcbiAgICAgICAgLy8gTW92ZSBjdXJzb3JcbiAgICAgICAgbGlua3NIZWFkZXIgPSBsaW5rc0hlYWRlci5yZXBsYWNlKGRlbGltaXRlclJlZ0V4cCwgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWV4dGVuZGVkKSB7XG4gICAgICAgIHJldHVybiBsaW5rcy5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBjdXJyZW50TGluaykge1xuICAgICAgICAgIGlmIChjdXJyZW50TGluay5yZWwpIHtcbiAgICAgICAgICAgIGN1cnJlbnRMaW5rLnJlbC5mb3JFYWNoKGZ1bmN0aW9uKHJlbCkge1xuICAgICAgICAgICAgICByZXN1bHRbcmVsXSA9IGN1cnJlbnRMaW5rLmxpbms7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfSwge30pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbGlua3M7XG4gICAgfSxcbiAgICBzdHJpbmdpZnk6IGZ1bmN0aW9uIChwYXJhbXMpIHtcbiAgICAgIHZhciBncm91cGVkID0gT2JqZWN0LmtleXMocGFyYW1zKS5yZWR1Y2UoZnVuY3Rpb24oZ3JvdXBlZCwga2V5KSB7XG4gICAgICAgIGdyb3VwZWRbcGFyYW1zW2tleV1dID0gZ3JvdXBlZFtwYXJhbXNba2V5XV0gfHwgW107XG4gICAgICAgIGdyb3VwZWRbcGFyYW1zW2tleV1dLnB1c2goa2V5KTtcbiAgICAgICAgcmV0dXJuIGdyb3VwZWQ7XG4gICAgICB9LCB7fSk7XG5cbiAgICAgIHZhciBlbnRyaWVzID0gT2JqZWN0LmtleXMoZ3JvdXBlZCkucmVkdWNlKGZ1bmN0aW9uKHJlc3VsdCwgbGluaykge1xuICAgICAgICByZXR1cm4gcmVzdWx0LmNvbmNhdCgnPCcgKyBsaW5rICsgJz47IHJlbD1cIicgKyBncm91cGVkW2xpbmtdLmpvaW4oJyAnKSArICdcIicpO1xuICAgICAgfSwgW10pO1xuXG4gICAgICByZXR1cm4gZW50cmllcy5qb2luKCcsICcpO1xuICAgIH1cbiAgfTtcblxufSwgdGhpcyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciByZXBsYWNlID0gU3RyaW5nLnByb3RvdHlwZS5yZXBsYWNlO1xudmFyIHBlcmNlbnRUd2VudGllcyA9IC8lMjAvZztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgJ2RlZmF1bHQnOiAnUkZDMzk4NicsXG4gICAgZm9ybWF0dGVyczoge1xuICAgICAgICBSRkMxNzM4OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiByZXBsYWNlLmNhbGwodmFsdWUsIHBlcmNlbnRUd2VudGllcywgJysnKTtcbiAgICAgICAgfSxcbiAgICAgICAgUkZDMzk4NjogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9LFxuICAgIFJGQzE3Mzg6ICdSRkMxNzM4JyxcbiAgICBSRkMzOTg2OiAnUkZDMzk4Nidcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBzdHJpbmdpZnkgPSByZXF1aXJlKCcuL3N0cmluZ2lmeScpO1xudmFyIHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZm9ybWF0czogZm9ybWF0cyxcbiAgICBwYXJzZTogcGFyc2UsXG4gICAgc3RyaW5naWZ5OiBzdHJpbmdpZnlcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhbGxvd0RvdHM6IGZhbHNlLFxuICAgIGFsbG93UHJvdG90eXBlczogZmFsc2UsXG4gICAgYXJyYXlMaW1pdDogMjAsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGNvbW1hOiBmYWxzZSxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgaWdub3JlUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGludGVycHJldE51bWVyaWNFbnRpdGllczogZmFsc2UsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGFyc2VBcnJheXM6IHRydWUsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHJldHVybiBzdHIucmVwbGFjZSgvJiMoXFxkKyk7L2csIGZ1bmN0aW9uICgkMCwgbnVtYmVyU3RyKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KG51bWJlclN0ciwgMTApKTtcbiAgICB9KTtcbn07XG5cbi8vIFRoaXMgaXMgd2hhdCBicm93c2VycyB3aWxsIHN1Ym1pdCB3aGVuIHRoZSDinJMgY2hhcmFjdGVyIG9jY3VycyBpbiBhblxuLy8gYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkIGJvZHkgYW5kIHRoZSBlbmNvZGluZyBvZiB0aGUgcGFnZSBjb250YWluaW5nXG4vLyB0aGUgZm9ybSBpcyBpc28tODg1OS0xLCBvciB3aGVuIHRoZSBzdWJtaXR0ZWQgZm9ybSBoYXMgYW4gYWNjZXB0LWNoYXJzZXRcbi8vIGF0dHJpYnV0ZSBvZiBpc28tODg1OS0xLiBQcmVzdW1hYmx5IGFsc28gd2l0aCBvdGhlciBjaGFyc2V0cyB0aGF0IGRvIG5vdCBjb250YWluXG4vLyB0aGUg4pyTIGNoYXJhY3Rlciwgc3VjaCBhcyB1cy1hc2NpaS5cbnZhciBpc29TZW50aW5lbCA9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCcmIzEwMDAzOycpXG5cbi8vIFRoZXNlIGFyZSB0aGUgcGVyY2VudC1lbmNvZGVkIHV0Zi04IG9jdGV0cyByZXByZXNlbnRpbmcgYSBjaGVja21hcmssIGluZGljYXRpbmcgdGhhdCB0aGUgcmVxdWVzdCBhY3R1YWxseSBpcyB1dGYtOCBlbmNvZGVkLlxudmFyIGNoYXJzZXRTZW50aW5lbCA9ICd1dGY4PSVFMiU5QyU5Myc7IC8vIGVuY29kZVVSSUNvbXBvbmVudCgn4pyTJylcblxudmFyIHBhcnNlVmFsdWVzID0gZnVuY3Rpb24gcGFyc2VRdWVyeVN0cmluZ1ZhbHVlcyhzdHIsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0ge307XG4gICAgdmFyIGNsZWFuU3RyID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA/IHN0ci5yZXBsYWNlKC9eXFw/LywgJycpIDogc3RyO1xuICAgIHZhciBsaW1pdCA9IG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPT09IEluZmluaXR5ID8gdW5kZWZpbmVkIDogb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdDtcbiAgICB2YXIgcGFydHMgPSBjbGVhblN0ci5zcGxpdChvcHRpb25zLmRlbGltaXRlciwgbGltaXQpO1xuICAgIHZhciBza2lwSW5kZXggPSAtMTsgLy8gS2VlcCB0cmFjayBvZiB3aGVyZSB0aGUgdXRmOCBzZW50aW5lbCB3YXMgZm91bmRcbiAgICB2YXIgaTtcblxuICAgIHZhciBjaGFyc2V0ID0gb3B0aW9ucy5jaGFyc2V0O1xuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgcGFydHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGlmIChwYXJ0c1tpXS5pbmRleE9mKCd1dGY4PScpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcnRzW2ldID09PSBjaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICd1dGYtOCc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChwYXJ0c1tpXSA9PT0gaXNvU2VudGluZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY2hhcnNldCA9ICdpc28tODg1OS0xJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2tpcEluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBpID0gcGFydHMubGVuZ3RoOyAvLyBUaGUgZXNsaW50IHNldHRpbmdzIGRvIG5vdCBhbGxvdyBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAoaSA9PT0gc2tpcEluZGV4KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFydCA9IHBhcnRzW2ldO1xuXG4gICAgICAgIHZhciBicmFja2V0RXF1YWxzUG9zID0gcGFydC5pbmRleE9mKCddPScpO1xuICAgICAgICB2YXIgcG9zID0gYnJhY2tldEVxdWFsc1BvcyA9PT0gLTEgPyBwYXJ0LmluZGV4T2YoJz0nKSA6IGJyYWNrZXRFcXVhbHNQb3MgKyAxO1xuXG4gICAgICAgIHZhciBrZXksIHZhbDtcbiAgICAgICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgICAgICAgIGtleSA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nID8gbnVsbCA6ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQuc2xpY2UoMCwgcG9zKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICB2YWwgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZShwb3MgKyAxKSwgZGVmYXVsdHMuZGVjb2RlciwgY2hhcnNldCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmIG9wdGlvbnMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzICYmIGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAgICAgdmFsID0gaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzKHZhbCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsICYmIG9wdGlvbnMuY29tbWEgJiYgdmFsLmluZGV4T2YoJywnKSA+IC0xKSB7XG4gICAgICAgICAgICB2YWwgPSB2YWwuc3BsaXQoJywnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChoYXMuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdXRpbHMuY29tYmluZShvYmpba2V5XSwgdmFsKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBwYXJzZU9iamVjdCA9IGZ1bmN0aW9uIChjaGFpbiwgdmFsLCBvcHRpb25zKSB7XG4gICAgdmFyIGxlYWYgPSB2YWw7XG5cbiAgICBmb3IgKHZhciBpID0gY2hhaW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIG9iajtcbiAgICAgICAgdmFyIHJvb3QgPSBjaGFpbltpXTtcblxuICAgICAgICBpZiAocm9vdCA9PT0gJ1tdJyAmJiBvcHRpb25zLnBhcnNlQXJyYXlzKSB7XG4gICAgICAgICAgICBvYmogPSBbXS5jb25jYXQobGVhZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICAgICAgICAgIHZhciBjbGVhblJvb3QgPSByb290LmNoYXJBdCgwKSA9PT0gJ1snICYmIHJvb3QuY2hhckF0KHJvb3QubGVuZ3RoIC0gMSkgPT09ICddJyA/IHJvb3Quc2xpY2UoMSwgLTEpIDogcm9vdDtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IHBhcnNlSW50KGNsZWFuUm9vdCwgMTApO1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnBhcnNlQXJyYXlzICYmIGNsZWFuUm9vdCA9PT0gJycpIHtcbiAgICAgICAgICAgICAgICBvYmogPSB7IDA6IGxlYWYgfTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXMgdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG52YXIgbm9ybWFsaXplUGFyc2VPcHRpb25zID0gZnVuY3Rpb24gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmRlY29kZXIgIT09IG51bGwgJiYgb3B0cy5kZWNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZGVjb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdEZWNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb3B0cy5jaGFyc2V0ICE9PSAndW5kZWZpbmVkJyAmJiBvcHRzLmNoYXJzZXQgIT09ICd1dGYtOCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cbiAgICB2YXIgY2hhcnNldCA9IHR5cGVvZiBvcHRzLmNoYXJzZXQgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuY2hhcnNldCA6IG9wdHMuY2hhcnNldDtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGFsbG93UHJvdG90eXBlczogdHlwZW9mIG9wdHMuYWxsb3dQcm90b3R5cGVzID09PSAnYm9vbGVhbicgPyBvcHRzLmFsbG93UHJvdG90eXBlcyA6IGRlZmF1bHRzLmFsbG93UHJvdG90eXBlcyxcbiAgICAgICAgYXJyYXlMaW1pdDogdHlwZW9mIG9wdHMuYXJyYXlMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLmFycmF5TGltaXQgOiBkZWZhdWx0cy5hcnJheUxpbWl0LFxuICAgICAgICBjaGFyc2V0OiBjaGFyc2V0LFxuICAgICAgICBjaGFyc2V0U2VudGluZWw6IHR5cGVvZiBvcHRzLmNoYXJzZXRTZW50aW5lbCA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jaGFyc2V0U2VudGluZWwgOiBkZWZhdWx0cy5jaGFyc2V0U2VudGluZWwsXG4gICAgICAgIGNvbW1hOiB0eXBlb2Ygb3B0cy5jb21tYSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5jb21tYSA6IGRlZmF1bHRzLmNvbW1hLFxuICAgICAgICBkZWNvZGVyOiB0eXBlb2Ygb3B0cy5kZWNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5kZWNvZGVyIDogZGVmYXVsdHMuZGVjb2RlcixcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICdzdHJpbmcnIHx8IHV0aWxzLmlzUmVnRXhwKG9wdHMuZGVsaW1pdGVyKSA/IG9wdHMuZGVsaW1pdGVyIDogZGVmYXVsdHMuZGVsaW1pdGVyLFxuICAgICAgICBkZXB0aDogdHlwZW9mIG9wdHMuZGVwdGggPT09ICdudW1iZXInID8gb3B0cy5kZXB0aCA6IGRlZmF1bHRzLmRlcHRoLFxuICAgICAgICBpZ25vcmVRdWVyeVByZWZpeDogb3B0cy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZSxcbiAgICAgICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiB0eXBlb2Ygb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgPT09ICdib29sZWFuJyA/IG9wdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzIDogZGVmYXVsdHMuaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzLFxuICAgICAgICBwYXJhbWV0ZXJMaW1pdDogdHlwZW9mIG9wdHMucGFyYW1ldGVyTGltaXQgPT09ICdudW1iZXInID8gb3B0cy5wYXJhbWV0ZXJMaW1pdCA6IGRlZmF1bHRzLnBhcmFtZXRlckxpbWl0LFxuICAgICAgICBwYXJzZUFycmF5czogb3B0cy5wYXJzZUFycmF5cyAhPT0gZmFsc2UsXG4gICAgICAgIHBsYWluT2JqZWN0czogdHlwZW9mIG9wdHMucGxhaW5PYmplY3RzID09PSAnYm9vbGVhbicgPyBvcHRzLnBsYWluT2JqZWN0cyA6IGRlZmF1bHRzLnBsYWluT2JqZWN0cyxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKHN0ciwgb3B0cykge1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplUGFyc2VPcHRpb25zKG9wdHMpO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgYXJyYXlQcmVmaXhHZW5lcmF0b3JzID0ge1xuICAgIGJyYWNrZXRzOiBmdW5jdGlvbiBicmFja2V0cyhwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbXSc7XG4gICAgfSxcbiAgICBjb21tYTogJ2NvbW1hJyxcbiAgICBpbmRpY2VzOiBmdW5jdGlvbiBpbmRpY2VzKHByZWZpeCwga2V5KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnWycgKyBrZXkgKyAnXSc7XG4gICAgfSxcbiAgICByZXBlYXQ6IGZ1bmN0aW9uIHJlcGVhdChwcmVmaXgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeDtcbiAgICB9XG59O1xuXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG52YXIgcHVzaCA9IEFycmF5LnByb3RvdHlwZS5wdXNoO1xudmFyIHB1c2hUb0FycmF5ID0gZnVuY3Rpb24gKGFyciwgdmFsdWVPckFycmF5KSB7XG4gICAgcHVzaC5hcHBseShhcnIsIGlzQXJyYXkodmFsdWVPckFycmF5KSA/IHZhbHVlT3JBcnJheSA6IFt2YWx1ZU9yQXJyYXldKTtcbn07XG5cbnZhciB0b0lTTyA9IERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nO1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gICAgYWRkUXVlcnlQcmVmaXg6IGZhbHNlLFxuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgY2hhcnNldDogJ3V0Zi04JyxcbiAgICBjaGFyc2V0U2VudGluZWw6IGZhbHNlLFxuICAgIGRlbGltaXRlcjogJyYnLFxuICAgIGVuY29kZTogdHJ1ZSxcbiAgICBlbmNvZGVyOiB1dGlscy5lbmNvZGUsXG4gICAgZW5jb2RlVmFsdWVzT25seTogZmFsc2UsXG4gICAgZm9ybWF0dGVyOiBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0c1snZGVmYXVsdCddXSxcbiAgICAvLyBkZXByZWNhdGVkXG4gICAgaW5kaWNlczogZmFsc2UsXG4gICAgc2VyaWFsaXplRGF0ZTogZnVuY3Rpb24gc2VyaWFsaXplRGF0ZShkYXRlKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiB0b0lTTy5jYWxsKGRhdGUpO1xuICAgIH0sXG4gICAgc2tpcE51bGxzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgc3RyaW5naWZ5ID0gZnVuY3Rpb24gc3RyaW5naWZ5KCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgIG9iamVjdCxcbiAgICBwcmVmaXgsXG4gICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgc2tpcE51bGxzLFxuICAgIGVuY29kZXIsXG4gICAgZmlsdGVyLFxuICAgIHNvcnQsXG4gICAgYWxsb3dEb3RzLFxuICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgZm9ybWF0dGVyLFxuICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgY2hhcnNldFxuKSB7XG4gICAgdmFyIG9iaiA9IG9iamVjdDtcbiAgICBpZiAodHlwZW9mIGZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBvYmogPSBmaWx0ZXIocHJlZml4LCBvYmopO1xuICAgIH0gZWxzZSBpZiAob2JqIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgICBvYmogPSBzZXJpYWxpemVEYXRlKG9iaik7XG4gICAgfSBlbHNlIGlmIChnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnY29tbWEnICYmIGlzQXJyYXkob2JqKSkge1xuICAgICAgICBvYmogPSBvYmouam9pbignLCcpO1xuICAgIH1cblxuICAgIGlmIChvYmogPT09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0cmljdE51bGxIYW5kbGluZykge1xuICAgICAgICAgICAgcmV0dXJuIGVuY29kZXIgJiYgIWVuY29kZVZhbHVlc09ubHkgPyBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkgOiBwcmVmaXg7XG4gICAgICAgIH1cblxuICAgICAgICBvYmogPSAnJztcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIG9iaiA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIG9iaiA9PT0gJ251bWJlcicgfHwgdHlwZW9mIG9iaiA9PT0gJ2Jvb2xlYW4nIHx8IHV0aWxzLmlzQnVmZmVyKG9iaikpIHtcbiAgICAgICAgaWYgKGVuY29kZXIpIHtcbiAgICAgICAgICAgIHZhciBrZXlWYWx1ZSA9IGVuY29kZVZhbHVlc09ubHkgPyBwcmVmaXggOiBlbmNvZGVyKHByZWZpeCwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCk7XG4gICAgICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihrZXlWYWx1ZSkgKyAnPScgKyBmb3JtYXR0ZXIoZW5jb2RlcihvYmosIGRlZmF1bHRzLmVuY29kZXIsIGNoYXJzZXQpKV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtmb3JtYXR0ZXIocHJlZml4KSArICc9JyArIGZvcm1hdHRlcihTdHJpbmcob2JqKSldO1xuICAgIH1cblxuICAgIHZhciB2YWx1ZXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgIH1cblxuICAgIHZhciBvYmpLZXlzO1xuICAgIGlmIChpc0FycmF5KGZpbHRlcikpIHtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIG9iaktleXMgPSBzb3J0ID8ga2V5cy5zb3J0KHNvcnQpIDoga2V5cztcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKHNraXBOdWxscyAmJiBvYmpba2V5XSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICB0eXBlb2YgZ2VuZXJhdGVBcnJheVByZWZpeCA9PT0gJ2Z1bmN0aW9uJyA/IGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpIDogcHJlZml4LFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgICAgIGNoYXJzZXRcbiAgICAgICAgICAgICkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHVzaFRvQXJyYXkodmFsdWVzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICAgICAgb2JqW2tleV0sXG4gICAgICAgICAgICAgICAgcHJlZml4ICsgKGFsbG93RG90cyA/ICcuJyArIGtleSA6ICdbJyArIGtleSArICddJyksXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsdWVzO1xufTtcblxudmFyIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpIHtcbiAgICBpZiAoIW9wdHMpIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRzO1xuICAgIH1cblxuICAgIGlmIChvcHRzLmVuY29kZXIgIT09IG51bGwgJiYgb3B0cy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdHMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBjaGFyc2V0ID0gb3B0cy5jaGFyc2V0IHx8IGRlZmF1bHRzLmNoYXJzZXQ7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdUaGUgY2hhcnNldCBvcHRpb24gbXVzdCBiZSBlaXRoZXIgdXRmLTgsIGlzby04ODU5LTEsIG9yIHVuZGVmaW5lZCcpO1xuICAgIH1cblxuICAgIHZhciBmb3JtYXQgPSBmb3JtYXRzWydkZWZhdWx0J107XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZvcm1hdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKCFoYXMuY2FsbChmb3JtYXRzLmZvcm1hdHRlcnMsIG9wdHMuZm9ybWF0KSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdCA9IG9wdHMuZm9ybWF0O1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW2Zvcm1hdF07XG5cbiAgICB2YXIgZmlsdGVyID0gZGVmYXVsdHMuZmlsdGVyO1xuICAgIGlmICh0eXBlb2Ygb3B0cy5maWx0ZXIgPT09ICdmdW5jdGlvbicgfHwgaXNBcnJheShvcHRzLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0cy5maWx0ZXI7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWRkUXVlcnlQcmVmaXg6IHR5cGVvZiBvcHRzLmFkZFF1ZXJ5UHJlZml4ID09PSAnYm9vbGVhbicgPyBvcHRzLmFkZFF1ZXJ5UHJlZml4IDogZGVmYXVsdHMuYWRkUXVlcnlQcmVmaXgsXG4gICAgICAgIGFsbG93RG90czogdHlwZW9mIG9wdHMuYWxsb3dEb3RzID09PSAndW5kZWZpbmVkJyA/IGRlZmF1bHRzLmFsbG93RG90cyA6ICEhb3B0cy5hbGxvd0RvdHMsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgZGVsaW1pdGVyOiB0eXBlb2Ygb3B0cy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGVuY29kZTogdHlwZW9mIG9wdHMuZW5jb2RlID09PSAnYm9vbGVhbicgPyBvcHRzLmVuY29kZSA6IGRlZmF1bHRzLmVuY29kZSxcbiAgICAgICAgZW5jb2RlcjogdHlwZW9mIG9wdHMuZW5jb2RlciA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuZW5jb2RlciA6IGRlZmF1bHRzLmVuY29kZXIsXG4gICAgICAgIGVuY29kZVZhbHVlc09ubHk6IHR5cGVvZiBvcHRzLmVuY29kZVZhbHVlc09ubHkgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlVmFsdWVzT25seSA6IGRlZmF1bHRzLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgIGZpbHRlcjogZmlsdGVyLFxuICAgICAgICBmb3JtYXR0ZXI6IGZvcm1hdHRlcixcbiAgICAgICAgc2VyaWFsaXplRGF0ZTogdHlwZW9mIG9wdHMuc2VyaWFsaXplRGF0ZSA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc2VyaWFsaXplRGF0ZSA6IGRlZmF1bHRzLnNlcmlhbGl6ZURhdGUsXG4gICAgICAgIHNraXBOdWxsczogdHlwZW9mIG9wdHMuc2tpcE51bGxzID09PSAnYm9vbGVhbicgPyBvcHRzLnNraXBOdWxscyA6IGRlZmF1bHRzLnNraXBOdWxscyxcbiAgICAgICAgc29ydDogdHlwZW9mIG9wdHMuc29ydCA9PT0gJ2Z1bmN0aW9uJyA/IG9wdHMuc29ydCA6IG51bGwsXG4gICAgICAgIHN0cmljdE51bGxIYW5kbGluZzogdHlwZW9mIG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nID09PSAnYm9vbGVhbicgPyBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA6IGRlZmF1bHRzLnN0cmljdE51bGxIYW5kbGluZ1xuICAgIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyhvcHRzKTtcblxuICAgIHZhciBvYmpLZXlzO1xuICAgIHZhciBmaWx0ZXI7XG5cbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmogPSBmaWx0ZXIoJycsIG9iaik7XG4gICAgfSBlbHNlIGlmIChpc0FycmF5KG9wdGlvbnMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqS2V5cyA9IGZpbHRlcjtcbiAgICB9XG5cbiAgICB2YXIga2V5cyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfVxuXG4gICAgdmFyIGFycmF5Rm9ybWF0O1xuICAgIGlmIChvcHRzICYmIG9wdHMuYXJyYXlGb3JtYXQgaW4gYXJyYXlQcmVmaXhHZW5lcmF0b3JzKSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gb3B0cy5hcnJheUZvcm1hdDtcbiAgICB9IGVsc2UgaWYgKG9wdHMgJiYgJ2luZGljZXMnIGluIG9wdHMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMuc29ydCkge1xuICAgICAgICBvYmpLZXlzLnNvcnQob3B0aW9ucy5zb3J0KTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iaktleXMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGtleSA9IG9iaktleXNbaV07XG5cbiAgICAgICAgaWYgKG9wdGlvbnMuc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBwdXNoVG9BcnJheShrZXlzLCBzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2tpcE51bGxzLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGUgPyBvcHRpb25zLmVuY29kZXIgOiBudWxsLFxuICAgICAgICAgICAgb3B0aW9ucy5maWx0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLnNvcnQsXG4gICAgICAgICAgICBvcHRpb25zLmFsbG93RG90cyxcbiAgICAgICAgICAgIG9wdGlvbnMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgIG9wdGlvbnMuZm9ybWF0dGVyLFxuICAgICAgICAgICAgb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5LFxuICAgICAgICAgICAgb3B0aW9ucy5jaGFyc2V0XG4gICAgICAgICkpO1xuICAgIH1cblxuICAgIHZhciBqb2luZWQgPSBrZXlzLmpvaW4ob3B0aW9ucy5kZWxpbWl0ZXIpO1xuICAgIHZhciBwcmVmaXggPSBvcHRpb25zLmFkZFF1ZXJ5UHJlZml4ID09PSB0cnVlID8gJz8nIDogJyc7XG5cbiAgICBpZiAob3B0aW9ucy5jaGFyc2V0U2VudGluZWwpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMuY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JyksIHRoZSBcIm51bWVyaWMgZW50aXR5XCIgcmVwcmVzZW50YXRpb24gb2YgYSBjaGVja21hcmtcbiAgICAgICAgICAgIHByZWZpeCArPSAndXRmOD0lMjYlMjMxMDAwMyUzQiYnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSVFMiU5QyU5MyYnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGpvaW5lZC5sZW5ndGggPiAwID8gcHJlZml4ICsgam9pbmVkIDogJyc7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxudmFyIGhleFRhYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYXJyYXkgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDI1NjsgKytpKSB7XG4gICAgICAgIGFycmF5LnB1c2goJyUnICsgKChpIDwgMTYgPyAnMCcgOiAnJykgKyBpLnRvU3RyaW5nKDE2KSkudG9VcHBlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycmF5O1xufSgpKTtcblxudmFyIGNvbXBhY3RRdWV1ZSA9IGZ1bmN0aW9uIGNvbXBhY3RRdWV1ZShxdWV1ZSkge1xuICAgIHdoaWxlIChxdWV1ZS5sZW5ndGggPiAxKSB7XG4gICAgICAgIHZhciBpdGVtID0gcXVldWUucG9wKCk7XG4gICAgICAgIHZhciBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG52YXIgYXJyYXlUb09iamVjdCA9IGZ1bmN0aW9uIGFycmF5VG9PYmplY3Qoc291cmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIG9iaiA9IG9wdGlvbnMgJiYgb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzb3VyY2UubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBzb3VyY2VbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBvYmpbaV0gPSBzb3VyY2VbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIG1lcmdlID0gZnVuY3Rpb24gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygc291cmNlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICBpZiAoaXNBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0YXJnZXQucHVzaChzb3VyY2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRhcmdldCAmJiB0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKChvcHRpb25zICYmIChvcHRpb25zLnBsYWluT2JqZWN0cyB8fCBvcHRpb25zLmFsbG93UHJvdG90eXBlcykpIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICghdGFyZ2V0IHx8IHR5cGVvZiB0YXJnZXQgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBbdGFyZ2V0XS5jb25jYXQoc291cmNlKTtcbiAgICB9XG5cbiAgICB2YXIgbWVyZ2VUYXJnZXQgPSB0YXJnZXQ7XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiAhaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIG1lcmdlVGFyZ2V0ID0gYXJyYXlUb09iamVjdCh0YXJnZXQsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChpc0FycmF5KHRhcmdldCkgJiYgaXNBcnJheShzb3VyY2UpKSB7XG4gICAgICAgIHNvdXJjZS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpKSB7XG4gICAgICAgICAgICBpZiAoaGFzLmNhbGwodGFyZ2V0LCBpKSkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRJdGVtID0gdGFyZ2V0W2ldO1xuICAgICAgICAgICAgICAgIGlmICh0YXJnZXRJdGVtICYmIHR5cGVvZiB0YXJnZXRJdGVtID09PSAnb2JqZWN0JyAmJiBpdGVtICYmIHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBtZXJnZSh0YXJnZXRJdGVtLCBpdGVtLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQucHVzaChpdGVtKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IGl0ZW07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gc291cmNlW2tleV07XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKGFjYywga2V5KSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBtZXJnZShhY2Nba2V5XSwgdmFsdWUsIG9wdGlvbnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWNjW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIG1lcmdlVGFyZ2V0KTtcbn07XG5cbnZhciBhc3NpZ24gPSBmdW5jdGlvbiBhc3NpZ25TaW5nbGVTb3VyY2UodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIGFjY1trZXldID0gc291cmNlW2tleV07XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgdGFyZ2V0KTtcbn07XG5cbnZhciBkZWNvZGUgPSBmdW5jdGlvbiAoc3RyLCBkZWNvZGVyLCBjaGFyc2V0KSB7XG4gICAgdmFyIHN0cldpdGhvdXRQbHVzID0gc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpO1xuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgLy8gdW5lc2NhcGUgbmV2ZXIgdGhyb3dzLCBubyB0cnkuLi5jYXRjaCBuZWVkZWQ6XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cy5yZXBsYWNlKC8lWzAtOWEtZl17Mn0vZ2ksIHVuZXNjYXBlKTtcbiAgICB9XG4gICAgLy8gdXRmLThcbiAgICB0cnkge1xuICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KHN0cldpdGhvdXRQbHVzKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHJXaXRob3V0UGx1cztcbiAgICB9XG59O1xuXG52YXIgZW5jb2RlID0gZnVuY3Rpb24gZW5jb2RlKHN0ciwgZGVmYXVsdEVuY29kZXIsIGNoYXJzZXQpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICBpZiAoY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHJldHVybiBlc2NhcGUoc3RyaW5nKS5yZXBsYWNlKC8ldVswLTlhLWZdezR9L2dpLCBmdW5jdGlvbiAoJDApIHtcbiAgICAgICAgICAgIHJldHVybiAnJTI2JTIzJyArIHBhcnNlSW50KCQwLnNsaWNlKDIpLCAxNikgKyAnJTNCJztcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIG91dCA9ICcnO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyaW5nLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBjID0gc3RyaW5nLmNoYXJDb2RlQXQoaSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYyA9PT0gMHgyRCAvLyAtXG4gICAgICAgICAgICB8fCBjID09PSAweDJFIC8vIC5cbiAgICAgICAgICAgIHx8IGMgPT09IDB4NUYgLy8gX1xuICAgICAgICAgICAgfHwgYyA9PT0gMHg3RSAvLyB+XG4gICAgICAgICAgICB8fCAoYyA+PSAweDMwICYmIGMgPD0gMHgzOSkgLy8gMC05XG4gICAgICAgICAgICB8fCAoYyA+PSAweDQxICYmIGMgPD0gMHg1QSkgLy8gYS16XG4gICAgICAgICAgICB8fCAoYyA+PSAweDYxICYmIGMgPD0gMHg3QSkgLy8gQS1aXG4gICAgICAgICkge1xuICAgICAgICAgICAgb3V0ICs9IHN0cmluZy5jaGFyQXQoaSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgaGV4VGFibGVbY107XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjIDwgMHg4MDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEMwIHwgKGMgPj4gNildICsgaGV4VGFibGVbMHg4MCB8IChjICYgMHgzRildKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweEQ4MDAgfHwgYyA+PSAweEUwMDApIHtcbiAgICAgICAgICAgIG91dCA9IG91dCArIChoZXhUYWJsZVsweEUwIHwgKGMgPj4gMTIpXSArIGhleFRhYmxlWzB4ODAgfCAoKGMgPj4gNikgJiAweDNGKV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpICs9IDE7XG4gICAgICAgIGMgPSAweDEwMDAwICsgKCgoYyAmIDB4M0ZGKSA8PCAxMCkgfCAoc3RyaW5nLmNoYXJDb2RlQXQoaSkgJiAweDNGRikpO1xuICAgICAgICBvdXQgKz0gaGV4VGFibGVbMHhGMCB8IChjID4+IDE4KV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiAxMikgJiAweDNGKV1cbiAgICAgICAgICAgICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV07XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG5cbnZhciBjb21wYWN0ID0gZnVuY3Rpb24gY29tcGFjdCh2YWx1ZSkge1xuICAgIHZhciBxdWV1ZSA9IFt7IG9iajogeyBvOiB2YWx1ZSB9LCBwcm9wOiAnbycgfV07XG4gICAgdmFyIHJlZnMgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVldWUubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZVtpXTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhvYmopO1xuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGtleXMubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzW2pdO1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9ialtrZXldO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWwgPT09ICdvYmplY3QnICYmIHZhbCAhPT0gbnVsbCAmJiByZWZzLmluZGV4T2YodmFsKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBxdWV1ZS5wdXNoKHsgb2JqOiBvYmosIHByb3A6IGtleSB9KTtcbiAgICAgICAgICAgICAgICByZWZzLnB1c2godmFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG5cbiAgICByZXR1cm4gdmFsdWU7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShvYmouY29uc3RydWN0b3IgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopKTtcbn07XG5cbnZhciBjb21iaW5lID0gZnVuY3Rpb24gY29tYmluZShhLCBiKSB7XG4gICAgcmV0dXJuIFtdLmNvbmNhdChhLCBiKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGFycmF5VG9PYmplY3Q6IGFycmF5VG9PYmplY3QsXG4gICAgYXNzaWduOiBhc3NpZ24sXG4gICAgY29tYmluZTogY29tYmluZSxcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwiZnVuY3Rpb24gQWdlbnQoKSB7XG4gIHRoaXMuX2RlZmF1bHRzID0gW107XG59XG5cbltcInVzZVwiLCBcIm9uXCIsIFwib25jZVwiLCBcInNldFwiLCBcInF1ZXJ5XCIsIFwidHlwZVwiLCBcImFjY2VwdFwiLCBcImF1dGhcIiwgXCJ3aXRoQ3JlZGVudGlhbHNcIiwgXCJzb3J0UXVlcnlcIiwgXCJyZXRyeVwiLCBcIm9rXCIsIFwicmVkaXJlY3RzXCIsXG4gXCJ0aW1lb3V0XCIsIFwiYnVmZmVyXCIsIFwic2VyaWFsaXplXCIsIFwicGFyc2VcIiwgXCJjYVwiLCBcImtleVwiLCBcInBmeFwiLCBcImNlcnRcIl0uZm9yRWFjaChmbiA9PiB7XG4gIC8qKiBEZWZhdWx0IHNldHRpbmcgZm9yIGFsbCByZXF1ZXN0cyBmcm9tIHRoaXMgYWdlbnQgKi9cbiAgQWdlbnQucHJvdG90eXBlW2ZuXSA9IGZ1bmN0aW9uKC4uLmFyZ3MpIHtcbiAgICB0aGlzLl9kZWZhdWx0cy5wdXNoKHtmbiwgYXJnc30pO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG59KTtcblxuQWdlbnQucHJvdG90eXBlLl9zZXREZWZhdWx0cyA9IGZ1bmN0aW9uKHJlcSkge1xuICAgIHRoaXMuX2RlZmF1bHRzLmZvckVhY2goZGVmID0+IHtcbiAgICAgIHJlcVtkZWYuZm5dLmFwcGx5KHJlcSwgZGVmLmFyZ3MpO1xuICAgIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBBZ2VudDtcbiIsIi8qKlxuICogUm9vdCByZWZlcmVuY2UgZm9yIGlmcmFtZXMuXG4gKi9cblxubGV0IHJvb3Q7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gQnJvd3NlciB3aW5kb3dcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnKSB7IC8vIFdlYiBXb3JrZXJcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgeyAvLyBPdGhlciBlbnZpcm9ubWVudHNcbiAgY29uc29sZS53YXJuKFwiVXNpbmcgYnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBpbiBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcbiAgcm9vdCA9IHRoaXM7XG59XG5cbmNvbnN0IEVtaXR0ZXIgPSByZXF1aXJlKCdjb21wb25lbnQtZW1pdHRlcicpO1xuY29uc3QgUmVxdWVzdEJhc2UgPSByZXF1aXJlKCcuL3JlcXVlc3QtYmFzZScpO1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuY29uc3QgUmVzcG9uc2VCYXNlID0gcmVxdWlyZSgnLi9yZXNwb25zZS1iYXNlJyk7XG5jb25zdCBBZ2VudCA9IHJlcXVpcmUoJy4vYWdlbnQtYmFzZScpO1xuXG4vKipcbiAqIE5vb3AuXG4gKi9cblxuZnVuY3Rpb24gbm9vcCgpe307XG5cbi8qKlxuICogRXhwb3NlIGByZXF1ZXN0YC5cbiAqL1xuXG5jb25zdCByZXF1ZXN0ID0gZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obWV0aG9kLCB1cmwpIHtcbiAgLy8gY2FsbGJhY2tcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIHVybCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpLmVuZCh1cmwpO1xuICB9XG5cbiAgLy8gdXJsIGZpcnN0XG4gIGlmICgxID09IGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUmVxdWVzdCgnR0VUJywgbWV0aG9kKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbn07XG5cbmV4cG9ydHMuUmVxdWVzdCA9IFJlcXVlc3Q7XG5cbi8qKlxuICogRGV0ZXJtaW5lIFhIUi5cbiAqL1xuXG5yZXF1ZXN0LmdldFhIUiA9ICgpID0+IHtcbiAgaWYgKHJvb3QuWE1MSHR0cFJlcXVlc3RcbiAgICAgICYmICghcm9vdC5sb2NhdGlvbiB8fCAnZmlsZTonICE9IHJvb3QubG9jYXRpb24ucHJvdG9jb2xcbiAgICAgICAgICB8fCAhcm9vdC5BY3RpdmVYT2JqZWN0KSkge1xuICAgIHJldHVybiBuZXcgWE1MSHR0cFJlcXVlc3Q7XG4gIH0gZWxzZSB7XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNaWNyb3NvZnQuWE1MSFRUUCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC42LjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAuMy4wJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgfVxuICB0aHJvdyBFcnJvcihcIkJyb3dzZXItb25seSB2ZXJzaW9uIG9mIHN1cGVyYWdlbnQgY291bGQgbm90IGZpbmQgWEhSXCIpO1xufTtcblxuLyoqXG4gKiBSZW1vdmVzIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UsIGFkZGVkIHRvIHN1cHBvcnQgSUUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHNcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmNvbnN0IHRyaW0gPSAnJy50cmltXG4gID8gcyA9PiBzLnRyaW0oKVxuICA6IHMgPT4gcy5yZXBsYWNlKC8oXlxccyp8XFxzKiQpL2csICcnKTtcblxuLyoqXG4gKiBTZXJpYWxpemUgdGhlIGdpdmVuIGBvYmpgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShvYmopIHtcbiAgaWYgKCFpc09iamVjdChvYmopKSByZXR1cm4gb2JqO1xuICBjb25zdCBwYWlycyA9IFtdO1xuICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCBvYmpba2V5XSk7XG4gIH1cbiAgcmV0dXJuIHBhaXJzLmpvaW4oJyYnKTtcbn1cblxuLyoqXG4gKiBIZWxwcyAnc2VyaWFsaXplJyB3aXRoIHNlcmlhbGl6aW5nIGFycmF5cy5cbiAqIE11dGF0ZXMgdGhlIHBhaXJzIGFycmF5LlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gKiBAcGFyYW0ge01peGVkfSB2YWxcbiAqL1xuXG5mdW5jdGlvbiBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywga2V5LCB2YWwpIHtcbiAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodmFsKSkge1xuICAgICAgdmFsLmZvckVhY2godiA9PiB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHYpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChpc09iamVjdCh2YWwpKSB7XG4gICAgICBmb3IoY29uc3Qgc3Via2V5IGluIHZhbCkge1xuICAgICAgICBwdXNoRW5jb2RlZEtleVZhbHVlUGFpcihwYWlycywgYCR7a2V5fVske3N1YmtleX1dYCwgdmFsW3N1YmtleV0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpXG4gICAgICAgICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KHZhbCkpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh2YWwgPT09IG51bGwpIHtcbiAgICBwYWlycy5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpKTtcbiAgfVxufVxuXG4vKipcbiAqIEV4cG9zZSBzZXJpYWxpemF0aW9uIG1ldGhvZC5cbiAqL1xuXG5yZXF1ZXN0LnNlcmlhbGl6ZU9iamVjdCA9IHNlcmlhbGl6ZTtcblxuLyoqXG4gICogUGFyc2UgdGhlIGdpdmVuIHgtd3d3LWZvcm0tdXJsZW5jb2RlZCBgc3RyYC5cbiAgKlxuICAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICogQGFwaSBwcml2YXRlXG4gICovXG5cbmZ1bmN0aW9uIHBhcnNlU3RyaW5nKHN0cikge1xuICBjb25zdCBvYmogPSB7fTtcbiAgY29uc3QgcGFpcnMgPSBzdHIuc3BsaXQoJyYnKTtcbiAgbGV0IHBhaXI7XG4gIGxldCBwb3M7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHBhaXJzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgcGFpciA9IHBhaXJzW2ldO1xuICAgIHBvcyA9IHBhaXIuaW5kZXhPZignPScpO1xuICAgIGlmIChwb3MgPT0gLTEpIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpcildID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ialtkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZSgwLCBwb3MpKV0gPVxuICAgICAgICBkZWNvZGVVUklDb21wb25lbnQocGFpci5zbGljZShwb3MgKyAxKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG9iajtcbn1cblxuLyoqXG4gKiBFeHBvc2UgcGFyc2VyLlxuICovXG5cbnJlcXVlc3QucGFyc2VTdHJpbmcgPSBwYXJzZVN0cmluZztcblxuLyoqXG4gKiBEZWZhdWx0IE1JTUUgdHlwZSBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICovXG5cbnJlcXVlc3QudHlwZXMgPSB7XG4gIGh0bWw6ICd0ZXh0L2h0bWwnLFxuICBqc29uOiAnYXBwbGljYXRpb24vanNvbicsXG4gIHhtbDogJ3RleHQveG1sJyxcbiAgdXJsZW5jb2RlZDogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXG4gICdmb3JtLWRhdGEnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IHNlcmlhbGl6YXRpb24gbWFwLlxuICpcbiAqICAgICBzdXBlcmFnZW50LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihvYmope1xuICogICAgICAgcmV0dXJuICdnZW5lcmF0ZWQgeG1sIGhlcmUnO1xuICogICAgIH07XG4gKlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogc2VyaWFsaXplLFxuICAnYXBwbGljYXRpb24vanNvbic6IEpTT04uc3RyaW5naWZ5XG59O1xuXG4vKipcbiAgKiBEZWZhdWx0IHBhcnNlcnMuXG4gICpcbiAgKiAgICAgc3VwZXJhZ2VudC5wYXJzZVsnYXBwbGljYXRpb24veG1sJ10gPSBmdW5jdGlvbihzdHIpe1xuICAqICAgICAgIHJldHVybiB7IG9iamVjdCBwYXJzZWQgZnJvbSBzdHIgfTtcbiAgKiAgICAgfTtcbiAgKlxuICAqL1xuXG5yZXF1ZXN0LnBhcnNlID0ge1xuICAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJzogcGFyc2VTdHJpbmcsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5wYXJzZVxufTtcblxuLyoqXG4gKiBQYXJzZSB0aGUgZ2l2ZW4gaGVhZGVyIGBzdHJgIGludG9cbiAqIGFuIG9iamVjdCBjb250YWluaW5nIHRoZSBtYXBwZWQgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIHBhcnNlSGVhZGVyKHN0cikge1xuICBjb25zdCBsaW5lcyA9IHN0ci5zcGxpdCgvXFxyP1xcbi8pO1xuICBjb25zdCBmaWVsZHMgPSB7fTtcbiAgbGV0IGluZGV4O1xuICBsZXQgbGluZTtcbiAgbGV0IGZpZWxkO1xuICBsZXQgdmFsO1xuXG4gIGZvciAobGV0IGkgPSAwLCBsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICBpbmRleCA9IGxpbmUuaW5kZXhPZignOicpO1xuICAgIGlmIChpbmRleCA9PT0gLTEpIHsgLy8gY291bGQgYmUgZW1wdHkgbGluZSwganVzdCBza2lwIGl0XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgZmllbGQgPSBsaW5lLnNsaWNlKDAsIGluZGV4KS50b0xvd2VyQ2FzZSgpO1xuICAgIHZhbCA9IHRyaW0obGluZS5zbGljZShpbmRleCArIDEpKTtcbiAgICBmaWVsZHNbZmllbGRdID0gdmFsO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLyoqXG4gKiBDaGVjayBpZiBgbWltZWAgaXMganNvbiBvciBoYXMgK2pzb24gc3RydWN0dXJlZCBzeW50YXggc3VmZml4LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtaW1lXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNKU09OKG1pbWUpIHtcbiAgLy8gc2hvdWxkIG1hdGNoIC9qc29uIG9yICtqc29uXG4gIC8vIGJ1dCBub3QgL2pzb24tc2VxXG4gIHJldHVybiAvW1xcLytdanNvbigkfFteLVxcd10pLy50ZXN0KG1pbWUpO1xufVxuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlYCB3aXRoIHRoZSBnaXZlbiBgeGhyYC5cbiAqXG4gKiAgLSBzZXQgZmxhZ3MgKC5vaywgLmVycm9yLCBldGMpXG4gKiAgLSBwYXJzZSBoZWFkZXJcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgQWxpYXNpbmcgYHN1cGVyYWdlbnRgIGFzIGByZXF1ZXN0YCBpcyBuaWNlOlxuICpcbiAqICAgICAgcmVxdWVzdCA9IHN1cGVyYWdlbnQ7XG4gKlxuICogIFdlIGNhbiB1c2UgdGhlIHByb21pc2UtbGlrZSBBUEksIG9yIHBhc3MgY2FsbGJhY2tzOlxuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nKS5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqICAgICAgcmVxdWVzdC5nZXQoJy8nLCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBTZW5kaW5nIGRhdGEgY2FuIGJlIGNoYWluZWQ6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIE9yIHBhc3NlZCB0byBgLnNlbmQoKWA6XG4gKlxuICogICAgICByZXF1ZXN0XG4gKiAgICAgICAgLnBvc3QoJy91c2VyJylcbiAqICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAucG9zdCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAuZW5kKGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogT3IgZnVydGhlciByZWR1Y2VkIHRvIGEgc2luZ2xlIGNhbGwgZm9yIHNpbXBsZSBjYXNlczpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInLCB7IG5hbWU6ICd0aicgfSwgZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBAcGFyYW0ge1hNTEhUVFBSZXF1ZXN0fSB4aHJcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZShyZXEpIHtcbiAgdGhpcy5yZXEgPSByZXE7XG4gIHRoaXMueGhyID0gdGhpcy5yZXEueGhyO1xuICAvLyByZXNwb25zZVRleHQgaXMgYWNjZXNzaWJsZSBvbmx5IGlmIHJlc3BvbnNlVHlwZSBpcyAnJyBvciAndGV4dCcgYW5kIG9uIG9sZGVyIGJyb3dzZXJzXG4gIHRoaXMudGV4dCA9ICgodGhpcy5yZXEubWV0aG9kICE9J0hFQUQnICYmICh0aGlzLnhoci5yZXNwb25zZVR5cGUgPT09ICcnIHx8IHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnKSkgfHwgdHlwZW9mIHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJ3VuZGVmaW5lZCcpXG4gICAgID8gdGhpcy54aHIucmVzcG9uc2VUZXh0XG4gICAgIDogbnVsbDtcbiAgdGhpcy5zdGF0dXNUZXh0ID0gdGhpcy5yZXEueGhyLnN0YXR1c1RleHQ7XG4gIGxldCBzdGF0dXMgPSB0aGlzLnhoci5zdGF0dXM7XG4gIC8vIGhhbmRsZSBJRTkgYnVnOiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwMDQ2OTcyL21zaWUtcmV0dXJucy1zdGF0dXMtY29kZS1vZi0xMjIzLWZvci1hamF4LXJlcXVlc3RcbiAgaWYgKHN0YXR1cyA9PT0gMTIyMykge1xuICAgIHN0YXR1cyA9IDIwNDtcbiAgfVxuICB0aGlzLl9zZXRTdGF0dXNQcm9wZXJ0aWVzKHN0YXR1cyk7XG4gIHRoaXMuaGVhZGVyID0gdGhpcy5oZWFkZXJzID0gcGFyc2VIZWFkZXIodGhpcy54aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkpO1xuICAvLyBnZXRBbGxSZXNwb25zZUhlYWRlcnMgc29tZXRpbWVzIGZhbHNlbHkgcmV0dXJucyBcIlwiIGZvciBDT1JTIHJlcXVlc3RzLCBidXRcbiAgLy8gZ2V0UmVzcG9uc2VIZWFkZXIgc3RpbGwgd29ya3MuIHNvIHdlIGdldCBjb250ZW50LXR5cGUgZXZlbiBpZiBnZXR0aW5nXG4gIC8vIG90aGVyIGhlYWRlcnMgZmFpbHMuXG4gIHRoaXMuaGVhZGVyWydjb250ZW50LXR5cGUnXSA9IHRoaXMueGhyLmdldFJlc3BvbnNlSGVhZGVyKCdjb250ZW50LXR5cGUnKTtcbiAgdGhpcy5fc2V0SGVhZGVyUHJvcGVydGllcyh0aGlzLmhlYWRlcik7XG5cbiAgaWYgKG51bGwgPT09IHRoaXMudGV4dCAmJiByZXEuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHRoaXMuYm9keSA9IHRoaXMueGhyLnJlc3BvbnNlO1xuICB9IGVsc2Uge1xuICAgIHRoaXMuYm9keSA9IHRoaXMucmVxLm1ldGhvZCAhPSAnSEVBRCdcbiAgICAgID8gdGhpcy5fcGFyc2VCb2R5KHRoaXMudGV4dCA/IHRoaXMudGV4dCA6IHRoaXMueGhyLnJlc3BvbnNlKVxuICAgICAgOiBudWxsO1xuICB9XG59XG5cblJlc3BvbnNlQmFzZShSZXNwb25zZS5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBib2R5IGBzdHJgLlxuICpcbiAqIFVzZWQgZm9yIGF1dG8tcGFyc2luZyBvZiBib2RpZXMuIFBhcnNlcnNcbiAqIGFyZSBkZWZpbmVkIG9uIHRoZSBgc3VwZXJhZ2VudC5wYXJzZWAgb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge01peGVkfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLl9wYXJzZUJvZHkgPSBmdW5jdGlvbihzdHIpIHtcbiAgbGV0IHBhcnNlID0gcmVxdWVzdC5wYXJzZVt0aGlzLnR5cGVdO1xuICBpZiAodGhpcy5yZXEuX3BhcnNlcikge1xuICAgIHJldHVybiB0aGlzLnJlcS5fcGFyc2VyKHRoaXMsIHN0cik7XG4gIH1cbiAgaWYgKCFwYXJzZSAmJiBpc0pTT04odGhpcy50eXBlKSkge1xuICAgIHBhcnNlID0gcmVxdWVzdC5wYXJzZVsnYXBwbGljYXRpb24vanNvbiddO1xuICB9XG4gIHJldHVybiBwYXJzZSAmJiBzdHIgJiYgKHN0ci5sZW5ndGggfHwgc3RyIGluc3RhbmNlb2YgT2JqZWN0KVxuICAgID8gcGFyc2Uoc3RyKVxuICAgIDogbnVsbDtcbn07XG5cbi8qKlxuICogUmV0dXJuIGFuIGBFcnJvcmAgcmVwcmVzZW50YXRpdmUgb2YgdGhpcyByZXNwb25zZS5cbiAqXG4gKiBAcmV0dXJuIHtFcnJvcn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2UucHJvdG90eXBlLnRvRXJyb3IgPSBmdW5jdGlvbigpe1xuICBjb25zdCByZXEgPSB0aGlzLnJlcTtcbiAgY29uc3QgbWV0aG9kID0gcmVxLm1ldGhvZDtcbiAgY29uc3QgdXJsID0gcmVxLnVybDtcblxuICBjb25zdCBtc2cgPSBgY2Fubm90ICR7bWV0aG9kfSAke3VybH0gKCR7dGhpcy5zdGF0dXN9KWA7XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihtc2cpO1xuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSBtZXRob2Q7XG4gIGVyci51cmwgPSB1cmw7XG5cbiAgcmV0dXJuIGVycjtcbn07XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZWAuXG4gKi9cblxucmVxdWVzdC5SZXNwb25zZSA9IFJlc3BvbnNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlcXVlc3RgIHdpdGggdGhlIGdpdmVuIGBtZXRob2RgIGFuZCBgdXJsYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWV0aG9kXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIFJlcXVlc3QobWV0aG9kLCB1cmwpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIHRoaXMuX3F1ZXJ5ID0gdGhpcy5fcXVlcnkgfHwgW107XG4gIHRoaXMubWV0aG9kID0gbWV0aG9kO1xuICB0aGlzLnVybCA9IHVybDtcbiAgdGhpcy5oZWFkZXIgPSB7fTsgLy8gcHJlc2VydmVzIGhlYWRlciBuYW1lIGNhc2VcbiAgdGhpcy5faGVhZGVyID0ge307IC8vIGNvZXJjZXMgaGVhZGVyIG5hbWVzIHRvIGxvd2VyY2FzZVxuICB0aGlzLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgbGV0IGVyciA9IG51bGw7XG4gICAgbGV0IHJlcyA9IG51bGw7XG5cbiAgICB0cnkge1xuICAgICAgcmVzID0gbmV3IFJlc3BvbnNlKHNlbGYpO1xuICAgIH0gY2F0Y2goZSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKCdQYXJzZXIgaXMgdW5hYmxlIHRvIHBhcnNlIHRoZSByZXNwb25zZScpO1xuICAgICAgZXJyLnBhcnNlID0gdHJ1ZTtcbiAgICAgIGVyci5vcmlnaW5hbCA9IGU7XG4gICAgICAvLyBpc3N1ZSAjNjc1OiByZXR1cm4gdGhlIHJhdyByZXNwb25zZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgaWYgKHNlbGYueGhyKSB7XG4gICAgICAgIC8vIGllOSBkb2Vzbid0IGhhdmUgJ3Jlc3BvbnNlJyBwcm9wZXJ0eVxuICAgICAgICBlcnIucmF3UmVzcG9uc2UgPSB0eXBlb2Ygc2VsZi54aHIucmVzcG9uc2VUeXBlID09ICd1bmRlZmluZWQnID8gc2VsZi54aHIucmVzcG9uc2VUZXh0IDogc2VsZi54aHIucmVzcG9uc2U7XG4gICAgICAgIC8vIGlzc3VlICM4NzY6IHJldHVybiB0aGUgaHR0cCBzdGF0dXMgY29kZSBpZiB0aGUgcmVzcG9uc2UgcGFyc2luZyBmYWlsc1xuICAgICAgICBlcnIuc3RhdHVzID0gc2VsZi54aHIuc3RhdHVzID8gc2VsZi54aHIuc3RhdHVzIDogbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1c0NvZGUgPSBlcnIuc3RhdHVzOyAvLyBiYWNrd2FyZHMtY29tcGF0IG9ubHlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IG51bGw7XG4gICAgICAgIGVyci5zdGF0dXMgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gc2VsZi5jYWxsYmFjayhlcnIpO1xuICAgIH1cblxuICAgIHNlbGYuZW1pdCgncmVzcG9uc2UnLCByZXMpO1xuXG4gICAgbGV0IG5ld19lcnI7XG4gICAgdHJ5IHtcbiAgICAgIGlmICghc2VsZi5faXNSZXNwb25zZU9LKHJlcykpIHtcbiAgICAgICAgbmV3X2VyciA9IG5ldyBFcnJvcihyZXMuc3RhdHVzVGV4dCB8fCAnVW5zdWNjZXNzZnVsIEhUVFAgcmVzcG9uc2UnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoKGN1c3RvbV9lcnIpIHtcbiAgICAgIG5ld19lcnIgPSBjdXN0b21fZXJyOyAvLyBvaygpIGNhbGxiYWNrIGNhbiB0aHJvd1xuICAgIH1cblxuICAgIC8vICMxMDAwIGRvbid0IGNhdGNoIGVycm9ycyBmcm9tIHRoZSBjYWxsYmFjayB0byBhdm9pZCBkb3VibGUgY2FsbGluZyBpdFxuICAgIGlmIChuZXdfZXJyKSB7XG4gICAgICBuZXdfZXJyLm9yaWdpbmFsID0gZXJyO1xuICAgICAgbmV3X2Vyci5yZXNwb25zZSA9IHJlcztcbiAgICAgIG5ld19lcnIuc3RhdHVzID0gcmVzLnN0YXR1cztcbiAgICAgIHNlbGYuY2FsbGJhY2sobmV3X2VyciwgcmVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2VsZi5jYWxsYmFjayhudWxsLCByZXMpO1xuICAgIH1cbiAgfSk7XG59XG5cbi8qKlxuICogTWl4aW4gYEVtaXR0ZXJgIGFuZCBgUmVxdWVzdEJhc2VgLlxuICovXG5cbkVtaXR0ZXIoUmVxdWVzdC5wcm90b3R5cGUpO1xuUmVxdWVzdEJhc2UoUmVxdWVzdC5wcm90b3R5cGUpO1xuXG4vKipcbiAqIFNldCBDb250ZW50LVR5cGUgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMueG1sID0gJ2FwcGxpY2F0aW9uL3htbCc7XG4gKlxuICogICAgICByZXF1ZXN0LnBvc3QoJy8nKVxuICogICAgICAgIC50eXBlKCd4bWwnKVxuICogICAgICAgIC5zZW5kKHhtbHN0cmluZylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ2FwcGxpY2F0aW9uL3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUudHlwZSA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQ29udGVudC1UeXBlJywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBY2NlcHQgdG8gYHR5cGVgLCBtYXBwaW5nIHZhbHVlcyBmcm9tIGByZXF1ZXN0LnR5cGVzYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHN1cGVyYWdlbnQudHlwZXMuanNvbiA9ICdhcHBsaWNhdGlvbi9qc29uJztcbiAqXG4gKiAgICAgIHJlcXVlc3QuZ2V0KCcvYWdlbnQnKVxuICogICAgICAgIC5hY2NlcHQoJ2pzb24nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnYXBwbGljYXRpb24vanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGFjY2VwdFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmFjY2VwdCA9IGZ1bmN0aW9uKHR5cGUpe1xuICB0aGlzLnNldCgnQWNjZXB0JywgcmVxdWVzdC50eXBlc1t0eXBlXSB8fCB0eXBlKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBBdXRob3JpemF0aW9uIGZpZWxkIHZhbHVlIHdpdGggYHVzZXJgIGFuZCBgcGFzc2AuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVzZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcGFzc10gb3B0aW9uYWwgaW4gY2FzZSBvZiB1c2luZyAnYmVhcmVyJyBhcyB0eXBlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyB3aXRoICd0eXBlJyBwcm9wZXJ0eSAnYXV0bycsICdiYXNpYycgb3IgJ2JlYXJlcicgKGRlZmF1bHQgJ2Jhc2ljJylcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucyl7XG4gIGlmICgxID09PSBhcmd1bWVudHMubGVuZ3RoKSBwYXNzID0gJyc7XG4gIGlmICh0eXBlb2YgcGFzcyA9PT0gJ29iamVjdCcgJiYgcGFzcyAhPT0gbnVsbCkgeyAvLyBwYXNzIGlzIG9wdGlvbmFsIGFuZCBjYW4gYmUgcmVwbGFjZWQgd2l0aCBvcHRpb25zXG4gICAgb3B0aW9ucyA9IHBhc3M7XG4gICAgcGFzcyA9ICcnO1xuICB9XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7XG4gICAgICB0eXBlOiAnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSA/ICdiYXNpYycgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGVuY29kZXIgPSBzdHJpbmcgPT4ge1xuICAgIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgYnRvYSkge1xuICAgICAgcmV0dXJuIGJ0b2Eoc3RyaW5nKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgdXNlIGJhc2ljIGF1dGgsIGJ0b2EgaXMgbm90IGEgZnVuY3Rpb24nKTtcbiAgfTtcblxuICByZXR1cm4gdGhpcy5fYXV0aCh1c2VyLCBwYXNzLCBvcHRpb25zLCBlbmNvZGVyKTtcbn07XG5cbi8qKlxuICogQWRkIHF1ZXJ5LXN0cmluZyBgdmFsYC5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgIHJlcXVlc3QuZ2V0KCcvc2hvZXMnKVxuICogICAgIC5xdWVyeSgnc2l6ZT0xMCcpXG4gKiAgICAgLnF1ZXJ5KHsgY29sb3I6ICdibHVlJyB9KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fFN0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUucXVlcnkgPSBmdW5jdGlvbih2YWwpe1xuICBpZiAoJ3N0cmluZycgIT0gdHlwZW9mIHZhbCkgdmFsID0gc2VyaWFsaXplKHZhbCk7XG4gIGlmICh2YWwpIHRoaXMuX3F1ZXJ5LnB1c2godmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXVlIHRoZSBnaXZlbiBgZmlsZWAgYXMgYW4gYXR0YWNobWVudCB0byB0aGUgc3BlY2lmaWVkIGBmaWVsZGAsXG4gKiB3aXRoIG9wdGlvbmFsIGBvcHRpb25zYCAob3IgZmlsZW5hbWUpLlxuICpcbiAqIGBgYCBqc1xuICogcmVxdWVzdC5wb3N0KCcvdXBsb2FkJylcbiAqICAgLmF0dGFjaCgnY29udGVudCcsIG5ldyBCbG9iKFsnPGEgaWQ9XCJhXCI+PGIgaWQ9XCJiXCI+aGV5ITwvYj48L2E+J10sIHsgdHlwZTogXCJ0ZXh0L2h0bWxcIn0pKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBmaWVsZFxuICogQHBhcmFtIHtCbG9ifEZpbGV9IGZpbGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gb3B0aW9uc1xuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF0dGFjaCA9IGZ1bmN0aW9uKGZpZWxkLCBmaWxlLCBvcHRpb25zKXtcbiAgaWYgKGZpbGUpIHtcbiAgICBpZiAodGhpcy5fZGF0YSkge1xuICAgICAgdGhyb3cgRXJyb3IoXCJzdXBlcmFnZW50IGNhbid0IG1peCAuc2VuZCgpIGFuZCAuYXR0YWNoKClcIik7XG4gICAgfVxuXG4gICAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQoZmllbGQsIGZpbGUsIG9wdGlvbnMgfHwgZmlsZS5uYW1lKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9nZXRGb3JtRGF0YSA9IGZ1bmN0aW9uKCl7XG4gIGlmICghdGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aGlzLl9mb3JtRGF0YSA9IG5ldyByb290LkZvcm1EYXRhKCk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Zvcm1EYXRhO1xufTtcblxuLyoqXG4gKiBJbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggYGVycmAgYW5kIGByZXNgXG4gKiBhbmQgaGFuZGxlIGFyaXR5IGNoZWNrLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gcmVzXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5jYWxsYmFjayA9IGZ1bmN0aW9uKGVyciwgcmVzKXtcbiAgaWYgKHRoaXMuX3Nob3VsZFJldHJ5KGVyciwgcmVzKSkge1xuICAgIHJldHVybiB0aGlzLl9yZXRyeSgpO1xuICB9XG5cbiAgY29uc3QgZm4gPSB0aGlzLl9jYWxsYmFjaztcbiAgdGhpcy5jbGVhclRpbWVvdXQoKTtcblxuICBpZiAoZXJyKSB7XG4gICAgaWYgKHRoaXMuX21heFJldHJpZXMpIGVyci5yZXRyaWVzID0gdGhpcy5fcmV0cmllcyAtIDE7XG4gICAgdGhpcy5lbWl0KCdlcnJvcicsIGVycik7XG4gIH1cblxuICBmbihlcnIsIHJlcyk7XG59O1xuXG4vKipcbiAqIEludm9rZSBjYWxsYmFjayB3aXRoIHgtZG9tYWluIGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNyb3NzRG9tYWluRXJyb3IgPSBmdW5jdGlvbigpe1xuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ1JlcXVlc3QgaGFzIGJlZW4gdGVybWluYXRlZFxcblBvc3NpYmxlIGNhdXNlczogdGhlIG5ldHdvcmsgaXMgb2ZmbGluZSwgT3JpZ2luIGlzIG5vdCBhbGxvd2VkIGJ5IEFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpbiwgdGhlIHBhZ2UgaXMgYmVpbmcgdW5sb2FkZWQsIGV0Yy4nKTtcbiAgZXJyLmNyb3NzRG9tYWluID0gdHJ1ZTtcblxuICBlcnIuc3RhdHVzID0gdGhpcy5zdGF0dXM7XG4gIGVyci5tZXRob2QgPSB0aGlzLm1ldGhvZDtcbiAgZXJyLnVybCA9IHRoaXMudXJsO1xuXG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cbi8vIFRoaXMgb25seSB3YXJucywgYmVjYXVzZSB0aGUgcmVxdWVzdCBpcyBzdGlsbCBsaWtlbHkgdG8gd29ya1xuUmVxdWVzdC5wcm90b3R5cGUuYnVmZmVyID0gUmVxdWVzdC5wcm90b3R5cGUuY2EgPSBSZXF1ZXN0LnByb3RvdHlwZS5hZ2VudCA9IGZ1bmN0aW9uKCl7XG4gIGNvbnNvbGUud2FybihcIlRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBicm93c2VyIHZlcnNpb24gb2Ygc3VwZXJhZ2VudFwiKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vLyBUaGlzIHRocm93cywgYmVjYXVzZSBpdCBjYW4ndCBzZW5kL3JlY2VpdmUgZGF0YSBhcyBleHBlY3RlZFxuUmVxdWVzdC5wcm90b3R5cGUucGlwZSA9IFJlcXVlc3QucHJvdG90eXBlLndyaXRlID0gKCkgPT4ge1xuICB0aHJvdyBFcnJvcihcIlN0cmVhbWluZyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xufTtcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhIGhvc3Qgb2JqZWN0LFxuICogd2UgZG9uJ3Qgd2FudCB0byBzZXJpYWxpemUgdGhlc2UgOilcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblJlcXVlc3QucHJvdG90eXBlLl9pc0hvc3QgPSBmdW5jdGlvbiBfaXNIb3N0KG9iaikge1xuICAvLyBOYXRpdmUgb2JqZWN0cyBzdHJpbmdpZnkgdG8gW29iamVjdCBGaWxlXSwgW29iamVjdCBCbG9iXSwgW29iamVjdCBGb3JtRGF0YV0sIGV0Yy5cbiAgcmV0dXJuIG9iaiAmJiAnb2JqZWN0JyA9PT0gdHlwZW9mIG9iaiAmJiAhQXJyYXkuaXNBcnJheShvYmopICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopICE9PSAnW29iamVjdCBPYmplY3RdJztcbn1cblxuLyoqXG4gKiBJbml0aWF0ZSByZXF1ZXN0LCBpbnZva2luZyBjYWxsYmFjayBgZm4ocmVzKWBcbiAqIHdpdGggYW4gaW5zdGFuY2VvZiBgUmVzcG9uc2VgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuZW5kID0gZnVuY3Rpb24oZm4pe1xuICBpZiAodGhpcy5fZW5kQ2FsbGVkKSB7XG4gICAgY29uc29sZS53YXJuKFwiV2FybmluZzogLmVuZCgpIHdhcyBjYWxsZWQgdHdpY2UuIFRoaXMgaXMgbm90IHN1cHBvcnRlZCBpbiBzdXBlcmFnZW50XCIpO1xuICB9XG4gIHRoaXMuX2VuZENhbGxlZCA9IHRydWU7XG5cbiAgLy8gc3RvcmUgY2FsbGJhY2tcbiAgdGhpcy5fY2FsbGJhY2sgPSBmbiB8fCBub29wO1xuXG4gIC8vIHF1ZXJ5c3RyaW5nXG4gIHRoaXMuX2ZpbmFsaXplUXVlcnlTdHJpbmcoKTtcblxuICB0aGlzLl9lbmQoKTtcbn07XG5cblJlcXVlc3QucHJvdG90eXBlLl9lbmQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHJldHVybiB0aGlzLmNhbGxiYWNrKEVycm9yKFwiVGhlIHJlcXVlc3QgaGFzIGJlZW4gYWJvcnRlZCBldmVuIGJlZm9yZSAuZW5kKCkgd2FzIGNhbGxlZFwiKSk7XG5cbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gIGNvbnN0IHhociA9ICh0aGlzLnhociA9IHJlcXVlc3QuZ2V0WEhSKCkpO1xuICBsZXQgZGF0YSA9IHRoaXMuX2Zvcm1EYXRhIHx8IHRoaXMuX2RhdGE7XG5cbiAgdGhpcy5fc2V0VGltZW91dHMoKTtcblxuICAvLyBzdGF0ZSBjaGFuZ2VcbiAgeGhyLm9ucmVhZHlzdGF0ZWNoYW5nZSA9ICgpID0+IHtcbiAgICBjb25zdCByZWFkeVN0YXRlID0geGhyLnJlYWR5U3RhdGU7XG4gICAgaWYgKHJlYWR5U3RhdGUgPj0gMiAmJiBzZWxmLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKDQgIT0gcmVhZHlTdGF0ZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIEluIElFOSwgcmVhZHMgdG8gYW55IHByb3BlcnR5IChlLmcuIHN0YXR1cykgb2ZmIG9mIGFuIGFib3J0ZWQgWEhSIHdpbGxcbiAgICAvLyByZXN1bHQgaW4gdGhlIGVycm9yIFwiQ291bGQgbm90IGNvbXBsZXRlIHRoZSBvcGVyYXRpb24gZHVlIHRvIGVycm9yIGMwMGMwMjNmXCJcbiAgICBsZXQgc3RhdHVzO1xuICAgIHRyeSB7IHN0YXR1cyA9IHhoci5zdGF0dXMgfSBjYXRjaChlKSB7IHN0YXR1cyA9IDA7IH1cblxuICAgIGlmICghc3RhdHVzKSB7XG4gICAgICBpZiAoc2VsZi50aW1lZG91dCB8fCBzZWxmLl9hYm9ydGVkKSByZXR1cm47XG4gICAgICByZXR1cm4gc2VsZi5jcm9zc0RvbWFpbkVycm9yKCk7XG4gICAgfVxuICAgIHNlbGYuZW1pdCgnZW5kJyk7XG4gIH07XG5cbiAgLy8gcHJvZ3Jlc3NcbiAgY29uc3QgaGFuZGxlUHJvZ3Jlc3MgPSAoZGlyZWN0aW9uLCBlKSA9PiB7XG4gICAgaWYgKGUudG90YWwgPiAwKSB7XG4gICAgICBlLnBlcmNlbnQgPSBlLmxvYWRlZCAvIGUudG90YWwgKiAxMDA7XG4gICAgfVxuICAgIGUuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIHNlbGYuZW1pdCgncHJvZ3Jlc3MnLCBlKTtcbiAgfTtcbiAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKCdwcm9ncmVzcycpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHhoci5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAnZG93bmxvYWQnKTtcbiAgICAgIGlmICh4aHIudXBsb2FkKSB7XG4gICAgICAgIHhoci51cGxvYWQub25wcm9ncmVzcyA9IGhhbmRsZVByb2dyZXNzLmJpbmQobnVsbCwgJ3VwbG9hZCcpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goZSkge1xuICAgICAgLy8gQWNjZXNzaW5nIHhoci51cGxvYWQgZmFpbHMgaW4gSUUgZnJvbSBhIHdlYiB3b3JrZXIsIHNvIGp1c3QgcHJldGVuZCBpdCBkb2Vzbid0IGV4aXN0LlxuICAgICAgLy8gUmVwb3J0ZWQgaGVyZTpcbiAgICAgIC8vIGh0dHBzOi8vY29ubmVjdC5taWNyb3NvZnQuY29tL0lFL2ZlZWRiYWNrL2RldGFpbHMvODM3MjQ1L3htbGh0dHByZXF1ZXN0LXVwbG9hZC10aHJvd3MtaW52YWxpZC1hcmd1bWVudC13aGVuLXVzZWQtZnJvbS13ZWItd29ya2VyLWNvbnRleHRcbiAgICB9XG4gIH1cblxuICAvLyBpbml0aWF0ZSByZXF1ZXN0XG4gIHRyeSB7XG4gICAgaWYgKHRoaXMudXNlcm5hbWUgJiYgdGhpcy5wYXNzd29yZCkge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlLCB0aGlzLnVzZXJuYW1lLCB0aGlzLnBhc3N3b3JkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeGhyLm9wZW4odGhpcy5tZXRob2QsIHRoaXMudXJsLCB0cnVlKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIHNlZSAjMTE0OVxuICAgIHJldHVybiB0aGlzLmNhbGxiYWNrKGVycik7XG4gIH1cblxuICAvLyBDT1JTXG4gIGlmICh0aGlzLl93aXRoQ3JlZGVudGlhbHMpIHhoci53aXRoQ3JlZGVudGlhbHMgPSB0cnVlO1xuXG4gIC8vIGJvZHlcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSAmJiAnR0VUJyAhPSB0aGlzLm1ldGhvZCAmJiAnSEVBRCcgIT0gdGhpcy5tZXRob2QgJiYgJ3N0cmluZycgIT0gdHlwZW9mIGRhdGEgJiYgIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIC8vIHNlcmlhbGl6ZSBzdHVmZlxuICAgIGNvbnN0IGNvbnRlbnRUeXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBsZXQgc2VyaWFsaXplID0gdGhpcy5fc2VyaWFsaXplciB8fCByZXF1ZXN0LnNlcmlhbGl6ZVtjb250ZW50VHlwZSA/IGNvbnRlbnRUeXBlLnNwbGl0KCc7JylbMF0gOiAnJ107XG4gICAgaWYgKCFzZXJpYWxpemUgJiYgaXNKU09OKGNvbnRlbnRUeXBlKSkge1xuICAgICAgc2VyaWFsaXplID0gcmVxdWVzdC5zZXJpYWxpemVbJ2FwcGxpY2F0aW9uL2pzb24nXTtcbiAgICB9XG4gICAgaWYgKHNlcmlhbGl6ZSkgZGF0YSA9IHNlcmlhbGl6ZShkYXRhKTtcbiAgfVxuXG4gIC8vIHNldCBoZWFkZXIgZmllbGRzXG4gIGZvciAoY29uc3QgZmllbGQgaW4gdGhpcy5oZWFkZXIpIHtcbiAgICBpZiAobnVsbCA9PSB0aGlzLmhlYWRlcltmaWVsZF0pIGNvbnRpbnVlO1xuXG4gICAgaWYgKHRoaXMuaGVhZGVyLmhhc093blByb3BlcnR5KGZpZWxkKSlcbiAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKGZpZWxkLCB0aGlzLmhlYWRlcltmaWVsZF0pO1xuICB9XG5cbiAgaWYgKHRoaXMuX3Jlc3BvbnNlVHlwZSkge1xuICAgIHhoci5yZXNwb25zZVR5cGUgPSB0aGlzLl9yZXNwb25zZVR5cGU7XG4gIH1cblxuICAvLyBzZW5kIHN0dWZmXG4gIHRoaXMuZW1pdCgncmVxdWVzdCcsIHRoaXMpO1xuXG4gIC8vIElFMTEgeGhyLnNlbmQodW5kZWZpbmVkKSBzZW5kcyAndW5kZWZpbmVkJyBzdHJpbmcgYXMgUE9TVCBwYXlsb2FkIChpbnN0ZWFkIG9mIG5vdGhpbmcpXG4gIC8vIFdlIG5lZWQgbnVsbCBoZXJlIGlmIGRhdGEgaXMgdW5kZWZpbmVkXG4gIHhoci5zZW5kKHR5cGVvZiBkYXRhICE9PSAndW5kZWZpbmVkJyA/IGRhdGEgOiBudWxsKTtcbn07XG5cbnJlcXVlc3QuYWdlbnQgPSAoKSA9PiBuZXcgQWdlbnQoKTtcblxuW1wiR0VUXCIsIFwiUE9TVFwiLCBcIk9QVElPTlNcIiwgXCJQQVRDSFwiLCBcIlBVVFwiLCBcIkRFTEVURVwiXS5mb3JFYWNoKG1ldGhvZCA9PiB7XG4gIEFnZW50LnByb3RvdHlwZVttZXRob2QudG9Mb3dlckNhc2UoKV0gPSBmdW5jdGlvbih1cmwsIGZuKSB7XG4gICAgY29uc3QgcmVxID0gbmV3IHJlcXVlc3QuUmVxdWVzdChtZXRob2QsIHVybCk7XG4gICAgdGhpcy5fc2V0RGVmYXVsdHMocmVxKTtcbiAgICBpZiAoZm4pIHtcbiAgICAgIHJlcS5lbmQoZm4pO1xuICAgIH1cbiAgICByZXR1cm4gcmVxO1xuICB9O1xufSk7XG5cbkFnZW50LnByb3RvdHlwZS5kZWwgPSBBZ2VudC5wcm90b3R5cGVbJ2RlbGV0ZSddO1xuXG4vKipcbiAqIEdFVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QuZ2V0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnR0VUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBIRUFEIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5oZWFkID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnSEVBRCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5xdWVyeShkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogT1BUSU9OUyBxdWVyeSB0byBgdXJsYCB3aXRoIG9wdGlvbmFsIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3Qub3B0aW9ucyA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ09QVElPTlMnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogREVMRVRFIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBkZWwodXJsLCBkYXRhLCBmbikge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdERUxFVEUnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn1cblxucmVxdWVzdFsnZGVsJ10gPSBkZWw7XG5yZXF1ZXN0WydkZWxldGUnXSA9IGRlbDtcblxuLyoqXG4gKiBQQVRDSCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wYXRjaCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BBVENIJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIFBPU1QgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucG9zdCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BPU1QnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUFVUIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnB1dCA9ICh1cmwsIGRhdGEsIGZuKSA9PiB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ1BVVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDaGVjayBpZiBgb2JqYCBpcyBhbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gbnVsbCAhPT0gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBvZiBtaXhlZC1pbiBmdW5jdGlvbnMgc2hhcmVkIGJldHdlZW4gbm9kZSBhbmQgY2xpZW50IGNvZGVcbiAqL1xuY29uc3QgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzLW9iamVjdCcpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVxdWVzdEJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVxdWVzdEJhc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdEJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdEJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVxdWVzdEJhc2UucHJvdG90eXBlKSB7XG4gICAgb2JqW2tleV0gPSBSZXF1ZXN0QmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIENsZWFyIHByZXZpb3VzIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5jbGVhclRpbWVvdXQgPSBmdW5jdGlvbiBfY2xlYXJUaW1lb3V0KCl7XG4gIGNsZWFyVGltZW91dCh0aGlzLl90aW1lcik7XG4gIGNsZWFyVGltZW91dCh0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcik7XG4gIGRlbGV0ZSB0aGlzLl90aW1lcjtcbiAgZGVsZXRlIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogT3ZlcnJpZGUgZGVmYXVsdCByZXNwb25zZSBib2R5IHBhcnNlclxuICpcbiAqIFRoaXMgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgdG8gY29udmVydCBpbmNvbWluZyBkYXRhIGludG8gcmVxdWVzdC5ib2R5XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnBhcnNlID0gZnVuY3Rpb24gcGFyc2UoZm4pe1xuICB0aGlzLl9wYXJzZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBmb3JtYXQgb2YgYmluYXJ5IHJlc3BvbnNlIGJvZHkuXG4gKiBJbiBicm93c2VyIHZhbGlkIGZvcm1hdHMgYXJlICdibG9iJyBhbmQgJ2FycmF5YnVmZmVyJyxcbiAqIHdoaWNoIHJldHVybiBCbG9iIGFuZCBBcnJheUJ1ZmZlciwgcmVzcGVjdGl2ZWx5LlxuICpcbiAqIEluIE5vZGUgYWxsIHZhbHVlcyByZXN1bHQgaW4gQnVmZmVyLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnJlc3BvbnNlVHlwZSgnYmxvYicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5yZXNwb25zZVR5cGUgPSBmdW5jdGlvbih2YWwpe1xuICB0aGlzLl9yZXNwb25zZVR5cGUgPSB2YWw7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlcXVlc3QgYm9keSBzZXJpYWxpemVyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGRhdGEgc2V0IHZpYSAuc2VuZCBvciAuYXR0YWNoIGludG8gcGF5bG9hZCB0byBzZW5kXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNlcmlhbGl6ZSA9IGZ1bmN0aW9uIHNlcmlhbGl6ZShmbil7XG4gIHRoaXMuX3NlcmlhbGl6ZXIgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aW1lb3V0cy5cbiAqXG4gKiAtIHJlc3BvbnNlIHRpbWVvdXQgaXMgdGltZSBiZXR3ZWVuIHNlbmRpbmcgcmVxdWVzdCBhbmQgcmVjZWl2aW5nIHRoZSBmaXJzdCBieXRlIG9mIHRoZSByZXNwb25zZS4gSW5jbHVkZXMgRE5TIGFuZCBjb25uZWN0aW9uIHRpbWUuXG4gKiAtIGRlYWRsaW5lIGlzIHRoZSB0aW1lIGZyb20gc3RhcnQgb2YgdGhlIHJlcXVlc3QgdG8gcmVjZWl2aW5nIHJlc3BvbnNlIGJvZHkgaW4gZnVsbC4gSWYgdGhlIGRlYWRsaW5lIGlzIHRvbyBzaG9ydCBsYXJnZSBmaWxlcyBtYXkgbm90IGxvYWQgYXQgYWxsIG9uIHNsb3cgY29ubmVjdGlvbnMuXG4gKlxuICogVmFsdWUgb2YgMCBvciBmYWxzZSBtZWFucyBubyB0aW1lb3V0LlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gbXMgb3Ige3Jlc3BvbnNlLCBkZWFkbGluZX1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudGltZW91dCA9IGZ1bmN0aW9uIHRpbWVvdXQob3B0aW9ucyl7XG4gIGlmICghb3B0aW9ucyB8fCAnb2JqZWN0JyAhPT0gdHlwZW9mIG9wdGlvbnMpIHtcbiAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucztcbiAgICB0aGlzLl9yZXNwb25zZVRpbWVvdXQgPSAwO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgZm9yKGNvbnN0IG9wdGlvbiBpbiBvcHRpb25zKSB7XG4gICAgc3dpdGNoKG9wdGlvbikge1xuICAgICAgY2FzZSAnZGVhZGxpbmUnOlxuICAgICAgICB0aGlzLl90aW1lb3V0ID0gb3B0aW9ucy5kZWFkbGluZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdyZXNwb25zZSc6XG4gICAgICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IG9wdGlvbnMucmVzcG9uc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgY29uc29sZS53YXJuKFwiVW5rbm93biB0aW1lb3V0IG9wdGlvblwiLCBvcHRpb24pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IG51bWJlciBvZiByZXRyeSBhdHRlbXB0cyBvbiBlcnJvci5cbiAqXG4gKiBGYWlsZWQgcmVxdWVzdHMgd2lsbCBiZSByZXRyaWVkICdjb3VudCcgdGltZXMgaWYgdGltZW91dCBvciBlcnIuY29kZSA+PSA1MDAuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJldHJ5ID0gZnVuY3Rpb24gcmV0cnkoY291bnQsIGZuKXtcbiAgLy8gRGVmYXVsdCB0byAxIGlmIG5vIGNvdW50IHBhc3NlZCBvciB0cnVlXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwIHx8IGNvdW50ID09PSB0cnVlKSBjb3VudCA9IDE7XG4gIGlmIChjb3VudCA8PSAwKSBjb3VudCA9IDA7XG4gIHRoaXMuX21heFJldHJpZXMgPSBjb3VudDtcbiAgdGhpcy5fcmV0cmllcyA9IDA7XG4gIHRoaXMuX3JldHJ5Q2FsbGJhY2sgPSBmbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5jb25zdCBFUlJPUl9DT0RFUyA9IFtcbiAgJ0VDT05OUkVTRVQnLFxuICAnRVRJTUVET1VUJyxcbiAgJ0VBRERSSU5GTycsXG4gICdFU09DS0VUVElNRURPVVQnXG5dO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHJlcXVlc3Qgc2hvdWxkIGJlIHJldHJpZWQuXG4gKiAoQm9ycm93ZWQgZnJvbSBzZWdtZW50aW8vc3VwZXJhZ2VudC1yZXRyeSlcbiAqXG4gKiBAcGFyYW0ge0Vycm9yfSBlcnJcbiAqIEBwYXJhbSB7UmVzcG9uc2V9IFtyZXNdXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn1cbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9zaG91bGRSZXRyeSA9IGZ1bmN0aW9uKGVyciwgcmVzKSB7XG4gIGlmICghdGhpcy5fbWF4UmV0cmllcyB8fCB0aGlzLl9yZXRyaWVzKysgPj0gdGhpcy5fbWF4UmV0cmllcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAodGhpcy5fcmV0cnlDYWxsYmFjaykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBvdmVycmlkZSA9IHRoaXMuX3JldHJ5Q2FsbGJhY2soZXJyLCByZXMpO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSB0cnVlKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChvdmVycmlkZSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIHVuZGVmaW5lZCBmYWxscyBiYWNrIHRvIGRlZmF1bHRzXG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIH1cbiAgfVxuICBpZiAocmVzICYmIHJlcy5zdGF0dXMgJiYgcmVzLnN0YXR1cyA+PSA1MDAgJiYgcmVzLnN0YXR1cyAhPSA1MDEpIHJldHVybiB0cnVlO1xuICBpZiAoZXJyKSB7XG4gICAgaWYgKGVyci5jb2RlICYmIH5FUlJPUl9DT0RFUy5pbmRleE9mKGVyci5jb2RlKSkgcmV0dXJuIHRydWU7XG4gICAgLy8gU3VwZXJhZ2VudCB0aW1lb3V0XG4gICAgaWYgKGVyci50aW1lb3V0ICYmIGVyci5jb2RlID09ICdFQ09OTkFCT1JURUQnKSByZXR1cm4gdHJ1ZTtcbiAgICBpZiAoZXJyLmNyb3NzRG9tYWluKSByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIFJldHJ5IHJlcXVlc3RcbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fcmV0cnkgPSBmdW5jdGlvbigpIHtcblxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIC8vIG5vZGVcbiAgaWYgKHRoaXMucmVxKSB7XG4gICAgdGhpcy5yZXEgPSBudWxsO1xuICAgIHRoaXMucmVxID0gdGhpcy5yZXF1ZXN0KCk7XG4gIH1cblxuICB0aGlzLl9hYm9ydGVkID0gZmFsc2U7XG4gIHRoaXMudGltZWRvdXQgPSBmYWxzZTtcblxuICByZXR1cm4gdGhpcy5fZW5kKCk7XG59O1xuXG4vKipcbiAqIFByb21pc2Ugc3VwcG9ydFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtyZWplY3RdXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24gdGhlbihyZXNvbHZlLCByZWplY3QpIHtcbiAgaWYgKCF0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcIldhcm5pbmc6IHN1cGVyYWdlbnQgcmVxdWVzdCB3YXMgc2VudCB0d2ljZSwgYmVjYXVzZSBib3RoIC5lbmQoKSBhbmQgLnRoZW4oKSB3ZXJlIGNhbGxlZC4gTmV2ZXIgY2FsbCAuZW5kKCkgaWYgeW91IHVzZSBwcm9taXNlc1wiKTtcbiAgICB9XG4gICAgdGhpcy5fZnVsbGZpbGxlZFByb21pc2UgPSBuZXcgUHJvbWlzZSgoaW5uZXJSZXNvbHZlLCBpbm5lclJlamVjdCkgPT4ge1xuICAgICAgc2VsZi5vbignZXJyb3InLCBpbm5lclJlamVjdCk7XG4gICAgICBzZWxmLm9uKCdhYm9ydCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZXJyID0gbmV3IEVycm9yKCdBYm9ydGVkJyk7XG4gICAgICAgIGVyci5jb2RlID0gXCJBQk9SVEVEXCI7XG4gICAgICAgIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgICAgICAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICAgICAgICBlcnIudXJsID0gdGhpcy51cmw7XG4gICAgICAgIGlubmVyUmVqZWN0KGVycik7XG4gICAgICB9KTtcbiAgICAgIHNlbGYuZW5kKChlcnIsIHJlcykgPT4ge1xuICAgICAgICBpZiAoZXJyKSBpbm5lclJlamVjdChlcnIpO1xuICAgICAgICBlbHNlIGlubmVyUmVzb2x2ZShyZXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZVsnY2F0Y2gnXSA9IGZ1bmN0aW9uKGNiKSB7XG4gIHJldHVybiB0aGlzLnRoZW4odW5kZWZpbmVkLCBjYik7XG59O1xuXG4vKipcbiAqIEFsbG93IGZvciBleHRlbnNpb25cbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudXNlID0gZnVuY3Rpb24gdXNlKGZuKSB7XG4gIGZuKHRoaXMpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5vayA9IGZ1bmN0aW9uKGNiKSB7XG4gIGlmICgnZnVuY3Rpb24nICE9PSB0eXBlb2YgY2IpIHRocm93IEVycm9yKFwiQ2FsbGJhY2sgcmVxdWlyZWRcIik7XG4gIHRoaXMuX29rQ2FsbGJhY2sgPSBjYjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2lzUmVzcG9uc2VPSyA9IGZ1bmN0aW9uKHJlcykge1xuICBpZiAoIXJlcykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICh0aGlzLl9va0NhbGxiYWNrKSB7XG4gICAgcmV0dXJuIHRoaXMuX29rQ2FsbGJhY2socmVzKTtcbiAgfVxuXG4gIHJldHVybiByZXMuc3RhdHVzID49IDIwMCAmJiByZXMuc3RhdHVzIDwgMzAwO1xufTtcblxuLyoqXG4gKiBHZXQgcmVxdWVzdCBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCl7XG4gIHJldHVybiB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGhlYWRlciBgZmllbGRgIHZhbHVlLlxuICogVGhpcyBpcyBhIGRlcHJlY2F0ZWQgaW50ZXJuYWwgQVBJLiBVc2UgYC5nZXQoZmllbGQpYCBpbnN0ZWFkLlxuICpcbiAqIChnZXRIZWFkZXIgaXMgbm8gbG9uZ2VyIHVzZWQgaW50ZXJuYWxseSBieSB0aGUgc3VwZXJhZ2VudCBjb2RlIGJhc2UpXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqIEBkZXByZWNhdGVkXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldEhlYWRlciA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZS5nZXQ7XG5cbi8qKlxuICogU2V0IGhlYWRlciBgZmllbGRgIHRvIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0LlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoJ0FjY2VwdCcsICdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuc2V0KCdYLUFQSS1LZXknLCAnZm9vYmFyJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC5zZXQoeyBBY2NlcHQ6ICdhcHBsaWNhdGlvbi9qc29uJywgJ1gtQVBJLUtleSc6ICdmb29iYXInIH0pXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBmaWVsZFxuICogQHBhcmFtIHtTdHJpbmd9IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihmaWVsZCwgdmFsKXtcbiAgaWYgKGlzT2JqZWN0KGZpZWxkKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGZpZWxkKSB7XG4gICAgICB0aGlzLnNldChrZXksIGZpZWxkW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV0gPSB2YWw7XG4gIHRoaXMuaGVhZGVyW2ZpZWxkXSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBoZWFkZXIgYGZpZWxkYC5cbiAqIENhc2UtaW5zZW5zaXRpdmUuXG4gKlxuICogRXhhbXBsZTpcbiAqXG4gKiAgICAgIHJlcS5nZXQoJy8nKVxuICogICAgICAgIC51bnNldCgnVXNlci1BZ2VudCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51bnNldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgZGVsZXRlIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbiAgZGVsZXRlIHRoaXMuaGVhZGVyW2ZpZWxkXTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFdyaXRlIHRoZSBmaWVsZCBgbmFtZWAgYW5kIGB2YWxgLCBvciBtdWx0aXBsZSBmaWVsZHMgd2l0aCBvbmUgb2JqZWN0XG4gKiBmb3IgXCJtdWx0aXBhcnQvZm9ybS1kYXRhXCIgcmVxdWVzdCBib2RpZXMuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoJ2ZvbycsICdiYXInKVxuICogICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuZmllbGQoeyBmb286ICdiYXInLCBiYXo6ICdxdXgnIH0pXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ3xCbG9ifEZpbGV8QnVmZmVyfGZzLlJlYWRTdHJlYW19IHZhbFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZmllbGQgPSBmdW5jdGlvbihuYW1lLCB2YWwpIHtcbiAgLy8gbmFtZSBzaG91bGQgYmUgZWl0aGVyIGEgc3RyaW5nIG9yIGFuIG9iamVjdC5cbiAgaWYgKG51bGwgPT09IG5hbWUgfHwgdW5kZWZpbmVkID09PSBuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSBuYW1lIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuXG4gIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiLmZpZWxkKCkgY2FuJ3QgYmUgdXNlZCBpZiAuc2VuZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmplY3QobmFtZSkpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBuYW1lKSB7XG4gICAgICB0aGlzLmZpZWxkKGtleSwgbmFtZVtrZXldKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgZm9yIChjb25zdCBpIGluIHZhbCkge1xuICAgICAgdGhpcy5maWVsZChuYW1lLCB2YWxbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIC8vIHZhbCBzaG91bGQgYmUgZGVmaW5lZCBub3dcbiAgaWYgKG51bGwgPT09IHZhbCB8fCB1bmRlZmluZWQgPT09IHZhbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignLmZpZWxkKG5hbWUsIHZhbCkgdmFsIGNhbiBub3QgYmUgZW1wdHknKTtcbiAgfVxuICBpZiAoJ2Jvb2xlYW4nID09PSB0eXBlb2YgdmFsKSB7XG4gICAgdmFsID0gJycgKyB2YWw7XG4gIH1cbiAgdGhpcy5fZ2V0Rm9ybURhdGEoKS5hcHBlbmQobmFtZSwgdmFsKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFib3J0IHRoZSByZXF1ZXN0LCBhbmQgY2xlYXIgcG90ZW50aWFsIHRpbWVvdXQuXG4gKlxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5hYm9ydCA9IGZ1bmN0aW9uKCl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgdGhpcy5fYWJvcnRlZCA9IHRydWU7XG4gIHRoaXMueGhyICYmIHRoaXMueGhyLmFib3J0KCk7IC8vIGJyb3dzZXJcbiAgdGhpcy5yZXEgJiYgdGhpcy5yZXEuYWJvcnQoKTsgLy8gbm9kZVxuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuICB0aGlzLmVtaXQoJ2Fib3J0Jyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9hdXRoID0gZnVuY3Rpb24odXNlciwgcGFzcywgb3B0aW9ucywgYmFzZTY0RW5jb2Rlcikge1xuICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgIGNhc2UgJ2Jhc2ljJzpcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJhc2ljICR7YmFzZTY0RW5jb2RlcihgJHt1c2VyfToke3Bhc3N9YCl9YCk7XG4gICAgICBicmVhaztcblxuICAgIGNhc2UgJ2F1dG8nOlxuICAgICAgdGhpcy51c2VybmFtZSA9IHVzZXI7XG4gICAgICB0aGlzLnBhc3N3b3JkID0gcGFzcztcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYmVhcmVyJzogLy8gdXNhZ2Ugd291bGQgYmUgLmF1dGgoYWNjZXNzVG9rZW4sIHsgdHlwZTogJ2JlYXJlcicgfSlcbiAgICAgIHRoaXMuc2V0KCdBdXRob3JpemF0aW9uJywgYEJlYXJlciAke3VzZXJ9YCk7XG4gICAgICBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRW5hYmxlIHRyYW5zbWlzc2lvbiBvZiBjb29raWVzIHdpdGggeC1kb21haW4gcmVxdWVzdHMuXG4gKlxuICogTm90ZSB0aGF0IGZvciB0aGlzIHRvIHdvcmsgdGhlIG9yaWdpbiBtdXN0IG5vdCBiZVxuICogdXNpbmcgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIiB3aXRoIGEgd2lsZGNhcmQsXG4gKiBhbmQgYWxzbyBtdXN0IHNldCBcIkFjY2Vzcy1Db250cm9sLUFsbG93LUNyZWRlbnRpYWxzXCJcbiAqIHRvIFwidHJ1ZVwiLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLndpdGhDcmVkZW50aWFscyA9IGZ1bmN0aW9uKG9uKSB7XG4gIC8vIFRoaXMgaXMgYnJvd3Nlci1vbmx5IGZ1bmN0aW9uYWxpdHkuIE5vZGUgc2lkZSBpcyBuby1vcC5cbiAgaWYgKG9uID09IHVuZGVmaW5lZCkgb24gPSB0cnVlO1xuICB0aGlzLl93aXRoQ3JlZGVudGlhbHMgPSBvbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCB0aGUgbWF4IHJlZGlyZWN0cyB0byBgbmAuIERvZXMgbm90aW5nIGluIGJyb3dzZXIgWEhSIGltcGxlbWVudGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlZGlyZWN0cyA9IGZ1bmN0aW9uKG4pe1xuICB0aGlzLl9tYXhSZWRpcmVjdHMgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTWF4aW11bSBzaXplIG9mIGJ1ZmZlcmVkIHJlc3BvbnNlIGJvZHksIGluIGJ5dGVzLiBDb3VudHMgdW5jb21wcmVzc2VkIHNpemUuXG4gKiBEZWZhdWx0IDIwME1CLlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLm1heFJlc3BvbnNlU2l6ZSA9IGZ1bmN0aW9uKG4pe1xuICBpZiAoJ251bWJlcicgIT09IHR5cGVvZiBuKSB7XG4gICAgdGhyb3cgVHlwZUVycm9yKFwiSW52YWxpZCBhcmd1bWVudFwiKTtcbiAgfVxuICB0aGlzLl9tYXhSZXNwb25zZVNpemUgPSBuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29udmVydCB0byBhIHBsYWluIGphdmFzY3JpcHQgb2JqZWN0IChub3QgSlNPTiBzdHJpbmcpIG9mIHNjYWxhciBwcm9wZXJ0aWVzLlxuICogTm90ZSBhcyB0aGlzIG1ldGhvZCBpcyBkZXNpZ25lZCB0byByZXR1cm4gYSB1c2VmdWwgbm9uLXRoaXMgdmFsdWUsXG4gKiBpdCBjYW5ub3QgYmUgY2hhaW5lZC5cbiAqXG4gKiBAcmV0dXJuIHtPYmplY3R9IGRlc2NyaWJpbmcgbWV0aG9kLCB1cmwsIGFuZCBkYXRhIG9mIHRoaXMgcmVxdWVzdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB7XG4gICAgbWV0aG9kOiB0aGlzLm1ldGhvZCxcbiAgICB1cmw6IHRoaXMudXJsLFxuICAgIGRhdGE6IHRoaXMuX2RhdGEsXG4gICAgaGVhZGVyczogdGhpcy5faGVhZGVyLFxuICB9O1xufTtcblxuLyoqXG4gKiBTZW5kIGBkYXRhYCBhcyB0aGUgcmVxdWVzdCBib2R5LCBkZWZhdWx0aW5nIHRoZSBgLnR5cGUoKWAgdG8gXCJqc29uXCIgd2hlblxuICogYW4gb2JqZWN0IGlzIGdpdmVuLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgIC8vIG1hbnVhbCBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2pzb24nKVxuICogICAgICAgICAuc2VuZCgne1wibmFtZVwiOlwidGpcIn0nKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8ganNvblxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIG1hbnVhbCB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnZm9ybScpXG4gKiAgICAgICAgIC5zZW5kKCduYW1lPXRqJylcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBhdXRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gZGVmYXVsdHMgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKCduYW1lPXRvYmknKVxuICogICAgICAgIC5zZW5kKCdzcGVjaWVzPWZlcnJldCcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGRhdGFcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VuZCA9IGZ1bmN0aW9uKGRhdGEpe1xuICBjb25zdCBpc09iaiA9IGlzT2JqZWN0KGRhdGEpO1xuICBsZXQgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG5cbiAgaWYgKHRoaXMuX2Zvcm1EYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiLnNlbmQoKSBjYW4ndCBiZSB1c2VkIGlmIC5hdHRhY2goKSBvciAuZmllbGQoKSBpcyB1c2VkLiBQbGVhc2UgdXNlIG9ubHkgLnNlbmQoKSBvciBvbmx5IC5maWVsZCgpICYgLmF0dGFjaCgpXCIpO1xuICB9XG5cbiAgaWYgKGlzT2JqICYmICF0aGlzLl9kYXRhKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSBbXTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLl9pc0hvc3QoZGF0YSkpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB7fTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoZGF0YSAmJiB0aGlzLl9kYXRhICYmIHRoaXMuX2lzSG9zdCh0aGlzLl9kYXRhKSkge1xuICAgIHRocm93IEVycm9yKFwiQ2FuJ3QgbWVyZ2UgdGhlc2Ugc2VuZCBjYWxsc1wiKTtcbiAgfVxuXG4gIC8vIG1lcmdlXG4gIGlmIChpc09iaiAmJiBpc09iamVjdCh0aGlzLl9kYXRhKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIGRhdGEpIHtcbiAgICAgIHRoaXMuX2RhdGFba2V5XSA9IGRhdGFba2V5XTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoJ3N0cmluZycgPT0gdHlwZW9mIGRhdGEpIHtcbiAgICAvLyBkZWZhdWx0IHRvIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICAgIGlmICghdHlwZSkgdGhpcy50eXBlKCdmb3JtJyk7XG4gICAgdHlwZSA9IHRoaXMuX2hlYWRlclsnY29udGVudC10eXBlJ107XG4gICAgaWYgKCdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnID09IHR5cGUpIHtcbiAgICAgIHRoaXMuX2RhdGEgPSB0aGlzLl9kYXRhXG4gICAgICAgID8gYCR7dGhpcy5fZGF0YX0mJHtkYXRhfWBcbiAgICAgICAgOiBkYXRhO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9kYXRhID0gKHRoaXMuX2RhdGEgfHwgJycpICsgZGF0YTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5fZGF0YSA9IGRhdGE7XG4gIH1cblxuICBpZiAoIWlzT2JqIHx8IHRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZGVmYXVsdCB0byBqc29uXG4gIGlmICghdHlwZSkgdGhpcy50eXBlKCdqc29uJyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTb3J0IGBxdWVyeXN0cmluZ2AgYnkgdGhlIHNvcnQgZnVuY3Rpb25cbiAqXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gZGVmYXVsdCBvcmRlclxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGN1c3RvbWl6ZWQgc29ydCBmdW5jdGlvblxuICogICAgICAgcmVxdWVzdC5nZXQoJy91c2VyJylcbiAqICAgICAgICAgLnF1ZXJ5KCduYW1lPU5pY2snKVxuICogICAgICAgICAucXVlcnkoJ3NlYXJjaD1NYW5ueScpXG4gKiAgICAgICAgIC5zb3J0UXVlcnkoZnVuY3Rpb24oYSwgYil7XG4gKiAgICAgICAgICAgcmV0dXJuIGEubGVuZ3RoIC0gYi5sZW5ndGg7XG4gKiAgICAgICAgIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHNvcnRcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc29ydFF1ZXJ5ID0gZnVuY3Rpb24oc29ydCkge1xuICAvLyBfc29ydCBkZWZhdWx0IHRvIHRydWUgYnV0IG90aGVyd2lzZSBjYW4gYmUgYSBmdW5jdGlvbiBvciBib29sZWFuXG4gIHRoaXMuX3NvcnQgPSB0eXBlb2Ygc29ydCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogc29ydDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvbXBvc2UgcXVlcnlzdHJpbmcgdG8gYXBwZW5kIHRvIHJlcS51cmxcbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9maW5hbGl6ZVF1ZXJ5U3RyaW5nID0gZnVuY3Rpb24oKXtcbiAgY29uc3QgcXVlcnkgPSB0aGlzLl9xdWVyeS5qb2luKCcmJyk7XG4gIGlmIChxdWVyeSkge1xuICAgIHRoaXMudXJsICs9ICh0aGlzLnVybC5pbmRleE9mKCc/JykgPj0gMCA/ICcmJyA6ICc/JykgKyBxdWVyeTtcbiAgfVxuICB0aGlzLl9xdWVyeS5sZW5ndGggPSAwOyAvLyBNYWtlcyB0aGUgY2FsbCBpZGVtcG90ZW50XG5cbiAgaWYgKHRoaXMuX3NvcnQpIHtcbiAgICBjb25zdCBpbmRleCA9IHRoaXMudXJsLmluZGV4T2YoJz8nKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgY29uc3QgcXVlcnlBcnIgPSB0aGlzLnVybC5zdWJzdHJpbmcoaW5kZXggKyAxKS5zcGxpdCgnJicpO1xuICAgICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiB0aGlzLl9zb3J0KSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQodGhpcy5fc29ydCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBxdWVyeUFyci5zb3J0KCk7XG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IHRoaXMudXJsLnN1YnN0cmluZygwLCBpbmRleCkgKyAnPycgKyBxdWVyeUFyci5qb2luKCcmJyk7XG4gICAgfVxuICB9XG59O1xuXG4vLyBGb3IgYmFja3dhcmRzIGNvbXBhdCBvbmx5XG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2FwcGVuZFF1ZXJ5U3RyaW5nID0gKCkgPT4ge2NvbnNvbGUudHJhY2UoXCJVbnN1cHBvcnRlZFwiKTt9XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggdGltZW91dCBlcnJvci5cbiAqXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3RpbWVvdXRFcnJvciA9IGZ1bmN0aW9uKHJlYXNvbiwgdGltZW91dCwgZXJybm8pe1xuICBpZiAodGhpcy5fYWJvcnRlZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoYCR7cmVhc29uICsgdGltZW91dH1tcyBleGNlZWRlZGApO1xuICBlcnIudGltZW91dCA9IHRpbWVvdXQ7XG4gIGVyci5jb2RlID0gJ0VDT05OQUJPUlRFRCc7XG4gIGVyci5lcnJubyA9IGVycm5vO1xuICB0aGlzLnRpbWVkb3V0ID0gdHJ1ZTtcbiAgdGhpcy5hYm9ydCgpO1xuICB0aGlzLmNhbGxiYWNrKGVycik7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3NldFRpbWVvdXRzID0gZnVuY3Rpb24oKSB7XG4gIGNvbnN0IHNlbGYgPSB0aGlzO1xuXG4gIC8vIGRlYWRsaW5lXG4gIGlmICh0aGlzLl90aW1lb3V0ICYmICF0aGlzLl90aW1lcikge1xuICAgIHRoaXMuX3RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1RpbWVvdXQgb2YgJywgc2VsZi5fdGltZW91dCwgJ0VUSU1FJyk7XG4gICAgfSwgdGhpcy5fdGltZW91dCk7XG4gIH1cbiAgLy8gcmVzcG9uc2UgdGltZW91dFxuICBpZiAodGhpcy5fcmVzcG9uc2VUaW1lb3V0ICYmICF0aGlzLl9yZXNwb25zZVRpbWVvdXRUaW1lcikge1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZWxmLl90aW1lb3V0RXJyb3IoJ1Jlc3BvbnNlIHRpbWVvdXQgb2YgJywgc2VsZi5fcmVzcG9uc2VUaW1lb3V0LCAnRVRJTUVET1VUJyk7XG4gICAgfSwgdGhpcy5fcmVzcG9uc2VUaW1lb3V0KTtcbiAgfVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBNb2R1bGUgZGVwZW5kZW5jaWVzLlxuICovXG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEV4cG9zZSBgUmVzcG9uc2VCYXNlYC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc3BvbnNlQmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXNwb25zZUJhc2VgLlxuICpcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVzcG9uc2VCYXNlKG9iaikge1xuICBpZiAob2JqKSByZXR1cm4gbWl4aW4ob2JqKTtcbn1cblxuLyoqXG4gKiBNaXhpbiB0aGUgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gbWl4aW4ob2JqKSB7XG4gIGZvciAoY29uc3Qga2V5IGluIFJlc3BvbnNlQmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlc3BvbnNlQmFzZS5wcm90b3R5cGVba2V5XTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEdldCBjYXNlLWluc2Vuc2l0aXZlIGBmaWVsZGAgdmFsdWUuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oZmllbGQpIHtcbiAgcmV0dXJuIHRoaXMuaGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xufTtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIHJlbGF0ZWQgcHJvcGVydGllczpcbiAqXG4gKiAgIC0gYC50eXBlYCB0aGUgY29udGVudCB0eXBlIHdpdGhvdXQgcGFyYW1zXG4gKlxuICogQSByZXNwb25zZSBvZiBcIkNvbnRlbnQtVHlwZTogdGV4dC9wbGFpbjsgY2hhcnNldD11dGYtOFwiXG4gKiB3aWxsIHByb3ZpZGUgeW91IHdpdGggYSBgLnR5cGVgIG9mIFwidGV4dC9wbGFpblwiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldEhlYWRlclByb3BlcnRpZXMgPSBmdW5jdGlvbihoZWFkZXIpe1xuICAgIC8vIFRPRE86IG1vYXIhXG4gICAgLy8gVE9ETzogbWFrZSB0aGlzIGEgdXRpbFxuXG4gICAgLy8gY29udGVudC10eXBlXG4gICAgY29uc3QgY3QgPSBoZWFkZXJbJ2NvbnRlbnQtdHlwZSddIHx8ICcnO1xuICAgIHRoaXMudHlwZSA9IHV0aWxzLnR5cGUoY3QpO1xuXG4gICAgLy8gcGFyYW1zXG4gICAgY29uc3QgcGFyYW1zID0gdXRpbHMucGFyYW1zKGN0KTtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbXMpIHRoaXNba2V5XSA9IHBhcmFtc1trZXldO1xuXG4gICAgdGhpcy5saW5rcyA9IHt9O1xuXG4gICAgLy8gbGlua3NcbiAgICB0cnkge1xuICAgICAgICBpZiAoaGVhZGVyLmxpbmspIHtcbiAgICAgICAgICAgIHRoaXMubGlua3MgPSB1dGlscy5wYXJzZUxpbmtzKGhlYWRlci5saW5rKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICB9XG59O1xuXG4vKipcbiAqIFNldCBmbGFncyBzdWNoIGFzIGAub2tgIGJhc2VkIG9uIGBzdGF0dXNgLlxuICpcbiAqIEZvciBleGFtcGxlIGEgMnh4IHJlc3BvbnNlIHdpbGwgZ2l2ZSB5b3UgYSBgLm9rYCBvZiBfX3RydWVfX1xuICogd2hlcmVhcyA1eHggd2lsbCBiZSBfX2ZhbHNlX18gYW5kIGAuZXJyb3JgIHdpbGwgYmUgX190cnVlX18uIFRoZVxuICogYC5jbGllbnRFcnJvcmAgYW5kIGAuc2VydmVyRXJyb3JgIGFyZSBhbHNvIGF2YWlsYWJsZSB0byBiZSBtb3JlXG4gKiBzcGVjaWZpYywgYW5kIGAuc3RhdHVzVHlwZWAgaXMgdGhlIGNsYXNzIG9mIGVycm9yIHJhbmdpbmcgZnJvbSAxLi41XG4gKiBzb21ldGltZXMgdXNlZnVsIGZvciBtYXBwaW5nIHJlc3BvbmQgY29sb3JzIGV0Yy5cbiAqXG4gKiBcInN1Z2FyXCIgcHJvcGVydGllcyBhcmUgYWxzbyBkZWZpbmVkIGZvciBjb21tb24gY2FzZXMuIEN1cnJlbnRseSBwcm92aWRpbmc6XG4gKlxuICogICAtIC5ub0NvbnRlbnRcbiAqICAgLSAuYmFkUmVxdWVzdFxuICogICAtIC51bmF1dGhvcml6ZWRcbiAqICAgLSAubm90QWNjZXB0YWJsZVxuICogICAtIC5ub3RGb3VuZFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzdGF0dXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlc3BvbnNlQmFzZS5wcm90b3R5cGUuX3NldFN0YXR1c1Byb3BlcnRpZXMgPSBmdW5jdGlvbihzdGF0dXMpe1xuICAgIGNvbnN0IHR5cGUgPSBzdGF0dXMgLyAxMDAgfCAwO1xuXG4gICAgLy8gc3RhdHVzIC8gY2xhc3NcbiAgICB0aGlzLnN0YXR1cyA9IHRoaXMuc3RhdHVzQ29kZSA9IHN0YXR1cztcbiAgICB0aGlzLnN0YXR1c1R5cGUgPSB0eXBlO1xuXG4gICAgLy8gYmFzaWNzXG4gICAgdGhpcy5pbmZvID0gMSA9PSB0eXBlO1xuICAgIHRoaXMub2sgPSAyID09IHR5cGU7XG4gICAgdGhpcy5yZWRpcmVjdCA9IDMgPT0gdHlwZTtcbiAgICB0aGlzLmNsaWVudEVycm9yID0gNCA9PSB0eXBlO1xuICAgIHRoaXMuc2VydmVyRXJyb3IgPSA1ID09IHR5cGU7XG4gICAgdGhpcy5lcnJvciA9ICg0ID09IHR5cGUgfHwgNSA9PSB0eXBlKVxuICAgICAgICA/IHRoaXMudG9FcnJvcigpXG4gICAgICAgIDogZmFsc2U7XG5cbiAgICAvLyBzdWdhclxuICAgIHRoaXMuY3JlYXRlZCA9IDIwMSA9PSBzdGF0dXM7XG4gICAgdGhpcy5hY2NlcHRlZCA9IDIwMiA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub0NvbnRlbnQgPSAyMDQgPT0gc3RhdHVzO1xuICAgIHRoaXMuYmFkUmVxdWVzdCA9IDQwMCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bmF1dGhvcml6ZWQgPSA0MDEgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90QWNjZXB0YWJsZSA9IDQwNiA9PSBzdGF0dXM7XG4gICAgdGhpcy5mb3JiaWRkZW4gPSA0MDMgPT0gc3RhdHVzO1xuICAgIHRoaXMubm90Rm91bmQgPSA0MDQgPT0gc3RhdHVzO1xuICAgIHRoaXMudW5wcm9jZXNzYWJsZUVudGl0eSA9IDQyMiA9PSBzdGF0dXM7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJldHVybiB0aGUgbWltZSB0eXBlIGZvciB0aGUgZ2l2ZW4gYHN0cmAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy50eXBlID0gc3RyID0+IHN0ci5zcGxpdCgvICo7ICovKS5zaGlmdCgpO1xuXG4vKipcbiAqIFJldHVybiBoZWFkZXIgZmllbGQgcGFyYW1ldGVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnBhcmFtcyA9IHN0ciA9PiBzdHIuc3BsaXQoLyAqOyAqLykucmVkdWNlKChvYmosIHN0cikgPT4ge1xuICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo9ICovKTtcbiAgY29uc3Qga2V5ID0gcGFydHMuc2hpZnQoKTtcbiAgY29uc3QgdmFsID0gcGFydHMuc2hpZnQoKTtcblxuICBpZiAoa2V5ICYmIHZhbCkgb2JqW2tleV0gPSB2YWw7XG4gIHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogUGFyc2UgTGluayBoZWFkZXIgZmllbGRzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyc2VMaW5rcyA9IHN0ciA9PiBzdHIuc3BsaXQoLyAqLCAqLykucmVkdWNlKChvYmosIHN0cikgPT4ge1xuICBjb25zdCBwYXJ0cyA9IHN0ci5zcGxpdCgvICo7ICovKTtcbiAgY29uc3QgdXJsID0gcGFydHNbMF0uc2xpY2UoMSwgLTEpO1xuICBjb25zdCByZWwgPSBwYXJ0c1sxXS5zcGxpdCgvICo9ICovKVsxXS5zbGljZSgxLCAtMSk7XG4gIG9ialtyZWxdID0gdXJsO1xuICByZXR1cm4gb2JqO1xufSwge30pO1xuXG4vKipcbiAqIFN0cmlwIGNvbnRlbnQgcmVsYXRlZCBmaWVsZHMgZnJvbSBgaGVhZGVyYC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gaGVhZGVyXG4gKiBAcmV0dXJuIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5jbGVhbkhlYWRlciA9IChoZWFkZXIsIGNoYW5nZXNPcmlnaW4pID0+IHtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC10eXBlJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2NvbnRlbnQtbGVuZ3RoJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ3RyYW5zZmVyLWVuY29kaW5nJ107XG4gIGRlbGV0ZSBoZWFkZXJbJ2hvc3QnXTtcbiAgLy8gc2VjdWlydHlcbiAgaWYgKGNoYW5nZXNPcmlnaW4pIHtcbiAgICBkZWxldGUgaGVhZGVyWydhdXRob3JpemF0aW9uJ107XG4gICAgZGVsZXRlIGhlYWRlclsnY29va2llJ107XG4gIH1cbiAgcmV0dXJuIGhlYWRlcjtcbn07XG4iLCIvKipcbiAqIFV0aWxpdHkgbWV0aG9kcyB1c2VkIHdoZW4gcXVlcnlpbmcgYSBzaXRlIGluIG9yZGVyIHRvIGRpc2NvdmVyIGl0cyBhdmFpbGFibGVcbiAqIEFQSSBlbmRwb2ludHNcbiAqXG4gKiBAbW9kdWxlIGF1dG9kaXNjb3ZlcnlcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBwYXJzZUxpbmtIZWFkZXIgPSByZXF1aXJlKCAnbGknICkucGFyc2U7XG5cbi8qKlxuICogQXR0ZW1wdCB0byBsb2NhdGUgYSBgcmVsPVwiaHR0cHM6Ly9hcGkudy5vcmdcImAgbGluayByZWxhdGlvbiBoZWFkZXJcbiAqXG4gKiBAbWV0aG9kIGxvY2F0ZUFQSVJvb3RIZWFkZXJcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZSBBIHJlc3BvbnNlIG9iamVjdCB3aXRoIGEgbGluayBvciBoZWFkZXJzIHByb3BlcnR5XG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgVVJMIG9mIHRoZSBsb2NhdGVkIEFQSSByb290XG4gKi9cbmZ1bmN0aW9uIGxvY2F0ZUFQSVJvb3RIZWFkZXIoIHJlc3BvbnNlICkge1xuXHQvLyBTZWUgaHR0cHM6Ly9kZXZlbG9wZXIud29yZHByZXNzLm9yZy9yZXN0LWFwaS91c2luZy10aGUtcmVzdC1hcGkvZGlzY292ZXJ5L1xuXHRjb25zdCByZWwgPSAnaHR0cHM6Ly9hcGkudy5vcmcvJztcblxuXHQvLyBFeHRyYWN0ICYgcGFyc2UgdGhlIHJlc3BvbnNlIGxpbmsgaGVhZGVyc1xuXHRjb25zdCBsaW5rID0gcmVzcG9uc2UubGluayB8fCAoIHJlc3BvbnNlLmhlYWRlcnMgJiYgcmVzcG9uc2UuaGVhZGVycy5saW5rICk7XG5cdGNvbnN0IGhlYWRlcnMgPSBwYXJzZUxpbmtIZWFkZXIoIGxpbmsgKTtcblxuXHRjb25zdCBhcGlIZWFkZXIgPSBoZWFkZXJzICYmIGhlYWRlcnNbIHJlbCBdO1xuXG5cdGlmICggYXBpSGVhZGVyICkge1xuXHRcdHJldHVybiBhcGlIZWFkZXI7XG5cdH1cblxuXHR0aHJvdyBuZXcgRXJyb3IoIGBObyBoZWFkZXIgbGluayBmb3VuZCB3aXRoIHJlbD1cIiR7IHJlbCB9XCJgICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRsb2NhdGVBUElSb290SGVhZGVyOiBsb2NhdGVBUElSb290SGVhZGVyLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuY29uc3QgcXMgPSByZXF1aXJlKCAncXMnICk7XG5cbmNvbnN0IGFscGhhTnVtZXJpY1NvcnQgPSByZXF1aXJlKCAnLi4vdXRpbC9hbHBoYW51bWVyaWMtc29ydCcgKTtcbmNvbnN0IGtleVZhbFRvT2JqID0gcmVxdWlyZSggJy4uL3V0aWwva2V5LXZhbC10by1vYmonICk7XG5jb25zdCBwYXJhbVNldHRlciA9IHJlcXVpcmUoICcuLi91dGlsL3BhcmFtZXRlci1zZXR0ZXInICk7XG5jb25zdCBvYmplY3RSZWR1Y2UgPSByZXF1aXJlKCAnLi4vdXRpbC9vYmplY3QtcmVkdWNlJyApO1xuY29uc3QgdW5pcXVlID0gcmVxdWlyZSggJy4uL3V0aWwvdW5pcXVlJyApO1xuXG4vKipcbiAqIFdQUmVxdWVzdCBpcyB0aGUgYmFzZSBBUEkgcmVxdWVzdCBvYmplY3QgY29uc3RydWN0b3JcbiAqXG4gKiBAY29uc3RydWN0b3IgV1BSZXF1ZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyBBIGhhc2ggb2Ygb3B0aW9ucyBmb3IgdGhlIFdQUmVxdWVzdCBpbnN0YW5jZVxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW5kcG9pbnQgVGhlIGVuZHBvaW50IFVSSSBmb3IgdGhlIGludm9raW5nIFdQQVBJIGluc3RhbmNlXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy50cmFuc3BvcnQgQW4gb2JqZWN0IG9mIGh0dHAgdHJhbnNwb3J0IG1ldGhvZHMgKGdldCwgcG9zdCwgZXRjKVxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnVzZXJuYW1lXSBBIHVzZXJuYW1lIGZvciBhdXRoZW50aWNhdGluZyBBUEkgcmVxdWVzdHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5wYXNzd29yZF0gQSBwYXNzd29yZCBmb3IgYXV0aGVudGljYXRpbmcgQVBJIHJlcXVlc3RzXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubm9uY2VdIEEgV1Agbm9uY2UgZm9yIHVzZSB3aXRoIGNvb2tpZSBhdXRoZW50aWNhdGlvblxuICovXG5mdW5jdGlvbiBXUFJlcXVlc3QoIG9wdGlvbnMgKSB7XG5cdC8qKlxuXHQgKiBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHRoZSByZXF1ZXN0XG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSBfb3B0aW9uc1xuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICogQGRlZmF1bHQge31cblx0ICovXG5cdHRoaXMuX29wdGlvbnMgPSBbXG5cdFx0Ly8gV2hpdGVsaXN0ZWQgb3B0aW9ucyBrZXlzXG5cdFx0J2F1dGgnLFxuXHRcdCdlbmRwb2ludCcsXG5cdFx0J2hlYWRlcnMnLFxuXHRcdCd1c2VybmFtZScsXG5cdFx0J3Bhc3N3b3JkJyxcblx0XHQnbm9uY2UnLFxuXHRdLnJlZHVjZSggKCBsb2NhbE9wdGlvbnMsIGtleSApID0+IHtcblx0XHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9uc1sga2V5IF0gKSB7XG5cdFx0XHRsb2NhbE9wdGlvbnNbIGtleSBdID0gb3B0aW9uc1sga2V5IF07XG5cdFx0fVxuXHRcdHJldHVybiBsb2NhbE9wdGlvbnM7XG5cdH0sIHt9ICk7XG5cblx0LyoqXG5cdCAqIFRoZSBIVFRQIHRyYW5zcG9ydCBtZXRob2RzICguZ2V0LCAucG9zdCwgLnB1dCwgLmRlbGV0ZSwgLmhlYWQpIHRvIHVzZSBmb3IgdGhpcyByZXF1ZXN0XG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSB0cmFuc3BvcnRcblx0ICogQHR5cGUge09iamVjdH1cblx0ICogQHByaXZhdGVcblx0ICovXG5cdHRoaXMudHJhbnNwb3J0ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRyYW5zcG9ydDtcblxuXHQvKipcblx0ICogQSBoYXNoIG9mIHF1ZXJ5IHBhcmFtZXRlcnNcblx0ICogVGhpcyBpcyB1c2VkIHRvIHN0b3JlIHRoZSB2YWx1ZXMgZm9yIHN1cHBvcnRlZCBxdWVyeSBwYXJhbWV0ZXJzIGxpa2UgP19lbWJlZFxuXHQgKlxuXHQgKiBAcHJvcGVydHkgX3BhcmFtc1xuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICogQGRlZmF1bHQge31cblx0ICovXG5cdHRoaXMuX3BhcmFtcyA9IHt9O1xuXG5cdC8qKlxuXHQgKiBNZXRob2RzIHN1cHBvcnRlZCBieSB0aGlzIEFQSSByZXF1ZXN0IGluc3RhbmNlOlxuXHQgKiBJbmRpdmlkdWFsIGVuZHBvaW50IGhhbmRsZXJzIHNwZWNpZnkgdGhlaXIgb3duIHN1YnNldCBvZiBzdXBwb3J0ZWQgbWV0aG9kc1xuXHQgKlxuXHQgKiBAcHJvcGVydHkgX3N1cHBvcnRlZE1ldGhvZHNcblx0ICogQHR5cGUgQXJyYXlcblx0ICogQHByaXZhdGVcblx0ICogQGRlZmF1bHQgWyAnaGVhZCcsICdnZXQnLCAncHV0JywgJ3Bvc3QnLCAnZGVsZXRlJyBdXG5cdCAqL1xuXHR0aGlzLl9zdXBwb3J0ZWRNZXRob2RzID0gWyAnaGVhZCcsICdnZXQnLCAncHV0JywgJ3Bvc3QnLCAnZGVsZXRlJyBdO1xuXG5cdC8qKlxuXHQgKiBBIGhhc2ggb2YgdmFsdWVzIHRvIGFzc2VtYmxlIGludG8gdGhlIEFQSSByZXF1ZXN0IHBhdGhcblx0ICogKFRoaXMgd2lsbCBiZSBvdmVyd3JpdHRlbiBieSBlYWNoIHNwZWNpZmljIGVuZHBvaW50IGhhbmRsZXIgY29uc3RydWN0b3IpXG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSBfcGF0aFxuXHQgKiBAdHlwZSBPYmplY3Rcblx0ICogQHByaXZhdGVcblx0ICogQGRlZmF1bHQge31cblx0ICovXG5cdHRoaXMuX3BhdGggPSB7fTtcbn1cblxuLy8gUHJpdmF0ZSBoZWxwZXIgbWV0aG9kc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIElkZW50aXR5IGZ1bmN0aW9uIGZvciB1c2Ugd2l0aGluIGludm9rZUFuZFByb21pc2lmeSgpXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBpZGVudGl0eSA9IHZhbHVlID0+IHZhbHVlO1xuXG4vKipcbiAqIFByb2Nlc3MgYXJyYXlzIG9mIHRheG9ub215IHRlcm1zIGludG8gcXVlcnkgcGFyYW1ldGVycy5cbiAqIEFsbCB0ZXJtcyBsaXN0ZWQgaW4gdGhlIGFycmF5cyB3aWxsIGJlIHJlcXVpcmVkIChBTkQgYmVoYXZpb3IpLlxuICpcbiAqIFRoaXMgbWV0aG9kIHdpbGwgbm90IGJlIGNhbGxlZCB3aXRoIGFueSB2YWx1ZXMgdW5sZXNzIHdlIGFyZSBoYW5kbGluZ1xuICogYW4gZW5kcG9pbnQgd2l0aCB0aGUgZmlsdGVyIG1peGluOyBob3dldmVyLCBzaW5jZSBwYXJhbWV0ZXIgaGFuZGxpbmdcbiAqIChhbmQgdGhlcmVmb3JlIGBfcmVuZGVyUXVlcnkoKWApIGFyZSBwYXJ0IG9mIFdQUmVxdWVzdCBpdHNlbGYsIHRoaXNcbiAqIGhlbHBlciBtZXRob2QgbGl2ZXMgaGVyZSBhbG9uZ3NpZGUgdGhlIGNvZGUgd2hlcmUgaXQgaXMgdXNlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogICAgIHByZXBhcmVUYXhvbm9taWVzKHtcbiAqICAgICAgICAgdGFnOiBbICd0YWcxICcsICd0YWcyJyBdLCAvLyBieSB0ZXJtIHNsdWdcbiAqICAgICAgICAgY2F0OiBbIDcgXSAvLyBieSB0ZXJtIElEXG4gKiAgICAgfSkgPT09IHtcbiAqICAgICAgICAgdGFnOiAndGFnMSt0YWcyJyxcbiAqICAgICAgICAgY2F0OiAnNydcbiAqICAgICB9XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0YXhvbm9teUZpbHRlcnMgQW4gb2JqZWN0IG9mIHRheG9ub215IHRlcm0gYXJyYXlzLCBrZXllZCBieSB0YXhvbm9teSBuYW1lXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3Qgb2YgcHJlcGFyZUZpbHRlcnMtcmVhZHkgcXVlcnkgYXJnIGFuZCBxdWVyeSBwYXJhbSB2YWx1ZSBwYWlyc1xuICovXG5mdW5jdGlvbiBwcmVwYXJlVGF4b25vbWllcyggdGF4b25vbXlGaWx0ZXJzICkge1xuXHRpZiAoICEgdGF4b25vbXlGaWx0ZXJzICkge1xuXHRcdHJldHVybiB7fTtcblx0fVxuXG5cdHJldHVybiBvYmplY3RSZWR1Y2UoXG5cdFx0dGF4b25vbXlGaWx0ZXJzLFxuXHRcdCggcmVzdWx0LCB0ZXJtcywga2V5ICkgPT4ge1xuXHRcdFx0Ly8gVHJpbSB3aGl0ZXNwYWNlIGFuZCBjb25jYXRlbmF0ZSBtdWx0aXBsZSB0ZXJtcyB3aXRoICtcblx0XHRcdHJlc3VsdFsga2V5IF0gPSB0ZXJtc1xuXHRcdFx0XHQvLyBDb2VyY2UgdGVybSBpbnRvIGEgc3RyaW5nIHNvIHRoYXQgdHJpbSgpIHdvbid0IGZhaWxcblx0XHRcdFx0Lm1hcCggdGVybSA9PiAoIHRlcm0gKyAnJyApLnRyaW0oKS50b0xvd2VyQ2FzZSgpIClcblx0XHRcdFx0LmpvaW4oICcrJyApO1xuXG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0e31cblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gYW4gb2JqZWN0IHdpdGggYW55IHByb3BlcnRpZXMgd2l0aCB1bmRlZmluZWQsIG51bGwgb3IgZW1wdHkgc3RyaW5nXG4gKiB2YWx1ZXMgcmVtb3ZlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICBwb3B1bGF0ZWQoe1xuICogICAgICAgYTogJ2EnLFxuICogICAgICAgYjogJycsXG4gKiAgICAgICBjOiBudWxsXG4gKiAgICAgfSk7IC8vIHsgYTogJ2EnIH1cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBBbiBvYmplY3Qgb2Yga2V5L3ZhbHVlIHBhaXJzXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGF0IG9iamVjdCB3aXRoIGFsbCBlbXB0eSB2YWx1ZXMgcmVtb3ZlZFxuICovXG5jb25zdCBwb3B1bGF0ZWQgPSAoIG9iaiApID0+IHtcblx0aWYgKCAhIG9iaiApIHtcblx0XHRyZXR1cm4gb2JqO1xuXHR9XG5cdHJldHVybiBvYmplY3RSZWR1Y2UoXG5cdFx0b2JqLFxuXHRcdCggdmFsdWVzLCB2YWwsIGtleSApID0+IHtcblx0XHRcdGlmICggdmFsICE9PSB1bmRlZmluZWQgJiYgdmFsICE9PSBudWxsICYmIHZhbCAhPT0gJycgKSB7XG5cdFx0XHRcdHZhbHVlc1sga2V5IF0gPSB2YWw7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdmFsdWVzO1xuXHRcdH0sXG5cdFx0e31cblx0KTtcbn07XG5cbi8qKlxuICogQXNzZXJ0IHdoZXRoZXIgYSBwcm92aWRlZCBVUkwgY29tcG9uZW50IGlzIFwidmFsaWRcIiBieSBjaGVja2luZyBpdCBhZ2FpbnN0XG4gKiBhbiBhcnJheSBvZiByZWdpc3RlcmVkIHBhdGggY29tcG9uZW50IHZhbGlkYXRvciBtZXRob2RzIGZvciB0aGF0IGxldmVsIG9mXG4gKiB0aGUgVVJMIHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0W119IGxldmVsRGVmaW5pdGlvbnMgQW4gYXJyYXkgb2YgTGV2ZWwgRGVmaW5pdGlvbiBvYmplY3RzXG4gKiBAcGFyYW0ge3N0cmluZ30gICBsZXZlbENvbnRlbnRzICAgIFRoZSBVUkwgcGF0aCBzdHJpbmcgdGhhdCBoYXMgYmVlbiBzcGVjaWZpZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIHVzZSBvbiB0aGUgcHJvdmlkZWQgbGV2ZWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBwcm92aWRlZCBpbnB1dCBtYXRjaGVzIGFueSBvZiB0aGUgcHJvdmlkZWRcbiAqIGxldmVsIHZhbGlkYXRpb24gZnVuY3Rpb25zXG4gKi9cbmNvbnN0IHZhbGlkYXRlUGF0aExldmVsID0gKCBsZXZlbERlZmluaXRpb25zLCBsZXZlbENvbnRlbnRzICkgPT4ge1xuXHQvLyBPbmUgXCJsZXZlbFwiIG1heSBoYXZlIG11bHRpcGxlIG9wdGlvbnMsIGFzIGEgcm91dGUgdHJlZSBpcyBhIGJyYW5jaGluZ1xuXHQvLyBzdHJ1Y3R1cmUuIFdlIGNvbnNpZGVyIGEgbGV2ZWwgXCJ2YWxpZFwiIGlmIHRoZSBwcm92aWRlZCBsZXZlbENvbnRlbnRzXG5cdC8vIG1hdGNoIGFueSBvZiB0aGUgYXZhaWxhYmxlIHZhbGlkYXRvcnMuXG5cdGNvbnN0IHZhbGlkID0gbGV2ZWxEZWZpbml0aW9ucy5yZWR1Y2UoICggYW55T3B0aW9uVmFsaWQsIGxldmVsT3B0aW9uICkgPT4ge1xuXHRcdGlmICggISBsZXZlbE9wdGlvbi52YWxpZGF0ZSApIHtcblx0XHRcdC8vIElmIHRoZXJlIGlzIG5vIHZhbGlkYXRvciBmdW5jdGlvbiwgdGhlIGxldmVsIGlzIGltcGxpY2l0bHkgdmFsaWRcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdH1cblx0XHRyZXR1cm4gYW55T3B0aW9uVmFsaWQgfHwgbGV2ZWxPcHRpb24udmFsaWRhdGUoIGxldmVsQ29udGVudHMgKTtcblx0fSwgZmFsc2UgKTtcblxuXHRpZiAoICEgdmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCBbXG5cdFx0XHQnSW52YWxpZCBwYXRoIGNvbXBvbmVudDonLFxuXHRcdFx0bGV2ZWxDb250ZW50cyxcblx0XHRcdC8vIGF3a3dhcmQgcGx1cmFsaXphdGlvbiBzdXBwb3J0OlxuXHRcdFx0J2RvZXMgbm90IG1hdGNoJyArICggbGV2ZWxEZWZpbml0aW9ucy5sZW5ndGggPiAxID8gJyBhbnkgb2YnIDogJycgKSxcblx0XHRcdGxldmVsRGVmaW5pdGlvbnMucmVkdWNlKFxuXHRcdFx0XHQoIGNvbXBvbmVudHMsIGxldmVsT3B0aW9uICkgPT4gY29tcG9uZW50cy5jb25jYXQoIGxldmVsT3B0aW9uLmNvbXBvbmVudCApLFxuXHRcdFx0XHRbXVxuXHRcdFx0KS5qb2luKCAnLCAnICksXG5cdFx0XS5qb2luKCAnICcgKSApO1xuXHR9XG59O1xuXG4vLyAoU2VtaS0pUHJpdmF0ZSBQcm90b3R5cGUgTWV0aG9kc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBQcm9jZXNzIHRoZSBlbmRwb2ludCBxdWVyeSdzIGZpbHRlciBvYmplY3RzIGludG8gYSB2YWxpZCBxdWVyeSBzdHJpbmcuXG4gKiBOZXN0ZWQgb2JqZWN0cyBhbmQgQXJyYXkgcHJvcGVydGllcyBhcmUgcmVuZGVyZWQgd2l0aCBpbmRleGVkIGFycmF5IHN5bnRheC5cbiAqXG4gKiBAZXhhbXBsZVxuICogICAgIF9yZW5kZXJRdWVyeSh7IHAxOiAndmFsMScsIHAyOiAndmFsMicgfSk7ICAvLyA/cDE9dmFsMSZwMj12YWwyXG4gKiAgICAgX3JlbmRlclF1ZXJ5KHsgb2JqOiB7IHByb3A6ICd2YWwnIH0gfSk7ICAgIC8vID9vYmpbcHJvcF09dmFsXG4gKiAgICAgX3JlbmRlclF1ZXJ5KHsgYXJyOiBbICd2YWwxJywgJ3ZhbDInIF0gfSk7IC8vID9hcnJbMF09dmFsMSZhcnJbMV09dmFsMlxuICpcbiAqIEBwcml2YXRlXG4gKlxuICogQG1ldGhvZCBfcmVuZGVyUXVlcnlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IEEgcXVlcnkgc3RyaW5nIHJlcHJlc2VudGluZyB0aGUgc3BlY2lmaWVkIGZpbHRlciBwYXJhbWV0ZXJzXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuX3JlbmRlclF1ZXJ5ID0gZnVuY3Rpb24oKSB7XG5cdC8vIEJ1aWxkIHRoZSBmdWxsIHF1ZXJ5IHBhcmFtZXRlcnMgb2JqZWN0XG5cdGNvbnN0IHF1ZXJ5UGFyYW1zID0ge1xuXHRcdC4uLnBvcHVsYXRlZCggdGhpcy5fcGFyYW1zICksXG5cdH07XG5cblx0Ly8gUHJlcGFyZSBhbnkgdGF4b25vbWllcyBhbmQgbWVyZ2Ugd2l0aCBvdGhlciBmaWx0ZXIgdmFsdWVzXG5cdGNvbnN0IHRheG9ub21pZXMgPSBwcmVwYXJlVGF4b25vbWllcyggdGhpcy5fdGF4b25vbXlGaWx0ZXJzICk7XG5cdHF1ZXJ5UGFyYW1zLmZpbHRlciA9IHtcblx0XHQuLi5wb3B1bGF0ZWQoIHRoaXMuX2ZpbHRlcnMgKSxcblx0XHQuLi50YXhvbm9taWVzLFxuXHR9O1xuXG5cdC8vIFBhcnNlIHF1ZXJ5IHBhcmFtZXRlcnMgb2JqZWN0IGludG8gYSBxdWVyeSBzdHJpbmcsIHNvcnRpbmcgdGhlIG9iamVjdFxuXHQvLyBwcm9wZXJ0aWVzIGJ5IGFscGhhYmV0aWNhbCBvcmRlciAoY29uc2lzdGVudCBwcm9wZXJ0eSBvcmRlcmluZyBjYW4gbWFrZVxuXHQvLyBmb3IgZWFzaWVyIGNhY2hpbmcgb2YgcmVxdWVzdCBVUklzKVxuXHRjb25zdCBxdWVyeVN0cmluZyA9IHFzLnN0cmluZ2lmeSggcXVlcnlQYXJhbXMsIHsgYXJyYXlGb3JtYXQ6ICdicmFja2V0cycgfSApXG5cdFx0LnNwbGl0KCAnJicgKVxuXHRcdC5zb3J0KClcblx0XHQuam9pbiggJyYnICk7XG5cblx0Ly8gQ2hlY2sgaWYgdGhlIGVuZHBvaW50IGNvbnRhaW5zIGEgcHJldmlvdXMgcXVlcnkgYW5kIHNldCB0aGUgcXVlcnkgY2hhcmFjdGVyIGFjY29yZGluZ2x5LlxuXHRjb25zdCBxdWVyeUNoYXJhY3RlciA9IC9cXD8vLnRlc3QoIHRoaXMuX29wdGlvbnMuZW5kcG9pbnQgKSA/ICcmJyA6ICc/JztcblxuXHQvLyBQcmVwZW5kIGEgXCI/XCIgKG9yIGEgXCImXCIpIGlmIGEgcXVlcnkgaXMgcHJlc2VudCwgYW5kIHJldHVybi5cblx0cmV0dXJuICggcXVlcnlTdHJpbmcgPT09ICcnICkgPyAnJyA6IHF1ZXJ5Q2hhcmFjdGVyICsgcXVlcnlTdHJpbmc7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlICYgYXNzZW1ibGUgYSBwYXRoIHN0cmluZyBmcm9tIHRoZSByZXF1ZXN0IG9iamVjdCdzIF9wYXRoXG4gKlxuICogQHByaXZhdGVcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSByZW5kZXJlZCBwYXRoXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuX3JlbmRlclBhdGggPSBmdW5jdGlvbigpIHtcblx0Ly8gQ2FsbCB2YWxpZGF0ZVBhdGg6IGlmIHRoZSBwcm92aWRlZCBwYXRoIGNvbXBvbmVudHMgYXJlIG5vdCB3ZWxsLWZvcm1lZCxcblx0Ly8gYW4gZXJyb3Igd2lsbCBiZSB0aHJvd25cblx0dGhpcy52YWxpZGF0ZVBhdGgoKTtcblxuXHRjb25zdCBwYXRoUGFydHMgPSB0aGlzLl9wYXRoO1xuXHRjb25zdCBvcmRlcmVkUGF0aFBhcnRzID0gT2JqZWN0LmtleXMoIHBhdGhQYXJ0cyApXG5cdFx0LnNvcnQoICggYSwgYiApID0+IHtcblx0XHRcdGNvbnN0IGludEEgPSBwYXJzZUludCggYSwgMTAgKTtcblx0XHRcdGNvbnN0IGludEIgPSBwYXJzZUludCggYiwgMTAgKTtcblx0XHRcdHJldHVybiBpbnRBIC0gaW50Qjtcblx0XHR9IClcblx0XHQubWFwKCBwYXRoUGFydEtleSA9PiBwYXRoUGFydHNbIHBhdGhQYXJ0S2V5IF0gKTtcblxuXHQvLyBDb21iaW5lIGFsbCBwYXJ0cyBvZiB0aGUgcGF0aCB0b2dldGhlciwgZmlsdGVyZWQgdG8gb21pdCBhbnkgY29tcG9uZW50c1xuXHQvLyB0aGF0IGFyZSB1bnNwZWNpZmllZCBvciBlbXB0eSBzdHJpbmdzLCB0byBjcmVhdGUgdGhlIGZ1bGwgcGF0aCB0ZW1wbGF0ZVxuXHRjb25zdCBwYXRoID0gW1xuXHRcdHRoaXMuX25hbWVzcGFjZSxcblx0XS5jb25jYXQoIG9yZGVyZWRQYXRoUGFydHMgKS5maWx0ZXIoIGlkZW50aXR5ICkuam9pbiggJy8nICk7XG5cblx0cmV0dXJuIHBhdGg7XG59O1xuXG4vLyBQdWJsaWMgUHJvdG90eXBlIE1ldGhvZHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFBhcnNlIHRoZSByZXF1ZXN0IGludG8gYSBXb3JkUHJlc3MgQVBJIHJlcXVlc3QgVVJJIHN0cmluZ1xuICpcbiAqIEBtZXRob2RcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVUkkgZm9yIHRoZSBIVFRQIHJlcXVlc3QgdG8gYmUgc2VudFxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG5cdC8vIFJlbmRlciB0aGUgcGF0aCB0byBhIHN0cmluZ1xuXHRjb25zdCBwYXRoID0gdGhpcy5fcmVuZGVyUGF0aCgpO1xuXG5cdC8vIFJlbmRlciB0aGUgcXVlcnkgc3RyaW5nXG5cdGNvbnN0IHF1ZXJ5U3RyID0gdGhpcy5fcmVuZGVyUXVlcnkoKTtcblxuXHRyZXR1cm4gdGhpcy5fb3B0aW9ucy5lbmRwb2ludCArIHBhdGggKyBxdWVyeVN0cjtcbn07XG5cbi8qKlxuICogU2V0IGEgY29tcG9uZW50IG9mIHRoZSByZXNvdXJjZSBVUkwgaXRzZWxmIChhcyBvcHBvc2VkIHRvIGEgcXVlcnkgcGFyYW1ldGVyKVxuICpcbiAqIElmIGEgcGF0aCBjb21wb25lbnQgaGFzIGFscmVhZHkgYmVlbiBzZXQgYXQgdGhpcyBsZXZlbCwgdGhyb3cgYW4gZXJyb3I6XG4gKiByZXF1ZXN0cyBhcmUgbWVhbnQgdG8gYmUgdHJhbnNpZW50LCBzbyBhbnkgcmUtd3JpdGluZyBvZiBhIHByZXZpb3VzbHktc2V0XG4gKiBwYXRoIHBhcnQgdmFsdWUgaXMgbGlrZWx5IHRvIGJlIGEgbWlzdGFrZS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IGxldmVsIEEgXCJsZXZlbFwiIG9mIHRoZSBwYXRoIHRvIHNldCwgZS5nLiBcIjFcIiBvciBcIjJcIlxuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSB2YWwgICBUaGUgdmFsdWUgdG8gc2V0IGF0IHRoYXQgcGF0aCBwYXJ0IGxldmVsXG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuc2V0UGF0aFBhcnQgPSBmdW5jdGlvbiggbGV2ZWwsIHZhbCApIHtcblx0aWYgKCB0aGlzLl9wYXRoWyBsZXZlbCBdICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggJ0Nhbm5vdCBvdmVyd3JpdGUgdmFsdWUgJyArIHRoaXMuX3BhdGhbIGxldmVsIF0gKTtcblx0fVxuXHR0aGlzLl9wYXRoWyBsZXZlbCBdID0gdmFsO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBWYWxpZGF0ZSB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgcGF0aCBwYXJ0cyBhcmUgdmFsaWQgZm9yIHRoaXMgZW5kcG9pbnRcbiAqXG4gKiBcIlBhdGggcGFydHNcIiBhcmUgbm9uLXF1ZXJ5LXN0cmluZyBVUkwgc2VnbWVudHMsIGxpa2UgXCJzb21lXCIgXCJwYXRoXCIgaW4gdGhlIFVSTFxuICogYG15ZG9tYWluLmNvbS9zb21lL3BhdGg/YW5kPWEmcXVlcnk9c3RyaW5nJnRvb2AuIEJlY2F1c2UgYSB3ZWxsLWZvcm1lZCBwYXRoXG4gKiBpcyBuZWNlc3NhcnkgdG8gZXhlY3V0ZSBhIHN1Y2Nlc3NmdWwgQVBJIHJlcXVlc3QsIHdlIHRocm93IGFuIGVycm9yIGlmIHRoZVxuICogdXNlciBoYXMgb21pdHRlZCBhIHZhbHVlIChzdWNoIGFzIGAvc29tZS9bbWlzc2luZyBjb21wb25lbnRdL3VybGApIG9yIGhhc1xuICogcHJvdmlkZWQgYSBwYXRoIHBhcnQgdmFsdWUgdGhhdCBkb2VzIG5vdCBtYXRjaCB0aGUgcmVndWxhciBleHByZXNzaW9uIHRoZVxuICogQVBJIHVzZXMgdG8gZ292ZW4gdGhhdCBzZWdtZW50LlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZyksIGlmIG5vIGVycm9ycyB3ZXJlIGZvdW5kXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUudmFsaWRhdGVQYXRoID0gZnVuY3Rpb24oKSB7XG5cdC8vIEl0ZXJhdGUgdGhyb3VnaCBhbGwgX3NwZWNpZmllZF8gbGV2ZWxzIG9mIHRoaXMgZW5kcG9pbnRcblx0Y29uc3Qgc3BlY2lmaWVkTGV2ZWxzID0gT2JqZWN0LmtleXMoIHRoaXMuX3BhdGggKVxuXHRcdC5tYXAoIGxldmVsID0+IHBhcnNlSW50KCBsZXZlbCwgMTAgKSApXG5cdFx0LmZpbHRlciggcGF0aFBhcnRLZXkgPT4gISBpc05hTiggcGF0aFBhcnRLZXkgKSApO1xuXG5cdGNvbnN0IG1heExldmVsID0gTWF0aC5tYXguYXBwbHkoIG51bGwsIHNwZWNpZmllZExldmVscyApO1xuXG5cdC8vIEVuc3VyZSB0aGF0IGFsbCBuZWNlc3NhcnkgbGV2ZWxzIGFyZSBzcGVjaWZpZWRcblx0Y29uc3QgcGF0aCA9IFtdO1xuXHRsZXQgdmFsaWQgPSB0cnVlO1xuXG5cdGZvciAoIGxldCBsZXZlbCA9IDA7IGxldmVsIDw9IG1heExldmVsOyBsZXZlbCsrICkge1xuXG5cdFx0aWYgKCAhIHRoaXMuX2xldmVscyB8fCAhIHRoaXMuX2xldmVsc1sgbGV2ZWwgXSApIHtcblx0XHRcdGNvbnRpbnVlO1xuXHRcdH1cblxuXHRcdGlmICggdGhpcy5fcGF0aFsgbGV2ZWwgXSApIHtcblx0XHRcdC8vIFZhbGlkYXRlIHRoZSBwcm92aWRlZCBwYXRoIGxldmVsIGFnYWluc3QgYWxsIGF2YWlsYWJsZSBwYXRoIHZhbGlkYXRvcnNcblx0XHRcdHZhbGlkYXRlUGF0aExldmVsKCB0aGlzLl9sZXZlbHNbIGxldmVsIF0sIHRoaXMuX3BhdGhbIGxldmVsIF0gKTtcblxuXHRcdFx0Ly8gQWRkIHRoZSBwYXRoIHZhbHVlIHRvIHRoZSBhcnJheVxuXHRcdFx0cGF0aC5wdXNoKCB0aGlzLl9wYXRoWyBsZXZlbCBdICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhdGgucHVzaCggJyA/Pz8gJyApO1xuXHRcdFx0dmFsaWQgPSBmYWxzZTtcblx0XHR9XG5cdH1cblxuXHRpZiAoICEgdmFsaWQgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCAnSW5jb21wbGV0ZSBVUkwhIE1pc3NpbmcgY29tcG9uZW50OiAvJyArIHBhdGguam9pbiggJy8nICkgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgYSBwYXJhbWV0ZXIgdG8gcmVuZGVyIGludG8gdGhlIGZpbmFsIHF1ZXJ5IFVSSS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IHByb3BzIFRoZSBuYW1lIG9mIHRoZSBwYXJhbWV0ZXIgdG8gc2V0LCBvciBhbiBvYmplY3QgY29udGFpbmluZ1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXIga2V5cyBhbmQgdGhlaXIgY29ycmVzcG9uZGluZyB2YWx1ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gW3ZhbHVlXSBUaGUgdmFsdWUgb2YgdGhlIHBhcmFtZXRlciBiZWluZyBzZXRcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5wYXJhbSA9IGZ1bmN0aW9uKCBwcm9wcywgdmFsdWUgKSB7XG5cdGlmICggISBwcm9wcyB8fCB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0Ly8gV2UgaGF2ZSBubyBwcm9wZXJ0eSB0byBzZXQsIG9yIG5vIHZhbHVlIHRvIHNldCBmb3IgdGhhdCBwcm9wZXJ0eVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cblx0Ly8gV2UgY2FuIHVzZSB0aGUgc2FtZSBpdGVyYXRvciBmdW5jdGlvbiBiZWxvdyB0byBoYW5kbGUgZXhwbGljaXQga2V5LXZhbHVlXG5cdC8vIHBhaXJzIGlmIHdlIGNvbnZlcnQgdGhlbSBpbnRvIHRvIGFuIG9iamVjdCB3ZSBjYW4gaXRlcmF0ZSBvdmVyOlxuXHRpZiAoIHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycgKSB7XG5cdFx0cHJvcHMgPSBrZXlWYWxUb09iaiggcHJvcHMsIHZhbHVlICk7XG5cdH1cblxuXHQvLyBJdGVyYXRlIHRocm91Z2ggdGhlIHByb3BlcnRpZXNcblx0T2JqZWN0LmtleXMoIHByb3BzICkuZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cdFx0bGV0IHZhbHVlID0gcHJvcHNbIGtleSBdO1xuXG5cdFx0Ly8gQXJyYXlzIHNob3VsZCBiZSBkZS1kdXBlZCBhbmQgc29ydGVkXG5cdFx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWx1ZSApICkge1xuXHRcdFx0dmFsdWUgPSB1bmlxdWUoIHZhbHVlICkuc29ydCggYWxwaGFOdW1lcmljU29ydCApO1xuXHRcdH1cblxuXHRcdC8vIFNldCB0aGUgdmFsdWVcblx0XHR0aGlzLl9wYXJhbXNbIGtleSBdID0gdmFsdWU7XG5cdH0gKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8vIEdsb2JhbGx5LWFwcGxpY2FibGUgcGFyYW1ldGVycyB0aGF0IGltcGFjdCB0aGUgc2hhcGUgb2YgdGhlIHJlcXVlc3Qgb3IgcmVzcG9uc2Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBTZXQgdGhlIGNvbnRleHQgb2YgdGhlIHJlcXVlc3QuIFVzZWQgcHJpbWFyaWx5IHRvIGV4cG9zZSBwcml2YXRlIHZhbHVlcyBvbiBhXG4gKiByZXF1ZXN0IG9iamVjdCBieSBzZXR0aW5nIHRoZSBjb250ZXh0IHRvIFwiZWRpdFwiLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBjb250ZXh0IFRoZSBjb250ZXh0IHRvIHNldCBvbiB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1dQUmVxdWVzdH0gVGhlIFdQUmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLmNvbnRleHQgPSBwYXJhbVNldHRlciggJ2NvbnRleHQnICk7XG5cbi8qKlxuICogQ29udmVuaWVuY2Ugd3JhcHBlciBmb3IgYC5jb250ZXh0KCAnZWRpdCcgKWBcbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuZWRpdCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5jb250ZXh0KCAnZWRpdCcgKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGVtYmVkZGVkIHJlc291cmNlcyBhcyBwYXJ0IG9mIHRoZSByZXNwb25zZSBwYXlsb2FkLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5lbWJlZCA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy5wYXJhbSggJ19lbWJlZCcsIHRydWUgKTtcbn07XG5cbi8vIFBhcmFtZXRlcnMgc3VwcG9ydGVkIGJ5IGFsbC9uZWFybHkgYWxsIGRlZmF1bHQgY29sbGVjdGlvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBTZXQgdGhlIHBhZ2luYXRpb24gb2YgYSByZXF1ZXN0LiBVc2UgaW4gY29uanVuY3Rpb24gd2l0aCBgLnBlclBhZ2UoKWAgZm9yIGV4cGxpY2l0XG4gKiBwYWdpbmF0aW9uIGhhbmRsaW5nLiAoVGhlIG51bWJlciBvZiBwYWdlcyBpbiBhIHJlc3BvbnNlIGNhbiBiZSByZXRyaWV2ZWQgZnJvbSB0aGVcbiAqIHJlc3BvbnNlJ3MgYF9wYWdpbmcudG90YWxQYWdlc2AgcHJvcGVydHkuKVxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBwYWdlTnVtYmVyIFRoZSBwYWdlIG51bWJlciBvZiByZXN1bHRzIHRvIHJldHJpZXZlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnBhZ2UgPSBwYXJhbVNldHRlciggJ3BhZ2UnICk7XG5cbi8qKlxuICogU2V0IHRoZSBudW1iZXIgb2YgaXRlbXMgdG8gYmUgcmV0dXJuZWQgaW4gYSBwYWdlIG9mIHJlc3BvbnNlcy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcn0gaXRlbXNQZXJQYWdlIFRoZSBudW1iZXIgb2YgaXRlbXMgdG8gcmV0dXJuIGluIG9uZSBwYWdlIG9mIHJlc3VsdHNcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUucGVyUGFnZSA9IHBhcmFtU2V0dGVyKCAncGVyX3BhZ2UnICk7XG5cbi8qKlxuICogU2V0IGFuIGFyYml0cmFyeSBvZmZzZXQgdG8gcmV0cmlldmUgaXRlbXMgZnJvbSBhIHNwZWNpZmljIHBvaW50IGluIGEgY29sbGVjdGlvbi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcn0gb2Zmc2V0TnVtYmVyIFRoZSBudW1iZXIgb2YgaXRlbXMgYnkgd2hpY2ggdG8gb2Zmc2V0IHRoZSByZXNwb25zZVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5vZmZzZXQgPSBwYXJhbVNldHRlciggJ29mZnNldCcgKTtcblxuLyoqXG4gKiBDaGFuZ2UgdGhlIHNvcnQgZGlyZWN0aW9uIG9mIGEgcmV0dXJuZWQgY29sbGVjdGlvblxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPm9yZGVyIGNvbW1lbnRzIGNocm9ub2xvZ2ljYWxseSAob2xkZXN0IGZpcnN0KTwvY2FwdGlvbj5cbiAqXG4gKiAgICAgc2l0ZS5jb21tZW50cygpLm9yZGVyKCAnYXNjJyApLi4uXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd9IGRpcmVjdGlvbiBUaGUgb3JkZXIgdG8gdXNlIHdoZW4gc29ydGluZyB0aGUgcmVzcG9uc2VcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUub3JkZXIgPSBwYXJhbVNldHRlciggJ29yZGVyJyApO1xuXG4vKipcbiAqIE9yZGVyIGEgY29sbGVjdGlvbiBieSBhIHNwZWNpZmljIGZpZWxkXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkIFRoZSBmaWVsZCBieSB3aGljaCB0byBvcmRlciB0aGUgcmVzcG9uc2VcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUub3JkZXJieSA9IHBhcmFtU2V0dGVyKCAnb3JkZXJieScgKTtcblxuLyoqXG4gKiBGaWx0ZXIgcmVzdWx0cyB0byB0aG9zZSBtYXRjaGluZyB0aGUgc3BlY2lmaWVkIHNlYXJjaCB0ZXJtcy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2VhcmNoU3RyaW5nIEEgc3RyaW5nIHRvIHNlYXJjaCBmb3Igd2l0aGluIHBvc3QgY29udGVudFxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5zZWFyY2ggPSBwYXJhbVNldHRlciggJ3NlYXJjaCcgKTtcblxuLyoqXG4gKiBJbmNsdWRlIHNwZWNpZmljIHJlc291cmNlIElEcyBpbiB0aGUgcmVzcG9uc2UgY29sbGVjdGlvbi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcnxOdW1iZXJbXX0gaWRzIEFuIElEIG9yIGFycmF5IG9mIElEcyB0byBpbmNsdWRlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLmluY2x1ZGUgPSBwYXJhbVNldHRlciggJ2luY2x1ZGUnICk7XG5cbi8qKlxuICogRXhjbHVkZSBzcGVjaWZpYyByZXNvdXJjZSBJRHMgaW4gdGhlIHJlc3BvbnNlIGNvbGxlY3Rpb24uXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtOdW1iZXJ8TnVtYmVyW119IGlkcyBBbiBJRCBvciBhcnJheSBvZiBJRHMgdG8gZXhjbHVkZVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5leGNsdWRlID0gcGFyYW1TZXR0ZXIoICdleGNsdWRlJyApO1xuXG4vKipcbiAqIFF1ZXJ5IGEgY29sbGVjdGlvbiBmb3IgbWVtYmVycyB3aXRoIGEgc3BlY2lmaWMgc2x1Zy5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gc2x1ZyBBIHBvc3Qgc2x1ZyAoc2x1ZyksIGUuZy4gXCJoZWxsby13b3JsZFwiXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnNsdWcgPSBwYXJhbVNldHRlciggJ3NsdWcnICk7XG5cbi8vIEhUVFAgVHJhbnNwb3J0IFByb3RvdHlwZSBNZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vLyBDaGFpbmluZyBtZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09XG5cbi8qKlxuICogU2V0IHRoZSBuYW1lc3BhY2Ugb2YgdGhlIHJlcXVlc3QsIGUuZy4gdG8gc3BlY2lmeSB0aGUgQVBJIHJvb3QgZm9yIHJvdXRlc1xuICogcmVnaXN0ZXJlZCBieSB3cCBjb3JlIHYyIChcIndwL3YyXCIpIG9yIGJ5IGFueSBnaXZlbiBwbHVnaW4uIEFueSBwcmV2aW91c2x5LVxuICogc2V0IG5hbWVzcGFjZSB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IHN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIG1ldGhvZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlIEEgbmFtZXNwYWNlIHN0cmluZywgZS5nLiBcIndwL3YyXCJcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5uYW1lc3BhY2UgPSBmdW5jdGlvbiggbmFtZXNwYWNlICkge1xuXHR0aGlzLl9uYW1lc3BhY2UgPSBuYW1lc3BhY2U7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgYSByZXF1ZXN0IHRvIHVzZSBhdXRoZW50aWNhdGlvbiwgYW5kIG9wdGlvbmFsbHkgcHJvdmlkZSBhdXRoIGNyZWRlbnRpYWxzXG4gKlxuICogSWYgYXV0aCBjcmVkZW50aWFscyB3ZXJlIGFscmVhZHkgc3BlY2lmaWVkIHdoZW4gdGhlIFdQQVBJIGluc3RhbmNlIHdhcyBjcmVhdGVkLCBjYWxsaW5nXG4gKiBgLmF1dGhgIG9uIHRoZSByZXF1ZXN0IGNoYWluIHdpbGwgc2V0IHRoYXQgcmVxdWVzdCB0byB1c2UgdGhlIGV4aXN0aW5nIGNyZWRlbnRpYWxzOlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnVzZSBleGlzdGluZyBjcmVkZW50aWFsczwvY2FwdGlvbj5cbiAqXG4gKiAgICAgcmVxdWVzdC5hdXRoKCkuZ2V0Li4uXG4gKlxuICogQWx0ZXJuYXRpdmVseSwgYSB1c2VybmFtZSAmIHBhc3N3b3JkIChvciBub25jZSkgY2FuIGJlIGV4cGxpY2l0bHkgcGFzc2VkIGludG8gYC5hdXRoYDpcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj51c2UgZXhwbGljaXQgYmFzaWMgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHM8L2NhcHRpb24+XG4gKlxuICogICAgIHJlcXVlc3QuYXV0aCh7XG4gKiAgICAgICB1c2VybmFtZTogJ2FkbWluJyxcbiAqICAgICAgIHBhc3N3b3JkOiAnc3VwZXIgc2VjdXJlJ1xuICogICAgIH0pLmdldC4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnVzZSBhIG5vbmNlIGZvciBjb29raWUgYXV0aGVudGljYXRpb248L2NhcHRpb24+XG4gKlxuICogICAgIHJlcXVlc3QuYXV0aCh7XG4gKiAgICAgICBub25jZTogJ3NvbWVub25jZSdcbiAqICAgICB9KS4uLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjcmVkZW50aWFscyAgICAgICAgICAgIEFuIG9iamVjdCB3aXRoICd1c2VybmFtZScgYW5kICdwYXNzd29yZCcgc3RyaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0aWVzLCBvciBlbHNlIGEgJ25vbmNlJyBwcm9wZXJ0eVxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy51c2VybmFtZV0gQSBXUC1BUEkgQmFzaWMgSFRUUCBBdXRoZW50aWNhdGlvbiB1c2VybmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy5wYXNzd29yZF0gQSBXUC1BUEkgQmFzaWMgSFRUUCBBdXRoZW50aWNhdGlvbiBwYXNzd29yZFxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy5ub25jZV0gICAgQSBXUCBub25jZSBmb3IgdXNlIHdpdGggY29va2llIGF1dGhlbnRpY2F0aW9uXG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuYXV0aCA9IGZ1bmN0aW9uKCBjcmVkZW50aWFscyApIHtcblx0aWYgKCB0eXBlb2YgY3JlZGVudGlhbHMgPT09ICdvYmplY3QnICkge1xuXHRcdGlmICggdHlwZW9mIGNyZWRlbnRpYWxzLnVzZXJuYW1lID09PSAnc3RyaW5nJyApIHtcblx0XHRcdHRoaXMuX29wdGlvbnMudXNlcm5hbWUgPSBjcmVkZW50aWFscy51c2VybmFtZTtcblx0XHR9XG5cblx0XHRpZiAoIHR5cGVvZiBjcmVkZW50aWFscy5wYXNzd29yZCA9PT0gJ3N0cmluZycgKSB7XG5cdFx0XHR0aGlzLl9vcHRpb25zLnBhc3N3b3JkID0gY3JlZGVudGlhbHMucGFzc3dvcmQ7XG5cdFx0fVxuXG5cdFx0aWYgKCBjcmVkZW50aWFscy5ub25jZSApIHtcblx0XHRcdHRoaXMuX29wdGlvbnMubm9uY2UgPSBjcmVkZW50aWFscy5ub25jZTtcblx0XHR9XG5cdH1cblxuXHQvLyBTZXQgdGhlIFwiYXV0aFwiIG9wdGlvbnMgZmxhZyB0aGF0IHdpbGwgZm9yY2UgYXV0aGVudGljYXRpb24gb24gdGhpcyByZXF1ZXN0XG5cdHRoaXMuX29wdGlvbnMuYXV0aCA9IHRydWU7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNwZWNpZnkgYSBmaWxlIG9yIGEgZmlsZSBidWZmZXIgdG8gYXR0YWNoIHRvIHRoZSByZXF1ZXN0LCBmb3IgdXNlIHdoZW5cbiAqIGNyZWF0aW5nIGEgbmV3IE1lZGlhIGl0ZW1cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj53aXRoaW4gYSBzZXJ2ZXIgY29udGV4dDwvY2FwdGlvbj5cbiAqXG4gKiAgICAgd3AubWVkaWEoKVxuICogICAgICAgLy8gUGFzcyAuZmlsZSgpIHRoZSBmaWxlIHN5c3RlbSBwYXRoIHRvIGEgZmlsZSB0byB1cGxvYWRcbiAqICAgICAgIC5maWxlKCAnL3BhdGgvdG8vZmlsZS5qcGcnIClcbiAqICAgICAgIC5jcmVhdGUoe30pLi4uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+d2l0aGluIGEgYnJvd3NlciBjb250ZXh0PC9jYXB0aW9uPlxuICpcbiAqICAgICB3cC5tZWRpYSgpXG4gKiAgICAgICAvLyBQYXNzIC5maWxlKCkgdGhlIGZpbGUgcmVmZXJlbmNlIGZyb20gYW4gSFRNTCBmaWxlIGlucHV0XG4gKiAgICAgICAuZmlsZSggZG9jdW1lbnQucXVlcnlTZWxlY3RvciggJ2lucHV0W3R5cGU9XCJmaWxlXCJdJyApLmZpbGVzWzBdIClcbiAqICAgICAgIC5jcmVhdGUoe30pLi4uXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSBmaWxlICAgQSBwYXRoIHRvIGEgZmlsZSAoaW4gTm9kZSkgb3IgYW4gZmlsZSBvYmplY3RcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChOb2RlIG9yIEJyb3dzZXIpIHRvIGF0dGFjaCB0byB0aGUgcmVxdWVzdFxuICogQHBhcmFtIHtzdHJpbmd9ICAgICAgICBbbmFtZV0gQW4gKG9wdGlvbmFsKSBmaWxlbmFtZSB0byB1c2UgZm9yIHRoZSBmaWxlXG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuZmlsZSA9IGZ1bmN0aW9uKCBmaWxlLCBuYW1lICkge1xuXHR0aGlzLl9hdHRhY2htZW50ID0gZmlsZTtcblx0Ly8gRXhwbGljaXRseSBzZXQgdG8gdW5kZWZpbmVkIGlmIG5vdCBwcm92aWRlZCwgdG8gb3ZlcnJpZGUgYW55IHByZXZpb3VzbHktXG5cdC8vIHNldCBhdHRhY2htZW50IG5hbWUgcHJvcGVydHkgdGhhdCBtaWdodCBleGlzdCBmcm9tIGEgcHJpb3IgYC5maWxlKClgIGNhbGxcblx0dGhpcy5fYXR0YWNobWVudE5hbWUgPSBuYW1lID8gbmFtZSA6IHVuZGVmaW5lZDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vLyBIVFRQIE1ldGhvZHM6IFB1YmxpYyBJbnRlcmZhY2Vcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFNwZWNpZnkgb25lIG9yIG1vcmUgaGVhZGVycyB0byBzZW5kIHdpdGggdGhlIGRpc3BhdGNoZWQgSFRUUCByZXF1ZXN0LlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldCBhIHNpbmdsZSBoZWFkZXIgdG8gYmUgdXNlZCBvbiB0aGlzIHJlcXVlc3Q8L2NhcHRpb24+XG4gKlxuICogICAgIHJlcXVlc3Quc2V0SGVhZGVycyggJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyIHRydXN0bWUnICkuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXQgbXVsdGlwbGUgaGVhZGVycyB0byBiZSB1c2VkIGJ5IHRoaXMgcmVxdWVzdDwvY2FwdGlvbj5cbiAqXG4gKiAgICAgcmVxdWVzdC5zZXRIZWFkZXJzKHtcbiAqICAgICAgIEF1dGhvcml6YXRpb246ICdCZWFyZXIgY29tZW9ud2VyZW9sZGZyaWVuZHNyaWdodCcsXG4gKiAgICAgICAnQWNjZXB0LUxhbmd1YWdlJzogJ2VuLUNBJ1xuICogICAgIH0pLi4uXG4gKlxuICogQHNpbmNlIDEuMS4wXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGhlYWRlcnMgVGhlIG5hbWUgb2YgdGhlIGhlYWRlciB0byBzZXQsIG9yIGFuIG9iamVjdCBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlciBuYW1lcyBhbmQgdGhlaXIgYXNzb2NpYXRlZCBzdHJpbmcgdmFsdWVzXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFt2YWx1ZV0gVGhlIHZhbHVlIG9mIHRoZSBoZWFkZXIgYmVpbmcgc2V0XG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuc2V0SGVhZGVycyA9IGZ1bmN0aW9uKCBoZWFkZXJzLCB2YWx1ZSApIHtcblx0Ly8gV2UgY2FuIHVzZSB0aGUgc2FtZSBpdGVyYXRvciBmdW5jdGlvbiBiZWxvdyB0byBoYW5kbGUgZXhwbGljaXQga2V5LXZhbHVlXG5cdC8vIHBhaXJzIGlmIHdlIGNvbnZlcnQgdGhlbSBpbnRvIHRvIGFuIG9iamVjdCB3ZSBjYW4gaXRlcmF0ZSBvdmVyOlxuXHRpZiAoIHR5cGVvZiBoZWFkZXJzID09PSAnc3RyaW5nJyApIHtcblx0XHRoZWFkZXJzID0ga2V5VmFsVG9PYmooIGhlYWRlcnMsIHZhbHVlICk7XG5cdH1cblxuXHR0aGlzLl9vcHRpb25zLmhlYWRlcnMgPSB7XG5cdFx0Li4uKCB0aGlzLl9vcHRpb25zLmhlYWRlcnMgfHwge30gKSxcblx0XHQuLi5oZWFkZXJzLFxuXHR9O1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBHZXQgKGRvd25sb2FkIHRoZSBkYXRhIGZvcikgdGhlIHNwZWNpZmllZCByZXNvdXJjZVxuICpcbiAqIEBtZXRob2RcbiAqIEBhc3luY1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBHRVQgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRyZXR1cm4gdGhpcy50cmFuc3BvcnQuZ2V0KCB0aGlzLCBjYWxsYmFjayApO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIGhlYWRlcnMgZm9yIHRoZSBzcGVjaWZpZWQgcmVzb3VyY2VcbiAqXG4gKiBAbWV0aG9kXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gQSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCB0aGUgcmVzdWx0cyBvZiB0aGUgSEVBRCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSBoZWFkZXIgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuaGVhZGVycyA9IGZ1bmN0aW9uKCBjYWxsYmFjayApIHtcblx0cmV0dXJuIHRoaXMudHJhbnNwb3J0LmhlYWQoIHRoaXMsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgc3BlY2lmaWVkIHJlc291cmNlIHdpdGggdGhlIHByb3ZpZGVkIGRhdGFcbiAqXG4gKiBUaGlzIGlzIHRoZSBwdWJsaWMgaW50ZXJmYWNlIGZvciBjcmVhdGluZyBQT1NUIHJlcXVlc3RzXG4gKlxuICogQG1ldGhvZFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBUaGUgZGF0YSBmb3IgdGhlIFBPU1QgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBQT1NUIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIEhUVFAgcmVxdWVzdFxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLmNyZWF0ZSA9IGZ1bmN0aW9uKCBkYXRhLCBjYWxsYmFjayApIHtcblx0cmV0dXJuIHRoaXMudHJhbnNwb3J0LnBvc3QoIHRoaXMsIGRhdGEsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIFVwZGF0ZSB0aGUgc3BlY2lmaWVkIHJlc291cmNlIHdpdGggdGhlIHByb3ZpZGVkIGRhdGFcbiAqXG4gKiBUaGlzIGlzIHRoZSBwdWJsaWMgaW50ZXJmYWNlIGZvciBjcmVhdGluZyBQVVQgcmVxdWVzdHNcbiAqXG4gKiBAbWV0aG9kXG4gKiBAYXN5bmNcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBUaGUgZGF0YSBmb3IgdGhlIFBVVCByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIFBVVCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiggZGF0YSwgY2FsbGJhY2sgKSB7XG5cdHJldHVybiB0aGlzLnRyYW5zcG9ydC5wdXQoIHRoaXMsIGRhdGEsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIERlbGV0ZSB0aGUgc3BlY2lmaWVkIHJlc291cmNlXG4gKlxuICogQG1ldGhvZFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIERhdGEgdG8gc2VuZCBhbG9uZyB3aXRoIHRoZSBERUxFVEUgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBERUxFVEUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuZGVsZXRlID0gZnVuY3Rpb24oIGRhdGEsIGNhbGxiYWNrICkge1xuXHRyZXR1cm4gdGhpcy50cmFuc3BvcnQuZGVsZXRlKCB0aGlzLCBkYXRhLCBjYWxsYmFjayApO1xufTtcblxuLyoqXG4gKiBDYWxsaW5nIC50aGVuIG9uIGEgcXVlcnkgY2hhaW4gd2lsbCBpbnZva2UgdGhlIHF1ZXJ5IGFzIGEgR0VUIGFuZCByZXR1cm4gYSBwcm9taXNlXG4gKlxuICogQG1ldGhvZFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbc3VjY2Vzc0NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGhhbmRsZSB0aGUgZGF0YSByZXR1cm5lZCBmcm9tIHRoZSBHRVQgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZhaWx1cmVDYWxsYmFja10gQSBjYWxsYmFjayB0byBoYW5kbGUgYW55IGVycm9ycyBlbmNvdW50ZXJlZCBieSB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUudGhlbiA9IGZ1bmN0aW9uKCBzdWNjZXNzQ2FsbGJhY2ssIGZhaWx1cmVDYWxsYmFjayApIHtcblx0cmV0dXJuIHRoaXMudHJhbnNwb3J0LmdldCggdGhpcyApLnRoZW4oIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdQUmVxdWVzdDtcbiIsIi8qKlxuICogVGFrZSBhIFdQIHJvdXRlIHN0cmluZyAod2l0aCBQQ1JFIG5hbWVkIGNhcHR1cmUgZ3JvdXBzKSwgYHN1Y2ggYXMgL2F1dGhvci8oP1A8aWQ+XFxkKylgLFxuICogYW5kIGdlbmVyYXRlIHJlcXVlc3QgaGFuZGxlciBmYWN0b3J5IG1ldGhvZHMgZm9yIGVhY2ggcmVwcmVzZW50ZWQgZW5kcG9pbnQuXG4gKlxuICogQG1vZHVsZSBlbmRwb2ludC1mYWN0b3JpZXNcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjcmVhdGVSZXNvdXJjZUhhbmRsZXJTcGVjID0gcmVxdWlyZSggJy4vcmVzb3VyY2UtaGFuZGxlci1zcGVjJyApLmNyZWF0ZTtcbmNvbnN0IGNyZWF0ZUVuZHBvaW50UmVxdWVzdCA9IHJlcXVpcmUoICcuL2VuZHBvaW50LXJlcXVlc3QnICkuY3JlYXRlO1xuY29uc3Qgb2JqZWN0UmVkdWNlID0gcmVxdWlyZSggJy4vdXRpbC9vYmplY3QtcmVkdWNlJyApO1xuXG4vKipcbiAqIEdpdmVuIGFuIGFycmF5IG9mIHJvdXRlIGRlZmluaXRpb25zIGFuZCBhIHNwZWNpZmljIG5hbWVzcGFjZSBmb3IgdGhvc2Ugcm91dGVzLFxuICogcmVjdXJzZSB0aHJvdWdoIHRoZSBub2RlIHRyZWUgcmVwcmVzZW50aW5nIGFsbCBwb3NzaWJsZSByb3V0ZXMgd2l0aGluIHRoZVxuICogcHJvdmlkZWQgbmFtZXNwYWNlIHRvIGRlZmluZSBwYXRoIHZhbHVlIHNldHRlcnMgKGFuZCBjb3JyZXNwb25kaW5nIHByb3BlcnR5XG4gKiB2YWxpZGF0b3JzKSBmb3IgYWxsIHBvc3NpYmxlIHZhcmlhbnRzIG9mIGVhY2ggcmVzb3VyY2UncyBBUEkgZW5kcG9pbnRzLlxuICpcbiAqIEBtZXRob2QgZ2VuZXJhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgICAgICAgICBUaGUgbmFtZXNwYWNlIHN0cmluZyBmb3IgdGhlc2Ugcm91dGVzXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGVzQnlOYW1lc3BhY2UgQSBkaWN0aW9uYXJ5IG9mIG5hbWVzcGFjZSAtIHJvdXRlIGRlZmluaXRpb25cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvYmplY3QgcGFpcnMgYXMgZ2VuZXJhdGVkIGZyb20gYnVpbGRSb3V0ZVRyZWUsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlcmUgZWFjaCByb3V0ZSBkZWZpbml0aW9uIG9iamVjdCBpcyBhIGRpY3Rpb25hcnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXllZCBieSByb3V0ZSBkZWZpbml0aW9uIHN0cmluZ3NcbiAqIEByZXR1cm5zIHtvYmplY3R9IEEgZGljdGlvbmFyeSBvZiBlbmRwb2ludCByZXF1ZXN0IGhhbmRsZXIgZmFjdG9yaWVzXG4gKi9cbmZ1bmN0aW9uIGdlbmVyYXRlRW5kcG9pbnRGYWN0b3JpZXMoIHJvdXRlc0J5TmFtZXNwYWNlICkge1xuXG5cdHJldHVybiBvYmplY3RSZWR1Y2UoIHJvdXRlc0J5TmFtZXNwYWNlLCAoIG5hbWVzcGFjZXMsIHJvdXRlRGVmaW5pdGlvbnMsIG5hbWVzcGFjZSApID0+IHtcblxuXHRcdC8vIENyZWF0ZVxuXHRcdG5hbWVzcGFjZXNbIG5hbWVzcGFjZSBdID0gb2JqZWN0UmVkdWNlKCByb3V0ZURlZmluaXRpb25zLCAoIGhhbmRsZXJzLCByb3V0ZURlZiwgcmVzb3VyY2UgKSA9PiB7XG5cblx0XHRcdGNvbnN0IGhhbmRsZXJTcGVjID0gY3JlYXRlUmVzb3VyY2VIYW5kbGVyU3BlYyggcm91dGVEZWYsIHJlc291cmNlICk7XG5cblx0XHRcdGNvbnN0IEVuZHBvaW50UmVxdWVzdCA9IGNyZWF0ZUVuZHBvaW50UmVxdWVzdCggaGFuZGxlclNwZWMsIHJlc291cmNlLCBuYW1lc3BhY2UgKTtcblxuXHRcdFx0Ly8gXCJoYW5kbGVyXCIgb2JqZWN0IGlzIG5vdyBmdWxseSBwcmVwYXJlZDsgY3JlYXRlIHRoZSBmYWN0b3J5IG1ldGhvZCB0aGF0XG5cdFx0XHQvLyB3aWxsIGluc3RhbnRpYXRlIGFuZCByZXR1cm4gYSBoYW5kbGVyIGluc3RhbmNlXG5cdFx0XHRoYW5kbGVyc1sgcmVzb3VyY2UgXSA9IGZ1bmN0aW9uKCBvcHRpb25zICkge1xuXHRcdFx0XHRyZXR1cm4gbmV3IEVuZHBvaW50UmVxdWVzdCgge1xuXHRcdFx0XHRcdC4uLnRoaXMuX29wdGlvbnMsXG5cdFx0XHRcdFx0Li4ub3B0aW9ucyxcblx0XHRcdFx0fSApO1xuXHRcdFx0fTtcblxuXHRcdFx0Ly8gRXhwb3NlIHRoZSBjb25zdHJ1Y3RvciBhcyBhIHByb3BlcnR5IG9uIHRoZSBmYWN0b3J5IGZ1bmN0aW9uLCBzbyB0aGF0XG5cdFx0XHQvLyBhdXRvLWdlbmVyYXRlZCBlbmRwb2ludCByZXF1ZXN0IGNvbnN0cnVjdG9ycyBtYXkgYmUgZnVydGhlciBjdXN0b21pemVkXG5cdFx0XHQvLyB3aGVuIG5lZWRlZFxuXHRcdFx0aGFuZGxlcnNbIHJlc291cmNlIF0uQ3RvciA9IEVuZHBvaW50UmVxdWVzdDtcblxuXHRcdFx0cmV0dXJuIGhhbmRsZXJzO1xuXHRcdH0sIHt9ICk7XG5cblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fSwge30gKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGdlbmVyYXRlOiBnZW5lcmF0ZUVuZHBvaW50RmFjdG9yaWVzLFxufTtcbiIsIi8qKlxuICogQG1vZHVsZSBlbmRwb2ludC1yZXF1ZXN0XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgV1BSZXF1ZXN0ID0gcmVxdWlyZSggJy4vY29uc3RydWN0b3JzL3dwLXJlcXVlc3QnICk7XG5jb25zdCBtaXhpbnMgPSByZXF1aXJlKCAnLi9taXhpbnMnICk7XG5cbmNvbnN0IGFwcGx5TWl4aW4gPSByZXF1aXJlKCAnLi91dGlsL2FwcGx5LW1peGluJyApO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBlbmRwb2ludCByZXF1ZXN0IGhhbmRsZXIgY29uc3RydWN0b3IgZm9yIGEgc3BlY2lmaWMgcmVzb3VyY2UgdHJlZVxuICpcbiAqIEBtZXRob2QgY3JlYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlclNwZWMgQSByZXNvdXJjZSBoYW5kbGVyIHNwZWNpZmljYXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gcmVzb3VyY2UgICAgVGhlIHJvb3QgcmVzb3VyY2Ugb2YgcmVxdWVzdHMgY3JlYXRlZCBmcm9tIHRoZSByZXR1cm5lZCBmYWN0b3J5XG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZXNwYWNlICAgVGhlIG5hbWVzcGFjZSBzdHJpbmcgZm9yIHRoZSByZXR1cm5lZCBmYWN0b3J5J3MgaGFuZGxlcnNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBjb25zdHJ1Y3RvciBpbmhlcml0aW5nIGZyb20ge0BsaW5rIFdQUmVxdWVzdH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRW5kcG9pbnRSZXF1ZXN0KCBoYW5kbGVyU3BlYywgcmVzb3VyY2UsIG5hbWVzcGFjZSApIHtcblxuXHQvLyBDcmVhdGUgdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGlzIGVuZHBvaW50XG5cdGNsYXNzIEVuZHBvaW50UmVxdWVzdCBleHRlbmRzIFdQUmVxdWVzdCB7XG5cdFx0Y29uc3RydWN0b3IoIG9wdGlvbnMgKSB7XG5cdFx0XHRzdXBlciggb3B0aW9ucyApO1xuXG5cdFx0XHQvKipcblx0XHRcdCAqIFNlbWktcHJpdmF0ZSBpbnN0YW5jZSBwcm9wZXJ0eSBzcGVjaWZ5aW5nIHRoZSBhdmFpbGFibGUgVVJMIHBhdGggb3B0aW9uc1xuXHRcdFx0ICogZm9yIHRoaXMgZW5kcG9pbnQgcmVxdWVzdCBoYW5kbGVyLCBrZXllZCBieSBhc2NlbmRpbmcgd2hvbGUgbnVtYmVycy5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcHJvcGVydHkgX2xldmVsc1xuXHRcdFx0ICogQHR5cGUge29iamVjdH1cblx0XHRcdCAqIEBwcml2YXRlXG5cdFx0XHQgKi9cblx0XHRcdHRoaXMuX2xldmVscyA9IGhhbmRsZXJTcGVjLl9sZXZlbHM7XG5cblx0XHRcdC8vIENvbmZpZ3VyZSBoYW5kbGVyIGZvciB0aGlzIGVuZHBvaW50J3Mgcm9vdCBVUkwgcGF0aCAmIHNldCBuYW1lc3BhY2Vcblx0XHRcdHRoaXNcblx0XHRcdFx0LnNldFBhdGhQYXJ0KCAwLCByZXNvdXJjZSApXG5cdFx0XHRcdC5uYW1lc3BhY2UoIG5hbWVzcGFjZSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIE1peCBpbiBhbGwgYXZhaWxhYmxlIHNob3J0Y3V0IG1ldGhvZHMgZm9yIEdFVCByZXF1ZXN0IHF1ZXJ5IHBhcmFtZXRlcnMgdGhhdFxuXHQvLyBhcmUgdmFsaWQgd2l0aGluIHRoaXMgZW5kcG9pbnQgdHJlZVxuXHRpZiAoIHR5cGVvZiBoYW5kbGVyU3BlYy5fZ2V0QXJncyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0T2JqZWN0LmtleXMoIGhhbmRsZXJTcGVjLl9nZXRBcmdzICkuZm9yRWFjaCggKCBzdXBwb3J0ZWRRdWVyeVBhcmFtICkgPT4ge1xuXHRcdFx0Y29uc3QgbWl4aW5zRm9yUGFyYW0gPSBtaXhpbnNbIHN1cHBvcnRlZFF1ZXJ5UGFyYW0gXTtcblxuXHRcdFx0Ly8gT25seSBwcm9jZWVkIGlmIHRoZXJlIGlzIGEgbWl4aW4gYXZhaWxhYmxlIEFORCB0aGUgc3BlY2lmaWVkIG1peGlucyB3aWxsXG5cdFx0XHQvLyBub3Qgb3ZlcndyaXRlIGFueSBwcmV2aW91c2x5LXNldCBwcm90b3R5cGUgbWV0aG9kXG5cdFx0XHRpZiAoIHR5cGVvZiBtaXhpbnNGb3JQYXJhbSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKCBtaXhpbnNGb3JQYXJhbSApLmZvckVhY2goICggbWV0aG9kTmFtZSApID0+IHtcblx0XHRcdFx0XHRhcHBseU1peGluKCBFbmRwb2ludFJlcXVlc3QucHJvdG90eXBlLCBtZXRob2ROYW1lLCBtaXhpbnNGb3JQYXJhbVsgbWV0aG9kTmFtZSBdICk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cblxuXHRPYmplY3Qua2V5cyggaGFuZGxlclNwZWMuX3NldHRlcnMgKS5mb3JFYWNoKCAoIHNldHRlckZuTmFtZSApID0+IHtcblx0XHQvLyBPbmx5IGFzc2lnbiBzZXR0ZXIgZnVuY3Rpb25zIGlmIHRoZXkgZG8gbm90IG92ZXJ3cml0ZSBwcmVleGlzdGluZyBtZXRob2RzXG5cdFx0aWYgKCAhIEVuZHBvaW50UmVxdWVzdC5wcm90b3R5cGVbIHNldHRlckZuTmFtZSBdICkge1xuXHRcdFx0RW5kcG9pbnRSZXF1ZXN0LnByb3RvdHlwZVsgc2V0dGVyRm5OYW1lIF0gPSBoYW5kbGVyU3BlYy5fc2V0dGVyc1sgc2V0dGVyRm5OYW1lIF07XG5cdFx0fVxuXHR9ICk7XG5cblx0cmV0dXJuIEVuZHBvaW50UmVxdWVzdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZTogY3JlYXRlRW5kcG9pbnRSZXF1ZXN0LFxufTtcbiIsIi8qKlxuICogQG1vZHVsZSBodHRwLXRyYW5zcG9ydFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGFnZW50ID0gcmVxdWlyZSggJ3N1cGVyYWdlbnQnICk7XG5jb25zdCBwYXJzZUxpbmtIZWFkZXIgPSByZXF1aXJlKCAnbGknICkucGFyc2U7XG5cbmNvbnN0IFdQUmVxdWVzdCA9IHJlcXVpcmUoICcuL2NvbnN0cnVjdG9ycy93cC1yZXF1ZXN0JyApO1xuY29uc3QgY2hlY2tNZXRob2RTdXBwb3J0ID0gcmVxdWlyZSggJy4vdXRpbC9jaGVjay1tZXRob2Qtc3VwcG9ydCcgKTtcbmNvbnN0IG9iamVjdFJlZHVjZSA9IHJlcXVpcmUoICcuL3V0aWwvb2JqZWN0LXJlZHVjZScgKTtcbmNvbnN0IGlzRW1wdHlPYmplY3QgPSByZXF1aXJlKCAnLi91dGlsL2lzLWVtcHR5LW9iamVjdCcgKTtcblxuLyoqXG4gKiBTZXQgYW55IHByb3ZpZGVkIGhlYWRlcnMgb24gdGhlIG91dGdvaW5nIHJlcXVlc3Qgb2JqZWN0LiBSdW5zIGFmdGVyIF9hdXRoLlxuICpcbiAqIEBtZXRob2QgX3NldEhlYWRlcnNcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCBBIHN1cGVyYWdlbnQgcmVxdWVzdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEEgV1BSZXF1ZXN0IF9vcHRpb25zIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IEEgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdCwgd2l0aCBhbnkgYXZhaWxhYmxlIGhlYWRlcnMgc2V0XG4gKi9cbmZ1bmN0aW9uIF9zZXRIZWFkZXJzKCByZXF1ZXN0LCBvcHRpb25zICkge1xuXHQvLyBJZiB0aGVyZSdzIG5vIGhlYWRlcnMsIGRvIG5vdGhpbmdcblx0aWYgKCAhIG9wdGlvbnMuaGVhZGVycyApIHtcblx0XHRyZXR1cm4gcmVxdWVzdDtcblx0fVxuXG5cdHJldHVybiBvYmplY3RSZWR1Y2UoXG5cdFx0b3B0aW9ucy5oZWFkZXJzLFxuXHRcdCggcmVxdWVzdCwgdmFsdWUsIGtleSApID0+IHJlcXVlc3Quc2V0KCBrZXksIHZhbHVlICksXG5cdFx0cmVxdWVzdFxuXHQpO1xufVxuXG4vKipcbiAqIENvbmRpdGlvbmFsbHkgc2V0IGJhc2ljIGF1dGhlbnRpY2F0aW9uIG9uIGEgc2VydmVyIHJlcXVlc3Qgb2JqZWN0LlxuICpcbiAqIEBtZXRob2QgX2F1dGhcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCBBIHN1cGVyYWdlbnQgcmVxdWVzdCBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEEgV1BSZXF1ZXN0IF9vcHRpb25zIG9iamVjdFxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZUF1dGhlbnRpY2F0aW9uIHdoZXRoZXIgdG8gZm9yY2UgYXV0aGVudGljYXRpb24gb24gdGhlIHJlcXVlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBBIHN1cGVyYWdlbnQgcmVxdWVzdCBvYmplY3QsIGNvbmRpdGlvbmFsbHkgY29uZmlndXJlZCB0byB1c2UgYmFzaWMgYXV0aFxuICovXG5mdW5jdGlvbiBfYXV0aCggcmVxdWVzdCwgb3B0aW9ucywgZm9yY2VBdXRoZW50aWNhdGlvbiApIHtcblx0Ly8gSWYgd2UncmUgbm90IHN1cHBvc2VkIHRvIGF1dGhlbnRpY2F0ZSwgZG9uJ3QgZXZlbiBzdGFydFxuXHRpZiAoICEgZm9yY2VBdXRoZW50aWNhdGlvbiAmJiAhIG9wdGlvbnMuYXV0aCAmJiAhIG9wdGlvbnMubm9uY2UgKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3Q7XG5cdH1cblxuXHQvLyBFbmFibGUgbm9uY2UgaW4gb3B0aW9ucyBmb3IgQ29va2llIGF1dGhlbnRpY2F0aW9uIGh0dHA6Ly93cC1hcGkub3JnL2d1aWRlcy9hdXRoZW50aWNhdGlvbi5odG1sXG5cdGlmICggb3B0aW9ucy5ub25jZSApIHtcblx0XHRyZXF1ZXN0LnNldCggJ1gtV1AtTm9uY2UnLCBvcHRpb25zLm5vbmNlICk7XG5cdFx0cmV0dXJuIHJlcXVlc3Q7XG5cdH1cblxuXHQvLyBSZXRyaWV2ZSB0aGUgdXNlcm5hbWUgJiBwYXNzd29yZCBmcm9tIHRoZSByZXF1ZXN0IG9wdGlvbnMgaWYgdGhleSB3ZXJlbid0IHByb3ZpZGVkXG5cdGNvbnN0IHVzZXJuYW1lID0gb3B0aW9ucy51c2VybmFtZTtcblx0Y29uc3QgcGFzc3dvcmQgPSBvcHRpb25zLnBhc3N3b3JkO1xuXG5cdC8vIElmIG5vIHVzZXJuYW1lIG9yIG5vIHBhc3N3b3JkLCBjYW4ndCBhdXRoZW50aWNhdGVcblx0aWYgKCAhIHVzZXJuYW1lIHx8ICEgcGFzc3dvcmQgKSB7XG5cdFx0cmV0dXJuIHJlcXVlc3Q7XG5cdH1cblxuXHQvLyBDYW4gYXV0aGVudGljYXRlOiBzZXQgYmFzaWMgYXV0aCBwYXJhbWV0ZXJzIG9uIHRoZSByZXF1ZXN0XG5cdHJldHVybiByZXF1ZXN0LmF1dGgoIHVzZXJuYW1lLCBwYXNzd29yZCApO1xufVxuXG4vLyBQYWdpbmF0aW9uLVJlbGF0ZWQgSGVscGVyc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBFeHRyYWN0IHRoZSBib2R5IHByb3BlcnR5IGZyb20gdGhlIHN1cGVyYWdlbnQgcmVzcG9uc2UsIG9yIGVsc2UgdHJ5IHRvIHBhcnNlXG4gKiB0aGUgcmVzcG9uc2UgdGV4dCB0byBnZXQgYSBKU09OIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlICAgICAgVGhlIHJlc3BvbnNlIG9iamVjdCBmcm9tIHRoZSBIVFRQIHJlcXVlc3RcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXNwb25zZS50ZXh0IFRoZSByZXNwb25zZSBjb250ZW50IGFzIHRleHRcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXNwb25zZS5ib2R5IFRoZSByZXNwb25zZSBjb250ZW50IGFzIGEgSlMgb2JqZWN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcmVzcG9uc2UgY29udGVudCBhcyBhIEpTIG9iamVjdFxuICovXG5mdW5jdGlvbiBleHRyYWN0UmVzcG9uc2VCb2R5KCByZXNwb25zZSApIHtcblx0bGV0IHJlc3BvbnNlQm9keSA9IHJlc3BvbnNlLmJvZHk7XG5cdGlmICggaXNFbXB0eU9iamVjdCggcmVzcG9uc2VCb2R5ICkgJiYgcmVzcG9uc2UudHlwZSA9PT0gJ3RleHQvaHRtbCcgKSB7XG5cdFx0Ly8gUmVzcG9uc2UgbWF5IGhhdmUgY29tZSBiYWNrIGFzIEhUTUwgZHVlIHRvIGNhY2hpbmcgcGx1Z2luOyB0cnkgdG8gcGFyc2Vcblx0XHQvLyB0aGUgcmVzcG9uc2UgdGV4dCBpbnRvIEpTT05cblx0XHR0cnkge1xuXHRcdFx0cmVzcG9uc2VCb2R5ID0gSlNPTi5wYXJzZSggcmVzcG9uc2UudGV4dCApO1xuXHRcdH0gY2F0Y2ggKCBlICkge1xuXHRcdFx0Ly8gU3dhbGxvdyBlcnJvcnMsIGl0J3MgT0sgdG8gZmFsbCBiYWNrIHRvIHJldHVybmluZyB0aGUgYm9keVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzcG9uc2VCb2R5O1xufVxuXG4vKipcbiAqIElmIHRoZSByZXNwb25zZSBpcyBub3QgcGFnZWQsIHJldHVybiB0aGUgYm9keSBhcy1pcy4gSWYgcGFnaW5hdGlvblxuICogaW5mb3JtYXRpb24gaXMgcHJlc2VudCBpbiB0aGUgcmVzcG9uc2UgaGVhZGVycywgcGFyc2UgdGhvc2UgaGVhZGVycyBpbnRvXG4gKiBhIGN1c3RvbSBgX3BhZ2luZ2AgcHJvcGVydHkgb24gdGhlIHJlc3BvbnNlIGJvZHkuIGBfcGFnaW5nYCBjb250YWlucyBsaW5rc1xuICogdG8gdGhlIHByZXZpb3VzIGFuZCBuZXh0IHBhZ2VzIGluIHRoZSBjb2xsZWN0aW9uLCBhcyB3ZWxsIGFzIG1ldGFkYXRhXG4gKiBhYm91dCB0aGUgc2l6ZSBhbmQgbnVtYmVyIG9mIHBhZ2VzIGluIHRoZSBjb2xsZWN0aW9uLlxuICpcbiAqIFRoZSBzdHJ1Y3R1cmUgb2YgdGhlIGBfcGFnaW5nYCBwcm9wZXJ0eSBpcyBhcyBmb2xsb3dzOlxuICpcbiAqIC0gYHRvdGFsYCB7SW50ZWdlcn0gVGhlIHRvdGFsIG51bWJlciBvZiByZWNvcmRzIGluIHRoZSBjb2xsZWN0aW9uXG4gKiAtIGB0b3RhbFBhZ2VzYCB7SW50ZWdlcn0gVGhlIG51bWJlciBvZiBwYWdlcyBhdmFpbGFibGVcbiAqIC0gYGxpbmtzYCB7T2JqZWN0fSBUaGUgcGFyc2VkIFwibGlua3NcIiBoZWFkZXJzLCBzZXBhcmF0ZWQgaW50byBpbmRpdmlkdWFsIFVSSSBzdHJpbmdzXG4gKiAtIGBuZXh0YCB7V1BSZXF1ZXN0fSBBIFdQUmVxdWVzdCBvYmplY3QgYm91bmQgdG8gdGhlIFwibmV4dFwiIHBhZ2UgKGlmIHBhZ2UgZXhpc3RzKVxuICogLSBgcHJldmAge1dQUmVxdWVzdH0gQSBXUFJlcXVlc3Qgb2JqZWN0IGJvdW5kIHRvIHRoZSBcInByZXZpb3VzXCIgcGFnZSAoaWYgcGFnZSBleGlzdHMpXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXN1bHQgICAgICAgICAgIFRoZSByZXNwb25zZSBvYmplY3QgZnJvbSB0aGUgSFRUUCByZXF1ZXN0XG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICBUaGUgb3B0aW9ucyBoYXNoIGZyb20gdGhlIG9yaWdpbmFsIHJlcXVlc3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmVuZHBvaW50IFRoZSBiYXNlIFVSTCBvZiB0aGUgcmVxdWVzdGVkIEFQSSBlbmRwb2ludFxuICogQHBhcmFtIHtPYmplY3R9IGh0dHBUcmFuc3BvcnQgICAgVGhlIEhUVFAgdHJhbnNwb3J0IG9iamVjdCB1c2VkIGJ5IHRoZSBvcmlnaW5hbCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgcGFnaW5hdGlvbiBtZXRhZGF0YSBvYmplY3QgZm9yIHRoaXMgSFRUUCByZXF1ZXN0LCBvciBlbHNlIG51bGxcbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbk9iamVjdCggcmVzdWx0LCBvcHRpb25zLCBodHRwVHJhbnNwb3J0ICkge1xuXHRsZXQgX3BhZ2luZyA9IG51bGw7XG5cblx0aWYgKCAhIHJlc3VsdC5oZWFkZXJzICkge1xuXHRcdC8vIE5vIGhlYWRlcnM6IHJldHVybiBhcy1pc1xuXHRcdHJldHVybiBfcGFnaW5nO1xuXHR9XG5cblx0Ly8gR3VhcmQgYWdhaW5zdCBjYXBpdGFsaXphdGlvbiBpbmNvbnNpc3RlbmNpZXMgaW4gcmV0dXJuZWQgaGVhZGVyc1xuXHRPYmplY3Qua2V5cyggcmVzdWx0LmhlYWRlcnMgKS5mb3JFYWNoKCAoIGhlYWRlciApID0+IHtcblx0XHRyZXN1bHQuaGVhZGVyc1sgaGVhZGVyLnRvTG93ZXJDYXNlKCkgXSA9IHJlc3VsdC5oZWFkZXJzWyBoZWFkZXIgXTtcblx0fSApO1xuXG5cdGlmICggISByZXN1bHQuaGVhZGVyc1sgJ3gtd3AtdG90YWxwYWdlcycgXSApIHtcblx0XHQvLyBObyBwYWdpbmc6IHJldHVybiBhcy1pc1xuXHRcdHJldHVybiBfcGFnaW5nO1xuXHR9XG5cblx0Y29uc3QgdG90YWxQYWdlcyA9ICtyZXN1bHQuaGVhZGVyc1sgJ3gtd3AtdG90YWxwYWdlcycgXTtcblxuXHRpZiAoICEgdG90YWxQYWdlcyB8fCB0b3RhbFBhZ2VzID09PSAwICkge1xuXHRcdC8vIE5vIHBhZ2luZzogcmV0dXJuIGFzLWlzXG5cdFx0cmV0dXJuIF9wYWdpbmc7XG5cdH1cblxuXHQvLyBEZWNvZGUgdGhlIGxpbmsgaGVhZGVyIG9iamVjdFxuXHRjb25zdCBsaW5rcyA9IHJlc3VsdC5oZWFkZXJzLmxpbmsgP1xuXHRcdHBhcnNlTGlua0hlYWRlciggcmVzdWx0LmhlYWRlcnMubGluayApIDpcblx0XHR7fTtcblxuXHQvLyBTdG9yZSBwYWdpbmF0aW9uIGRhdGEgZnJvbSByZXNwb25zZSBoZWFkZXJzIG9uIHRoZSByZXNwb25zZSBjb2xsZWN0aW9uXG5cdF9wYWdpbmcgPSB7XG5cdFx0dG90YWw6ICtyZXN1bHQuaGVhZGVyc1sgJ3gtd3AtdG90YWwnIF0sXG5cdFx0dG90YWxQYWdlczogdG90YWxQYWdlcyxcblx0XHRsaW5rczogbGlua3MsXG5cdH07XG5cblx0Ly8gQ3JlYXRlIGEgV1BSZXF1ZXN0IGluc3RhbmNlIHByZS1ib3VuZCB0byB0aGUgXCJuZXh0XCIgcGFnZSwgaWYgYXZhaWxhYmxlXG5cdGlmICggbGlua3MubmV4dCApIHtcblx0XHRfcGFnaW5nLm5leHQgPSBuZXcgV1BSZXF1ZXN0KCB7XG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0dHJhbnNwb3J0OiBodHRwVHJhbnNwb3J0LFxuXHRcdFx0ZW5kcG9pbnQ6IGxpbmtzLm5leHQsXG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gQ3JlYXRlIGEgV1BSZXF1ZXN0IGluc3RhbmNlIHByZS1ib3VuZCB0byB0aGUgXCJwcmV2XCIgcGFnZSwgaWYgYXZhaWxhYmxlXG5cdGlmICggbGlua3MucHJldiApIHtcblx0XHRfcGFnaW5nLnByZXYgPSBuZXcgV1BSZXF1ZXN0KCB7XG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0dHJhbnNwb3J0OiBodHRwVHJhbnNwb3J0LFxuXHRcdFx0ZW5kcG9pbnQ6IGxpbmtzLnByZXYsXG5cdFx0fSApO1xuXHR9XG5cblx0cmV0dXJuIF9wYWdpbmc7XG59XG5cbi8vIEhUVFAtUmVsYXRlZCBIZWxwZXJzXG4vLyA9PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFN1Ym1pdCB0aGUgcHJvdmlkZWQgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdCwgaW52b2tlIGEgY2FsbGJhY2sgKGlmIGl0IHdhc1xuICogcHJvdmlkZWQpLCBhbmQgcmV0dXJuIGEgcHJvbWlzZSB0byB0aGUgcmVzcG9uc2UgZnJvbSB0aGUgSFRUUCByZXF1ZXN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVxdWVzdCBBIHN1cGVyYWdlbnQgcmVxdWVzdCBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIEEgY2FsbGJhY2sgZnVuY3Rpb24gKG9wdGlvbmFsKVxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIEEgZnVuY3Rpb24gdG8gdHJhbnNmb3JtIHRoZSByZXN1bHQgZGF0YVxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgc3VwZXJhZ2VudCByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIGludm9rZUFuZFByb21pc2lmeSggcmVxdWVzdCwgY2FsbGJhY2ssIHRyYW5zZm9ybSApIHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKCAoIHJlc29sdmUsIHJlamVjdCApID0+IHtcblx0XHQvLyBGaXJlIG9mZiB0aGUgcmVzdWx0XG5cdFx0cmVxdWVzdC5lbmQoICggZXJyLCByZXN1bHQgKSA9PiB7XG5cblx0XHRcdC8vIFJldHVybiB0aGUgcmVzdWx0cyBhcyBhIHByb21pc2Vcblx0XHRcdGlmICggZXJyIHx8IHJlc3VsdC5lcnJvciApIHtcblx0XHRcdFx0cmVqZWN0KCBlcnIgfHwgcmVzdWx0LmVycm9yICk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXNvbHZlKCByZXN1bHQgKTtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH0gKS50aGVuKCB0cmFuc2Zvcm0gKS50aGVuKCAoIHJlc3VsdCApID0+IHtcblx0XHQvLyBJZiBhIG5vZGUtc3R5bGUgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLCBjYWxsIGl0LCBidXQgYWxzbyByZXR1cm4gdGhlXG5cdFx0Ly8gcmVzdWx0IHZhbHVlIGZvciB1c2UgdmlhIHRoZSByZXR1cm5lZCBQcm9taXNlXG5cdFx0aWYgKCBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRjYWxsYmFjayggbnVsbCwgcmVzdWx0ICk7XG5cdFx0fVxuXHRcdHJldHVybiByZXN1bHQ7XG5cdH0sICggZXJyICkgPT4ge1xuXHRcdC8vIElmIHRoZSBBUEkgcHJvdmlkZWQgYW4gZXJyb3Igb2JqZWN0LCBpdCB3aWxsIGJlIGF2YWlsYWJsZSB3aXRoaW4gdGhlXG5cdFx0Ly8gc3VwZXJhZ2VudCByZXNwb25zZSBvYmplY3QgYXMgcmVzcG9uc2UuYm9keSAoY29udGFpbmluZyB0aGUgcmVzcG9uc2Vcblx0XHQvLyBKU09OKS4gSWYgdGhhdCBvYmplY3QgZXhpc3RzLCBpdCB3aWxsIGhhdmUgYSAuY29kZSBwcm9wZXJ0eSBpZiBpdCBpc1xuXHRcdC8vIHRydWx5IGFuIEFQSSBlcnJvciAobm9uLUFQSSBlcnJvcnMgd2lsbCBub3QgaGF2ZSBhIC5jb2RlKS5cblx0XHRpZiAoIGVyci5yZXNwb25zZSAmJiBlcnIucmVzcG9uc2UuYm9keSAmJiBlcnIucmVzcG9uc2UuYm9keS5jb2RlICkge1xuXHRcdFx0Ly8gRm9yd2FyZCBBUEkgZXJyb3IgcmVzcG9uc2UgSlNPTiBvbiB0byB0aGUgY2FsbGluZyBtZXRob2Q6IG9taXRcblx0XHRcdC8vIGFsbCB0cmFuc3BvcnQtc3BlY2lmaWMgKHN1cGVyYWdlbnQtc3BlY2lmaWMpIHByb3BlcnRpZXNcblx0XHRcdGVyciA9IGVyci5yZXNwb25zZS5ib2R5O1xuXHRcdH1cblx0XHQvLyBJZiBhIGNhbGxiYWNrIHdhcyBwcm92aWRlZCwgZW5zdXJlIGl0IGlzIGNhbGxlZCB3aXRoIHRoZSBlcnJvcjsgb3RoZXJ3aXNlXG5cdFx0Ly8gcmUtdGhyb3cgdGhlIGVycm9yIHNvIHRoYXQgaXQgY2FuIGJlIGhhbmRsZWQgYnkgYSBQcm9taXNlIC5jYXRjaCBvciAudGhlblxuXHRcdGlmICggY2FsbGJhY2sgJiYgdHlwZW9mIGNhbGxiYWNrID09PSAnZnVuY3Rpb24nICkge1xuXHRcdFx0Y2FsbGJhY2soIGVyciApO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBlcnI7XG5cdFx0fVxuXHR9ICk7XG59XG5cbi8qKlxuICogUmV0dXJuIHRoZSBib2R5IG9mIHRoZSByZXF1ZXN0LCBhdWdtZW50ZWQgd2l0aCBwYWdpbmF0aW9uIGluZm9ybWF0aW9uIGlmIHRoZVxuICogcmVzdWx0IGlzIGEgcGFnZWQgY29sbGVjdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtXUFJlcXVlc3R9IHdwcmVxIFRoZSBXUFJlcXVlc3QgcmVwcmVzZW50aW5nIHRoZSByZXR1cm5lZCBIVFRQIHJlc3BvbnNlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IFRoZSByZXN1bHRzIGZyb20gdGhlIEhUVFAgcmVxdWVzdFxuICogQHJldHVybnMge09iamVjdH0gVGhlIFwiYm9keVwiIHByb3BlcnR5IG9mIHRoZSByZXN1bHQsIGNvbmRpdGlvbmFsbHkgYXVnbWVudGVkIHdpdGhcbiAqICAgICAgICAgICAgICAgICAgcGFnaW5hdGlvbiBpbmZvcm1hdGlvbiBpZiB0aGUgcmVzdWx0IGlzIGEgcGFydGlhbCBjb2xsZWN0aW9uLlxuICovXG5mdW5jdGlvbiByZXR1cm5Cb2R5KCB3cHJlcSwgcmVzdWx0ICkge1xuXHRjb25zdCBib2R5ID0gZXh0cmFjdFJlc3BvbnNlQm9keSggcmVzdWx0ICk7XG5cdGNvbnN0IF9wYWdpbmcgPSBjcmVhdGVQYWdpbmF0aW9uT2JqZWN0KCByZXN1bHQsIHdwcmVxLl9vcHRpb25zLCB3cHJlcS50cmFuc3BvcnQgKTtcblx0aWYgKCBfcGFnaW5nICkge1xuXHRcdGJvZHkuX3BhZ2luZyA9IF9wYWdpbmc7XG5cdH1cblx0cmV0dXJuIGJvZHk7XG59XG5cbi8qKlxuICogRXh0cmFjdCBhbmQgcmV0dXJuIHRoZSBoZWFkZXJzIHByb3BlcnR5IGZyb20gYSBzdXBlcmFnZW50IHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzdWx0IFRoZSByZXN1bHRzIGZyb20gdGhlIEhUVFAgcmVxdWVzdFxuICogQHJldHVybnMge09iamVjdH0gVGhlIFwiaGVhZGVyc1wiIHByb3BlcnR5IG9mIHRoZSByZXN1bHRcbiAqL1xuZnVuY3Rpb24gcmV0dXJuSGVhZGVycyggcmVzdWx0ICkge1xuXHRyZXR1cm4gcmVzdWx0LmhlYWRlcnM7XG59XG5cbi8vIEhUVFAgTWV0aG9kczogUHJpdmF0ZSBIVFRQLXZlcmIgdmVyc2lvbnNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBAbWV0aG9kIGdldFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge1dQUmVxdWVzdH0gd3ByZXEgQSBXUFJlcXVlc3QgcXVlcnkgb2JqZWN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIEdFVCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gX2h0dHBHZXQoIHdwcmVxLCBjYWxsYmFjayApIHtcblx0Y2hlY2tNZXRob2RTdXBwb3J0KCAnZ2V0Jywgd3ByZXEgKTtcblx0Y29uc3QgdXJsID0gd3ByZXEudG9TdHJpbmcoKTtcblxuXHRsZXQgcmVxdWVzdCA9IF9hdXRoKCBhZ2VudC5nZXQoIHVybCApLCB3cHJlcS5fb3B0aW9ucyApO1xuXHRyZXF1ZXN0ID0gX3NldEhlYWRlcnMoIHJlcXVlc3QsIHdwcmVxLl9vcHRpb25zICk7XG5cblx0cmV0dXJuIGludm9rZUFuZFByb21pc2lmeSggcmVxdWVzdCwgY2FsbGJhY2ssIHJldHVybkJvZHkuYmluZCggbnVsbCwgd3ByZXEgKSApO1xufVxuXG4vKipcbiAqIEludm9rZSBhbiBIVFRQIFwiUE9TVFwiIHJlcXVlc3QgYWdhaW5zdCB0aGUgcHJvdmlkZWQgZW5kcG9pbnRcbiAqIEBtZXRob2QgcG9zdFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge1dQUmVxdWVzdH0gd3ByZXEgQSBXUFJlcXVlc3QgcXVlcnkgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gZGF0YSBUaGUgZGF0YSBmb3IgdGhlIFBPU1QgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBQT1NUIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIEhUVFAgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBfaHR0cFBvc3QoIHdwcmVxLCBkYXRhLCBjYWxsYmFjayApIHtcblx0Y2hlY2tNZXRob2RTdXBwb3J0KCAncG9zdCcsIHdwcmVxICk7XG5cdGNvbnN0IHVybCA9IHdwcmVxLnRvU3RyaW5nKCk7XG5cdGRhdGEgPSBkYXRhIHx8IHt9O1xuXHRsZXQgcmVxdWVzdCA9IF9hdXRoKCBhZ2VudC5wb3N0KCB1cmwgKSwgd3ByZXEuX29wdGlvbnMsIHRydWUgKTtcblx0cmVxdWVzdCA9IF9zZXRIZWFkZXJzKCByZXF1ZXN0LCB3cHJlcS5fb3B0aW9ucyApO1xuXG5cdGlmICggd3ByZXEuX2F0dGFjaG1lbnQgKSB7XG5cdFx0Ly8gRGF0YSBtdXN0IGJlIGZvcm0tZW5jb2RlZCBhbG9uZ3NpZGUgaW1hZ2UgYXR0YWNobWVudFxuXHRcdHJlcXVlc3QgPSBvYmplY3RSZWR1Y2UoXG5cdFx0XHRkYXRhLFxuXHRcdFx0KCByZXEsIHZhbHVlLCBrZXkgKSA9PiByZXEuZmllbGQoIGtleSwgdmFsdWUgKSxcblx0XHRcdHJlcXVlc3QuYXR0YWNoKCAnZmlsZScsIHdwcmVxLl9hdHRhY2htZW50LCB3cHJlcS5fYXR0YWNobWVudE5hbWUgKVxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0cmVxdWVzdCA9IHJlcXVlc3Quc2VuZCggZGF0YSApO1xuXHR9XG5cblx0cmV0dXJuIGludm9rZUFuZFByb21pc2lmeSggcmVxdWVzdCwgY2FsbGJhY2ssIHJldHVybkJvZHkuYmluZCggbnVsbCwgd3ByZXEgKSApO1xufVxuXG4vKipcbiAqIEBtZXRob2QgcHV0XG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSB3cHJlcSBBIFdQUmVxdWVzdCBxdWVyeSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIFRoZSBkYXRhIGZvciB0aGUgUFVUIHJlcXVlc3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gQSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCB0aGUgcmVzdWx0cyBvZiB0aGUgUFVUIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIEhUVFAgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBfaHR0cFB1dCggd3ByZXEsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRjaGVja01ldGhvZFN1cHBvcnQoICdwdXQnLCB3cHJlcSApO1xuXHRjb25zdCB1cmwgPSB3cHJlcS50b1N0cmluZygpO1xuXHRkYXRhID0gZGF0YSB8fCB7fTtcblxuXHRsZXQgcmVxdWVzdCA9IF9hdXRoKCBhZ2VudC5wdXQoIHVybCApLCB3cHJlcS5fb3B0aW9ucywgdHJ1ZSApLnNlbmQoIGRhdGEgKTtcblx0cmVxdWVzdCA9IF9zZXRIZWFkZXJzKCByZXF1ZXN0LCB3cHJlcS5fb3B0aW9ucyApO1xuXG5cdHJldHVybiBpbnZva2VBbmRQcm9taXNpZnkoIHJlcXVlc3QsIGNhbGxiYWNrLCByZXR1cm5Cb2R5LmJpbmQoIG51bGwsIHdwcmVxICkgKTtcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGRlbGV0ZVxuICogQGFzeW5jXG4gKiBAcGFyYW0ge1dQUmVxdWVzdH0gd3ByZXEgQSBXUFJlcXVlc3QgcXVlcnkgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gW2RhdGFdIERhdGEgdG8gc2VuZCBhbG9uZyB3aXRoIHRoZSBERUxFVEUgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBERUxFVEUgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIF9odHRwRGVsZXRlKCB3cHJlcSwgZGF0YSwgY2FsbGJhY2sgKSB7XG5cdGlmICggISBjYWxsYmFjayAmJiB0eXBlb2YgZGF0YSA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRjYWxsYmFjayA9IGRhdGE7XG5cdFx0ZGF0YSA9IG51bGw7XG5cdH1cblx0Y2hlY2tNZXRob2RTdXBwb3J0KCAnZGVsZXRlJywgd3ByZXEgKTtcblx0Y29uc3QgdXJsID0gd3ByZXEudG9TdHJpbmcoKTtcblx0bGV0IHJlcXVlc3QgPSBfYXV0aCggYWdlbnQuZGVsKCB1cmwgKSwgd3ByZXEuX29wdGlvbnMsIHRydWUgKS5zZW5kKCBkYXRhICk7XG5cdHJlcXVlc3QgPSBfc2V0SGVhZGVycyggcmVxdWVzdCwgd3ByZXEuX29wdGlvbnMgKTtcblxuXHRyZXR1cm4gaW52b2tlQW5kUHJvbWlzaWZ5KCByZXF1ZXN0LCBjYWxsYmFjaywgcmV0dXJuQm9keS5iaW5kKCBudWxsLCB3cHJlcSApICk7XG59XG5cbi8qKlxuICogQG1ldGhvZCBoZWFkXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSB3cHJlcSBBIFdQUmVxdWVzdCBxdWVyeSBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gQSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCB0aGUgcmVzdWx0cyBvZiB0aGUgSEVBRCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSBoZWFkZXIgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIF9odHRwSGVhZCggd3ByZXEsIGNhbGxiYWNrICkge1xuXHRjaGVja01ldGhvZFN1cHBvcnQoICdoZWFkJywgd3ByZXEgKTtcblx0Y29uc3QgdXJsID0gd3ByZXEudG9TdHJpbmcoKTtcblx0bGV0IHJlcXVlc3QgPSBfYXV0aCggYWdlbnQuaGVhZCggdXJsICksIHdwcmVxLl9vcHRpb25zICk7XG5cdHJlcXVlc3QgPSBfc2V0SGVhZGVycyggcmVxdWVzdCwgd3ByZXEuX29wdGlvbnMgKTtcblxuXHRyZXR1cm4gaW52b2tlQW5kUHJvbWlzaWZ5KCByZXF1ZXN0LCBjYWxsYmFjaywgcmV0dXJuSGVhZGVycyApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0ZGVsZXRlOiBfaHR0cERlbGV0ZSxcblx0Z2V0OiBfaHR0cEdldCxcblx0aGVhZDogX2h0dHBIZWFkLFxuXHRwb3N0OiBfaHR0cFBvc3QsXG5cdHB1dDogX2h0dHBQdXQsXG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIG1peGlucy9maWx0ZXJzXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgYWxwaGFOdW1lcmljU29ydCA9IHJlcXVpcmUoICcuLi91dGlsL2FscGhhbnVtZXJpYy1zb3J0JyApO1xuY29uc3Qga2V5VmFsVG9PYmogPSByZXF1aXJlKCAnLi4vdXRpbC9rZXktdmFsLXRvLW9iaicgKTtcbmNvbnN0IHVuaXF1ZSA9IHJlcXVpcmUoICcuLi91dGlsL3VuaXF1ZScgKTtcblxuLyoqXG4gKiBGaWx0ZXIgbWV0aG9kcyB0aGF0IGNhbiBiZSBtaXhlZCBpbiB0byBhIHJlcXVlc3QgY29uc3RydWN0b3IncyBwcm90b3R5cGUgdG9cbiAqIGFsbG93IHRoYXQgcmVxdWVzdCB0byB0YWtlIGFkdmFudGFnZSBvZiB0aGUgYD9maWx0ZXJbXT1gIGFsaWFzZXMgZm9yIFdQX1F1ZXJ5XG4gKiBwYXJhbWV0ZXJzIGZvciBjb2xsZWN0aW9uIGVuZHBvaW50cywgd2hlbiBhdmFpbGFibGUuXG4gKlxuICogQG1peGluIGZpbHRlcnNcbiAqL1xuY29uc3QgZmlsdGVyTWl4aW5zID0ge307XG5cbi8vIEZpbHRlciBNZXRob2RzXG4vLyA9PT09PT09PT09PT09PVxuXG4vKipcbiAqIFNwZWNpZnkga2V5LXZhbHVlIHBhaXJzIGJ5IHdoaWNoIHRvIGZpbHRlciB0aGUgQVBJIHJlc3VsdHMgKGNvbW1vbmx5IHVzZWRcbiAqIHRvIHJldHJpZXZlIG9ubHkgcG9zdHMgbWVldGluZyBjZXJ0YWluIGNyaXRlcmlhLCBzdWNoIGFzIHBvc3RzIHdpdGhpbiBhXG4gKiBwYXJ0aWN1bGFyIGNhdGVnb3J5IG9yIGJ5IGEgcGFydGljdWxhciBhdXRob3IpLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIC8vIFNldCBhIHNpbmdsZSBwcm9wZXJ0eTpcbiAqICAgICB3cC5maWx0ZXIoICdwb3N0X3R5cGUnLCAnY3B0X2V2ZW50JyApLi4uXG4gKlxuICogICAgIC8vIFNldCBtdWx0aXBsZSBwcm9wZXJ0aWVzIGF0IG9uY2U6XG4gKiAgICAgd3AuZmlsdGVyKHtcbiAqICAgICAgICAgcG9zdF9zdGF0dXM6ICdwdWJsaXNoJyxcbiAqICAgICAgICAgY2F0ZWdvcnlfbmFtZTogJ25ld3MnXG4gKiAgICAgfSkuLi5cbiAqXG4gKiAgICAgLy8gQ2hhaW4gY2FsbHMgdG8gLmZpbHRlcigpOlxuICogICAgIHdwLmZpbHRlciggJ3Bvc3Rfc3RhdHVzJywgJ3B1Ymxpc2gnICkuZmlsdGVyKCAnY2F0ZWdvcnlfbmFtZScsICduZXdzJyApLi4uXG4gKlxuICogQG1ldGhvZCBmaWx0ZXJcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcHJvcHMgQSBmaWx0ZXIgcHJvcGVydHkgbmFtZSBzdHJpbmcsIG9yIG9iamVjdCBvZiBuYW1lL3ZhbHVlIHBhaXJzXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QXJyYXl9IFt2YWx1ZV0gVGhlIHZhbHVlKHMpIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByb3ZpZGVkIGZpbHRlciBwcm9wZXJ0eVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLmZpbHRlciA9IGZ1bmN0aW9uKCBwcm9wcywgdmFsdWUgKSB7XG5cdGlmICggISBwcm9wcyB8fCB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnICYmIHZhbHVlID09PSB1bmRlZmluZWQgKSB7XG5cdFx0Ly8gV2UgaGF2ZSBubyBmaWx0ZXIgdG8gc2V0LCBvciBubyB2YWx1ZSB0byBzZXQgZm9yIHRoYXQgZmlsdGVyXG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvLyBjb252ZXJ0IHRoZSBwcm9wZXJ0eSBuYW1lIHN0cmluZyBgcHJvcHNgIGFuZCB2YWx1ZSBgdmFsdWVgIGludG8gYW4gb2JqZWN0XG5cdGlmICggdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJyApIHtcblx0XHRwcm9wcyA9IGtleVZhbFRvT2JqKCBwcm9wcywgdmFsdWUgKTtcblx0fVxuXG5cdHRoaXMuX2ZpbHRlcnMgPSB7XG5cdFx0Li4udGhpcy5fZmlsdGVycyxcblx0XHQuLi5wcm9wcyxcblx0fTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVzdHJpY3QgdGhlIHF1ZXJ5IHJlc3VsdHMgdG8gcG9zdHMgbWF0Y2hpbmcgb25lIG9yIG1vcmUgdGF4b25vbXkgdGVybXMuXG4gKlxuICogQG1ldGhvZCB0YXhvbm9teVxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd9IHRheG9ub215IFRoZSBuYW1lIG9mIHRoZSB0YXhvbm9teSB0byBmaWx0ZXIgYnlcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gdGVybSBBIHN0cmluZyBvciBpbnRlZ2VyLCBvciBhcnJheSB0aGVyZW9mLCByZXByZXNlbnRpbmcgdGVybXNcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbmZpbHRlck1peGlucy50YXhvbm9teSA9IGZ1bmN0aW9uKCB0YXhvbm9teSwgdGVybSApIHtcblx0Y29uc3QgdGVybUlzQXJyYXkgPSBBcnJheS5pc0FycmF5KCB0ZXJtICk7XG5cblx0Y29uc3QgdGVybUlzTnVtYmVyID0gdGVybUlzQXJyYXkgP1xuXHRcdHRlcm0ucmVkdWNlKFxuXHRcdFx0KCBhbGxBcmVOdW1iZXJzLCB0ZXJtICkgPT4gYWxsQXJlTnVtYmVycyAmJiB0eXBlb2YgdGVybSA9PT0gJ251bWJlcicsXG5cdFx0XHR0cnVlXG5cdFx0KSA6XG5cdFx0dHlwZW9mIHRlcm0gPT09ICdudW1iZXInO1xuXG5cdGNvbnN0IHRlcm1Jc1N0cmluZyA9IHRlcm1Jc0FycmF5ID9cblx0XHR0ZXJtLnJlZHVjZShcblx0XHRcdCggYWxsQXJlU3RyaW5ncywgdGVybSApID0+IGFsbEFyZVN0cmluZ3MgJiYgdHlwZW9mIHRlcm0gPT09ICdzdHJpbmcnLFxuXHRcdFx0dHJ1ZVxuXHRcdCkgOlxuXHRcdHR5cGVvZiB0ZXJtID09PSAnc3RyaW5nJztcblxuXHRpZiAoICEgdGVybUlzU3RyaW5nICYmICEgdGVybUlzTnVtYmVyICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggJ3Rlcm0gbXVzdCBiZSBhIG51bWJlciwgc3RyaW5nLCBvciBhcnJheSBvZiBudW1iZXJzIG9yIHN0cmluZ3MnICk7XG5cdH1cblxuXHRpZiAoIHRheG9ub215ID09PSAnY2F0ZWdvcnknICkge1xuXHRcdGlmICggdGVybUlzU3RyaW5nICkge1xuXHRcdFx0Ly8gUXVlcnkgcGFyYW0gZm9yIGZpbHRlcmluZyBieSBjYXRlZ29yeSBzbHVnIGlzIFwiY2F0ZWdvcnlfbmFtZVwiXG5cdFx0XHR0YXhvbm9teSA9ICdjYXRlZ29yeV9uYW1lJztcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gVGhlIGJvb2xlYW4gY2hlY2sgYWJvdmUgZW5zdXJlcyB0aGF0IGlmIHRheG9ub215ID09PSAnY2F0ZWdvcnknIGFuZFxuXHRcdFx0Ly8gdGVybSBpcyBub3QgYSBzdHJpbmcsIHRoZW4gdGVybSBtdXN0IGJlIGEgbnVtYmVyIGFuZCB0aGVyZWZvcmUgYW4gSUQ6XG5cdFx0XHQvLyBRdWVyeSBwYXJhbSBmb3IgZmlsdGVyaW5nIGJ5IGNhdGVnb3J5IElEIGlzIFwiY2F0XCJcblx0XHRcdHRheG9ub215ID0gJ2NhdCc7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKCB0YXhvbm9teSA9PT0gJ3Bvc3RfdGFnJyApIHtcblx0XHQvLyB0YWcgaXMgdXNlZCBpbiBwbGFjZSBvZiBwb3N0X3RhZyBpbiB0aGUgcHVibGljIHF1ZXJ5IHZhcmlhYmxlc1xuXHRcdHRheG9ub215ID0gJ3RhZyc7XG5cdH1cblxuXHQvLyBFbnN1cmUgdGhlIHRheG9ub215IGZpbHRlcnMgb2JqZWN0IGlzIGF2YWlsYWJsZVxuXHR0aGlzLl90YXhvbm9teUZpbHRlcnMgPSB0aGlzLl90YXhvbm9teUZpbHRlcnMgfHwge307XG5cblx0Ly8gRW5zdXJlIHRoZXJlJ3MgYW4gYXJyYXkgb2YgdGVybXMgYXZhaWxhYmxlIGZvciB0aGlzIHRheG9ub215XG5cdGNvbnN0IHRheG9ub215VGVybXMgPSAoIHRoaXMuX3RheG9ub215RmlsdGVyc1sgdGF4b25vbXkgXSB8fCBbXSApXG5cdFx0Ly8gSW5zZXJ0IHRoZSBwcm92aWRlZCB0ZXJtcyBpbnRvIHRoZSBzcGVjaWZpZWQgdGF4b25vbXkncyB0ZXJtcyBhcnJheVxuXHRcdC5jb25jYXQoIHRlcm0gKVxuXHRcdC8vIFNvcnQgYXJyYXlcblx0XHQuc29ydCggYWxwaGFOdW1lcmljU29ydCApO1xuXG5cdC8vIERlLWR1cGVcblx0dGhpcy5fdGF4b25vbXlGaWx0ZXJzWyB0YXhvbm9teSBdID0gdW5pcXVlKCB0YXhvbm9teVRlcm1zLCB0cnVlICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFF1ZXJ5IGZvciBwb3N0cyBwdWJsaXNoZWQgaW4gYSBnaXZlbiB5ZWFyLlxuICpcbiAqIEBtZXRob2QgeWVhclxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtOdW1iZXJ9IHllYXIgaW50ZWdlciByZXByZXNlbnRhdGlvbiBvZiB5ZWFyIHJlcXVlc3RlZFxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLnllYXIgPSBmdW5jdGlvbiggeWVhciApIHtcblx0cmV0dXJuIGZpbHRlck1peGlucy5maWx0ZXIuY2FsbCggdGhpcywgJ3llYXInLCB5ZWFyICk7XG59O1xuXG4vKipcbiAqIFF1ZXJ5IGZvciBwb3N0cyBwdWJsaXNoZWQgaW4gYSBnaXZlbiBtb250aCwgZWl0aGVyIGJ5IHByb3ZpZGluZyB0aGUgbnVtYmVyXG4gKiBvZiB0aGUgcmVxdWVzdGVkIG1vbnRoIChlLmcuIDMpLCBvciB0aGUgbW9udGgncyBuYW1lIGFzIGEgc3RyaW5nIChlLmcuIFwiTWFyY2hcIilcbiAqXG4gKiBAbWV0aG9kIG1vbnRoXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IG1vbnRoIEludGVnZXIgZm9yIG1vbnRoICgxKSBvciBtb250aCBzdHJpbmcgKFwiSmFudWFyeVwiKVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLm1vbnRoID0gZnVuY3Rpb24oIG1vbnRoICkge1xuXHRsZXQgbW9udGhEYXRlO1xuXHRpZiAoIHR5cGVvZiBtb250aCA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Ly8gQXBwZW5kIGEgYXJiaXRyYXJ5IGRheSBhbmQgeWVhciB0byB0aGUgbW9udGggdG8gcGFyc2UgdGhlIHN0cmluZyBpbnRvIGEgRGF0ZVxuXHRcdG1vbnRoRGF0ZSA9IG5ldyBEYXRlKCBEYXRlLnBhcnNlKCBtb250aCArICcgMSwgMjAxMicgKSApO1xuXG5cdFx0Ly8gSWYgdGhlIGdlbmVyYXRlZCBEYXRlIGlzIE5hTiwgdGhlbiB0aGUgcGFzc2VkIHN0cmluZyBpcyBub3QgYSB2YWxpZCBtb250aFxuXHRcdGlmICggaXNOYU4oIG1vbnRoRGF0ZSApICkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXG5cdFx0Ly8gSlMgRGF0ZXMgYXJlIDAgaW5kZXhlZCwgYnV0IHRoZSBXUCBBUEkgcmVxdWlyZXMgYSAxLWluZGV4ZWQgaW50ZWdlclxuXHRcdG1vbnRoID0gbW9udGhEYXRlLmdldE1vbnRoKCkgKyAxO1xuXHR9XG5cblx0Ly8gSWYgbW9udGggaXMgYSBOdW1iZXIsIGFkZCB0aGUgbW9udGhudW0gZmlsdGVyIHRvIHRoZSByZXF1ZXN0XG5cdGlmICggdHlwZW9mIG1vbnRoID09PSAnbnVtYmVyJyApIHtcblx0XHRyZXR1cm4gZmlsdGVyTWl4aW5zLmZpbHRlci5jYWxsKCB0aGlzLCAnbW9udGhudW0nLCBtb250aCApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZCB0aGUgZGF5IGZpbHRlciBpbnRvIHRoZSByZXF1ZXN0IHRvIHJldHJpZXZlIHBvc3RzIGZvciBhIGdpdmVuIGRheVxuICpcbiAqIEBtZXRob2QgZGF5XG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcn0gZGF5IEludGVnZXIgcmVwcmVzZW50YXRpb24gb2YgdGhlIGRheSByZXF1ZXN0ZWRcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbmZpbHRlck1peGlucy5kYXkgPSBmdW5jdGlvbiggZGF5ICkge1xuXHRyZXR1cm4gZmlsdGVyTWl4aW5zLmZpbHRlci5jYWxsKCB0aGlzLCAnZGF5JywgZGF5ICk7XG59O1xuXG4vKipcbiAqIFNwZWNpZnkgdGhhdCB3ZSBhcmUgcmVxdWVzdGluZyBhIHBhZ2UgYnkgaXRzIHBhdGggKHNwZWNpZmljIHRvIFBhZ2UgcmVzb3VyY2VzKVxuICpcbiAqIEBtZXRob2QgcGF0aFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGggVGhlIHJvb3QtcmVsYXRpdmUgVVJMIHBhdGggZm9yIGEgcGFnZVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLnBhdGggPSBmdW5jdGlvbiggcGF0aCApIHtcblx0cmV0dXJuIGZpbHRlck1peGlucy5maWx0ZXIuY2FsbCggdGhpcywgJ3BhZ2VuYW1lJywgcGF0aCApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmaWx0ZXJNaXhpbnM7XG4iLCIvKipcbiAqIFRoaXMgbW9kdWxlIGRlZmluZXMgYSBtYXBwaW5nIGJldHdlZW4gc3VwcG9ydGVkIEdFVCByZXF1ZXN0IHF1ZXJ5IHBhcmFtZXRlclxuICogYXJndW1lbnRzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIG1peGluLCBpZiBhdmFpbGFibGUuXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgZmlsdGVyTWl4aW5zID0gcmVxdWlyZSggJy4vZmlsdGVycycgKTtcbmNvbnN0IHBhcmFtZXRlck1peGlucyA9IHJlcXVpcmUoICcuL3BhcmFtZXRlcnMnICk7XG5cbi8vIGAuY29udGV4dGAsIGAuZW1iZWRgLCBhbmQgYC5lZGl0YCAoYSBzaG9ydGN1dCBmb3IgYGNvbnRleHQoZWRpdCwgdHJ1ZSlgKSBhcmVcbi8vIHN1cHBvcnRlZCBieSBkZWZhdWx0IGluIFdQUmVxdWVzdCwgYXMgaXMgdGhlIGJhc2UgYC5wYXJhbWAgbWV0aG9kLiBBbnkgR0VUXG4vLyBhcmd1bWVudCBwYXJhbWV0ZXJzIG5vdCBjb3ZlcmVkIGhlcmUgbXVzdCBiZSBzZXQgZGlyZWN0bHkgYnkgdXNpbmcgYC5wYXJhbWAuXG5cbi8vIFRoZSBpbml0aWFsIG1peGlucyB3ZSBkZWZpbmUgYXJlIHRoZSBvbmVzIHdoZXJlIGVpdGhlciBhIHNpbmdsZSBwcm9wZXJ0eVxuLy8gYWNjZXB0ZWQgYnkgdGhlIEFQSSBlbmRwb2ludCBjb3JyZXNwb25kcyB0byBtdWx0aXBsZSBpbmRpdmlkdWFsIG1peGluXG4vLyBmdW5jdGlvbnMsIG9yIHdoZXJlIHRoZSBuYW1lIHdlIHVzZSBmb3IgdGhlIGZ1bmN0aW9uIGRpdmVyZ2VzIGZyb20gdGhhdFxuLy8gb2YgdGhlIHF1ZXJ5IHBhcmFtZXRlciB0aGF0IHRoZSBtaXhpbiBzZXRzLlxuY29uc3QgbWl4aW5zID0ge1xuXHRjYXRlZ29yaWVzOiB7XG5cdFx0Y2F0ZWdvcmllczogcGFyYW1ldGVyTWl4aW5zLmNhdGVnb3JpZXMsXG5cdFx0LyoqIEBkZXByZWNhdGVkIHVzZSAuY2F0ZWdvcmllcygpICovXG5cdFx0Y2F0ZWdvcnk6IHBhcmFtZXRlck1peGlucy5jYXRlZ29yeSxcblx0fSxcblx0Y2F0ZWdvcmllc19leGNsdWRlOiB7XG5cdFx0ZXhjbHVkZUNhdGVnb3JpZXM6IHBhcmFtZXRlck1peGlucy5leGNsdWRlQ2F0ZWdvcmllcyxcblx0fSxcblx0dGFnczoge1xuXHRcdHRhZ3M6IHBhcmFtZXRlck1peGlucy50YWdzLFxuXHRcdC8qKiBAZGVwcmVjYXRlZCB1c2UgLnRhZ3MoKSAqL1xuXHRcdHRhZzogcGFyYW1ldGVyTWl4aW5zLnRhZyxcblx0fSxcblx0dGFnc19leGNsdWRlOiB7XG5cdFx0ZXhjbHVkZVRhZ3M6IHBhcmFtZXRlck1peGlucy5leGNsdWRlVGFncyxcblx0fSxcblx0ZmlsdGVyOiBmaWx0ZXJNaXhpbnMsXG5cdHBvc3Q6IHtcblx0XHRwb3N0OiBwYXJhbWV0ZXJNaXhpbnMucG9zdCxcblx0XHQvKiogQGRlcHJlY2F0ZWQgdXNlIC5wb3N0KCkgKi9cblx0XHRmb3JQb3N0OiBwYXJhbWV0ZXJNaXhpbnMucG9zdCxcblx0fSxcbn07XG5cbi8vIEFsbCBvZiB0aGVzZSBwYXJhbWV0ZXIgbWl4aW5zIHVzZSBhIHNldHRlciBmdW5jdGlvbiBuYW1lZCBpZGVudGljYWxseSB0byB0aGVcbi8vIHByb3BlcnR5IHRoYXQgdGhlIGZ1bmN0aW9uIHNldHMsIGJ1dCB0aGV5IG11c3Qgc3RpbGwgYmUgcHJvdmlkZWQgaW4gd3JhcHBlclxuLy8gb2JqZWN0cyBzbyB0aGF0IHRoZSBtaXhpbiBjYW4gYmUgYC5hc3NpZ25gZWQgY29ycmVjdGx5OiB3cmFwICYgYXNzaWduIGVhY2hcbi8vIHNldHRlciB0byB0aGUgbWl4aW5zIGRpY3Rpb25hcnkgb2JqZWN0LlxuW1xuXHQnYWZ0ZXInLFxuXHQnYXV0aG9yJyxcblx0J2JlZm9yZScsXG5cdCdwYXJlbnQnLFxuXHQncGFzc3dvcmQnLFxuXHQnc3RhdHVzJyxcblx0J3N0aWNreScsXG5dLmZvckVhY2goICggbWl4aW5OYW1lICkgPT4ge1xuXHRtaXhpbnNbIG1peGluTmFtZSBdID0ge307XG5cdG1peGluc1sgbWl4aW5OYW1lIF1bIG1peGluTmFtZSBdID0gcGFyYW1ldGVyTWl4aW5zWyBtaXhpbk5hbWUgXTtcbn0gKTtcblxubW9kdWxlLmV4cG9ydHMgPSBtaXhpbnM7XG4iLCIvKipcbiAqIEZpbHRlciBtZXRob2RzIHRoYXQgY2FuIGJlIG1peGVkIGluIHRvIGEgcmVxdWVzdCBjb25zdHJ1Y3RvcidzIHByb3RvdHlwZSB0b1xuICogYWxsb3cgdGhhdCByZXF1ZXN0IHRvIHRha2UgYWR2YW50YWdlIG9mIHRvcC1sZXZlbCBxdWVyeSBwYXJhbWV0ZXJzIGZvclxuICogY29sbGVjdGlvbiBlbmRwb2ludHMuIFRoZXNlIGFyZSBtb3N0IHJlbGV2YW50IHRvIHBvc3RzLCBwYWdlcyBhbmQgQ1BUcywgYnV0XG4gKiBwYWdpbmF0aW9uIGhlbHBlcnMgYXJlIGFwcGxpY2FibGUgdG8gYW55IGNvbGxlY3Rpb24uXG4gKlxuICogQG1vZHVsZSBtaXhpbnMvcGFyYW1ldGVyc1xuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhcmFtU2V0dGVyID0gcmVxdWlyZSggJy4uL3V0aWwvcGFyYW1ldGVyLXNldHRlcicgKTtcbmNvbnN0IGFyZ3VtZW50SXNOdW1lcmljID0gcmVxdWlyZSggJy4uL3V0aWwvYXJndW1lbnQtaXMtbnVtZXJpYycgKTtcblxuLyoqXG4gKiBAbWl4aW4gcGFyYW1ldGVyc1xuICovXG5jb25zdCBwYXJhbWV0ZXJNaXhpbnMgPSB7fTtcblxuY29uc3QgZmlsdGVycyA9IHJlcXVpcmUoICcuL2ZpbHRlcnMnICk7XG4vLyBOZWVkZWQgZm9yIC5hdXRob3IgbWl4aW4sIGFzIGF1dGhvciBieSBJRCBpcyBhIHBhcmFtZXRlciBhbmQgYnkgTmFtZSBpcyBhIGZpbHRlclxuY29uc3QgZmlsdGVyID0gZmlsdGVycy5maWx0ZXI7XG4vLyBOZWVkZWQgZm9yIC50YWcgYW5kIC5jYXRlZ29yeSBtaXhpbiwgZm9yIGRlcHJlY2F0ZWQgcXVlcnktYnktc2x1ZyBzdXBwb3J0XG5jb25zdCB0YXhvbm9teSA9IGZpbHRlcnMudGF4b25vbXk7XG5cbi8vIFBhcmFtZXRlciBNZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFF1ZXJ5IGZvciBwb3N0cyBieSBhIHNwZWNpZmljIGF1dGhvci5cbiAqIFRoaXMgbWV0aG9kIHdpbGwgcmVwbGFjZSBhbnkgcHJldmlvdXMgJ2F1dGhvcicgcXVlcnkgcGFyYW1ldGVycyB0aGF0IGhhZCBiZWVuIHNldC5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBtZXRob2Qgd2lsbCBlaXRoZXIgc2V0IHRoZSBcImF1dGhvclwiIHRvcC1sZXZlbCBxdWVyeSBwYXJhbWV0ZXIsXG4gKiBvciBlbHNlIHRoZSBcImF1dGhvcl9uYW1lXCIgZmlsdGVyIHBhcmFtZXRlciAod2hlbiBxdWVyeWluZyBieSBuaWNlbmFtZSk6IHRoaXMgaXNcbiAqIGlycmVndWxhciBhcyBtb3N0IHBhcmFtZXRlciBoZWxwZXIgbWV0aG9kcyBlaXRoZXIgc2V0IGEgdG9wIGxldmVsIHBhcmFtZXRlciBvciBhXG4gKiBmaWx0ZXIsIG5vdCBib3RoLlxuICpcbiAqIF9Vc2FnZSB3aXRoIHRoZSBhdXRob3IgbmljZW5hbWUgc3RyaW5nIGlzIGRlcHJlY2F0ZWQuXyBRdWVyeSBieSBhdXRob3IgSUQgaW5zdGVhZC5cbiAqIElmIHRoZSBcInJlc3QtZmlsdGVyXCIgcGx1Z2luIGlzIG5vdCBpbnN0YWxsZWQsIHRoZSBuYW1lIHF1ZXJ5IHdpbGwgaGF2ZSBubyBlZmZlY3QuXG4gKlxuICogQG1ldGhvZCBhdXRob3JcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gYXV0aG9yIFRoZSBuaWNlbmFtZSBvciBJRCBmb3IgYSBwYXJ0aWN1bGFyIGF1dGhvclxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLmF1dGhvciA9IGZ1bmN0aW9uKCBhdXRob3IgKSB7XG5cdGlmICggYXV0aG9yID09PSB1bmRlZmluZWQgKSB7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblx0aWYgKCB0eXBlb2YgYXV0aG9yID09PSAnc3RyaW5nJyApIHtcblx0XHR0aGlzLnBhcmFtKCAnYXV0aG9yJywgbnVsbCApO1xuXHRcdHJldHVybiBmaWx0ZXIuY2FsbCggdGhpcywgJ2F1dGhvcl9uYW1lJywgYXV0aG9yICk7XG5cdH1cblx0aWYgKCB0eXBlb2YgYXV0aG9yID09PSAnbnVtYmVyJyApIHtcblx0XHRmaWx0ZXIuY2FsbCggdGhpcywgJ2F1dGhvcl9uYW1lJywgbnVsbCApO1xuXHRcdHJldHVybiB0aGlzLnBhcmFtKCAnYXV0aG9yJywgYXV0aG9yICk7XG5cdH1cblx0aWYgKCBhdXRob3IgPT09IG51bGwgKSB7XG5cdFx0ZmlsdGVyLmNhbGwoIHRoaXMsICdhdXRob3JfbmFtZScsIG51bGwgKTtcblx0XHRyZXR1cm4gdGhpcy5wYXJhbSggJ2F1dGhvcicsIG51bGwgKTtcblx0fVxuXHR0aHJvdyBuZXcgRXJyb3IoICdhdXRob3IgbXVzdCBiZSBlaXRoZXIgYSBuaWNlbmFtZSBzdHJpbmcgb3IgbnVtZXJpYyBJRCcgKTtcbn07XG5cbi8qKlxuICogU2VhcmNoIGZvciBoaWVyYXJjaGljYWwgdGF4b25vbXkgdGVybXMgdGhhdCBhcmUgY2hpbGRyZW4gb2YgdGhlIHBhcmVudCB0ZXJtXG4gKiBpbmRpY2F0ZWQgYnkgdGhlIHByb3ZpZGVkIHRlcm0gSURcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICB3cC5wYWdlcygpLnBhcmVudCggMyApLnRoZW4oZnVuY3Rpb24oIHBhZ2VzICkge1xuICogICAgICAgLy8gY29uc29sZS5sb2coICdhbGwgb2YgdGhlc2UgcGFnZXMgYXJlIG5lc3RlZCBiZWxvdyBwYWdlIElEIzM6JyApO1xuICogICAgICAgLy8gY29uc29sZS5sb2coIHBhZ2VzICk7XG4gKiAgICAgfSk7XG4gKlxuICogICAgIHdwLmNhdGVnb3JpZXMoKS5wYXJlbnQoIDQyICkudGhlbihmdW5jdGlvbiggY2F0ZWdvcmllcyApIHtcbiAqICAgICAgIGNvbnNvbGUubG9nKCAnYWxsIG9mIHRoZXNlIGNhdGVnb3JpZXMgYXJlIHN1Yi1pdGVtcyBvZiBjYXQgSUQjNDI6JyApO1xuICogICAgICAgY29uc29sZS5sb2coIGNhdGVnb3JpZXMgKTtcbiAqICAgICB9KTtcbiAqXG4gKiBAbWV0aG9kIHBhcmVudFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtOdW1iZXJ9IHBhcmVudElkIFRoZSBJRCBvZiBhIChoaWVyYXJjaGljYWwpIHRheG9ub215IHRlcm1cbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5wYXJlbnQgPSBwYXJhbVNldHRlciggJ3BhcmVudCcgKTtcblxuLyoqXG4gKiBTcGVjaWZ5IHRoZSBwb3N0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0ZXJtcyAocmVsZXZhbnQgZm9yICplLmcuKiB0YXhvbm9teVxuICogYW5kIGNvbW1lbnQgY29sbGVjdGlvbiBlbmRwb2ludHMpLlxuICpcbiAqIEBtZXRob2QgcG9zdFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBwb3N0IFRoZSBJRCBvZiB0aGUgcG9zdCBmb3Igd2hpY2ggdG8gcmV0cmlldmUgdGVybXNcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5wb3N0ID0gcGFyYW1TZXR0ZXIoICdwb3N0JyApO1xuXG4vKipcbiAqIFNwZWNpZnkgdGhlIHBhc3N3b3JkIHRvIHVzZSB0byBhY2Nlc3MgdGhlIGNvbnRlbnQgb2YgYSBwYXNzd29yZC1wcm90ZWN0ZWQgcG9zdFxuICpcbiAqIEBtZXRob2QgcGFzc3dvcmRcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXNzd29yZCBBIHN0cmluZyBwYXNzd29yZCB0byBhY2Nlc3MgcHJvdGVjdGVkIGNvbnRlbnQgd2l0aGluIGEgcG9zdFxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnBhc3N3b3JkID0gcGFyYW1TZXR0ZXIoICdwYXNzd29yZCcgKTtcblxuLyoqXG4gKiBTcGVjaWZ5IGZvciB3aGljaCBwb3N0IHN0YXR1c2VzIHRvIHJldHVybiBwb3N0cyBpbiBhIHJlc3BvbnNlIGNvbGxlY3Rpb25cbiAqXG4gKiBTZWUgaHR0cHM6Ly9jb2RleC53b3JkcHJlc3Mub3JnL1Bvc3RfU3RhdHVzIC0tIHRoZSBkZWZhdWx0IHBvc3Qgc3RhdHVzXG4gKiB2YWx1ZXMgaW4gV29yZFByZXNzIHdoaWNoIGFyZSBtb3N0IHJlbGV2YW50IHRvIHRoZSBBUEkgYXJlICdwdWJsaXNoJyxcbiAqICdmdXR1cmUnLCAnZHJhZnQnLCAncGVuZGluZycsICdwcml2YXRlJywgYW5kICd0cmFzaCcuIFRoaXMgcGFyYW1ldGVyIGFsc29cbiAqIHN1cHBvcnRzIHBhc3NpbmcgdGhlIHNwZWNpYWwgdmFsdWUgXCJhbnlcIiB0byByZXR1cm4gYWxsIHN0YXR1c2VzLlxuICpcbiAqIEBtZXRob2Qgc3RhdHVzXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gc3RhdHVzIEEgc3RhdHVzIG5hbWUgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3NcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5zdGF0dXMgPSBwYXJhbVNldHRlciggJ3N0YXR1cycgKTtcblxuLyoqXG4gKiBTcGVjaWZ5IHdoZXRoZXIgdG8gcmV0dXJuIG9ubHksIG9yIHRvIGNvbXBsZXRlbHkgZXhjbHVkZSwgc3RpY2t5IHBvc3RzXG4gKlxuICogQG1ldGhvZCBzdGlja3lcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gc3RpY2t5IEEgYm9vbGVhbiB2YWx1ZSBmb3Igd2hldGhlciBPTkxZIHN0aWNreSBwb3N0cyAodHJ1ZSkgb3JcbiAqICAgICAgICAgICAgICAgICAgICAgICAgIE5PIHN0aWNreSBwb3N0cyAoZmFsc2UpIHNob3VsZCBiZSByZXR1cm5lZCBpbiB0aGUgcXVlcnlcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5zdGlja3kgPSBwYXJhbVNldHRlciggJ3N0aWNreScgKTtcblxuLy8gVGF4b25vbXkgVGVybSBGaWx0ZXIgTWV0aG9kc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFJldHJpZXZlIG9ubHkgcmVjb3JkcyBhc3NvY2lhdGVkIHdpdGggb25lIG9mIHRoZSBwcm92aWRlZCBjYXRlZ29yaWVzXG4gKlxuICogQG1ldGhvZCBjYXRlZ29yaWVzXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QXJyYXl9IGNhdGVnb3JpZXMgQSB0ZXJtIElEIGludGVnZXIgb3IgbnVtZXJpYyBzdHJpbmcsIG9yIGFycmF5IHRoZXJlb2ZcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5jYXRlZ29yaWVzID0gcGFyYW1TZXR0ZXIoICdjYXRlZ29yaWVzJyApO1xuXG4vKipcbiAqIExlZ2FjeSB3cmFwcGVyIGZvciBgLmNhdGVnb3JpZXMoKWAgdGhhdCB1c2VzIGA/ZmlsdGVyYCB0byBxdWVyeSBieSBzbHVnIGlmIGF2YWlsYWJsZVxuICpcbiAqIEBtZXRob2QgdGFnXG4gKiBAZGVwcmVjYXRlZCBVc2UgYC5jYXRlZ29yaWVzKClgIGFuZCBxdWVyeSBieSBjYXRlZ29yeSBJRHNcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gdGFnIEEgY2F0ZWdvcnkgdGVybSBzbHVnIHN0cmluZywgbnVtZXJpYyBJRCwgb3IgYXJyYXkgb2YgbnVtZXJpYyBJRHNcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5jYXRlZ29yeSA9IGZ1bmN0aW9uKCBjYXRlZ29yeSApIHtcblx0aWYgKCBhcmd1bWVudElzTnVtZXJpYyggY2F0ZWdvcnkgKSApIHtcblx0XHRyZXR1cm4gcGFyYW1ldGVyTWl4aW5zLmNhdGVnb3JpZXMuY2FsbCggdGhpcywgY2F0ZWdvcnkgKTtcblx0fVxuXHRyZXR1cm4gdGF4b25vbXkuY2FsbCggdGhpcywgJ2NhdGVnb3J5JywgY2F0ZWdvcnkgKTtcbn07XG5cbi8qKlxuICogRXhjbHVkZSByZWNvcmRzIGFzc29jaWF0ZWQgd2l0aCBhbnkgb2YgdGhlIHByb3ZpZGVkIGNhdGVnb3J5IElEc1xuICpcbiAqIEBtZXRob2QgZXhjbHVkZUNhdGVnb3JpZXNcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gY2F0ZWdvcnkgQSB0ZXJtIElEIGludGVnZXIgb3IgbnVtZXJpYyBzdHJpbmcsIG9yIGFycmF5IHRoZXJlb2ZcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5leGNsdWRlQ2F0ZWdvcmllcyA9IHBhcmFtU2V0dGVyKCAnY2F0ZWdvcmllc19leGNsdWRlJyApO1xuXG4vKipcbiAqIFJldHJpZXZlIG9ubHkgcmVjb3JkcyBhc3NvY2lhdGVkIHdpdGggb25lIG9mIHRoZSBwcm92aWRlZCB0YWcgSURzXG4gKlxuICogQG1ldGhvZCB0YWdzXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QXJyYXl9IHRhZ3MgQSB0ZXJtIElEIGludGVnZXIgb3IgbnVtZXJpYyBzdHJpbmcsIG9yIGFycmF5IHRoZXJlb2ZcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy50YWdzID0gcGFyYW1TZXR0ZXIoICd0YWdzJyApO1xuXG4vKipcbiAqIExlZ2FjeSB3cmFwcGVyIGZvciBgLnRhZ3MoKWAgdGhhdCB1c2VzIGA/ZmlsdGVyYCB0byBxdWVyeSBieSBzbHVnIGlmIGF2YWlsYWJsZVxuICpcbiAqIEBtZXRob2QgdGFnXG4gKiBAZGVwcmVjYXRlZCBVc2UgYC50YWdzKClgIGFuZCBxdWVyeSBieSB0ZXJtIElEc1xuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB0YWcgQSB0YWcgdGVybSBzbHVnIHN0cmluZywgbnVtZXJpYyBJRCwgb3IgYXJyYXkgb2YgbnVtZXJpYyBJRHNcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy50YWcgPSBmdW5jdGlvbiggdGFnICkge1xuXHRpZiAoIGFyZ3VtZW50SXNOdW1lcmljKCB0YWcgKSApIHtcblx0XHRyZXR1cm4gcGFyYW1ldGVyTWl4aW5zLnRhZ3MuY2FsbCggdGhpcywgdGFnICk7XG5cdH1cblx0cmV0dXJuIHRheG9ub215LmNhbGwoIHRoaXMsICd0YWcnLCB0YWcgKTtcbn07XG5cbi8qKlxuICogRXhjbHVkZSByZWNvcmRzIGFzc29jaWF0ZWQgd2l0aCBhbnkgb2YgdGhlIHByb3ZpZGVkIHRhZyBJRHNcbiAqXG4gKiBAbWV0aG9kIGV4Y2x1ZGVUYWdzXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QXJyYXl9IGNhdGVnb3J5IEEgdGVybSBJRCBpbnRlZ2VyIG9yIG51bWVyaWMgc3RyaW5nLCBvciBhcnJheSB0aGVyZW9mXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5wYXJhbWV0ZXJNaXhpbnMuZXhjbHVkZVRhZ3MgPSBwYXJhbVNldHRlciggJ3RhZ3NfZXhjbHVkZScgKTtcblxuLy8gRGF0ZSBNZXRob2RzXG4vLyA9PT09PT09PT09PT1cblxuLyoqXG4gKiBSZXRyaWV2ZSBvbmx5IHJlY29yZHMgcHVibGlzaGVkIGJlZm9yZSBhIHNwZWNpZmllZCBkYXRlXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UHJvdmlkZSBhbiBJU08gODYwMS1jb21wbGlhbnQgZGF0ZSBzdHJpbmc8L2NhcHRpb24+XG4gKlxuICogICAgIHdwLnBvc3RzKCkuYmVmb3JlKCcyMDE2LTAzLTIyJykuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Qcm92aWRlIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdDwvY2FwdGlvbj5cbiAqXG4gKiAgICAgd3AucG9zdHMoKS5iZWZvcmUoIG5ldyBEYXRlKCAyMDE2LCAwMywgMjIgKSApLi4uXG4gKlxuICogQG1ldGhvZCBiZWZvcmVcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfERhdGV9IGRhdGUgQW4gSVNPIDg2MDEtY29tcGxpYW50IGRhdGUgc3RyaW5nLCBvciBEYXRlIG9iamVjdFxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLmJlZm9yZSA9IGZ1bmN0aW9uKCBkYXRlICkge1xuXHRyZXR1cm4gdGhpcy5wYXJhbSggJ2JlZm9yZScsIG5ldyBEYXRlKCBkYXRlICkudG9JU09TdHJpbmcoKSApO1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSBvbmx5IHJlY29yZHMgcHVibGlzaGVkIGFmdGVyIGEgc3BlY2lmaWVkIGRhdGVcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Qcm92aWRlIGFuIElTTyA4NjAxLWNvbXBsaWFudCBkYXRlIHN0cmluZzwvY2FwdGlvbj5cbiAqXG4gKiAgICAgd3AucG9zdHMoKS5hZnRlcignMTk4Ni0wMy0yMicpLi4uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+UHJvdmlkZSBhIEphdmFTY3JpcHQgRGF0ZSBvYmplY3Q8L2NhcHRpb24+XG4gKlxuICogICAgIHdwLnBvc3RzKCkuYWZ0ZXIoIG5ldyBEYXRlKCAxOTg2LCAwMywgMjIgKSApLi4uXG4gKlxuICogQG1ldGhvZCBhZnRlclxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8RGF0ZX0gZGF0ZSBBbiBJU08gODYwMS1jb21wbGlhbnQgZGF0ZSBzdHJpbmcsIG9yIERhdGUgb2JqZWN0XG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5wYXJhbWV0ZXJNaXhpbnMuYWZ0ZXIgPSBmdW5jdGlvbiggZGF0ZSApIHtcblx0cmV0dXJuIHRoaXMucGFyYW0oICdhZnRlcicsIG5ldyBEYXRlKCBkYXRlICkudG9JU09TdHJpbmcoKSApO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBwYXJhbWV0ZXJNaXhpbnM7XG4iLCIvKipcbiAqIEBtb2R1bGUgcGF0aC1wYXJ0LXNldHRlclxuICovXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdG8gc2V0IHBhcnQgb2YgdGhlIHJlcXVlc3QgVVJMIHBhdGguXG4gKlxuICogUGF0aCBwYXJ0IHNldHRlciBtZXRob2RzIG1heSBiZSBlaXRoZXIgZHluYW1pYyAoKmkuZS4qIG1heSByZXByZXNlbnQgYVxuICogXCJuYW1lZCBncm91cFwiKSBvciBub24tZHluYW1pYyAocmVwcmVzZW50aW5nIGEgc3RhdGljIHBhcnQgb2YgdGhlIFVSTCwgd2hpY2hcbiAqIGlzIHVzdWFsbHkgYSBjb2xsZWN0aW9uIGVuZHBvaW50IG9mIHNvbWUgc29ydCkuIFdoaWNoIHR5cGUgb2YgZnVuY3Rpb24gaXNcbiAqIHJldHVybmVkIGRlcGVuZHMgb24gd2hldGhlciBhIGdpdmVuIHJvdXRlIGhhcyBvbmUgb3IgbWFueSBzdWItcmVzb3VyY2VzLlxuICpcbiAqIEBhbGlhcyBtb2R1bGU6bGliL3BhdGgtcGFydC1zZXR0ZXIuY3JlYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbm9kZSBBbiBvYmplY3QgcmVwcmVzZW50aW5nIGEgbGV2ZWwgb2YgYW4gZW5kcG9pbnQgcGF0aCBoaWVyYXJjaHlcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBwYXRoIHBhcnQgc2V0dGVyIGZ1bmN0aW9uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBhdGhQYXJ0U2V0dGVyKCBub2RlICkge1xuXHQvLyBMb2NhbCByZWZlcmVuY2VzIHRvIGBub2RlYCBwcm9wZXJ0aWVzIHVzZWQgYnkgcmV0dXJuZWQgZnVuY3Rpb25zXG5cdGNvbnN0IG5vZGVMZXZlbCA9IG5vZGUubGV2ZWw7XG5cdGNvbnN0IG5vZGVOYW1lID0gbm9kZS5uYW1lc1sgMCBdO1xuXHRjb25zdCBzdXBwb3J0ZWRNZXRob2RzID0gbm9kZS5tZXRob2RzIHx8IFtdO1xuXHRjb25zdCBkeW5hbWljQ2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuID9cblx0XHRPYmplY3Qua2V5cyggbm9kZS5jaGlsZHJlbiApXG5cdFx0XHQubWFwKCBrZXkgPT4gbm9kZS5jaGlsZHJlblsga2V5IF0gKVxuXHRcdFx0LmZpbHRlciggY2hpbGROb2RlID0+ICggY2hpbGROb2RlLm5hbWVkR3JvdXAgPT09IHRydWUgKSApIDpcblx0XHRbXTtcblx0Y29uc3QgZHluYW1pY0NoaWxkID0gZHluYW1pY0NoaWxkcmVuLmxlbmd0aCA9PT0gMSAmJiBkeW5hbWljQ2hpbGRyZW5bIDAgXTtcblx0Y29uc3QgZHluYW1pY0NoaWxkTGV2ZWwgPSBkeW5hbWljQ2hpbGQgJiYgZHluYW1pY0NoaWxkLmxldmVsO1xuXG5cdGlmICggbm9kZS5uYW1lZEdyb3VwICkge1xuXHRcdC8qKlxuXHRcdCAqIFNldCBhIGR5bWFuaWMgKG5hbWVkLWdyb3VwKSBwYXRoIHBhcnQgb2YgYSBxdWVyeSBVUkwuXG5cdFx0ICpcblx0XHQgKiBAZXhhbXBsZVxuXHRcdCAqXG5cdFx0ICogICAgIC8vIGlkKCkgaXMgYSBkeW5hbWljIHBhdGggcGFydCBzZXR0ZXI6XG5cdFx0ICogICAgIHdwLnBvc3RzKCkuaWQoIDcgKTsgLy8gR2V0IHBvc3RzLzdcblx0XHQgKlxuXHRcdCAqIEBjaGFpbmFibGVcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSB2YWwgVGhlIHBhdGggcGFydCB2YWx1ZSB0byBzZXRcblx0XHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgaGFuZGxlciBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuXHRcdCAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0dGhpcy5zZXRQYXRoUGFydCggbm9kZUxldmVsLCB2YWwgKTtcblx0XHRcdGlmICggc3VwcG9ydGVkTWV0aG9kcy5sZW5ndGggKSB7XG5cdFx0XHRcdHRoaXMuX3N1cHBvcnRlZE1ldGhvZHMgPSBzdXBwb3J0ZWRNZXRob2RzO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHQvKipcblx0XHQgKiBTZXQgYSBub24tZHltYW5pYyAobm9uLW5hbWVkLWdyb3VwKSBwYXRoIHBhcnQgb2YgYSBxdWVyeSBVUkwsIGFuZFxuXHRcdCAqIHNldCB0aGUgdmFsdWUgb2YgYSBzdWJyZXNvdXJjZSBpZiBhbiBpbnB1dCB2YWx1ZSBpcyBwcm92aWRlZCBhbmRcblx0XHQgKiBleGFjdGx5IG9uZSBuYW1lZC1ncm91cCBjaGlsZCBub2RlIGV4aXN0cy5cblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICpcblx0XHQgKiAgICAgLy8gcmV2aXNpb25zKCkgaXMgYSBub24tZHluYW1pYyBwYXRoIHBhcnQgc2V0dGVyOlxuXHRcdCAqICAgICB3cC5wb3N0cygpLmlkKCA0ICkucmV2aXNpb25zKCk7ICAgICAgIC8vIEdldCBwb3N0cy80L3JldmlzaW9uc1xuXHRcdCAqICAgICB3cC5wb3N0cygpLmlkKCA0ICkucmV2aXNpb25zKCAxMzcyICk7IC8vIEdldCBwb3N0cy80L3JldmlzaW9ucy8xMzcyXG5cdFx0ICpcblx0XHQgKiBAY2hhaW5hYmxlXG5cdFx0ICogQHBhcmFtICB7U3RyaW5nfE51bWJlcn0gW3ZhbF0gVGhlIHBhdGggcGFydCB2YWx1ZSB0byBzZXQgKGlmIHByb3ZpZGVkKVxuXHRcdCAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBhIHN1YnJlc291cmNlIHdpdGhpbiB0aGlzIHJlc291cmNlXG5cdFx0ICogQHJldHVybnMge09iamVjdH0gVGhlIGhhbmRsZXIgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcblx0XHQgKi9cblx0XHRyZXR1cm4gZnVuY3Rpb24oIHZhbCApIHtcblx0XHRcdC8vIElmIHRoZSBwYXRoIHBhcnQgaXMgbm90IGEgbmFtZWRHcm91cCwgaXQgc2hvdWxkIGhhdmUgZXhhY3RseSBvbmVcblx0XHRcdC8vIGVudHJ5IGluIHRoZSBuYW1lcyBhcnJheTogdXNlIHRoYXQgYXMgdGhlIHZhbHVlIGZvciB0aGlzIHNldHRlcixcblx0XHRcdC8vIGFzIGl0IHdpbGwgdXN1YWxseSBjb3JyZXNwb25kIHRvIGEgY29sbGVjdGlvbiBlbmRwb2ludC5cblx0XHRcdHRoaXMuc2V0UGF0aFBhcnQoIG5vZGVMZXZlbCwgbm9kZU5hbWUgKTtcblxuXHRcdFx0Ly8gSWYgdGhpcyBub2RlIGhhcyBleGFjdGx5IG9uZSBkeW5hbWljIGNoaWxkLCB0aGlzIG1ldGhvZCBtYXkgYWN0IGFzXG5cdFx0XHQvLyBhIHNldHRlciBmb3IgdGhhdCBjaGlsZCBub2RlLiBgZHluYW1pY0NoaWxkTGV2ZWxgIHdpbGwgYmUgZmFsc3kgaWYgdGhlXG5cdFx0XHQvLyBub2RlIGRvZXMgbm90IGhhdmUgYSBjaGlsZCBvciBoYXMgbXVsdGlwbGUgY2hpbGRyZW4uXG5cdFx0XHRpZiAoIHZhbCAhPT0gdW5kZWZpbmVkICYmIGR5bmFtaWNDaGlsZExldmVsICkge1xuXHRcdFx0XHR0aGlzLnNldFBhdGhQYXJ0KCBkeW5hbWljQ2hpbGRMZXZlbCwgdmFsICk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGU6IGNyZWF0ZVBhdGhQYXJ0U2V0dGVyLFxufTtcbiIsIi8qKlxuICogQG1vZHVsZSByZXNvdXJjZS1oYW5kbGVyLXNwZWNcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBjcmVhdGVQYXRoUGFydFNldHRlciA9IHJlcXVpcmUoICcuL3BhdGgtcGFydC1zZXR0ZXInICkuY3JlYXRlO1xuXG4vKiogQHByaXZhdGUgKi9cbmZ1bmN0aW9uIGFkZExldmVsT3B0aW9uKCBsZXZlbHNPYmosIGxldmVsLCBvYmogKSB7XG5cdGxldmVsc09ialsgbGV2ZWwgXSA9IGxldmVsc09ialsgbGV2ZWwgXSB8fCBbXTtcblx0bGV2ZWxzT2JqWyBsZXZlbCBdLnB1c2goIG9iaiApO1xufVxuXG4vKipcbiAqIEFzc2lnbiBhIHNldHRlciBmdW5jdGlvbiBmb3IgdGhlIHByb3ZpZGVkIG5vZGUgdG8gdGhlIHByb3ZpZGVkIHJvdXRlXG4gKiBoYW5kbGVyIG9iamVjdCBzZXR0ZXJzIGRpY3Rpb25hcnkgKG11dGF0ZXMgaGFuZGxlciBieSByZWZlcmVuY2UpLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gaGFuZGxlciBBIHJvdXRlIGhhbmRsZXIgZGVmaW5pdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBub2RlICAgIEEgcm91dGUgaGllcmFyY2h5IGxldmVsIG5vZGUgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGFzc2lnblNldHRlckZuRm9yTm9kZSggaGFuZGxlciwgbm9kZSApIHtcblx0bGV0IHNldHRlckZuO1xuXG5cdC8vIEZvciBlYWNoIG5vZGUsIGFkZCBpdHMgaGFuZGxlciB0byB0aGUgcmVsZXZhbnQgXCJsZXZlbFwiIHJlcHJlc2VudGF0aW9uXG5cdGFkZExldmVsT3B0aW9uKCBoYW5kbGVyLl9sZXZlbHMsIG5vZGUubGV2ZWwsIHtcblx0XHRjb21wb25lbnQ6IG5vZGUuY29tcG9uZW50LFxuXHRcdHZhbGlkYXRlOiBub2RlLnZhbGlkYXRlLFxuXHRcdG1ldGhvZHM6IG5vZGUubWV0aG9kcyxcblx0fSApO1xuXG5cdC8vIEZpcnN0IGxldmVsIGlzIHNldCBpbXBsaWNpdGx5LCBubyBkZWRpY2F0ZWQgc2V0dGVyIG5lZWRlZFxuXHRpZiAoIG5vZGUubGV2ZWwgPiAwICkge1xuXG5cdFx0c2V0dGVyRm4gPSBjcmVhdGVQYXRoUGFydFNldHRlciggbm9kZSApO1xuXG5cdFx0bm9kZS5uYW1lcy5mb3JFYWNoKCAoIG5hbWUgKSA9PiB7XG5cdFx0XHQvLyBDb252ZXJ0IGZyb20gc25ha2VfY2FzZSB0byBjYW1lbENhc2Vcblx0XHRcdGNvbnN0IHNldHRlckZuTmFtZSA9IG5hbWUucmVwbGFjZShcblx0XHRcdFx0L1tfLV0rXFx3L2csXG5cdFx0XHRcdG1hdGNoID0+IG1hdGNoLnJlcGxhY2UoIC9bXy1dKy8sICcnICkudG9VcHBlckNhc2UoKVxuXHRcdFx0KTtcblxuXHRcdFx0Ly8gRG9uJ3Qgb3ZlcndyaXRlIHByZXZpb3VzbHktc2V0IG1ldGhvZHNcblx0XHRcdGlmICggISBoYW5kbGVyLl9zZXR0ZXJzWyBzZXR0ZXJGbk5hbWUgXSApIHtcblx0XHRcdFx0aGFuZGxlci5fc2V0dGVyc1sgc2V0dGVyRm5OYW1lIF0gPSBzZXR0ZXJGbjtcblx0XHRcdH1cblx0XHR9ICk7XG5cdH1cbn1cblxuLyoqXG4gKiBXYWxrIHRoZSB0cmVlIG9mIGEgc3BlY2lmaWMgcmVzb3VyY2Ugbm9kZSB0byBjcmVhdGUgdGhlIHNldHRlciBtZXRob2RzXG4gKlxuICogVGhlIEFQSSB3ZSB3YW50IHRvIHByb2R1Y2UgZnJvbSB0aGUgbm9kZSB0cmVlIGxvb2tzIGxpa2UgdGhpczpcbiAqXG4gKiAgICAgd3AucG9zdHMoKTsgICAgICAgICAgICAgICAgICAgICAgICAvd3AvdjIvcG9zdHNcbiAqICAgICB3cC5wb3N0cygpLmlkKCA3ICk7ICAgICAgICAgICAgICAgIC93cC92Mi9wb3N0cy83XG4gKiAgICAgd3AucG9zdHMoKS5pZCggNyApLnJldmlzaW9ucygpOyAgICAvd3AvdjIvcG9zdHMvNy9yZXZpc2lvbnNcbiAqICAgICB3cC5wb3N0cygpLmlkKCA3ICkucmV2aXNpb25zKCA4ICk7IC93cC92Mi9wb3N0cy83L3JldmlzaW9ucy84XG4gKlxuICogXiBUaGF0IGxhc3Qgb25lJ3MgdGhlIHRyaWNreSBvbmU6IHdlIGNhbiBkZWR1Y2UgdGhhdCB0aGlzIHBhcmFtZXRlciBpcyBcImlkXCIsIGJ1dFxuICogdGhhdCBwYXJhbSB3aWxsIGFscmVhZHkgYmUgdGFrZW4gYnkgdGhlIHBvc3QgSUQsIHNvIHN1Yi1jb2xsZWN0aW9ucyBoYXZlIHRvIGJlXG4gKiBzZXQgdXAgYXMgYC5yZXZpc2lvbnMoKWAgdG8gZ2V0IHRoZSBjb2xsZWN0aW9uLCBhbmQgYC5yZXZpc2lvbnMoIGlkIClgIHRvIGdldCBhXG4gKiBzcGVjaWZpYyByZXNvdXJjZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtICB7T2JqZWN0fSBub2RlICAgICAgICAgICAgQSBub2RlIG9iamVjdFxuICogQHBhcmFtICB7T2JqZWN0fSBbbm9kZS5jaGlsZHJlbl0gQW4gb2JqZWN0IG9mIGNoaWxkIG5vZGVzXG4gKiAvLyBAcmV0dXJucyB7aXNMZWFmfSBBIGJvb2xlYW4gaW5kaWNhdGluZyB3aGV0aGVyIHRoZSBwcm9jZXNzZWQgbm9kZSBpcyBhIGxlYWZcbiAqL1xuZnVuY3Rpb24gZXh0cmFjdFNldHRlckZyb21Ob2RlKCBoYW5kbGVyLCBub2RlICkge1xuXG5cdGFzc2lnblNldHRlckZuRm9yTm9kZSggaGFuZGxlciwgbm9kZSApO1xuXG5cdGlmICggbm9kZS5jaGlsZHJlbiApIHtcblx0XHQvLyBSZWN1cnNlIGRvd24gdG8gdGhpcyBub2RlJ3MgY2hpbGRyZW5cblx0XHRPYmplY3Qua2V5cyggbm9kZS5jaGlsZHJlbiApLmZvckVhY2goICgga2V5ICkgPT4ge1xuXHRcdFx0ZXh0cmFjdFNldHRlckZyb21Ob2RlKCBoYW5kbGVyLCBub2RlLmNoaWxkcmVuWyBrZXkgXSApO1xuXHRcdH0gKTtcblx0fVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIG5vZGUgaGFuZGxlciBzcGVjaWZpY2F0aW9uIG9iamVjdCBmcm9tIGEgcm91dGUgZGVmaW5pdGlvbiBvYmplY3RcbiAqXG4gKiBAbmFtZSBjcmVhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSByb3V0ZURlZmluaXRpb24gQSByb3V0ZSBkZWZpbml0aW9uIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9IHJlc291cmNlIFRoZSBzdHJpbmcga2V5IG9mIHRoZSByZXNvdXJjZSBmb3Igd2hpY2ggdG8gY3JlYXRlIGEgaGFuZGxlclxuICogQHJldHVybnMge29iamVjdH0gQSBoYW5kbGVyIHNwZWMgb2JqZWN0IHdpdGggX3BhdGgsIF9sZXZlbHMgYW5kIF9zZXR0ZXJzIHByb3BlcnRpZXNcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTm9kZUhhbmRsZXJTcGVjKCByb3V0ZURlZmluaXRpb24sIHJlc291cmNlICkge1xuXG5cdGNvbnN0IGhhbmRsZXIgPSB7XG5cdFx0Ly8gQSBcInBhdGhcIiBpcyBhbiBvcmRlcmVkIChieSBrZXkpIHNldCBvZiB2YWx1ZXMgY29tcG9zZWQgaW50byB0aGUgZmluYWwgVVJMXG5cdFx0X3BhdGg6IHtcblx0XHRcdCcwJzogcmVzb3VyY2UsXG5cdFx0fSxcblxuXHRcdC8vIEEgXCJsZXZlbFwiIGlzIGEgbGV2ZWwta2V5ZWQgb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgdmFsaWQgb3B0aW9ucyBmb3Jcblx0XHQvLyBvbmUgbGV2ZWwgb2YgdGhlIHJlc291cmNlIFVSTFxuXHRcdF9sZXZlbHM6IHt9LFxuXG5cdFx0Ly8gT2JqZWN0cyB0aGF0IGhvbGQgbWV0aG9kcyBhbmQgcHJvcGVydGllcyB3aGljaCB3aWxsIGJlIGNvcGllZCB0b1xuXHRcdC8vIGluc3RhbmNlcyBvZiB0aGlzIGVuZHBvaW50J3MgaGFuZGxlclxuXHRcdF9zZXR0ZXJzOiB7fSxcblxuXHRcdC8vIEFyZ3VtZW50cyAocXVlcnkgcGFyYW1ldGVycykgdGhhdCBtYXkgYmUgc2V0IGluIEdFVCByZXF1ZXN0cyB0byBlbmRwb2ludHNcblx0XHQvLyBuZXN0ZWQgd2l0aGluIHRoaXMgcmVzb3VyY2Ugcm91dGUgdHJlZSwgdXNlZCB0byBkZXRlcm1pbmUgdGhlIG1peGlucyB0b1xuXHRcdC8vIGFkZCB0byB0aGUgcmVxdWVzdCBoYW5kbGVyXG5cdFx0X2dldEFyZ3M6IHJvdXRlRGVmaW5pdGlvbi5fZ2V0QXJncyxcblx0fTtcblxuXHQvLyBXYWxrIHRoZSB0cmVlXG5cdE9iamVjdC5rZXlzKCByb3V0ZURlZmluaXRpb24gKS5mb3JFYWNoKCAoIHJvdXRlRGVmUHJvcCApID0+IHtcblx0XHRpZiAoIHJvdXRlRGVmUHJvcCAhPT0gJ19nZXRBcmdzJyApIHtcblx0XHRcdGV4dHJhY3RTZXR0ZXJGcm9tTm9kZSggaGFuZGxlciwgcm91dGVEZWZpbml0aW9uWyByb3V0ZURlZlByb3AgXSApO1xuXHRcdH1cblx0fSApO1xuXG5cdHJldHVybiBoYW5kbGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Y3JlYXRlOiBjcmVhdGVOb2RlSGFuZGxlclNwZWMsXG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHJvdXRlLXRyZWVcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBuYW1lZEdyb3VwUkUgPSByZXF1aXJlKCAnLi91dGlsL25hbWVkLWdyb3VwLXJlZ2V4cCcgKS5uYW1lZEdyb3VwUkU7XG5jb25zdCBzcGxpdFBhdGggPSByZXF1aXJlKCAnLi91dGlsL3NwbGl0LXBhdGgnICk7XG5jb25zdCBlbnN1cmUgPSByZXF1aXJlKCAnLi91dGlsL2Vuc3VyZScgKTtcbmNvbnN0IG9iamVjdFJlZHVjZSA9IHJlcXVpcmUoICcuL3V0aWwvb2JqZWN0LXJlZHVjZScgKTtcblxuLyoqXG4gKiBNZXRob2QgdG8gdXNlIHdoZW4gcmVkdWNpbmcgcm91dGUgY29tcG9uZW50cyBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3R9IHJvdXRlT2JqICAgICBBIHJvdXRlIGRlZmluaXRpb24gb2JqZWN0IChzZXQgdmlhIC5iaW5kIHBhcnRpYWwgYXBwbGljYXRpb24pXG4gKiBAcGFyYW0ge29iamVjdH0gdG9wTGV2ZWwgICAgIFRoZSB0b3AtbGV2ZWwgcm91dGUgdHJlZSBvYmplY3QgZm9yIHRoaXMgc2V0IG9mIHJvdXRlcyAoc2V0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpYSAuYmluZCBwYXJ0aWFsIGFwcGxpY2F0aW9uKVxuICogQHBhcmFtIHtvYmplY3R9IHBhcmVudExldmVsICBUaGUgbWVtbyBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQgYXMgdGhlIHJlZHVjZXIgYWRkc1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIG5ldyBsZXZlbCBoYW5kbGVyIGZvciBlYWNoIGxldmVsIGluIHRoZSByb3V0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudCAgICBUaGUgc3RyaW5nIGRlZmluaW5nIHRoaXMgcm91dGUgY29tcG9uZW50XG4gKiBAcGFyYW0ge251bWJlcn0gaWR4ICAgICAgICAgIFRoZSBpbmRleCBvZiB0aGlzIGNvbXBvbmVudCB3aXRoaW4gdGhlIGNvbXBvbmVudHMgYXJyYXlcbiAqIEBwYXJhbSB7c3RyaW5nW119IGNvbXBvbmVudHMgVGhlIGFycmF5IG9mIGFsbCBjb21wb25lbnRzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgY2hpbGQgb2JqZWN0IG9mIHRoZSBsZXZlbCBiZWluZyByZWR1Y2VkXG4gKi9cbmZ1bmN0aW9uIHJlZHVjZVJvdXRlQ29tcG9uZW50cyggcm91dGVPYmosIHRvcExldmVsLCBwYXJlbnRMZXZlbCwgY29tcG9uZW50LCBpZHgsIGNvbXBvbmVudHMgKSB7XG5cdC8vIENoZWNrIHRvIHNlZSBpZiB0aGlzIGNvbXBvbmVudCBpcyBhIGR5bmFtaWMgVVJMIHNlZ21lbnQgKGkuZS4gZGVmaW5lZCBieVxuXHQvLyBhIG5hbWVkIGNhcHR1cmUgZ3JvdXAgcmVndWxhciBleHByZXNzaW9uKS4gbmFtZWRHcm91cCB3aWxsIGJlIGBudWxsYCBpZlxuXHQvLyB0aGUgcmVnZXhwIGRvZXMgbm90IG1hdGNoLCBvciBlbHNlIGFuIGFycmF5IGRlZmluaW5nIHRoZSBSZWdFeHAgbWF0Y2gsIGUuZy5cblx0Ly8gW1xuXHQvLyAgICdQPGlkPltcXFxcZF0rKScsXG5cdC8vICAgJ2lkJywgLy8gTmFtZSBvZiB0aGUgZ3JvdXBcblx0Ly8gICAnW1xcXFxkXSsnLCAvLyByZWd1bGFyIGV4cHJlc3Npb24gZm9yIHRoaXMgVVJMIHNlZ21lbnQncyBjb250ZW50c1xuXHQvLyAgIGluZGV4OiAxNSxcblx0Ly8gICBpbnB1dDogJy93cC92Mi9wb3N0cy8oP1A8aWQ+W1xcXFxkXSspJ1xuXHQvLyBdXG5cdGNvbnN0IG5hbWVkR3JvdXAgPSBjb21wb25lbnQubWF0Y2goIG5hbWVkR3JvdXBSRSApO1xuXHQvLyBQdWxsIG91dCByZWZlcmVuY2VzIHRvIHRoZSByZWxldmFudCBpbmRpY2VzIG9mIHRoZSBtYXRjaCwgZm9yIHV0aWxpdHk6XG5cdC8vIGBudWxsYCBjaGVja2luZyBpcyBuZWNlc3NhcnkgaW4gY2FzZSB0aGUgY29tcG9uZW50IGRpZCBub3QgbWF0Y2ggdGhlIFJFLFxuXHQvLyBoZW5jZSB0aGUgYG5hbWVkR3JvdXAgJiZgLlxuXHRjb25zdCBncm91cE5hbWUgPSBuYW1lZEdyb3VwICYmIG5hbWVkR3JvdXBbIDEgXTtcblx0Y29uc3QgZ3JvdXBQYXR0ZXJuID0gbmFtZWRHcm91cCAmJiBuYW1lZEdyb3VwWyAyIF07XG5cblx0Ly8gV2hlbiBicmFuY2hpbmcgYmFzZWQgb24gYSBkeW5hbWljIGNhcHR1cmUgZ3JvdXAgd2UgdXNlZCB0aGUgZ3JvdXAncyBSRVxuXHQvLyBwYXR0ZXJuIGFzIHRoZSB1bmlxdWUgaWRlbnRpZmllcjogdGhpcyBpcyBkb25lIGJlY2F1c2UgdGhlIHNhbWUgZ3JvdXBcblx0Ly8gY291bGQgYmUgYXNzaWduZWQgZGlmZmVyZW50IG5hbWVzIGluIGRpZmZlcmVudCBlbmRwb2ludCBoYW5kbGVycywgZS5nLlxuXHQvLyBcImlkXCIgZm9yIHBvc3RzLzppZCB2cyBcInBhcmVudF9pZFwiIGZvciBwb3N0cy86cGFyZW50X2lkL3JldmlzaW9ucy5cblx0Ly9cblx0Ly8gVGhlcmUgaXMgYW4gZWRnZSBjYXNlIHdoZXJlIGdyb3VwUGF0dGVybiB3aWxsIGJlIFwiXCIgaWYgd2UgYXJlIHJlZ2lzdGVyaW5nXG5cdC8vIGEgY3VzdG9tIHJvdXRlIHZpYSBgLnJlZ2lzdGVyUm91dGVgIHRoYXQgZG9lcyBub3QgaW5jbHVkZSBwYXJhbWV0ZXJcblx0Ly8gdmFsaWRhdGlvbi4gSW4gdGhpcyBjYXNlIHdlIGFzc3VtZSB0aGUgZ3JvdXBOYW1lIGlzIHN1ZmZpY2llbnRseSB1bmlxdWUsXG5cdC8vIGFuZCBmYWxsIGJhY2sgdG8gYHx8IGdyb3VwTmFtZWAgZm9yIHRoZSBsZXZlbEtleSBzdHJpbmcuXG5cdGNvbnN0IGxldmVsS2V5ID0gbmFtZWRHcm91cCA/ICggZ3JvdXBQYXR0ZXJuIHx8IGdyb3VwTmFtZSApIDogY29tcG9uZW50O1xuXG5cdC8vIExldmVsIG5hbWUgb24gdGhlIG90aGVyIGhhbmQgdGFrZXMgaXRzIHZhbHVlIGZyb20gdGhlIGdyb3VwJ3MgbmFtZSwgaWZcblx0Ly8gZGVmaW5lZCwgYW5kIGZhbGxzIGJhY2sgdG8gdGhlIGNvbXBvbmVudCBzdHJpbmcgdG8gaGFuZGxlIHNpdHVhdGlvbnMgd2hlcmVcblx0Ly8gYGNvbXBvbmVudGAgaXMgYSBjb2xsZWN0aW9uIChlLmcuIFwicmV2aXNpb25zXCIpXG5cdGNvbnN0IGxldmVsTmFtZSA9IG5hbWVkR3JvdXAgPyBncm91cE5hbWUgOiBjb21wb25lbnQ7XG5cblx0Ly8gQ2hlY2sgd2hldGhlciB3ZSBoYXZlIGEgcHJlZXhpc3Rpbmcgbm9kZSBhdCB0aGlzIGxldmVsIG9mIHRoZSB0cmVlLCBhbmRcblx0Ly8gY3JlYXRlIGEgbmV3IGxldmVsIG9iamVjdCBpZiBub3QuIFRoZSBjb21wb25lbnQgc3RyaW5nIGlzIGluY2x1ZGVkIHNvIHRoYXRcblx0Ly8gdmFsaWRhdG9ycyBjYW4gdGhyb3cgbWVhbmluZ2Z1bCBlcnJvcnMgYXMgYXBwcm9wcmlhdGUuXG5cdGNvbnN0IGN1cnJlbnRMZXZlbCA9IHBhcmVudExldmVsWyBsZXZlbEtleSBdIHx8IHtcblx0XHRjb21wb25lbnQ6IGNvbXBvbmVudCxcblx0XHRuYW1lZEdyb3VwOiBuYW1lZEdyb3VwID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdGxldmVsOiBpZHgsXG5cdFx0bmFtZXM6IFtdLFxuXHR9O1xuXG5cdC8vIEEgbGV2ZWwncyBcIm5hbWVzXCIgY29ycmVzcG9uZCB0byB0aGUgbGlzdCBvZiBzdHJpbmdzIHdoaWNoIGNvdWxkIGRlc2NyaWJlXG5cdC8vIGFuIGVuZHBvaW50J3MgY29tcG9uZW50IHNldHRlciBmdW5jdGlvbnM6IFwiaWRcIiwgXCJyZXZpc2lvbnNcIiwgZXRjLlxuXHRpZiAoIGN1cnJlbnRMZXZlbC5uYW1lcy5pbmRleE9mKCBsZXZlbE5hbWUgKSA8IDAgKSB7XG5cdFx0Y3VycmVudExldmVsLm5hbWVzLnB1c2goIGxldmVsTmFtZSApO1xuXHR9XG5cblx0Ly8gQSBsZXZlbCdzIHZhbGlkYXRlIG1ldGhvZCBpcyBjYWxsZWQgdG8gY2hlY2sgd2hldGhlciBhIHZhbHVlIGJlaW5nIHNldFxuXHQvLyBvbiB0aGUgcmVxdWVzdCBVUkwgaXMgb2YgdGhlIHByb3BlciB0eXBlIGZvciB0aGUgbG9jYXRpb24gaW4gd2hpY2ggaXRcblx0Ly8gaXMgc3BlY2lmaWVkLiBJZiBhIGdyb3VwIHBhdHRlcm4gd2FzIGZvdW5kLCB0aGUgdmFsaWRhdG9yIGNoZWNrcyB3aGV0aGVyXG5cdC8vIHRoZSBpbnB1dCBzdHJpbmcgZXhhY3RseSBtYXRjaGVzIHRoZSBncm91cCBwYXR0ZXJuLlxuXHRjb25zdCBncm91cFBhdHRlcm5SRSA9IGdyb3VwUGF0dGVybiA9PT0gJycgP1xuXHRcdC8vIElmIGdyb3VwUGF0dGVybiBpcyBhbiBlbXB0eSBzdHJpbmcsIGFjY2VwdCBhbnkgaW5wdXQgd2l0aG91dCB2YWxpZGF0aW9uXG5cdFx0Ly4qLyA6XG5cdFx0Ly8gT3RoZXJ3aXNlLCB2YWxpZGF0ZSBhZ2FpbnN0IHRoZSBncm91cCBwYXR0ZXJuIG9yIHRoZSBjb21wb25lbnQgc3RyaW5nXG5cdFx0bmV3IFJlZ0V4cCggZ3JvdXBQYXR0ZXJuID8gJ14nICsgZ3JvdXBQYXR0ZXJuICsgJyQnIDogY29tcG9uZW50LCAnaScgKTtcblxuXHQvLyBPbmx5IG9uZSB2YWxpZGF0ZSBmdW5jdGlvbiBpcyBtYWludGFpbmVkIGZvciBlYWNoIG5vZGUsIGJlY2F1c2UgZWFjaCBub2RlXG5cdC8vIGlzIGRlZmluZWQgZWl0aGVyIGJ5IGEgc3RyaW5nIGxpdGVyYWwgb3IgYnkgYSBzcGVjaWZpYyByZWd1bGFyIGV4cHJlc3Npb24uXG5cdGN1cnJlbnRMZXZlbC52YWxpZGF0ZSA9IGlucHV0ID0+IGdyb3VwUGF0dGVyblJFLnRlc3QoIGlucHV0ICk7XG5cblx0Ly8gQ2hlY2sgdG8gc2VlIHdoZXRoZXIgdG8gZXhwZWN0IG1vcmUgbm9kZXMgd2l0aGluIHRoaXMgYnJhbmNoIG9mIHRoZSB0cmVlLFxuXHRpZiAoIGNvbXBvbmVudHNbIGlkeCArIDEgXSApIHtcblx0XHQvLyBhbmQgY3JlYXRlIGEgXCJjaGlsZHJlblwiIG9iamVjdCB0byBob2xkIHRob3NlIG5vZGVzIGlmIG5lY2Vzc2FyeVxuXHRcdGN1cnJlbnRMZXZlbC5jaGlsZHJlbiA9IGN1cnJlbnRMZXZlbC5jaGlsZHJlbiB8fCB7fTtcblx0fSBlbHNlIHtcblx0XHQvLyBBdCBsZWFmIG5vZGVzLCBzcGVjaWZ5IHRoZSBtZXRob2QgY2FwYWJpbGl0aWVzIG9mIHRoaXMgZW5kcG9pbnRcblx0XHRjdXJyZW50TGV2ZWwubWV0aG9kcyA9ICggcm91dGVPYmoubWV0aG9kcyB8fCBbXSApLm1hcCggc3RyID0+IHN0ci50b0xvd2VyQ2FzZSgpICk7XG5cblx0XHQvLyBFbnN1cmUgSEVBRCBpcyBpbmNsdWRlZCB3aGVuZXZlciBHRVQgaXMgc3VwcG9ydGVkOiB0aGUgQVBJIGF1dG9tYXRpY2FsbHlcblx0XHQvLyBhZGRzIHN1cHBvcnQgZm9yIEhFQUQgaWYgeW91IGhhdmUgR0VUXG5cdFx0aWYgKCBjdXJyZW50TGV2ZWwubWV0aG9kcy5pbmRleE9mKCAnZ2V0JyApID4gLTEgJiYgY3VycmVudExldmVsLm1ldGhvZHMuaW5kZXhPZiggJ2hlYWQnICkgPT09IC0xICkge1xuXHRcdFx0Y3VycmVudExldmVsLm1ldGhvZHMucHVzaCggJ2hlYWQnICk7XG5cdFx0fVxuXG5cdFx0Ly8gQXQgbGVhZiBub2RlcyBhbHNvIGZsYWcgKGF0IHRoZSB0b3AgbGV2ZWwpIHdoYXQgYXJndW1lbnRzIGFyZVxuXHRcdC8vIGF2YWlsYWJsZSB0byBHRVQgcmVxdWVzdHMsIHNvIHRoYXQgd2UgbWF5IGF1dG9tYXRpY2FsbHkgYXBwbHkgdGhlXG5cdFx0Ly8gYXBwcm9wcmlhdGUgcGFyYW1ldGVyIG1peGluc1xuXHRcdGlmICggcm91dGVPYmouZW5kcG9pbnRzICkge1xuXHRcdFx0dG9wTGV2ZWwuX2dldEFyZ3MgPSB0b3BMZXZlbC5fZ2V0QXJncyB8fCB7fTtcblx0XHRcdHJvdXRlT2JqLmVuZHBvaW50cy5mb3JFYWNoKCAoIGVuZHBvaW50ICkgPT4ge1xuXHRcdFx0XHQvLyBgZW5kcG9pbnQubWV0aG9kc2Agd2lsbCBiZSBhbiBhcnJheSBvZiBtZXRob2RzIGxpa2UgYFsgJ0dFVCcgXWA6IHdlXG5cdFx0XHRcdC8vIG9ubHkgY2FyZSBhYm91dCBHRVQgZm9yIHRoaXMgZXhlcmNpc2UuIFZhbGlkYXRpbmcgUE9TVCBhbmQgUFVUIGFyZ3Ncblx0XHRcdFx0Ly8gY291bGQgYmUgdXNlZnVsIGJ1dCBpcyBjdXJyZW50bHkgZGVlbWVkIHRvIGJlIG91dC1vZi1zY29wZS5cblx0XHRcdFx0ZW5kcG9pbnQubWV0aG9kcy5mb3JFYWNoKCAoIG1ldGhvZCApID0+IHtcblx0XHRcdFx0XHRpZiAoIG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAnZ2V0JyApIHtcblx0XHRcdFx0XHRcdE9iamVjdC5rZXlzKCBlbmRwb2ludC5hcmdzICkuZm9yRWFjaCggKCBhcmdLZXkgKSA9PiB7XG5cdFx0XHRcdFx0XHRcdC8vIFJlZmVyZW5jZSBwYXJhbSBkZWZpbml0aW9uIG9iamVjdHMgaW4gdGhlIHRvcCBfZ2V0QXJncyBkaWN0aW9uYXJ5XG5cdFx0XHRcdFx0XHRcdHRvcExldmVsLl9nZXRBcmdzWyBhcmdLZXkgXSA9IGVuZHBvaW50LmFyZ3NbIGFyZ0tleSBdO1xuXHRcdFx0XHRcdFx0fSApO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSApO1xuXHRcdFx0fSApO1xuXHRcdH1cblx0fVxuXG5cdC8vIFJldHVybiB0aGUgY2hpbGQgbm9kZSBvYmplY3QgYXMgdGhlIG5ldyBcImxldmVsXCJcblx0cGFyZW50TGV2ZWxbIGxldmVsS2V5IF0gPSBjdXJyZW50TGV2ZWw7XG5cdHJldHVybiBjdXJyZW50TGV2ZWwuY2hpbGRyZW47XG59XG5cbi8qKlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gICBuYW1lc3BhY2VzIFRoZSBtZW1vIG9iamVjdCB0aGF0IGJlY29tZXMgYSBkaWN0aW9uYXJ5IG1hcHBpbmcgQVBJXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5hbWVzcGFjZXMgdG8gYW4gb2JqZWN0IG9mIHRoZSBuYW1lc3BhY2UncyByb3V0ZXNcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIHJvdXRlT2JqICAgQSByb3V0ZSBkZWZpbml0aW9uIG9iamVjdFxuICogQHBhcmFtIHtzdHJpbmd9ICAgcm91dGUgICAgICBUaGUgc3RyaW5nIGtleSBvZiB0aGUgYHJvdXRlT2JqYCByb3V0ZSBvYmplY3RcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBuYW1lc3BhY2VzIGRpY3Rpb25hcnkgbWVtbyBvYmplY3RcbiAqL1xuZnVuY3Rpb24gcmVkdWNlUm91dGVUcmVlKCBuYW1lc3BhY2VzLCByb3V0ZU9iaiwgcm91dGUgKSB7XG5cdGNvbnN0IG5zRm9yUm91dGUgPSByb3V0ZU9iai5uYW1lc3BhY2U7XG5cblx0Y29uc3Qgcm91dGVTdHJpbmcgPSByb3V0ZVxuXHRcdC8vIFN0cmlwIHRoZSBuYW1lc3BhY2UgZnJvbSB0aGUgcm91dGUgc3RyaW5nIChhbGwgcm91dGVzIHNob3VsZCBoYXZlIHRoZVxuXHRcdC8vIGZvcm1hdCBgL25hbWVzcGFjZS9vdGhlci9zdHVmZmApIEBUT0RPOiBWYWxpZGF0ZSB0aGlzIGFzc3VtcHRpb25cblx0XHQucmVwbGFjZSggJy8nICsgbnNGb3JSb3V0ZSArICcvJywgJycgKVxuXHRcdC8vIEFsc28gc3RyaXAgYW55IHRyYWlsaW5nIFwiLz9cIjogdGhlIHNsYXNoIGlzIGFscmVhZHkgb3B0aW9uYWwgYW5kIGEgc2luZ2xlXG5cdFx0Ly8gcXVlc3Rpb24gbWFyayB3b3VsZCBicmVhayB0aGUgcmVnZXggcGFyc2VyXG5cdFx0LnJlcGxhY2UoIC9cXC9cXD8kLywgJycgKTtcblxuXHQvLyBTcGxpdCB0aGUgcm91dGVzIHVwIGludG8gaGllcmFyY2hpY2FsIHJvdXRlIGNvbXBvbmVudHNcblx0Y29uc3Qgcm91dGVDb21wb25lbnRzID0gc3BsaXRQYXRoKCByb3V0ZVN0cmluZyApO1xuXG5cdC8vIERvIG5vdCBtYWtlIGEgbmFtZXNwYWNlIGdyb3VwIGZvciB0aGUgQVBJIHJvb3Rcblx0Ly8gRG8gbm90IGFkZCB0aGUgbmFtZXNwYWNlIHJvb3QgdG8gaXRzIG93biBncm91cFxuXHQvLyBEbyBub3QgdGFrZSBhbnkgYWN0aW9uIGlmIHJvdXRlU3RyaW5nIGlzIGVtcHR5XG5cdGlmICggISBuc0ZvclJvdXRlIHx8ICcvJyArIG5zRm9yUm91dGUgPT09IHJvdXRlIHx8ICEgcm91dGVTdHJpbmcgKSB7XG5cdFx0cmV0dXJuIG5hbWVzcGFjZXM7XG5cdH1cblxuXHQvLyBFbnN1cmUgdGhhdCB0aGUgbmFtZXNwYWNlIG9iamVjdCBmb3IgdGhpcyBuYW1lc3BhY2UgZXhpc3RzXG5cdGVuc3VyZSggbmFtZXNwYWNlcywgbnNGb3JSb3V0ZSwge30gKTtcblxuXHQvLyBHZXQgYSBsb2NhbCByZWZlcmVuY2UgdG8gbmFtZXNwYWNlIG9iamVjdFxuXHRjb25zdCBucyA9IG5hbWVzcGFjZXNbIG5zRm9yUm91dGUgXTtcblxuXHQvLyBUaGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgcm91dGUgdGVsbHMgdXMgd2hhdCB0eXBlIG9mIHJlc291cmNlIHRoaXMgcm91dGVcblx0Ly8gaXMgZm9yLCBlLmcuIFwicG9zdHNcIiBvciBcImNvbW1lbnRzXCI6IHdlIGJ1aWxkIG9uZSBoYW5kbGVyIHBlciByZXNvdXJjZVxuXHQvLyB0eXBlLCBzbyB3ZSBncm91cCBsaWtlIHJlc291cmNlIHBhdGhzIHRvZ2V0aGVyLlxuXHRjb25zdCByZXNvdXJjZSA9IHJvdXRlQ29tcG9uZW50c1swXTtcblxuXHQvLyBAVE9ETzogVGhpcyBjb2RlIGFib3ZlIGN1cnJlbnRseSBwcmVjbHVkZXMgYmFzZWxlc3Mgcm91dGVzLCBlLmcuXG5cdC8vIG15cGx1Z2luL3YyLyg/UDxyZXNvdXJjZT5cXHcrKSAtLSBzaG91bGQgdGhvc2UgYmUgc3VwcG9ydGVkP1xuXG5cdC8vIENyZWF0ZSBhbiBhcnJheSB0byByZXByZXNlbnQgdGhpcyByZXNvdXJjZSwgYW5kIGVuc3VyZSBpdCBpcyBhc3NpZ25lZFxuXHQvLyB0byB0aGUgbmFtZXNwYWNlIG9iamVjdC4gVGhlIGFycmF5IHdpbGwgc3RydWN0dXJlIHRoZSBcImxldmVsc1wiIChwYXRoXG5cdC8vIGNvbXBvbmVudHMgYW5kIHN1YnJlc291cmNlIHR5cGVzKSBvZiB0aGlzIHJlc291cmNlJ3MgZW5kcG9pbnQgaGFuZGxlci5cblx0ZW5zdXJlKCBucywgcmVzb3VyY2UsIHt9ICk7XG5cdGNvbnN0IGxldmVscyA9IG5zWyByZXNvdXJjZSBdO1xuXG5cdC8vIFJlY3Vyc2UgdGhyb3VnaCB0aGUgcm91dGUgY29tcG9uZW50cywgbXV0YXRpbmcgbGV2ZWxzIHdpdGggaW5mb3JtYXRpb24gYWJvdXRcblx0Ly8gZWFjaCBjaGlsZCBub2RlIGVuY291bnRlcmVkIHdoaWxlIHdhbGtpbmcgdGhyb3VnaCB0aGUgcm91dGVzIHRyZWUgYW5kIHdoYXRcblx0Ly8gYXJndW1lbnRzIChwYXJhbWV0ZXJzKSBhcmUgYXZhaWxhYmxlIGZvciBHRVQgcmVxdWVzdHMgdG8gdGhpcyBlbmRwb2ludC5cblx0cm91dGVDb21wb25lbnRzLnJlZHVjZShcblx0XHRyZWR1Y2VSb3V0ZUNvbXBvbmVudHMuYmluZCggbnVsbCwgcm91dGVPYmosIGxldmVscyApLFxuXHRcdGxldmVsc1xuXHQpO1xuXG5cdHJldHVybiBuYW1lc3BhY2VzO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgcm91dGUgdHJlZSBieSByZWR1Y2luZyBvdmVyIGEgcm91dGVzIGRlZmluaXRpb24gb2JqZWN0IGZyb20gdGhlIEFQSVxuICogcm9vdCBlbmRwb2ludCByZXNwb25zZSBvYmplY3RcbiAqXG4gKiBAbWV0aG9kIGJ1aWxkXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGVzIEEgZGljdGlvbmFyeSBvZiByb3V0ZXMga2V5ZWQgYnkgcm91dGUgcmVnZXggc3RyaW5nc1xuICogQHJldHVybnMge29iamVjdH0gQSBkaWN0aW9uYXJ5LCBrZXllZCBieSBuYW1lc3BhY2UsIG9mIHJlc291cmNlIGhhbmRsZXJcbiAqIGZhY3RvcnkgbWV0aG9kcyBmb3IgZWFjaCBuYW1lc3BhY2UncyByZXNvdXJjZXNcbiAqL1xuZnVuY3Rpb24gYnVpbGRSb3V0ZVRyZWUoIHJvdXRlcyApIHtcblx0cmV0dXJuIG9iamVjdFJlZHVjZSggcm91dGVzLCByZWR1Y2VSb3V0ZVRyZWUsIHt9ICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRidWlsZDogYnVpbGRSb3V0ZVRyZWUsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFV0aWxpdHkgZnVuY3Rpb24gZm9yIHNvcnRpbmcgYXJyYXlzIG9mIG51bWJlcnMgb3Igc3RyaW5ncy5cbiAqXG4gKiBAbW9kdWxlIHV0aWwvYWxwaGFudW1lcmljLXNvcnRcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gYSBUaGUgZmlyc3QgY29tcGFyYXRvciBvcGVyYW5kXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IGEgVGhlIHNlY29uZCBjb21wYXJhdG9yIG9wZXJhbmRcbiAqIEByZXR1cm5zIC0xIGlmIHRoZSB2YWx1ZXMgYXJlIGJhY2t3YXJkcywgMSBpZiB0aGV5J3JlIG9yZGVyZWQsIGFuZCAwIGlmIHRoZXkncmUgdGhlIHNhbWVcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIGEsIGIgKSA9PiB7XG5cdGlmICggYSA+IGIgKSB7XG5cdFx0cmV0dXJuIDE7XG5cdH1cblx0aWYgKCBhIDwgYiApIHtcblx0XHRyZXR1cm4gLTE7XG5cdH1cblx0cmV0dXJuIDA7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEF1Z21lbnQgYW4gb2JqZWN0IChzcGVjaWZpY2FsbHkgYSBwcm90b3R5cGUpIHdpdGggYSBtaXhpbiBtZXRob2RcbiAqICh0aGUgcHJvdmlkZWQgb2JqZWN0IGlzIG11dGF0ZWQgYnkgcmVmZXJlbmNlKVxuICpcbiAqIEBtb2R1bGUgdXRpbC9hcHBseS1taXhpblxuICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0ICh1c3VhbGx5IGEgcHJvdG90eXBlKSB0byBhdWdtZW50XG4gKiBAcGFyYW0ge1N0cmluZ30ga2V5IFRoZSBwcm9wZXJ0eSB0byB3aGljaCB0aGUgbWl4aW4gbWV0aG9kIHNob3VsZCBiZSBhc3NpZ25lZFxuICogQHBhcmFtIHtGdW5jdGlvbn0gbWl4aW4gVGhlIG1peGluIG1ldGhvZFxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCBvYmosIGtleSwgbWl4aW4gKSA9PiB7XG5cdC8vIFdpbGwgbm90IG92ZXJ3cml0ZSBleGlzdGluZyBtZXRob2RzXG5cdGlmICggdHlwZW9mIG1peGluID09PSAnZnVuY3Rpb24nICYmICEgb2JqWyBrZXkgXSApIHtcblx0XHRvYmpbIGtleSBdID0gbWl4aW47XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmV0dXJuIHRydWUgaWYgdGhlIHByb3ZpZGVkIGFyZ3VtZW50IGlzIGEgbnVtYmVyLCBhIG51bWVyaWMgc3RyaW5nLCBvciBhblxuICogYXJyYXkgb2YgbnVtYmVycyBvciBudW1lcmljIHN0cmluZ3NcbiAqXG4gKiBAbW9kdWxlIHV0aWwvYXJndW1lbnQtaXMtbnVtZXJpY1xuICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfE51bWJlcltdfFN0cmluZ1tdfSB2YWwgVGhlIHZhbHVlIHRvIGluc3BlY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIHByb3BlcnR5IHRvIHdoaWNoIHRoZSBtaXhpbiBtZXRob2Qgc2hvdWxkIGJlIGFzc2lnbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbiBUaGUgbWl4aW4gbWV0aG9kXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xuY29uc3QgYXJndW1lbnRJc051bWVyaWMgPSAoIHZhbCApID0+IHtcblx0aWYgKCB0eXBlb2YgdmFsID09PSAnbnVtYmVyJyApIHtcblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdGlmICggdHlwZW9mIHZhbCA9PT0gJ3N0cmluZycgKSB7XG5cdFx0cmV0dXJuIC9eXFxkKyQvLnRlc3QoIHZhbCApO1xuXHR9XG5cblx0aWYgKCBBcnJheS5pc0FycmF5KCB2YWwgKSApIHtcblx0XHRmb3IgKCBsZXQgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKysgKSB7XG5cdFx0XHQvLyBGYWlsIGVhcmx5IGlmIGFueSBhcmd1bWVudCBpc24ndCBkZXRlcm1pbmVkIHRvIGJlIG51bWVyaWNcblx0XHRcdGlmICggISBhcmd1bWVudElzTnVtZXJpYyggdmFsWyBpIF0gKSApIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fVxuXG5cdC8vIElmIGl0J3Mgbm90IGFuIGFycmF5LCBhbmQgbm90IGEgc3RyaW5nLCBhbmQgbm90IGEgbnVtYmVyLCB3ZSBkb24ndFxuXHQvLyBrbm93IHdoYXQgdG8gZG8gd2l0aCBpdFxuXHRyZXR1cm4gZmFsc2U7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGFyZ3VtZW50SXNOdW1lcmljO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFZlcmlmeSB0aGF0IGEgc3BlY2lmaWMgSFRUUCBtZXRob2QgaXMgc3VwcG9ydGVkIGJ5IHRoZSBwcm92aWRlZCBXUFJlcXVlc3RcbiAqXG4gKiBAbW9kdWxlIHV0aWwvY2hlY2stbWV0aG9kLXN1cHBvcnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2QgQW4gSFRUUCBtZXRob2QgdG8gY2hlY2sgKCdnZXQnLCAncG9zdCcsIGV0YylcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSByZXF1ZXN0IEEgV1BSZXF1ZXN0IG9iamVjdCB3aXRoIGEgX3N1cHBvcnRlZE1ldGhvZHMgYXJyYXlcbiAqIEByZXR1cm5zIHRydWUgaWZmIHRoZSBtZXRob2QgaXMgd2l0aGluIHJlcXVlc3QuX3N1cHBvcnRlZE1ldGhvZHNcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIG1ldGhvZCwgcmVxdWVzdCApID0+IHtcblx0aWYgKCByZXF1ZXN0Ll9zdXBwb3J0ZWRNZXRob2RzLmluZGV4T2YoIG1ldGhvZC50b0xvd2VyQ2FzZSgpICkgPT09IC0xICkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdCdVbnN1cHBvcnRlZCBtZXRob2Q7IHN1cHBvcnRlZCBtZXRob2RzIGFyZTogJyArXG5cdFx0XHRyZXF1ZXN0Ll9zdXBwb3J0ZWRNZXRob2RzLmpvaW4oICcsICcgKVxuXHRcdCk7XG5cdH1cblxuXHRyZXR1cm4gdHJ1ZTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRW5zdXJlIHRoYXQgYSBwcm9wZXJ0eSBpcyBwcmVzZW50IGluIGFuIG9iamVjdCwgaW5pdGlhbGl6aW5nIGl0IHRvIGEgZGVmYXVsdFxuICogdmFsdWUgaWYgaXQgaXMgbm90IGFscmVhZHkgZGVmaW5lZC4gTW9kaWZpZXMgdGhlIHByb3ZpZGVkIG9iamVjdCBieSByZWZlcmVuY2UuXG4gKlxuICogQG1vZHVsZSB1dGlsL2Vuc3VyZVxuICogQHBhcmFtIHtvYmplY3R9IG9iaiAgICAgICAgICAgICAgVGhlIG9iamVjdCBpbiB3aGljaCB0byBlbnN1cmUgYSBwcm9wZXJ0eSBleGlzdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wICAgICAgICAgICAgIFRoZSBwcm9wZXJ0eSBrZXkgdG8gZW5zdXJlXG4gKiBAcGFyYW0ge30gICAgICAgcHJvcERlZmF1bHRWYWx1ZSBUaGUgZGVmYXVsdCB2YWx1ZSBmb3IgdGhlIHByb3BlcnR5XG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIG9iaiwgcHJvcCwgcHJvcERlZmF1bHRWYWx1ZSApID0+IHtcblx0aWYgKCBvYmogJiYgb2JqWyBwcm9wIF0gPT09IHVuZGVmaW5lZCApIHtcblx0XHRvYmpbIHByb3AgXSA9IHByb3BEZWZhdWx0VmFsdWU7XG5cdH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgYW4gcHJvdmlkZWQgdmFsdWUgaXMgYW4gZW1wdHkgb2JqZWN0XG4gKlxuICogQG1vZHVsZSB1dGlsL2lzLWVtcHR5LW9iamVjdFxuICogQHBhcmFtIHt9IHZhbHVlIEEgdmFsdWUgdG8gdGVzdCBmb3IgZW1wdHktb2JqZWN0LW5lc3NcbiAqIEByZXR1cm5zIHtib29sZWFufSBXaGV0aGVyIHRoZSBwcm92aWRlZCB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIHZhbHVlICkgPT4ge1xuXHQvLyBJZiB0aGUgdmFsdWUgaXMgbm90IG9iamVjdC1saWtlLCB0aGVuIGl0IGlzIGNlcnRhaW5seSBub3QgYW4gZW1wdHkgb2JqZWN0XG5cdGlmICggdHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0JyApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHQvLyBGb3Igb3VyIHB1cnBvc2VzIGFuIGVtcHR5IGFycmF5IHNob3VsZCBub3QgYmUgdHJlYXRlZCBhcyBhbiBlbXB0eSBvYmplY3Rcblx0Ly8gKFNpbmNlIHRoaXMgaXMgdXNlZCB0byBwcm9jZXNzIGludmFsaWQgY29udGVudC10eXBlIHJlc3BvbnNlcywgKVxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0Zm9yICggY29uc3Qga2V5IGluIHZhbHVlICkge1xuXHRcdGlmICggdmFsdWUuaGFzT3duUHJvcGVydHkoIGtleSApICkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBDb252ZXJ0IGEgKGtleSwgdmFsdWUpIHBhaXIgdG8gYSB7IGtleTogdmFsdWUgfSBvYmplY3RcbiAqXG4gKiBAbW9kdWxlIHV0aWwva2V5LXZhbC10by1vYmpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgICBUaGUga2V5IHRvIHVzZSBpbiB0aGUgcmV0dXJuZWQgb2JqZWN0XG4gKiBAcGFyYW0ge30gICAgICAgdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbiB0byB0aGUgcHJvdmlkZWQga2V5XG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIGRpY3Rpb25hcnkgb2JqZWN0IGNvbnRhaW5pbmcgdGhlIGtleS12YWx1ZSBwYWlyXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCBrZXksIHZhbHVlICkgPT4ge1xuXHRjb25zdCBvYmogPSB7fTtcblx0b2JqWyBrZXkgXSA9IHZhbHVlO1xuXHRyZXR1cm4gb2JqO1xufTtcbiIsIi8qKlxuICogQG1vZHVsZSB1dGlsL25hbWVkLWdyb3VwLXJlZ2V4cFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhdHRlcm4gPSBbXG5cdC8vIENhcHR1cmUgZ3JvdXAgc3RhcnRcblx0J1xcXFwoXFxcXD8nLFxuXHQvLyBDYXB0dXJlIGdyb3VwIG5hbWUgYmVnaW5zIGVpdGhlciBgUDxgLCBgPGAgb3IgYCdgXG5cdCcoPzpQPHw8fFxcJyknLFxuXHQvLyBFdmVyeXRoaW5nIHVwIHRvIHRoZSBuZXh0IGA+YGAgb3IgYCdgIChkZXBlbmRpbmcpIHdpbGwgYmUgdGhlIGNhcHR1cmUgZ3JvdXAgbmFtZVxuXHQnKFtePlxcJ10rKScsXG5cdC8vIENhcHR1cmUgZ3JvdXAgZW5kXG5cdCdbPlxcJ10nLFxuXHQvLyBHZXQgZXZlcnl0aGluZyB1cCB0byB0aGUgZW5kIG9mIHRoZSBjYXB0dXJlIGdyb3VwOiB0aGlzIGlzIHRoZSBSZWdFeHAgdXNlZFxuXHQvLyB3aGVuIG1hdGNoaW5nIFVSTHMgdG8gdGhpcyByb3V0ZSwgd2hpY2ggd2UgY2FuIHVzZSBmb3IgdmFsaWRhdGlvbiBwdXJwb3Nlcy5cblx0JyhbXlxcXFwpXSopJyxcblx0Ly8gQ2FwdHVyZSBncm91cCBlbmRcblx0J1xcXFwpJyxcbl0uam9pbiggJycgKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdC8qKlxuXHQgKiBTdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGV4cG9ydGVkIFJlZ3VsYXIgRXhwcmVzc2lvbjsgd2UgY29uc3RydWN0IHRoaXNcblx0ICogUmVnRXhwIGZyb20gYSBzdHJpbmcgdG8gZW5hYmxlIG1vcmUgZGV0YWlsZWQgYW5ub3RhdGlvbiBhbmQgcGVybXV0YXRpb25cblx0ICpcblx0ICogQHByb3Age1N0cmluZ30gcGF0dGVyblxuXHQgKi9cblx0cGF0dGVybjogcGF0dGVybixcblxuXHQvKipcblx0ICogUmVndWxhciBFeHByZXNzaW9uIHRvIGlkZW50aWZ5IGEgY2FwdHVyZSBncm91cCBpbiBQQ1JFIGZvcm1hdHNcblx0ICogYCg/PG5hbWU+cmVnZXgpYCwgYCg/J25hbWUncmVnZXgpYCBvciBgKD9QPG5hbWU+cmVnZXgpYCAoc2VlXG5cdCAqIHJlZ3VsYXItZXhwcmVzc2lvbnMuaW5mby9yZWZleHQuaHRtbClcblx0ICpcblx0ICogQHByb3Age1JlZ0V4cH0gbmFtZWRHcm91cFJFXG5cdCAqL1xuXHRuYW1lZEdyb3VwUkU6IG5ldyBSZWdFeHAoIHBhdHRlcm4gKSxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0eSBtZXRob2QgdG8gcGVybWl0IEFycmF5I3JlZHVjZS1saWtlIG9wZXJhdGlvbnMgb3ZlciBvYmplY3RzXG4gKlxuICogVGhpcyBpcyBsaWtlbHkgdG8gYmUgc2xpZ2h0bHkgbW9yZSBpbmVmZmljaWVudCB0aGFuIHVzaW5nIGxvZGFzaC5yZWR1Y2UsXG4gKiBidXQgcmVzdWx0cyBpbiB+NTBrYiBsZXNzIHNpemUgaW4gdGhlIHJlc3VsdGluZyBidW5kbGVkIGNvZGUgYmVmb3JlXG4gKiBtaW5pZmljYXRpb24gYW5kIH4xMmtiIG9mIHNhdmluZ3Mgd2l0aCBtaW5pZmljYXRpb24uXG4gKlxuICogVW5saWtlIGxvZGFzaC5yZWR1Y2UoKSwgdGhlIGl0ZXJhdG9yIGFuZCBpbml0aWFsIHZhbHVlIHByb3BlcnRpZXMgYXJlIE5PVFxuICogb3B0aW9uYWw6IHRoaXMgaXMgZG9uZSB0byBzaW1wbGlmeSB0aGUgY29kZSwgdGhpcyBtb2R1bGUgaXMgbm90IGludGVuZGVkIHRvXG4gKiBiZSBhIGZ1bGwgcmVwbGFjZW1lbnQgZm9yIGxvZGFzaC5yZWR1Y2UgYW5kIGluc3RlYWQgcHJpb3JpdGl6ZXMgc2ltcGxpY2l0eVxuICogZm9yIGEgc3BlY2lmaWMgY29tbW9uIGNhc2UuXG4gKlxuICogQG1vZHVsZSB1dGlsL29iamVjdC1yZWR1Y2VcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCBvZiBrZXktdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdG9yIEEgZnVuY3Rpb24gdG8gdXNlIHRvIHJlZHVjZSB0aGUgb2JqZWN0XG4gKiBAcGFyYW0geyp9IGluaXRpYWxTdGF0ZSBUaGUgaW5pdGlhbCB2YWx1ZSB0byBwYXNzIHRvIHRoZSByZWR1Y2VyIGZ1bmN0aW9uXG4gKiBAcmV0dXJucyBUaGUgcmVzdWx0IG9mIHRoZSByZWR1Y3Rpb24gb3BlcmF0aW9uXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCBvYmosIGl0ZXJhdG9yLCBpbml0aWFsU3RhdGUgKSA9PiBPYmplY3Rcblx0LmtleXMoIG9iaiApXG5cdC5yZWR1Y2UoXG5cdFx0KCBtZW1vLCBrZXkgKSA9PiBpdGVyYXRvciggbWVtbywgb2JqWyBrZXkgXSwga2V5ICksXG5cdFx0aW5pdGlhbFN0YXRlXG5cdCk7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogSGVscGVyIHRvIGNyZWF0ZSBhIHNpbXBsZSBwYXJhbWV0ZXIgc2V0dGVyIGNvbnZlbmllbmNlIG1ldGhvZFxuICpcbiAqIEBtb2R1bGUgdXRpbC9wYXJhbWV0ZXItc2V0dGVyXG4gKiBAcGFyYW0ge1N0cmluZ30gcGFyYW0gVGhlIHN0cmluZyBrZXkgb2YgdGhlIHBhcmFtZXRlciB0aGlzIG1ldGhvZCB3aWxsIHNldFxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHNldHRlciBtZXRob2QgdGhhdCBjYW4gYmUgYXNzaWduZWQgdG8gYSByZXF1ZXN0IGluc3RhbmNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gKCBwYXJhbSApID0+IHtcblx0LyoqXG5cdCAqIEEgc2V0dGVyIGZvciBhIHNwZWNpZmljIHBhcmFtZXRlclxuXHQgKlxuXHQgKiBAY2hhaW5hYmxlXG5cdCAqIEBwYXJhbSB7Kn0gdmFsIFRoZSB2YWx1ZSB0byBzZXQgZm9yIHRoZSB0aGUgcGFyYW1ldGVyXG5cdCAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIG9uIHdoaWNoIHRoaXMgbWV0aG9kIHdhcyBjYWxsZWQgKGZvciBjaGFpbmluZylcblx0ICovXG5cdHJldHVybiBmdW5jdGlvbiggdmFsICkge1xuXHRcdHJldHVybiB0aGlzLnBhcmFtKCBwYXJhbSwgdmFsICk7XG5cdH07XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWwvc3BsaXQtcGF0aFxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hbWVkR3JvdXBQYXR0ZXJuID0gcmVxdWlyZSggJy4vbmFtZWQtZ3JvdXAtcmVnZXhwJyApLnBhdHRlcm47XG5cbi8vIENvbnZlcnQgY2FwdHVyZSBncm91cHMgdG8gbm9uLW1hdGNoaW5nIGdyb3VwcywgYmVjYXVzZSBhbGwgY2FwdHVyZSBncm91cHNcbi8vIGFyZSBpbmNsdWRlZCBpbiB0aGUgcmVzdWx0aW5nIGFycmF5IHdoZW4gYW4gUkUgaXMgcGFzc2VkIHRvIGAuc3BsaXQoKWBcbi8vIChXZSByZS11c2UgdGhlIGV4aXN0aW5nIG5hbWVkIGdyb3VwJ3MgY2FwdHVyZSBwYXR0ZXJuIGluc3RlYWQgb2YgY3JlYXRpbmdcbi8vIGEgbmV3IFJlZ0V4cCBqdXN0IGZvciB0aGlzIHB1cnBvc2UpXG5jb25zdCBwYXR0ZXJuV2l0aG91dFN1Ymdyb3VwcyA9IG5hbWVkR3JvdXBQYXR0ZXJuXG5cdC5yZXBsYWNlKCAvKFteXFxcXF0pXFwoKFteP10pL2csICckMSg/OiQyJyApO1xuXG4vLyBNYWtlIGEgbmV3IFJlZ0V4cCB1c2luZyB0aGUgc2FtZSBwYXR0ZXJuIGFzIG9uZSBzaW5nbGUgdW5pZmllZCBjYXB0dXJlIGdyb3VwLFxuLy8gc28gdGhlIG1hdGNoIGFzIGEgd2hvbGUgd2lsbCBiZSBwcmVzZXJ2ZWQgYWZ0ZXIgYC5zcGxpdCgpYC4gUGVybWl0IG5vbi1zbGFzaFxuLy8gY2hhcmFjdGVycyBiZWZvcmUgb3IgYWZ0ZXIgdGhlIG5hbWVkIGNhcHR1cmUgZ3JvdXAsIGFsdGhvdWdoIHRob3NlIGNvbXBvbmVudHNcbi8vIHdpbGwgbm90IHlpZWxkIGZ1bmN0aW9uaW5nIHNldHRlcnMuXG5jb25zdCBuYW1lZEdyb3VwUkUgPSBuZXcgUmVnRXhwKCAnKFteL10qJyArIHBhdHRlcm5XaXRob3V0U3ViZ3JvdXBzICsgJ1teL10qKScgKTtcblxuLyoqXG4gKiBEaXZpZGUgYSByb3V0ZSBzdHJpbmcgdXAgaW50byBoaWVyYXJjaGljYWwgY29tcG9uZW50cyBieSBicmVha2luZyBpdCBhcGFydFxuICogb24gZm9yd2FyZCBzbGFzaCBjaGFyYWN0ZXJzLlxuICpcbiAqIFRoZXJlIGFyZSBwbHVnaW5zIChpbmNsdWRpbmcgSmV0cGFjaykgdGhhdCByZWdpc3RlciByb3V0ZXMgd2l0aCByZWdleCBjYXB0dXJlXG4gKiBncm91cHMgd2hpY2ggYWxzbyBjb250YWluIGZvcndhcmQgc2xhc2hlcywgc28gdGhvc2UgZ3JvdXBzIGhhdmUgdG8gYmUgcHVsbGVkXG4gKiBvdXQgZmlyc3QgYmVmb3JlIHRoZSByZW1haW5kZXIgb2YgdGhlIHN0cmluZyBjYW4gYmUgLnNwbGl0KCkgYXMgbm9ybWFsLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXRoU3RyIEEgcm91dGUgcGF0aCBzdHJpbmcgdG8gYnJlYWsgaW50byBjb21wb25lbnRzXG4gKiBAcmV0dXJucyB7U3RyaW5nW119IEFuIGFycmF5IG9mIHJvdXRlIGNvbXBvbmVudCBzdHJpbmdzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gcGF0aFN0ciA9PiBwYXRoU3RyXG5cdC8vIERpdmlkZSBhIHN0cmluZyBsaWtlIFwiL3NvbWUvcGF0aC8oP1A8d2l0aF9uYW1lZF9ncm91cHM+KS9ldGNcIiBpbnRvIGFuXG5cdC8vIGFycmF5IGBbIFwiL3NvbWUvcGF0aC9cIiwgXCIoP1A8d2l0aF9uYW1lZF9ncm91cHM+KVwiLCBcIi9ldGNcIiBdYC5cblx0LnNwbGl0KCBuYW1lZEdyb3VwUkUgKVxuXHQvLyBUaGVuLCByZWR1Y2UgdGhyb3VnaCB0aGUgYXJyYXkgb2YgcGFydHMsIHNwbGl0dGluZyBhbnkgbm9uLWNhcHR1cmUtZ3JvdXBcblx0Ly8gcGFydHMgb24gZm9yd2FyZCBzbGFzaGVzIGFuZCBkaXNjYXJkaW5nIGVtcHR5IHN0cmluZ3MgdG8gY3JlYXRlIHRoZSBmaW5hbFxuXHQvLyBhcnJheSBvZiBwYXRoIGNvbXBvbmVudHMuXG5cdC5yZWR1Y2UoICggY29tcG9uZW50cywgcGFydCApID0+IHtcblx0XHRpZiAoICEgcGFydCApIHtcblx0XHRcdC8vIElnbm9yZSBlbXB0eSBzdHJpbmdzIHBhcnRzXG5cdFx0XHRyZXR1cm4gY29tcG9uZW50cztcblx0XHR9XG5cblx0XHRpZiAoIG5hbWVkR3JvdXBSRS50ZXN0KCBwYXJ0ICkgKSB7XG5cdFx0XHQvLyBJbmNsdWRlIG5hbWVkIGNhcHR1cmUgZ3JvdXBzIGFzLWlzXG5cdFx0XHRyZXR1cm4gY29tcG9uZW50cy5jb25jYXQoIHBhcnQgKTtcblx0XHR9XG5cblx0XHQvLyBTcGxpdCB0aGUgcGFydCBvbiAvIGFuZCBmaWx0ZXIgb3V0IGVtcHR5IHN0cmluZ3Ncblx0XHRyZXR1cm4gY29tcG9uZW50cy5jb25jYXQoIHBhcnQuc3BsaXQoICcvJyApLmZpbHRlciggQm9vbGVhbiApICk7XG5cdH0sIFtdICk7XG4iLCIvKipcbiAqIFJldHVybiBhbiBhcnJheSB3aXRoIGFsbCBkdXBsaWNhdGUgaXRlbXMgcmVtb3ZlZC5cbiAqXG4gKiBUaGlzIGZ1bmN0aW9uYWxpdHkgd2FzIHByZXZpb3VzbHkgcHJvdmlkZWQgYnkgbG9kYXNoLnVuaXEsIGJ1dCB0aGlzXG4gKiBtb2Rlcm4gSlMgc29sdXRpb24geWllbGRzIGEgc21hbGxlciBidW5kbGUgc2l6ZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBhcnIgQW4gYXJyYXkgdG8gZGUtZHVwbGljYXRlXG4gKiBAcmV0dXJucyB7QXJyYXl9IEEgZGUtZHVwbGljYXRlZCBhcnJheVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGFyciA9PiBBcnJheS5mcm9tKCBuZXcgU2V0KCBhcnIgKSApO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBidWlsZFJvdXRlVHJlZSA9IHJlcXVpcmUoICcuL3JvdXRlLXRyZWUnICkuYnVpbGQ7XG5jb25zdCBnZW5lcmF0ZUVuZHBvaW50RmFjdG9yaWVzID0gcmVxdWlyZSggJy4vZW5kcG9pbnQtZmFjdG9yaWVzJyApLmdlbmVyYXRlO1xuY29uc3QgcGFyYW1TZXR0ZXIgPSByZXF1aXJlKCAnLi91dGlsL3BhcmFtZXRlci1zZXR0ZXInICk7XG5jb25zdCBhcHBseU1peGluID0gcmVxdWlyZSggJy4vdXRpbC9hcHBseS1taXhpbicgKTtcbmNvbnN0IG1peGlucyA9IHJlcXVpcmUoICcuL21peGlucycgKTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIGhhbmRsZXIgZm9yIGFuIGFyYml0cmFyeSBXUCBSRVNUIEFQSSBlbmRwb2ludC5cbiAqXG4gKiBUaGUgZmlyc3QgdHdvIHBhcmFtZXRlcnMgbWlycm9yIGByZWdpc3Rlcl9yZXN0X3JvdXRlYCBpbiB0aGUgUkVTVCBBUElcbiAqIGNvZGViYXNlOlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUEkjXG4gKiBAcGFyYW0ge3N0cmluZ30gICBuYW1lc3BhY2UgICAgICAgICBBIG5hbWVzcGFjZSBzdHJpbmcsIGUuZy4gJ215cGx1Z2luL3YxJ1xuICogQHBhcmFtIHtzdHJpbmd9ICAgcmVzdEJhc2UgICAgICAgICAgQSBSRVNUIHJvdXRlIHN0cmluZywgZS5nLiAnL2F1dGhvci8oP1A8aWQ+XFxkKyknXG4gKiBAcGFyYW0ge29iamVjdH0gICBbb3B0aW9uc10gICAgICAgICBBbiAob3B0aW9uYWwpIG9wdGlvbnMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gICBbb3B0aW9ucy5taXhpbnNdICBBIGhhc2ggb2YgZnVuY3Rpb25zIHRvIGFwcGx5IGFzIG1peGluc1xuICogQHBhcmFtIHtzdHJpbmdbXX0gW29wdGlvbnMubWV0aG9kc10gQW4gYXJyYXkgb2YgbWV0aG9kcyB0byB3aGl0ZWxpc3QgKG9uIHRoZSBsZWFmIG5vZGUgb25seSlcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQW4gZW5kcG9pbnQgaGFuZGxlciBmYWN0b3J5IGZ1bmN0aW9uIGZvciB0aGUgc3BlY2lmaWVkIHJvdXRlXG4gKi9cbmZ1bmN0aW9uIHJlZ2lzdGVyUm91dGUoIG5hbWVzcGFjZSwgcmVzdEJhc2UsIG9wdGlvbnMgPSB7fSApIHtcblx0Ly8gU3VwcG9ydCBhbGwgbWV0aG9kcyB1bnRpbCByZXF1ZXN0ZWQgdG8gZG8gb3RoZXJ3aXNlXG5cdGxldCBzdXBwb3J0ZWRNZXRob2RzID0gWyAnaGVhZCcsICdnZXQnLCAncGF0Y2gnLCAncHV0JywgJ3Bvc3QnLCAnZGVsZXRlJyBdO1xuXG5cdGlmICggQXJyYXkuaXNBcnJheSggb3B0aW9ucy5tZXRob2RzICkgKSB7XG5cdFx0Ly8gUGVybWl0IHN1cHBvcnRlZCBtZXRob2RzIHRvIGJlIHNwZWNpZmllZCBhcyBhbiBhcnJheVxuXHRcdHN1cHBvcnRlZE1ldGhvZHMgPSBvcHRpb25zLm1ldGhvZHMubWFwKCBtZXRob2QgPT4gbWV0aG9kLnRyaW0oKS50b0xvd2VyQ2FzZSgpICk7XG5cdH0gZWxzZSBpZiAoIHR5cGVvZiBvcHRpb25zLm1ldGhvZHMgPT09ICdzdHJpbmcnICkge1xuXHRcdC8vIFBlcm1pdCBhIHN1cHBvcnRlZCBtZXRob2QgdG8gYmUgc3BlY2lmaWVkIGFzIGEgc3RyaW5nXG5cdFx0c3VwcG9ydGVkTWV0aG9kcyA9IFsgb3B0aW9ucy5tZXRob2RzLnRyaW0oKS50b0xvd2VyQ2FzZSgpIF07XG5cdH1cblxuXHQvLyBFbnN1cmUgdGhhdCBpZiBHRVQgaXMgc3VwcG9ydGVkLCB0aGVuIEhFQUQgaXMgYXMgd2VsbCwgYW5kIHZpY2UtdmVyc2Fcblx0aWYgKCBzdXBwb3J0ZWRNZXRob2RzLmluZGV4T2YoICdnZXQnICkgIT09IC0xICYmIHN1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZiggJ2hlYWQnICkgPT09IC0xICkge1xuXHRcdHN1cHBvcnRlZE1ldGhvZHMucHVzaCggJ2hlYWQnICk7XG5cdH0gZWxzZSBpZiAoIHN1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZiggJ2hlYWQnICkgIT09IC0xICYmIHN1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZiggJ2dldCcgKSA9PT0gLTEgKSB7XG5cdFx0c3VwcG9ydGVkTWV0aG9kcy5wdXNoKCAnZ2V0JyApO1xuXHR9XG5cblx0Y29uc3QgZnVsbFJvdXRlID0gbmFtZXNwYWNlXG5cdFx0Ly8gUm91dGUgc2hvdWxkIGFsd2F5cyBoYXZlIHByZWNlZGluZyBzbGFzaFxuXHRcdC5yZXBsYWNlKCAvXltcXHMvXSovLCAnLycgKVxuXHRcdC8vIFJvdXRlIHNob3VsZCBhbHdheXMgYmUgam9pbmVkIHRvIG5hbWVzcGFjZSB3aXRoIGEgc2luZ2xlIHNsYXNoXG5cdFx0LnJlcGxhY2UoIC9bXFxzL10qJC8sICcvJyApICsgcmVzdEJhc2UucmVwbGFjZSggL15bXFxzL10qLywgJycgKTtcblxuXHRjb25zdCByb3V0ZU9iaiA9IHt9O1xuXHRyb3V0ZU9ialsgZnVsbFJvdXRlIF0gPSB7XG5cdFx0bmFtZXNwYWNlOiBuYW1lc3BhY2UsXG5cdFx0bWV0aG9kczogc3VwcG9ydGVkTWV0aG9kcyxcblx0fTtcblxuXHQvLyBHbyB0aHJvdWdoIHRoZSBzYW1lIHN0ZXBzIHVzZWQgdG8gYm9vdHN0cmFwIHRoZSBjbGllbnQgdG8gcGFyc2UgdGhlXG5cdC8vIHByb3ZpZGVkIHJvdXRlIG91dCBpbnRvIGEgaGFuZGxlciByZXF1ZXN0IG1ldGhvZFxuXHRjb25zdCByb3V0ZVRyZWUgPSBidWlsZFJvdXRlVHJlZSggcm91dGVPYmogKTtcblx0Ly8gUGFyc2UgdGhlIG1vY2sgcm91dGUgb2JqZWN0IGludG8gZW5kcG9pbnQgZmFjdG9yaWVzXG5cdGNvbnN0IGVuZHBvaW50RmFjdG9yaWVzID0gZ2VuZXJhdGVFbmRwb2ludEZhY3Rvcmllcyggcm91dGVUcmVlIClbIG5hbWVzcGFjZSBdO1xuXHRjb25zdCBFbmRwb2ludFJlcXVlc3QgPSBlbmRwb2ludEZhY3Rvcmllc1sgT2JqZWN0LmtleXMoIGVuZHBvaW50RmFjdG9yaWVzIClbIDAgXSBdLkN0b3I7XG5cblx0aWYgKCBvcHRpb25zICYmIG9wdGlvbnMucGFyYW1zICkge1xuXHRcdG9wdGlvbnMucGFyYW1zLmZvckVhY2goICggcGFyYW0gKSA9PiB7XG5cdFx0XHQvLyBPbmx5IGFjY2VwdCBzdHJpbmcgcGFyYW1ldGVyc1xuXHRcdFx0aWYgKCB0eXBlb2YgcGFyYW0gIT09ICdzdHJpbmcnICkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIElmIHRoZSBwYXJhbWV0ZXIgY2FuIGJlIG1hcHBlZCB0byBhIG1peGluLCBhcHBseSB0aGF0IG1peGluXG5cdFx0XHRpZiAoIHR5cGVvZiBtaXhpbnNbIHBhcmFtIF0gPT09ICdvYmplY3QnICkge1xuXHRcdFx0XHRPYmplY3Qua2V5cyggbWl4aW5zWyBwYXJhbSBdICkuZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cdFx0XHRcdFx0YXBwbHlNaXhpbiggRW5kcG9pbnRSZXF1ZXN0LnByb3RvdHlwZSwga2V5LCBtaXhpbnNbIHBhcmFtIF1bIGtleSBdICk7XG5cdFx0XHRcdH0gKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBBdHRlbXB0IHRvIGNyZWF0ZSBhIHNpbXBsZSBzZXR0ZXIgZm9yIGFueSBwYXJhbWV0ZXJzIGZvciB3aGljaFxuXHRcdFx0Ly8gd2UgZG8gbm90IGFscmVhZHkgaGF2ZSBhIGN1c3RvbSBtaXhpblxuXHRcdFx0YXBwbHlNaXhpbiggRW5kcG9pbnRSZXF1ZXN0LnByb3RvdHlwZSwgcGFyYW0sIHBhcmFtU2V0dGVyKCBwYXJhbSApICk7XG5cdFx0fSApO1xuXHR9XG5cblx0Ly8gU2V0IGFueSBleHBsaWNpdGx5LXByb3ZpZGVkIG9iamVjdCBtaXhpbnNcblx0aWYgKCBvcHRpb25zICYmIHR5cGVvZiBvcHRpb25zLm1peGlucyA9PT0gJ29iamVjdCcgKSB7XG5cblx0XHQvLyBTZXQgYW55IHNwZWNpZmllZCBtaXhpbiBmdW5jdGlvbnMgb24gdGhlIHJlc3BvbnNlXG5cdFx0T2JqZWN0LmtleXMoIG9wdGlvbnMubWl4aW5zICkuZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cdFx0XHRhcHBseU1peGluKCBFbmRwb2ludFJlcXVlc3QucHJvdG90eXBlLCBrZXksIG9wdGlvbnMubWl4aW5zWyBrZXkgXSApO1xuXHRcdH0gKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGVuZHBvaW50RmFjdG9yeSggb3B0aW9ucyA9IHt9ICkge1xuXHRcdHJldHVybiBuZXcgRW5kcG9pbnRSZXF1ZXN0KCB7XG5cdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0Li4uKCB0aGlzID8gdGhpcy5fb3B0aW9ucyA6IHt9ICksXG5cdFx0fSApO1xuXHR9XG5cdGVuZHBvaW50RmFjdG9yeS5DdG9yID0gRW5kcG9pbnRSZXF1ZXN0O1xuXG5cdHJldHVybiBlbmRwb2ludEZhY3Rvcnk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gcmVnaXN0ZXJSb3V0ZTtcbiIsIi8qKlxuICogQSBXUCBSRVNUIEFQSSBjbGllbnQgZm9yIE5vZGUuanNcbiAqXG4gKiBAZXhhbXBsZVxuICogICAgIHZhciB3cCA9IG5ldyBXUEFQSSh7IGVuZHBvaW50OiAnaHR0cDovL3NyYy53b3JkcHJlc3MtZGV2ZWxvcC5kZXYvd3AtanNvbicgfSk7XG4gKiAgICAgd3AucG9zdHMoKS50aGVuKGZ1bmN0aW9uKCBwb3N0cyApIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coIHBvc3RzICk7XG4gKiAgICAgfSkuY2F0Y2goZnVuY3Rpb24oIGVyciApIHtcbiAqICAgICAgICAgY29uc29sZS5lcnJvciggZXJyICk7XG4gKiAgICAgfSk7XG4gKlxuICogQGxpY2Vuc2UgTUlUXG4gfSlcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBvYmplY3RSZWR1Y2UgPSByZXF1aXJlKCAnLi9saWIvdXRpbC9vYmplY3QtcmVkdWNlJyApO1xuXG4vLyBUaGlzIEpTT04gZmlsZSBwcm92aWRlcyBlbm91Z2ggZGF0YSB0byBjcmVhdGUgaGFuZGxlciBtZXRob2RzIGZvciBhbGwgdmFsaWRcbi8vIEFQSSByb3V0ZXMgaW4gV29yZFByZXNzIDQuN1xuY29uc3QgZGVmYXVsdFJvdXRlcyA9IHJlcXVpcmUoICcuL2xpYi9kYXRhL2RlZmF1bHQtcm91dGVzLmpzb24nICk7XG5jb25zdCBidWlsZFJvdXRlVHJlZSA9IHJlcXVpcmUoICcuL2xpYi9yb3V0ZS10cmVlJyApLmJ1aWxkO1xuY29uc3QgZ2VuZXJhdGVFbmRwb2ludEZhY3RvcmllcyA9IHJlcXVpcmUoICcuL2xpYi9lbmRwb2ludC1mYWN0b3JpZXMnICkuZ2VuZXJhdGU7XG5cbi8vIFRoZSBkZWZhdWx0IGVuZHBvaW50IGZhY3RvcmllcyB3aWxsIGJlIGxhenktbG9hZGVkIGJ5IHBhcnNpbmcgdGhlIGRlZmF1bHRcbi8vIHJvdXRlIHRyZWUgZGF0YSBpZiBhIGRlZmF1bHQtbW9kZSBXUEFQSSBpbnN0YW5jZSBpcyBjcmVhdGVkIChpLmUuIG9uZSB0aGF0XG4vLyBpcyB0byBiZSBib290c3RyYXBwZWQgd2l0aCB0aGUgaGFuZGxlcnMgZm9yIGFsbCBvZiB0aGUgYnVpbHQtaW4gcm91dGVzKVxubGV0IGRlZmF1bHRFbmRwb2ludEZhY3RvcmllcztcblxuLy8gQ29uc3RhbnQgdXNlZCB0byBkZXRlY3QgZmlyc3QtcGFydHkgV29yZFByZXNzIFJFU1QgQVBJIHJvdXRlc1xuY29uc3QgYXBpRGVmYXVsdE5hbWVzcGFjZSA9ICd3cC92Mic7XG5cbi8vIFB1bGwgaW4gYXV0b2Rpc2NvdmVyeSBtZXRob2RzXG5jb25zdCBhdXRvZGlzY292ZXJ5ID0gcmVxdWlyZSggJy4vbGliL2F1dG9kaXNjb3ZlcnknICk7XG5cbi8vIFB1bGwgaW4gYmFzZSBtb2R1bGUgY29uc3RydWN0b3JzXG5jb25zdCBXUFJlcXVlc3QgPSByZXF1aXJlKCAnLi9saWIvY29uc3RydWN0b3JzL3dwLXJlcXVlc3QnICk7XG5cbi8vIFB1bGwgaW4gZGVmYXVsdCBIVFRQIHRyYW5zcG9ydFxuY29uc3QgaHR0cFRyYW5zcG9ydCA9IHJlcXVpcmUoICcuL2xpYi9odHRwLXRyYW5zcG9ydCcgKTtcblxuLyoqXG4gKiBDb25zdHJ1Y3QgYSBSRVNUIEFQSSBjbGllbnQgaW5zdGFuY2Ugb2JqZWN0IHRvIGNyZWF0ZVxuICpcbiAqIEBjb25zdHJ1Y3RvciBXUEFQSVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgICAgICAgICAgICAgQW4gb3B0aW9ucyBoYXNoIHRvIGNvbmZpZ3VyZSB0aGUgaW5zdGFuY2VcbiAqIEBwYXJhbSB7U3RyaW5nfSBvcHRpb25zLmVuZHBvaW50ICAgIFRoZSBVUkkgZm9yIGEgV1AtQVBJIGVuZHBvaW50XG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudXNlcm5hbWVdICBBIFdQLUFQSSBCYXNpYyBBdXRoIHVzZXJuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMucGFzc3dvcmRdICBBIFdQLUFQSSBCYXNpYyBBdXRoIHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMubm9uY2VdICAgICBBIFdQIG5vbmNlIGZvciB1c2Ugd2l0aCBjb29raWUgYXV0aGVudGljYXRpb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucy5yb3V0ZXNdICAgIEEgZGljdGlvbmFyeSBvZiBBUEkgcm91dGVzIHdpdGggd2hpY2ggdG9cbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvb3RzdHJhcCB0aGUgV1BBUEkgaW5zdGFuY2U6IHRoZSBpbnN0YW5jZSB3aWxsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBpbml0aWFsaXplZCB3aXRoIGRlZmF1bHQgcm91dGVzIG9ubHlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHRoaXMgcHJvcGVydHkgaXMgb21pdHRlZFxuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnRyYW5zcG9ydF0gQW4gb3B0aW9uYWwgZGljdGlvbmFyeSBvZiBIVFRQIHRyYW5zcG9ydFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kcyAoLmdldCwgLnBvc3QsIC5wdXQsIC5kZWxldGUsIC5oZWFkKVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gdXNlIGluc3RlYWQgb2YgdGhlIGRlZmF1bHRzLCBlLmcuIHRvIHVzZVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYSBkaWZmZXJlbnQgSFRUUCBsaWJyYXJ5IHRoYW4gc3VwZXJhZ2VudFxuICovXG5mdW5jdGlvbiBXUEFQSSggb3B0aW9ucyApIHtcblxuXHQvLyBFbmZvcmNlIGBuZXdgXG5cdGlmICggdGhpcyBpbnN0YW5jZW9mIFdQQVBJID09PSBmYWxzZSApIHtcblx0XHRyZXR1cm4gbmV3IFdQQVBJKCBvcHRpb25zICk7XG5cdH1cblxuXHRpZiAoIHR5cGVvZiBvcHRpb25zLmVuZHBvaW50ICE9PSAnc3RyaW5nJyApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoICdvcHRpb25zIGhhc2ggbXVzdCBjb250YWluIGFuIEFQSSBlbmRwb2ludCBVUkwgc3RyaW5nJyApO1xuXHR9XG5cblx0Ly8gRGljdGlvbmFyeSB0byBiZSBmaWxsZWQgYnkgaGFuZGxlcnMgZm9yIGRlZmF1bHQgbmFtZXNwYWNlc1xuXHR0aGlzLl9ucyA9IHt9O1xuXG5cdHRoaXMuX29wdGlvbnMgPSB7XG5cdFx0Ly8gRW5zdXJlIHRyYWlsaW5nIHNsYXNoIG9uIGVuZHBvaW50IFVSSVxuXHRcdGVuZHBvaW50OiBvcHRpb25zLmVuZHBvaW50LnJlcGxhY2UoICAvXFwvPyQvLCAnLycgKSxcblx0fTtcblxuXHQvLyBJZiBhbnkgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHMgd2VyZSBwcm92aWRlZCwgYXNzaWduIHRoZW0gbm93XG5cdGlmICggb3B0aW9ucyAmJiAoIG9wdGlvbnMudXNlcm5hbWUgfHwgb3B0aW9ucy5wYXNzd29yZCB8fCBvcHRpb25zLm5vbmNlICkgKSB7XG5cdFx0dGhpcy5hdXRoKCBvcHRpb25zICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpc1xuXHRcdC8vIENvbmZpZ3VyZSBjdXN0b20gSFRUUCB0cmFuc3BvcnQgbWV0aG9kcywgaWYgcHJvdmlkZWRcblx0XHQudHJhbnNwb3J0KCBvcHRpb25zLnRyYW5zcG9ydCApXG5cdFx0Ly8gQm9vdHN0cmFwIHdpdGggYSBzcGVjaWZpYyByb3V0ZXMgb2JqZWN0LCBpZiBwcm92aWRlZFxuXHRcdC5ib290c3RyYXAoIG9wdGlvbnMgJiYgb3B0aW9ucy5yb3V0ZXMgKTtcbn1cblxuLyoqXG4gKiBTZXQgY3VzdG9tIHRyYW5zcG9ydCBtZXRob2RzIHRvIHVzZSB3aGVuIG1ha2luZyBIVFRQIHJlcXVlc3RzIGFnYWluc3QgdGhlIEFQSVxuICpcbiAqIFBhc3MgYW4gb2JqZWN0IHdpdGggYSBmdW5jdGlvbiBmb3Igb25lIG9yIG1hbnkgb2YgXCJnZXRcIiwgXCJwb3N0XCIsIFwicHV0XCIsXG4gKiBcImRlbGV0ZVwiIGFuZCBcImhlYWRcIiBhbmQgdGhhdCBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIG1ha2luZyB0aGF0IHR5cGVcbiAqIG9mIHJlcXVlc3QuIFRoZSBwcm92aWRlZCB0cmFuc3BvcnQgZnVuY3Rpb25zIHNob3VsZCB0YWtlIGEgV1BSZXF1ZXN0IGhhbmRsZXJcbiAqIGluc3RhbmNlIChfZS5nLl8gdGhlIHJlc3VsdCBvZiBhIGB3cC5wb3N0cygpLi4uYCBjaGFpbiBvciBhbnkgb3RoZXIgY2hhaW5pbmdcbiAqIHJlcXVlc3QgaGFuZGxlcikgYXMgdGhlaXIgZmlyc3QgYXJndW1lbnQ7IGEgYGRhdGFgIG9iamVjdCBhcyB0aGVpciBzZWNvbmRcbiAqIGFyZ3VtZW50IChmb3IgUE9TVCwgUFVUIGFuZCBERUxFVEUgcmVxdWVzdHMpOyBhbmQgYW4gb3B0aW9uYWwgY2FsbGJhY2sgYXNcbiAqIHRoZWlyIGZpbmFsIGFyZ3VtZW50LiBUcmFuc3BvcnQgbWV0aG9kcyBzaG91bGQgaW52b2tlIHRoZSBjYWxsYmFjayB3aXRoIHRoZVxuICogcmVzcG9uc2UgZGF0YSAob3IgZXJyb3IsIGFzIGFwcHJvcHJpYXRlKSwgYW5kIHNob3VsZCBhbHNvIHJldHVybiBhIFByb21pc2UuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+c2hvd2luZyBob3cgYSBjYWNoZSBoaXQgKGtleWVkIGJ5IFVSSSkgY291bGQgc2hvcnQtY2lyY3VpdCBhIGdldCByZXF1ZXN0PC9jYXB0aW9uPlxuICpcbiAqICAgICB2YXIgc2l0ZSA9IG5ldyBXUEFQSSh7XG4gKiAgICAgICBlbmRwb2ludDogJ2h0dHA6Ly9teS1zaXRlLmNvbS93cC1qc29uJ1xuICogICAgIH0pO1xuICpcbiAqICAgICAvLyBPdmVyd3JpdGUgdGhlIEdFVCBiZWhhdmlvciB0byBpbmplY3QgYSBjYWNoaW5nIGxheWVyXG4gKiAgICAgc2l0ZS50cmFuc3BvcnQoe1xuICogICAgICAgZ2V0OiBmdW5jdGlvbiggd3ByZXEsIGNiICkge1xuICogICAgICAgICB2YXIgcmVzdWx0ID0gY2FjaGVbIHdwcmVxIF07XG4gKiAgICAgICAgIC8vIElmIGEgY2FjaGUgaGl0IGlzIGZvdW5kLCByZXR1cm4gaXQgdmlhIHRoZSBzYW1lIGNhbGxiYWNrL3Byb21pc2VcbiAqICAgICAgICAgLy8gc2lnbmF0dXJlIGFzIHRoZSBkZWZhdWx0IHRyYW5zcG9ydCBtZXRob2RcbiAqICAgICAgICAgaWYgKCByZXN1bHQgKSB7XG4gKiAgICAgICAgICAgaWYgKCBjYiAmJiB0eXBlb2YgY2IgPT09ICdmdW5jdGlvbicgKSB7XG4gKiAgICAgICAgICAgICBjYiggbnVsbCwgcmVzdWx0ICk7XG4gKiAgICAgICAgICAgfVxuICogICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoIHJlc3VsdCApO1xuICogICAgICAgICB9XG4gKlxuICogICAgICAgICAvLyBEZWxlZ2F0ZSB0byBkZWZhdWx0IHRyYW5zcG9ydCBpZiBubyBjYWNoZWQgZGF0YSB3YXMgZm91bmRcbiAqICAgICAgICAgcmV0dXJuIFdQQVBJLnRyYW5zcG9ydC5nZXQoIHdwcmVxLCBjYiApLnRoZW4oZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAqICAgICAgICAgICBjYWNoZVsgd3ByZXEgXSA9IHJlc3VsdDtcbiAqICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICogICAgICAgICB9KTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGlzIGlzIGFkdmFuY2VkIGJlaGF2aW9yOyB5b3Ugd2lsbCBvbmx5IG5lZWQgdG8gdXRpbGl6ZSB0aGlzIGZ1bmN0aW9uYWxpdHlcbiAqIGlmIHlvdXIgYXBwbGljYXRpb24gaGFzIHZlcnkgc3BlY2lmaWMgSFRUUCBoYW5kbGluZyBvciBjYWNoaW5nIHJlcXVpcmVtZW50cy5cbiAqIFJlZmVyIHRvIHRoZSBcImh0dHAtdHJhbnNwb3J0XCIgbW9kdWxlIHdpdGhpbiB0aGlzIGFwcGxpY2F0aW9uIGZvciB0aGUgY29kZVxuICogaW1wbGVtZW50aW5nIHRoZSBidWlsdC1pbiB0cmFuc3BvcnQgbWV0aG9kcy5cbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAbWV0aG9kIHRyYW5zcG9ydFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtPYmplY3R9ICAgdHJhbnNwb3J0ICAgICAgICAgIEEgZGljdGlvbmFyeSBvZiBIVFRQIHRyYW5zcG9ydCBtZXRob2RzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHJhbnNwb3J0LmdldF0gICAgVGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3IgR0VUIHJlcXVlc3RzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHJhbnNwb3J0LnBvc3RdICAgVGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3IgUE9TVCByZXF1ZXN0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RyYW5zcG9ydC5wdXRdICAgIFRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIFBVVCByZXF1ZXN0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RyYW5zcG9ydC5kZWxldGVdIFRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIERFTEVURSByZXF1ZXN0c1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW3RyYW5zcG9ydC5oZWFkXSAgIFRoZSBmdW5jdGlvbiB0byB1c2UgZm9yIEhFQUQgcmVxdWVzdHNcbiAqIEByZXR1cm5zIHtXUEFQSX0gVGhlIFdQQVBJIGluc3RhbmNlLCBmb3IgY2hhaW5pbmdcbiAqL1xuV1BBUEkucHJvdG90eXBlLnRyYW5zcG9ydCA9IGZ1bmN0aW9uKCB0cmFuc3BvcnQgKSB7XG5cdC8vIExvY2FsIHJlZmVyZW5jZSB0byBhdm9pZCBuZWVkIHRvIHJlZmVyZW5jZSB2aWEgYHRoaXNgIGluc2lkZSBmb3JFYWNoXG5cdGNvbnN0IF9vcHRpb25zID0gdGhpcy5fb3B0aW9ucztcblxuXHQvLyBDcmVhdGUgdGhlIGRlZmF1bHQgdHJhbnNwb3J0IGlmIGl0IGRvZXMgbm90IGV4aXN0XG5cdGlmICggISBfb3B0aW9ucy50cmFuc3BvcnQgKSB7XG5cdFx0X29wdGlvbnMudHJhbnNwb3J0ID0gT2JqZWN0LmNyZWF0ZSggV1BBUEkudHJhbnNwb3J0ICk7XG5cdH1cblxuXHQvLyBXaGl0ZWxpc3QgdGhlIG1ldGhvZHMgdGhhdCBtYXkgYmUgYXBwbGllZFxuXHRbICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdkZWxldGUnIF0uZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cdFx0aWYgKCB0cmFuc3BvcnQgJiYgdHJhbnNwb3J0WyBrZXkgXSApIHtcblx0XHRcdF9vcHRpb25zLnRyYW5zcG9ydFsga2V5IF0gPSB0cmFuc3BvcnRbIGtleSBdO1xuXHRcdH1cblx0fSApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEZWZhdWx0IEhUVFAgdHJhbnNwb3J0IG1ldGhvZHMgb2JqZWN0IGZvciBhbGwgV1BBUEkgaW5zdGFuY2VzXG4gKlxuICogVGhlc2UgbWV0aG9kcyBtYXkgYmUgZXh0ZW5kZWQgb3IgcmVwbGFjZWQgb24gYW4gaW5zdGFuY2UtYnktaW5zdGFuY2UgYmFzaXNcbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAc3RhdGljXG4gKiBAcHJvcGVydHkgdHJhbnNwb3J0XG4gKiBAdHlwZSB7T2JqZWN0fVxuICovXG5XUEFQSS50cmFuc3BvcnQgPSBPYmplY3QuY3JlYXRlKCBodHRwVHJhbnNwb3J0ICk7XG5PYmplY3QuZnJlZXplKCBXUEFQSS50cmFuc3BvcnQgKTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBtZXRob2QgZm9yIG1ha2luZyBhIG5ldyBXUEFQSSBpbnN0YW5jZVxuICpcbiAqIEBleGFtcGxlXG4gKiBUaGVzZSBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgICAgdmFyIHdwID0gbmV3IFdQQVBJKHsgZW5kcG9pbnQ6ICdodHRwOi8vbXkuYmxvZy51cmwvd3AtanNvbicgfSk7XG4gKiAgICAgdmFyIHdwID0gV1BBUEkuc2l0ZSggJ2h0dHA6Ly9teS5ibG9nLnVybC93cC1qc29uJyApO1xuICpcbiAqIGBXUEFQSS5zaXRlYCBjYW4gdGFrZSBhbiBvcHRpb25hbCBBUEkgcm9vdCByZXNwb25zZSBKU09OIG9iamVjdCB0byB1c2Ugd2hlblxuICogYm9vdHN0cmFwcGluZyB0aGUgY2xpZW50J3MgZW5kcG9pbnQgaGFuZGxlciBtZXRob2RzOiBpZiBubyBzZWNvbmQgcGFyYW1ldGVyXG4gKiBpcyBwcm92aWRlZCwgdGhlIGNsaWVudCBpbnN0YW5jZSBpcyBhc3N1bWVkIHRvIGJlIHVzaW5nIHRoZSBkZWZhdWx0IEFQSVxuICogd2l0aCBubyBhZGRpdGlvbmFsIHBsdWdpbnMgYW5kIGlzIGluaXRpYWxpemVkIHdpdGggaGFuZGxlcnMgZm9yIG9ubHkgdGhvc2VcbiAqIGRlZmF1bHQgQVBJIHJvdXRlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogVGhlc2UgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogICAgIC8vIHsuLi59IG1lYW5zIHRoZSBKU09OIG91dHB1dCBvZiBodHRwOi8vbXkuYmxvZy51cmwvd3AtanNvblxuICogICAgIHZhciB3cCA9IG5ldyBXUEFQSSh7XG4gKiAgICAgICBlbmRwb2ludDogJ2h0dHA6Ly9teS5ibG9nLnVybC93cC1qc29uJyxcbiAqICAgICAgIGpzb246IHsuLi59XG4gKiAgICAgfSk7XG4gKiAgICAgdmFyIHdwID0gV1BBUEkuc2l0ZSggJ2h0dHA6Ly9teS5ibG9nLnVybC93cC1qc29uJywgey4uLn0gKTtcbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge1N0cmluZ30gZW5kcG9pbnQgVGhlIFVSSSBmb3IgYSBXUC1BUEkgZW5kcG9pbnRcbiAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZXMgICBUaGUgXCJyb3V0ZXNcIiBvYmplY3QgZnJvbSB0aGUgSlNPTiBvYmplY3QgcmV0dXJuZWRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHRoZSByb290IEFQSSBlbmRwb2ludCBvZiBhIFdQIHNpdGUsIHdoaWNoIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGEgZGljdGlvbmFyeSBvZiByb3V0ZSBkZWZpbml0aW9uIG9iamVjdHMga2V5ZWQgYnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgcm91dGUncyByZWdleCBwYXR0ZXJuXG4gKiBAcmV0dXJucyB7V1BBUEl9IEEgbmV3IFdQQVBJIGluc3RhbmNlLCBib3VuZCB0byB0aGUgcHJvdmlkZWQgZW5kcG9pbnRcbiAqL1xuV1BBUEkuc2l0ZSA9IGZ1bmN0aW9uKCBlbmRwb2ludCwgcm91dGVzICkge1xuXHRyZXR1cm4gbmV3IFdQQVBJKCB7XG5cdFx0ZW5kcG9pbnQ6IGVuZHBvaW50LFxuXHRcdHJvdXRlczogcm91dGVzLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcmVxdWVzdCBhZ2FpbnN0IGEgY29tcGxldGVseSBhcmJpdHJhcnkgZW5kcG9pbnQsIHdpdGggbm8gYXNzdW1wdGlvbnMgYWJvdXRcbiAqIG9yIG11dGF0aW9uIG9mIHBhdGgsIGZpbHRlcmluZywgb3IgcXVlcnkgcGFyYW1ldGVycy4gVGhpcyByZXF1ZXN0IGlzIG5vdCByZXN0cmljdGVkIHRvXG4gKiB0aGUgZW5kcG9pbnQgc3BlY2lmaWVkIGR1cmluZyBXUEFQSSBvYmplY3QgaW5zdGFudGlhdGlvbi5cbiAqXG4gKiBAZXhhbXBsZVxuICogR2VuZXJhdGUgYSByZXF1ZXN0IHRvIHRoZSBleHBsaWNpdCBVUkwgXCJodHRwOi8veW91ci53ZWJzaXRlLmNvbS93cC1qc29uL3NvbWUvY3VzdG9tL3BhdGhcIlxuICpcbiAqICAgICB3cC51cmwoICdodHRwOi8veW91ci53ZWJzaXRlLmNvbS93cC1qc29uL3NvbWUvY3VzdG9tL3BhdGgnICkuZ2V0KCkuLi5cbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsIFRoZSBVUkwgdG8gcmVxdWVzdFxuICogQHJldHVybnMge1dQUmVxdWVzdH0gQSBXUFJlcXVlc3Qgb2JqZWN0IGJvdW5kIHRvIHRoZSBwcm92aWRlZCBVUkxcbiAqL1xuV1BBUEkucHJvdG90eXBlLnVybCA9IGZ1bmN0aW9uKCB1cmwgKSB7XG5cdHJldHVybiBuZXcgV1BSZXF1ZXN0KCB7XG5cdFx0Li4udGhpcy5fb3B0aW9ucyxcblx0XHRlbmRwb2ludDogdXJsLFxuXHR9ICk7XG59O1xuXG4vKipcbiAqIEdlbmVyYXRlIGEgcXVlcnkgYWdhaW5zdCBhbiBhcmJpdHJhcnkgcGF0aCBvbiB0aGUgY3VycmVudCBlbmRwb2ludC4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gKiByZXF1ZXN0aW5nIHJlc291cmNlcyBhdCBjdXN0b20gV1AtQVBJIGVuZHBvaW50cywgc3VjaCBhcyBXb29Db21tZXJjZSdzIGAvcHJvZHVjdHNgLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBwYXJhbSB7U3RyaW5nfSBbcmVsYXRpdmVQYXRoXSBBbiBlbmRwb2ludC1yZWxhdGl2ZSBwYXRoIHRvIHdoaWNoIHRvIGJpbmQgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IEEgcmVxdWVzdCBvYmplY3RcbiAqL1xuV1BBUEkucHJvdG90eXBlLnJvb3QgPSBmdW5jdGlvbiggcmVsYXRpdmVQYXRoICkge1xuXHRyZWxhdGl2ZVBhdGggPSByZWxhdGl2ZVBhdGggfHwgJyc7XG5cdGNvbnN0IG9wdGlvbnMgPSB7XG5cdFx0Li4udGhpcy5fb3B0aW9ucyxcblx0fTtcblx0Ly8gUmVxdWVzdCBzaG91bGQgYmVcblx0Y29uc3QgcmVxdWVzdCA9IG5ldyBXUFJlcXVlc3QoIG9wdGlvbnMgKTtcblxuXHQvLyBTZXQgdGhlIHBhdGggdGVtcGxhdGUgdG8gdGhlIHN0cmluZyBwYXNzZWQgaW5cblx0cmVxdWVzdC5fcGF0aCA9IHsgJzAnOiByZWxhdGl2ZVBhdGggfTtcblxuXHRyZXR1cm4gcmVxdWVzdDtcbn07XG5cbi8qKlxuICogU2V0IHRoZSBkZWZhdWx0IGhlYWRlcnMgdG8gdXNlIGZvciBhbGwgSFRUUCByZXF1ZXN0cyBjcmVhdGVkIGZyb20gdGhpcyBXUEFQSVxuICogc2l0ZSBpbnN0YW5jZS4gQWNjZXB0cyBhIGhlYWRlciBuYW1lIGFuZCBpdHMgYXNzb2NpYXRlZCB2YWx1ZSBhcyB0d28gc3RyaW5ncyxcbiAqIG9yIG11bHRpcGxlIGhlYWRlcnMgYXMgYW4gb2JqZWN0IG9mIG5hbWUtdmFsdWUgcGFpcnMuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0IGEgc2luZ2xlIGhlYWRlciB0byBiZSB1c2VkIGJ5IGFsbCByZXF1ZXN0cyB0byB0aGlzIHNpdGU8L2NhcHRpb24+XG4gKlxuICogICAgIHNpdGUuc2V0SGVhZGVycyggJ0F1dGhvcml6YXRpb24nLCAnQmVhcmVyIHRydXN0bWUnICkuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXQgbXVsdGlwbGUgaGVhZGVycyB0byBiZSB1c2VkIGJ5IGFsbCByZXF1ZXN0cyB0byB0aGlzIHNpdGU8L2NhcHRpb24+XG4gKlxuICogICAgIHNpdGUuc2V0SGVhZGVycyh7XG4gKiAgICAgICBBdXRob3JpemF0aW9uOiAnQmVhcmVyIGNvbWVvbndlcmVvbGRmcmllbmRzcmlnaHQnLFxuICogICAgICAgJ0FjY2VwdC1MYW5ndWFnZSc6ICdlbi1DQSdcbiAqICAgICB9KS4uLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBzaW5jZSAxLjEuMFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBoZWFkZXJzIFRoZSBuYW1lIG9mIHRoZSBoZWFkZXIgdG8gc2V0LCBvciBhbiBvYmplY3Qgb2ZcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIgbmFtZXMgYW5kIHRoZWlyIGFzc29jaWF0ZWQgc3RyaW5nIHZhbHVlc1xuICogQHBhcmFtIHtTdHJpbmd9ICAgICAgICBbdmFsdWVdIFRoZSB2YWx1ZSBvZiB0aGUgaGVhZGVyIGJlaW5nIHNldFxuICogQHJldHVybnMge1dQQVBJfSBUaGUgV1BBUEkgc2l0ZSBoYW5kbGVyIGluc3RhbmNlLCBmb3IgY2hhaW5pbmdcbiAqL1xuV1BBUEkucHJvdG90eXBlLnNldEhlYWRlcnMgPSBXUFJlcXVlc3QucHJvdG90eXBlLnNldEhlYWRlcnM7XG5cbi8qKlxuICogU2V0IHRoZSBhdXRoZW50aWNhdGlvbiB0byB1c2UgZm9yIGEgV1BBUEkgc2l0ZSBoYW5kbGVyIGluc3RhbmNlLiBBY2NlcHRzIGJhc2ljXG4gKiBIVFRQIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIChzdHJpbmcgdXNlcm5hbWUgJiBwYXNzd29yZCkgb3IgYSBOb25jZSAoZm9yXG4gKiBjb29raWUgYXV0aGVudGljYXRpb24pIGJ5IGRlZmF1bHQ7IG1heSBiZSBvdmVybG9hZGVkIHRvIGFjY2VwdCBPQXV0aCBjcmVkZW50aWFsc1xuICogaW4gdGhlIGZ1dHVyZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5CYXNpYyBBdXRoZW50aWNhdGlvbjwvY2FwdGlvbj5cbiAqXG4gKiAgICAgc2l0ZS5hdXRoKHtcbiAqICAgICAgIHVzZXJuYW1lOiAnYWRtaW4nLFxuICogICAgICAgcGFzc3dvcmQ6ICdzZWN1cmVwYXNzNTUnXG4gKiAgICAgfSkuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Db29raWUvTm9uY2UgQXV0aGVudGljYXRpb248L2NhcHRpb24+XG4gKlxuICogICAgIHNpdGUuYXV0aCh7XG4gKiAgICAgICBub25jZTogJ3NvbWVub25jZSdcbiAqICAgICB9KS4uLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBjcmVkZW50aWFscyAgICAgICAgICAgIEFuIGF1dGhlbnRpY2F0aW9uIGNyZWRlbnRpYWxzIG9iamVjdFxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy51c2VybmFtZV0gQSBXUC1BUEkgQmFzaWMgSFRUUCBBdXRoZW50aWNhdGlvbiB1c2VybmFtZVxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy5wYXNzd29yZF0gQSBXUC1BUEkgQmFzaWMgSFRUUCBBdXRoZW50aWNhdGlvbiBwYXNzd29yZFxuICogQHBhcmFtIHtTdHJpbmd9IFtjcmVkZW50aWFscy5ub25jZV0gICAgQSBXUCBub25jZSBmb3IgdXNlIHdpdGggY29va2llIGF1dGhlbnRpY2F0aW9uXG4gKiBAcmV0dXJucyB7V1BBUEl9IFRoZSBXUEFQSSBzaXRlIGhhbmRsZXIgaW5zdGFuY2UsIGZvciBjaGFpbmluZ1xuICovXG5XUEFQSS5wcm90b3R5cGUuYXV0aCA9IFdQUmVxdWVzdC5wcm90b3R5cGUuYXV0aDtcblxuLy8gQXBwbHkgdGhlIHJlZ2lzdGVyUm91dGUgbWV0aG9kIHRvIHRoZSBwcm90b3R5cGVcbldQQVBJLnByb3RvdHlwZS5yZWdpc3RlclJvdXRlID0gcmVxdWlyZSggJy4vbGliL3dwLXJlZ2lzdGVyLXJvdXRlJyApO1xuXG4vKipcbiAqIERlZHVjZSByZXF1ZXN0IG1ldGhvZHMgZnJvbSBhIHByb3ZpZGVkIEFQSSByb290IEpTT04gcmVzcG9uc2Ugb2JqZWN0J3NcbiAqIHJvdXRlcyBkaWN0aW9uYXJ5LCBhbmQgYXNzaWduIHRob3NlIG1ldGhvZHMgdG8gdGhlIGN1cnJlbnQgaW5zdGFuY2UuIElmXG4gKiBubyByb3V0ZXMgZGljdGlvbmFyeSBpcyBwcm92aWRlZCB0aGVuIHRoZSBpbnN0YW5jZSB3aWxsIGJlIGJvb3RzdHJhcHBlZFxuICogd2l0aCByb3V0ZSBoYW5kbGVycyBmb3IgdGhlIGRlZmF1bHQgQVBJIGVuZHBvaW50cyBvbmx5LlxuICpcbiAqIFRoaXMgbWV0aG9kIGlzIGNhbGxlZCBhdXRvbWF0aWNhbGx5IGR1cmluZyBXUEFQSSBpbnN0YW5jZSBjcmVhdGlvbi5cbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge09iamVjdH0gcm91dGVzIFRoZSBcInJvdXRlc1wiIG9iamVjdCBmcm9tIHRoZSBKU09OIG9iamVjdCByZXR1cm5lZFxuICogICAgICAgICAgICAgICAgICAgICAgICBmcm9tIHRoZSByb290IEFQSSBlbmRwb2ludCBvZiBhIFdQIHNpdGUsIHdoaWNoIHNob3VsZFxuICogICAgICAgICAgICAgICAgICAgICAgICBiZSBhIGRpY3Rpb25hcnkgb2Ygcm91dGUgZGVmaW5pdGlvbiBvYmplY3RzIGtleWVkIGJ5XG4gKiAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByb3V0ZSdzIHJlZ2V4IHBhdHRlcm5cbiAqIEByZXR1cm5zIHtXUEFQSX0gVGhlIGJvb3RzdHJhcHBlZCBXUEFQSSBjbGllbnQgaW5zdGFuY2UgKGZvciBjaGFpbmluZyBvciBhc3NpZ25tZW50KVxuICovXG5XUEFQSS5wcm90b3R5cGUuYm9vdHN0cmFwID0gZnVuY3Rpb24oIHJvdXRlcyApIHtcblx0bGV0IHJvdXRlc0J5TmFtZXNwYWNlO1xuXHRsZXQgZW5kcG9pbnRGYWN0b3JpZXNCeU5hbWVzcGFjZTtcblxuXHRpZiAoICEgcm91dGVzICkge1xuXHRcdC8vIEF1dG8tZ2VuZXJhdGUgZGVmYXVsdCBlbmRwb2ludCBmYWN0b3JpZXMgaWYgdGhleSBhcmUgbm90IGFscmVhZHkgYXZhaWxhYmxlXG5cdFx0aWYgKCAhIGRlZmF1bHRFbmRwb2ludEZhY3RvcmllcyApIHtcblx0XHRcdHJvdXRlc0J5TmFtZXNwYWNlID0gYnVpbGRSb3V0ZVRyZWUoIGRlZmF1bHRSb3V0ZXMgKTtcblx0XHRcdGRlZmF1bHRFbmRwb2ludEZhY3RvcmllcyA9IGdlbmVyYXRlRW5kcG9pbnRGYWN0b3JpZXMoIHJvdXRlc0J5TmFtZXNwYWNlICk7XG5cdFx0fVxuXHRcdGVuZHBvaW50RmFjdG9yaWVzQnlOYW1lc3BhY2UgPSBkZWZhdWx0RW5kcG9pbnRGYWN0b3JpZXM7XG5cdH0gZWxzZSB7XG5cdFx0cm91dGVzQnlOYW1lc3BhY2UgPSBidWlsZFJvdXRlVHJlZSggcm91dGVzICk7XG5cdFx0ZW5kcG9pbnRGYWN0b3JpZXNCeU5hbWVzcGFjZSA9IGdlbmVyYXRlRW5kcG9pbnRGYWN0b3JpZXMoIHJvdXRlc0J5TmFtZXNwYWNlICk7XG5cdH1cblxuXHQvLyBGb3IgZWFjaCBuYW1lc3BhY2UgZm9yIHdoaWNoIHJvdXRlcyB3ZXJlIGlkZW50aWZpZWQsIHN0b3JlIHRoZSBnZW5lcmF0ZWRcblx0Ly8gcm91dGUgaGFuZGxlcnMgb24gdGhlIFdQQVBJIGluc3RhbmNlJ3MgcHJpdmF0ZSBfbnMgZGljdGlvbmFyeS4gVGhlc2UgbmFtZXNwYWNlZFxuXHQvLyBoYW5kbGVyIG1ldGhvZHMgY2FuIGJlIGFjY2Vzc2VkIGJ5IGNhbGxpbmcgYC5uYW1lc3BhY2UoIHN0ciApYCBvbiB0aGVcblx0Ly8gY2xpZW50IGluc3RhbmNlIGFuZCBwYXNzaW5nIGEgcmVnaXN0ZXJlZCBuYW1lc3BhY2Ugc3RyaW5nLlxuXHQvLyBIYW5kbGVycyBmb3IgZGVmYXVsdCAod3AvdjIpIHJvdXRlcyB3aWxsIGFsc28gYmUgYXNzaWduZWQgdG8gdGhlIFdQQVBJXG5cdC8vIGNsaWVudCBpbnN0YW5jZSBvYmplY3QgaXRzZWxmLCBmb3IgYnJldml0eS5cblx0cmV0dXJuIG9iamVjdFJlZHVjZSggZW5kcG9pbnRGYWN0b3JpZXNCeU5hbWVzcGFjZSwgKCB3cEluc3RhbmNlLCBlbmRwb2ludEZhY3RvcmllcywgbmFtZXNwYWNlICkgPT4ge1xuXG5cdFx0Ly8gU2V0IChvciBhdWdtZW50KSB0aGUgcm91dGUgaGFuZGxlciBmYWN0b3JpZXMgZm9yIHRoaXMgbmFtZXNwYWNlLlxuXHRcdHdwSW5zdGFuY2UuX25zWyBuYW1lc3BhY2UgXSA9IG9iamVjdFJlZHVjZShcblx0XHRcdGVuZHBvaW50RmFjdG9yaWVzLFxuXHRcdFx0KCBuc0hhbmRsZXJzLCBoYW5kbGVyRm4sIG1ldGhvZE5hbWUgKSA9PiB7XG5cdFx0XHRcdG5zSGFuZGxlcnNbIG1ldGhvZE5hbWUgXSA9IGhhbmRsZXJGbjtcblx0XHRcdFx0cmV0dXJuIG5zSGFuZGxlcnM7XG5cdFx0XHR9LFxuXHRcdFx0d3BJbnN0YW5jZS5fbnNbIG5hbWVzcGFjZSBdIHx8IHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGFsbCBuYW1lc3BhY2UgZGljdGlvbmFyaWVzIHdpdGggYSBkaXJlY3QgcmVmZXJlbmNlIHRvIHRoZSBtYWluIFdQQVBJXG5cdFx0XHRcdC8vIGluc3RhbmNlJ3MgX29wdGlvbnMgcHJvcGVydHkgc28gdGhhdCB0aGluZ3MgbGlrZSBhdXRoIHByb3BhZ2F0ZSBwcm9wZXJseVxuXHRcdFx0XHRfb3B0aW9uczogd3BJbnN0YW5jZS5fb3B0aW9ucyxcblx0XHRcdH1cblx0XHQpO1xuXG5cdFx0Ly8gRm9yIHRoZSBkZWZhdWx0IG5hbWVzcGFjZSwgZS5nLiBcIndwL3YyXCIgYXQgdGhlIHRpbWUgdGhpcyBjb21tZW50IHdhc1xuXHRcdC8vIHdyaXR0ZW4sIGVuc3VyZSBhbGwgbWV0aG9kcyBhcmUgYXNzaWduZWQgdG8gdGhlIHJvb3QgY2xpZW50IG9iamVjdCBpdHNlbGZcblx0XHQvLyBpbiBhZGRpdGlvbiB0byB0aGUgcHJpdmF0ZSBfbnMgZGljdGlvbmFyeTogdGhpcyBpcyBkb25lIHNvIHRoYXQgdGhlc2Vcblx0XHQvLyBtZXRob2RzIGNhbiBiZSBjYWxsZWQgd2l0aCBlLmcuIGB3cC5wb3N0cygpYCBhbmQgbm90IHRoZSBtb3JlIHZlcmJvc2Vcblx0XHQvLyBgd3AubmFtZXNwYWNlKCAnd3AvdjInICkucG9zdHMoKWAuXG5cdFx0aWYgKCBuYW1lc3BhY2UgPT09IGFwaURlZmF1bHROYW1lc3BhY2UgKSB7XG5cdFx0XHRPYmplY3Qua2V5cyggd3BJbnN0YW5jZS5fbnNbIG5hbWVzcGFjZSBdICkuZm9yRWFjaCggKCBtZXRob2ROYW1lICkgPT4ge1xuXHRcdFx0XHR3cEluc3RhbmNlWyBtZXRob2ROYW1lIF0gPSB3cEluc3RhbmNlLl9uc1sgbmFtZXNwYWNlIF1bIG1ldGhvZE5hbWUgXTtcblx0XHRcdH0gKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gd3BJbnN0YW5jZTtcblx0fSwgdGhpcyApO1xufTtcblxuLyoqXG4gKiBBY2Nlc3MgQVBJIGVuZHBvaW50IGhhbmRsZXJzIGZyb20gYSBwYXJ0aWN1bGFyIEFQSSBuYW1lc3BhY2Ugb2JqZWN0XG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgd3AubmFtZXNwYWNlKCAnbXlwbHVnaW4vdjEnICkuYXV0aG9yKCkuLi5cbiAqXG4gKiAgICAgLy8gRGVmYXVsdCBXUCBlbmRwb2ludCBoYW5kbGVycyBhcmUgYXNzaWduZWQgdG8gdGhlIHdwIGluc3RhbmNlIGl0c2VsZi5cbiAqICAgICAvLyBUaGVzZSBhcmUgZXF1aXZhbGVudDpcbiAqICAgICB3cC5uYW1lc3BhY2UoICd3cC92MicgKS5wb3N0cygpLi4uXG4gKiAgICAgd3AucG9zdHMoKS4uLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lc3BhY2UgQSBuYW1lc3BhY2Ugc3RyaW5nXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3Qgb2Ygcm91dGUgZW5kcG9pbnQgaGFuZGxlciBtZXRob2RzIGZvciB0aGVcbiAqIHJvdXRlcyB3aXRoaW4gdGhlIHNwZWNpZmllZCBuYW1lc3BhY2VcbiAqL1xuV1BBUEkucHJvdG90eXBlLm5hbWVzcGFjZSA9IGZ1bmN0aW9uKCBuYW1lc3BhY2UgKSB7XG5cdGlmICggISB0aGlzLl9uc1sgbmFtZXNwYWNlIF0gKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCAnRXJyb3I6IG5hbWVzcGFjZSAnICsgbmFtZXNwYWNlICsgJyBpcyBub3QgcmVjb2duaXplZCcgKTtcblx0fVxuXHRyZXR1cm4gdGhpcy5fbnNbIG5hbWVzcGFjZSBdO1xufTtcblxuLyoqXG4gKiBUYWtlIGFuIGFyYml0cmFyeSBXb3JkUHJlc3Mgc2l0ZSwgZGVkdWNlIHRoZSBXUCBSRVNUIEFQSSByb290IGVuZHBvaW50LCBxdWVyeVxuICogdGhhdCBlbmRwb2ludCwgYW5kIHBhcnNlIHRoZSByZXNwb25zZSBKU09OLiBVc2UgdGhlIHJldHVybmVkIEpTT04gcmVzcG9uc2VcbiAqIHRvIGluc3RhbnRpYXRlIGEgV1BBUEkgaW5zdGFuY2UgYm91bmQgdG8gdGhlIHByb3ZpZGVkIHNpdGUuXG4gKlxuICogQG1lbWJlcm9mISBXUEFQSVxuICogQHN0YXRpY1xuICogQHBhcmFtIHtzdHJpbmd9IHVybCBBIFVSTCB3aXRoaW4gYSBSRVNUIEFQSS1lbmFibGVkIFdvcmRQcmVzcyB3ZWJzaXRlXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgdG8gYSBjb25maWd1cmVkIFdQQVBJIGluc3RhbmNlIGJvdW5kXG4gKiB0byB0aGUgZGVkdWNlZCBlbmRwb2ludCwgb3IgcmVqZWN0ZWQgaWYgYW4gZW5kcG9pbnQgaXMgbm90IGZvdW5kIG9yIHRoZVxuICogbGlicmFyeSBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHByb3ZpZGVkIGVuZHBvaW50LlxuICovXG5XUEFQSS5kaXNjb3ZlciA9ICggdXJsICkgPT4ge1xuXHQvLyBsb2NhbCBwbGFjZWhvbGRlciBmb3IgQVBJIHJvb3QgVVJMXG5cdGxldCBlbmRwb2ludDtcblxuXHQvLyBUcnkgSEVBRCByZXF1ZXN0IGZpcnN0LCBmb3Igc21hbGxlciBwYXlsb2FkOiB1c2UgV1BBUEkuc2l0ZSB0byBwcm9kdWNlXG5cdC8vIGEgcmVxdWVzdCB0aGF0IHV0aWxpemVzIHRoZSBkZWZpbmVkIEhUVFAgdHJhbnNwb3J0c1xuXHRjb25zdCByZXEgPSBXUEFQSS5zaXRlKCB1cmwgKS5yb290KCk7XG5cdHJldHVybiByZXEuaGVhZGVycygpXG5cdFx0LmNhdGNoKCAoKSA9PiB7XG5cdFx0XHQvLyBPbiB0aGUgaHlwb3RoZXNpcyB0aGF0IGFueSBlcnJvciBoZXJlIGlzIHJlbGF0ZWQgdG8gdGhlIEhFQUQgcmVxdWVzdFxuXHRcdFx0Ly8gZmFpbGluZywgcHJvdmlzaW9uYWxseSB0cnkgYWdhaW4gdXNpbmcgR0VUIGJlY2F1c2UgdGhhdCBtZXRob2QgaXNcblx0XHRcdC8vIG1vcmUgd2lkZWx5IHN1cHBvcnRlZFxuXHRcdFx0cmV0dXJuIHJlcS5nZXQoKTtcblx0XHR9IClcblx0XHQvLyBJbnNwZWN0IHJlc3BvbnNlIHRvIGZpbmQgQVBJIGxvY2F0aW9uIGhlYWRlclxuXHRcdC50aGVuKCBhdXRvZGlzY292ZXJ5LmxvY2F0ZUFQSVJvb3RIZWFkZXIgKVxuXHRcdC50aGVuKCAoIGFwaVJvb3RVUkwgKSA9PiB7XG5cdFx0XHQvLyBTZXQgdGhlIGZ1bmN0aW9uLXNjb3BlIHZhcmlhYmxlIHRoYXQgd2lsbCBiZSB1c2VkIHRvIGluc3RhbnRpYXRlXG5cdFx0XHQvLyB0aGUgYm91bmQgV1BBUEkgaW5zdGFuY2UsXG5cdFx0XHRlbmRwb2ludCA9IGFwaVJvb3RVUkw7XG5cblx0XHRcdC8vIHRoZW4gR0VUIHRoZSBBUEkgcm9vdCBKU09OIG9iamVjdFxuXHRcdFx0cmV0dXJuIFdQQVBJLnNpdGUoIGFwaVJvb3RVUkwgKS5yb290KCkuZ2V0KCk7XG5cdFx0fSApXG5cdFx0LnRoZW4oICggYXBpUm9vdEpTT04gKSA9PiB7XG5cdFx0XHQvLyBJbnN0YW50aWF0ZSAmIGJvb3RzdHJhcCB3aXRoIHRoZSBkaXNjb3ZlcmVkIG1ldGhvZHNcblx0XHRcdHJldHVybiBuZXcgV1BBUEkoIHtcblx0XHRcdFx0ZW5kcG9pbnQ6IGVuZHBvaW50LFxuXHRcdFx0XHRyb3V0ZXM6IGFwaVJvb3RKU09OLnJvdXRlcyxcblx0XHRcdH0gKTtcblx0XHR9IClcblx0XHQuY2F0Y2goICggZXJyICkgPT4ge1xuXHRcdFx0LyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXHRcdFx0Y29uc29sZS5lcnJvciggZXJyICk7XG5cdFx0XHRpZiAoIGVuZHBvaW50ICkge1xuXHRcdFx0XHRjb25zb2xlLndhcm4oICdFbmRwb2ludCBkZXRlY3RlZCwgcHJvY2VlZGluZyBkZXNwaXRlIGVycm9yLi4uJyApO1xuXHRcdFx0XHRjb25zb2xlLndhcm4oICdCaW5kaW5nIHRvICcgKyBlbmRwb2ludCArICcgYW5kIGFzc3VtaW5nIGRlZmF1bHQgcm91dGVzJyApO1xuXHRcdFx0XHRyZXR1cm4gbmV3IFdQQVBJLnNpdGUoIGVuZHBvaW50ICk7XG5cdFx0XHR9XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoICdBdXRvZGlzY292ZXJ5IGZhaWxlZCcgKTtcblx0XHR9ICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFdQQVBJO1xuIiwiaW1wb3J0IHsgaW5pdEluZmluaXRlU2Nyb2xsaW5nIH0gZnJvbSAnLi9pbmZpbml0ZS1zY3JvbGxpbmcnXG5cbmluaXRJbmZpbml0ZVNjcm9sbGluZygndGVhc2UnKVxuIiwiaW1wb3J0IHdwIGZyb20gJy4vd3AnXG5pbXBvcnQgeyB0b09iamVjdCwgdGFwLCByZW1vdmVFbGVtZW50LCBnZXRWYWx1ZSB9IGZyb20gJy4vdXRpbCdcblxuY29uc3QgRUxFTUVOVF9JRFMgPSBbJ3RlbXBsYXRlJywgJ3NlbnRpbmVsJywgJ2NvbnRhaW5lciddXG5jb25zdCBpc0ludGVyc2VjdGluZyA9ICh7IGlzSW50ZXJzZWN0aW5nIH0pID0+IGlzSW50ZXJzZWN0aW5nXG5cbmV4cG9ydCBjbGFzcyBJbmZpbml0ZVNjcm9sbGluZyB7XG4gIGNvbnN0cnVjdG9yICh7IHRlbXBsYXRlLCBzZW50aW5lbCwgY29udGFpbmVyIH0pIHtcbiAgICBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBpZiAoZW50cmllcy5zb21lKGlzSW50ZXJzZWN0aW5nKSkge1xuICAgICAgICB0aGlzLmxvYWRQb3N0cygpXG4gICAgICB9XG4gICAgfSkub2JzZXJ2ZShzZW50aW5lbClcblxuICAgIHRoaXMudGVtcGxhdGUgPSB0ZW1wbGF0ZVxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyXG4gICAgdGhpcy5wYWdlU2l6ZSA9IGNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGhcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMVxuICAgIHRoaXMudG90YWxQYWdlcyA9IEluZmluaXR5XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgcG9wdWxhdGVDYXRlZ29yaWVzICh0ZWFzZSwgcG9zdCkge1xuICAgIGNvbnN0IGNhdGVnb3JpZXMgPSB0ZWFzZS5xdWVyeVNlbGVjdG9yKCcuanMtdGVhc2UtY2F0ZWdvcmllcycpXG5cbiAgICBpZiAoIWNhdGVnb3JpZXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGNvbnN0IHRlcm0gPSBnZXRWYWx1ZShcbiAgICAgICdfZW1iZWRkZWQnLFxuICAgICAgJ3dwOnRlcm0nLFxuICAgICAgMFxuICAgICkocG9zdClcblxuICAgIGlmICghdGVybSkge1xuICAgICAgcmV0dXJuIHJlbW92ZUVsZW1lbnQoY2F0ZWdvcmllcylcbiAgICB9XG5cbiAgICB0ZXJtLm1hcCgoeyBuYW1lLCBsaW5rIH0pID0+IE9iamVjdC5hc3NpZ24oXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyksXG4gICAgICB7IHRleHRDb250ZW50OiBuYW1lLCBocmVmOiBsaW5rIH1cbiAgICApKS5mb3JFYWNoKGxpbmsgPT4gY2F0ZWdvcmllcy5hcHBlbmRDaGlsZChsaW5rKSlcbiAgfVxuXG4gIHNldFRodW1ibmFpbCAodGVhc2UsIHBvc3QpIHtcbiAgICBjb25zdCB0aHVtYm5haWwgPSB0ZWFzZS5xdWVyeVNlbGVjdG9yKCcuanMtdGVhc2UtdGh1bWJuYWlsJylcblxuICAgIGNvbnN0IGZlYXR1cmVkID0gZ2V0VmFsdWUoXG4gICAgICAnX2VtYmVkZGVkJyxcbiAgICAgICd3cDpmZWF0dXJlZG1lZGlhJyxcbiAgICAgIDAsXG4gICAgICAnbWVkaWFfZGV0YWlscycsXG4gICAgICAnc2l6ZXMnLFxuICAgICAgJ3RodW1ibmFpbCcsXG4gICAgICAnc291cmNlX3VybCdcbiAgICApKHBvc3QpXG5cbiAgICBpZiAoIWZlYXR1cmVkKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlRWxlbWVudCh0aHVtYm5haWwpXG4gICAgfVxuXG4gICAgdGh1bWJuYWlsLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IGZlYXR1cmVkXG4gIH1cblxuICBhcHBlbmRQb3N0IChwb3N0KSB7XG4gICAgY29uc3QgdGVhc2UgPSBkb2N1bWVudC5pbXBvcnROb2RlKHRoaXMudGVtcGxhdGUsIHRydWUpLmNvbnRlbnRcbiAgICBjb25zdCBpdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKVxuXG4gICAgdGhpcy5wb3B1bGF0ZUNhdGVnb3JpZXModGVhc2UsIHBvc3QpXG4gICAgdGhpcy5zZXRUaHVtYm5haWwodGVhc2UsIHBvc3QpXG5cbiAgICB0ZWFzZS5xdWVyeVNlbGVjdG9yKCcuanMtdGVhc2UtdGl0bGUnKS50ZXh0Q29udGVudCA9IHBvc3QudGl0bGUucmVuZGVyZWRcbiAgICB0ZWFzZS5xdWVyeVNlbGVjdG9yKCcuanMtdGVhc2UtZXhjZXJwdCcpLmlubmVySFRNTCA9IHBvc3QuZXhjZXJwdC5yZW5kZXJlZFxuXG4gICAgaXRlbS5hcHBlbmRDaGlsZCh0ZWFzZSlcbiAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChpdGVtKVxuICB9XG5cbiAgbG9hZFBvc3RzICgpIHtcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcgfHwgdGhpcy5jdXJyZW50UGFnZSA+PSB0aGlzLnRvdGFsUGFnZXMpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIHRoaXMuaXNMb2FkaW5nID0gdHJ1ZVxuICAgIHRoaXMuY3VycmVudFBhZ2UrK1xuXG4gICAgd3BcbiAgICAgIC5wb3N0cygpXG4gICAgICAucGVyUGFnZSh0aGlzLnBhZ2VTaXplKVxuICAgICAgLnBhZ2UodGhpcy5jdXJyZW50UGFnZSlcbiAgICAgIC5lbWJlZCgpXG4gICAgICAudGhlbih0YXAoKHsgX3BhZ2luZyB9KSA9PiB7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IF9wYWdpbmcudG90YWxQYWdlc1xuICAgICAgfSkpXG4gICAgICAudGhlbihwb3N0cyA9PiBwb3N0cy5mb3JFYWNoKHBvc3QgPT4gdGhpcy5hcHBlbmRQb3N0KHBvc3QpKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICAgICAgfSlcbiAgfVxufVxuXG5leHBvcnQgY29uc3QgaW5pdEluZmluaXRlU2Nyb2xsaW5nID0gcHJlZml4ID0+IHtcbiAgY29uc3QgZWxlbWVudHMgPSBFTEVNRU5UX0lEUy5yZWR1Y2UoKHJlc3VsdCwgY3VycmVudCkgPT4gT2JqZWN0LmFzc2lnbihyZXN1bHQsIHtcbiAgICAuLi50b09iamVjdChjdXJyZW50LCBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChgJHtwcmVmaXh9LSR7Y3VycmVudH1gKSlcbiAgfSksIHt9KVxuXG4gIHJldHVybiAoXG4gICAgT2JqZWN0LmtleXMoZWxlbWVudHMpLmxlbmd0aCA9PT0gRUxFTUVOVF9JRFMubGVuZ3RoXG4gICkgJiYgbmV3IEluZmluaXRlU2Nyb2xsaW5nKGVsZW1lbnRzKVxufVxuIiwiZXhwb3J0IGNvbnN0IHRvT2JqZWN0ID0gKHByb3AsIHZhbHVlKSA9PiB2YWx1ZSAmJiB7IFtwcm9wXTogdmFsdWUgfVxuXG5leHBvcnQgY29uc3QgdGFwID0gY2FsbGJhY2sgPT4gdmFsdWUgPT4ge1xuICBjYWxsYmFjayh2YWx1ZSlcbiAgcmV0dXJuIHZhbHVlXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbGVtZW50ID0gZWxlbWVudCA9PiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKC4uLnBhdGgpID0+IG9iamVjdCA9PiBwYXRoLnJlZHVjZSgocmVzdWx0LCBwcm9wKSA9PiB7XG4gIHJldHVybiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyA/IHJlc3VsdFtwcm9wXSA6IHVuZGVmaW5lZFxufSwgb2JqZWN0KVxuIiwiaW1wb3J0IFdQQVBJIGZyb20gJ3dwYXBpJ1xuZXhwb3J0IGRlZmF1bHQgbmV3IFdQQVBJKHsgZW5kcG9pbnQ6ICcvd3AtanNvbicgfSlcbiJdLCJzb3VyY2VSb290IjoiIn0=