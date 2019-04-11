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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/infinite-scrolling.js");
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

/***/ "./src/js/infinite-scrolling.js":
/*!**************************************!*\
  !*** ./src/js/infinite-scrolling.js ***!
  \**************************************/
/*! exports provided: InfiniteScrolling */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InfiniteScrolling", function() { return InfiniteScrolling; });
/* harmony import */ var _wp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./wp */ "./src/js/wp.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



/**
 * Handles infinite scrolling
 *
 * @todo Abstract away tease specific logic
 */

var InfiniteScrolling =
/*#__PURE__*/
function () {
  function InfiniteScrolling() {
    _classCallCheck(this, InfiniteScrolling);

    this.template = document.getElementById('tease-template');
    this.container = document.getElementById('tease-container');
    this.loadicator = document.getElementById('tease-loadicator');
    this.pageSize = this.container.children.length;
    this.currentPage = 1;
    this.totalPages = Infinity;
    this.isLoading = false;
  }

  _createClass(InfiniteScrolling, [{
    key: "init",
    value: function init() {
      var _this = this;

      var _this$container = this.container,
          parentNode = _this$container.parentNode,
          nextSibling = _this$container.nextSibling;
      var sentinel = parentNode.insertBefore(document.createElement('div'), nextSibling);
      new IntersectionObserver(function (entries, observer) {
        if (entries.some(_util__WEBPACK_IMPORTED_MODULE_1__["isIntersecting"])) {
          _this.loadPosts(observer);
        }
      }).observe(sentinel);
    }
  }, {
    key: "toggleLoading",
    value: function toggleLoading(isLoading) {
      this.isLoading = isLoading;
      this.loadicator.classList.toggle('loadicator--active', isLoading);
    }
  }, {
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

      term.map(function (_ref) {
        var name = _ref.name,
            link = _ref.link;
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
      var thumbnailSrc = Object(_util__WEBPACK_IMPORTED_MODULE_1__["getValue"])('_embedded', 'wp:featuredmedia', 0, 'media_details', 'sizes', 'thumbnail', 'source_url')(post);

      if (!thumbnailSrc) {
        return Object(_util__WEBPACK_IMPORTED_MODULE_1__["removeElement"])(thumbnail);
      }

      thumbnail.querySelector('img').src = thumbnailSrc;
    }
  }, {
    key: "appendPost",
    value: function appendPost(post) {
      var tease = document.importNode(this.template, true).content;
      var item = document.createElement('li');
      var title = tease.querySelector('.js-tease-title');
      var excerpt = tease.querySelector('.js-tease-excerpt');
      this.populateCategories(tease, post);
      this.setThumbnail(tease, post);
      title.href = post.link;
      title.textContent = Object(_util__WEBPACK_IMPORTED_MODULE_1__["sanitize"])(post.title.rendered);
      excerpt.innerHTML = Object(_util__WEBPACK_IMPORTED_MODULE_1__["sanitize"])(post.excerpt.rendered);
      item.appendChild(tease);
      this.container.insertBefore(item, this.loadicator);
    }
  }, {
    key: "loadPosts",
    value: function loadPosts(observer) {
      var _this2 = this;

      if (this.isLoading) {
        return;
      }

      if (this.currentPage >= this.totalPages) {
        return observer.disconnect();
      }

      this.toggleLoading(true);
      this.currentPage++;
      _wp__WEBPACK_IMPORTED_MODULE_0__["default"].posts().perPage(this.pageSize).page(this.currentPage).embed().then(Object(_util__WEBPACK_IMPORTED_MODULE_1__["tap"])(function (_ref2) {
        var _paging = _ref2._paging;
        _this2.totalPages = _paging.totalPages;
      })).then(function (posts) {
        return posts.forEach(function (post) {
          return _this2.appendPost(post);
        });
      })["finally"](function () {
        return _this2.toggleLoading(false);
      });
    }
  }]);

  return InfiniteScrolling;
}();
new InfiniteScrolling().init();

/***/ }),

/***/ "./src/js/util.js":
/*!************************!*\
  !*** ./src/js/util.js ***!
  \************************/
/*! exports provided: tap, removeElement, isIntersecting, getValue, negate, pipe, isValueEqual, isValueSet, sanitize */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tap", function() { return tap; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeElement", function() { return removeElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isIntersecting", function() { return isIntersecting; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getValue", function() { return getValue; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "negate", function() { return negate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pipe", function() { return pipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValueEqual", function() { return isValueEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValueSet", function() { return isValueSet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sanitize", function() { return sanitize; });
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var tap = function tap(callback) {
  return function (value) {
    callback(value);
    return value;
  };
};
var removeElement = function removeElement(element) {
  return element.parentNode.removeChild(element);
};
var isIntersecting = function isIntersecting(_ref) {
  var isIntersecting = _ref.isIntersecting;
  return isIntersecting;
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
var negate = function negate(value) {
  return !value;
};
var pipe = function pipe(fns) {
  return function (value) {
    return fns.reduce(function (result, current) {
      return current(result);
    }, value);
  };
};
var isValueEqual = function isValueEqual(prop, value) {
  return function (object) {
    return object[prop] === value;
  };
};
var isValueSet = function isValueSet(prop) {
  return function (object) {
    return object[prop] !== undefined;
  };
};
var sanitize = function sanitize(html) {
  var element = document.createElement('div');
  element.innerHTML = html;
  return element.textContent;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NvbXBvbmVudC1lbWl0dGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9saS9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9mb3JtYXRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3FzL2xpYi9wYXJzZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3N0cmluZ2lmeS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9hZ2VudC1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9jbGllbnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3N1cGVyYWdlbnQvbGliL2lzLW9iamVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3VwZXJhZ2VudC9saWIvcmVxdWVzdC1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi9yZXNwb25zZS1iYXNlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zdXBlcmFnZW50L2xpYi91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2F1dG9kaXNjb3ZlcnkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9jb25zdHJ1Y3RvcnMvd3AtcmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2VuZHBvaW50LWZhY3Rvcmllcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL2VuZHBvaW50LXJlcXVlc3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9odHRwLXRyYW5zcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL21peGlucy9maWx0ZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvbWl4aW5zL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvbWl4aW5zL3BhcmFtZXRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi9wYXRoLXBhcnQtc2V0dGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvcmVzb3VyY2UtaGFuZGxlci1zcGVjLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvcm91dGUtdHJlZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3V0aWwvYWxwaGFudW1lcmljLXNvcnQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL2FwcGx5LW1peGluLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9hcmd1bWVudC1pcy1udW1lcmljLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9jaGVjay1tZXRob2Qtc3VwcG9ydC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3V0aWwvZW5zdXJlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9pcy1lbXB0eS1vYmplY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL2tleS12YWwtdG8tb2JqLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS9saWIvdXRpbC9uYW1lZC1ncm91cC1yZWdleHAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL29iamVjdC1yZWR1Y2UuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3BhcmFtZXRlci1zZXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3NwbGl0LXBhdGguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dwYXBpL2xpYi91dGlsL3VuaXF1ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd3BhcGkvbGliL3dwLXJlZ2lzdGVyLXJvdXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93cGFwaS93cGFwaS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvaW5maW5pdGUtc2Nyb2xsaW5nLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy91dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy93cC5qcyJdLCJuYW1lcyI6WyJJbmZpbml0ZVNjcm9sbGluZyIsInRlbXBsYXRlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRhaW5lciIsImxvYWRpY2F0b3IiLCJwYWdlU2l6ZSIsImNoaWxkcmVuIiwibGVuZ3RoIiwiY3VycmVudFBhZ2UiLCJ0b3RhbFBhZ2VzIiwiSW5maW5pdHkiLCJpc0xvYWRpbmciLCJwYXJlbnROb2RlIiwibmV4dFNpYmxpbmciLCJzZW50aW5lbCIsImluc2VydEJlZm9yZSIsImNyZWF0ZUVsZW1lbnQiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsImVudHJpZXMiLCJvYnNlcnZlciIsInNvbWUiLCJpc0ludGVyc2VjdGluZyIsImxvYWRQb3N0cyIsIm9ic2VydmUiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJ0ZWFzZSIsInBvc3QiLCJjYXRlZ29yaWVzIiwicXVlcnlTZWxlY3RvciIsInRlcm0iLCJnZXRWYWx1ZSIsInJlbW92ZUVsZW1lbnQiLCJtYXAiLCJuYW1lIiwibGluayIsIk9iamVjdCIsImFzc2lnbiIsInRleHRDb250ZW50IiwiaHJlZiIsImZvckVhY2giLCJhcHBlbmRDaGlsZCIsInRodW1ibmFpbCIsInRodW1ibmFpbFNyYyIsInNyYyIsImltcG9ydE5vZGUiLCJjb250ZW50IiwiaXRlbSIsInRpdGxlIiwiZXhjZXJwdCIsInBvcHVsYXRlQ2F0ZWdvcmllcyIsInNldFRodW1ibmFpbCIsInNhbml0aXplIiwicmVuZGVyZWQiLCJpbm5lckhUTUwiLCJkaXNjb25uZWN0IiwidG9nZ2xlTG9hZGluZyIsIndwIiwicG9zdHMiLCJwZXJQYWdlIiwicGFnZSIsImVtYmVkIiwidGhlbiIsInRhcCIsIl9wYWdpbmciLCJhcHBlbmRQb3N0IiwiaW5pdCIsImNhbGxiYWNrIiwidmFsdWUiLCJlbGVtZW50IiwicmVtb3ZlQ2hpbGQiLCJwYXRoIiwib2JqZWN0IiwicmVkdWNlIiwicmVzdWx0IiwicHJvcCIsInVuZGVmaW5lZCIsIm5lZ2F0ZSIsInBpcGUiLCJmbnMiLCJjdXJyZW50IiwiaXNWYWx1ZUVxdWFsIiwiaXNWYWx1ZVNldCIsImh0bWwiLCJXUEFQSSIsImVuZHBvaW50Il0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFB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QSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBLG1CQUFtQixvQkFBb0I7QUFDdkM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQzVRYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1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QUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEZBQTRGO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLGVBQWU7QUFDMUIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLE1BQU07QUFDakIsV0FBVyxTQUFTO0FBQ3BCLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxFQUFFOztBQUVGO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsVUFBVTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxVQUFVO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsZ0JBQWdCO0FBQzNCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxnQkFBZ0I7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LENBQUFULEtBQUs7QUFBQSxTQUFJLENBQUNBLEtBQUw7QUFBQSxDQUFwQjtBQUVBLElBQU1VLElBQUksR0FBRyxTQUFQQSxJQUFPLENBQUFDLEdBQUc7QUFBQSxTQUFJLFVBQUFYLEtBQUs7QUFBQSxXQUFJVyxHQUFHLENBQUNOLE1BQUosQ0FBVyxVQUFDQyxNQUFELEVBQVNNLE9BQVQ7QUFBQSxhQUFxQkEsT0FBTyxDQUFDTixNQUFELENBQTVCO0FBQUEsS0FBWCxFQUFpRE4sS0FBakQsQ0FBSjtBQUFBLEdBQVQ7QUFBQSxDQUFoQjtBQUVBLElBQU1hLFlBQVksR0FBRyxTQUFmQSxZQUFlLENBQUNOLElBQUQsRUFBT1AsS0FBUDtBQUFBLFNBQWlCLFVBQUFJLE1BQU07QUFBQSxXQUFJQSxNQUFNLENBQUNHLElBQUQsQ0FBTixLQUFpQlAsS0FBckI7QUFBQSxHQUF2QjtBQUFBLENBQXJCO0FBRUEsSUFBTWMsVUFBVSxHQUFHLFNBQWJBLFVBQWEsQ0FBQVAsSUFBSTtBQUFBLFNBQUksVUFBQUgsTUFBTTtBQUFBLFdBQUlBLE1BQU0sQ0FBQ0csSUFBRCxDQUFOLEtBQWlCQyxTQUFyQjtBQUFBLEdBQVY7QUFBQSxDQUF2QjtBQUVBLElBQU14QixRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFBK0IsSUFBSSxFQUFJO0FBQzlCLE1BQU1kLE9BQU8sR0FBR3BFLFFBQVEsQ0FBQ2UsYUFBVCxDQUF1QixLQUF2QixDQUFoQjtBQUNBcUQsU0FBTyxDQUFDZixTQUFSLEdBQW9CNkIsSUFBcEI7QUFDQSxTQUFPZCxPQUFPLENBQUMvQixXQUFmO0FBQ0QsQ0FKTSxDOzs7Ozs7Ozs7Ozs7QUNyQlA7QUFBQTtBQUFBO0FBQUE7QUFDZSxtRUFBSThDLDRDQUFKLENBQVU7QUFBRUMsVUFBUSxFQUFFO0FBQVosQ0FBVixDQUFmLEUiLCJmaWxlIjoianMvaW5maW5pdGUtc2Nyb2xsaW5nLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvaW5maW5pdGUtc2Nyb2xsaW5nLmpzXCIpO1xuIiwiXHJcbi8qKlxyXG4gKiBFeHBvc2UgYEVtaXR0ZXJgLlxyXG4gKi9cclxuXHJcbmlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJykge1xyXG4gIG1vZHVsZS5leHBvcnRzID0gRW1pdHRlcjtcclxufVxyXG5cclxuLyoqXHJcbiAqIEluaXRpYWxpemUgYSBuZXcgYEVtaXR0ZXJgLlxyXG4gKlxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIEVtaXR0ZXIob2JqKSB7XHJcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XHJcbn07XHJcblxyXG4vKipcclxuICogTWl4aW4gdGhlIGVtaXR0ZXIgcHJvcGVydGllcy5cclxuICpcclxuICogQHBhcmFtIHtPYmplY3R9IG9ialxyXG4gKiBAcmV0dXJuIHtPYmplY3R9XHJcbiAqIEBhcGkgcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIG1peGluKG9iaikge1xyXG4gIGZvciAodmFyIGtleSBpbiBFbWl0dGVyLnByb3RvdHlwZSkge1xyXG4gICAgb2JqW2tleV0gPSBFbWl0dGVyLnByb3RvdHlwZVtrZXldO1xyXG4gIH1cclxuICByZXR1cm4gb2JqO1xyXG59XHJcblxyXG4vKipcclxuICogTGlzdGVuIG9uIHRoZSBnaXZlbiBgZXZlbnRgIHdpdGggYGZuYC5cclxuICpcclxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50XHJcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUub24gPVxyXG5FbWl0dGVyLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgKHRoaXMuX2NhbGxiYWNrc1snJCcgKyBldmVudF0gPSB0aGlzLl9jYWxsYmFja3NbJyQnICsgZXZlbnRdIHx8IFtdKVxyXG4gICAgLnB1c2goZm4pO1xyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEFkZHMgYW4gYGV2ZW50YCBsaXN0ZW5lciB0aGF0IHdpbGwgYmUgaW52b2tlZCBhIHNpbmdsZVxyXG4gKiB0aW1lIHRoZW4gYXV0b21hdGljYWxseSByZW1vdmVkLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cclxuICogQHJldHVybiB7RW1pdHRlcn1cclxuICogQGFwaSBwdWJsaWNcclxuICovXHJcblxyXG5FbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24oZXZlbnQsIGZuKXtcclxuICBmdW5jdGlvbiBvbigpIHtcclxuICAgIHRoaXMub2ZmKGV2ZW50LCBvbik7XHJcbiAgICBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xyXG4gIH1cclxuXHJcbiAgb24uZm4gPSBmbjtcclxuICB0aGlzLm9uKGV2ZW50LCBvbik7XHJcbiAgcmV0dXJuIHRoaXM7XHJcbn07XHJcblxyXG4vKipcclxuICogUmVtb3ZlIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYGV2ZW50YCBvciBhbGxcclxuICogcmVnaXN0ZXJlZCBjYWxsYmFja3MuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxyXG4gKiBAcmV0dXJuIHtFbWl0dGVyfVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLm9mZiA9XHJcbkVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID1cclxuRW1pdHRlci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uKGV2ZW50LCBmbil7XHJcbiAgdGhpcy5fY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzIHx8IHt9O1xyXG5cclxuICAvLyBhbGxcclxuICBpZiAoMCA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICB0aGlzLl9jYWxsYmFja3MgPSB7fTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gc3BlY2lmaWMgZXZlbnRcclxuICB2YXIgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICBpZiAoIWNhbGxiYWNrcykgcmV0dXJuIHRoaXM7XHJcblxyXG4gIC8vIHJlbW92ZSBhbGwgaGFuZGxlcnNcclxuICBpZiAoMSA9PSBhcmd1bWVudHMubGVuZ3RoKSB7XHJcbiAgICBkZWxldGUgdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLy8gcmVtb3ZlIHNwZWNpZmljIGhhbmRsZXJcclxuICB2YXIgY2I7XHJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYWxsYmFja3MubGVuZ3RoOyBpKyspIHtcclxuICAgIGNiID0gY2FsbGJhY2tzW2ldO1xyXG4gICAgaWYgKGNiID09PSBmbiB8fCBjYi5mbiA9PT0gZm4pIHtcclxuICAgICAgY2FsbGJhY2tzLnNwbGljZShpLCAxKTtcclxuICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfVxyXG4gIHJldHVybiB0aGlzO1xyXG59O1xyXG5cclxuLyoqXHJcbiAqIEVtaXQgYGV2ZW50YCB3aXRoIHRoZSBnaXZlbiBhcmdzLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHBhcmFtIHtNaXhlZH0gLi4uXHJcbiAqIEByZXR1cm4ge0VtaXR0ZXJ9XHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICB0aGlzLl9jYWxsYmFja3MgPSB0aGlzLl9jYWxsYmFja3MgfHwge307XHJcbiAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSlcclxuICAgICwgY2FsbGJhY2tzID0gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XTtcclxuXHJcbiAgaWYgKGNhbGxiYWNrcykge1xyXG4gICAgY2FsbGJhY2tzID0gY2FsbGJhY2tzLnNsaWNlKDApO1xyXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNhbGxiYWNrcy5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xyXG4gICAgICBjYWxsYmFja3NbaV0uYXBwbHkodGhpcywgYXJncyk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICByZXR1cm4gdGhpcztcclxufTtcclxuXHJcbi8qKlxyXG4gKiBSZXR1cm4gYXJyYXkgb2YgY2FsbGJhY2tzIGZvciBgZXZlbnRgLlxyXG4gKlxyXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnRcclxuICogQHJldHVybiB7QXJyYXl9XHJcbiAqIEBhcGkgcHVibGljXHJcbiAqL1xyXG5cclxuRW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24oZXZlbnQpe1xyXG4gIHRoaXMuX2NhbGxiYWNrcyA9IHRoaXMuX2NhbGxiYWNrcyB8fCB7fTtcclxuICByZXR1cm4gdGhpcy5fY2FsbGJhY2tzWyckJyArIGV2ZW50XSB8fCBbXTtcclxufTtcclxuXHJcbi8qKlxyXG4gKiBDaGVjayBpZiB0aGlzIGVtaXR0ZXIgaGFzIGBldmVudGAgaGFuZGxlcnMuXHJcbiAqXHJcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudFxyXG4gKiBAcmV0dXJuIHtCb29sZWFufVxyXG4gKiBAYXBpIHB1YmxpY1xyXG4gKi9cclxuXHJcbkVtaXR0ZXIucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uKGV2ZW50KXtcclxuICByZXR1cm4gISEgdGhpcy5saXN0ZW5lcnMoZXZlbnQpLmxlbmd0aDtcclxufTtcclxuIiwiKGZ1bmN0aW9uIChuYW1lLCBkZWZpbml0aW9uLCBjb250ZXh0KSB7XG5cbiAgLy90cnkgQ29tbW9uSlMsIHRoZW4gQU1EIChyZXF1aXJlLmpzKSwgdGhlbiB1c2UgZ2xvYmFsLlxuXG4gIGlmICh0eXBlb2YgbW9kdWxlICE9ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSBtb2R1bGUuZXhwb3J0cyA9IGRlZmluaXRpb24oKTtcbiAgZWxzZSBpZiAodHlwZW9mIGNvbnRleHRbJ2RlZmluZSddID09ICdmdW5jdGlvbicgJiYgY29udGV4dFsnZGVmaW5lJ11bJ2FtZCddKSBkZWZpbmUoZGVmaW5pdGlvbik7XG4gIGVsc2UgY29udGV4dFtuYW1lXSA9IGRlZmluaXRpb24oKTtcblxufSkoJ2xpJywgZnVuY3Rpb24gKCkge1xuICAvLyBjb21waWxlIHJlZ3VsYXIgZXhwcmVzc2lvbnMgYWhlYWQgb2YgdGltZSBmb3IgZWZmaWNpZW5jeVxuICB2YXIgcmVsc1JlZ0V4cCA9IC9eO1xccyooW15cIj1dKyk9KD86XCIoW15cIl0rKVwifChbXlwiOyxdKykoPzpbOyxdfCQpKS87XG4gIHZhciBzb3VyY2VSZWdFeHAgPSAvXjwoW14+XSopPi87XG4gIHZhciBkZWxpbWl0ZXJSZWdFeHAgPSAvXlxccyosXFxzKi87XG5cbiAgcmV0dXJuIHtcbiAgICBwYXJzZTogZnVuY3Rpb24gKGxpbmtzSGVhZGVyLCBvcHRpb25zKSB7XG4gICAgICB2YXIgbWF0Y2g7XG4gICAgICB2YXIgc291cmNlO1xuICAgICAgdmFyIHJlbHM7XG4gICAgICB2YXIgZXh0ZW5kZWQgPSBvcHRpb25zICYmIG9wdGlvbnMuZXh0ZW5kZWQgfHwgZmFsc2U7XG4gICAgICB2YXIgbGlua3MgPSBbXTtcblxuICAgICAgd2hpbGUgKGxpbmtzSGVhZGVyKSB7XG4gICAgICAgIGxpbmtzSGVhZGVyID0gbGlua3NIZWFkZXIudHJpbSgpO1xuXG4gICAgICAgIC8vIFBhcnNlIGA8bGluaz5gXG4gICAgICAgIHNvdXJjZSA9IHNvdXJjZVJlZ0V4cC5leGVjKGxpbmtzSGVhZGVyKTtcbiAgICAgICAgaWYgKCFzb3VyY2UpIGJyZWFrO1xuXG4gICAgICAgIHZhciBjdXJyZW50ID0ge1xuICAgICAgICAgIGxpbms6IHNvdXJjZVsxXVxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIE1vdmUgY3Vyc29yXG4gICAgICAgIGxpbmtzSGVhZGVyID0gbGlua3NIZWFkZXIuc2xpY2Uoc291cmNlWzBdLmxlbmd0aCk7XG5cbiAgICAgICAgLy8gUGFyc2UgYDsgYXR0cj1yZWxhdGlvbmAgYW5kIGA7IGF0dHI9XCJyZWxhdGlvblwiYFxuXG4gICAgICAgIHZhciBuZXh0RGVsaW1pdGVyID0gbGlua3NIZWFkZXIubWF0Y2goZGVsaW1pdGVyUmVnRXhwKTtcbiAgICAgICAgd2hpbGUobGlua3NIZWFkZXIgJiYgKCFuZXh0RGVsaW1pdGVyIHx8IG5leHREZWxpbWl0ZXIuaW5kZXggPiAwKSkge1xuICAgICAgICAgIG1hdGNoID0gcmVsc1JlZ0V4cC5leGVjKGxpbmtzSGVhZGVyKTtcbiAgICAgICAgICBpZiAoIW1hdGNoKSBicmVhaztcblxuICAgICAgICAgIC8vIE1vdmUgY3Vyc29yXG4gICAgICAgICAgbGlua3NIZWFkZXIgPSBsaW5rc0hlYWRlci5zbGljZShtYXRjaFswXS5sZW5ndGgpO1xuICAgICAgICAgIG5leHREZWxpbWl0ZXIgPSBsaW5rc0hlYWRlci5tYXRjaChkZWxpbWl0ZXJSZWdFeHApO1xuXG5cbiAgICAgICAgICBpZiAobWF0Y2hbMV0gPT09ICdyZWwnIHx8IG1hdGNoWzFdID09PSAncmV2Jykge1xuICAgICAgICAgICAgLy8gQWRkIGVpdGhlciBxdW90ZWQgcmVsIG9yIHVucXVvdGVkIHJlbFxuICAgICAgICAgICAgcmVscyA9IChtYXRjaFsyXSB8fCBtYXRjaFszXSkuc3BsaXQoL1xccysvKTtcbiAgICAgICAgICAgIGN1cnJlbnRbbWF0Y2hbMV1dID0gcmVscztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFttYXRjaFsxXV0gPSBtYXRjaFsyXSB8fCBtYXRjaFszXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsaW5rcy5wdXNoKGN1cnJlbnQpO1xuICAgICAgICAvLyBNb3ZlIGN1cnNvclxuICAgICAgICBsaW5rc0hlYWRlciA9IGxpbmtzSGVhZGVyLnJlcGxhY2UoZGVsaW1pdGVyUmVnRXhwLCAnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghZXh0ZW5kZWQpIHtcbiAgICAgICAgcmV0dXJuIGxpbmtzLnJlZHVjZShmdW5jdGlvbihyZXN1bHQsIGN1cnJlbnRMaW5rKSB7XG4gICAgICAgICAgaWYgKGN1cnJlbnRMaW5rLnJlbCkge1xuICAgICAgICAgICAgY3VycmVudExpbmsucmVsLmZvckVhY2goZnVuY3Rpb24ocmVsKSB7XG4gICAgICAgICAgICAgIHJlc3VsdFtyZWxdID0gY3VycmVudExpbmsubGluaztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9LCB7fSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBsaW5rcztcbiAgICB9LFxuICAgIHN0cmluZ2lmeTogZnVuY3Rpb24gKHBhcmFtcykge1xuICAgICAgdmFyIGdyb3VwZWQgPSBPYmplY3Qua2V5cyhwYXJhbXMpLnJlZHVjZShmdW5jdGlvbihncm91cGVkLCBrZXkpIHtcbiAgICAgICAgZ3JvdXBlZFtwYXJhbXNba2V5XV0gPSBncm91cGVkW3BhcmFtc1trZXldXSB8fCBbXTtcbiAgICAgICAgZ3JvdXBlZFtwYXJhbXNba2V5XV0ucHVzaChrZXkpO1xuICAgICAgICByZXR1cm4gZ3JvdXBlZDtcbiAgICAgIH0sIHt9KTtcblxuICAgICAgdmFyIGVudHJpZXMgPSBPYmplY3Qua2V5cyhncm91cGVkKS5yZWR1Y2UoZnVuY3Rpb24ocmVzdWx0LCBsaW5rKSB7XG4gICAgICAgIHJldHVybiByZXN1bHQuY29uY2F0KCc8JyArIGxpbmsgKyAnPjsgcmVsPVwiJyArIGdyb3VwZWRbbGlua10uam9pbignICcpICsgJ1wiJyk7XG4gICAgICB9LCBbXSk7XG5cbiAgICAgIHJldHVybiBlbnRyaWVzLmpvaW4oJywgJyk7XG4gICAgfVxuICB9O1xuXG59LCB0aGlzKTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgY29tbWE6IGZhbHNlLFxuICAgIGRlY29kZXI6IHV0aWxzLmRlY29kZSxcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBkZXB0aDogNSxcbiAgICBpZ25vcmVRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgaW50ZXJwcmV0TnVtZXJpY0VudGl0aWVzOiBmYWxzZSxcbiAgICBwYXJhbWV0ZXJMaW1pdDogMTAwMCxcbiAgICBwYXJzZUFycmF5czogdHJ1ZSxcbiAgICBwbGFpbk9iamVjdHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBpbnRlcnByZXROdW1lcmljRW50aXRpZXMgPSBmdW5jdGlvbiAoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5yZXBsYWNlKC8mIyhcXGQrKTsvZywgZnVuY3Rpb24gKCQwLCBudW1iZXJTdHIpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQobnVtYmVyU3RyLCAxMCkpO1xuICAgIH0pO1xufTtcblxuLy8gVGhpcyBpcyB3aGF0IGJyb3dzZXJzIHdpbGwgc3VibWl0IHdoZW4gdGhlIOKckyBjaGFyYWN0ZXIgb2NjdXJzIGluIGFuXG4vLyBhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQgYm9keSBhbmQgdGhlIGVuY29kaW5nIG9mIHRoZSBwYWdlIGNvbnRhaW5pbmdcbi8vIHRoZSBmb3JtIGlzIGlzby04ODU5LTEsIG9yIHdoZW4gdGhlIHN1Ym1pdHRlZCBmb3JtIGhhcyBhbiBhY2NlcHQtY2hhcnNldFxuLy8gYXR0cmlidXRlIG9mIGlzby04ODU5LTEuIFByZXN1bWFibHkgYWxzbyB3aXRoIG90aGVyIGNoYXJzZXRzIHRoYXQgZG8gbm90IGNvbnRhaW5cbi8vIHRoZSDinJMgY2hhcmFjdGVyLCBzdWNoIGFzIHVzLWFzY2lpLlxudmFyIGlzb1NlbnRpbmVsID0gJ3V0Zjg9JTI2JTIzMTAwMDMlM0InOyAvLyBlbmNvZGVVUklDb21wb25lbnQoJyYjMTAwMDM7JylcblxuLy8gVGhlc2UgYXJlIHRoZSBwZXJjZW50LWVuY29kZWQgdXRmLTggb2N0ZXRzIHJlcHJlc2VudGluZyBhIGNoZWNrbWFyaywgaW5kaWNhdGluZyB0aGF0IHRoZSByZXF1ZXN0IGFjdHVhbGx5IGlzIHV0Zi04IGVuY29kZWQuXG52YXIgY2hhcnNldFNlbnRpbmVsID0gJ3V0Zjg9JUUyJTlDJTkzJzsgLy8gZW5jb2RlVVJJQ29tcG9uZW50KCfinJMnKVxuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG4gICAgdmFyIHNraXBJbmRleCA9IC0xOyAvLyBLZWVwIHRyYWNrIG9mIHdoZXJlIHRoZSB1dGY4IHNlbnRpbmVsIHdhcyBmb3VuZFxuICAgIHZhciBpO1xuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRpb25zLmNoYXJzZXQ7XG4gICAgaWYgKG9wdGlvbnMuY2hhcnNldFNlbnRpbmVsKSB7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgaWYgKHBhcnRzW2ldLmluZGV4T2YoJ3V0Zjg9JykgPT09IDApIHtcbiAgICAgICAgICAgICAgICBpZiAocGFydHNbaV0gPT09IGNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ3V0Zi04JztcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHBhcnRzW2ldID09PSBpc29TZW50aW5lbCkge1xuICAgICAgICAgICAgICAgICAgICBjaGFyc2V0ID0gJ2lzby04ODU5LTEnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBza2lwSW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGkgPSBwYXJ0cy5sZW5ndGg7IC8vIFRoZSBlc2xpbnQgc2V0dGluZ3MgZG8gbm90IGFsbG93IGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmIChpID09PSBza2lwSW5kZXgpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIsIGNoYXJzZXQpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgJiYgY2hhcnNldCA9PT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgICAgICB2YWwgPSBpbnRlcnByZXROdW1lcmljRW50aXRpZXModmFsKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWwgJiYgb3B0aW9ucy5jb21tYSAmJiB2YWwuaW5kZXhPZignLCcpID4gLTEpIHtcbiAgICAgICAgICAgIHZhbCA9IHZhbC5zcGxpdCgnLCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGhhcy5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB1dGlscy5jb21iaW5lKG9ialtrZXldLCB2YWwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIHBhcnNlT2JqZWN0ID0gZnVuY3Rpb24gKGNoYWluLCB2YWwsIG9wdGlvbnMpIHtcbiAgICB2YXIgbGVhZiA9IHZhbDtcblxuICAgIGZvciAodmFyIGkgPSBjaGFpbi5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgb2JqO1xuICAgICAgICB2YXIgcm9vdCA9IGNoYWluW2ldO1xuXG4gICAgICAgIGlmIChyb290ID09PSAnW10nICYmIG9wdGlvbnMucGFyc2VBcnJheXMpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMucGFyc2VBcnJheXMgJiYgY2xlYW5Sb290ID09PSAnJykge1xuICAgICAgICAgICAgICAgIG9iaiA9IHsgMDogbGVhZiB9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAhaXNOYU4oaW5kZXgpXG4gICAgICAgICAgICAgICAgJiYgcm9vdCAhPT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgU3RyaW5nKGluZGV4KSA9PT0gY2xlYW5Sb290XG4gICAgICAgICAgICAgICAgJiYgaW5kZXggPj0gMFxuICAgICAgICAgICAgICAgICYmIChvcHRpb25zLnBhcnNlQXJyYXlzICYmIGluZGV4IDw9IG9wdGlvbnMuYXJyYXlMaW1pdClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgICAgIG9ialtpbmRleF0gPSBsZWFmO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbY2xlYW5Sb290XSA9IGxlYWY7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZWFmID0gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiBsZWFmO1xufTtcblxudmFyIHBhcnNlS2V5cyA9IGZ1bmN0aW9uIHBhcnNlUXVlcnlTdHJpbmdLZXlzKGdpdmVuS2V5LCB2YWwsIG9wdGlvbnMpIHtcbiAgICBpZiAoIWdpdmVuS2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUcmFuc2Zvcm0gZG90IG5vdGF0aW9uIHRvIGJyYWNrZXQgbm90YXRpb25cbiAgICB2YXIga2V5ID0gb3B0aW9ucy5hbGxvd0RvdHMgPyBnaXZlbktleS5yZXBsYWNlKC9cXC4oW14uW10rKS9nLCAnWyQxXScpIDogZ2l2ZW5LZXk7XG5cbiAgICAvLyBUaGUgcmVnZXggY2h1bmtzXG5cbiAgICB2YXIgYnJhY2tldHMgPSAvKFxcW1teW1xcXV0qXSkvO1xuICAgIHZhciBjaGlsZCA9IC8oXFxbW15bXFxdXSpdKS9nO1xuXG4gICAgLy8gR2V0IHRoZSBwYXJlbnRcblxuICAgIHZhciBzZWdtZW50ID0gYnJhY2tldHMuZXhlYyhrZXkpO1xuICAgIHZhciBwYXJlbnQgPSBzZWdtZW50ID8ga2V5LnNsaWNlKDAsIHNlZ21lbnQuaW5kZXgpIDoga2V5O1xuXG4gICAgLy8gU3Rhc2ggdGhlIHBhcmVudCBpZiBpdCBleGlzdHNcblxuICAgIHZhciBrZXlzID0gW107XG4gICAgaWYgKHBhcmVudCkge1xuICAgICAgICAvLyBJZiB3ZSBhcmVuJ3QgdXNpbmcgcGxhaW4gb2JqZWN0cywgb3B0aW9uYWxseSBwcmVmaXgga2V5cyB0aGF0IHdvdWxkIG92ZXJ3cml0ZSBvYmplY3QgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgICAgaWYgKCFvcHRpb25zLnBsYWluT2JqZWN0cyAmJiBoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBwYXJlbnQpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAga2V5cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy8gTG9vcCB0aHJvdWdoIGNoaWxkcmVuIGFwcGVuZGluZyB0byB0aGUgYXJyYXkgdW50aWwgd2UgaGl0IGRlcHRoXG5cbiAgICB2YXIgaSA9IDA7XG4gICAgd2hpbGUgKChzZWdtZW50ID0gY2hpbGQuZXhlYyhrZXkpKSAhPT0gbnVsbCAmJiBpIDwgb3B0aW9ucy5kZXB0aCkge1xuICAgICAgICBpICs9IDE7XG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgc2VnbWVudFsxXS5zbGljZSgxLCAtMSkpKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGtleXMucHVzaChzZWdtZW50WzFdKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGVyZSdzIGEgcmVtYWluZGVyLCBqdXN0IGFkZCB3aGF0ZXZlciBpcyBsZWZ0XG5cbiAgICBpZiAoc2VnbWVudCkge1xuICAgICAgICBrZXlzLnB1c2goJ1snICsga2V5LnNsaWNlKHNlZ21lbnQuaW5kZXgpICsgJ10nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VPYmplY3Qoa2V5cywgdmFsLCBvcHRpb25zKTtcbn07XG5cbnZhciBub3JtYWxpemVQYXJzZU9wdGlvbnMgPSBmdW5jdGlvbiBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZGVjb2RlciAhPT0gbnVsbCAmJiBvcHRzLmRlY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5kZWNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0RlY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBvcHRzLmNoYXJzZXQgIT09ICd1bmRlZmluZWQnICYmIG9wdHMuY2hhcnNldCAhPT0gJ3V0Zi04JyAmJiBvcHRzLmNoYXJzZXQgIT09ICdpc28tODg1OS0xJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuICAgIHZhciBjaGFyc2V0ID0gdHlwZW9mIG9wdHMuY2hhcnNldCA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5jaGFyc2V0IDogb3B0cy5jaGFyc2V0O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgYWxsb3dQcm90b3R5cGVzOiB0eXBlb2Ygb3B0cy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdHMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzLFxuICAgICAgICBhcnJheUxpbWl0OiB0eXBlb2Ygb3B0cy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdHMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQsXG4gICAgICAgIGNoYXJzZXQ6IGNoYXJzZXQsXG4gICAgICAgIGNoYXJzZXRTZW50aW5lbDogdHlwZW9mIG9wdHMuY2hhcnNldFNlbnRpbmVsID09PSAnYm9vbGVhbicgPyBvcHRzLmNoYXJzZXRTZW50aW5lbCA6IGRlZmF1bHRzLmNoYXJzZXRTZW50aW5lbCxcbiAgICAgICAgY29tbWE6IHR5cGVvZiBvcHRzLmNvbW1hID09PSAnYm9vbGVhbicgPyBvcHRzLmNvbW1hIDogZGVmYXVsdHMuY29tbWEsXG4gICAgICAgIGRlY29kZXI6IHR5cGVvZiBvcHRzLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRzLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0cy5kZWxpbWl0ZXIpID8gb3B0cy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXIsXG4gICAgICAgIGRlcHRoOiB0eXBlb2Ygb3B0cy5kZXB0aCA9PT0gJ251bWJlcicgPyBvcHRzLmRlcHRoIDogZGVmYXVsdHMuZGVwdGgsXG4gICAgICAgIGlnbm9yZVF1ZXJ5UHJlZml4OiBvcHRzLmlnbm9yZVF1ZXJ5UHJlZml4ID09PSB0cnVlLFxuICAgICAgICBpbnRlcnByZXROdW1lcmljRW50aXRpZXM6IHR5cGVvZiBvcHRzLmludGVycHJldE51bWVyaWNFbnRpdGllcyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMgOiBkZWZhdWx0cy5pbnRlcnByZXROdW1lcmljRW50aXRpZXMsXG4gICAgICAgIHBhcmFtZXRlckxpbWl0OiB0eXBlb2Ygb3B0cy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRzLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQsXG4gICAgICAgIHBhcnNlQXJyYXlzOiBvcHRzLnBhcnNlQXJyYXlzICE9PSBmYWxzZSxcbiAgICAgICAgcGxhaW5PYmplY3RzOiB0eXBlb2Ygb3B0cy5wbGFpbk9iamVjdHMgPT09ICdib29sZWFuJyA/IG9wdHMucGxhaW5PYmplY3RzIDogZGVmYXVsdHMucGxhaW5PYmplY3RzLFxuICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IHR5cGVvZiBvcHRzLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmdcbiAgICB9O1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoc3RyLCBvcHRzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVQYXJzZU9wdGlvbnMob3B0cyk7XG5cbiAgICBpZiAoc3RyID09PSAnJyB8fCBzdHIgPT09IG51bGwgfHwgdHlwZW9mIHN0ciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIH1cblxuICAgIHZhciB0ZW1wT2JqID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBwYXJzZVZhbHVlcyhzdHIsIG9wdGlvbnMpIDogc3RyO1xuICAgIHZhciBvYmogPSBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcblxuICAgIC8vIEl0ZXJhdGUgb3ZlciB0aGUga2V5cyBhbmQgc2V0dXAgdGhlIG5ldyBvYmplY3RcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXModGVtcE9iaik7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgICAgICB2YXIgbmV3T2JqID0gcGFyc2VLZXlzKGtleSwgdGVtcE9ialtrZXldLCBvcHRpb25zKTtcbiAgICAgICAgb2JqID0gdXRpbHMubWVyZ2Uob2JqLCBuZXdPYmosIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB1dGlscy5jb21wYWN0KG9iaik7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBhcnJheVByZWZpeEdlbmVyYXRvcnMgPSB7XG4gICAgYnJhY2tldHM6IGZ1bmN0aW9uIGJyYWNrZXRzKHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1tdJztcbiAgICB9LFxuICAgIGNvbW1hOiAnY29tbWEnLFxuICAgIGluZGljZXM6IGZ1bmN0aW9uIGluZGljZXMocHJlZml4LCBrZXkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHByZWZpeCArICdbJyArIGtleSArICddJztcbiAgICB9LFxuICAgIHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHByZWZpeCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4O1xuICAgIH1cbn07XG5cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcbnZhciBwdXNoID0gQXJyYXkucHJvdG90eXBlLnB1c2g7XG52YXIgcHVzaFRvQXJyYXkgPSBmdW5jdGlvbiAoYXJyLCB2YWx1ZU9yQXJyYXkpIHtcbiAgICBwdXNoLmFwcGx5KGFyciwgaXNBcnJheSh2YWx1ZU9yQXJyYXkpID8gdmFsdWVPckFycmF5IDogW3ZhbHVlT3JBcnJheV0pO1xufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBhZGRRdWVyeVByZWZpeDogZmFsc2UsXG4gICAgYWxsb3dEb3RzOiBmYWxzZSxcbiAgICBjaGFyc2V0OiAndXRmLTgnLFxuICAgIGNoYXJzZXRTZW50aW5lbDogZmFsc2UsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZW5jb2RlOiB0cnVlLFxuICAgIGVuY29kZXI6IHV0aWxzLmVuY29kZSxcbiAgICBlbmNvZGVWYWx1ZXNPbmx5OiBmYWxzZSxcbiAgICBmb3JtYXR0ZXI6IGZvcm1hdHMuZm9ybWF0dGVyc1tmb3JtYXRzWydkZWZhdWx0J11dLFxuICAgIC8vIGRlcHJlY2F0ZWRcbiAgICBpbmRpY2VzOiBmYWxzZSxcbiAgICBzZXJpYWxpemVEYXRlOiBmdW5jdGlvbiBzZXJpYWxpemVEYXRlKGRhdGUpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICAgICAgcmV0dXJuIHRvSVNPLmNhbGwoZGF0ZSk7XG4gICAgfSxcbiAgICBza2lwTnVsbHM6IGZhbHNlLFxuICAgIHN0cmljdE51bGxIYW5kbGluZzogZmFsc2Vcbn07XG5cbnZhciBzdHJpbmdpZnkgPSBmdW5jdGlvbiBzdHJpbmdpZnkoIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgb2JqZWN0LFxuICAgIHByZWZpeCxcbiAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICBza2lwTnVsbHMsXG4gICAgZW5jb2RlcixcbiAgICBmaWx0ZXIsXG4gICAgc29ydCxcbiAgICBhbGxvd0RvdHMsXG4gICAgc2VyaWFsaXplRGF0ZSxcbiAgICBmb3JtYXR0ZXIsXG4gICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICBjaGFyc2V0XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKGdlbmVyYXRlQXJyYXlQcmVmaXggPT09ICdjb21tYScgJiYgaXNBcnJheShvYmopKSB7XG4gICAgICAgIG9iaiA9IG9iai5qb2luKCcsJyk7XG4gICAgfVxuXG4gICAgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyLCBjaGFyc2V0KTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlciwgY2hhcnNldCkpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKGlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHB1c2hUb0FycmF5KHZhbHVlcywgc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHR5cGVvZiBnZW5lcmF0ZUFycmF5UHJlZml4ID09PSAnZnVuY3Rpb24nID8gZ2VuZXJhdGVBcnJheVByZWZpeChwcmVmaXgsIGtleSkgOiBwcmVmaXgsXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICAgICAgc2tpcE51bGxzLFxuICAgICAgICAgICAgICAgIGVuY29kZXIsXG4gICAgICAgICAgICAgICAgZmlsdGVyLFxuICAgICAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICAgICAgYWxsb3dEb3RzLFxuICAgICAgICAgICAgICAgIHNlcmlhbGl6ZURhdGUsXG4gICAgICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgICAgIGVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICAgICAgY2hhcnNldFxuICAgICAgICAgICAgKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwdXNoVG9BcnJheSh2YWx1ZXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgICAgICBwcmVmaXggKyAoYWxsb3dEb3RzID8gJy4nICsga2V5IDogJ1snICsga2V5ICsgJ10nKSxcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUFycmF5UHJlZml4LFxuICAgICAgICAgICAgICAgIHN0cmljdE51bGxIYW5kbGluZyxcbiAgICAgICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICAgICAgZW5jb2RlcixcbiAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgc29ydCxcbiAgICAgICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICAgICAgc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgICAgICAgICBmb3JtYXR0ZXIsXG4gICAgICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgICAgICAgICBjaGFyc2V0XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG52YXIgbm9ybWFsaXplU3RyaW5naWZ5T3B0aW9ucyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZVN0cmluZ2lmeU9wdGlvbnMob3B0cykge1xuICAgIGlmICghb3B0cykge1xuICAgICAgICByZXR1cm4gZGVmYXVsdHM7XG4gICAgfVxuXG4gICAgaWYgKG9wdHMuZW5jb2RlciAhPT0gbnVsbCAmJiBvcHRzLmVuY29kZXIgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb3B0cy5lbmNvZGVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0VuY29kZXIgaGFzIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGNoYXJzZXQgPSBvcHRzLmNoYXJzZXQgfHwgZGVmYXVsdHMuY2hhcnNldDtcbiAgICBpZiAodHlwZW9mIG9wdHMuY2hhcnNldCAhPT0gJ3VuZGVmaW5lZCcgJiYgb3B0cy5jaGFyc2V0ICE9PSAndXRmLTgnICYmIG9wdHMuY2hhcnNldCAhPT0gJ2lzby04ODU5LTEnKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1RoZSBjaGFyc2V0IG9wdGlvbiBtdXN0IGJlIGVpdGhlciB1dGYtOCwgaXNvLTg4NTktMSwgb3IgdW5kZWZpbmVkJyk7XG4gICAgfVxuXG4gICAgdmFyIGZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICBpZiAodHlwZW9mIG9wdHMuZm9ybWF0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAoIWhhcy5jYWxsKGZvcm1hdHMuZm9ybWF0dGVycywgb3B0cy5mb3JtYXQpKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGZvcm1hdCBvcHRpb24gcHJvdmlkZWQuJyk7XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0ID0gb3B0cy5mb3JtYXQ7XG4gICAgfVxuICAgIHZhciBmb3JtYXR0ZXIgPSBmb3JtYXRzLmZvcm1hdHRlcnNbZm9ybWF0XTtcblxuICAgIHZhciBmaWx0ZXIgPSBkZWZhdWx0cy5maWx0ZXI7XG4gICAgaWYgKHR5cGVvZiBvcHRzLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJyB8fCBpc0FycmF5KG9wdHMuZmlsdGVyKSkge1xuICAgICAgICBmaWx0ZXIgPSBvcHRzLmZpbHRlcjtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRRdWVyeVByZWZpeDogdHlwZW9mIG9wdHMuYWRkUXVlcnlQcmVmaXggPT09ICdib29sZWFuJyA/IG9wdHMuYWRkUXVlcnlQcmVmaXggOiBkZWZhdWx0cy5hZGRRdWVyeVByZWZpeCxcbiAgICAgICAgYWxsb3dEb3RzOiB0eXBlb2Ygb3B0cy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuYWxsb3dEb3RzIDogISFvcHRzLmFsbG93RG90cyxcbiAgICAgICAgY2hhcnNldDogY2hhcnNldCxcbiAgICAgICAgY2hhcnNldFNlbnRpbmVsOiB0eXBlb2Ygb3B0cy5jaGFyc2V0U2VudGluZWwgPT09ICdib29sZWFuJyA/IG9wdHMuY2hhcnNldFNlbnRpbmVsIDogZGVmYXVsdHMuY2hhcnNldFNlbnRpbmVsLFxuICAgICAgICBkZWxpbWl0ZXI6IHR5cGVvZiBvcHRzLmRlbGltaXRlciA9PT0gJ3VuZGVmaW5lZCcgPyBkZWZhdWx0cy5kZWxpbWl0ZXIgOiBvcHRzLmRlbGltaXRlcixcbiAgICAgICAgZW5jb2RlOiB0eXBlb2Ygb3B0cy5lbmNvZGUgPT09ICdib29sZWFuJyA/IG9wdHMuZW5jb2RlIDogZGVmYXVsdHMuZW5jb2RlLFxuICAgICAgICBlbmNvZGVyOiB0eXBlb2Ygb3B0cy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0cy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcixcbiAgICAgICAgZW5jb2RlVmFsdWVzT25seTogdHlwZW9mIG9wdHMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0cy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seSxcbiAgICAgICAgZmlsdGVyOiBmaWx0ZXIsXG4gICAgICAgIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICAgICAgICBzZXJpYWxpemVEYXRlOiB0eXBlb2Ygb3B0cy5zZXJpYWxpemVEYXRlID09PSAnZnVuY3Rpb24nID8gb3B0cy5zZXJpYWxpemVEYXRlIDogZGVmYXVsdHMuc2VyaWFsaXplRGF0ZSxcbiAgICAgICAgc2tpcE51bGxzOiB0eXBlb2Ygb3B0cy5za2lwTnVsbHMgPT09ICdib29sZWFuJyA/IG9wdHMuc2tpcE51bGxzIDogZGVmYXVsdHMuc2tpcE51bGxzLFxuICAgICAgICBzb3J0OiB0eXBlb2Ygb3B0cy5zb3J0ID09PSAnZnVuY3Rpb24nID8gb3B0cy5zb3J0IDogbnVsbCxcbiAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nOiB0eXBlb2Ygb3B0cy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdHMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nXG4gICAgfTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iamVjdCwgb3B0cykge1xuICAgIHZhciBvYmogPSBvYmplY3Q7XG4gICAgdmFyIG9wdGlvbnMgPSBub3JtYWxpemVTdHJpbmdpZnlPcHRpb25zKG9wdHMpO1xuXG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIGZpbHRlcjtcblxuICAgIGlmICh0eXBlb2Ygb3B0aW9ucy5maWx0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaiA9IGZpbHRlcignJywgb2JqKTtcbiAgICB9IGVsc2UgaWYgKGlzQXJyYXkob3B0aW9ucy5maWx0ZXIpKSB7XG4gICAgICAgIGZpbHRlciA9IG9wdGlvbnMuZmlsdGVyO1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH1cblxuICAgIHZhciBrZXlzID0gW107XG5cbiAgICBpZiAodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9XG5cbiAgICB2YXIgYXJyYXlGb3JtYXQ7XG4gICAgaWYgKG9wdHMgJiYgb3B0cy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRzLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAob3B0cyAmJiAnaW5kaWNlcycgaW4gb3B0cykge1xuICAgICAgICBhcnJheUZvcm1hdCA9IG9wdHMuaW5kaWNlcyA/ICdpbmRpY2VzJyA6ICdyZXBlYXQnO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5Rm9ybWF0ID0gJ2luZGljZXMnO1xuICAgIH1cblxuICAgIHZhciBnZW5lcmF0ZUFycmF5UHJlZml4ID0gYXJyYXlQcmVmaXhHZW5lcmF0b3JzW2FycmF5Rm9ybWF0XTtcblxuICAgIGlmICghb2JqS2V5cykge1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5zb3J0KSB7XG4gICAgICAgIG9iaktleXMuc29ydChvcHRpb25zLnNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAob3B0aW9ucy5za2lwTnVsbHMgJiYgb2JqW2tleV0gPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHB1c2hUb0FycmF5KGtleXMsIHN0cmluZ2lmeShcbiAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAga2V5LFxuICAgICAgICAgICAgZ2VuZXJhdGVBcnJheVByZWZpeCxcbiAgICAgICAgICAgIG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgb3B0aW9ucy5za2lwTnVsbHMsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZSA/IG9wdGlvbnMuZW5jb2RlciA6IG51bGwsXG4gICAgICAgICAgICBvcHRpb25zLmZpbHRlcixcbiAgICAgICAgICAgIG9wdGlvbnMuc29ydCxcbiAgICAgICAgICAgIG9wdGlvbnMuYWxsb3dEb3RzLFxuICAgICAgICAgICAgb3B0aW9ucy5zZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgb3B0aW9ucy5mb3JtYXR0ZXIsXG4gICAgICAgICAgICBvcHRpb25zLmVuY29kZVZhbHVlc09ubHksXG4gICAgICAgICAgICBvcHRpb25zLmNoYXJzZXRcbiAgICAgICAgKSk7XG4gICAgfVxuXG4gICAgdmFyIGpvaW5lZCA9IGtleXMuam9pbihvcHRpb25zLmRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIGlmIChvcHRpb25zLmNoYXJzZXRTZW50aW5lbCkge1xuICAgICAgICBpZiAob3B0aW9ucy5jaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgICAgIC8vIGVuY29kZVVSSUNvbXBvbmVudCgnJiMxMDAwMzsnKSwgdGhlIFwibnVtZXJpYyBlbnRpdHlcIiByZXByZXNlbnRhdGlvbiBvZiBhIGNoZWNrbWFya1xuICAgICAgICAgICAgcHJlZml4ICs9ICd1dGY4PSUyNiUyMzEwMDAzJTNCJic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBlbmNvZGVVUklDb21wb25lbnQoJ+KckycpXG4gICAgICAgICAgICBwcmVmaXggKz0gJ3V0Zjg9JUUyJTlDJTkzJic7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gam9pbmVkLmxlbmd0aCA+IDAgPyBwcmVmaXggKyBqb2luZWQgOiAnJztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBoYXMgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG52YXIgaGV4VGFibGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIHZhciBhcnJheSA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgMjU2OyArK2kpIHtcbiAgICAgICAgYXJyYXkucHVzaCgnJScgKyAoKGkgPCAxNiA/ICcwJyA6ICcnKSArIGkudG9TdHJpbmcoMTYpKS50b1VwcGVyQ2FzZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyYXk7XG59KCkpO1xuXG52YXIgY29tcGFjdFF1ZXVlID0gZnVuY3Rpb24gY29tcGFjdFF1ZXVlKHF1ZXVlKSB7XG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGl0ZW0gPSBxdWV1ZS5wb3AoKTtcbiAgICAgICAgdmFyIG9iaiA9IGl0ZW0ub2JqW2l0ZW0ucHJvcF07XG5cbiAgICAgICAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgICAgICAgICAgdmFyIGNvbXBhY3RlZCA9IFtdO1xuXG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IG9iai5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW2pdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICBjb21wYWN0ZWQucHVzaChvYmpbal0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaXRlbS5vYmpbaXRlbS5wcm9wXSA9IGNvbXBhY3RlZDtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnZhciBhcnJheVRvT2JqZWN0ID0gZnVuY3Rpb24gYXJyYXlUb09iamVjdChzb3VyY2UsIG9wdGlvbnMpIHtcbiAgICB2YXIgb2JqID0gb3B0aW9ucyAmJiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNvdXJjZS5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZiAodHlwZW9mIHNvdXJjZVtpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIG9ialtpXSA9IHNvdXJjZVtpXTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgbWVyZ2UgPSBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghc291cmNlKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIGlmIChpc0FycmF5KHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRhcmdldC5wdXNoKHNvdXJjZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGFyZ2V0ICYmIHR5cGVvZiB0YXJnZXQgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBpZiAoKG9wdGlvbnMgJiYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzKSkgfHwgIWhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNvdXJjZSkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbc291cmNlXSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gW3RhcmdldCwgc291cmNlXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgaWYgKCF0YXJnZXQgfHwgdHlwZW9mIHRhcmdldCAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgcmV0dXJuIFt0YXJnZXRdLmNvbmNhdChzb3VyY2UpO1xuICAgIH1cblxuICAgIHZhciBtZXJnZVRhcmdldCA9IHRhcmdldDtcbiAgICBpZiAoaXNBcnJheSh0YXJnZXQpICYmICFpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgbWVyZ2VUYXJnZXQgPSBhcnJheVRvT2JqZWN0KHRhcmdldCwgb3B0aW9ucyk7XG4gICAgfVxuXG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgc291cmNlLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGkpIHtcbiAgICAgICAgICAgIGlmIChoYXMuY2FsbCh0YXJnZXQsIGkpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldEl0ZW0gPSB0YXJnZXRbaV07XG4gICAgICAgICAgICAgICAgaWYgKHRhcmdldEl0ZW0gJiYgdHlwZW9mIHRhcmdldEl0ZW0gPT09ICdvYmplY3QnICYmIGl0ZW0gJiYgdHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldEl0ZW0sIGl0ZW0sIG9wdGlvbnMpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2ldID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBzb3VyY2Vba2V5XTtcblxuICAgICAgICBpZiAoaGFzLmNhbGwoYWNjLCBrZXkpKSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IG1lcmdlKGFjY1trZXldLCB2YWx1ZSwgb3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfSwgbWVyZ2VUYXJnZXQpO1xufTtcblxudmFyIGFzc2lnbiA9IGZ1bmN0aW9uIGFzc2lnblNpbmdsZVNvdXJjZSh0YXJnZXQsIHNvdXJjZSkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhzb3VyY2UpLnJlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgYWNjW2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCB0YXJnZXQpO1xufTtcblxudmFyIGRlY29kZSA9IGZ1bmN0aW9uIChzdHIsIGRlY29kZXIsIGNoYXJzZXQpIHtcbiAgICB2YXIgc3RyV2l0aG91dFBsdXMgPSBzdHIucmVwbGFjZSgvXFwrL2csICcgJyk7XG4gICAgaWYgKGNoYXJzZXQgPT09ICdpc28tODg1OS0xJykge1xuICAgICAgICAvLyB1bmVzY2FwZSBuZXZlciB0aHJvd3MsIG5vIHRyeS4uLmNhdGNoIG5lZWRlZDpcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzLnJlcGxhY2UoLyVbMC05YS1mXXsyfS9naSwgdW5lc2NhcGUpO1xuICAgIH1cbiAgICAvLyB1dGYtOFxuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyV2l0aG91dFBsdXMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHN0cldpdGhvdXRQbHVzO1xuICAgIH1cbn07XG5cbnZhciBlbmNvZGUgPSBmdW5jdGlvbiBlbmNvZGUoc3RyLCBkZWZhdWx0RW5jb2RlciwgY2hhcnNldCkge1xuICAgIC8vIFRoaXMgY29kZSB3YXMgb3JpZ2luYWxseSB3cml0dGVuIGJ5IEJyaWFuIFdoaXRlIChtc2NkZXgpIGZvciB0aGUgaW8uanMgY29yZSBxdWVyeXN0cmluZyBsaWJyYXJ5LlxuICAgIC8vIEl0IGhhcyBiZWVuIGFkYXB0ZWQgaGVyZSBmb3Igc3RyaWN0ZXIgYWRoZXJlbmNlIHRvIFJGQyAzOTg2XG4gICAgaWYgKHN0ci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHN0cjtcbiAgICB9XG5cbiAgICB2YXIgc3RyaW5nID0gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZycgPyBzdHIgOiBTdHJpbmcoc3RyKTtcblxuICAgIGlmIChjaGFyc2V0ID09PSAnaXNvLTg4NTktMScpIHtcbiAgICAgICAgcmV0dXJuIGVzY2FwZShzdHJpbmcpLnJlcGxhY2UoLyV1WzAtOWEtZl17NH0vZ2ksIGZ1bmN0aW9uICgkMCkge1xuICAgICAgICAgICAgcmV0dXJuICclMjYlMjMnICsgcGFyc2VJbnQoJDAuc2xpY2UoMiksIDE2KSArICclM0InO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29tcGFjdFF1ZXVlKHF1ZXVlKTtcblxuICAgIHJldHVybiB2YWx1ZTtcbn07XG5cbnZhciBpc1JlZ0V4cCA9IGZ1bmN0aW9uIGlzUmVnRXhwKG9iaikge1xuICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSA9PT0gJ1tvYmplY3QgUmVnRXhwXSc7XG59O1xuXG52YXIgaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlcihvYmopIHtcbiAgICBpZiAoIW9iaiB8fCB0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxudmFyIGNvbWJpbmUgPSBmdW5jdGlvbiBjb21iaW5lKGEsIGIpIHtcbiAgICByZXR1cm4gW10uY29uY2F0KGEsIGIpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21iaW5lOiBjb21iaW5lLFxuICAgIGNvbXBhY3Q6IGNvbXBhY3QsXG4gICAgZGVjb2RlOiBkZWNvZGUsXG4gICAgZW5jb2RlOiBlbmNvZGUsXG4gICAgaXNCdWZmZXI6IGlzQnVmZmVyLFxuICAgIGlzUmVnRXhwOiBpc1JlZ0V4cCxcbiAgICBtZXJnZTogbWVyZ2Vcbn07XG4iLCJmdW5jdGlvbiBBZ2VudCgpIHtcbiAgdGhpcy5fZGVmYXVsdHMgPSBbXTtcbn1cblxuW1widXNlXCIsIFwib25cIiwgXCJvbmNlXCIsIFwic2V0XCIsIFwicXVlcnlcIiwgXCJ0eXBlXCIsIFwiYWNjZXB0XCIsIFwiYXV0aFwiLCBcIndpdGhDcmVkZW50aWFsc1wiLCBcInNvcnRRdWVyeVwiLCBcInJldHJ5XCIsIFwib2tcIiwgXCJyZWRpcmVjdHNcIixcbiBcInRpbWVvdXRcIiwgXCJidWZmZXJcIiwgXCJzZXJpYWxpemVcIiwgXCJwYXJzZVwiLCBcImNhXCIsIFwia2V5XCIsIFwicGZ4XCIsIFwiY2VydFwiXS5mb3JFYWNoKGZuID0+IHtcbiAgLyoqIERlZmF1bHQgc2V0dGluZyBmb3IgYWxsIHJlcXVlc3RzIGZyb20gdGhpcyBhZ2VudCAqL1xuICBBZ2VudC5wcm90b3R5cGVbZm5dID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIHRoaXMuX2RlZmF1bHRzLnB1c2goe2ZuLCBhcmdzfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbn0pO1xuXG5BZ2VudC5wcm90b3R5cGUuX3NldERlZmF1bHRzID0gZnVuY3Rpb24ocmVxKSB7XG4gICAgdGhpcy5fZGVmYXVsdHMuZm9yRWFjaChkZWYgPT4ge1xuICAgICAgcmVxW2RlZi5mbl0uYXBwbHkocmVxLCBkZWYuYXJncyk7XG4gICAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFnZW50O1xuIiwiLyoqXG4gKiBSb290IHJlZmVyZW5jZSBmb3IgaWZyYW1lcy5cbiAqL1xuXG5sZXQgcm9vdDtcbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykgeyAvLyBCcm93c2VyIHdpbmRvd1xuICByb290ID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHsgLy8gV2ViIFdvcmtlclxuICByb290ID0gc2VsZjtcbn0gZWxzZSB7IC8vIE90aGVyIGVudmlyb25tZW50c1xuICBjb25zb2xlLndhcm4oXCJVc2luZyBicm93c2VyLW9ubHkgdmVyc2lvbiBvZiBzdXBlcmFnZW50IGluIG5vbi1icm93c2VyIGVudmlyb25tZW50XCIpO1xuICByb290ID0gdGhpcztcbn1cblxuY29uc3QgRW1pdHRlciA9IHJlcXVpcmUoJ2NvbXBvbmVudC1lbWl0dGVyJyk7XG5jb25zdCBSZXF1ZXN0QmFzZSA9IHJlcXVpcmUoJy4vcmVxdWVzdC1iYXNlJyk7XG5jb25zdCBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5jb25zdCBSZXNwb25zZUJhc2UgPSByZXF1aXJlKCcuL3Jlc3BvbnNlLWJhc2UnKTtcbmNvbnN0IEFnZW50ID0gcmVxdWlyZSgnLi9hZ2VudC1iYXNlJyk7XG5cbi8qKlxuICogTm9vcC5cbiAqL1xuXG5mdW5jdGlvbiBub29wKCl7fTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RgLlxuICovXG5cbmNvbnN0IHJlcXVlc3QgPSBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtZXRob2QsIHVybCkge1xuICAvLyBjYWxsYmFja1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgdXJsKSB7XG4gICAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QoJ0dFVCcsIG1ldGhvZCkuZW5kKHVybCk7XG4gIH1cblxuICAvLyB1cmwgZmlyc3RcbiAgaWYgKDEgPT0gYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5SZXF1ZXN0KCdHRVQnLCBtZXRob2QpO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBleHBvcnRzLlJlcXVlc3QobWV0aG9kLCB1cmwpO1xufTtcblxuZXhwb3J0cy5SZXF1ZXN0ID0gUmVxdWVzdDtcblxuLyoqXG4gKiBEZXRlcm1pbmUgWEhSLlxuICovXG5cbnJlcXVlc3QuZ2V0WEhSID0gKCkgPT4ge1xuICBpZiAocm9vdC5YTUxIdHRwUmVxdWVzdFxuICAgICAgJiYgKCFyb290LmxvY2F0aW9uIHx8ICdmaWxlOicgIT0gcm9vdC5sb2NhdGlvbi5wcm90b2NvbFxuICAgICAgICAgIHx8ICFyb290LkFjdGl2ZVhPYmplY3QpKSB7XG4gICAgcmV0dXJuIG5ldyBYTUxIdHRwUmVxdWVzdDtcbiAgfSBlbHNlIHtcbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01pY3Jvc29mdC5YTUxIVFRQJyk7IH0gY2F0Y2goZSkge31cbiAgICB0cnkgeyByZXR1cm4gbmV3IEFjdGl2ZVhPYmplY3QoJ01zeG1sMi5YTUxIVFRQLjYuMCcpOyB9IGNhdGNoKGUpIHt9XG4gICAgdHJ5IHsgcmV0dXJuIG5ldyBBY3RpdmVYT2JqZWN0KCdNc3htbDIuWE1MSFRUUC4zLjAnKTsgfSBjYXRjaChlKSB7fVxuICAgIHRyeSB7IHJldHVybiBuZXcgQWN0aXZlWE9iamVjdCgnTXN4bWwyLlhNTEhUVFAnKTsgfSBjYXRjaChlKSB7fVxuICB9XG4gIHRocm93IEVycm9yKFwiQnJvd3Nlci1vbmx5IHZlcnNpb24gb2Ygc3VwZXJhZ2VudCBjb3VsZCBub3QgZmluZCBYSFJcIik7XG59O1xuXG4vKipcbiAqIFJlbW92ZXMgbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZSwgYWRkZWQgdG8gc3VwcG9ydCBJRS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc1xuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuY29uc3QgdHJpbSA9ICcnLnRyaW1cbiAgPyBzID0+IHMudHJpbSgpXG4gIDogcyA9PiBzLnJlcGxhY2UoLyheXFxzKnxcXHMqJCkvZywgJycpO1xuXG4vKipcbiAqIFNlcmlhbGl6ZSB0aGUgZ2l2ZW4gYG9iamAuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IG9ialxuICogQHJldHVybiB7U3RyaW5nfVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gc2VyaWFsaXplKG9iaikge1xuICBpZiAoIWlzT2JqZWN0KG9iaikpIHJldHVybiBvYmo7XG4gIGNvbnN0IHBhaXJzID0gW107XG4gIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIG9ialtrZXldKTtcbiAgfVxuICByZXR1cm4gcGFpcnMuam9pbignJicpO1xufVxuXG4vKipcbiAqIEhlbHBzICdzZXJpYWxpemUnIHdpdGggc2VyaWFsaXppbmcgYXJyYXlzLlxuICogTXV0YXRlcyB0aGUgcGFpcnMgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtBcnJheX0gcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXlcbiAqIEBwYXJhbSB7TWl4ZWR9IHZhbFxuICovXG5cbmZ1bmN0aW9uIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBrZXksIHZhbCkge1xuICBpZiAodmFsICE9IG51bGwpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XG4gICAgICB2YWwuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgcHVzaEVuY29kZWRLZXlWYWx1ZVBhaXIocGFpcnMsIGtleSwgdik7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbCkpIHtcbiAgICAgIGZvcihjb25zdCBzdWJrZXkgaW4gdmFsKSB7XG4gICAgICAgIHB1c2hFbmNvZGVkS2V5VmFsdWVQYWlyKHBhaXJzLCBgJHtrZXl9WyR7c3Via2V5fV1gLCB2YWxbc3Via2V5XSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSlcbiAgICAgICAgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsKSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZhbCA9PT0gbnVsbCkge1xuICAgIHBhaXJzLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KGtleSkpO1xuICB9XG59XG5cbi8qKlxuICogRXhwb3NlIHNlcmlhbGl6YXRpb24gbWV0aG9kLlxuICovXG5cbnJlcXVlc3Quc2VyaWFsaXplT2JqZWN0ID0gc2VyaWFsaXplO1xuXG4vKipcbiAgKiBQYXJzZSB0aGUgZ2l2ZW4geC13d3ctZm9ybS11cmxlbmNvZGVkIGBzdHJgLlxuICAqXG4gICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICAqIEByZXR1cm4ge09iamVjdH1cbiAgKiBAYXBpIHByaXZhdGVcbiAgKi9cblxuZnVuY3Rpb24gcGFyc2VTdHJpbmcoc3RyKSB7XG4gIGNvbnN0IG9iaiA9IHt9O1xuICBjb25zdCBwYWlycyA9IHN0ci5zcGxpdCgnJicpO1xuICBsZXQgcGFpcjtcbiAgbGV0IHBvcztcblxuICBmb3IgKGxldCBpID0gMCwgbGVuID0gcGFpcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICBwYWlyID0gcGFpcnNbaV07XG4gICAgcG9zID0gcGFpci5pbmRleE9mKCc9Jyk7XG4gICAgaWYgKHBvcyA9PSAtMSkge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyKV0gPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgb2JqW2RlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKDAsIHBvcykpXSA9XG4gICAgICAgIGRlY29kZVVSSUNvbXBvbmVudChwYWlyLnNsaWNlKHBvcyArIDEpKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gb2JqO1xufVxuXG4vKipcbiAqIEV4cG9zZSBwYXJzZXIuXG4gKi9cblxucmVxdWVzdC5wYXJzZVN0cmluZyA9IHBhcnNlU3RyaW5nO1xuXG4vKipcbiAqIERlZmF1bHQgTUlNRSB0eXBlIG1hcC5cbiAqXG4gKiAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKi9cblxucmVxdWVzdC50eXBlcyA9IHtcbiAgaHRtbDogJ3RleHQvaHRtbCcsXG4gIGpzb246ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgeG1sOiAndGV4dC94bWwnLFxuICB1cmxlbmNvZGVkOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0nOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcbiAgJ2Zvcm0tZGF0YSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG59O1xuXG4vKipcbiAqIERlZmF1bHQgc2VyaWFsaXphdGlvbiBtYXAuXG4gKlxuICogICAgIHN1cGVyYWdlbnQuc2VyaWFsaXplWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKG9iail7XG4gKiAgICAgICByZXR1cm4gJ2dlbmVyYXRlZCB4bWwgaGVyZSc7XG4gKiAgICAgfTtcbiAqXG4gKi9cblxucmVxdWVzdC5zZXJpYWxpemUgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBzZXJpYWxpemUsXG4gICdhcHBsaWNhdGlvbi9qc29uJzogSlNPTi5zdHJpbmdpZnlcbn07XG5cbi8qKlxuICAqIERlZmF1bHQgcGFyc2Vycy5cbiAgKlxuICAqICAgICBzdXBlcmFnZW50LnBhcnNlWydhcHBsaWNhdGlvbi94bWwnXSA9IGZ1bmN0aW9uKHN0cil7XG4gICogICAgICAgcmV0dXJuIHsgb2JqZWN0IHBhcnNlZCBmcm9tIHN0ciB9O1xuICAqICAgICB9O1xuICAqXG4gICovXG5cbnJlcXVlc3QucGFyc2UgPSB7XG4gICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnOiBwYXJzZVN0cmluZyxcbiAgJ2FwcGxpY2F0aW9uL2pzb24nOiBKU09OLnBhcnNlXG59O1xuXG4vKipcbiAqIFBhcnNlIHRoZSBnaXZlbiBoZWFkZXIgYHN0cmAgaW50b1xuICogYW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG1hcHBlZCBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gcGFyc2VIZWFkZXIoc3RyKSB7XG4gIGNvbnN0IGxpbmVzID0gc3RyLnNwbGl0KC9cXHI/XFxuLyk7XG4gIGNvbnN0IGZpZWxkcyA9IHt9O1xuICBsZXQgaW5kZXg7XG4gIGxldCBsaW5lO1xuICBsZXQgZmllbGQ7XG4gIGxldCB2YWw7XG5cbiAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGxpbmVzLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIGluZGV4ID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAgaWYgKGluZGV4ID09PSAtMSkgeyAvLyBjb3VsZCBiZSBlbXB0eSBsaW5lLCBqdXN0IHNraXAgaXRcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBmaWVsZCA9IGxpbmUuc2xpY2UoMCwgaW5kZXgpLnRvTG93ZXJDYXNlKCk7XG4gICAgdmFsID0gdHJpbShsaW5lLnNsaWNlKGluZGV4ICsgMSkpO1xuICAgIGZpZWxkc1tmaWVsZF0gPSB2YWw7XG4gIH1cblxuICByZXR1cm4gZmllbGRzO1xufVxuXG4vKipcbiAqIENoZWNrIGlmIGBtaW1lYCBpcyBqc29uIG9yIGhhcyAranNvbiBzdHJ1Y3R1cmVkIHN5bnRheCBzdWZmaXguXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1pbWVcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBpc0pTT04obWltZSkge1xuICAvLyBzaG91bGQgbWF0Y2ggL2pzb24gb3IgK2pzb25cbiAgLy8gYnV0IG5vdCAvanNvbi1zZXFcbiAgcmV0dXJuIC9bXFwvK11qc29uKCR8W14tXFx3XSkvLnRlc3QobWltZSk7XG59XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVzcG9uc2VgIHdpdGggdGhlIGdpdmVuIGB4aHJgLlxuICpcbiAqICAtIHNldCBmbGFncyAoLm9rLCAuZXJyb3IsIGV0YylcbiAqICAtIHBhcnNlIGhlYWRlclxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICBBbGlhc2luZyBgc3VwZXJhZ2VudGAgYXMgYHJlcXVlc3RgIGlzIG5pY2U6XG4gKlxuICogICAgICByZXF1ZXN0ID0gc3VwZXJhZ2VudDtcbiAqXG4gKiAgV2UgY2FuIHVzZSB0aGUgcHJvbWlzZS1saWtlIEFQSSwgb3IgcGFzcyBjYWxsYmFja3M6XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnLycpLmVuZChmdW5jdGlvbihyZXMpe30pO1xuICogICAgICByZXF1ZXN0LmdldCgnLycsIGZ1bmN0aW9uKHJlcyl7fSk7XG4gKlxuICogIFNlbmRpbmcgZGF0YSBjYW4gYmUgY2hhaW5lZDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiAgT3IgcGFzc2VkIHRvIGAuc2VuZCgpYDpcbiAqXG4gKiAgICAgIHJlcXVlc3RcbiAqICAgICAgICAucG9zdCgnL3VzZXInKVxuICogICAgICAgIC5zZW5kKHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqICBPciBwYXNzZWQgdG8gYC5wb3N0KClgOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9KVxuICogICAgICAgIC5lbmQoZnVuY3Rpb24ocmVzKXt9KTtcbiAqXG4gKiBPciBmdXJ0aGVyIHJlZHVjZWQgdG8gYSBzaW5nbGUgY2FsbCBmb3Igc2ltcGxlIGNhc2VzOlxuICpcbiAqICAgICAgcmVxdWVzdFxuICogICAgICAgIC5wb3N0KCcvdXNlcicsIHsgbmFtZTogJ3RqJyB9LCBmdW5jdGlvbihyZXMpe30pO1xuICpcbiAqIEBwYXJhbSB7WE1MSFRUUFJlcXVlc3R9IHhoclxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIFJlc3BvbnNlKHJlcSkge1xuICB0aGlzLnJlcSA9IHJlcTtcbiAgdGhpcy54aHIgPSB0aGlzLnJlcS54aHI7XG4gIC8vIHJlc3BvbnNlVGV4dCBpcyBhY2Nlc3NpYmxlIG9ubHkgaWYgcmVzcG9uc2VUeXBlIGlzICcnIG9yICd0ZXh0JyBhbmQgb24gb2xkZXIgYnJvd3NlcnNcbiAgdGhpcy50ZXh0ID0gKCh0aGlzLnJlcS5tZXRob2QgIT0nSEVBRCcgJiYgKHRoaXMueGhyLnJlc3BvbnNlVHlwZSA9PT0gJycgfHwgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndGV4dCcpKSB8fCB0eXBlb2YgdGhpcy54aHIucmVzcG9uc2VUeXBlID09PSAndW5kZWZpbmVkJylcbiAgICAgPyB0aGlzLnhoci5yZXNwb25zZVRleHRcbiAgICAgOiBudWxsO1xuICB0aGlzLnN0YXR1c1RleHQgPSB0aGlzLnJlcS54aHIuc3RhdHVzVGV4dDtcbiAgbGV0IHN0YXR1cyA9IHRoaXMueGhyLnN0YXR1cztcbiAgLy8gaGFuZGxlIElFOSBidWc6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTAwNDY5NzIvbXNpZS1yZXR1cm5zLXN0YXR1cy1jb2RlLW9mLTEyMjMtZm9yLWFqYXgtcmVxdWVzdFxuICBpZiAoc3RhdHVzID09PSAxMjIzKSB7XG4gICAgc3RhdHVzID0gMjA0O1xuICB9XG4gIHRoaXMuX3NldFN0YXR1c1Byb3BlcnRpZXMoc3RhdHVzKTtcbiAgdGhpcy5oZWFkZXIgPSB0aGlzLmhlYWRlcnMgPSBwYXJzZUhlYWRlcih0aGlzLnhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSk7XG4gIC8vIGdldEFsbFJlc3BvbnNlSGVhZGVycyBzb21ldGltZXMgZmFsc2VseSByZXR1cm5zIFwiXCIgZm9yIENPUlMgcmVxdWVzdHMsIGJ1dFxuICAvLyBnZXRSZXNwb25zZUhlYWRlciBzdGlsbCB3b3Jrcy4gc28gd2UgZ2V0IGNvbnRlbnQtdHlwZSBldmVuIGlmIGdldHRpbmdcbiAgLy8gb3RoZXIgaGVhZGVycyBmYWlscy5cbiAgdGhpcy5oZWFkZXJbJ2NvbnRlbnQtdHlwZSddID0gdGhpcy54aHIuZ2V0UmVzcG9uc2VIZWFkZXIoJ2NvbnRlbnQtdHlwZScpO1xuICB0aGlzLl9zZXRIZWFkZXJQcm9wZXJ0aWVzKHRoaXMuaGVhZGVyKTtcblxuICBpZiAobnVsbCA9PT0gdGhpcy50ZXh0ICYmIHJlcS5fcmVzcG9uc2VUeXBlKSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy54aHIucmVzcG9uc2U7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5ib2R5ID0gdGhpcy5yZXEubWV0aG9kICE9ICdIRUFEJ1xuICAgICAgPyB0aGlzLl9wYXJzZUJvZHkodGhpcy50ZXh0ID8gdGhpcy50ZXh0IDogdGhpcy54aHIucmVzcG9uc2UpXG4gICAgICA6IG51bGw7XG4gIH1cbn1cblxuUmVzcG9uc2VCYXNlKFJlc3BvbnNlLnByb3RvdHlwZSk7XG5cbi8qKlxuICogUGFyc2UgdGhlIGdpdmVuIGJvZHkgYHN0cmAuXG4gKlxuICogVXNlZCBmb3IgYXV0by1wYXJzaW5nIG9mIGJvZGllcy4gUGFyc2Vyc1xuICogYXJlIGRlZmluZWQgb24gdGhlIGBzdXBlcmFnZW50LnBhcnNlYCBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7TWl4ZWR9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUuX3BhcnNlQm9keSA9IGZ1bmN0aW9uKHN0cikge1xuICBsZXQgcGFyc2UgPSByZXF1ZXN0LnBhcnNlW3RoaXMudHlwZV07XG4gIGlmICh0aGlzLnJlcS5fcGFyc2VyKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxLl9wYXJzZXIodGhpcywgc3RyKTtcbiAgfVxuICBpZiAoIXBhcnNlICYmIGlzSlNPTih0aGlzLnR5cGUpKSB7XG4gICAgcGFyc2UgPSByZXF1ZXN0LnBhcnNlWydhcHBsaWNhdGlvbi9qc29uJ107XG4gIH1cbiAgcmV0dXJuIHBhcnNlICYmIHN0ciAmJiAoc3RyLmxlbmd0aCB8fCBzdHIgaW5zdGFuY2VvZiBPYmplY3QpXG4gICAgPyBwYXJzZShzdHIpXG4gICAgOiBudWxsO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gYW4gYEVycm9yYCByZXByZXNlbnRhdGl2ZSBvZiB0aGlzIHJlc3BvbnNlLlxuICpcbiAqIEByZXR1cm4ge0Vycm9yfVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXNwb25zZS5wcm90b3R5cGUudG9FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIGNvbnN0IHJlcSA9IHRoaXMucmVxO1xuICBjb25zdCBtZXRob2QgPSByZXEubWV0aG9kO1xuICBjb25zdCB1cmwgPSByZXEudXJsO1xuXG4gIGNvbnN0IG1zZyA9IGBjYW5ub3QgJHttZXRob2R9ICR7dXJsfSAoJHt0aGlzLnN0YXR1c30pYDtcbiAgY29uc3QgZXJyID0gbmV3IEVycm9yKG1zZyk7XG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IG1ldGhvZDtcbiAgZXJyLnVybCA9IHVybDtcblxuICByZXR1cm4gZXJyO1xufTtcblxuLyoqXG4gKiBFeHBvc2UgYFJlc3BvbnNlYC5cbiAqL1xuXG5yZXF1ZXN0LlJlc3BvbnNlID0gUmVzcG9uc2U7XG5cbi8qKlxuICogSW5pdGlhbGl6ZSBhIG5ldyBgUmVxdWVzdGAgd2l0aCB0aGUgZ2l2ZW4gYG1ldGhvZGAgYW5kIGB1cmxgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gUmVxdWVzdChtZXRob2QsIHVybCkge1xuICBjb25zdCBzZWxmID0gdGhpcztcbiAgdGhpcy5fcXVlcnkgPSB0aGlzLl9xdWVyeSB8fCBbXTtcbiAgdGhpcy5tZXRob2QgPSBtZXRob2Q7XG4gIHRoaXMudXJsID0gdXJsO1xuICB0aGlzLmhlYWRlciA9IHt9OyAvLyBwcmVzZXJ2ZXMgaGVhZGVyIG5hbWUgY2FzZVxuICB0aGlzLl9oZWFkZXIgPSB7fTsgLy8gY29lcmNlcyBoZWFkZXIgbmFtZXMgdG8gbG93ZXJjYXNlXG4gIHRoaXMub24oJ2VuZCcsICgpID0+IHtcbiAgICBsZXQgZXJyID0gbnVsbDtcbiAgICBsZXQgcmVzID0gbnVsbDtcblxuICAgIHRyeSB7XG4gICAgICByZXMgPSBuZXcgUmVzcG9uc2Uoc2VsZik7XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoJ1BhcnNlciBpcyB1bmFibGUgdG8gcGFyc2UgdGhlIHJlc3BvbnNlJyk7XG4gICAgICBlcnIucGFyc2UgPSB0cnVlO1xuICAgICAgZXJyLm9yaWdpbmFsID0gZTtcbiAgICAgIC8vIGlzc3VlICM2NzU6IHJldHVybiB0aGUgcmF3IHJlc3BvbnNlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICBpZiAoc2VsZi54aHIpIHtcbiAgICAgICAgLy8gaWU5IGRvZXNuJ3QgaGF2ZSAncmVzcG9uc2UnIHByb3BlcnR5XG4gICAgICAgIGVyci5yYXdSZXNwb25zZSA9IHR5cGVvZiBzZWxmLnhoci5yZXNwb25zZVR5cGUgPT0gJ3VuZGVmaW5lZCcgPyBzZWxmLnhoci5yZXNwb25zZVRleHQgOiBzZWxmLnhoci5yZXNwb25zZTtcbiAgICAgICAgLy8gaXNzdWUgIzg3NjogcmV0dXJuIHRoZSBodHRwIHN0YXR1cyBjb2RlIGlmIHRoZSByZXNwb25zZSBwYXJzaW5nIGZhaWxzXG4gICAgICAgIGVyci5zdGF0dXMgPSBzZWxmLnhoci5zdGF0dXMgPyBzZWxmLnhoci5zdGF0dXMgOiBudWxsO1xuICAgICAgICBlcnIuc3RhdHVzQ29kZSA9IGVyci5zdGF0dXM7IC8vIGJhY2t3YXJkcy1jb21wYXQgb25seVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZXJyLnJhd1Jlc3BvbnNlID0gbnVsbDtcbiAgICAgICAgZXJyLnN0YXR1cyA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBzZWxmLmNhbGxiYWNrKGVycik7XG4gICAgfVxuXG4gICAgc2VsZi5lbWl0KCdyZXNwb25zZScsIHJlcyk7XG5cbiAgICBsZXQgbmV3X2VycjtcbiAgICB0cnkge1xuICAgICAgaWYgKCFzZWxmLl9pc1Jlc3BvbnNlT0socmVzKSkge1xuICAgICAgICBuZXdfZXJyID0gbmV3IEVycm9yKHJlcy5zdGF0dXNUZXh0IHx8ICdVbnN1Y2Nlc3NmdWwgSFRUUCByZXNwb25zZScpO1xuICAgICAgfVxuICAgIH0gY2F0Y2goY3VzdG9tX2Vycikge1xuICAgICAgbmV3X2VyciA9IGN1c3RvbV9lcnI7IC8vIG9rKCkgY2FsbGJhY2sgY2FuIHRocm93XG4gICAgfVxuXG4gICAgLy8gIzEwMDAgZG9uJ3QgY2F0Y2ggZXJyb3JzIGZyb20gdGhlIGNhbGxiYWNrIHRvIGF2b2lkIGRvdWJsZSBjYWxsaW5nIGl0XG4gICAgaWYgKG5ld19lcnIpIHtcbiAgICAgIG5ld19lcnIub3JpZ2luYWwgPSBlcnI7XG4gICAgICBuZXdfZXJyLnJlc3BvbnNlID0gcmVzO1xuICAgICAgbmV3X2Vyci5zdGF0dXMgPSByZXMuc3RhdHVzO1xuICAgICAgc2VsZi5jYWxsYmFjayhuZXdfZXJyLCByZXMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzZWxmLmNhbGxiYWNrKG51bGwsIHJlcyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBNaXhpbiBgRW1pdHRlcmAgYW5kIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxuRW1pdHRlcihSZXF1ZXN0LnByb3RvdHlwZSk7XG5SZXF1ZXN0QmFzZShSZXF1ZXN0LnByb3RvdHlwZSk7XG5cbi8qKlxuICogU2V0IENvbnRlbnQtVHlwZSB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy54bWwgPSAnYXBwbGljYXRpb24veG1sJztcbiAqXG4gKiAgICAgIHJlcXVlc3QucG9zdCgnLycpXG4gKiAgICAgICAgLnR5cGUoJ3htbCcpXG4gKiAgICAgICAgLnNlbmQoeG1sc3RyaW5nKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvJylcbiAqICAgICAgICAudHlwZSgnYXBwbGljYXRpb24veG1sJylcbiAqICAgICAgICAuc2VuZCh4bWxzdHJpbmcpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS50eXBlID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdDb250ZW50LVR5cGUnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEFjY2VwdCB0byBgdHlwZWAsIG1hcHBpbmcgdmFsdWVzIGZyb20gYHJlcXVlc3QudHlwZXNgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgc3VwZXJhZ2VudC50eXBlcy5qc29uID0gJ2FwcGxpY2F0aW9uL2pzb24nO1xuICpcbiAqICAgICAgcmVxdWVzdC5nZXQoJy9hZ2VudCcpXG4gKiAgICAgICAgLmFjY2VwdCgnanNvbicpXG4gKiAgICAgICAgLmVuZChjYWxsYmFjayk7XG4gKlxuICogICAgICByZXF1ZXN0LmdldCgnL2FnZW50JylcbiAqICAgICAgICAuYWNjZXB0KCdhcHBsaWNhdGlvbi9qc29uJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYWNjZXB0XG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYWNjZXB0ID0gZnVuY3Rpb24odHlwZSl7XG4gIHRoaXMuc2V0KCdBY2NlcHQnLCByZXF1ZXN0LnR5cGVzW3R5cGVdIHx8IHR5cGUpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IEF1dGhvcml6YXRpb24gZmllbGQgdmFsdWUgd2l0aCBgdXNlcmAgYW5kIGBwYXNzYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXNlclxuICogQHBhcmFtIHtTdHJpbmd9IFtwYXNzXSBvcHRpb25hbCBpbiBjYXNlIG9mIHVzaW5nICdiZWFyZXInIGFzIHR5cGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIHdpdGggJ3R5cGUnIHByb3BlcnR5ICdhdXRvJywgJ2Jhc2ljJyBvciAnYmVhcmVyJyAoZGVmYXVsdCAnYmFzaWMnKVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmF1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzLCBvcHRpb25zKXtcbiAgaWYgKDEgPT09IGFyZ3VtZW50cy5sZW5ndGgpIHBhc3MgPSAnJztcbiAgaWYgKHR5cGVvZiBwYXNzID09PSAnb2JqZWN0JyAmJiBwYXNzICE9PSBudWxsKSB7IC8vIHBhc3MgaXMgb3B0aW9uYWwgYW5kIGNhbiBiZSByZXBsYWNlZCB3aXRoIG9wdGlvbnNcbiAgICBvcHRpb25zID0gcGFzcztcbiAgICBwYXNzID0gJyc7XG4gIH1cbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHtcbiAgICAgIHR5cGU6ICdmdW5jdGlvbicgPT09IHR5cGVvZiBidG9hID8gJ2Jhc2ljJyA6ICdhdXRvJyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZW5jb2RlciA9IHN0cmluZyA9PiB7XG4gICAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBidG9hKSB7XG4gICAgICByZXR1cm4gYnRvYShzdHJpbmcpO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCB1c2UgYmFzaWMgYXV0aCwgYnRvYSBpcyBub3QgYSBmdW5jdGlvbicpO1xuICB9O1xuXG4gIHJldHVybiB0aGlzLl9hdXRoKHVzZXIsIHBhc3MsIG9wdGlvbnMsIGVuY29kZXIpO1xufTtcblxuLyoqXG4gKiBBZGQgcXVlcnktc3RyaW5nIGB2YWxgLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgcmVxdWVzdC5nZXQoJy9zaG9lcycpXG4gKiAgICAgLnF1ZXJ5KCdzaXplPTEwJylcbiAqICAgICAucXVlcnkoeyBjb2xvcjogJ2JsdWUnIH0pXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSB2YWxcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5xdWVyeSA9IGZ1bmN0aW9uKHZhbCl7XG4gIGlmICgnc3RyaW5nJyAhPSB0eXBlb2YgdmFsKSB2YWwgPSBzZXJpYWxpemUodmFsKTtcbiAgaWYgKHZhbCkgdGhpcy5fcXVlcnkucHVzaCh2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVldWUgdGhlIGdpdmVuIGBmaWxlYCBhcyBhbiBhdHRhY2htZW50IHRvIHRoZSBzcGVjaWZpZWQgYGZpZWxkYCxcbiAqIHdpdGggb3B0aW9uYWwgYG9wdGlvbnNgIChvciBmaWxlbmFtZSkuXG4gKlxuICogYGBgIGpzXG4gKiByZXF1ZXN0LnBvc3QoJy91cGxvYWQnKVxuICogICAuYXR0YWNoKCdjb250ZW50JywgbmV3IEJsb2IoWyc8YSBpZD1cImFcIj48YiBpZD1cImJcIj5oZXkhPC9iPjwvYT4nXSwgeyB0eXBlOiBcInRleHQvaHRtbFwifSkpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGZpZWxkXG4gKiBAcGFyYW0ge0Jsb2J8RmlsZX0gZmlsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBvcHRpb25zXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuYXR0YWNoID0gZnVuY3Rpb24oZmllbGQsIGZpbGUsIG9wdGlvbnMpe1xuICBpZiAoZmlsZSkge1xuICAgIGlmICh0aGlzLl9kYXRhKSB7XG4gICAgICB0aHJvdyBFcnJvcihcInN1cGVyYWdlbnQgY2FuJ3QgbWl4IC5zZW5kKCkgYW5kIC5hdHRhY2goKVwiKTtcbiAgICB9XG5cbiAgICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChmaWVsZCwgZmlsZSwgb3B0aW9ucyB8fCBmaWxlLm5hbWUpO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2dldEZvcm1EYXRhID0gZnVuY3Rpb24oKXtcbiAgaWYgKCF0aGlzLl9mb3JtRGF0YSkge1xuICAgIHRoaXMuX2Zvcm1EYXRhID0gbmV3IHJvb3QuRm9ybURhdGEoKTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZm9ybURhdGE7XG59O1xuXG4vKipcbiAqIEludm9rZSB0aGUgY2FsbGJhY2sgd2l0aCBgZXJyYCBhbmQgYHJlc2BcbiAqIGFuZCBoYW5kbGUgYXJpdHkgY2hlY2suXG4gKlxuICogQHBhcmFtIHtFcnJvcn0gZXJyXG4gKiBAcGFyYW0ge1Jlc3BvbnNlfSByZXNcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3QucHJvdG90eXBlLmNhbGxiYWNrID0gZnVuY3Rpb24oZXJyLCByZXMpe1xuICBpZiAodGhpcy5fc2hvdWxkUmV0cnkoZXJyLCByZXMpKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JldHJ5KCk7XG4gIH1cblxuICBjb25zdCBmbiA9IHRoaXMuX2NhbGxiYWNrO1xuICB0aGlzLmNsZWFyVGltZW91dCgpO1xuXG4gIGlmIChlcnIpIHtcbiAgICBpZiAodGhpcy5fbWF4UmV0cmllcykgZXJyLnJldHJpZXMgPSB0aGlzLl9yZXRyaWVzIC0gMTtcbiAgICB0aGlzLmVtaXQoJ2Vycm9yJywgZXJyKTtcbiAgfVxuXG4gIGZuKGVyciwgcmVzKTtcbn07XG5cbi8qKlxuICogSW52b2tlIGNhbGxiYWNrIHdpdGggeC1kb21haW4gZXJyb3IuXG4gKlxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdC5wcm90b3R5cGUuY3Jvc3NEb21haW5FcnJvciA9IGZ1bmN0aW9uKCl7XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcignUmVxdWVzdCBoYXMgYmVlbiB0ZXJtaW5hdGVkXFxuUG9zc2libGUgY2F1c2VzOiB0aGUgbmV0d29yayBpcyBvZmZsaW5lLCBPcmlnaW4gaXMgbm90IGFsbG93ZWQgYnkgQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luLCB0aGUgcGFnZSBpcyBiZWluZyB1bmxvYWRlZCwgZXRjLicpO1xuICBlcnIuY3Jvc3NEb21haW4gPSB0cnVlO1xuXG4gIGVyci5zdGF0dXMgPSB0aGlzLnN0YXR1cztcbiAgZXJyLm1ldGhvZCA9IHRoaXMubWV0aG9kO1xuICBlcnIudXJsID0gdGhpcy51cmw7XG5cbiAgdGhpcy5jYWxsYmFjayhlcnIpO1xufTtcblxuLy8gVGhpcyBvbmx5IHdhcm5zLCBiZWNhdXNlIHRoZSByZXF1ZXN0IGlzIHN0aWxsIGxpa2VseSB0byB3b3JrXG5SZXF1ZXN0LnByb3RvdHlwZS5idWZmZXIgPSBSZXF1ZXN0LnByb3RvdHlwZS5jYSA9IFJlcXVlc3QucHJvdG90eXBlLmFnZW50ID0gZnVuY3Rpb24oKXtcbiAgY29uc29sZS53YXJuKFwiVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIGJyb3dzZXIgdmVyc2lvbiBvZiBzdXBlcmFnZW50XCIpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIFRoaXMgdGhyb3dzLCBiZWNhdXNlIGl0IGNhbid0IHNlbmQvcmVjZWl2ZSBkYXRhIGFzIGV4cGVjdGVkXG5SZXF1ZXN0LnByb3RvdHlwZS5waXBlID0gUmVxdWVzdC5wcm90b3R5cGUud3JpdGUgPSAoKSA9PiB7XG4gIHRocm93IEVycm9yKFwiU3RyZWFtaW5nIGlzIG5vdCBzdXBwb3J0ZWQgaW4gYnJvd3NlciB2ZXJzaW9uIG9mIHN1cGVyYWdlbnRcIik7XG59O1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGEgaG9zdCBvYmplY3QsXG4gKiB3ZSBkb24ndCB3YW50IHRvIHNlcmlhbGl6ZSB0aGVzZSA6KVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuUmVxdWVzdC5wcm90b3R5cGUuX2lzSG9zdCA9IGZ1bmN0aW9uIF9pc0hvc3Qob2JqKSB7XG4gIC8vIE5hdGl2ZSBvYmplY3RzIHN0cmluZ2lmeSB0byBbb2JqZWN0IEZpbGVdLCBbb2JqZWN0IEJsb2JdLCBbb2JqZWN0IEZvcm1EYXRhXSwgZXRjLlxuICByZXR1cm4gb2JqICYmICdvYmplY3QnID09PSB0eXBlb2Ygb2JqICYmICFBcnJheS5pc0FycmF5KG9iaikgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgIT09ICdbb2JqZWN0IE9iamVjdF0nO1xufVxuXG4vKipcbiAqIEluaXRpYXRlIHJlcXVlc3QsIGludm9raW5nIGNhbGxiYWNrIGBmbihyZXMpYFxuICogd2l0aCBhbiBpbnN0YW5jZW9mIGBSZXNwb25zZWAuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0LnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbihmbil7XG4gIGlmICh0aGlzLl9lbmRDYWxsZWQpIHtcbiAgICBjb25zb2xlLndhcm4oXCJXYXJuaW5nOiAuZW5kKCkgd2FzIGNhbGxlZCB0d2ljZS4gVGhpcyBpcyBub3Qgc3VwcG9ydGVkIGluIHN1cGVyYWdlbnRcIik7XG4gIH1cbiAgdGhpcy5fZW5kQ2FsbGVkID0gdHJ1ZTtcblxuICAvLyBzdG9yZSBjYWxsYmFja1xuICB0aGlzLl9jYWxsYmFjayA9IGZuIHx8IG5vb3A7XG5cbiAgLy8gcXVlcnlzdHJpbmdcbiAgdGhpcy5fZmluYWxpemVRdWVyeVN0cmluZygpO1xuXG4gIHRoaXMuX2VuZCgpO1xufTtcblxuUmVxdWVzdC5wcm90b3R5cGUuX2VuZCA9IGZ1bmN0aW9uKCkge1xuICBpZiAodGhpcy5fYWJvcnRlZCkgcmV0dXJuIHRoaXMuY2FsbGJhY2soRXJyb3IoXCJUaGUgcmVxdWVzdCBoYXMgYmVlbiBhYm9ydGVkIGV2ZW4gYmVmb3JlIC5lbmQoKSB3YXMgY2FsbGVkXCIpKTtcblxuICBjb25zdCBzZWxmID0gdGhpcztcbiAgY29uc3QgeGhyID0gKHRoaXMueGhyID0gcmVxdWVzdC5nZXRYSFIoKSk7XG4gIGxldCBkYXRhID0gdGhpcy5fZm9ybURhdGEgfHwgdGhpcy5fZGF0YTtcblxuICB0aGlzLl9zZXRUaW1lb3V0cygpO1xuXG4gIC8vIHN0YXRlIGNoYW5nZVxuICB4aHIub25yZWFkeXN0YXRlY2hhbmdlID0gKCkgPT4ge1xuICAgIGNvbnN0IHJlYWR5U3RhdGUgPSB4aHIucmVhZHlTdGF0ZTtcbiAgICBpZiAocmVhZHlTdGF0ZSA+PSAyICYmIHNlbGYuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQoc2VsZi5fcmVzcG9uc2VUaW1lb3V0VGltZXIpO1xuICAgIH1cbiAgICBpZiAoNCAhPSByZWFkeVN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gSW4gSUU5LCByZWFkcyB0byBhbnkgcHJvcGVydHkgKGUuZy4gc3RhdHVzKSBvZmYgb2YgYW4gYWJvcnRlZCBYSFIgd2lsbFxuICAgIC8vIHJlc3VsdCBpbiB0aGUgZXJyb3IgXCJDb3VsZCBub3QgY29tcGxldGUgdGhlIG9wZXJhdGlvbiBkdWUgdG8gZXJyb3IgYzAwYzAyM2ZcIlxuICAgIGxldCBzdGF0dXM7XG4gICAgdHJ5IHsgc3RhdHVzID0geGhyLnN0YXR1cyB9IGNhdGNoKGUpIHsgc3RhdHVzID0gMDsgfVxuXG4gICAgaWYgKCFzdGF0dXMpIHtcbiAgICAgIGlmIChzZWxmLnRpbWVkb3V0IHx8IHNlbGYuX2Fib3J0ZWQpIHJldHVybjtcbiAgICAgIHJldHVybiBzZWxmLmNyb3NzRG9tYWluRXJyb3IoKTtcbiAgICB9XG4gICAgc2VsZi5lbWl0KCdlbmQnKTtcbiAgfTtcblxuICAvLyBwcm9ncmVzc1xuICBjb25zdCBoYW5kbGVQcm9ncmVzcyA9IChkaXJlY3Rpb24sIGUpID0+IHtcbiAgICBpZiAoZS50b3RhbCA+IDApIHtcbiAgICAgIGUucGVyY2VudCA9IGUubG9hZGVkIC8gZS50b3RhbCAqIDEwMDtcbiAgICB9XG4gICAgZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgc2VsZi5lbWl0KCdwcm9ncmVzcycsIGUpO1xuICB9O1xuICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoJ3Byb2dyZXNzJykpIHtcbiAgICB0cnkge1xuICAgICAgeGhyLm9ucHJvZ3Jlc3MgPSBoYW5kbGVQcm9ncmVzcy5iaW5kKG51bGwsICdkb3dubG9hZCcpO1xuICAgICAgaWYgKHhoci51cGxvYWQpIHtcbiAgICAgICAgeGhyLnVwbG9hZC5vbnByb2dyZXNzID0gaGFuZGxlUHJvZ3Jlc3MuYmluZChudWxsLCAndXBsb2FkJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaChlKSB7XG4gICAgICAvLyBBY2Nlc3NpbmcgeGhyLnVwbG9hZCBmYWlscyBpbiBJRSBmcm9tIGEgd2ViIHdvcmtlciwgc28ganVzdCBwcmV0ZW5kIGl0IGRvZXNuJ3QgZXhpc3QuXG4gICAgICAvLyBSZXBvcnRlZCBoZXJlOlxuICAgICAgLy8gaHR0cHM6Ly9jb25uZWN0Lm1pY3Jvc29mdC5jb20vSUUvZmVlZGJhY2svZGV0YWlscy84MzcyNDUveG1saHR0cHJlcXVlc3QtdXBsb2FkLXRocm93cy1pbnZhbGlkLWFyZ3VtZW50LXdoZW4tdXNlZC1mcm9tLXdlYi13b3JrZXItY29udGV4dFxuICAgIH1cbiAgfVxuXG4gIC8vIGluaXRpYXRlIHJlcXVlc3RcbiAgdHJ5IHtcbiAgICBpZiAodGhpcy51c2VybmFtZSAmJiB0aGlzLnBhc3N3b3JkKSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUsIHRoaXMudXNlcm5hbWUsIHRoaXMucGFzc3dvcmQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB4aHIub3Blbih0aGlzLm1ldGhvZCwgdGhpcy51cmwsIHRydWUpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gc2VlICMxMTQ5XG4gICAgcmV0dXJuIHRoaXMuY2FsbGJhY2soZXJyKTtcbiAgfVxuXG4gIC8vIENPUlNcbiAgaWYgKHRoaXMuX3dpdGhDcmVkZW50aWFscykgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWU7XG5cbiAgLy8gYm9keVxuICBpZiAoIXRoaXMuX2Zvcm1EYXRhICYmICdHRVQnICE9IHRoaXMubWV0aG9kICYmICdIRUFEJyAhPSB0aGlzLm1ldGhvZCAmJiAnc3RyaW5nJyAhPSB0eXBlb2YgZGF0YSAmJiAhdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgLy8gc2VyaWFsaXplIHN0dWZmXG4gICAgY29uc3QgY29udGVudFR5cGUgPSB0aGlzLl9oZWFkZXJbJ2NvbnRlbnQtdHlwZSddO1xuICAgIGxldCBzZXJpYWxpemUgPSB0aGlzLl9zZXJpYWxpemVyIHx8IHJlcXVlc3Quc2VyaWFsaXplW2NvbnRlbnRUeXBlID8gY29udGVudFR5cGUuc3BsaXQoJzsnKVswXSA6ICcnXTtcbiAgICBpZiAoIXNlcmlhbGl6ZSAmJiBpc0pTT04oY29udGVudFR5cGUpKSB7XG4gICAgICBzZXJpYWxpemUgPSByZXF1ZXN0LnNlcmlhbGl6ZVsnYXBwbGljYXRpb24vanNvbiddO1xuICAgIH1cbiAgICBpZiAoc2VyaWFsaXplKSBkYXRhID0gc2VyaWFsaXplKGRhdGEpO1xuICB9XG5cbiAgLy8gc2V0IGhlYWRlciBmaWVsZHNcbiAgZm9yIChjb25zdCBmaWVsZCBpbiB0aGlzLmhlYWRlcikge1xuICAgIGlmIChudWxsID09IHRoaXMuaGVhZGVyW2ZpZWxkXSkgY29udGludWU7XG5cbiAgICBpZiAodGhpcy5oZWFkZXIuaGFzT3duUHJvcGVydHkoZmllbGQpKVxuICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoZmllbGQsIHRoaXMuaGVhZGVyW2ZpZWxkXSk7XG4gIH1cblxuICBpZiAodGhpcy5fcmVzcG9uc2VUeXBlKSB7XG4gICAgeGhyLnJlc3BvbnNlVHlwZSA9IHRoaXMuX3Jlc3BvbnNlVHlwZTtcbiAgfVxuXG4gIC8vIHNlbmQgc3R1ZmZcbiAgdGhpcy5lbWl0KCdyZXF1ZXN0JywgdGhpcyk7XG5cbiAgLy8gSUUxMSB4aHIuc2VuZCh1bmRlZmluZWQpIHNlbmRzICd1bmRlZmluZWQnIHN0cmluZyBhcyBQT1NUIHBheWxvYWQgKGluc3RlYWQgb2Ygbm90aGluZylcbiAgLy8gV2UgbmVlZCBudWxsIGhlcmUgaWYgZGF0YSBpcyB1bmRlZmluZWRcbiAgeGhyLnNlbmQodHlwZW9mIGRhdGEgIT09ICd1bmRlZmluZWQnID8gZGF0YSA6IG51bGwpO1xufTtcblxucmVxdWVzdC5hZ2VudCA9ICgpID0+IG5ldyBBZ2VudCgpO1xuXG5bXCJHRVRcIiwgXCJQT1NUXCIsIFwiT1BUSU9OU1wiLCBcIlBBVENIXCIsIFwiUFVUXCIsIFwiREVMRVRFXCJdLmZvckVhY2gobWV0aG9kID0+IHtcbiAgQWdlbnQucHJvdG90eXBlW21ldGhvZC50b0xvd2VyQ2FzZSgpXSA9IGZ1bmN0aW9uKHVybCwgZm4pIHtcbiAgICBjb25zdCByZXEgPSBuZXcgcmVxdWVzdC5SZXF1ZXN0KG1ldGhvZCwgdXJsKTtcbiAgICB0aGlzLl9zZXREZWZhdWx0cyhyZXEpO1xuICAgIGlmIChmbikge1xuICAgICAgcmVxLmVuZChmbik7XG4gICAgfVxuICAgIHJldHVybiByZXE7XG4gIH07XG59KTtcblxuQWdlbnQucHJvdG90eXBlLmRlbCA9IEFnZW50LnByb3RvdHlwZVsnZGVsZXRlJ107XG5cbi8qKlxuICogR0VUIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5nZXQgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdHRVQnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEucXVlcnkoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuXG4vKipcbiAqIEhFQUQgYHVybGAgd2l0aCBvcHRpb25hbCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZHxGdW5jdGlvbn0gW2RhdGFdIG9yIGZuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LmhlYWQgPSAodXJsLCBkYXRhLCBmbikgPT4ge1xuICBjb25zdCByZXEgPSByZXF1ZXN0KCdIRUFEJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnF1ZXJ5KGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBPUFRJT05TIHF1ZXJ5IHRvIGB1cmxgIHdpdGggb3B0aW9uYWwgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR8RnVuY3Rpb259IFtkYXRhXSBvciBmblxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5vcHRpb25zID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnT1BUSU9OUycsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBERUxFVEUgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfSBbZGF0YV1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIGRlbCh1cmwsIGRhdGEsIGZuKSB7XG4gIGNvbnN0IHJlcSA9IHJlcXVlc3QoJ0RFTEVURScsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufVxuXG5yZXF1ZXN0WydkZWwnXSA9IGRlbDtcbnJlcXVlc3RbJ2RlbGV0ZSddID0gZGVsO1xuXG4vKipcbiAqIFBBVENIIGB1cmxgIHdpdGggb3B0aW9uYWwgYGRhdGFgIGFuZCBjYWxsYmFjayBgZm4ocmVzKWAuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHVybFxuICogQHBhcmFtIHtNaXhlZH0gW2RhdGFdXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZm5dXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5yZXF1ZXN0LnBhdGNoID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnUEFUQ0gnLCB1cmwpO1xuICBpZiAoJ2Z1bmN0aW9uJyA9PSB0eXBlb2YgZGF0YSkgKGZuID0gZGF0YSksIChkYXRhID0gbnVsbCk7XG4gIGlmIChkYXRhKSByZXEuc2VuZChkYXRhKTtcbiAgaWYgKGZuKSByZXEuZW5kKGZuKTtcbiAgcmV0dXJuIHJlcTtcbn07XG5cbi8qKlxuICogUE9TVCBgdXJsYCB3aXRoIG9wdGlvbmFsIGBkYXRhYCBhbmQgY2FsbGJhY2sgYGZuKHJlcylgLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmxcbiAqIEBwYXJhbSB7TWl4ZWR9IFtkYXRhXVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2ZuXVxuICogQHJldHVybiB7UmVxdWVzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxucmVxdWVzdC5wb3N0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnUE9TVCcsIHVybCk7XG4gIGlmICgnZnVuY3Rpb24nID09IHR5cGVvZiBkYXRhKSAoZm4gPSBkYXRhKSwgKGRhdGEgPSBudWxsKTtcbiAgaWYgKGRhdGEpIHJlcS5zZW5kKGRhdGEpO1xuICBpZiAoZm4pIHJlcS5lbmQoZm4pO1xuICByZXR1cm4gcmVxO1xufTtcblxuLyoqXG4gKiBQVVQgYHVybGAgd2l0aCBvcHRpb25hbCBgZGF0YWAgYW5kIGNhbGxiYWNrIGBmbihyZXMpYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdXJsXG4gKiBAcGFyYW0ge01peGVkfEZ1bmN0aW9ufSBbZGF0YV0gb3IgZm5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbnJlcXVlc3QucHV0ID0gKHVybCwgZGF0YSwgZm4pID0+IHtcbiAgY29uc3QgcmVxID0gcmVxdWVzdCgnUFVUJywgdXJsKTtcbiAgaWYgKCdmdW5jdGlvbicgPT0gdHlwZW9mIGRhdGEpIChmbiA9IGRhdGEpLCAoZGF0YSA9IG51bGwpO1xuICBpZiAoZGF0YSkgcmVxLnNlbmQoZGF0YSk7XG4gIGlmIChmbikgcmVxLmVuZChmbik7XG4gIHJldHVybiByZXE7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENoZWNrIGlmIGBvYmpgIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtCb29sZWFufVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBudWxsICE9PSBvYmogJiYgJ29iamVjdCcgPT09IHR5cGVvZiBvYmo7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogTW9kdWxlIG9mIG1peGVkLWluIGZ1bmN0aW9ucyBzaGFyZWQgYmV0d2VlbiBub2RlIGFuZCBjbGllbnQgY29kZVxuICovXG5jb25zdCBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXMtb2JqZWN0Jyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXF1ZXN0QmFzZWAuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBSZXF1ZXN0QmFzZTtcblxuLyoqXG4gKiBJbml0aWFsaXplIGEgbmV3IGBSZXF1ZXN0QmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXF1ZXN0QmFzZShvYmopIHtcbiAgaWYgKG9iaikgcmV0dXJuIG1peGluKG9iaik7XG59XG5cbi8qKlxuICogTWl4aW4gdGhlIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmpcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIG1peGluKG9iaikge1xuICBmb3IgKGNvbnN0IGtleSBpbiBSZXF1ZXN0QmFzZS5wcm90b3R5cGUpIHtcbiAgICBvYmpba2V5XSA9IFJlcXVlc3RCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogQ2xlYXIgcHJldmlvdXMgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmNsZWFyVGltZW91dCA9IGZ1bmN0aW9uIF9jbGVhclRpbWVvdXQoKXtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3RpbWVyKTtcbiAgY2xlYXJUaW1lb3V0KHRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKTtcbiAgZGVsZXRlIHRoaXMuX3RpbWVyO1xuICBkZWxldGUgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXI7XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBPdmVycmlkZSBkZWZhdWx0IHJlc3BvbnNlIGJvZHkgcGFyc2VyXG4gKlxuICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB0byBjb252ZXJ0IGluY29taW5nIGRhdGEgaW50byByZXF1ZXN0LmJvZHlcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucGFyc2UgPSBmdW5jdGlvbiBwYXJzZShmbil7XG4gIHRoaXMuX3BhcnNlciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IGZvcm1hdCBvZiBiaW5hcnkgcmVzcG9uc2UgYm9keS5cbiAqIEluIGJyb3dzZXIgdmFsaWQgZm9ybWF0cyBhcmUgJ2Jsb2InIGFuZCAnYXJyYXlidWZmZXInLFxuICogd2hpY2ggcmV0dXJuIEJsb2IgYW5kIEFycmF5QnVmZmVyLCByZXNwZWN0aXZlbHkuXG4gKlxuICogSW4gTm9kZSBhbGwgdmFsdWVzIHJlc3VsdCBpbiBCdWZmZXIuXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICByZXEuZ2V0KCcvJylcbiAqICAgICAgICAucmVzcG9uc2VUeXBlKCdibG9iJylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnJlc3BvbnNlVHlwZSA9IGZ1bmN0aW9uKHZhbCl7XG4gIHRoaXMuX3Jlc3BvbnNlVHlwZSA9IHZhbDtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE92ZXJyaWRlIGRlZmF1bHQgcmVxdWVzdCBib2R5IHNlcmlhbGl6ZXJcbiAqXG4gKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHRvIGNvbnZlcnQgZGF0YSBzZXQgdmlhIC5zZW5kIG9yIC5hdHRhY2ggaW50byBwYXlsb2FkIHRvIHNlbmRcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuc2VyaWFsaXplID0gZnVuY3Rpb24gc2VyaWFsaXplKGZuKXtcbiAgdGhpcy5fc2VyaWFsaXplciA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRpbWVvdXRzLlxuICpcbiAqIC0gcmVzcG9uc2UgdGltZW91dCBpcyB0aW1lIGJldHdlZW4gc2VuZGluZyByZXF1ZXN0IGFuZCByZWNlaXZpbmcgdGhlIGZpcnN0IGJ5dGUgb2YgdGhlIHJlc3BvbnNlLiBJbmNsdWRlcyBETlMgYW5kIGNvbm5lY3Rpb24gdGltZS5cbiAqIC0gZGVhZGxpbmUgaXMgdGhlIHRpbWUgZnJvbSBzdGFydCBvZiB0aGUgcmVxdWVzdCB0byByZWNlaXZpbmcgcmVzcG9uc2UgYm9keSBpbiBmdWxsLiBJZiB0aGUgZGVhZGxpbmUgaXMgdG9vIHNob3J0IGxhcmdlIGZpbGVzIG1heSBub3QgbG9hZCBhdCBhbGwgb24gc2xvdyBjb25uZWN0aW9ucy5cbiAqXG4gKiBWYWx1ZSBvZiAwIG9yIGZhbHNlIG1lYW5zIG5vIHRpbWVvdXQuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ8T2JqZWN0fSBtcyBvciB7cmVzcG9uc2UsIGRlYWRsaW5lfVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50aW1lb3V0ID0gZnVuY3Rpb24gdGltZW91dChvcHRpb25zKXtcbiAgaWYgKCFvcHRpb25zIHx8ICdvYmplY3QnICE9PSB0eXBlb2Ygb3B0aW9ucykge1xuICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zO1xuICAgIHRoaXMuX3Jlc3BvbnNlVGltZW91dCA9IDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBmb3IoY29uc3Qgb3B0aW9uIGluIG9wdGlvbnMpIHtcbiAgICBzd2l0Y2gob3B0aW9uKSB7XG4gICAgICBjYXNlICdkZWFkbGluZSc6XG4gICAgICAgIHRoaXMuX3RpbWVvdXQgPSBvcHRpb25zLmRlYWRsaW5lO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3Jlc3BvbnNlJzpcbiAgICAgICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0ID0gb3B0aW9ucy5yZXNwb25zZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLndhcm4oXCJVbmtub3duIHRpbWVvdXQgb3B0aW9uXCIsIG9wdGlvbik7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTZXQgbnVtYmVyIG9mIHJldHJ5IGF0dGVtcHRzIG9uIGVycm9yLlxuICpcbiAqIEZhaWxlZCByZXF1ZXN0cyB3aWxsIGJlIHJldHJpZWQgJ2NvdW50JyB0aW1lcyBpZiB0aW1lb3V0IG9yIGVyci5jb2RlID49IDUwMC5cbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtmbl1cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmV0cnkgPSBmdW5jdGlvbiByZXRyeShjb3VudCwgZm4pe1xuICAvLyBEZWZhdWx0IHRvIDEgaWYgbm8gY291bnQgcGFzc2VkIG9yIHRydWVcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDAgfHwgY291bnQgPT09IHRydWUpIGNvdW50ID0gMTtcbiAgaWYgKGNvdW50IDw9IDApIGNvdW50ID0gMDtcbiAgdGhpcy5fbWF4UmV0cmllcyA9IGNvdW50O1xuICB0aGlzLl9yZXRyaWVzID0gMDtcbiAgdGhpcy5fcmV0cnlDYWxsYmFjayA9IGZuO1xuICByZXR1cm4gdGhpcztcbn07XG5cbmNvbnN0IEVSUk9SX0NPREVTID0gW1xuICAnRUNPTk5SRVNFVCcsXG4gICdFVElNRURPVVQnLFxuICAnRUFERFJJTkZPJyxcbiAgJ0VTT0NLRVRUSU1FRE9VVCdcbl07XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGEgcmVxdWVzdCBzaG91bGQgYmUgcmV0cmllZC5cbiAqIChCb3Jyb3dlZCBmcm9tIHNlZ21lbnRpby9zdXBlcmFnZW50LXJldHJ5KVxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVyclxuICogQHBhcmFtIHtSZXNwb25zZX0gW3Jlc11cbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX3Nob3VsZFJldHJ5ID0gZnVuY3Rpb24oZXJyLCByZXMpIHtcbiAgaWYgKCF0aGlzLl9tYXhSZXRyaWVzIHx8IHRoaXMuX3JldHJpZXMrKyA+PSB0aGlzLl9tYXhSZXRyaWVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmICh0aGlzLl9yZXRyeUNhbGxiYWNrKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG92ZXJyaWRlID0gdGhpcy5fcmV0cnlDYWxsYmFjayhlcnIsIHJlcyk7XG4gICAgICBpZiAob3ZlcnJpZGUgPT09IHRydWUpIHJldHVybiB0cnVlO1xuICAgICAgaWYgKG92ZXJyaWRlID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gdW5kZWZpbmVkIGZhbGxzIGJhY2sgdG8gZGVmYXVsdHNcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZSk7XG4gICAgfVxuICB9XG4gIGlmIChyZXMgJiYgcmVzLnN0YXR1cyAmJiByZXMuc3RhdHVzID49IDUwMCAmJiByZXMuc3RhdHVzICE9IDUwMSkgcmV0dXJuIHRydWU7XG4gIGlmIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgJiYgfkVSUk9SX0NPREVTLmluZGV4T2YoZXJyLmNvZGUpKSByZXR1cm4gdHJ1ZTtcbiAgICAvLyBTdXBlcmFnZW50IHRpbWVvdXRcbiAgICBpZiAoZXJyLnRpbWVvdXQgJiYgZXJyLmNvZGUgPT0gJ0VDT05OQUJPUlRFRCcpIHJldHVybiB0cnVlO1xuICAgIGlmIChlcnIuY3Jvc3NEb21haW4pIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogUmV0cnkgcmVxdWVzdFxuICpcbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLl9yZXRyeSA9IGZ1bmN0aW9uKCkge1xuXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG5cbiAgLy8gbm9kZVxuICBpZiAodGhpcy5yZXEpIHtcbiAgICB0aGlzLnJlcSA9IG51bGw7XG4gICAgdGhpcy5yZXEgPSB0aGlzLnJlcXVlc3QoKTtcbiAgfVxuXG4gIHRoaXMuX2Fib3J0ZWQgPSBmYWxzZTtcbiAgdGhpcy50aW1lZG91dCA9IGZhbHNlO1xuXG4gIHJldHVybiB0aGlzLl9lbmQoKTtcbn07XG5cbi8qKlxuICogUHJvbWlzZSBzdXBwb3J0XG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVzb2x2ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW3JlamVjdF1cbiAqIEByZXR1cm4ge1JlcXVlc3R9XG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnRoZW4gPSBmdW5jdGlvbiB0aGVuKHJlc29sdmUsIHJlamVjdCkge1xuICBpZiAoIXRoaXMuX2Z1bGxmaWxsZWRQcm9taXNlKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKHRoaXMuX2VuZENhbGxlZCkge1xuICAgICAgY29uc29sZS53YXJuKFwiV2FybmluZzogc3VwZXJhZ2VudCByZXF1ZXN0IHdhcyBzZW50IHR3aWNlLCBiZWNhdXNlIGJvdGggLmVuZCgpIGFuZCAudGhlbigpIHdlcmUgY2FsbGVkLiBOZXZlciBjYWxsIC5lbmQoKSBpZiB5b3UgdXNlIHByb21pc2VzXCIpO1xuICAgIH1cbiAgICB0aGlzLl9mdWxsZmlsbGVkUHJvbWlzZSA9IG5ldyBQcm9taXNlKChpbm5lclJlc29sdmUsIGlubmVyUmVqZWN0KSA9PiB7XG4gICAgICBzZWxmLm9uKCdlcnJvcicsIGlubmVyUmVqZWN0KTtcbiAgICAgIHNlbGYub24oJ2Fib3J0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBlcnIgPSBuZXcgRXJyb3IoJ0Fib3J0ZWQnKTtcbiAgICAgICAgZXJyLmNvZGUgPSBcIkFCT1JURURcIjtcbiAgICAgICAgZXJyLnN0YXR1cyA9IHRoaXMuc3RhdHVzO1xuICAgICAgICBlcnIubWV0aG9kID0gdGhpcy5tZXRob2Q7XG4gICAgICAgIGVyci51cmwgPSB0aGlzLnVybDtcbiAgICAgICAgaW5uZXJSZWplY3QoZXJyKTtcbiAgICAgIH0pO1xuICAgICAgc2VsZi5lbmQoKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIGlubmVyUmVqZWN0KGVycik7XG4gICAgICAgIGVsc2UgaW5uZXJSZXNvbHZlKHJlcyk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gdGhpcy5fZnVsbGZpbGxlZFByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlWydjYXRjaCddID0gZnVuY3Rpb24oY2IpIHtcbiAgcmV0dXJuIHRoaXMudGhlbih1bmRlZmluZWQsIGNiKTtcbn07XG5cbi8qKlxuICogQWxsb3cgZm9yIGV4dGVuc2lvblxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZm4pIHtcbiAgZm4odGhpcyk7XG4gIHJldHVybiB0aGlzO1xufTtcblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLm9rID0gZnVuY3Rpb24oY2IpIHtcbiAgaWYgKCdmdW5jdGlvbicgIT09IHR5cGVvZiBjYikgdGhyb3cgRXJyb3IoXCJDYWxsYmFjayByZXF1aXJlZFwiKTtcbiAgdGhpcy5fb2tDYWxsYmFjayA9IGNiO1xuICByZXR1cm4gdGhpcztcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5faXNSZXNwb25zZU9LID0gZnVuY3Rpb24ocmVzKSB7XG4gIGlmICghcmVzKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKHRoaXMuX29rQ2FsbGJhY2spIHtcbiAgICByZXR1cm4gdGhpcy5fb2tDYWxsYmFjayhyZXMpO1xuICB9XG5cbiAgcmV0dXJuIHJlcy5zdGF0dXMgPj0gMjAwICYmIHJlcy5zdGF0dXMgPCAzMDA7XG59O1xuXG4vKipcbiAqIEdldCByZXF1ZXN0IGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uKGZpZWxkKXtcbiAgcmV0dXJuIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXTtcbn07XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgaGVhZGVyIGBmaWVsZGAgdmFsdWUuXG4gKiBUaGlzIGlzIGEgZGVwcmVjYXRlZCBpbnRlcm5hbCBBUEkuIFVzZSBgLmdldChmaWVsZClgIGluc3RlYWQuXG4gKlxuICogKGdldEhlYWRlciBpcyBubyBsb25nZXIgdXNlZCBpbnRlcm5hbGx5IGJ5IHRoZSBzdXBlcmFnZW50IGNvZGUgYmFzZSlcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHJpdmF0ZVxuICogQGRlcHJlY2F0ZWRcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuZ2V0SGVhZGVyID0gUmVxdWVzdEJhc2UucHJvdG90eXBlLmdldDtcblxuLyoqXG4gKiBTZXQgaGVhZGVyIGBmaWVsZGAgdG8gYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3QuXG4gKiBDYXNlLWluc2Vuc2l0aXZlLlxuICpcbiAqIEV4YW1wbGVzOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCgnQWNjZXB0JywgJ2FwcGxpY2F0aW9uL2pzb24nKVxuICogICAgICAgIC5zZXQoJ1gtQVBJLUtleScsICdmb29iYXInKVxuICogICAgICAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnNldCh7IEFjY2VwdDogJ2FwcGxpY2F0aW9uL2pzb24nLCAnWC1BUEktS2V5JzogJ2Zvb2JhcicgfSlcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGZpZWxkXG4gKiBAcGFyYW0ge1N0cmluZ30gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVxdWVzdEJhc2UucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKGZpZWxkLCB2YWwpe1xuICBpZiAoaXNPYmplY3QoZmllbGQpKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZmllbGQpIHtcbiAgICAgIHRoaXMuc2V0KGtleSwgZmllbGRba2V5XSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIHRoaXMuX2hlYWRlcltmaWVsZC50b0xvd2VyQ2FzZSgpXSA9IHZhbDtcbiAgdGhpcy5oZWFkZXJbZmllbGRdID0gdmFsO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGhlYWRlciBgZmllbGRgLlxuICogQ2FzZS1pbnNlbnNpdGl2ZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqICAgICAgcmVxLmdldCgnLycpXG4gKiAgICAgICAgLnVuc2V0KCdVc2VyLUFnZW50JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKTtcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24oZmllbGQpe1xuICBkZWxldGUgdGhpcy5faGVhZGVyW2ZpZWxkLnRvTG93ZXJDYXNlKCldO1xuICBkZWxldGUgdGhpcy5oZWFkZXJbZmllbGRdO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogV3JpdGUgdGhlIGZpZWxkIGBuYW1lYCBhbmQgYHZhbGAsIG9yIG11bHRpcGxlIGZpZWxkcyB3aXRoIG9uZSBvYmplY3RcbiAqIGZvciBcIm11bHRpcGFydC9mb3JtLWRhdGFcIiByZXF1ZXN0IGJvZGllcy5cbiAqXG4gKiBgYGAganNcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCgnZm9vJywgJ2JhcicpXG4gKiAgIC5lbmQoY2FsbGJhY2spO1xuICpcbiAqIHJlcXVlc3QucG9zdCgnL3VwbG9hZCcpXG4gKiAgIC5maWVsZCh7IGZvbzogJ2JhcicsIGJhejogJ3F1eCcgfSlcbiAqICAgLmVuZChjYWxsYmFjayk7XG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IG5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfEJsb2J8RmlsZXxCdWZmZXJ8ZnMuUmVhZFN0cmVhbX0gdmFsXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fSBmb3IgY2hhaW5pbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5maWVsZCA9IGZ1bmN0aW9uKG5hbWUsIHZhbCkge1xuICAvLyBuYW1lIHNob3VsZCBiZSBlaXRoZXIgYSBzdHJpbmcgb3IgYW4gb2JqZWN0LlxuICBpZiAobnVsbCA9PT0gbmFtZSB8fCB1bmRlZmluZWQgPT09IG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJy5maWVsZChuYW1lLCB2YWwpIG5hbWUgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG5cbiAgaWYgKHRoaXMuX2RhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCIuZmllbGQoKSBjYW4ndCBiZSB1c2VkIGlmIC5zZW5kKCkgaXMgdXNlZC4gUGxlYXNlIHVzZSBvbmx5IC5zZW5kKCkgb3Igb25seSAuZmllbGQoKSAmIC5hdHRhY2goKVwiKTtcbiAgfVxuXG4gIGlmIChpc09iamVjdChuYW1lKSkge1xuICAgIGZvciAoY29uc3Qga2V5IGluIG5hbWUpIHtcbiAgICAgIHRoaXMuZmllbGQoa2V5LCBuYW1lW2tleV0pO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIGlmIChBcnJheS5pc0FycmF5KHZhbCkpIHtcbiAgICBmb3IgKGNvbnN0IGkgaW4gdmFsKSB7XG4gICAgICB0aGlzLmZpZWxkKG5hbWUsIHZhbFtpXSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gdmFsIHNob3VsZCBiZSBkZWZpbmVkIG5vd1xuICBpZiAobnVsbCA9PT0gdmFsIHx8IHVuZGVmaW5lZCA9PT0gdmFsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCcuZmllbGQobmFtZSwgdmFsKSB2YWwgY2FuIG5vdCBiZSBlbXB0eScpO1xuICB9XG4gIGlmICgnYm9vbGVhbicgPT09IHR5cGVvZiB2YWwpIHtcbiAgICB2YWwgPSAnJyArIHZhbDtcbiAgfVxuICB0aGlzLl9nZXRGb3JtRGF0YSgpLmFwcGVuZChuYW1lLCB2YWwpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWJvcnQgdGhlIHJlcXVlc3QsIGFuZCBjbGVhciBwb3RlbnRpYWwgdGltZW91dC5cbiAqXG4gKiBAcmV0dXJuIHtSZXF1ZXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuUmVxdWVzdEJhc2UucHJvdG90eXBlLmFib3J0ID0gZnVuY3Rpb24oKXtcbiAgaWYgKHRoaXMuX2Fib3J0ZWQpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICB0aGlzLl9hYm9ydGVkID0gdHJ1ZTtcbiAgdGhpcy54aHIgJiYgdGhpcy54aHIuYWJvcnQoKTsgLy8gYnJvd3NlclxuICB0aGlzLnJlcSAmJiB0aGlzLnJlcS5hYm9ydCgpOyAvLyBub2RlXG4gIHRoaXMuY2xlYXJUaW1lb3V0KCk7XG4gIHRoaXMuZW1pdCgnYWJvcnQnKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2F1dGggPSBmdW5jdGlvbih1c2VyLCBwYXNzLCBvcHRpb25zLCBiYXNlNjRFbmNvZGVyKSB7XG4gIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgY2FzZSAnYmFzaWMnOlxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmFzaWMgJHtiYXNlNjRFbmNvZGVyKGAke3VzZXJ9OiR7cGFzc31gKX1gKTtcbiAgICAgIGJyZWFrO1xuXG4gICAgY2FzZSAnYXV0byc6XG4gICAgICB0aGlzLnVzZXJuYW1lID0gdXNlcjtcbiAgICAgIHRoaXMucGFzc3dvcmQgPSBwYXNzO1xuICAgICAgYnJlYWs7XG5cbiAgICBjYXNlICdiZWFyZXInOiAvLyB1c2FnZSB3b3VsZCBiZSAuYXV0aChhY2Nlc3NUb2tlbiwgeyB0eXBlOiAnYmVhcmVyJyB9KVxuICAgICAgdGhpcy5zZXQoJ0F1dGhvcml6YXRpb24nLCBgQmVhcmVyICR7dXNlcn1gKTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBFbmFibGUgdHJhbnNtaXNzaW9uIG9mIGNvb2tpZXMgd2l0aCB4LWRvbWFpbiByZXF1ZXN0cy5cbiAqXG4gKiBOb3RlIHRoYXQgZm9yIHRoaXMgdG8gd29yayB0aGUgb3JpZ2luIG11c3Qgbm90IGJlXG4gKiB1c2luZyBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiIHdpdGggYSB3aWxkY2FyZCxcbiAqIGFuZCBhbHNvIG11c3Qgc2V0IFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctQ3JlZGVudGlhbHNcIlxuICogdG8gXCJ0cnVlXCIuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUud2l0aENyZWRlbnRpYWxzID0gZnVuY3Rpb24ob24pIHtcbiAgLy8gVGhpcyBpcyBicm93c2VyLW9ubHkgZnVuY3Rpb25hbGl0eS4gTm9kZSBzaWRlIGlzIG5vLW9wLlxuICBpZiAob24gPT0gdW5kZWZpbmVkKSBvbiA9IHRydWU7XG4gIHRoaXMuX3dpdGhDcmVkZW50aWFscyA9IG9uO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU2V0IHRoZSBtYXggcmVkaXJlY3RzIHRvIGBuYC4gRG9lcyBub3RpbmcgaW4gYnJvd3NlciBYSFIgaW1wbGVtZW50YXRpb24uXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUucmVkaXJlY3RzID0gZnVuY3Rpb24obil7XG4gIHRoaXMuX21heFJlZGlyZWN0cyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNYXhpbXVtIHNpemUgb2YgYnVmZmVyZWQgcmVzcG9uc2UgYm9keSwgaW4gYnl0ZXMuIENvdW50cyB1bmNvbXByZXNzZWQgc2l6ZS5cbiAqIERlZmF1bHQgMjAwTUIuXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAqIEByZXR1cm4ge1JlcXVlc3R9IGZvciBjaGFpbmluZ1xuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUubWF4UmVzcG9uc2VTaXplID0gZnVuY3Rpb24obil7XG4gIGlmICgnbnVtYmVyJyAhPT0gdHlwZW9mIG4pIHtcbiAgICB0aHJvdyBUeXBlRXJyb3IoXCJJbnZhbGlkIGFyZ3VtZW50XCIpO1xuICB9XG4gIHRoaXMuX21heFJlc3BvbnNlU2l6ZSA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBDb252ZXJ0IHRvIGEgcGxhaW4gamF2YXNjcmlwdCBvYmplY3QgKG5vdCBKU09OIHN0cmluZykgb2Ygc2NhbGFyIHByb3BlcnRpZXMuXG4gKiBOb3RlIGFzIHRoaXMgbWV0aG9kIGlzIGRlc2lnbmVkIHRvIHJldHVybiBhIHVzZWZ1bCBub24tdGhpcyB2YWx1ZSxcbiAqIGl0IGNhbm5vdCBiZSBjaGFpbmVkLlxuICpcbiAqIEByZXR1cm4ge09iamVjdH0gZGVzY3JpYmluZyBtZXRob2QsIHVybCwgYW5kIGRhdGEgb2YgdGhpcyByZXF1ZXN0XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHtcbiAgICBtZXRob2Q6IHRoaXMubWV0aG9kLFxuICAgIHVybDogdGhpcy51cmwsXG4gICAgZGF0YTogdGhpcy5fZGF0YSxcbiAgICBoZWFkZXJzOiB0aGlzLl9oZWFkZXIsXG4gIH07XG59O1xuXG4vKipcbiAqIFNlbmQgYGRhdGFgIGFzIHRoZSByZXF1ZXN0IGJvZHksIGRlZmF1bHRpbmcgdGhlIGAudHlwZSgpYCB0byBcImpzb25cIiB3aGVuXG4gKiBhbiBvYmplY3QgaXMgZ2l2ZW4uXG4gKlxuICogRXhhbXBsZXM6XG4gKlxuICogICAgICAgLy8gbWFudWFsIGpzb25cbiAqICAgICAgIHJlcXVlc3QucG9zdCgnL3VzZXInKVxuICogICAgICAgICAudHlwZSgnanNvbicpXG4gKiAgICAgICAgIC5zZW5kKCd7XCJuYW1lXCI6XCJ0alwifScpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gYXV0byBqc29uXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnNlbmQoeyBuYW1lOiAndGonIH0pXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gbWFudWFsIHgtd3d3LWZvcm0tdXJsZW5jb2RlZFxuICogICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgIC50eXBlKCdmb3JtJylcbiAqICAgICAgICAgLnNlbmQoJ25hbWU9dGonKVxuICogICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqICAgICAgIC8vIGF1dG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gKiAgICAgICByZXF1ZXN0LnBvc3QoJy91c2VyJylcbiAqICAgICAgICAgLnR5cGUoJ2Zvcm0nKVxuICogICAgICAgICAuc2VuZCh7IG5hbWU6ICd0aicgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0cyB0byB4LXd3dy1mb3JtLXVybGVuY29kZWRcbiAqICAgICAgcmVxdWVzdC5wb3N0KCcvdXNlcicpXG4gKiAgICAgICAgLnNlbmQoJ25hbWU9dG9iaScpXG4gKiAgICAgICAgLnNlbmQoJ3NwZWNpZXM9ZmVycmV0JylcbiAqICAgICAgICAuZW5kKGNhbGxiYWNrKVxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gZGF0YVxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zZW5kID0gZnVuY3Rpb24oZGF0YSl7XG4gIGNvbnN0IGlzT2JqID0gaXNPYmplY3QoZGF0YSk7XG4gIGxldCB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcblxuICBpZiAodGhpcy5fZm9ybURhdGEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCIuc2VuZCgpIGNhbid0IGJlIHVzZWQgaWYgLmF0dGFjaCgpIG9yIC5maWVsZCgpIGlzIHVzZWQuIFBsZWFzZSB1c2Ugb25seSAuc2VuZCgpIG9yIG9ubHkgLmZpZWxkKCkgJiAuYXR0YWNoKClcIik7XG4gIH1cblxuICBpZiAoaXNPYmogJiYgIXRoaXMuX2RhdGEpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IFtdO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuX2lzSG9zdChkYXRhKSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHt9O1xuICAgIH1cbiAgfSBlbHNlIGlmIChkYXRhICYmIHRoaXMuX2RhdGEgJiYgdGhpcy5faXNIb3N0KHRoaXMuX2RhdGEpKSB7XG4gICAgdGhyb3cgRXJyb3IoXCJDYW4ndCBtZXJnZSB0aGVzZSBzZW5kIGNhbGxzXCIpO1xuICB9XG5cbiAgLy8gbWVyZ2VcbiAgaWYgKGlzT2JqICYmIGlzT2JqZWN0KHRoaXMuX2RhdGEpKSB7XG4gICAgZm9yIChjb25zdCBrZXkgaW4gZGF0YSkge1xuICAgICAgdGhpcy5fZGF0YVtrZXldID0gZGF0YVtrZXldO1xuICAgIH1cbiAgfSBlbHNlIGlmICgnc3RyaW5nJyA9PSB0eXBlb2YgZGF0YSkge1xuICAgIC8vIGRlZmF1bHQgdG8geC13d3ctZm9ybS11cmxlbmNvZGVkXG4gICAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2Zvcm0nKTtcbiAgICB0eXBlID0gdGhpcy5faGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgICBpZiAoJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcgPT0gdHlwZSkge1xuICAgICAgdGhpcy5fZGF0YSA9IHRoaXMuX2RhdGFcbiAgICAgICAgPyBgJHt0aGlzLl9kYXRhfSYke2RhdGF9YFxuICAgICAgICA6IGRhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX2RhdGEgPSAodGhpcy5fZGF0YSB8fCAnJykgKyBkYXRhO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB0aGlzLl9kYXRhID0gZGF0YTtcbiAgfVxuXG4gIGlmICghaXNPYmogfHwgdGhpcy5faXNIb3N0KGRhdGEpKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBkZWZhdWx0IHRvIGpzb25cbiAgaWYgKCF0eXBlKSB0aGlzLnR5cGUoJ2pzb24nKTtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNvcnQgYHF1ZXJ5c3RyaW5nYCBieSB0aGUgc29ydCBmdW5jdGlvblxuICpcbiAqXG4gKiBFeGFtcGxlczpcbiAqXG4gKiAgICAgICAvLyBkZWZhdWx0IG9yZGVyXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeSgpXG4gKiAgICAgICAgIC5lbmQoY2FsbGJhY2spXG4gKlxuICogICAgICAgLy8gY3VzdG9taXplZCBzb3J0IGZ1bmN0aW9uXG4gKiAgICAgICByZXF1ZXN0LmdldCgnL3VzZXInKVxuICogICAgICAgICAucXVlcnkoJ25hbWU9TmljaycpXG4gKiAgICAgICAgIC5xdWVyeSgnc2VhcmNoPU1hbm55JylcbiAqICAgICAgICAgLnNvcnRRdWVyeShmdW5jdGlvbihhLCBiKXtcbiAqICAgICAgICAgICByZXR1cm4gYS5sZW5ndGggLSBiLmxlbmd0aDtcbiAqICAgICAgICAgfSlcbiAqICAgICAgICAgLmVuZChjYWxsYmFjaylcbiAqXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc29ydFxuICogQHJldHVybiB7UmVxdWVzdH0gZm9yIGNoYWluaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5zb3J0UXVlcnkgPSBmdW5jdGlvbihzb3J0KSB7XG4gIC8vIF9zb3J0IGRlZmF1bHQgdG8gdHJ1ZSBidXQgb3RoZXJ3aXNlIGNhbiBiZSBhIGZ1bmN0aW9uIG9yIGJvb2xlYW5cbiAgdGhpcy5fc29ydCA9IHR5cGVvZiBzb3J0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBzb3J0O1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29tcG9zZSBxdWVyeXN0cmluZyB0byBhcHBlbmQgdG8gcmVxLnVybFxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5SZXF1ZXN0QmFzZS5wcm90b3R5cGUuX2ZpbmFsaXplUXVlcnlTdHJpbmcgPSBmdW5jdGlvbigpe1xuICBjb25zdCBxdWVyeSA9IHRoaXMuX3F1ZXJ5LmpvaW4oJyYnKTtcbiAgaWYgKHF1ZXJ5KSB7XG4gICAgdGhpcy51cmwgKz0gKHRoaXMudXJsLmluZGV4T2YoJz8nKSA+PSAwID8gJyYnIDogJz8nKSArIHF1ZXJ5O1xuICB9XG4gIHRoaXMuX3F1ZXJ5Lmxlbmd0aCA9IDA7IC8vIE1ha2VzIHRoZSBjYWxsIGlkZW1wb3RlbnRcblxuICBpZiAodGhpcy5fc29ydCkge1xuICAgIGNvbnN0IGluZGV4ID0gdGhpcy51cmwuaW5kZXhPZignPycpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBjb25zdCBxdWVyeUFyciA9IHRoaXMudXJsLnN1YnN0cmluZyhpbmRleCArIDEpLnNwbGl0KCcmJyk7XG4gICAgICBpZiAoJ2Z1bmN0aW9uJyA9PT0gdHlwZW9mIHRoaXMuX3NvcnQpIHtcbiAgICAgICAgcXVlcnlBcnIuc29ydCh0aGlzLl9zb3J0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXJ5QXJyLnNvcnQoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMudXJsID0gdGhpcy51cmwuc3Vic3RyaW5nKDAsIGluZGV4KSArICc/JyArIHF1ZXJ5QXJyLmpvaW4oJyYnKTtcbiAgICB9XG4gIH1cbn07XG5cbi8vIEZvciBiYWNrd2FyZHMgY29tcGF0IG9ubHlcblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fYXBwZW5kUXVlcnlTdHJpbmcgPSAoKSA9PiB7Y29uc29sZS50cmFjZShcIlVuc3VwcG9ydGVkXCIpO31cblxuLyoqXG4gKiBJbnZva2UgY2FsbGJhY2sgd2l0aCB0aW1lb3V0IGVycm9yLlxuICpcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fdGltZW91dEVycm9yID0gZnVuY3Rpb24ocmVhc29uLCB0aW1lb3V0LCBlcnJubyl7XG4gIGlmICh0aGlzLl9hYm9ydGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGVyciA9IG5ldyBFcnJvcihgJHtyZWFzb24gKyB0aW1lb3V0fW1zIGV4Y2VlZGVkYCk7XG4gIGVyci50aW1lb3V0ID0gdGltZW91dDtcbiAgZXJyLmNvZGUgPSAnRUNPTk5BQk9SVEVEJztcbiAgZXJyLmVycm5vID0gZXJybm87XG4gIHRoaXMudGltZWRvdXQgPSB0cnVlO1xuICB0aGlzLmFib3J0KCk7XG4gIHRoaXMuY2FsbGJhY2soZXJyKTtcbn07XG5cblJlcXVlc3RCYXNlLnByb3RvdHlwZS5fc2V0VGltZW91dHMgPSBmdW5jdGlvbigpIHtcbiAgY29uc3Qgc2VsZiA9IHRoaXM7XG5cbiAgLy8gZGVhZGxpbmVcbiAgaWYgKHRoaXMuX3RpbWVvdXQgJiYgIXRoaXMuX3RpbWVyKSB7XG4gICAgdGhpcy5fdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignVGltZW91dCBvZiAnLCBzZWxmLl90aW1lb3V0LCAnRVRJTUUnKTtcbiAgICB9LCB0aGlzLl90aW1lb3V0KTtcbiAgfVxuICAvLyByZXNwb25zZSB0aW1lb3V0XG4gIGlmICh0aGlzLl9yZXNwb25zZVRpbWVvdXQgJiYgIXRoaXMuX3Jlc3BvbnNlVGltZW91dFRpbWVyKSB7XG4gICAgdGhpcy5fcmVzcG9uc2VUaW1lb3V0VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHNlbGYuX3RpbWVvdXRFcnJvcignUmVzcG9uc2UgdGltZW91dCBvZiAnLCBzZWxmLl9yZXNwb25zZVRpbWVvdXQsICdFVElNRURPVVQnKTtcbiAgICB9LCB0aGlzLl9yZXNwb25zZVRpbWVvdXQpO1xuICB9XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIE1vZHVsZSBkZXBlbmRlbmNpZXMuXG4gKi9cblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogRXhwb3NlIGBSZXNwb25zZUJhc2VgLlxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzcG9uc2VCYXNlO1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgYFJlc3BvbnNlQmFzZWAuXG4gKlxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiBSZXNwb25zZUJhc2Uob2JqKSB7XG4gIGlmIChvYmopIHJldHVybiBtaXhpbihvYmopO1xufVxuXG4vKipcbiAqIE1peGluIHRoZSBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqXG4gKiBAcmV0dXJuIHtPYmplY3R9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5mdW5jdGlvbiBtaXhpbihvYmopIHtcbiAgZm9yIChjb25zdCBrZXkgaW4gUmVzcG9uc2VCYXNlLnByb3RvdHlwZSkge1xuICAgIG9ialtrZXldID0gUmVzcG9uc2VCYXNlLnByb3RvdHlwZVtrZXldO1xuICB9XG4gIHJldHVybiBvYmo7XG59XG5cbi8qKlxuICogR2V0IGNhc2UtaW5zZW5zaXRpdmUgYGZpZWxkYCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGRcbiAqIEByZXR1cm4ge1N0cmluZ31cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihmaWVsZCkge1xuICByZXR1cm4gdGhpcy5oZWFkZXJbZmllbGQudG9Mb3dlckNhc2UoKV07XG59O1xuXG4vKipcbiAqIFNldCBoZWFkZXIgcmVsYXRlZCBwcm9wZXJ0aWVzOlxuICpcbiAqICAgLSBgLnR5cGVgIHRoZSBjb250ZW50IHR5cGUgd2l0aG91dCBwYXJhbXNcbiAqXG4gKiBBIHJlc3BvbnNlIG9mIFwiQ29udGVudC1UeXBlOiB0ZXh0L3BsYWluOyBjaGFyc2V0PXV0Zi04XCJcbiAqIHdpbGwgcHJvdmlkZSB5b3Ugd2l0aCBhIGAudHlwZWAgb2YgXCJ0ZXh0L3BsYWluXCIuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGhlYWRlclxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0SGVhZGVyUHJvcGVydGllcyA9IGZ1bmN0aW9uKGhlYWRlcil7XG4gICAgLy8gVE9ETzogbW9hciFcbiAgICAvLyBUT0RPOiBtYWtlIHRoaXMgYSB1dGlsXG5cbiAgICAvLyBjb250ZW50LXR5cGVcbiAgICBjb25zdCBjdCA9IGhlYWRlclsnY29udGVudC10eXBlJ10gfHwgJyc7XG4gICAgdGhpcy50eXBlID0gdXRpbHMudHlwZShjdCk7XG5cbiAgICAvLyBwYXJhbXNcbiAgICBjb25zdCBwYXJhbXMgPSB1dGlscy5wYXJhbXMoY3QpO1xuICAgIGZvciAoY29uc3Qga2V5IGluIHBhcmFtcykgdGhpc1trZXldID0gcGFyYW1zW2tleV07XG5cbiAgICB0aGlzLmxpbmtzID0ge307XG5cbiAgICAvLyBsaW5rc1xuICAgIHRyeSB7XG4gICAgICAgIGlmIChoZWFkZXIubGluaykge1xuICAgICAgICAgICAgdGhpcy5saW5rcyA9IHV0aWxzLnBhcnNlTGlua3MoaGVhZGVyLmxpbmspO1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgIH1cbn07XG5cbi8qKlxuICogU2V0IGZsYWdzIHN1Y2ggYXMgYC5va2AgYmFzZWQgb24gYHN0YXR1c2AuXG4gKlxuICogRm9yIGV4YW1wbGUgYSAyeHggcmVzcG9uc2Ugd2lsbCBnaXZlIHlvdSBhIGAub2tgIG9mIF9fdHJ1ZV9fXG4gKiB3aGVyZWFzIDV4eCB3aWxsIGJlIF9fZmFsc2VfXyBhbmQgYC5lcnJvcmAgd2lsbCBiZSBfX3RydWVfXy4gVGhlXG4gKiBgLmNsaWVudEVycm9yYCBhbmQgYC5zZXJ2ZXJFcnJvcmAgYXJlIGFsc28gYXZhaWxhYmxlIHRvIGJlIG1vcmVcbiAqIHNwZWNpZmljLCBhbmQgYC5zdGF0dXNUeXBlYCBpcyB0aGUgY2xhc3Mgb2YgZXJyb3IgcmFuZ2luZyBmcm9tIDEuLjVcbiAqIHNvbWV0aW1lcyB1c2VmdWwgZm9yIG1hcHBpbmcgcmVzcG9uZCBjb2xvcnMgZXRjLlxuICpcbiAqIFwic3VnYXJcIiBwcm9wZXJ0aWVzIGFyZSBhbHNvIGRlZmluZWQgZm9yIGNvbW1vbiBjYXNlcy4gQ3VycmVudGx5IHByb3ZpZGluZzpcbiAqXG4gKiAgIC0gLm5vQ29udGVudFxuICogICAtIC5iYWRSZXF1ZXN0XG4gKiAgIC0gLnVuYXV0aG9yaXplZFxuICogICAtIC5ub3RBY2NlcHRhYmxlXG4gKiAgIC0gLm5vdEZvdW5kXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHN0YXR1c1xuICogQGFwaSBwcml2YXRlXG4gKi9cblxuUmVzcG9uc2VCYXNlLnByb3RvdHlwZS5fc2V0U3RhdHVzUHJvcGVydGllcyA9IGZ1bmN0aW9uKHN0YXR1cyl7XG4gICAgY29uc3QgdHlwZSA9IHN0YXR1cyAvIDEwMCB8IDA7XG5cbiAgICAvLyBzdGF0dXMgLyBjbGFzc1xuICAgIHRoaXMuc3RhdHVzID0gdGhpcy5zdGF0dXNDb2RlID0gc3RhdHVzO1xuICAgIHRoaXMuc3RhdHVzVHlwZSA9IHR5cGU7XG5cbiAgICAvLyBiYXNpY3NcbiAgICB0aGlzLmluZm8gPSAxID09IHR5cGU7XG4gICAgdGhpcy5vayA9IDIgPT0gdHlwZTtcbiAgICB0aGlzLnJlZGlyZWN0ID0gMyA9PSB0eXBlO1xuICAgIHRoaXMuY2xpZW50RXJyb3IgPSA0ID09IHR5cGU7XG4gICAgdGhpcy5zZXJ2ZXJFcnJvciA9IDUgPT0gdHlwZTtcbiAgICB0aGlzLmVycm9yID0gKDQgPT0gdHlwZSB8fCA1ID09IHR5cGUpXG4gICAgICAgID8gdGhpcy50b0Vycm9yKClcbiAgICAgICAgOiBmYWxzZTtcblxuICAgIC8vIHN1Z2FyXG4gICAgdGhpcy5jcmVhdGVkID0gMjAxID09IHN0YXR1cztcbiAgICB0aGlzLmFjY2VwdGVkID0gMjAyID09IHN0YXR1cztcbiAgICB0aGlzLm5vQ29udGVudCA9IDIwNCA9PSBzdGF0dXM7XG4gICAgdGhpcy5iYWRSZXF1ZXN0ID0gNDAwID09IHN0YXR1cztcbiAgICB0aGlzLnVuYXV0aG9yaXplZCA9IDQwMSA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RBY2NlcHRhYmxlID0gNDA2ID09IHN0YXR1cztcbiAgICB0aGlzLmZvcmJpZGRlbiA9IDQwMyA9PSBzdGF0dXM7XG4gICAgdGhpcy5ub3RGb3VuZCA9IDQwNCA9PSBzdGF0dXM7XG4gICAgdGhpcy51bnByb2Nlc3NhYmxlRW50aXR5ID0gNDIyID09IHN0YXR1cztcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmV0dXJuIHRoZSBtaW1lIHR5cGUgZm9yIHRoZSBnaXZlbiBgc3RyYC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLnR5cGUgPSBzdHIgPT4gc3RyLnNwbGl0KC8gKjsgKi8pLnNoaWZ0KCk7XG5cbi8qKlxuICogUmV0dXJuIGhlYWRlciBmaWVsZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJcbiAqIEByZXR1cm4ge09iamVjdH1cbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmV4cG9ydHMucGFyYW1zID0gc3RyID0+IHN0ci5zcGxpdCgvICo7ICovKS5yZWR1Y2UoKG9iaiwgc3RyKSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KC8gKj0gKi8pO1xuICBjb25zdCBrZXkgPSBwYXJ0cy5zaGlmdCgpO1xuICBjb25zdCB2YWwgPSBwYXJ0cy5zaGlmdCgpO1xuXG4gIGlmIChrZXkgJiYgdmFsKSBvYmpba2V5XSA9IHZhbDtcbiAgcmV0dXJuIG9iajtcbn0sIHt9KTtcblxuLyoqXG4gKiBQYXJzZSBMaW5rIGhlYWRlciBmaWVsZHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHN0clxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwcml2YXRlXG4gKi9cblxuZXhwb3J0cy5wYXJzZUxpbmtzID0gc3RyID0+IHN0ci5zcGxpdCgvICosICovKS5yZWR1Y2UoKG9iaiwgc3RyKSA9PiB7XG4gIGNvbnN0IHBhcnRzID0gc3RyLnNwbGl0KC8gKjsgKi8pO1xuICBjb25zdCB1cmwgPSBwYXJ0c1swXS5zbGljZSgxLCAtMSk7XG4gIGNvbnN0IHJlbCA9IHBhcnRzWzFdLnNwbGl0KC8gKj0gKi8pWzFdLnNsaWNlKDEsIC0xKTtcbiAgb2JqW3JlbF0gPSB1cmw7XG4gIHJldHVybiBvYmo7XG59LCB7fSk7XG5cbi8qKlxuICogU3RyaXAgY29udGVudCByZWxhdGVkIGZpZWxkcyBmcm9tIGBoZWFkZXJgLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBoZWFkZXJcbiAqIEByZXR1cm4ge09iamVjdH0gaGVhZGVyXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuXG5leHBvcnRzLmNsZWFuSGVhZGVyID0gKGhlYWRlciwgY2hhbmdlc09yaWdpbikgPT4ge1xuICBkZWxldGUgaGVhZGVyWydjb250ZW50LXR5cGUnXTtcbiAgZGVsZXRlIGhlYWRlclsnY29udGVudC1sZW5ndGgnXTtcbiAgZGVsZXRlIGhlYWRlclsndHJhbnNmZXItZW5jb2RpbmcnXTtcbiAgZGVsZXRlIGhlYWRlclsnaG9zdCddO1xuICAvLyBzZWN1aXJ0eVxuICBpZiAoY2hhbmdlc09yaWdpbikge1xuICAgIGRlbGV0ZSBoZWFkZXJbJ2F1dGhvcml6YXRpb24nXTtcbiAgICBkZWxldGUgaGVhZGVyWydjb29raWUnXTtcbiAgfVxuICByZXR1cm4gaGVhZGVyO1xufTtcbiIsIi8qKlxuICogVXRpbGl0eSBtZXRob2RzIHVzZWQgd2hlbiBxdWVyeWluZyBhIHNpdGUgaW4gb3JkZXIgdG8gZGlzY292ZXIgaXRzIGF2YWlsYWJsZVxuICogQVBJIGVuZHBvaW50c1xuICpcbiAqIEBtb2R1bGUgYXV0b2Rpc2NvdmVyeVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IHBhcnNlTGlua0hlYWRlciA9IHJlcXVpcmUoICdsaScgKS5wYXJzZTtcblxuLyoqXG4gKiBBdHRlbXB0IHRvIGxvY2F0ZSBhIGByZWw9XCJodHRwczovL2FwaS53Lm9yZ1wiYCBsaW5rIHJlbGF0aW9uIGhlYWRlclxuICpcbiAqIEBtZXRob2QgbG9jYXRlQVBJUm9vdEhlYWRlclxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlIEEgcmVzcG9uc2Ugb2JqZWN0IHdpdGggYSBsaW5rIG9yIGhlYWRlcnMgcHJvcGVydHlcbiAqIEByZXR1cm5zIHtTdHJpbmd9IFRoZSBVUkwgb2YgdGhlIGxvY2F0ZWQgQVBJIHJvb3RcbiAqL1xuZnVuY3Rpb24gbG9jYXRlQVBJUm9vdEhlYWRlciggcmVzcG9uc2UgKSB7XG5cdC8vIFNlZSBodHRwczovL2RldmVsb3Blci53b3JkcHJlc3Mub3JnL3Jlc3QtYXBpL3VzaW5nLXRoZS1yZXN0LWFwaS9kaXNjb3ZlcnkvXG5cdGNvbnN0IHJlbCA9ICdodHRwczovL2FwaS53Lm9yZy8nO1xuXG5cdC8vIEV4dHJhY3QgJiBwYXJzZSB0aGUgcmVzcG9uc2UgbGluayBoZWFkZXJzXG5cdGNvbnN0IGxpbmsgPSByZXNwb25zZS5saW5rIHx8ICggcmVzcG9uc2UuaGVhZGVycyAmJiByZXNwb25zZS5oZWFkZXJzLmxpbmsgKTtcblx0Y29uc3QgaGVhZGVycyA9IHBhcnNlTGlua0hlYWRlciggbGluayApO1xuXG5cdGNvbnN0IGFwaUhlYWRlciA9IGhlYWRlcnMgJiYgaGVhZGVyc1sgcmVsIF07XG5cblx0aWYgKCBhcGlIZWFkZXIgKSB7XG5cdFx0cmV0dXJuIGFwaUhlYWRlcjtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvciggYE5vIGhlYWRlciBsaW5rIGZvdW5kIHdpdGggcmVsPVwiJHsgcmVsIH1cImAgKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGxvY2F0ZUFQSVJvb3RIZWFkZXI6IGxvY2F0ZUFQSVJvb3RIZWFkZXIsXG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBxcyA9IHJlcXVpcmUoICdxcycgKTtcblxuY29uc3QgYWxwaGFOdW1lcmljU29ydCA9IHJlcXVpcmUoICcuLi91dGlsL2FscGhhbnVtZXJpYy1zb3J0JyApO1xuY29uc3Qga2V5VmFsVG9PYmogPSByZXF1aXJlKCAnLi4vdXRpbC9rZXktdmFsLXRvLW9iaicgKTtcbmNvbnN0IHBhcmFtU2V0dGVyID0gcmVxdWlyZSggJy4uL3V0aWwvcGFyYW1ldGVyLXNldHRlcicgKTtcbmNvbnN0IG9iamVjdFJlZHVjZSA9IHJlcXVpcmUoICcuLi91dGlsL29iamVjdC1yZWR1Y2UnICk7XG5jb25zdCB1bmlxdWUgPSByZXF1aXJlKCAnLi4vdXRpbC91bmlxdWUnICk7XG5cbi8qKlxuICogV1BSZXF1ZXN0IGlzIHRoZSBiYXNlIEFQSSByZXF1ZXN0IG9iamVjdCBjb25zdHJ1Y3RvclxuICpcbiAqIEBjb25zdHJ1Y3RvciBXUFJlcXVlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIEEgaGFzaCBvZiBvcHRpb25zIGZvciB0aGUgV1BSZXF1ZXN0IGluc3RhbmNlXG4gKiBAcGFyYW0ge1N0cmluZ30gb3B0aW9ucy5lbmRwb2ludCBUaGUgZW5kcG9pbnQgVVJJIGZvciB0aGUgaW52b2tpbmcgV1BBUEkgaW5zdGFuY2VcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnRyYW5zcG9ydCBBbiBvYmplY3Qgb2YgaHR0cCB0cmFuc3BvcnQgbWV0aG9kcyAoZ2V0LCBwb3N0LCBldGMpXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudXNlcm5hbWVdIEEgdXNlcm5hbWUgZm9yIGF1dGhlbnRpY2F0aW5nIEFQSSByZXF1ZXN0c1xuICogQHBhcmFtIHtTdHJpbmd9IFtvcHRpb25zLnBhc3N3b3JkXSBBIHBhc3N3b3JkIGZvciBhdXRoZW50aWNhdGluZyBBUEkgcmVxdWVzdHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5ub25jZV0gQSBXUCBub25jZSBmb3IgdXNlIHdpdGggY29va2llIGF1dGhlbnRpY2F0aW9uXG4gKi9cbmZ1bmN0aW9uIFdQUmVxdWVzdCggb3B0aW9ucyApIHtcblx0LyoqXG5cdCAqIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3IgdGhlIHJlcXVlc3Rcblx0ICpcblx0ICogQHByb3BlcnR5IF9vcHRpb25zXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAZGVmYXVsdCB7fVxuXHQgKi9cblx0dGhpcy5fb3B0aW9ucyA9IFtcblx0XHQvLyBXaGl0ZWxpc3RlZCBvcHRpb25zIGtleXNcblx0XHQnYXV0aCcsXG5cdFx0J2VuZHBvaW50Jyxcblx0XHQnaGVhZGVycycsXG5cdFx0J3VzZXJuYW1lJyxcblx0XHQncGFzc3dvcmQnLFxuXHRcdCdub25jZScsXG5cdF0ucmVkdWNlKCAoIGxvY2FsT3B0aW9ucywga2V5ICkgPT4ge1xuXHRcdGlmICggb3B0aW9ucyAmJiBvcHRpb25zWyBrZXkgXSApIHtcblx0XHRcdGxvY2FsT3B0aW9uc1sga2V5IF0gPSBvcHRpb25zWyBrZXkgXTtcblx0XHR9XG5cdFx0cmV0dXJuIGxvY2FsT3B0aW9ucztcblx0fSwge30gKTtcblxuXHQvKipcblx0ICogVGhlIEhUVFAgdHJhbnNwb3J0IG1ldGhvZHMgKC5nZXQsIC5wb3N0LCAucHV0LCAuZGVsZXRlLCAuaGVhZCkgdG8gdXNlIGZvciB0aGlzIHJlcXVlc3Rcblx0ICpcblx0ICogQHByb3BlcnR5IHRyYW5zcG9ydFxuXHQgKiBAdHlwZSB7T2JqZWN0fVxuXHQgKiBAcHJpdmF0ZVxuXHQgKi9cblx0dGhpcy50cmFuc3BvcnQgPSBvcHRpb25zICYmIG9wdGlvbnMudHJhbnNwb3J0O1xuXG5cdC8qKlxuXHQgKiBBIGhhc2ggb2YgcXVlcnkgcGFyYW1ldGVyc1xuXHQgKiBUaGlzIGlzIHVzZWQgdG8gc3RvcmUgdGhlIHZhbHVlcyBmb3Igc3VwcG9ydGVkIHF1ZXJ5IHBhcmFtZXRlcnMgbGlrZSA/X2VtYmVkXG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSBfcGFyYW1zXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAZGVmYXVsdCB7fVxuXHQgKi9cblx0dGhpcy5fcGFyYW1zID0ge307XG5cblx0LyoqXG5cdCAqIE1ldGhvZHMgc3VwcG9ydGVkIGJ5IHRoaXMgQVBJIHJlcXVlc3QgaW5zdGFuY2U6XG5cdCAqIEluZGl2aWR1YWwgZW5kcG9pbnQgaGFuZGxlcnMgc3BlY2lmeSB0aGVpciBvd24gc3Vic2V0IG9mIHN1cHBvcnRlZCBtZXRob2RzXG5cdCAqXG5cdCAqIEBwcm9wZXJ0eSBfc3VwcG9ydGVkTWV0aG9kc1xuXHQgKiBAdHlwZSBBcnJheVxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAZGVmYXVsdCBbICdoZWFkJywgJ2dldCcsICdwdXQnLCAncG9zdCcsICdkZWxldGUnIF1cblx0ICovXG5cdHRoaXMuX3N1cHBvcnRlZE1ldGhvZHMgPSBbICdoZWFkJywgJ2dldCcsICdwdXQnLCAncG9zdCcsICdkZWxldGUnIF07XG5cblx0LyoqXG5cdCAqIEEgaGFzaCBvZiB2YWx1ZXMgdG8gYXNzZW1ibGUgaW50byB0aGUgQVBJIHJlcXVlc3QgcGF0aFxuXHQgKiAoVGhpcyB3aWxsIGJlIG92ZXJ3cml0dGVuIGJ5IGVhY2ggc3BlY2lmaWMgZW5kcG9pbnQgaGFuZGxlciBjb25zdHJ1Y3Rvcilcblx0ICpcblx0ICogQHByb3BlcnR5IF9wYXRoXG5cdCAqIEB0eXBlIE9iamVjdFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAZGVmYXVsdCB7fVxuXHQgKi9cblx0dGhpcy5fcGF0aCA9IHt9O1xufVxuXG4vLyBQcml2YXRlIGhlbHBlciBtZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogSWRlbnRpdHkgZnVuY3Rpb24gZm9yIHVzZSB3aXRoaW4gaW52b2tlQW5kUHJvbWlzaWZ5KClcbiAqIEBwcml2YXRlXG4gKi9cbmNvbnN0IGlkZW50aXR5ID0gdmFsdWUgPT4gdmFsdWU7XG5cbi8qKlxuICogUHJvY2VzcyBhcnJheXMgb2YgdGF4b25vbXkgdGVybXMgaW50byBxdWVyeSBwYXJhbWV0ZXJzLlxuICogQWxsIHRlcm1zIGxpc3RlZCBpbiB0aGUgYXJyYXlzIHdpbGwgYmUgcmVxdWlyZWQgKEFORCBiZWhhdmlvcikuXG4gKlxuICogVGhpcyBtZXRob2Qgd2lsbCBub3QgYmUgY2FsbGVkIHdpdGggYW55IHZhbHVlcyB1bmxlc3Mgd2UgYXJlIGhhbmRsaW5nXG4gKiBhbiBlbmRwb2ludCB3aXRoIHRoZSBmaWx0ZXIgbWl4aW47IGhvd2V2ZXIsIHNpbmNlIHBhcmFtZXRlciBoYW5kbGluZ1xuICogKGFuZCB0aGVyZWZvcmUgYF9yZW5kZXJRdWVyeSgpYCkgYXJlIHBhcnQgb2YgV1BSZXF1ZXN0IGl0c2VsZiwgdGhpc1xuICogaGVscGVyIG1ldGhvZCBsaXZlcyBoZXJlIGFsb25nc2lkZSB0aGUgY29kZSB3aGVyZSBpdCBpcyB1c2VkLlxuICpcbiAqIEBleGFtcGxlXG4gKiAgICAgcHJlcGFyZVRheG9ub21pZXMoe1xuICogICAgICAgICB0YWc6IFsgJ3RhZzEgJywgJ3RhZzInIF0sIC8vIGJ5IHRlcm0gc2x1Z1xuICogICAgICAgICBjYXQ6IFsgNyBdIC8vIGJ5IHRlcm0gSURcbiAqICAgICB9KSA9PT0ge1xuICogICAgICAgICB0YWc6ICd0YWcxK3RhZzInLFxuICogICAgICAgICBjYXQ6ICc3J1xuICogICAgIH1cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHRheG9ub215RmlsdGVycyBBbiBvYmplY3Qgb2YgdGF4b25vbXkgdGVybSBhcnJheXMsIGtleWVkIGJ5IHRheG9ub215IG5hbWVcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBvZiBwcmVwYXJlRmlsdGVycy1yZWFkeSBxdWVyeSBhcmcgYW5kIHF1ZXJ5IHBhcmFtIHZhbHVlIHBhaXJzXG4gKi9cbmZ1bmN0aW9uIHByZXBhcmVUYXhvbm9taWVzKCB0YXhvbm9teUZpbHRlcnMgKSB7XG5cdGlmICggISB0YXhvbm9teUZpbHRlcnMgKSB7XG5cdFx0cmV0dXJuIHt9O1xuXHR9XG5cblx0cmV0dXJuIG9iamVjdFJlZHVjZShcblx0XHR0YXhvbm9teUZpbHRlcnMsXG5cdFx0KCByZXN1bHQsIHRlcm1zLCBrZXkgKSA9PiB7XG5cdFx0XHQvLyBUcmltIHdoaXRlc3BhY2UgYW5kIGNvbmNhdGVuYXRlIG11bHRpcGxlIHRlcm1zIHdpdGggK1xuXHRcdFx0cmVzdWx0WyBrZXkgXSA9IHRlcm1zXG5cdFx0XHRcdC8vIENvZXJjZSB0ZXJtIGludG8gYSBzdHJpbmcgc28gdGhhdCB0cmltKCkgd29uJ3QgZmFpbFxuXHRcdFx0XHQubWFwKCB0ZXJtID0+ICggdGVybSArICcnICkudHJpbSgpLnRvTG93ZXJDYXNlKCkgKVxuXHRcdFx0XHQuam9pbiggJysnICk7XG5cblx0XHRcdHJldHVybiByZXN1bHQ7XG5cdFx0fSxcblx0XHR7fVxuXHQpO1xufVxuXG4vKipcbiAqIFJldHVybiBhbiBvYmplY3Qgd2l0aCBhbnkgcHJvcGVydGllcyB3aXRoIHVuZGVmaW5lZCwgbnVsbCBvciBlbXB0eSBzdHJpbmdcbiAqIHZhbHVlcyByZW1vdmVkLlxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIHBvcHVsYXRlZCh7XG4gKiAgICAgICBhOiAnYScsXG4gKiAgICAgICBiOiAnJyxcbiAqICAgICAgIGM6IG51bGxcbiAqICAgICB9KTsgLy8geyBhOiAnYScgfVxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIEFuIG9iamVjdCBvZiBrZXkvdmFsdWUgcGFpcnNcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoYXQgb2JqZWN0IHdpdGggYWxsIGVtcHR5IHZhbHVlcyByZW1vdmVkXG4gKi9cbmNvbnN0IHBvcHVsYXRlZCA9ICggb2JqICkgPT4ge1xuXHRpZiAoICEgb2JqICkge1xuXHRcdHJldHVybiBvYmo7XG5cdH1cblx0cmV0dXJuIG9iamVjdFJlZHVjZShcblx0XHRvYmosXG5cdFx0KCB2YWx1ZXMsIHZhbCwga2V5ICkgPT4ge1xuXHRcdFx0aWYgKCB2YWwgIT09IHVuZGVmaW5lZCAmJiB2YWwgIT09IG51bGwgJiYgdmFsICE9PSAnJyApIHtcblx0XHRcdFx0dmFsdWVzWyBrZXkgXSA9IHZhbDtcblx0XHRcdH1cblx0XHRcdHJldHVybiB2YWx1ZXM7XG5cdFx0fSxcblx0XHR7fVxuXHQpO1xufTtcblxuLyoqXG4gKiBBc3NlcnQgd2hldGhlciBhIHByb3ZpZGVkIFVSTCBjb21wb25lbnQgaXMgXCJ2YWxpZFwiIGJ5IGNoZWNraW5nIGl0IGFnYWluc3RcbiAqIGFuIGFycmF5IG9mIHJlZ2lzdGVyZWQgcGF0aCBjb21wb25lbnQgdmFsaWRhdG9yIG1ldGhvZHMgZm9yIHRoYXQgbGV2ZWwgb2ZcbiAqIHRoZSBVUkwgcGF0aC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtvYmplY3RbXX0gbGV2ZWxEZWZpbml0aW9ucyBBbiBhcnJheSBvZiBMZXZlbCBEZWZpbml0aW9uIG9iamVjdHNcbiAqIEBwYXJhbSB7c3RyaW5nfSAgIGxldmVsQ29udGVudHMgICAgVGhlIFVSTCBwYXRoIHN0cmluZyB0aGF0IGhhcyBiZWVuIHNwZWNpZmllZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgdXNlIG9uIHRoZSBwcm92aWRlZCBsZXZlbFxuICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3ZpZGVkIGlucHV0IG1hdGNoZXMgYW55IG9mIHRoZSBwcm92aWRlZFxuICogbGV2ZWwgdmFsaWRhdGlvbiBmdW5jdGlvbnNcbiAqL1xuY29uc3QgdmFsaWRhdGVQYXRoTGV2ZWwgPSAoIGxldmVsRGVmaW5pdGlvbnMsIGxldmVsQ29udGVudHMgKSA9PiB7XG5cdC8vIE9uZSBcImxldmVsXCIgbWF5IGhhdmUgbXVsdGlwbGUgb3B0aW9ucywgYXMgYSByb3V0ZSB0cmVlIGlzIGEgYnJhbmNoaW5nXG5cdC8vIHN0cnVjdHVyZS4gV2UgY29uc2lkZXIgYSBsZXZlbCBcInZhbGlkXCIgaWYgdGhlIHByb3ZpZGVkIGxldmVsQ29udGVudHNcblx0Ly8gbWF0Y2ggYW55IG9mIHRoZSBhdmFpbGFibGUgdmFsaWRhdG9ycy5cblx0Y29uc3QgdmFsaWQgPSBsZXZlbERlZmluaXRpb25zLnJlZHVjZSggKCBhbnlPcHRpb25WYWxpZCwgbGV2ZWxPcHRpb24gKSA9PiB7XG5cdFx0aWYgKCAhIGxldmVsT3B0aW9uLnZhbGlkYXRlICkge1xuXHRcdFx0Ly8gSWYgdGhlcmUgaXMgbm8gdmFsaWRhdG9yIGZ1bmN0aW9uLCB0aGUgbGV2ZWwgaXMgaW1wbGljaXRseSB2YWxpZFxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXHRcdHJldHVybiBhbnlPcHRpb25WYWxpZCB8fCBsZXZlbE9wdGlvbi52YWxpZGF0ZSggbGV2ZWxDb250ZW50cyApO1xuXHR9LCBmYWxzZSApO1xuXG5cdGlmICggISB2YWxpZCApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIFtcblx0XHRcdCdJbnZhbGlkIHBhdGggY29tcG9uZW50OicsXG5cdFx0XHRsZXZlbENvbnRlbnRzLFxuXHRcdFx0Ly8gYXdrd2FyZCBwbHVyYWxpemF0aW9uIHN1cHBvcnQ6XG5cdFx0XHQnZG9lcyBub3QgbWF0Y2gnICsgKCBsZXZlbERlZmluaXRpb25zLmxlbmd0aCA+IDEgPyAnIGFueSBvZicgOiAnJyApLFxuXHRcdFx0bGV2ZWxEZWZpbml0aW9ucy5yZWR1Y2UoXG5cdFx0XHRcdCggY29tcG9uZW50cywgbGV2ZWxPcHRpb24gKSA9PiBjb21wb25lbnRzLmNvbmNhdCggbGV2ZWxPcHRpb24uY29tcG9uZW50ICksXG5cdFx0XHRcdFtdXG5cdFx0XHQpLmpvaW4oICcsICcgKSxcblx0XHRdLmpvaW4oICcgJyApICk7XG5cdH1cbn07XG5cbi8vIChTZW1pLSlQcml2YXRlIFByb3RvdHlwZSBNZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFByb2Nlc3MgdGhlIGVuZHBvaW50IHF1ZXJ5J3MgZmlsdGVyIG9iamVjdHMgaW50byBhIHZhbGlkIHF1ZXJ5IHN0cmluZy5cbiAqIE5lc3RlZCBvYmplY3RzIGFuZCBBcnJheSBwcm9wZXJ0aWVzIGFyZSByZW5kZXJlZCB3aXRoIGluZGV4ZWQgYXJyYXkgc3ludGF4LlxuICpcbiAqIEBleGFtcGxlXG4gKiAgICAgX3JlbmRlclF1ZXJ5KHsgcDE6ICd2YWwxJywgcDI6ICd2YWwyJyB9KTsgIC8vID9wMT12YWwxJnAyPXZhbDJcbiAqICAgICBfcmVuZGVyUXVlcnkoeyBvYmo6IHsgcHJvcDogJ3ZhbCcgfSB9KTsgICAgLy8gP29ialtwcm9wXT12YWxcbiAqICAgICBfcmVuZGVyUXVlcnkoeyBhcnI6IFsgJ3ZhbDEnLCAndmFsMicgXSB9KTsgLy8gP2FyclswXT12YWwxJmFyclsxXT12YWwyXG4gKlxuICogQHByaXZhdGVcbiAqXG4gKiBAbWV0aG9kIF9yZW5kZXJRdWVyeVxuICogQHJldHVybnMge1N0cmluZ30gQSBxdWVyeSBzdHJpbmcgcmVwcmVzZW50aW5nIHRoZSBzcGVjaWZpZWQgZmlsdGVyIHBhcmFtZXRlcnNcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5fcmVuZGVyUXVlcnkgPSBmdW5jdGlvbigpIHtcblx0Ly8gQnVpbGQgdGhlIGZ1bGwgcXVlcnkgcGFyYW1ldGVycyBvYmplY3Rcblx0Y29uc3QgcXVlcnlQYXJhbXMgPSB7XG5cdFx0Li4ucG9wdWxhdGVkKCB0aGlzLl9wYXJhbXMgKSxcblx0fTtcblxuXHQvLyBQcmVwYXJlIGFueSB0YXhvbm9taWVzIGFuZCBtZXJnZSB3aXRoIG90aGVyIGZpbHRlciB2YWx1ZXNcblx0Y29uc3QgdGF4b25vbWllcyA9IHByZXBhcmVUYXhvbm9taWVzKCB0aGlzLl90YXhvbm9teUZpbHRlcnMgKTtcblx0cXVlcnlQYXJhbXMuZmlsdGVyID0ge1xuXHRcdC4uLnBvcHVsYXRlZCggdGhpcy5fZmlsdGVycyApLFxuXHRcdC4uLnRheG9ub21pZXMsXG5cdH07XG5cblx0Ly8gUGFyc2UgcXVlcnkgcGFyYW1ldGVycyBvYmplY3QgaW50byBhIHF1ZXJ5IHN0cmluZywgc29ydGluZyB0aGUgb2JqZWN0XG5cdC8vIHByb3BlcnRpZXMgYnkgYWxwaGFiZXRpY2FsIG9yZGVyIChjb25zaXN0ZW50IHByb3BlcnR5IG9yZGVyaW5nIGNhbiBtYWtlXG5cdC8vIGZvciBlYXNpZXIgY2FjaGluZyBvZiByZXF1ZXN0IFVSSXMpXG5cdGNvbnN0IHF1ZXJ5U3RyaW5nID0gcXMuc3RyaW5naWZ5KCBxdWVyeVBhcmFtcywgeyBhcnJheUZvcm1hdDogJ2JyYWNrZXRzJyB9IClcblx0XHQuc3BsaXQoICcmJyApXG5cdFx0LnNvcnQoKVxuXHRcdC5qb2luKCAnJicgKTtcblxuXHQvLyBDaGVjayBpZiB0aGUgZW5kcG9pbnQgY29udGFpbnMgYSBwcmV2aW91cyBxdWVyeSBhbmQgc2V0IHRoZSBxdWVyeSBjaGFyYWN0ZXIgYWNjb3JkaW5nbHkuXG5cdGNvbnN0IHF1ZXJ5Q2hhcmFjdGVyID0gL1xcPy8udGVzdCggdGhpcy5fb3B0aW9ucy5lbmRwb2ludCApID8gJyYnIDogJz8nO1xuXG5cdC8vIFByZXBlbmQgYSBcIj9cIiAob3IgYSBcIiZcIikgaWYgYSBxdWVyeSBpcyBwcmVzZW50LCBhbmQgcmV0dXJuLlxuXHRyZXR1cm4gKCBxdWVyeVN0cmluZyA9PT0gJycgKSA/ICcnIDogcXVlcnlDaGFyYWN0ZXIgKyBxdWVyeVN0cmluZztcbn07XG5cbi8qKlxuICogVmFsaWRhdGUgJiBhc3NlbWJsZSBhIHBhdGggc3RyaW5nIGZyb20gdGhlIHJlcXVlc3Qgb2JqZWN0J3MgX3BhdGhcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHJldHVybnMge1N0cmluZ30gVGhlIHJlbmRlcmVkIHBhdGhcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5fcmVuZGVyUGF0aCA9IGZ1bmN0aW9uKCkge1xuXHQvLyBDYWxsIHZhbGlkYXRlUGF0aDogaWYgdGhlIHByb3ZpZGVkIHBhdGggY29tcG9uZW50cyBhcmUgbm90IHdlbGwtZm9ybWVkLFxuXHQvLyBhbiBlcnJvciB3aWxsIGJlIHRocm93blxuXHR0aGlzLnZhbGlkYXRlUGF0aCgpO1xuXG5cdGNvbnN0IHBhdGhQYXJ0cyA9IHRoaXMuX3BhdGg7XG5cdGNvbnN0IG9yZGVyZWRQYXRoUGFydHMgPSBPYmplY3Qua2V5cyggcGF0aFBhcnRzIClcblx0XHQuc29ydCggKCBhLCBiICkgPT4ge1xuXHRcdFx0Y29uc3QgaW50QSA9IHBhcnNlSW50KCBhLCAxMCApO1xuXHRcdFx0Y29uc3QgaW50QiA9IHBhcnNlSW50KCBiLCAxMCApO1xuXHRcdFx0cmV0dXJuIGludEEgLSBpbnRCO1xuXHRcdH0gKVxuXHRcdC5tYXAoIHBhdGhQYXJ0S2V5ID0+IHBhdGhQYXJ0c1sgcGF0aFBhcnRLZXkgXSApO1xuXG5cdC8vIENvbWJpbmUgYWxsIHBhcnRzIG9mIHRoZSBwYXRoIHRvZ2V0aGVyLCBmaWx0ZXJlZCB0byBvbWl0IGFueSBjb21wb25lbnRzXG5cdC8vIHRoYXQgYXJlIHVuc3BlY2lmaWVkIG9yIGVtcHR5IHN0cmluZ3MsIHRvIGNyZWF0ZSB0aGUgZnVsbCBwYXRoIHRlbXBsYXRlXG5cdGNvbnN0IHBhdGggPSBbXG5cdFx0dGhpcy5fbmFtZXNwYWNlLFxuXHRdLmNvbmNhdCggb3JkZXJlZFBhdGhQYXJ0cyApLmZpbHRlciggaWRlbnRpdHkgKS5qb2luKCAnLycgKTtcblxuXHRyZXR1cm4gcGF0aDtcbn07XG5cbi8vIFB1YmxpYyBQcm90b3R5cGUgTWV0aG9kc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUGFyc2UgdGhlIHJlcXVlc3QgaW50byBhIFdvcmRQcmVzcyBBUEkgcmVxdWVzdCBVUkkgc3RyaW5nXG4gKlxuICogQG1ldGhvZFxuICogQHJldHVybnMge1N0cmluZ30gVGhlIFVSSSBmb3IgdGhlIEhUVFAgcmVxdWVzdCB0byBiZSBzZW50XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcblx0Ly8gUmVuZGVyIHRoZSBwYXRoIHRvIGEgc3RyaW5nXG5cdGNvbnN0IHBhdGggPSB0aGlzLl9yZW5kZXJQYXRoKCk7XG5cblx0Ly8gUmVuZGVyIHRoZSBxdWVyeSBzdHJpbmdcblx0Y29uc3QgcXVlcnlTdHIgPSB0aGlzLl9yZW5kZXJRdWVyeSgpO1xuXG5cdHJldHVybiB0aGlzLl9vcHRpb25zLmVuZHBvaW50ICsgcGF0aCArIHF1ZXJ5U3RyO1xufTtcblxuLyoqXG4gKiBTZXQgYSBjb21wb25lbnQgb2YgdGhlIHJlc291cmNlIFVSTCBpdHNlbGYgKGFzIG9wcG9zZWQgdG8gYSBxdWVyeSBwYXJhbWV0ZXIpXG4gKlxuICogSWYgYSBwYXRoIGNvbXBvbmVudCBoYXMgYWxyZWFkeSBiZWVuIHNldCBhdCB0aGlzIGxldmVsLCB0aHJvdyBhbiBlcnJvcjpcbiAqIHJlcXVlc3RzIGFyZSBtZWFudCB0byBiZSB0cmFuc2llbnQsIHNvIGFueSByZS13cml0aW5nIG9mIGEgcHJldmlvdXNseS1zZXRcbiAqIHBhdGggcGFydCB2YWx1ZSBpcyBsaWtlbHkgdG8gYmUgYSBtaXN0YWtlLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gbGV2ZWwgQSBcImxldmVsXCIgb2YgdGhlIHBhdGggdG8gc2V0LCBlLmcuIFwiMVwiIG9yIFwiMlwiXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHZhbCAgIFRoZSB2YWx1ZSB0byBzZXQgYXQgdGhhdCBwYXRoIHBhcnQgbGV2ZWxcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5zZXRQYXRoUGFydCA9IGZ1bmN0aW9uKCBsZXZlbCwgdmFsICkge1xuXHRpZiAoIHRoaXMuX3BhdGhbIGxldmVsIF0gKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCAnQ2Fubm90IG92ZXJ3cml0ZSB2YWx1ZSAnICsgdGhpcy5fcGF0aFsgbGV2ZWwgXSApO1xuXHR9XG5cdHRoaXMuX3BhdGhbIGxldmVsIF0gPSB2YWw7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFZhbGlkYXRlIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBwYXRoIHBhcnRzIGFyZSB2YWxpZCBmb3IgdGhpcyBlbmRwb2ludFxuICpcbiAqIFwiUGF0aCBwYXJ0c1wiIGFyZSBub24tcXVlcnktc3RyaW5nIFVSTCBzZWdtZW50cywgbGlrZSBcInNvbWVcIiBcInBhdGhcIiBpbiB0aGUgVVJMXG4gKiBgbXlkb21haW4uY29tL3NvbWUvcGF0aD9hbmQ9YSZxdWVyeT1zdHJpbmcmdG9vYC4gQmVjYXVzZSBhIHdlbGwtZm9ybWVkIHBhdGhcbiAqIGlzIG5lY2Vzc2FyeSB0byBleGVjdXRlIGEgc3VjY2Vzc2Z1bCBBUEkgcmVxdWVzdCwgd2UgdGhyb3cgYW4gZXJyb3IgaWYgdGhlXG4gKiB1c2VyIGhhcyBvbWl0dGVkIGEgdmFsdWUgKHN1Y2ggYXMgYC9zb21lL1ttaXNzaW5nIGNvbXBvbmVudF0vdXJsYCkgb3IgaGFzXG4gKiBwcm92aWRlZCBhIHBhdGggcGFydCB2YWx1ZSB0aGF0IGRvZXMgbm90IG1hdGNoIHRoZSByZWd1bGFyIGV4cHJlc3Npb24gdGhlXG4gKiBBUEkgdXNlcyB0byBnb3ZlbiB0aGF0IHNlZ21lbnQuXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHJldHVybnMge1dQUmVxdWVzdH0gVGhlIFdQUmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKSwgaWYgbm8gZXJyb3JzIHdlcmUgZm91bmRcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS52YWxpZGF0ZVBhdGggPSBmdW5jdGlvbigpIHtcblx0Ly8gSXRlcmF0ZSB0aHJvdWdoIGFsbCBfc3BlY2lmaWVkXyBsZXZlbHMgb2YgdGhpcyBlbmRwb2ludFxuXHRjb25zdCBzcGVjaWZpZWRMZXZlbHMgPSBPYmplY3Qua2V5cyggdGhpcy5fcGF0aCApXG5cdFx0Lm1hcCggbGV2ZWwgPT4gcGFyc2VJbnQoIGxldmVsLCAxMCApIClcblx0XHQuZmlsdGVyKCBwYXRoUGFydEtleSA9PiAhIGlzTmFOKCBwYXRoUGFydEtleSApICk7XG5cblx0Y29uc3QgbWF4TGV2ZWwgPSBNYXRoLm1heC5hcHBseSggbnVsbCwgc3BlY2lmaWVkTGV2ZWxzICk7XG5cblx0Ly8gRW5zdXJlIHRoYXQgYWxsIG5lY2Vzc2FyeSBsZXZlbHMgYXJlIHNwZWNpZmllZFxuXHRjb25zdCBwYXRoID0gW107XG5cdGxldCB2YWxpZCA9IHRydWU7XG5cblx0Zm9yICggbGV0IGxldmVsID0gMDsgbGV2ZWwgPD0gbWF4TGV2ZWw7IGxldmVsKysgKSB7XG5cblx0XHRpZiAoICEgdGhpcy5fbGV2ZWxzIHx8ICEgdGhpcy5fbGV2ZWxzWyBsZXZlbCBdICkge1xuXHRcdFx0Y29udGludWU7XG5cdFx0fVxuXG5cdFx0aWYgKCB0aGlzLl9wYXRoWyBsZXZlbCBdICkge1xuXHRcdFx0Ly8gVmFsaWRhdGUgdGhlIHByb3ZpZGVkIHBhdGggbGV2ZWwgYWdhaW5zdCBhbGwgYXZhaWxhYmxlIHBhdGggdmFsaWRhdG9yc1xuXHRcdFx0dmFsaWRhdGVQYXRoTGV2ZWwoIHRoaXMuX2xldmVsc1sgbGV2ZWwgXSwgdGhpcy5fcGF0aFsgbGV2ZWwgXSApO1xuXG5cdFx0XHQvLyBBZGQgdGhlIHBhdGggdmFsdWUgdG8gdGhlIGFycmF5XG5cdFx0XHRwYXRoLnB1c2goIHRoaXMuX3BhdGhbIGxldmVsIF0gKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGF0aC5wdXNoKCAnID8/PyAnICk7XG5cdFx0XHR2YWxpZCA9IGZhbHNlO1xuXHRcdH1cblx0fVxuXG5cdGlmICggISB2YWxpZCApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoICdJbmNvbXBsZXRlIFVSTCEgTWlzc2luZyBjb21wb25lbnQ6IC8nICsgcGF0aC5qb2luKCAnLycgKSApO1xuXHR9XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBhIHBhcmFtZXRlciB0byByZW5kZXIgaW50byB0aGUgZmluYWwgcXVlcnkgVVJJLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gcHJvcHMgVGhlIG5hbWUgb2YgdGhlIHBhcmFtZXRlciB0byBzZXQsIG9yIGFuIG9iamVjdCBjb250YWluaW5nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlciBrZXlzIGFuZCB0aGVpciBjb3JyZXNwb25kaW5nIHZhbHVlc1xuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSBbdmFsdWVdIFRoZSB2YWx1ZSBvZiB0aGUgcGFyYW1ldGVyIGJlaW5nIHNldFxuICogQHJldHVybnMge1dQUmVxdWVzdH0gVGhlIFdQUmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnBhcmFtID0gZnVuY3Rpb24oIHByb3BzLCB2YWx1ZSApIHtcblx0aWYgKCAhIHByb3BzIHx8IHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblx0XHQvLyBXZSBoYXZlIG5vIHByb3BlcnR5IHRvIHNldCwgb3Igbm8gdmFsdWUgdG8gc2V0IGZvciB0aGF0IHByb3BlcnR5XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH1cblxuXHQvLyBXZSBjYW4gdXNlIHRoZSBzYW1lIGl0ZXJhdG9yIGZ1bmN0aW9uIGJlbG93IHRvIGhhbmRsZSBleHBsaWNpdCBrZXktdmFsdWVcblx0Ly8gcGFpcnMgaWYgd2UgY29udmVydCB0aGVtIGludG8gdG8gYW4gb2JqZWN0IHdlIGNhbiBpdGVyYXRlIG92ZXI6XG5cdGlmICggdHlwZW9mIHByb3BzID09PSAnc3RyaW5nJyApIHtcblx0XHRwcm9wcyA9IGtleVZhbFRvT2JqKCBwcm9wcywgdmFsdWUgKTtcblx0fVxuXG5cdC8vIEl0ZXJhdGUgdGhyb3VnaCB0aGUgcHJvcGVydGllc1xuXHRPYmplY3Qua2V5cyggcHJvcHMgKS5mb3JFYWNoKCAoIGtleSApID0+IHtcblx0XHRsZXQgdmFsdWUgPSBwcm9wc1sga2V5IF07XG5cblx0XHQvLyBBcnJheXMgc2hvdWxkIGJlIGRlLWR1cGVkIGFuZCBzb3J0ZWRcblx0XHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbHVlICkgKSB7XG5cdFx0XHR2YWx1ZSA9IHVuaXF1ZSggdmFsdWUgKS5zb3J0KCBhbHBoYU51bWVyaWNTb3J0ICk7XG5cdFx0fVxuXG5cdFx0Ly8gU2V0IHRoZSB2YWx1ZVxuXHRcdHRoaXMuX3BhcmFtc1sga2V5IF0gPSB2YWx1ZTtcblx0fSApO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLy8gR2xvYmFsbHktYXBwbGljYWJsZSBwYXJhbWV0ZXJzIHRoYXQgaW1wYWN0IHRoZSBzaGFwZSBvZiB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFNldCB0aGUgY29udGV4dCBvZiB0aGUgcmVxdWVzdC4gVXNlZCBwcmltYXJpbHkgdG8gZXhwb3NlIHByaXZhdGUgdmFsdWVzIG9uIGFcbiAqIHJlcXVlc3Qgb2JqZWN0IGJ5IHNldHRpbmcgdGhlIGNvbnRleHQgdG8gXCJlZGl0XCIuXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd9IGNvbnRleHQgVGhlIGNvbnRleHQgdG8gc2V0IG9uIHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBUaGUgV1BSZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuY29udGV4dCA9IHBhcmFtU2V0dGVyKCAnY29udGV4dCcgKTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSB3cmFwcGVyIGZvciBgLmNvbnRleHQoICdlZGl0JyApYFxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5lZGl0ID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLmNvbnRleHQoICdlZGl0JyApO1xufTtcblxuLyoqXG4gKiBSZXR1cm4gZW1iZWRkZWQgcmVzb3VyY2VzIGFzIHBhcnQgb2YgdGhlIHJlc3BvbnNlIHBheWxvYWQuXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHJldHVybnMge1dQUmVxdWVzdH0gVGhlIFdQUmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLmVtYmVkID0gZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzLnBhcmFtKCAnX2VtYmVkJywgdHJ1ZSApO1xufTtcblxuLy8gUGFyYW1ldGVycyBzdXBwb3J0ZWQgYnkgYWxsL25lYXJseSBhbGwgZGVmYXVsdCBjb2xsZWN0aW9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIFNldCB0aGUgcGFnaW5hdGlvbiBvZiBhIHJlcXVlc3QuIFVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIGAucGVyUGFnZSgpYCBmb3IgZXhwbGljaXRcbiAqIHBhZ2luYXRpb24gaGFuZGxpbmcuIChUaGUgbnVtYmVyIG9mIHBhZ2VzIGluIGEgcmVzcG9uc2UgY2FuIGJlIHJldHJpZXZlZCBmcm9tIHRoZVxuICogcmVzcG9uc2UncyBgX3BhZ2luZy50b3RhbFBhZ2VzYCBwcm9wZXJ0eS4pXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtOdW1iZXJ9IHBhZ2VOdW1iZXIgVGhlIHBhZ2UgbnVtYmVyIG9mIHJlc3VsdHMgdG8gcmV0cmlldmVcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUucGFnZSA9IHBhcmFtU2V0dGVyKCAncGFnZScgKTtcblxuLyoqXG4gKiBTZXQgdGhlIG51bWJlciBvZiBpdGVtcyB0byBiZSByZXR1cm5lZCBpbiBhIHBhZ2Ugb2YgcmVzcG9uc2VzLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBpdGVtc1BlclBhZ2UgVGhlIG51bWJlciBvZiBpdGVtcyB0byByZXR1cm4gaW4gb25lIHBhZ2Ugb2YgcmVzdWx0c1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5wZXJQYWdlID0gcGFyYW1TZXR0ZXIoICdwZXJfcGFnZScgKTtcblxuLyoqXG4gKiBTZXQgYW4gYXJiaXRyYXJ5IG9mZnNldCB0byByZXRyaWV2ZSBpdGVtcyBmcm9tIGEgc3BlY2lmaWMgcG9pbnQgaW4gYSBjb2xsZWN0aW9uLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBvZmZzZXROdW1iZXIgVGhlIG51bWJlciBvZiBpdGVtcyBieSB3aGljaCB0byBvZmZzZXQgdGhlIHJlc3BvbnNlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLm9mZnNldCA9IHBhcmFtU2V0dGVyKCAnb2Zmc2V0JyApO1xuXG4vKipcbiAqIENoYW5nZSB0aGUgc29ydCBkaXJlY3Rpb24gb2YgYSByZXR1cm5lZCBjb2xsZWN0aW9uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+b3JkZXIgY29tbWVudHMgY2hyb25vbG9naWNhbGx5IChvbGRlc3QgZmlyc3QpPC9jYXB0aW9uPlxuICpcbiAqICAgICBzaXRlLmNvbW1lbnRzKCkub3JkZXIoICdhc2MnICkuLi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gZGlyZWN0aW9uIFRoZSBvcmRlciB0byB1c2Ugd2hlbiBzb3J0aW5nIHRoZSByZXNwb25zZVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5vcmRlciA9IHBhcmFtU2V0dGVyKCAnb3JkZXInICk7XG5cbi8qKlxuICogT3JkZXIgYSBjb2xsZWN0aW9uIGJ5IGEgc3BlY2lmaWMgZmllbGRcbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gZmllbGQgVGhlIGZpZWxkIGJ5IHdoaWNoIHRvIG9yZGVyIHRoZSByZXNwb25zZVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5vcmRlcmJ5ID0gcGFyYW1TZXR0ZXIoICdvcmRlcmJ5JyApO1xuXG4vKipcbiAqIEZpbHRlciByZXN1bHRzIHRvIHRob3NlIG1hdGNoaW5nIHRoZSBzcGVjaWZpZWQgc2VhcmNoIHRlcm1zLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzZWFyY2hTdHJpbmcgQSBzdHJpbmcgdG8gc2VhcmNoIGZvciB3aXRoaW4gcG9zdCBjb250ZW50XG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnNlYXJjaCA9IHBhcmFtU2V0dGVyKCAnc2VhcmNoJyApO1xuXG4vKipcbiAqIEluY2x1ZGUgc3BlY2lmaWMgcmVzb3VyY2UgSURzIGluIHRoZSByZXNwb25zZSBjb2xsZWN0aW9uLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfE51bWJlcltdfSBpZHMgQW4gSUQgb3IgYXJyYXkgb2YgSURzIHRvIGluY2x1ZGVcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuaW5jbHVkZSA9IHBhcmFtU2V0dGVyKCAnaW5jbHVkZScgKTtcblxuLyoqXG4gKiBFeGNsdWRlIHNwZWNpZmljIHJlc291cmNlIElEcyBpbiB0aGUgcmVzcG9uc2UgY29sbGVjdGlvbi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcnxOdW1iZXJbXX0gaWRzIEFuIElEIG9yIGFycmF5IG9mIElEcyB0byBleGNsdWRlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLmV4Y2x1ZGUgPSBwYXJhbVNldHRlciggJ2V4Y2x1ZGUnICk7XG5cbi8qKlxuICogUXVlcnkgYSBjb2xsZWN0aW9uIGZvciBtZW1iZXJzIHdpdGggYSBzcGVjaWZpYyBzbHVnLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBzbHVnIEEgcG9zdCBzbHVnIChzbHVnKSwgZS5nLiBcImhlbGxvLXdvcmxkXCJcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuc2x1ZyA9IHBhcmFtU2V0dGVyKCAnc2x1ZycgKTtcblxuLy8gSFRUUCBUcmFuc3BvcnQgUHJvdG90eXBlIE1ldGhvZHNcbi8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8vIENoYWluaW5nIG1ldGhvZHNcbi8vID09PT09PT09PT09PT09PT1cblxuLyoqXG4gKiBTZXQgdGhlIG5hbWVzcGFjZSBvZiB0aGUgcmVxdWVzdCwgZS5nLiB0byBzcGVjaWZ5IHRoZSBBUEkgcm9vdCBmb3Igcm91dGVzXG4gKiByZWdpc3RlcmVkIGJ5IHdwIGNvcmUgdjIgKFwid3AvdjJcIikgb3IgYnkgYW55IGdpdmVuIHBsdWdpbi4gQW55IHByZXZpb3VzbHktXG4gKiBzZXQgbmFtZXNwYWNlIHdpbGwgYmUgb3ZlcndyaXR0ZW4gYnkgc3Vic2VxdWVudCBjYWxscyB0byB0aGUgbWV0aG9kLlxuICpcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgQSBuYW1lc3BhY2Ugc3RyaW5nLCBlLmcuIFwid3AvdjJcIlxuICogQHJldHVybnMge1dQUmVxdWVzdH0gVGhlIFdQUmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLm5hbWVzcGFjZSA9IGZ1bmN0aW9uKCBuYW1lc3BhY2UgKSB7XG5cdHRoaXMuX25hbWVzcGFjZSA9IG5hbWVzcGFjZTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldCBhIHJlcXVlc3QgdG8gdXNlIGF1dGhlbnRpY2F0aW9uLCBhbmQgb3B0aW9uYWxseSBwcm92aWRlIGF1dGggY3JlZGVudGlhbHNcbiAqXG4gKiBJZiBhdXRoIGNyZWRlbnRpYWxzIHdlcmUgYWxyZWFkeSBzcGVjaWZpZWQgd2hlbiB0aGUgV1BBUEkgaW5zdGFuY2Ugd2FzIGNyZWF0ZWQsIGNhbGxpbmdcbiAqIGAuYXV0aGAgb24gdGhlIHJlcXVlc3QgY2hhaW4gd2lsbCBzZXQgdGhhdCByZXF1ZXN0IHRvIHVzZSB0aGUgZXhpc3RpbmcgY3JlZGVudGlhbHM6XG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+dXNlIGV4aXN0aW5nIGNyZWRlbnRpYWxzPC9jYXB0aW9uPlxuICpcbiAqICAgICByZXF1ZXN0LmF1dGgoKS5nZXQuLi5cbiAqXG4gKiBBbHRlcm5hdGl2ZWx5LCBhIHVzZXJuYW1lICYgcGFzc3dvcmQgKG9yIG5vbmNlKSBjYW4gYmUgZXhwbGljaXRseSBwYXNzZWQgaW50byBgLmF1dGhgOlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPnVzZSBleHBsaWNpdCBiYXNpYyBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFsczwvY2FwdGlvbj5cbiAqXG4gKiAgICAgcmVxdWVzdC5hdXRoKHtcbiAqICAgICAgIHVzZXJuYW1lOiAnYWRtaW4nLFxuICogICAgICAgcGFzc3dvcmQ6ICdzdXBlciBzZWN1cmUnXG4gKiAgICAgfSkuZ2V0Li4uXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+dXNlIGEgbm9uY2UgZm9yIGNvb2tpZSBhdXRoZW50aWNhdGlvbjwvY2FwdGlvbj5cbiAqXG4gKiAgICAgcmVxdWVzdC5hdXRoKHtcbiAqICAgICAgIG5vbmNlOiAnc29tZW5vbmNlJ1xuICogICAgIH0pLi4uXG4gKlxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtPYmplY3R9IGNyZWRlbnRpYWxzICAgICAgICAgICAgQW4gb2JqZWN0IHdpdGggJ3VzZXJuYW1lJyBhbmQgJ3Bhc3N3b3JkJyBzdHJpbmdcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BlcnRpZXMsIG9yIGVsc2UgYSAnbm9uY2UnIHByb3BlcnR5XG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLnVzZXJuYW1lXSBBIFdQLUFQSSBCYXNpYyBIVFRQIEF1dGhlbnRpY2F0aW9uIHVzZXJuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLnBhc3N3b3JkXSBBIFdQLUFQSSBCYXNpYyBIVFRQIEF1dGhlbnRpY2F0aW9uIHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLm5vbmNlXSAgICBBIFdQIG5vbmNlIGZvciB1c2Ugd2l0aCBjb29raWUgYXV0aGVudGljYXRpb25cbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5hdXRoID0gZnVuY3Rpb24oIGNyZWRlbnRpYWxzICkge1xuXHRpZiAoIHR5cGVvZiBjcmVkZW50aWFscyA9PT0gJ29iamVjdCcgKSB7XG5cdFx0aWYgKCB0eXBlb2YgY3JlZGVudGlhbHMudXNlcm5hbWUgPT09ICdzdHJpbmcnICkge1xuXHRcdFx0dGhpcy5fb3B0aW9ucy51c2VybmFtZSA9IGNyZWRlbnRpYWxzLnVzZXJuYW1lO1xuXHRcdH1cblxuXHRcdGlmICggdHlwZW9mIGNyZWRlbnRpYWxzLnBhc3N3b3JkID09PSAnc3RyaW5nJyApIHtcblx0XHRcdHRoaXMuX29wdGlvbnMucGFzc3dvcmQgPSBjcmVkZW50aWFscy5wYXNzd29yZDtcblx0XHR9XG5cblx0XHRpZiAoIGNyZWRlbnRpYWxzLm5vbmNlICkge1xuXHRcdFx0dGhpcy5fb3B0aW9ucy5ub25jZSA9IGNyZWRlbnRpYWxzLm5vbmNlO1xuXHRcdH1cblx0fVxuXG5cdC8vIFNldCB0aGUgXCJhdXRoXCIgb3B0aW9ucyBmbGFnIHRoYXQgd2lsbCBmb3JjZSBhdXRoZW50aWNhdGlvbiBvbiB0aGlzIHJlcXVlc3Rcblx0dGhpcy5fb3B0aW9ucy5hdXRoID0gdHJ1ZTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3BlY2lmeSBhIGZpbGUgb3IgYSBmaWxlIGJ1ZmZlciB0byBhdHRhY2ggdG8gdGhlIHJlcXVlc3QsIGZvciB1c2Ugd2hlblxuICogY3JlYXRpbmcgYSBuZXcgTWVkaWEgaXRlbVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPndpdGhpbiBhIHNlcnZlciBjb250ZXh0PC9jYXB0aW9uPlxuICpcbiAqICAgICB3cC5tZWRpYSgpXG4gKiAgICAgICAvLyBQYXNzIC5maWxlKCkgdGhlIGZpbGUgc3lzdGVtIHBhdGggdG8gYSBmaWxlIHRvIHVwbG9hZFxuICogICAgICAgLmZpbGUoICcvcGF0aC90by9maWxlLmpwZycgKVxuICogICAgICAgLmNyZWF0ZSh7fSkuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj53aXRoaW4gYSBicm93c2VyIGNvbnRleHQ8L2NhcHRpb24+XG4gKlxuICogICAgIHdwLm1lZGlhKClcbiAqICAgICAgIC8vIFBhc3MgLmZpbGUoKSB0aGUgZmlsZSByZWZlcmVuY2UgZnJvbSBhbiBIVE1MIGZpbGUgaW5wdXRcbiAqICAgICAgIC5maWxlKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCAnaW5wdXRbdHlwZT1cImZpbGVcIl0nICkuZmlsZXNbMF0gKVxuICogICAgICAgLmNyZWF0ZSh7fSkuLi5cbiAqXG4gKiBAbWV0aG9kXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IGZpbGUgICBBIHBhdGggdG8gYSBmaWxlIChpbiBOb2RlKSBvciBhbiBmaWxlIG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKE5vZGUgb3IgQnJvd3NlcikgdG8gYXR0YWNoIHRvIHRoZSByZXF1ZXN0XG4gKiBAcGFyYW0ge3N0cmluZ30gICAgICAgIFtuYW1lXSBBbiAob3B0aW9uYWwpIGZpbGVuYW1lIHRvIHVzZSBmb3IgdGhlIGZpbGVcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5maWxlID0gZnVuY3Rpb24oIGZpbGUsIG5hbWUgKSB7XG5cdHRoaXMuX2F0dGFjaG1lbnQgPSBmaWxlO1xuXHQvLyBFeHBsaWNpdGx5IHNldCB0byB1bmRlZmluZWQgaWYgbm90IHByb3ZpZGVkLCB0byBvdmVycmlkZSBhbnkgcHJldmlvdXNseS1cblx0Ly8gc2V0IGF0dGFjaG1lbnQgbmFtZSBwcm9wZXJ0eSB0aGF0IG1pZ2h0IGV4aXN0IGZyb20gYSBwcmlvciBgLmZpbGUoKWAgY2FsbFxuXHR0aGlzLl9hdHRhY2htZW50TmFtZSA9IG5hbWUgPyBuYW1lIDogdW5kZWZpbmVkO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8vIEhUVFAgTWV0aG9kczogUHVibGljIEludGVyZmFjZVxuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogU3BlY2lmeSBvbmUgb3IgbW9yZSBoZWFkZXJzIHRvIHNlbmQgd2l0aCB0aGUgZGlzcGF0Y2hlZCBIVFRQIHJlcXVlc3QuXG4gKlxuICogQGV4YW1wbGUgPGNhcHRpb24+U2V0IGEgc2luZ2xlIGhlYWRlciB0byBiZSB1c2VkIG9uIHRoaXMgcmVxdWVzdDwvY2FwdGlvbj5cbiAqXG4gKiAgICAgcmVxdWVzdC5zZXRIZWFkZXJzKCAnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgdHJ1c3RtZScgKS4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldCBtdWx0aXBsZSBoZWFkZXJzIHRvIGJlIHVzZWQgYnkgdGhpcyByZXF1ZXN0PC9jYXB0aW9uPlxuICpcbiAqICAgICByZXF1ZXN0LnNldEhlYWRlcnMoe1xuICogICAgICAgQXV0aG9yaXphdGlvbjogJ0JlYXJlciBjb21lb253ZXJlb2xkZnJpZW5kc3JpZ2h0JyxcbiAqICAgICAgICdBY2NlcHQtTGFuZ3VhZ2UnOiAnZW4tQ0EnXG4gKiAgICAgfSkuLi5cbiAqXG4gKiBAc2luY2UgMS4xLjBcbiAqIEBtZXRob2RcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE9iamVjdH0gaGVhZGVycyBUaGUgbmFtZSBvZiB0aGUgaGVhZGVyIHRvIHNldCwgb3IgYW4gb2JqZWN0IG9mXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyIG5hbWVzIGFuZCB0aGVpciBhc3NvY2lhdGVkIHN0cmluZyB2YWx1ZXNcbiAqIEBwYXJhbSB7U3RyaW5nfSAgICAgICAgW3ZhbHVlXSBUaGUgdmFsdWUgb2YgdGhlIGhlYWRlciBiZWluZyBzZXRcbiAqIEByZXR1cm5zIHtXUFJlcXVlc3R9IFRoZSBXUFJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5zZXRIZWFkZXJzID0gZnVuY3Rpb24oIGhlYWRlcnMsIHZhbHVlICkge1xuXHQvLyBXZSBjYW4gdXNlIHRoZSBzYW1lIGl0ZXJhdG9yIGZ1bmN0aW9uIGJlbG93IHRvIGhhbmRsZSBleHBsaWNpdCBrZXktdmFsdWVcblx0Ly8gcGFpcnMgaWYgd2UgY29udmVydCB0aGVtIGludG8gdG8gYW4gb2JqZWN0IHdlIGNhbiBpdGVyYXRlIG92ZXI6XG5cdGlmICggdHlwZW9mIGhlYWRlcnMgPT09ICdzdHJpbmcnICkge1xuXHRcdGhlYWRlcnMgPSBrZXlWYWxUb09iaiggaGVhZGVycywgdmFsdWUgKTtcblx0fVxuXG5cdHRoaXMuX29wdGlvbnMuaGVhZGVycyA9IHtcblx0XHQuLi4oIHRoaXMuX29wdGlvbnMuaGVhZGVycyB8fCB7fSApLFxuXHRcdC4uLmhlYWRlcnMsXG5cdH07XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEdldCAoZG93bmxvYWQgdGhlIGRhdGEgZm9yKSB0aGUgc3BlY2lmaWVkIHJlc291cmNlXG4gKlxuICogQG1ldGhvZFxuICogQGFzeW5jXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIEdFVCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiggY2FsbGJhY2sgKSB7XG5cdHJldHVybiB0aGlzLnRyYW5zcG9ydC5nZXQoIHRoaXMsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIEdldCB0aGUgaGVhZGVycyBmb3IgdGhlIHNwZWNpZmllZCByZXNvdXJjZVxuICpcbiAqIEBtZXRob2RcbiAqIEBhc3luY1xuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBIRUFEIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIGhlYWRlciByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5oZWFkZXJzID0gZnVuY3Rpb24oIGNhbGxiYWNrICkge1xuXHRyZXR1cm4gdGhpcy50cmFuc3BvcnQuaGVhZCggdGhpcywgY2FsbGJhY2sgKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBzcGVjaWZpZWQgcmVzb3VyY2Ugd2l0aCB0aGUgcHJvdmlkZWQgZGF0YVxuICpcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2UgZm9yIGNyZWF0aW5nIFBPU1QgcmVxdWVzdHNcbiAqXG4gKiBAbWV0aG9kXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIFRoZSBkYXRhIGZvciB0aGUgUE9TVCByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIFBPU1QgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbldQUmVxdWVzdC5wcm90b3R5cGUuY3JlYXRlID0gZnVuY3Rpb24oIGRhdGEsIGNhbGxiYWNrICkge1xuXHRyZXR1cm4gdGhpcy50cmFuc3BvcnQucG9zdCggdGhpcywgZGF0YSwgY2FsbGJhY2sgKTtcbn07XG5cbi8qKlxuICogVXBkYXRlIHRoZSBzcGVjaWZpZWQgcmVzb3VyY2Ugd2l0aCB0aGUgcHJvdmlkZWQgZGF0YVxuICpcbiAqIFRoaXMgaXMgdGhlIHB1YmxpYyBpbnRlcmZhY2UgZm9yIGNyZWF0aW5nIFBVVCByZXF1ZXN0c1xuICpcbiAqIEBtZXRob2RcbiAqIEBhc3luY1xuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIFRoZSBkYXRhIGZvciB0aGUgUFVUIHJlcXVlc3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gQSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCB0aGUgcmVzdWx0cyBvZiB0aGUgUFVUIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIEhUVFAgcmVxdWVzdFxuICovXG5XUFJlcXVlc3QucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKCBkYXRhLCBjYWxsYmFjayApIHtcblx0cmV0dXJuIHRoaXMudHJhbnNwb3J0LnB1dCggdGhpcywgZGF0YSwgY2FsbGJhY2sgKTtcbn07XG5cbi8qKlxuICogRGVsZXRlIHRoZSBzcGVjaWZpZWQgcmVzb3VyY2VcbiAqXG4gKiBAbWV0aG9kXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV0gRGF0YSB0byBzZW5kIGFsb25nIHdpdGggdGhlIERFTEVURSByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIERFTEVURSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS5kZWxldGUgPSBmdW5jdGlvbiggZGF0YSwgY2FsbGJhY2sgKSB7XG5cdHJldHVybiB0aGlzLnRyYW5zcG9ydC5kZWxldGUoIHRoaXMsIGRhdGEsIGNhbGxiYWNrICk7XG59O1xuXG4vKipcbiAqIENhbGxpbmcgLnRoZW4gb24gYSBxdWVyeSBjaGFpbiB3aWxsIGludm9rZSB0aGUgcXVlcnkgYXMgYSBHRVQgYW5kIHJldHVybiBhIHByb21pc2VcbiAqXG4gKiBAbWV0aG9kXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtzdWNjZXNzQ2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaGFuZGxlIHRoZSBkYXRhIHJldHVybmVkIGZyb20gdGhlIEdFVCByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbZmFpbHVyZUNhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGhhbmRsZSBhbnkgZXJyb3JzIGVuY291bnRlcmVkIGJ5IHRoZSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuV1BSZXF1ZXN0LnByb3RvdHlwZS50aGVuID0gZnVuY3Rpb24oIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrICkge1xuXHRyZXR1cm4gdGhpcy50cmFuc3BvcnQuZ2V0KCB0aGlzICkudGhlbiggc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2sgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV1BSZXF1ZXN0O1xuIiwiLyoqXG4gKiBUYWtlIGEgV1Agcm91dGUgc3RyaW5nICh3aXRoIFBDUkUgbmFtZWQgY2FwdHVyZSBncm91cHMpLCBgc3VjaCBhcyAvYXV0aG9yLyg/UDxpZD5cXGQrKWAsXG4gKiBhbmQgZ2VuZXJhdGUgcmVxdWVzdCBoYW5kbGVyIGZhY3RvcnkgbWV0aG9kcyBmb3IgZWFjaCByZXByZXNlbnRlZCBlbmRwb2ludC5cbiAqXG4gKiBAbW9kdWxlIGVuZHBvaW50LWZhY3Rvcmllc1xuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNyZWF0ZVJlc291cmNlSGFuZGxlclNwZWMgPSByZXF1aXJlKCAnLi9yZXNvdXJjZS1oYW5kbGVyLXNwZWMnICkuY3JlYXRlO1xuY29uc3QgY3JlYXRlRW5kcG9pbnRSZXF1ZXN0ID0gcmVxdWlyZSggJy4vZW5kcG9pbnQtcmVxdWVzdCcgKS5jcmVhdGU7XG5jb25zdCBvYmplY3RSZWR1Y2UgPSByZXF1aXJlKCAnLi91dGlsL29iamVjdC1yZWR1Y2UnICk7XG5cbi8qKlxuICogR2l2ZW4gYW4gYXJyYXkgb2Ygcm91dGUgZGVmaW5pdGlvbnMgYW5kIGEgc3BlY2lmaWMgbmFtZXNwYWNlIGZvciB0aG9zZSByb3V0ZXMsXG4gKiByZWN1cnNlIHRocm91Z2ggdGhlIG5vZGUgdHJlZSByZXByZXNlbnRpbmcgYWxsIHBvc3NpYmxlIHJvdXRlcyB3aXRoaW4gdGhlXG4gKiBwcm92aWRlZCBuYW1lc3BhY2UgdG8gZGVmaW5lIHBhdGggdmFsdWUgc2V0dGVycyAoYW5kIGNvcnJlc3BvbmRpbmcgcHJvcGVydHlcbiAqIHZhbGlkYXRvcnMpIGZvciBhbGwgcG9zc2libGUgdmFyaWFudHMgb2YgZWFjaCByZXNvdXJjZSdzIEFQSSBlbmRwb2ludHMuXG4gKlxuICogQG1ldGhvZCBnZW5lcmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSAgICAgICAgIFRoZSBuYW1lc3BhY2Ugc3RyaW5nIGZvciB0aGVzZSByb3V0ZXNcbiAqIEBwYXJhbSB7b2JqZWN0fSByb3V0ZXNCeU5hbWVzcGFjZSBBIGRpY3Rpb25hcnkgb2YgbmFtZXNwYWNlIC0gcm91dGUgZGVmaW5pdGlvblxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9iamVjdCBwYWlycyBhcyBnZW5lcmF0ZWQgZnJvbSBidWlsZFJvdXRlVHJlZSxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVyZSBlYWNoIHJvdXRlIGRlZmluaXRpb24gb2JqZWN0IGlzIGEgZGljdGlvbmFyeVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleWVkIGJ5IHJvdXRlIGRlZmluaXRpb24gc3RyaW5nc1xuICogQHJldHVybnMge29iamVjdH0gQSBkaWN0aW9uYXJ5IG9mIGVuZHBvaW50IHJlcXVlc3QgaGFuZGxlciBmYWN0b3JpZXNcbiAqL1xuZnVuY3Rpb24gZ2VuZXJhdGVFbmRwb2ludEZhY3Rvcmllcyggcm91dGVzQnlOYW1lc3BhY2UgKSB7XG5cblx0cmV0dXJuIG9iamVjdFJlZHVjZSggcm91dGVzQnlOYW1lc3BhY2UsICggbmFtZXNwYWNlcywgcm91dGVEZWZpbml0aW9ucywgbmFtZXNwYWNlICkgPT4ge1xuXG5cdFx0Ly8gQ3JlYXRlXG5cdFx0bmFtZXNwYWNlc1sgbmFtZXNwYWNlIF0gPSBvYmplY3RSZWR1Y2UoIHJvdXRlRGVmaW5pdGlvbnMsICggaGFuZGxlcnMsIHJvdXRlRGVmLCByZXNvdXJjZSApID0+IHtcblxuXHRcdFx0Y29uc3QgaGFuZGxlclNwZWMgPSBjcmVhdGVSZXNvdXJjZUhhbmRsZXJTcGVjKCByb3V0ZURlZiwgcmVzb3VyY2UgKTtcblxuXHRcdFx0Y29uc3QgRW5kcG9pbnRSZXF1ZXN0ID0gY3JlYXRlRW5kcG9pbnRSZXF1ZXN0KCBoYW5kbGVyU3BlYywgcmVzb3VyY2UsIG5hbWVzcGFjZSApO1xuXG5cdFx0XHQvLyBcImhhbmRsZXJcIiBvYmplY3QgaXMgbm93IGZ1bGx5IHByZXBhcmVkOyBjcmVhdGUgdGhlIGZhY3RvcnkgbWV0aG9kIHRoYXRcblx0XHRcdC8vIHdpbGwgaW5zdGFudGlhdGUgYW5kIHJldHVybiBhIGhhbmRsZXIgaW5zdGFuY2Vcblx0XHRcdGhhbmRsZXJzWyByZXNvdXJjZSBdID0gZnVuY3Rpb24oIG9wdGlvbnMgKSB7XG5cdFx0XHRcdHJldHVybiBuZXcgRW5kcG9pbnRSZXF1ZXN0KCB7XG5cdFx0XHRcdFx0Li4udGhpcy5fb3B0aW9ucyxcblx0XHRcdFx0XHQuLi5vcHRpb25zLFxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBFeHBvc2UgdGhlIGNvbnN0cnVjdG9yIGFzIGEgcHJvcGVydHkgb24gdGhlIGZhY3RvcnkgZnVuY3Rpb24sIHNvIHRoYXRcblx0XHRcdC8vIGF1dG8tZ2VuZXJhdGVkIGVuZHBvaW50IHJlcXVlc3QgY29uc3RydWN0b3JzIG1heSBiZSBmdXJ0aGVyIGN1c3RvbWl6ZWRcblx0XHRcdC8vIHdoZW4gbmVlZGVkXG5cdFx0XHRoYW5kbGVyc1sgcmVzb3VyY2UgXS5DdG9yID0gRW5kcG9pbnRSZXF1ZXN0O1xuXG5cdFx0XHRyZXR1cm4gaGFuZGxlcnM7XG5cdFx0fSwge30gKTtcblxuXHRcdHJldHVybiBuYW1lc3BhY2VzO1xuXHR9LCB7fSApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Z2VuZXJhdGU6IGdlbmVyYXRlRW5kcG9pbnRGYWN0b3JpZXMsXG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIGVuZHBvaW50LXJlcXVlc3RcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBXUFJlcXVlc3QgPSByZXF1aXJlKCAnLi9jb25zdHJ1Y3RvcnMvd3AtcmVxdWVzdCcgKTtcbmNvbnN0IG1peGlucyA9IHJlcXVpcmUoICcuL21peGlucycgKTtcblxuY29uc3QgYXBwbHlNaXhpbiA9IHJlcXVpcmUoICcuL3V0aWwvYXBwbHktbWl4aW4nICk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIGVuZHBvaW50IHJlcXVlc3QgaGFuZGxlciBjb25zdHJ1Y3RvciBmb3IgYSBzcGVjaWZpYyByZXNvdXJjZSB0cmVlXG4gKlxuICogQG1ldGhvZCBjcmVhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyU3BlYyBBIHJlc291cmNlIGhhbmRsZXIgc3BlY2lmaWNhdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7U3RyaW5nfSByZXNvdXJjZSAgICBUaGUgcm9vdCByZXNvdXJjZSBvZiByZXF1ZXN0cyBjcmVhdGVkIGZyb20gdGhlIHJldHVybmVkIGZhY3RvcnlcbiAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lc3BhY2UgICBUaGUgbmFtZXNwYWNlIHN0cmluZyBmb3IgdGhlIHJldHVybmVkIGZhY3RvcnkncyBoYW5kbGVyc1xuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIGNvbnN0cnVjdG9yIGluaGVyaXRpbmcgZnJvbSB7QGxpbmsgV1BSZXF1ZXN0fVxuICovXG5mdW5jdGlvbiBjcmVhdGVFbmRwb2ludFJlcXVlc3QoIGhhbmRsZXJTcGVjLCByZXNvdXJjZSwgbmFtZXNwYWNlICkge1xuXG5cdC8vIENyZWF0ZSB0aGUgY29uc3RydWN0b3IgZnVuY3Rpb24gZm9yIHRoaXMgZW5kcG9pbnRcblx0Y2xhc3MgRW5kcG9pbnRSZXF1ZXN0IGV4dGVuZHMgV1BSZXF1ZXN0IHtcblx0XHRjb25zdHJ1Y3Rvciggb3B0aW9ucyApIHtcblx0XHRcdHN1cGVyKCBvcHRpb25zICk7XG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2VtaS1wcml2YXRlIGluc3RhbmNlIHByb3BlcnR5IHNwZWNpZnlpbmcgdGhlIGF2YWlsYWJsZSBVUkwgcGF0aCBvcHRpb25zXG5cdFx0XHQgKiBmb3IgdGhpcyBlbmRwb2ludCByZXF1ZXN0IGhhbmRsZXIsIGtleWVkIGJ5IGFzY2VuZGluZyB3aG9sZSBudW1iZXJzLlxuXHRcdFx0ICpcblx0XHRcdCAqIEBwcm9wZXJ0eSBfbGV2ZWxzXG5cdFx0XHQgKiBAdHlwZSB7b2JqZWN0fVxuXHRcdFx0ICogQHByaXZhdGVcblx0XHRcdCAqL1xuXHRcdFx0dGhpcy5fbGV2ZWxzID0gaGFuZGxlclNwZWMuX2xldmVscztcblxuXHRcdFx0Ly8gQ29uZmlndXJlIGhhbmRsZXIgZm9yIHRoaXMgZW5kcG9pbnQncyByb290IFVSTCBwYXRoICYgc2V0IG5hbWVzcGFjZVxuXHRcdFx0dGhpc1xuXHRcdFx0XHQuc2V0UGF0aFBhcnQoIDAsIHJlc291cmNlIClcblx0XHRcdFx0Lm5hbWVzcGFjZSggbmFtZXNwYWNlICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gTWl4IGluIGFsbCBhdmFpbGFibGUgc2hvcnRjdXQgbWV0aG9kcyBmb3IgR0VUIHJlcXVlc3QgcXVlcnkgcGFyYW1ldGVycyB0aGF0XG5cdC8vIGFyZSB2YWxpZCB3aXRoaW4gdGhpcyBlbmRwb2ludCB0cmVlXG5cdGlmICggdHlwZW9mIGhhbmRsZXJTcGVjLl9nZXRBcmdzID09PSAnb2JqZWN0JyApIHtcblx0XHRPYmplY3Qua2V5cyggaGFuZGxlclNwZWMuX2dldEFyZ3MgKS5mb3JFYWNoKCAoIHN1cHBvcnRlZFF1ZXJ5UGFyYW0gKSA9PiB7XG5cdFx0XHRjb25zdCBtaXhpbnNGb3JQYXJhbSA9IG1peGluc1sgc3VwcG9ydGVkUXVlcnlQYXJhbSBdO1xuXG5cdFx0XHQvLyBPbmx5IHByb2NlZWQgaWYgdGhlcmUgaXMgYSBtaXhpbiBhdmFpbGFibGUgQU5EIHRoZSBzcGVjaWZpZWQgbWl4aW5zIHdpbGxcblx0XHRcdC8vIG5vdCBvdmVyd3JpdGUgYW55IHByZXZpb3VzbHktc2V0IHByb3RvdHlwZSBtZXRob2Rcblx0XHRcdGlmICggdHlwZW9mIG1peGluc0ZvclBhcmFtID09PSAnb2JqZWN0JyApIHtcblx0XHRcdFx0T2JqZWN0LmtleXMoIG1peGluc0ZvclBhcmFtICkuZm9yRWFjaCggKCBtZXRob2ROYW1lICkgPT4ge1xuXHRcdFx0XHRcdGFwcGx5TWl4aW4oIEVuZHBvaW50UmVxdWVzdC5wcm90b3R5cGUsIG1ldGhvZE5hbWUsIG1peGluc0ZvclBhcmFtWyBtZXRob2ROYW1lIF0gKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxuXG5cdE9iamVjdC5rZXlzKCBoYW5kbGVyU3BlYy5fc2V0dGVycyApLmZvckVhY2goICggc2V0dGVyRm5OYW1lICkgPT4ge1xuXHRcdC8vIE9ubHkgYXNzaWduIHNldHRlciBmdW5jdGlvbnMgaWYgdGhleSBkbyBub3Qgb3ZlcndyaXRlIHByZWV4aXN0aW5nIG1ldGhvZHNcblx0XHRpZiAoICEgRW5kcG9pbnRSZXF1ZXN0LnByb3RvdHlwZVsgc2V0dGVyRm5OYW1lIF0gKSB7XG5cdFx0XHRFbmRwb2ludFJlcXVlc3QucHJvdG90eXBlWyBzZXR0ZXJGbk5hbWUgXSA9IGhhbmRsZXJTcGVjLl9zZXR0ZXJzWyBzZXR0ZXJGbk5hbWUgXTtcblx0XHR9XG5cdH0gKTtcblxuXHRyZXR1cm4gRW5kcG9pbnRSZXF1ZXN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0Y3JlYXRlOiBjcmVhdGVFbmRwb2ludFJlcXVlc3QsXG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIGh0dHAtdHJhbnNwb3J0XG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgYWdlbnQgPSByZXF1aXJlKCAnc3VwZXJhZ2VudCcgKTtcbmNvbnN0IHBhcnNlTGlua0hlYWRlciA9IHJlcXVpcmUoICdsaScgKS5wYXJzZTtcblxuY29uc3QgV1BSZXF1ZXN0ID0gcmVxdWlyZSggJy4vY29uc3RydWN0b3JzL3dwLXJlcXVlc3QnICk7XG5jb25zdCBjaGVja01ldGhvZFN1cHBvcnQgPSByZXF1aXJlKCAnLi91dGlsL2NoZWNrLW1ldGhvZC1zdXBwb3J0JyApO1xuY29uc3Qgb2JqZWN0UmVkdWNlID0gcmVxdWlyZSggJy4vdXRpbC9vYmplY3QtcmVkdWNlJyApO1xuY29uc3QgaXNFbXB0eU9iamVjdCA9IHJlcXVpcmUoICcuL3V0aWwvaXMtZW1wdHktb2JqZWN0JyApO1xuXG4vKipcbiAqIFNldCBhbnkgcHJvdmlkZWQgaGVhZGVycyBvbiB0aGUgb3V0Z29pbmcgcmVxdWVzdCBvYmplY3QuIFJ1bnMgYWZ0ZXIgX2F1dGguXG4gKlxuICogQG1ldGhvZCBfc2V0SGVhZGVyc1xuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IEEgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQSBXUFJlcXVlc3QgX29wdGlvbnMgb2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gQSBzdXBlcmFnZW50IHJlcXVlc3Qgb2JqZWN0LCB3aXRoIGFueSBhdmFpbGFibGUgaGVhZGVycyBzZXRcbiAqL1xuZnVuY3Rpb24gX3NldEhlYWRlcnMoIHJlcXVlc3QsIG9wdGlvbnMgKSB7XG5cdC8vIElmIHRoZXJlJ3Mgbm8gaGVhZGVycywgZG8gbm90aGluZ1xuXHRpZiAoICEgb3B0aW9ucy5oZWFkZXJzICkge1xuXHRcdHJldHVybiByZXF1ZXN0O1xuXHR9XG5cblx0cmV0dXJuIG9iamVjdFJlZHVjZShcblx0XHRvcHRpb25zLmhlYWRlcnMsXG5cdFx0KCByZXF1ZXN0LCB2YWx1ZSwga2V5ICkgPT4gcmVxdWVzdC5zZXQoIGtleSwgdmFsdWUgKSxcblx0XHRyZXF1ZXN0XG5cdCk7XG59XG5cbi8qKlxuICogQ29uZGl0aW9uYWxseSBzZXQgYmFzaWMgYXV0aGVudGljYXRpb24gb24gYSBzZXJ2ZXIgcmVxdWVzdCBvYmplY3QuXG4gKlxuICogQG1ldGhvZCBfYXV0aFxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IEEgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgQSBXUFJlcXVlc3QgX29wdGlvbnMgb2JqZWN0XG4gKiBAcGFyYW0ge0Jvb2xlYW59IGZvcmNlQXV0aGVudGljYXRpb24gd2hldGhlciB0byBmb3JjZSBhdXRoZW50aWNhdGlvbiBvbiB0aGUgcmVxdWVzdFxuICogQHBhcmFtIHtPYmplY3R9IEEgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdCwgY29uZGl0aW9uYWxseSBjb25maWd1cmVkIHRvIHVzZSBiYXNpYyBhdXRoXG4gKi9cbmZ1bmN0aW9uIF9hdXRoKCByZXF1ZXN0LCBvcHRpb25zLCBmb3JjZUF1dGhlbnRpY2F0aW9uICkge1xuXHQvLyBJZiB3ZSdyZSBub3Qgc3VwcG9zZWQgdG8gYXV0aGVudGljYXRlLCBkb24ndCBldmVuIHN0YXJ0XG5cdGlmICggISBmb3JjZUF1dGhlbnRpY2F0aW9uICYmICEgb3B0aW9ucy5hdXRoICYmICEgb3B0aW9ucy5ub25jZSApIHtcblx0XHRyZXR1cm4gcmVxdWVzdDtcblx0fVxuXG5cdC8vIEVuYWJsZSBub25jZSBpbiBvcHRpb25zIGZvciBDb29raWUgYXV0aGVudGljYXRpb24gaHR0cDovL3dwLWFwaS5vcmcvZ3VpZGVzL2F1dGhlbnRpY2F0aW9uLmh0bWxcblx0aWYgKCBvcHRpb25zLm5vbmNlICkge1xuXHRcdHJlcXVlc3Quc2V0KCAnWC1XUC1Ob25jZScsIG9wdGlvbnMubm9uY2UgKTtcblx0XHRyZXR1cm4gcmVxdWVzdDtcblx0fVxuXG5cdC8vIFJldHJpZXZlIHRoZSB1c2VybmFtZSAmIHBhc3N3b3JkIGZyb20gdGhlIHJlcXVlc3Qgb3B0aW9ucyBpZiB0aGV5IHdlcmVuJ3QgcHJvdmlkZWRcblx0Y29uc3QgdXNlcm5hbWUgPSBvcHRpb25zLnVzZXJuYW1lO1xuXHRjb25zdCBwYXNzd29yZCA9IG9wdGlvbnMucGFzc3dvcmQ7XG5cblx0Ly8gSWYgbm8gdXNlcm5hbWUgb3Igbm8gcGFzc3dvcmQsIGNhbid0IGF1dGhlbnRpY2F0ZVxuXHRpZiAoICEgdXNlcm5hbWUgfHwgISBwYXNzd29yZCApIHtcblx0XHRyZXR1cm4gcmVxdWVzdDtcblx0fVxuXG5cdC8vIENhbiBhdXRoZW50aWNhdGU6IHNldCBiYXNpYyBhdXRoIHBhcmFtZXRlcnMgb24gdGhlIHJlcXVlc3Rcblx0cmV0dXJuIHJlcXVlc3QuYXV0aCggdXNlcm5hbWUsIHBhc3N3b3JkICk7XG59XG5cbi8vIFBhZ2luYXRpb24tUmVsYXRlZCBIZWxwZXJzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEV4dHJhY3QgdGhlIGJvZHkgcHJvcGVydHkgZnJvbSB0aGUgc3VwZXJhZ2VudCByZXNwb25zZSwgb3IgZWxzZSB0cnkgdG8gcGFyc2VcbiAqIHRoZSByZXNwb25zZSB0ZXh0IHRvIGdldCBhIEpTT04gb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcmVzcG9uc2UgICAgICBUaGUgcmVzcG9uc2Ugb2JqZWN0IGZyb20gdGhlIEhUVFAgcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IHJlc3BvbnNlLnRleHQgVGhlIHJlc3BvbnNlIGNvbnRlbnQgYXMgdGV4dFxuICogQHBhcmFtIHtPYmplY3R9IHJlc3BvbnNlLmJvZHkgVGhlIHJlc3BvbnNlIGNvbnRlbnQgYXMgYSBKUyBvYmplY3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSByZXNwb25zZSBjb250ZW50IGFzIGEgSlMgb2JqZWN0XG4gKi9cbmZ1bmN0aW9uIGV4dHJhY3RSZXNwb25zZUJvZHkoIHJlc3BvbnNlICkge1xuXHRsZXQgcmVzcG9uc2VCb2R5ID0gcmVzcG9uc2UuYm9keTtcblx0aWYgKCBpc0VtcHR5T2JqZWN0KCByZXNwb25zZUJvZHkgKSAmJiByZXNwb25zZS50eXBlID09PSAndGV4dC9odG1sJyApIHtcblx0XHQvLyBSZXNwb25zZSBtYXkgaGF2ZSBjb21lIGJhY2sgYXMgSFRNTCBkdWUgdG8gY2FjaGluZyBwbHVnaW47IHRyeSB0byBwYXJzZVxuXHRcdC8vIHRoZSByZXNwb25zZSB0ZXh0IGludG8gSlNPTlxuXHRcdHRyeSB7XG5cdFx0XHRyZXNwb25zZUJvZHkgPSBKU09OLnBhcnNlKCByZXNwb25zZS50ZXh0ICk7XG5cdFx0fSBjYXRjaCAoIGUgKSB7XG5cdFx0XHQvLyBTd2FsbG93IGVycm9ycywgaXQncyBPSyB0byBmYWxsIGJhY2sgdG8gcmV0dXJuaW5nIHRoZSBib2R5XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXNwb25zZUJvZHk7XG59XG5cbi8qKlxuICogSWYgdGhlIHJlc3BvbnNlIGlzIG5vdCBwYWdlZCwgcmV0dXJuIHRoZSBib2R5IGFzLWlzLiBJZiBwYWdpbmF0aW9uXG4gKiBpbmZvcm1hdGlvbiBpcyBwcmVzZW50IGluIHRoZSByZXNwb25zZSBoZWFkZXJzLCBwYXJzZSB0aG9zZSBoZWFkZXJzIGludG9cbiAqIGEgY3VzdG9tIGBfcGFnaW5nYCBwcm9wZXJ0eSBvbiB0aGUgcmVzcG9uc2UgYm9keS4gYF9wYWdpbmdgIGNvbnRhaW5zIGxpbmtzXG4gKiB0byB0aGUgcHJldmlvdXMgYW5kIG5leHQgcGFnZXMgaW4gdGhlIGNvbGxlY3Rpb24sIGFzIHdlbGwgYXMgbWV0YWRhdGFcbiAqIGFib3V0IHRoZSBzaXplIGFuZCBudW1iZXIgb2YgcGFnZXMgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogVGhlIHN0cnVjdHVyZSBvZiB0aGUgYF9wYWdpbmdgIHByb3BlcnR5IGlzIGFzIGZvbGxvd3M6XG4gKlxuICogLSBgdG90YWxgIHtJbnRlZ2VyfSBUaGUgdG90YWwgbnVtYmVyIG9mIHJlY29yZHMgaW4gdGhlIGNvbGxlY3Rpb25cbiAqIC0gYHRvdGFsUGFnZXNgIHtJbnRlZ2VyfSBUaGUgbnVtYmVyIG9mIHBhZ2VzIGF2YWlsYWJsZVxuICogLSBgbGlua3NgIHtPYmplY3R9IFRoZSBwYXJzZWQgXCJsaW5rc1wiIGhlYWRlcnMsIHNlcGFyYXRlZCBpbnRvIGluZGl2aWR1YWwgVVJJIHN0cmluZ3NcbiAqIC0gYG5leHRgIHtXUFJlcXVlc3R9IEEgV1BSZXF1ZXN0IG9iamVjdCBib3VuZCB0byB0aGUgXCJuZXh0XCIgcGFnZSAoaWYgcGFnZSBleGlzdHMpXG4gKiAtIGBwcmV2YCB7V1BSZXF1ZXN0fSBBIFdQUmVxdWVzdCBvYmplY3QgYm91bmQgdG8gdGhlIFwicHJldmlvdXNcIiBwYWdlIChpZiBwYWdlIGV4aXN0cylcbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IHJlc3VsdCAgICAgICAgICAgVGhlIHJlc3BvbnNlIG9iamVjdCBmcm9tIHRoZSBIVFRQIHJlcXVlc3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zICAgICAgICAgIFRoZSBvcHRpb25zIGhhc2ggZnJvbSB0aGUgb3JpZ2luYWwgcmVxdWVzdFxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW5kcG9pbnQgVGhlIGJhc2UgVVJMIG9mIHRoZSByZXF1ZXN0ZWQgQVBJIGVuZHBvaW50XG4gKiBAcGFyYW0ge09iamVjdH0gaHR0cFRyYW5zcG9ydCAgICBUaGUgSFRUUCB0cmFuc3BvcnQgb2JqZWN0IHVzZWQgYnkgdGhlIG9yaWdpbmFsIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBwYWdpbmF0aW9uIG1ldGFkYXRhIG9iamVjdCBmb3IgdGhpcyBIVFRQIHJlcXVlc3QsIG9yIGVsc2UgbnVsbFxuICovXG5mdW5jdGlvbiBjcmVhdGVQYWdpbmF0aW9uT2JqZWN0KCByZXN1bHQsIG9wdGlvbnMsIGh0dHBUcmFuc3BvcnQgKSB7XG5cdGxldCBfcGFnaW5nID0gbnVsbDtcblxuXHRpZiAoICEgcmVzdWx0LmhlYWRlcnMgKSB7XG5cdFx0Ly8gTm8gaGVhZGVyczogcmV0dXJuIGFzLWlzXG5cdFx0cmV0dXJuIF9wYWdpbmc7XG5cdH1cblxuXHQvLyBHdWFyZCBhZ2FpbnN0IGNhcGl0YWxpemF0aW9uIGluY29uc2lzdGVuY2llcyBpbiByZXR1cm5lZCBoZWFkZXJzXG5cdE9iamVjdC5rZXlzKCByZXN1bHQuaGVhZGVycyApLmZvckVhY2goICggaGVhZGVyICkgPT4ge1xuXHRcdHJlc3VsdC5oZWFkZXJzWyBoZWFkZXIudG9Mb3dlckNhc2UoKSBdID0gcmVzdWx0LmhlYWRlcnNbIGhlYWRlciBdO1xuXHR9ICk7XG5cblx0aWYgKCAhIHJlc3VsdC5oZWFkZXJzWyAneC13cC10b3RhbHBhZ2VzJyBdICkge1xuXHRcdC8vIE5vIHBhZ2luZzogcmV0dXJuIGFzLWlzXG5cdFx0cmV0dXJuIF9wYWdpbmc7XG5cdH1cblxuXHRjb25zdCB0b3RhbFBhZ2VzID0gK3Jlc3VsdC5oZWFkZXJzWyAneC13cC10b3RhbHBhZ2VzJyBdO1xuXG5cdGlmICggISB0b3RhbFBhZ2VzIHx8IHRvdGFsUGFnZXMgPT09IDAgKSB7XG5cdFx0Ly8gTm8gcGFnaW5nOiByZXR1cm4gYXMtaXNcblx0XHRyZXR1cm4gX3BhZ2luZztcblx0fVxuXG5cdC8vIERlY29kZSB0aGUgbGluayBoZWFkZXIgb2JqZWN0XG5cdGNvbnN0IGxpbmtzID0gcmVzdWx0LmhlYWRlcnMubGluayA/XG5cdFx0cGFyc2VMaW5rSGVhZGVyKCByZXN1bHQuaGVhZGVycy5saW5rICkgOlxuXHRcdHt9O1xuXG5cdC8vIFN0b3JlIHBhZ2luYXRpb24gZGF0YSBmcm9tIHJlc3BvbnNlIGhlYWRlcnMgb24gdGhlIHJlc3BvbnNlIGNvbGxlY3Rpb25cblx0X3BhZ2luZyA9IHtcblx0XHR0b3RhbDogK3Jlc3VsdC5oZWFkZXJzWyAneC13cC10b3RhbCcgXSxcblx0XHR0b3RhbFBhZ2VzOiB0b3RhbFBhZ2VzLFxuXHRcdGxpbmtzOiBsaW5rcyxcblx0fTtcblxuXHQvLyBDcmVhdGUgYSBXUFJlcXVlc3QgaW5zdGFuY2UgcHJlLWJvdW5kIHRvIHRoZSBcIm5leHRcIiBwYWdlLCBpZiBhdmFpbGFibGVcblx0aWYgKCBsaW5rcy5uZXh0ICkge1xuXHRcdF9wYWdpbmcubmV4dCA9IG5ldyBXUFJlcXVlc3QoIHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHR0cmFuc3BvcnQ6IGh0dHBUcmFuc3BvcnQsXG5cdFx0XHRlbmRwb2ludDogbGlua3MubmV4dCxcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBDcmVhdGUgYSBXUFJlcXVlc3QgaW5zdGFuY2UgcHJlLWJvdW5kIHRvIHRoZSBcInByZXZcIiBwYWdlLCBpZiBhdmFpbGFibGVcblx0aWYgKCBsaW5rcy5wcmV2ICkge1xuXHRcdF9wYWdpbmcucHJldiA9IG5ldyBXUFJlcXVlc3QoIHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHR0cmFuc3BvcnQ6IGh0dHBUcmFuc3BvcnQsXG5cdFx0XHRlbmRwb2ludDogbGlua3MucHJldixcblx0XHR9ICk7XG5cdH1cblxuXHRyZXR1cm4gX3BhZ2luZztcbn1cblxuLy8gSFRUUC1SZWxhdGVkIEhlbHBlcnNcbi8vID09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogU3VibWl0IHRoZSBwcm92aWRlZCBzdXBlcmFnZW50IHJlcXVlc3Qgb2JqZWN0LCBpbnZva2UgYSBjYWxsYmFjayAoaWYgaXQgd2FzXG4gKiBwcm92aWRlZCksIGFuZCByZXR1cm4gYSBwcm9taXNlIHRvIHRoZSByZXNwb25zZSBmcm9tIHRoZSBIVFRQIHJlcXVlc3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXF1ZXN0IEEgc3VwZXJhZ2VudCByZXF1ZXN0IG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgQSBjYWxsYmFjayBmdW5jdGlvbiAob3B0aW9uYWwpXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gQSBmdW5jdGlvbiB0byB0cmFuc2Zvcm0gdGhlIHJlc3VsdCBkYXRhXG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSBzdXBlcmFnZW50IHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gaW52b2tlQW5kUHJvbWlzaWZ5KCByZXF1ZXN0LCBjYWxsYmFjaywgdHJhbnNmb3JtICkge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoICggcmVzb2x2ZSwgcmVqZWN0ICkgPT4ge1xuXHRcdC8vIEZpcmUgb2ZmIHRoZSByZXN1bHRcblx0XHRyZXF1ZXN0LmVuZCggKCBlcnIsIHJlc3VsdCApID0+IHtcblxuXHRcdFx0Ly8gUmV0dXJuIHRoZSByZXN1bHRzIGFzIGEgcHJvbWlzZVxuXHRcdFx0aWYgKCBlcnIgfHwgcmVzdWx0LmVycm9yICkge1xuXHRcdFx0XHRyZWplY3QoIGVyciB8fCByZXN1bHQuZXJyb3IgKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJlc29sdmUoIHJlc3VsdCApO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fSApLnRoZW4oIHRyYW5zZm9ybSApLnRoZW4oICggcmVzdWx0ICkgPT4ge1xuXHRcdC8vIElmIGEgbm9kZS1zdHlsZSBjYWxsYmFjayB3YXMgcHJvdmlkZWQsIGNhbGwgaXQsIGJ1dCBhbHNvIHJldHVybiB0aGVcblx0XHQvLyByZXN1bHQgdmFsdWUgZm9yIHVzZSB2aWEgdGhlIHJldHVybmVkIFByb21pc2Vcblx0XHRpZiAoIGNhbGxiYWNrICYmIHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJyApIHtcblx0XHRcdGNhbGxiYWNrKCBudWxsLCByZXN1bHQgKTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fSwgKCBlcnIgKSA9PiB7XG5cdFx0Ly8gSWYgdGhlIEFQSSBwcm92aWRlZCBhbiBlcnJvciBvYmplY3QsIGl0IHdpbGwgYmUgYXZhaWxhYmxlIHdpdGhpbiB0aGVcblx0XHQvLyBzdXBlcmFnZW50IHJlc3BvbnNlIG9iamVjdCBhcyByZXNwb25zZS5ib2R5IChjb250YWluaW5nIHRoZSByZXNwb25zZVxuXHRcdC8vIEpTT04pLiBJZiB0aGF0IG9iamVjdCBleGlzdHMsIGl0IHdpbGwgaGF2ZSBhIC5jb2RlIHByb3BlcnR5IGlmIGl0IGlzXG5cdFx0Ly8gdHJ1bHkgYW4gQVBJIGVycm9yIChub24tQVBJIGVycm9ycyB3aWxsIG5vdCBoYXZlIGEgLmNvZGUpLlxuXHRcdGlmICggZXJyLnJlc3BvbnNlICYmIGVyci5yZXNwb25zZS5ib2R5ICYmIGVyci5yZXNwb25zZS5ib2R5LmNvZGUgKSB7XG5cdFx0XHQvLyBGb3J3YXJkIEFQSSBlcnJvciByZXNwb25zZSBKU09OIG9uIHRvIHRoZSBjYWxsaW5nIG1ldGhvZDogb21pdFxuXHRcdFx0Ly8gYWxsIHRyYW5zcG9ydC1zcGVjaWZpYyAoc3VwZXJhZ2VudC1zcGVjaWZpYykgcHJvcGVydGllc1xuXHRcdFx0ZXJyID0gZXJyLnJlc3BvbnNlLmJvZHk7XG5cdFx0fVxuXHRcdC8vIElmIGEgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLCBlbnN1cmUgaXQgaXMgY2FsbGVkIHdpdGggdGhlIGVycm9yOyBvdGhlcndpc2Vcblx0XHQvLyByZS10aHJvdyB0aGUgZXJyb3Igc28gdGhhdCBpdCBjYW4gYmUgaGFuZGxlZCBieSBhIFByb21pc2UgLmNhdGNoIG9yIC50aGVuXG5cdFx0aWYgKCBjYWxsYmFjayAmJiB0eXBlb2YgY2FsbGJhY2sgPT09ICdmdW5jdGlvbicgKSB7XG5cdFx0XHRjYWxsYmFjayggZXJyICk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRocm93IGVycjtcblx0XHR9XG5cdH0gKTtcbn1cblxuLyoqXG4gKiBSZXR1cm4gdGhlIGJvZHkgb2YgdGhlIHJlcXVlc3QsIGF1Z21lbnRlZCB3aXRoIHBhZ2luYXRpb24gaW5mb3JtYXRpb24gaWYgdGhlXG4gKiByZXN1bHQgaXMgYSBwYWdlZCBjb2xsZWN0aW9uLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge1dQUmVxdWVzdH0gd3ByZXEgVGhlIFdQUmVxdWVzdCByZXByZXNlbnRpbmcgdGhlIHJldHVybmVkIEhUVFAgcmVzcG9uc2VcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXN1bHQgVGhlIHJlc3VsdHMgZnJvbSB0aGUgSFRUUCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgXCJib2R5XCIgcHJvcGVydHkgb2YgdGhlIHJlc3VsdCwgY29uZGl0aW9uYWxseSBhdWdtZW50ZWQgd2l0aFxuICogICAgICAgICAgICAgICAgICBwYWdpbmF0aW9uIGluZm9ybWF0aW9uIGlmIHRoZSByZXN1bHQgaXMgYSBwYXJ0aWFsIGNvbGxlY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHJldHVybkJvZHkoIHdwcmVxLCByZXN1bHQgKSB7XG5cdGNvbnN0IGJvZHkgPSBleHRyYWN0UmVzcG9uc2VCb2R5KCByZXN1bHQgKTtcblx0Y29uc3QgX3BhZ2luZyA9IGNyZWF0ZVBhZ2luYXRpb25PYmplY3QoIHJlc3VsdCwgd3ByZXEuX29wdGlvbnMsIHdwcmVxLnRyYW5zcG9ydCApO1xuXHRpZiAoIF9wYWdpbmcgKSB7XG5cdFx0Ym9keS5fcGFnaW5nID0gX3BhZ2luZztcblx0fVxuXHRyZXR1cm4gYm9keTtcbn1cblxuLyoqXG4gKiBFeHRyYWN0IGFuZCByZXR1cm4gdGhlIGhlYWRlcnMgcHJvcGVydHkgZnJvbSBhIHN1cGVyYWdlbnQgcmVzcG9uc2Ugb2JqZWN0XG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByZXN1bHQgVGhlIHJlc3VsdHMgZnJvbSB0aGUgSFRUUCByZXF1ZXN0XG4gKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgXCJoZWFkZXJzXCIgcHJvcGVydHkgb2YgdGhlIHJlc3VsdFxuICovXG5mdW5jdGlvbiByZXR1cm5IZWFkZXJzKCByZXN1bHQgKSB7XG5cdHJldHVybiByZXN1bHQuaGVhZGVycztcbn1cblxuLy8gSFRUUCBNZXRob2RzOiBQcml2YXRlIEhUVFAtdmVyYiB2ZXJzaW9uc1xuLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuXG4vKipcbiAqIEBtZXRob2QgZ2V0XG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSB3cHJlcSBBIFdQUmVxdWVzdCBxdWVyeSBvYmplY3RcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjYWxsYmFja10gQSBjYWxsYmFjayB0byBpbnZva2Ugd2l0aCB0aGUgcmVzdWx0cyBvZiB0aGUgR0VUIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIHJlc3VsdHMgb2YgdGhlIEhUVFAgcmVxdWVzdFxuICovXG5mdW5jdGlvbiBfaHR0cEdldCggd3ByZXEsIGNhbGxiYWNrICkge1xuXHRjaGVja01ldGhvZFN1cHBvcnQoICdnZXQnLCB3cHJlcSApO1xuXHRjb25zdCB1cmwgPSB3cHJlcS50b1N0cmluZygpO1xuXG5cdGxldCByZXF1ZXN0ID0gX2F1dGgoIGFnZW50LmdldCggdXJsICksIHdwcmVxLl9vcHRpb25zICk7XG5cdHJlcXVlc3QgPSBfc2V0SGVhZGVycyggcmVxdWVzdCwgd3ByZXEuX29wdGlvbnMgKTtcblxuXHRyZXR1cm4gaW52b2tlQW5kUHJvbWlzaWZ5KCByZXF1ZXN0LCBjYWxsYmFjaywgcmV0dXJuQm9keS5iaW5kKCBudWxsLCB3cHJlcSApICk7XG59XG5cbi8qKlxuICogSW52b2tlIGFuIEhUVFAgXCJQT1NUXCIgcmVxdWVzdCBhZ2FpbnN0IHRoZSBwcm92aWRlZCBlbmRwb2ludFxuICogQG1ldGhvZCBwb3N0XG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSB3cHJlcSBBIFdQUmVxdWVzdCBxdWVyeSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBkYXRhIFRoZSBkYXRhIGZvciB0aGUgUE9TVCByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIFBPU1QgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIF9odHRwUG9zdCggd3ByZXEsIGRhdGEsIGNhbGxiYWNrICkge1xuXHRjaGVja01ldGhvZFN1cHBvcnQoICdwb3N0Jywgd3ByZXEgKTtcblx0Y29uc3QgdXJsID0gd3ByZXEudG9TdHJpbmcoKTtcblx0ZGF0YSA9IGRhdGEgfHwge307XG5cdGxldCByZXF1ZXN0ID0gX2F1dGgoIGFnZW50LnBvc3QoIHVybCApLCB3cHJlcS5fb3B0aW9ucywgdHJ1ZSApO1xuXHRyZXF1ZXN0ID0gX3NldEhlYWRlcnMoIHJlcXVlc3QsIHdwcmVxLl9vcHRpb25zICk7XG5cblx0aWYgKCB3cHJlcS5fYXR0YWNobWVudCApIHtcblx0XHQvLyBEYXRhIG11c3QgYmUgZm9ybS1lbmNvZGVkIGFsb25nc2lkZSBpbWFnZSBhdHRhY2htZW50XG5cdFx0cmVxdWVzdCA9IG9iamVjdFJlZHVjZShcblx0XHRcdGRhdGEsXG5cdFx0XHQoIHJlcSwgdmFsdWUsIGtleSApID0+IHJlcS5maWVsZCgga2V5LCB2YWx1ZSApLFxuXHRcdFx0cmVxdWVzdC5hdHRhY2goICdmaWxlJywgd3ByZXEuX2F0dGFjaG1lbnQsIHdwcmVxLl9hdHRhY2htZW50TmFtZSApXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRyZXF1ZXN0ID0gcmVxdWVzdC5zZW5kKCBkYXRhICk7XG5cdH1cblxuXHRyZXR1cm4gaW52b2tlQW5kUHJvbWlzaWZ5KCByZXF1ZXN0LCBjYWxsYmFjaywgcmV0dXJuQm9keS5iaW5kKCBudWxsLCB3cHJlcSApICk7XG59XG5cbi8qKlxuICogQG1ldGhvZCBwdXRcbiAqIEBhc3luY1xuICogQHBhcmFtIHtXUFJlcXVlc3R9IHdwcmVxIEEgV1BSZXF1ZXN0IHF1ZXJ5IG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IGRhdGEgVGhlIGRhdGEgZm9yIHRoZSBQVVQgcmVxdWVzdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBQVVQgcmVxdWVzdFxuICogQHJldHVybnMge1Byb21pc2V9IEEgcHJvbWlzZSB0byB0aGUgcmVzdWx0cyBvZiB0aGUgSFRUUCByZXF1ZXN0XG4gKi9cbmZ1bmN0aW9uIF9odHRwUHV0KCB3cHJlcSwgZGF0YSwgY2FsbGJhY2sgKSB7XG5cdGNoZWNrTWV0aG9kU3VwcG9ydCggJ3B1dCcsIHdwcmVxICk7XG5cdGNvbnN0IHVybCA9IHdwcmVxLnRvU3RyaW5nKCk7XG5cdGRhdGEgPSBkYXRhIHx8IHt9O1xuXG5cdGxldCByZXF1ZXN0ID0gX2F1dGgoIGFnZW50LnB1dCggdXJsICksIHdwcmVxLl9vcHRpb25zLCB0cnVlICkuc2VuZCggZGF0YSApO1xuXHRyZXF1ZXN0ID0gX3NldEhlYWRlcnMoIHJlcXVlc3QsIHdwcmVxLl9vcHRpb25zICk7XG5cblx0cmV0dXJuIGludm9rZUFuZFByb21pc2lmeSggcmVxdWVzdCwgY2FsbGJhY2ssIHJldHVybkJvZHkuYmluZCggbnVsbCwgd3ByZXEgKSApO1xufVxuXG4vKipcbiAqIEBtZXRob2QgZGVsZXRlXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7V1BSZXF1ZXN0fSB3cHJlcSBBIFdQUmVxdWVzdCBxdWVyeSBvYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBbZGF0YV0gRGF0YSB0byBzZW5kIGFsb25nIHdpdGggdGhlIERFTEVURSByZXF1ZXN0XG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY2FsbGJhY2tdIEEgY2FsbGJhY2sgdG8gaW52b2tlIHdpdGggdGhlIHJlc3VsdHMgb2YgdGhlIERFTEVURSByZXF1ZXN0XG4gKiBAcmV0dXJucyB7UHJvbWlzZX0gQSBwcm9taXNlIHRvIHRoZSByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gX2h0dHBEZWxldGUoIHdwcmVxLCBkYXRhLCBjYWxsYmFjayApIHtcblx0aWYgKCAhIGNhbGxiYWNrICYmIHR5cGVvZiBkYXRhID09PSAnZnVuY3Rpb24nICkge1xuXHRcdGNhbGxiYWNrID0gZGF0YTtcblx0XHRkYXRhID0gbnVsbDtcblx0fVxuXHRjaGVja01ldGhvZFN1cHBvcnQoICdkZWxldGUnLCB3cHJlcSApO1xuXHRjb25zdCB1cmwgPSB3cHJlcS50b1N0cmluZygpO1xuXHRsZXQgcmVxdWVzdCA9IF9hdXRoKCBhZ2VudC5kZWwoIHVybCApLCB3cHJlcS5fb3B0aW9ucywgdHJ1ZSApLnNlbmQoIGRhdGEgKTtcblx0cmVxdWVzdCA9IF9zZXRIZWFkZXJzKCByZXF1ZXN0LCB3cHJlcS5fb3B0aW9ucyApO1xuXG5cdHJldHVybiBpbnZva2VBbmRQcm9taXNpZnkoIHJlcXVlc3QsIGNhbGxiYWNrLCByZXR1cm5Cb2R5LmJpbmQoIG51bGwsIHdwcmVxICkgKTtcbn1cblxuLyoqXG4gKiBAbWV0aG9kIGhlYWRcbiAqIEBhc3luY1xuICogQHBhcmFtIHtXUFJlcXVlc3R9IHdwcmVxIEEgV1BSZXF1ZXN0IHF1ZXJ5IG9iamVjdFxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2NhbGxiYWNrXSBBIGNhbGxiYWNrIHRvIGludm9rZSB3aXRoIHRoZSByZXN1bHRzIG9mIHRoZSBIRUFEIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdG8gdGhlIGhlYWRlciByZXN1bHRzIG9mIHRoZSBIVFRQIHJlcXVlc3RcbiAqL1xuZnVuY3Rpb24gX2h0dHBIZWFkKCB3cHJlcSwgY2FsbGJhY2sgKSB7XG5cdGNoZWNrTWV0aG9kU3VwcG9ydCggJ2hlYWQnLCB3cHJlcSApO1xuXHRjb25zdCB1cmwgPSB3cHJlcS50b1N0cmluZygpO1xuXHRsZXQgcmVxdWVzdCA9IF9hdXRoKCBhZ2VudC5oZWFkKCB1cmwgKSwgd3ByZXEuX29wdGlvbnMgKTtcblx0cmVxdWVzdCA9IF9zZXRIZWFkZXJzKCByZXF1ZXN0LCB3cHJlcS5fb3B0aW9ucyApO1xuXG5cdHJldHVybiBpbnZva2VBbmRQcm9taXNpZnkoIHJlcXVlc3QsIGNhbGxiYWNrLCByZXR1cm5IZWFkZXJzICk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRkZWxldGU6IF9odHRwRGVsZXRlLFxuXHRnZXQ6IF9odHRwR2V0LFxuXHRoZWFkOiBfaHR0cEhlYWQsXG5cdHBvc3Q6IF9odHRwUG9zdCxcblx0cHV0OiBfaHR0cFB1dCxcbn07XG4iLCIvKipcbiAqIEBtb2R1bGUgbWl4aW5zL2ZpbHRlcnNcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBhbHBoYU51bWVyaWNTb3J0ID0gcmVxdWlyZSggJy4uL3V0aWwvYWxwaGFudW1lcmljLXNvcnQnICk7XG5jb25zdCBrZXlWYWxUb09iaiA9IHJlcXVpcmUoICcuLi91dGlsL2tleS12YWwtdG8tb2JqJyApO1xuY29uc3QgdW5pcXVlID0gcmVxdWlyZSggJy4uL3V0aWwvdW5pcXVlJyApO1xuXG4vKipcbiAqIEZpbHRlciBtZXRob2RzIHRoYXQgY2FuIGJlIG1peGVkIGluIHRvIGEgcmVxdWVzdCBjb25zdHJ1Y3RvcidzIHByb3RvdHlwZSB0b1xuICogYWxsb3cgdGhhdCByZXF1ZXN0IHRvIHRha2UgYWR2YW50YWdlIG9mIHRoZSBgP2ZpbHRlcltdPWAgYWxpYXNlcyBmb3IgV1BfUXVlcnlcbiAqIHBhcmFtZXRlcnMgZm9yIGNvbGxlY3Rpb24gZW5kcG9pbnRzLCB3aGVuIGF2YWlsYWJsZS5cbiAqXG4gKiBAbWl4aW4gZmlsdGVyc1xuICovXG5jb25zdCBmaWx0ZXJNaXhpbnMgPSB7fTtcblxuLy8gRmlsdGVyIE1ldGhvZHNcbi8vID09PT09PT09PT09PT09XG5cbi8qKlxuICogU3BlY2lmeSBrZXktdmFsdWUgcGFpcnMgYnkgd2hpY2ggdG8gZmlsdGVyIHRoZSBBUEkgcmVzdWx0cyAoY29tbW9ubHkgdXNlZFxuICogdG8gcmV0cmlldmUgb25seSBwb3N0cyBtZWV0aW5nIGNlcnRhaW4gY3JpdGVyaWEsIHN1Y2ggYXMgcG9zdHMgd2l0aGluIGFcbiAqIHBhcnRpY3VsYXIgY2F0ZWdvcnkgb3IgYnkgYSBwYXJ0aWN1bGFyIGF1dGhvcikuXG4gKlxuICogQGV4YW1wbGVcbiAqXG4gKiAgICAgLy8gU2V0IGEgc2luZ2xlIHByb3BlcnR5OlxuICogICAgIHdwLmZpbHRlciggJ3Bvc3RfdHlwZScsICdjcHRfZXZlbnQnICkuLi5cbiAqXG4gKiAgICAgLy8gU2V0IG11bHRpcGxlIHByb3BlcnRpZXMgYXQgb25jZTpcbiAqICAgICB3cC5maWx0ZXIoe1xuICogICAgICAgICBwb3N0X3N0YXR1czogJ3B1Ymxpc2gnLFxuICogICAgICAgICBjYXRlZ29yeV9uYW1lOiAnbmV3cydcbiAqICAgICB9KS4uLlxuICpcbiAqICAgICAvLyBDaGFpbiBjYWxscyB0byAuZmlsdGVyKCk6XG4gKiAgICAgd3AuZmlsdGVyKCAncG9zdF9zdGF0dXMnLCAncHVibGlzaCcgKS5maWx0ZXIoICdjYXRlZ29yeV9uYW1lJywgJ25ld3MnICkuLi5cbiAqXG4gKiBAbWV0aG9kIGZpbHRlclxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8T2JqZWN0fSBwcm9wcyBBIGZpbHRlciBwcm9wZXJ0eSBuYW1lIHN0cmluZywgb3Igb2JqZWN0IG9mIG5hbWUvdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gW3ZhbHVlXSBUaGUgdmFsdWUocykgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvdmlkZWQgZmlsdGVyIHByb3BlcnR5XG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5maWx0ZXJNaXhpbnMuZmlsdGVyID0gZnVuY3Rpb24oIHByb3BzLCB2YWx1ZSApIHtcblx0aWYgKCAhIHByb3BzIHx8IHR5cGVvZiBwcm9wcyA9PT0gJ3N0cmluZycgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCApIHtcblx0XHQvLyBXZSBoYXZlIG5vIGZpbHRlciB0byBzZXQsIG9yIG5vIHZhbHVlIHRvIHNldCBmb3IgdGhhdCBmaWx0ZXJcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXG5cdC8vIGNvbnZlcnQgdGhlIHByb3BlcnR5IG5hbWUgc3RyaW5nIGBwcm9wc2AgYW5kIHZhbHVlIGB2YWx1ZWAgaW50byBhbiBvYmplY3Rcblx0aWYgKCB0eXBlb2YgcHJvcHMgPT09ICdzdHJpbmcnICkge1xuXHRcdHByb3BzID0ga2V5VmFsVG9PYmooIHByb3BzLCB2YWx1ZSApO1xuXHR9XG5cblx0dGhpcy5fZmlsdGVycyA9IHtcblx0XHQuLi50aGlzLl9maWx0ZXJzLFxuXHRcdC4uLnByb3BzLFxuXHR9O1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZXN0cmljdCB0aGUgcXVlcnkgcmVzdWx0cyB0byBwb3N0cyBtYXRjaGluZyBvbmUgb3IgbW9yZSB0YXhvbm9teSB0ZXJtcy5cbiAqXG4gKiBAbWV0aG9kIHRheG9ub215XG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gdGF4b25vbXkgVGhlIG5hbWUgb2YgdGhlIHRheG9ub215IHRvIGZpbHRlciBieVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB0ZXJtIEEgc3RyaW5nIG9yIGludGVnZXIsIG9yIGFycmF5IHRoZXJlb2YsIHJlcHJlc2VudGluZyB0ZXJtc1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLnRheG9ub215ID0gZnVuY3Rpb24oIHRheG9ub215LCB0ZXJtICkge1xuXHRjb25zdCB0ZXJtSXNBcnJheSA9IEFycmF5LmlzQXJyYXkoIHRlcm0gKTtcblxuXHRjb25zdCB0ZXJtSXNOdW1iZXIgPSB0ZXJtSXNBcnJheSA/XG5cdFx0dGVybS5yZWR1Y2UoXG5cdFx0XHQoIGFsbEFyZU51bWJlcnMsIHRlcm0gKSA9PiBhbGxBcmVOdW1iZXJzICYmIHR5cGVvZiB0ZXJtID09PSAnbnVtYmVyJyxcblx0XHRcdHRydWVcblx0XHQpIDpcblx0XHR0eXBlb2YgdGVybSA9PT0gJ251bWJlcic7XG5cblx0Y29uc3QgdGVybUlzU3RyaW5nID0gdGVybUlzQXJyYXkgP1xuXHRcdHRlcm0ucmVkdWNlKFxuXHRcdFx0KCBhbGxBcmVTdHJpbmdzLCB0ZXJtICkgPT4gYWxsQXJlU3RyaW5ncyAmJiB0eXBlb2YgdGVybSA9PT0gJ3N0cmluZycsXG5cdFx0XHR0cnVlXG5cdFx0KSA6XG5cdFx0dHlwZW9mIHRlcm0gPT09ICdzdHJpbmcnO1xuXG5cdGlmICggISB0ZXJtSXNTdHJpbmcgJiYgISB0ZXJtSXNOdW1iZXIgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKCAndGVybSBtdXN0IGJlIGEgbnVtYmVyLCBzdHJpbmcsIG9yIGFycmF5IG9mIG51bWJlcnMgb3Igc3RyaW5ncycgKTtcblx0fVxuXG5cdGlmICggdGF4b25vbXkgPT09ICdjYXRlZ29yeScgKSB7XG5cdFx0aWYgKCB0ZXJtSXNTdHJpbmcgKSB7XG5cdFx0XHQvLyBRdWVyeSBwYXJhbSBmb3IgZmlsdGVyaW5nIGJ5IGNhdGVnb3J5IHNsdWcgaXMgXCJjYXRlZ29yeV9uYW1lXCJcblx0XHRcdHRheG9ub215ID0gJ2NhdGVnb3J5X25hbWUnO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBUaGUgYm9vbGVhbiBjaGVjayBhYm92ZSBlbnN1cmVzIHRoYXQgaWYgdGF4b25vbXkgPT09ICdjYXRlZ29yeScgYW5kXG5cdFx0XHQvLyB0ZXJtIGlzIG5vdCBhIHN0cmluZywgdGhlbiB0ZXJtIG11c3QgYmUgYSBudW1iZXIgYW5kIHRoZXJlZm9yZSBhbiBJRDpcblx0XHRcdC8vIFF1ZXJ5IHBhcmFtIGZvciBmaWx0ZXJpbmcgYnkgY2F0ZWdvcnkgSUQgaXMgXCJjYXRcIlxuXHRcdFx0dGF4b25vbXkgPSAnY2F0Jztcblx0XHR9XG5cdH0gZWxzZSBpZiAoIHRheG9ub215ID09PSAncG9zdF90YWcnICkge1xuXHRcdC8vIHRhZyBpcyB1c2VkIGluIHBsYWNlIG9mIHBvc3RfdGFnIGluIHRoZSBwdWJsaWMgcXVlcnkgdmFyaWFibGVzXG5cdFx0dGF4b25vbXkgPSAndGFnJztcblx0fVxuXG5cdC8vIEVuc3VyZSB0aGUgdGF4b25vbXkgZmlsdGVycyBvYmplY3QgaXMgYXZhaWxhYmxlXG5cdHRoaXMuX3RheG9ub215RmlsdGVycyA9IHRoaXMuX3RheG9ub215RmlsdGVycyB8fCB7fTtcblxuXHQvLyBFbnN1cmUgdGhlcmUncyBhbiBhcnJheSBvZiB0ZXJtcyBhdmFpbGFibGUgZm9yIHRoaXMgdGF4b25vbXlcblx0Y29uc3QgdGF4b25vbXlUZXJtcyA9ICggdGhpcy5fdGF4b25vbXlGaWx0ZXJzWyB0YXhvbm9teSBdIHx8IFtdIClcblx0XHQvLyBJbnNlcnQgdGhlIHByb3ZpZGVkIHRlcm1zIGludG8gdGhlIHNwZWNpZmllZCB0YXhvbm9teSdzIHRlcm1zIGFycmF5XG5cdFx0LmNvbmNhdCggdGVybSApXG5cdFx0Ly8gU29ydCBhcnJheVxuXHRcdC5zb3J0KCBhbHBoYU51bWVyaWNTb3J0ICk7XG5cblx0Ly8gRGUtZHVwZVxuXHR0aGlzLl90YXhvbm9teUZpbHRlcnNbIHRheG9ub215IF0gPSB1bmlxdWUoIHRheG9ub215VGVybXMsIHRydWUgKTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUXVlcnkgZm9yIHBvc3RzIHB1Ymxpc2hlZCBpbiBhIGdpdmVuIHllYXIuXG4gKlxuICogQG1ldGhvZCB5ZWFyXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcn0geWVhciBpbnRlZ2VyIHJlcHJlc2VudGF0aW9uIG9mIHllYXIgcmVxdWVzdGVkXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5maWx0ZXJNaXhpbnMueWVhciA9IGZ1bmN0aW9uKCB5ZWFyICkge1xuXHRyZXR1cm4gZmlsdGVyTWl4aW5zLmZpbHRlci5jYWxsKCB0aGlzLCAneWVhcicsIHllYXIgKTtcbn07XG5cbi8qKlxuICogUXVlcnkgZm9yIHBvc3RzIHB1Ymxpc2hlZCBpbiBhIGdpdmVuIG1vbnRoLCBlaXRoZXIgYnkgcHJvdmlkaW5nIHRoZSBudW1iZXJcbiAqIG9mIHRoZSByZXF1ZXN0ZWQgbW9udGggKGUuZy4gMyksIG9yIHRoZSBtb250aCdzIG5hbWUgYXMgYSBzdHJpbmcgKGUuZy4gXCJNYXJjaFwiKVxuICpcbiAqIEBtZXRob2QgbW9udGhcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfFN0cmluZ30gbW9udGggSW50ZWdlciBmb3IgbW9udGggKDEpIG9yIG1vbnRoIHN0cmluZyAoXCJKYW51YXJ5XCIpXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5maWx0ZXJNaXhpbnMubW9udGggPSBmdW5jdGlvbiggbW9udGggKSB7XG5cdGxldCBtb250aERhdGU7XG5cdGlmICggdHlwZW9mIG1vbnRoID09PSAnc3RyaW5nJyApIHtcblx0XHQvLyBBcHBlbmQgYSBhcmJpdHJhcnkgZGF5IGFuZCB5ZWFyIHRvIHRoZSBtb250aCB0byBwYXJzZSB0aGUgc3RyaW5nIGludG8gYSBEYXRlXG5cdFx0bW9udGhEYXRlID0gbmV3IERhdGUoIERhdGUucGFyc2UoIG1vbnRoICsgJyAxLCAyMDEyJyApICk7XG5cblx0XHQvLyBJZiB0aGUgZ2VuZXJhdGVkIERhdGUgaXMgTmFOLCB0aGVuIHRoZSBwYXNzZWQgc3RyaW5nIGlzIG5vdCBhIHZhbGlkIG1vbnRoXG5cdFx0aWYgKCBpc05hTiggbW9udGhEYXRlICkgKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHQvLyBKUyBEYXRlcyBhcmUgMCBpbmRleGVkLCBidXQgdGhlIFdQIEFQSSByZXF1aXJlcyBhIDEtaW5kZXhlZCBpbnRlZ2VyXG5cdFx0bW9udGggPSBtb250aERhdGUuZ2V0TW9udGgoKSArIDE7XG5cdH1cblxuXHQvLyBJZiBtb250aCBpcyBhIE51bWJlciwgYWRkIHRoZSBtb250aG51bSBmaWx0ZXIgdG8gdGhlIHJlcXVlc3Rcblx0aWYgKCB0eXBlb2YgbW9udGggPT09ICdudW1iZXInICkge1xuXHRcdHJldHVybiBmaWx0ZXJNaXhpbnMuZmlsdGVyLmNhbGwoIHRoaXMsICdtb250aG51bScsIG1vbnRoICk7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIHRoZSBkYXkgZmlsdGVyIGludG8gdGhlIHJlcXVlc3QgdG8gcmV0cmlldmUgcG9zdHMgZm9yIGEgZ2l2ZW4gZGF5XG4gKlxuICogQG1ldGhvZCBkYXlcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7TnVtYmVyfSBkYXkgSW50ZWdlciByZXByZXNlbnRhdGlvbiBvZiB0aGUgZGF5IHJlcXVlc3RlZFxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xuZmlsdGVyTWl4aW5zLmRheSA9IGZ1bmN0aW9uKCBkYXkgKSB7XG5cdHJldHVybiBmaWx0ZXJNaXhpbnMuZmlsdGVyLmNhbGwoIHRoaXMsICdkYXknLCBkYXkgKTtcbn07XG5cbi8qKlxuICogU3BlY2lmeSB0aGF0IHdlIGFyZSByZXF1ZXN0aW5nIGEgcGFnZSBieSBpdHMgcGF0aCAoc3BlY2lmaWMgdG8gUGFnZSByZXNvdXJjZXMpXG4gKlxuICogQG1ldGhvZCBwYXRoXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ30gcGF0aCBUaGUgcm9vdC1yZWxhdGl2ZSBVUkwgcGF0aCBmb3IgYSBwYWdlXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5maWx0ZXJNaXhpbnMucGF0aCA9IGZ1bmN0aW9uKCBwYXRoICkge1xuXHRyZXR1cm4gZmlsdGVyTWl4aW5zLmZpbHRlci5jYWxsKCB0aGlzLCAncGFnZW5hbWUnLCBwYXRoICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZpbHRlck1peGlucztcbiIsIi8qKlxuICogVGhpcyBtb2R1bGUgZGVmaW5lcyBhIG1hcHBpbmcgYmV0d2VlbiBzdXBwb3J0ZWQgR0VUIHJlcXVlc3QgcXVlcnkgcGFyYW1ldGVyXG4gKiBhcmd1bWVudHMgYW5kIHRoZWlyIGNvcnJlc3BvbmRpbmcgbWl4aW4sIGlmIGF2YWlsYWJsZS5cbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG5jb25zdCBmaWx0ZXJNaXhpbnMgPSByZXF1aXJlKCAnLi9maWx0ZXJzJyApO1xuY29uc3QgcGFyYW1ldGVyTWl4aW5zID0gcmVxdWlyZSggJy4vcGFyYW1ldGVycycgKTtcblxuLy8gYC5jb250ZXh0YCwgYC5lbWJlZGAsIGFuZCBgLmVkaXRgIChhIHNob3J0Y3V0IGZvciBgY29udGV4dChlZGl0LCB0cnVlKWApIGFyZVxuLy8gc3VwcG9ydGVkIGJ5IGRlZmF1bHQgaW4gV1BSZXF1ZXN0LCBhcyBpcyB0aGUgYmFzZSBgLnBhcmFtYCBtZXRob2QuIEFueSBHRVRcbi8vIGFyZ3VtZW50IHBhcmFtZXRlcnMgbm90IGNvdmVyZWQgaGVyZSBtdXN0IGJlIHNldCBkaXJlY3RseSBieSB1c2luZyBgLnBhcmFtYC5cblxuLy8gVGhlIGluaXRpYWwgbWl4aW5zIHdlIGRlZmluZSBhcmUgdGhlIG9uZXMgd2hlcmUgZWl0aGVyIGEgc2luZ2xlIHByb3BlcnR5XG4vLyBhY2NlcHRlZCBieSB0aGUgQVBJIGVuZHBvaW50IGNvcnJlc3BvbmRzIHRvIG11bHRpcGxlIGluZGl2aWR1YWwgbWl4aW5cbi8vIGZ1bmN0aW9ucywgb3Igd2hlcmUgdGhlIG5hbWUgd2UgdXNlIGZvciB0aGUgZnVuY3Rpb24gZGl2ZXJnZXMgZnJvbSB0aGF0XG4vLyBvZiB0aGUgcXVlcnkgcGFyYW1ldGVyIHRoYXQgdGhlIG1peGluIHNldHMuXG5jb25zdCBtaXhpbnMgPSB7XG5cdGNhdGVnb3JpZXM6IHtcblx0XHRjYXRlZ29yaWVzOiBwYXJhbWV0ZXJNaXhpbnMuY2F0ZWdvcmllcyxcblx0XHQvKiogQGRlcHJlY2F0ZWQgdXNlIC5jYXRlZ29yaWVzKCkgKi9cblx0XHRjYXRlZ29yeTogcGFyYW1ldGVyTWl4aW5zLmNhdGVnb3J5LFxuXHR9LFxuXHRjYXRlZ29yaWVzX2V4Y2x1ZGU6IHtcblx0XHRleGNsdWRlQ2F0ZWdvcmllczogcGFyYW1ldGVyTWl4aW5zLmV4Y2x1ZGVDYXRlZ29yaWVzLFxuXHR9LFxuXHR0YWdzOiB7XG5cdFx0dGFnczogcGFyYW1ldGVyTWl4aW5zLnRhZ3MsXG5cdFx0LyoqIEBkZXByZWNhdGVkIHVzZSAudGFncygpICovXG5cdFx0dGFnOiBwYXJhbWV0ZXJNaXhpbnMudGFnLFxuXHR9LFxuXHR0YWdzX2V4Y2x1ZGU6IHtcblx0XHRleGNsdWRlVGFnczogcGFyYW1ldGVyTWl4aW5zLmV4Y2x1ZGVUYWdzLFxuXHR9LFxuXHRmaWx0ZXI6IGZpbHRlck1peGlucyxcblx0cG9zdDoge1xuXHRcdHBvc3Q6IHBhcmFtZXRlck1peGlucy5wb3N0LFxuXHRcdC8qKiBAZGVwcmVjYXRlZCB1c2UgLnBvc3QoKSAqL1xuXHRcdGZvclBvc3Q6IHBhcmFtZXRlck1peGlucy5wb3N0LFxuXHR9LFxufTtcblxuLy8gQWxsIG9mIHRoZXNlIHBhcmFtZXRlciBtaXhpbnMgdXNlIGEgc2V0dGVyIGZ1bmN0aW9uIG5hbWVkIGlkZW50aWNhbGx5IHRvIHRoZVxuLy8gcHJvcGVydHkgdGhhdCB0aGUgZnVuY3Rpb24gc2V0cywgYnV0IHRoZXkgbXVzdCBzdGlsbCBiZSBwcm92aWRlZCBpbiB3cmFwcGVyXG4vLyBvYmplY3RzIHNvIHRoYXQgdGhlIG1peGluIGNhbiBiZSBgLmFzc2lnbmBlZCBjb3JyZWN0bHk6IHdyYXAgJiBhc3NpZ24gZWFjaFxuLy8gc2V0dGVyIHRvIHRoZSBtaXhpbnMgZGljdGlvbmFyeSBvYmplY3QuXG5bXG5cdCdhZnRlcicsXG5cdCdhdXRob3InLFxuXHQnYmVmb3JlJyxcblx0J3BhcmVudCcsXG5cdCdwYXNzd29yZCcsXG5cdCdzdGF0dXMnLFxuXHQnc3RpY2t5Jyxcbl0uZm9yRWFjaCggKCBtaXhpbk5hbWUgKSA9PiB7XG5cdG1peGluc1sgbWl4aW5OYW1lIF0gPSB7fTtcblx0bWl4aW5zWyBtaXhpbk5hbWUgXVsgbWl4aW5OYW1lIF0gPSBwYXJhbWV0ZXJNaXhpbnNbIG1peGluTmFtZSBdO1xufSApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1peGlucztcbiIsIi8qKlxuICogRmlsdGVyIG1ldGhvZHMgdGhhdCBjYW4gYmUgbWl4ZWQgaW4gdG8gYSByZXF1ZXN0IGNvbnN0cnVjdG9yJ3MgcHJvdG90eXBlIHRvXG4gKiBhbGxvdyB0aGF0IHJlcXVlc3QgdG8gdGFrZSBhZHZhbnRhZ2Ugb2YgdG9wLWxldmVsIHF1ZXJ5IHBhcmFtZXRlcnMgZm9yXG4gKiBjb2xsZWN0aW9uIGVuZHBvaW50cy4gVGhlc2UgYXJlIG1vc3QgcmVsZXZhbnQgdG8gcG9zdHMsIHBhZ2VzIGFuZCBDUFRzLCBidXRcbiAqIHBhZ2luYXRpb24gaGVscGVycyBhcmUgYXBwbGljYWJsZSB0byBhbnkgY29sbGVjdGlvbi5cbiAqXG4gKiBAbW9kdWxlIG1peGlucy9wYXJhbWV0ZXJzXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGFyYW1TZXR0ZXIgPSByZXF1aXJlKCAnLi4vdXRpbC9wYXJhbWV0ZXItc2V0dGVyJyApO1xuY29uc3QgYXJndW1lbnRJc051bWVyaWMgPSByZXF1aXJlKCAnLi4vdXRpbC9hcmd1bWVudC1pcy1udW1lcmljJyApO1xuXG4vKipcbiAqIEBtaXhpbiBwYXJhbWV0ZXJzXG4gKi9cbmNvbnN0IHBhcmFtZXRlck1peGlucyA9IHt9O1xuXG5jb25zdCBmaWx0ZXJzID0gcmVxdWlyZSggJy4vZmlsdGVycycgKTtcbi8vIE5lZWRlZCBmb3IgLmF1dGhvciBtaXhpbiwgYXMgYXV0aG9yIGJ5IElEIGlzIGEgcGFyYW1ldGVyIGFuZCBieSBOYW1lIGlzIGEgZmlsdGVyXG5jb25zdCBmaWx0ZXIgPSBmaWx0ZXJzLmZpbHRlcjtcbi8vIE5lZWRlZCBmb3IgLnRhZyBhbmQgLmNhdGVnb3J5IG1peGluLCBmb3IgZGVwcmVjYXRlZCBxdWVyeS1ieS1zbHVnIHN1cHBvcnRcbmNvbnN0IHRheG9ub215ID0gZmlsdGVycy50YXhvbm9teTtcblxuLy8gUGFyYW1ldGVyIE1ldGhvZHNcbi8vID09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUXVlcnkgZm9yIHBvc3RzIGJ5IGEgc3BlY2lmaWMgYXV0aG9yLlxuICogVGhpcyBtZXRob2Qgd2lsbCByZXBsYWNlIGFueSBwcmV2aW91cyAnYXV0aG9yJyBxdWVyeSBwYXJhbWV0ZXJzIHRoYXQgaGFkIGJlZW4gc2V0LlxuICpcbiAqIE5vdGUgdGhhdCB0aGlzIG1ldGhvZCB3aWxsIGVpdGhlciBzZXQgdGhlIFwiYXV0aG9yXCIgdG9wLWxldmVsIHF1ZXJ5IHBhcmFtZXRlcixcbiAqIG9yIGVsc2UgdGhlIFwiYXV0aG9yX25hbWVcIiBmaWx0ZXIgcGFyYW1ldGVyICh3aGVuIHF1ZXJ5aW5nIGJ5IG5pY2VuYW1lKTogdGhpcyBpc1xuICogaXJyZWd1bGFyIGFzIG1vc3QgcGFyYW1ldGVyIGhlbHBlciBtZXRob2RzIGVpdGhlciBzZXQgYSB0b3AgbGV2ZWwgcGFyYW1ldGVyIG9yIGFcbiAqIGZpbHRlciwgbm90IGJvdGguXG4gKlxuICogX1VzYWdlIHdpdGggdGhlIGF1dGhvciBuaWNlbmFtZSBzdHJpbmcgaXMgZGVwcmVjYXRlZC5fIFF1ZXJ5IGJ5IGF1dGhvciBJRCBpbnN0ZWFkLlxuICogSWYgdGhlIFwicmVzdC1maWx0ZXJcIiBwbHVnaW4gaXMgbm90IGluc3RhbGxlZCwgdGhlIG5hbWUgcXVlcnkgd2lsbCBoYXZlIG5vIGVmZmVjdC5cbiAqXG4gKiBAbWV0aG9kIGF1dGhvclxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBhdXRob3IgVGhlIG5pY2VuYW1lIG9yIElEIGZvciBhIHBhcnRpY3VsYXIgYXV0aG9yXG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5wYXJhbWV0ZXJNaXhpbnMuYXV0aG9yID0gZnVuY3Rpb24oIGF1dGhvciApIHtcblx0aWYgKCBhdXRob3IgPT09IHVuZGVmaW5lZCApIHtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRpZiAoIHR5cGVvZiBhdXRob3IgPT09ICdzdHJpbmcnICkge1xuXHRcdHRoaXMucGFyYW0oICdhdXRob3InLCBudWxsICk7XG5cdFx0cmV0dXJuIGZpbHRlci5jYWxsKCB0aGlzLCAnYXV0aG9yX25hbWUnLCBhdXRob3IgKTtcblx0fVxuXHRpZiAoIHR5cGVvZiBhdXRob3IgPT09ICdudW1iZXInICkge1xuXHRcdGZpbHRlci5jYWxsKCB0aGlzLCAnYXV0aG9yX25hbWUnLCBudWxsICk7XG5cdFx0cmV0dXJuIHRoaXMucGFyYW0oICdhdXRob3InLCBhdXRob3IgKTtcblx0fVxuXHRpZiAoIGF1dGhvciA9PT0gbnVsbCApIHtcblx0XHRmaWx0ZXIuY2FsbCggdGhpcywgJ2F1dGhvcl9uYW1lJywgbnVsbCApO1xuXHRcdHJldHVybiB0aGlzLnBhcmFtKCAnYXV0aG9yJywgbnVsbCApO1xuXHR9XG5cdHRocm93IG5ldyBFcnJvciggJ2F1dGhvciBtdXN0IGJlIGVpdGhlciBhIG5pY2VuYW1lIHN0cmluZyBvciBudW1lcmljIElEJyApO1xufTtcblxuLyoqXG4gKiBTZWFyY2ggZm9yIGhpZXJhcmNoaWNhbCB0YXhvbm9teSB0ZXJtcyB0aGF0IGFyZSBjaGlsZHJlbiBvZiB0aGUgcGFyZW50IHRlcm1cbiAqIGluZGljYXRlZCBieSB0aGUgcHJvdmlkZWQgdGVybSBJRFxuICpcbiAqIEBleGFtcGxlXG4gKlxuICogICAgIHdwLnBhZ2VzKCkucGFyZW50KCAzICkudGhlbihmdW5jdGlvbiggcGFnZXMgKSB7XG4gKiAgICAgICAvLyBjb25zb2xlLmxvZyggJ2FsbCBvZiB0aGVzZSBwYWdlcyBhcmUgbmVzdGVkIGJlbG93IHBhZ2UgSUQjMzonICk7XG4gKiAgICAgICAvLyBjb25zb2xlLmxvZyggcGFnZXMgKTtcbiAqICAgICB9KTtcbiAqXG4gKiAgICAgd3AuY2F0ZWdvcmllcygpLnBhcmVudCggNDIgKS50aGVuKGZ1bmN0aW9uKCBjYXRlZ29yaWVzICkge1xuICogICAgICAgY29uc29sZS5sb2coICdhbGwgb2YgdGhlc2UgY2F0ZWdvcmllcyBhcmUgc3ViLWl0ZW1zIG9mIGNhdCBJRCM0MjonICk7XG4gKiAgICAgICBjb25zb2xlLmxvZyggY2F0ZWdvcmllcyApO1xuICogICAgIH0pO1xuICpcbiAqIEBtZXRob2QgcGFyZW50XG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge051bWJlcn0gcGFyZW50SWQgVGhlIElEIG9mIGEgKGhpZXJhcmNoaWNhbCkgdGF4b25vbXkgdGVybVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnBhcmVudCA9IHBhcmFtU2V0dGVyKCAncGFyZW50JyApO1xuXG4vKipcbiAqIFNwZWNpZnkgdGhlIHBvc3QgZm9yIHdoaWNoIHRvIHJldHJpZXZlIHRlcm1zIChyZWxldmFudCBmb3IgKmUuZy4qIHRheG9ub215XG4gKiBhbmQgY29tbWVudCBjb2xsZWN0aW9uIGVuZHBvaW50cykuXG4gKlxuICogQG1ldGhvZCBwb3N0XG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ9IHBvc3QgVGhlIElEIG9mIHRoZSBwb3N0IGZvciB3aGljaCB0byByZXRyaWV2ZSB0ZXJtc1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnBvc3QgPSBwYXJhbVNldHRlciggJ3Bvc3QnICk7XG5cbi8qKlxuICogU3BlY2lmeSB0aGUgcGFzc3dvcmQgdG8gdXNlIHRvIGFjY2VzcyB0aGUgY29udGVudCBvZiBhIHBhc3N3b3JkLXByb3RlY3RlZCBwb3N0XG4gKlxuICogQG1ldGhvZCBwYXNzd29yZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtzdHJpbmd9IHBhc3N3b3JkIEEgc3RyaW5nIHBhc3N3b3JkIHRvIGFjY2VzcyBwcm90ZWN0ZWQgY29udGVudCB3aXRoaW4gYSBwb3N0XG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5wYXJhbWV0ZXJNaXhpbnMucGFzc3dvcmQgPSBwYXJhbVNldHRlciggJ3Bhc3N3b3JkJyApO1xuXG4vKipcbiAqIFNwZWNpZnkgZm9yIHdoaWNoIHBvc3Qgc3RhdHVzZXMgdG8gcmV0dXJuIHBvc3RzIGluIGEgcmVzcG9uc2UgY29sbGVjdGlvblxuICpcbiAqIFNlZSBodHRwczovL2NvZGV4LndvcmRwcmVzcy5vcmcvUG9zdF9TdGF0dXMgLS0gdGhlIGRlZmF1bHQgcG9zdCBzdGF0dXNcbiAqIHZhbHVlcyBpbiBXb3JkUHJlc3Mgd2hpY2ggYXJlIG1vc3QgcmVsZXZhbnQgdG8gdGhlIEFQSSBhcmUgJ3B1Ymxpc2gnLFxuICogJ2Z1dHVyZScsICdkcmFmdCcsICdwZW5kaW5nJywgJ3ByaXZhdGUnLCBhbmQgJ3RyYXNoJy4gVGhpcyBwYXJhbWV0ZXIgYWxzb1xuICogc3VwcG9ydHMgcGFzc2luZyB0aGUgc3BlY2lhbCB2YWx1ZSBcImFueVwiIHRvIHJldHVybiBhbGwgc3RhdHVzZXMuXG4gKlxuICogQG1ldGhvZCBzdGF0dXNcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7c3RyaW5nfHN0cmluZ1tdfSBzdGF0dXMgQSBzdGF0dXMgbmFtZSBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5nc1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnN0YXR1cyA9IHBhcmFtU2V0dGVyKCAnc3RhdHVzJyApO1xuXG4vKipcbiAqIFNwZWNpZnkgd2hldGhlciB0byByZXR1cm4gb25seSwgb3IgdG8gY29tcGxldGVseSBleGNsdWRlLCBzdGlja3kgcG9zdHNcbiAqXG4gKiBAbWV0aG9kIHN0aWNreVxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtib29sZWFufSBzdGlja3kgQSBib29sZWFuIHZhbHVlIGZvciB3aGV0aGVyIE9OTFkgc3RpY2t5IHBvc3RzICh0cnVlKSBvclxuICogICAgICAgICAgICAgICAgICAgICAgICAgTk8gc3RpY2t5IHBvc3RzIChmYWxzZSkgc2hvdWxkIGJlIHJldHVybmVkIGluIHRoZSBxdWVyeVxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnN0aWNreSA9IHBhcmFtU2V0dGVyKCAnc3RpY2t5JyApO1xuXG4vLyBUYXhvbm9teSBUZXJtIEZpbHRlciBNZXRob2RzXG4vLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09XG5cbi8qKlxuICogUmV0cmlldmUgb25seSByZWNvcmRzIGFzc29jaWF0ZWQgd2l0aCBvbmUgb2YgdGhlIHByb3ZpZGVkIGNhdGVnb3JpZXNcbiAqXG4gKiBAbWV0aG9kIGNhdGVnb3JpZXNcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gY2F0ZWdvcmllcyBBIHRlcm0gSUQgaW50ZWdlciBvciBudW1lcmljIHN0cmluZywgb3IgYXJyYXkgdGhlcmVvZlxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLmNhdGVnb3JpZXMgPSBwYXJhbVNldHRlciggJ2NhdGVnb3JpZXMnICk7XG5cbi8qKlxuICogTGVnYWN5IHdyYXBwZXIgZm9yIGAuY2F0ZWdvcmllcygpYCB0aGF0IHVzZXMgYD9maWx0ZXJgIHRvIHF1ZXJ5IGJ5IHNsdWcgaWYgYXZhaWxhYmxlXG4gKlxuICogQG1ldGhvZCB0YWdcbiAqIEBkZXByZWNhdGVkIFVzZSBgLmNhdGVnb3JpZXMoKWAgYW5kIHF1ZXJ5IGJ5IGNhdGVnb3J5IElEc1xuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSB0YWcgQSBjYXRlZ29yeSB0ZXJtIHNsdWcgc3RyaW5nLCBudW1lcmljIElELCBvciBhcnJheSBvZiBudW1lcmljIElEc1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLmNhdGVnb3J5ID0gZnVuY3Rpb24oIGNhdGVnb3J5ICkge1xuXHRpZiAoIGFyZ3VtZW50SXNOdW1lcmljKCBjYXRlZ29yeSApICkge1xuXHRcdHJldHVybiBwYXJhbWV0ZXJNaXhpbnMuY2F0ZWdvcmllcy5jYWxsKCB0aGlzLCBjYXRlZ29yeSApO1xuXHR9XG5cdHJldHVybiB0YXhvbm9teS5jYWxsKCB0aGlzLCAnY2F0ZWdvcnknLCBjYXRlZ29yeSApO1xufTtcblxuLyoqXG4gKiBFeGNsdWRlIHJlY29yZHMgYXNzb2NpYXRlZCB3aXRoIGFueSBvZiB0aGUgcHJvdmlkZWQgY2F0ZWdvcnkgSURzXG4gKlxuICogQG1ldGhvZCBleGNsdWRlQ2F0ZWdvcmllc1xuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfEFycmF5fSBjYXRlZ29yeSBBIHRlcm0gSUQgaW50ZWdlciBvciBudW1lcmljIHN0cmluZywgb3IgYXJyYXkgdGhlcmVvZlxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLmV4Y2x1ZGVDYXRlZ29yaWVzID0gcGFyYW1TZXR0ZXIoICdjYXRlZ29yaWVzX2V4Y2x1ZGUnICk7XG5cbi8qKlxuICogUmV0cmlldmUgb25seSByZWNvcmRzIGFzc29jaWF0ZWQgd2l0aCBvbmUgb2YgdGhlIHByb3ZpZGVkIHRhZyBJRHNcbiAqXG4gKiBAbWV0aG9kIHRhZ3NcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gdGFncyBBIHRlcm0gSUQgaW50ZWdlciBvciBudW1lcmljIHN0cmluZywgb3IgYXJyYXkgdGhlcmVvZlxuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnRhZ3MgPSBwYXJhbVNldHRlciggJ3RhZ3MnICk7XG5cbi8qKlxuICogTGVnYWN5IHdyYXBwZXIgZm9yIGAudGFncygpYCB0aGF0IHVzZXMgYD9maWx0ZXJgIHRvIHF1ZXJ5IGJ5IHNsdWcgaWYgYXZhaWxhYmxlXG4gKlxuICogQG1ldGhvZCB0YWdcbiAqIEBkZXByZWNhdGVkIFVzZSBgLnRhZ3MoKWAgYW5kIHF1ZXJ5IGJ5IHRlcm0gSURzXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xOdW1iZXJ8QXJyYXl9IHRhZyBBIHRhZyB0ZXJtIHNsdWcgc3RyaW5nLCBudW1lcmljIElELCBvciBhcnJheSBvZiBudW1lcmljIElEc1xuICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2UgKGZvciBjaGFpbmluZylcbiAqL1xucGFyYW1ldGVyTWl4aW5zLnRhZyA9IGZ1bmN0aW9uKCB0YWcgKSB7XG5cdGlmICggYXJndW1lbnRJc051bWVyaWMoIHRhZyApICkge1xuXHRcdHJldHVybiBwYXJhbWV0ZXJNaXhpbnMudGFncy5jYWxsKCB0aGlzLCB0YWcgKTtcblx0fVxuXHRyZXR1cm4gdGF4b25vbXkuY2FsbCggdGhpcywgJ3RhZycsIHRhZyApO1xufTtcblxuLyoqXG4gKiBFeGNsdWRlIHJlY29yZHMgYXNzb2NpYXRlZCB3aXRoIGFueSBvZiB0aGUgcHJvdmlkZWQgdGFnIElEc1xuICpcbiAqIEBtZXRob2QgZXhjbHVkZVRhZ3NcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcnxBcnJheX0gY2F0ZWdvcnkgQSB0ZXJtIElEIGludGVnZXIgb3IgbnVtZXJpYyBzdHJpbmcsIG9yIGFycmF5IHRoZXJlb2ZcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5leGNsdWRlVGFncyA9IHBhcmFtU2V0dGVyKCAndGFnc19leGNsdWRlJyApO1xuXG4vLyBEYXRlIE1ldGhvZHNcbi8vID09PT09PT09PT09PVxuXG4vKipcbiAqIFJldHJpZXZlIG9ubHkgcmVjb3JkcyBwdWJsaXNoZWQgYmVmb3JlIGEgc3BlY2lmaWVkIGRhdGVcbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Qcm92aWRlIGFuIElTTyA4NjAxLWNvbXBsaWFudCBkYXRlIHN0cmluZzwvY2FwdGlvbj5cbiAqXG4gKiAgICAgd3AucG9zdHMoKS5iZWZvcmUoJzIwMTYtMDMtMjInKS4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlByb3ZpZGUgYSBKYXZhU2NyaXB0IERhdGUgb2JqZWN0PC9jYXB0aW9uPlxuICpcbiAqICAgICB3cC5wb3N0cygpLmJlZm9yZSggbmV3IERhdGUoIDIwMTYsIDAzLCAyMiApICkuLi5cbiAqXG4gKiBAbWV0aG9kIGJlZm9yZVxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtTdHJpbmd8RGF0ZX0gZGF0ZSBBbiBJU08gODYwMS1jb21wbGlhbnQgZGF0ZSBzdHJpbmcsIG9yIERhdGUgb2JqZWN0XG4gKiBAcmV0dXJucyBUaGUgcmVxdWVzdCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuICovXG5wYXJhbWV0ZXJNaXhpbnMuYmVmb3JlID0gZnVuY3Rpb24oIGRhdGUgKSB7XG5cdHJldHVybiB0aGlzLnBhcmFtKCAnYmVmb3JlJywgbmV3IERhdGUoIGRhdGUgKS50b0lTT1N0cmluZygpICk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlIG9ubHkgcmVjb3JkcyBwdWJsaXNoZWQgYWZ0ZXIgYSBzcGVjaWZpZWQgZGF0ZVxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlByb3ZpZGUgYW4gSVNPIDg2MDEtY29tcGxpYW50IGRhdGUgc3RyaW5nPC9jYXB0aW9uPlxuICpcbiAqICAgICB3cC5wb3N0cygpLmFmdGVyKCcxOTg2LTAzLTIyJykuLi5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5Qcm92aWRlIGEgSmF2YVNjcmlwdCBEYXRlIG9iamVjdDwvY2FwdGlvbj5cbiAqXG4gKiAgICAgd3AucG9zdHMoKS5hZnRlciggbmV3IERhdGUoIDE5ODYsIDAzLCAyMiApICkuLi5cbiAqXG4gKiBAbWV0aG9kIGFmdGVyXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xEYXRlfSBkYXRlIEFuIElTTyA4NjAxLWNvbXBsaWFudCBkYXRlIHN0cmluZywgb3IgRGF0ZSBvYmplY3RcbiAqIEByZXR1cm5zIFRoZSByZXF1ZXN0IGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG4gKi9cbnBhcmFtZXRlck1peGlucy5hZnRlciA9IGZ1bmN0aW9uKCBkYXRlICkge1xuXHRyZXR1cm4gdGhpcy5wYXJhbSggJ2FmdGVyJywgbmV3IERhdGUoIGRhdGUgKS50b0lTT1N0cmluZygpICk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHBhcmFtZXRlck1peGlucztcbiIsIi8qKlxuICogQG1vZHVsZSBwYXRoLXBhcnQtc2V0dGVyXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXR1cm4gYSBmdW5jdGlvbiB0byBzZXQgcGFydCBvZiB0aGUgcmVxdWVzdCBVUkwgcGF0aC5cbiAqXG4gKiBQYXRoIHBhcnQgc2V0dGVyIG1ldGhvZHMgbWF5IGJlIGVpdGhlciBkeW5hbWljICgqaS5lLiogbWF5IHJlcHJlc2VudCBhXG4gKiBcIm5hbWVkIGdyb3VwXCIpIG9yIG5vbi1keW5hbWljIChyZXByZXNlbnRpbmcgYSBzdGF0aWMgcGFydCBvZiB0aGUgVVJMLCB3aGljaFxuICogaXMgdXN1YWxseSBhIGNvbGxlY3Rpb24gZW5kcG9pbnQgb2Ygc29tZSBzb3J0KS4gV2hpY2ggdHlwZSBvZiBmdW5jdGlvbiBpc1xuICogcmV0dXJuZWQgZGVwZW5kcyBvbiB3aGV0aGVyIGEgZ2l2ZW4gcm91dGUgaGFzIG9uZSBvciBtYW55IHN1Yi1yZXNvdXJjZXMuXG4gKlxuICogQGFsaWFzIG1vZHVsZTpsaWIvcGF0aC1wYXJ0LXNldHRlci5jcmVhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBub2RlIEFuIG9iamVjdCByZXByZXNlbnRpbmcgYSBsZXZlbCBvZiBhbiBlbmRwb2ludCBwYXRoIGhpZXJhcmNoeVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHBhdGggcGFydCBzZXR0ZXIgZnVuY3Rpb25cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGF0aFBhcnRTZXR0ZXIoIG5vZGUgKSB7XG5cdC8vIExvY2FsIHJlZmVyZW5jZXMgdG8gYG5vZGVgIHByb3BlcnRpZXMgdXNlZCBieSByZXR1cm5lZCBmdW5jdGlvbnNcblx0Y29uc3Qgbm9kZUxldmVsID0gbm9kZS5sZXZlbDtcblx0Y29uc3Qgbm9kZU5hbWUgPSBub2RlLm5hbWVzWyAwIF07XG5cdGNvbnN0IHN1cHBvcnRlZE1ldGhvZHMgPSBub2RlLm1ldGhvZHMgfHwgW107XG5cdGNvbnN0IGR5bmFtaWNDaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW4gP1xuXHRcdE9iamVjdC5rZXlzKCBub2RlLmNoaWxkcmVuIClcblx0XHRcdC5tYXAoIGtleSA9PiBub2RlLmNoaWxkcmVuWyBrZXkgXSApXG5cdFx0XHQuZmlsdGVyKCBjaGlsZE5vZGUgPT4gKCBjaGlsZE5vZGUubmFtZWRHcm91cCA9PT0gdHJ1ZSApICkgOlxuXHRcdFtdO1xuXHRjb25zdCBkeW5hbWljQ2hpbGQgPSBkeW5hbWljQ2hpbGRyZW4ubGVuZ3RoID09PSAxICYmIGR5bmFtaWNDaGlsZHJlblsgMCBdO1xuXHRjb25zdCBkeW5hbWljQ2hpbGRMZXZlbCA9IGR5bmFtaWNDaGlsZCAmJiBkeW5hbWljQ2hpbGQubGV2ZWw7XG5cblx0aWYgKCBub2RlLm5hbWVkR3JvdXAgKSB7XG5cdFx0LyoqXG5cdFx0ICogU2V0IGEgZHltYW5pYyAobmFtZWQtZ3JvdXApIHBhdGggcGFydCBvZiBhIHF1ZXJ5IFVSTC5cblx0XHQgKlxuXHRcdCAqIEBleGFtcGxlXG5cdFx0ICpcblx0XHQgKiAgICAgLy8gaWQoKSBpcyBhIGR5bmFtaWMgcGF0aCBwYXJ0IHNldHRlcjpcblx0XHQgKiAgICAgd3AucG9zdHMoKS5pZCggNyApOyAvLyBHZXQgcG9zdHMvN1xuXHRcdCAqXG5cdFx0ICogQGNoYWluYWJsZVxuXHRcdCAqIEBwYXJhbSAge1N0cmluZ3xOdW1iZXJ9IHZhbCBUaGUgcGF0aCBwYXJ0IHZhbHVlIHRvIHNldFxuXHRcdCAqIEByZXR1cm5zIHtPYmplY3R9IFRoZSBoYW5kbGVyIGluc3RhbmNlIChmb3IgY2hhaW5pbmcpXG5cdFx0ICovXG5cdFx0cmV0dXJuIGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0XHR0aGlzLnNldFBhdGhQYXJ0KCBub2RlTGV2ZWwsIHZhbCApO1xuXHRcdFx0aWYgKCBzdXBwb3J0ZWRNZXRob2RzLmxlbmd0aCApIHtcblx0XHRcdFx0dGhpcy5fc3VwcG9ydGVkTWV0aG9kcyA9IHN1cHBvcnRlZE1ldGhvZHM7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9O1xuXHR9IGVsc2Uge1xuXHRcdC8qKlxuXHRcdCAqIFNldCBhIG5vbi1keW1hbmljIChub24tbmFtZWQtZ3JvdXApIHBhdGggcGFydCBvZiBhIHF1ZXJ5IFVSTCwgYW5kXG5cdFx0ICogc2V0IHRoZSB2YWx1ZSBvZiBhIHN1YnJlc291cmNlIGlmIGFuIGlucHV0IHZhbHVlIGlzIHByb3ZpZGVkIGFuZFxuXHRcdCAqIGV4YWN0bHkgb25lIG5hbWVkLWdyb3VwIGNoaWxkIG5vZGUgZXhpc3RzLlxuXHRcdCAqXG5cdFx0ICogQGV4YW1wbGVcblx0XHQgKlxuXHRcdCAqICAgICAvLyByZXZpc2lvbnMoKSBpcyBhIG5vbi1keW5hbWljIHBhdGggcGFydCBzZXR0ZXI6XG5cdFx0ICogICAgIHdwLnBvc3RzKCkuaWQoIDQgKS5yZXZpc2lvbnMoKTsgICAgICAgLy8gR2V0IHBvc3RzLzQvcmV2aXNpb25zXG5cdFx0ICogICAgIHdwLnBvc3RzKCkuaWQoIDQgKS5yZXZpc2lvbnMoIDEzNzIgKTsgLy8gR2V0IHBvc3RzLzQvcmV2aXNpb25zLzEzNzJcblx0XHQgKlxuXHRcdCAqIEBjaGFpbmFibGVcblx0XHQgKiBAcGFyYW0gIHtTdHJpbmd8TnVtYmVyfSBbdmFsXSBUaGUgcGF0aCBwYXJ0IHZhbHVlIHRvIHNldCAoaWYgcHJvdmlkZWQpXG5cdFx0ICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGEgc3VicmVzb3VyY2Ugd2l0aGluIHRoaXMgcmVzb3VyY2Vcblx0XHQgKiBAcmV0dXJucyB7T2JqZWN0fSBUaGUgaGFuZGxlciBpbnN0YW5jZSAoZm9yIGNoYWluaW5nKVxuXHRcdCAqL1xuXHRcdHJldHVybiBmdW5jdGlvbiggdmFsICkge1xuXHRcdFx0Ly8gSWYgdGhlIHBhdGggcGFydCBpcyBub3QgYSBuYW1lZEdyb3VwLCBpdCBzaG91bGQgaGF2ZSBleGFjdGx5IG9uZVxuXHRcdFx0Ly8gZW50cnkgaW4gdGhlIG5hbWVzIGFycmF5OiB1c2UgdGhhdCBhcyB0aGUgdmFsdWUgZm9yIHRoaXMgc2V0dGVyLFxuXHRcdFx0Ly8gYXMgaXQgd2lsbCB1c3VhbGx5IGNvcnJlc3BvbmQgdG8gYSBjb2xsZWN0aW9uIGVuZHBvaW50LlxuXHRcdFx0dGhpcy5zZXRQYXRoUGFydCggbm9kZUxldmVsLCBub2RlTmFtZSApO1xuXG5cdFx0XHQvLyBJZiB0aGlzIG5vZGUgaGFzIGV4YWN0bHkgb25lIGR5bmFtaWMgY2hpbGQsIHRoaXMgbWV0aG9kIG1heSBhY3QgYXNcblx0XHRcdC8vIGEgc2V0dGVyIGZvciB0aGF0IGNoaWxkIG5vZGUuIGBkeW5hbWljQ2hpbGRMZXZlbGAgd2lsbCBiZSBmYWxzeSBpZiB0aGVcblx0XHRcdC8vIG5vZGUgZG9lcyBub3QgaGF2ZSBhIGNoaWxkIG9yIGhhcyBtdWx0aXBsZSBjaGlsZHJlbi5cblx0XHRcdGlmICggdmFsICE9PSB1bmRlZmluZWQgJiYgZHluYW1pY0NoaWxkTGV2ZWwgKSB7XG5cdFx0XHRcdHRoaXMuc2V0UGF0aFBhcnQoIGR5bmFtaWNDaGlsZExldmVsLCB2YWwgKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH07XG5cdH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGNyZWF0ZTogY3JlYXRlUGF0aFBhcnRTZXR0ZXIsXG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHJlc291cmNlLWhhbmRsZXItc3BlY1xuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IGNyZWF0ZVBhdGhQYXJ0U2V0dGVyID0gcmVxdWlyZSggJy4vcGF0aC1wYXJ0LXNldHRlcicgKS5jcmVhdGU7XG5cbi8qKiBAcHJpdmF0ZSAqL1xuZnVuY3Rpb24gYWRkTGV2ZWxPcHRpb24oIGxldmVsc09iaiwgbGV2ZWwsIG9iaiApIHtcblx0bGV2ZWxzT2JqWyBsZXZlbCBdID0gbGV2ZWxzT2JqWyBsZXZlbCBdIHx8IFtdO1xuXHRsZXZlbHNPYmpbIGxldmVsIF0ucHVzaCggb2JqICk7XG59XG5cbi8qKlxuICogQXNzaWduIGEgc2V0dGVyIGZ1bmN0aW9uIGZvciB0aGUgcHJvdmlkZWQgbm9kZSB0byB0aGUgcHJvdmlkZWQgcm91dGVcbiAqIGhhbmRsZXIgb2JqZWN0IHNldHRlcnMgZGljdGlvbmFyeSAobXV0YXRlcyBoYW5kbGVyIGJ5IHJlZmVyZW5jZSkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYW5kbGVyIEEgcm91dGUgaGFuZGxlciBkZWZpbml0aW9uIG9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG5vZGUgICAgQSByb3V0ZSBoaWVyYXJjaHkgbGV2ZWwgbm9kZSBvYmplY3RcbiAqL1xuZnVuY3Rpb24gYXNzaWduU2V0dGVyRm5Gb3JOb2RlKCBoYW5kbGVyLCBub2RlICkge1xuXHRsZXQgc2V0dGVyRm47XG5cblx0Ly8gRm9yIGVhY2ggbm9kZSwgYWRkIGl0cyBoYW5kbGVyIHRvIHRoZSByZWxldmFudCBcImxldmVsXCIgcmVwcmVzZW50YXRpb25cblx0YWRkTGV2ZWxPcHRpb24oIGhhbmRsZXIuX2xldmVscywgbm9kZS5sZXZlbCwge1xuXHRcdGNvbXBvbmVudDogbm9kZS5jb21wb25lbnQsXG5cdFx0dmFsaWRhdGU6IG5vZGUudmFsaWRhdGUsXG5cdFx0bWV0aG9kczogbm9kZS5tZXRob2RzLFxuXHR9ICk7XG5cblx0Ly8gRmlyc3QgbGV2ZWwgaXMgc2V0IGltcGxpY2l0bHksIG5vIGRlZGljYXRlZCBzZXR0ZXIgbmVlZGVkXG5cdGlmICggbm9kZS5sZXZlbCA+IDAgKSB7XG5cblx0XHRzZXR0ZXJGbiA9IGNyZWF0ZVBhdGhQYXJ0U2V0dGVyKCBub2RlICk7XG5cblx0XHRub2RlLm5hbWVzLmZvckVhY2goICggbmFtZSApID0+IHtcblx0XHRcdC8vIENvbnZlcnQgZnJvbSBzbmFrZV9jYXNlIHRvIGNhbWVsQ2FzZVxuXHRcdFx0Y29uc3Qgc2V0dGVyRm5OYW1lID0gbmFtZS5yZXBsYWNlKFxuXHRcdFx0XHQvW18tXStcXHcvZyxcblx0XHRcdFx0bWF0Y2ggPT4gbWF0Y2gucmVwbGFjZSggL1tfLV0rLywgJycgKS50b1VwcGVyQ2FzZSgpXG5cdFx0XHQpO1xuXG5cdFx0XHQvLyBEb24ndCBvdmVyd3JpdGUgcHJldmlvdXNseS1zZXQgbWV0aG9kc1xuXHRcdFx0aWYgKCAhIGhhbmRsZXIuX3NldHRlcnNbIHNldHRlckZuTmFtZSBdICkge1xuXHRcdFx0XHRoYW5kbGVyLl9zZXR0ZXJzWyBzZXR0ZXJGbk5hbWUgXSA9IHNldHRlckZuO1xuXHRcdFx0fVxuXHRcdH0gKTtcblx0fVxufVxuXG4vKipcbiAqIFdhbGsgdGhlIHRyZWUgb2YgYSBzcGVjaWZpYyByZXNvdXJjZSBub2RlIHRvIGNyZWF0ZSB0aGUgc2V0dGVyIG1ldGhvZHNcbiAqXG4gKiBUaGUgQVBJIHdlIHdhbnQgdG8gcHJvZHVjZSBmcm9tIHRoZSBub2RlIHRyZWUgbG9va3MgbGlrZSB0aGlzOlxuICpcbiAqICAgICB3cC5wb3N0cygpOyAgICAgICAgICAgICAgICAgICAgICAgIC93cC92Mi9wb3N0c1xuICogICAgIHdwLnBvc3RzKCkuaWQoIDcgKTsgICAgICAgICAgICAgICAgL3dwL3YyL3Bvc3RzLzdcbiAqICAgICB3cC5wb3N0cygpLmlkKCA3ICkucmV2aXNpb25zKCk7ICAgIC93cC92Mi9wb3N0cy83L3JldmlzaW9uc1xuICogICAgIHdwLnBvc3RzKCkuaWQoIDcgKS5yZXZpc2lvbnMoIDggKTsgL3dwL3YyL3Bvc3RzLzcvcmV2aXNpb25zLzhcbiAqXG4gKiBeIFRoYXQgbGFzdCBvbmUncyB0aGUgdHJpY2t5IG9uZTogd2UgY2FuIGRlZHVjZSB0aGF0IHRoaXMgcGFyYW1ldGVyIGlzIFwiaWRcIiwgYnV0XG4gKiB0aGF0IHBhcmFtIHdpbGwgYWxyZWFkeSBiZSB0YWtlbiBieSB0aGUgcG9zdCBJRCwgc28gc3ViLWNvbGxlY3Rpb25zIGhhdmUgdG8gYmVcbiAqIHNldCB1cCBhcyBgLnJldmlzaW9ucygpYCB0byBnZXQgdGhlIGNvbGxlY3Rpb24sIGFuZCBgLnJldmlzaW9ucyggaWQgKWAgdG8gZ2V0IGFcbiAqIHNwZWNpZmljIHJlc291cmNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0gIHtPYmplY3R9IG5vZGUgICAgICAgICAgICBBIG5vZGUgb2JqZWN0XG4gKiBAcGFyYW0gIHtPYmplY3R9IFtub2RlLmNoaWxkcmVuXSBBbiBvYmplY3Qgb2YgY2hpbGQgbm9kZXNcbiAqIC8vIEByZXR1cm5zIHtpc0xlYWZ9IEEgYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgdGhlIHByb2Nlc3NlZCBub2RlIGlzIGEgbGVhZlxuICovXG5mdW5jdGlvbiBleHRyYWN0U2V0dGVyRnJvbU5vZGUoIGhhbmRsZXIsIG5vZGUgKSB7XG5cblx0YXNzaWduU2V0dGVyRm5Gb3JOb2RlKCBoYW5kbGVyLCBub2RlICk7XG5cblx0aWYgKCBub2RlLmNoaWxkcmVuICkge1xuXHRcdC8vIFJlY3Vyc2UgZG93biB0byB0aGlzIG5vZGUncyBjaGlsZHJlblxuXHRcdE9iamVjdC5rZXlzKCBub2RlLmNoaWxkcmVuICkuZm9yRWFjaCggKCBrZXkgKSA9PiB7XG5cdFx0XHRleHRyYWN0U2V0dGVyRnJvbU5vZGUoIGhhbmRsZXIsIG5vZGUuY2hpbGRyZW5bIGtleSBdICk7XG5cdFx0fSApO1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgbm9kZSBoYW5kbGVyIHNwZWNpZmljYXRpb24gb2JqZWN0IGZyb20gYSByb3V0ZSBkZWZpbml0aW9uIG9iamVjdFxuICpcbiAqIEBuYW1lIGNyZWF0ZVxuICogQHBhcmFtIHtvYmplY3R9IHJvdXRlRGVmaW5pdGlvbiBBIHJvdXRlIGRlZmluaXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gcmVzb3VyY2UgVGhlIHN0cmluZyBrZXkgb2YgdGhlIHJlc291cmNlIGZvciB3aGljaCB0byBjcmVhdGUgYSBoYW5kbGVyXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIGhhbmRsZXIgc3BlYyBvYmplY3Qgd2l0aCBfcGF0aCwgX2xldmVscyBhbmQgX3NldHRlcnMgcHJvcGVydGllc1xuICovXG5mdW5jdGlvbiBjcmVhdGVOb2RlSGFuZGxlclNwZWMoIHJvdXRlRGVmaW5pdGlvbiwgcmVzb3VyY2UgKSB7XG5cblx0Y29uc3QgaGFuZGxlciA9IHtcblx0XHQvLyBBIFwicGF0aFwiIGlzIGFuIG9yZGVyZWQgKGJ5IGtleSkgc2V0IG9mIHZhbHVlcyBjb21wb3NlZCBpbnRvIHRoZSBmaW5hbCBVUkxcblx0XHRfcGF0aDoge1xuXHRcdFx0JzAnOiByZXNvdXJjZSxcblx0XHR9LFxuXG5cdFx0Ly8gQSBcImxldmVsXCIgaXMgYSBsZXZlbC1rZXllZCBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSB2YWxpZCBvcHRpb25zIGZvclxuXHRcdC8vIG9uZSBsZXZlbCBvZiB0aGUgcmVzb3VyY2UgVVJMXG5cdFx0X2xldmVsczoge30sXG5cblx0XHQvLyBPYmplY3RzIHRoYXQgaG9sZCBtZXRob2RzIGFuZCBwcm9wZXJ0aWVzIHdoaWNoIHdpbGwgYmUgY29waWVkIHRvXG5cdFx0Ly8gaW5zdGFuY2VzIG9mIHRoaXMgZW5kcG9pbnQncyBoYW5kbGVyXG5cdFx0X3NldHRlcnM6IHt9LFxuXG5cdFx0Ly8gQXJndW1lbnRzIChxdWVyeSBwYXJhbWV0ZXJzKSB0aGF0IG1heSBiZSBzZXQgaW4gR0VUIHJlcXVlc3RzIHRvIGVuZHBvaW50c1xuXHRcdC8vIG5lc3RlZCB3aXRoaW4gdGhpcyByZXNvdXJjZSByb3V0ZSB0cmVlLCB1c2VkIHRvIGRldGVybWluZSB0aGUgbWl4aW5zIHRvXG5cdFx0Ly8gYWRkIHRvIHRoZSByZXF1ZXN0IGhhbmRsZXJcblx0XHRfZ2V0QXJnczogcm91dGVEZWZpbml0aW9uLl9nZXRBcmdzLFxuXHR9O1xuXG5cdC8vIFdhbGsgdGhlIHRyZWVcblx0T2JqZWN0LmtleXMoIHJvdXRlRGVmaW5pdGlvbiApLmZvckVhY2goICggcm91dGVEZWZQcm9wICkgPT4ge1xuXHRcdGlmICggcm91dGVEZWZQcm9wICE9PSAnX2dldEFyZ3MnICkge1xuXHRcdFx0ZXh0cmFjdFNldHRlckZyb21Ob2RlKCBoYW5kbGVyLCByb3V0ZURlZmluaXRpb25bIHJvdXRlRGVmUHJvcCBdICk7XG5cdFx0fVxuXHR9ICk7XG5cblx0cmV0dXJuIGhhbmRsZXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuXHRjcmVhdGU6IGNyZWF0ZU5vZGVIYW5kbGVyU3BlYyxcbn07XG4iLCIvKipcbiAqIEBtb2R1bGUgcm91dGUtdHJlZVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IG5hbWVkR3JvdXBSRSA9IHJlcXVpcmUoICcuL3V0aWwvbmFtZWQtZ3JvdXAtcmVnZXhwJyApLm5hbWVkR3JvdXBSRTtcbmNvbnN0IHNwbGl0UGF0aCA9IHJlcXVpcmUoICcuL3V0aWwvc3BsaXQtcGF0aCcgKTtcbmNvbnN0IGVuc3VyZSA9IHJlcXVpcmUoICcuL3V0aWwvZW5zdXJlJyApO1xuY29uc3Qgb2JqZWN0UmVkdWNlID0gcmVxdWlyZSggJy4vdXRpbC9vYmplY3QtcmVkdWNlJyApO1xuXG4vKipcbiAqIE1ldGhvZCB0byB1c2Ugd2hlbiByZWR1Y2luZyByb3V0ZSBjb21wb25lbnRzIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge29iamVjdH0gcm91dGVPYmogICAgIEEgcm91dGUgZGVmaW5pdGlvbiBvYmplY3QgKHNldCB2aWEgLmJpbmQgcGFydGlhbCBhcHBsaWNhdGlvbilcbiAqIEBwYXJhbSB7b2JqZWN0fSB0b3BMZXZlbCAgICAgVGhlIHRvcC1sZXZlbCByb3V0ZSB0cmVlIG9iamVjdCBmb3IgdGhpcyBzZXQgb2Ygcm91dGVzIChzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlhIC5iaW5kIHBhcnRpYWwgYXBwbGljYXRpb24pXG4gKiBAcGFyYW0ge29iamVjdH0gcGFyZW50TGV2ZWwgIFRoZSBtZW1vIG9iamVjdCwgd2hpY2ggaXMgbXV0YXRlZCBhcyB0aGUgcmVkdWNlciBhZGRzXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGEgbmV3IGxldmVsIGhhbmRsZXIgZm9yIGVhY2ggbGV2ZWwgaW4gdGhlIHJvdXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gY29tcG9uZW50ICAgIFRoZSBzdHJpbmcgZGVmaW5pbmcgdGhpcyByb3V0ZSBjb21wb25lbnRcbiAqIEBwYXJhbSB7bnVtYmVyfSBpZHggICAgICAgICAgVGhlIGluZGV4IG9mIHRoaXMgY29tcG9uZW50IHdpdGhpbiB0aGUgY29tcG9uZW50cyBhcnJheVxuICogQHBhcmFtIHtzdHJpbmdbXX0gY29tcG9uZW50cyBUaGUgYXJyYXkgb2YgYWxsIGNvbXBvbmVudHNcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBjaGlsZCBvYmplY3Qgb2YgdGhlIGxldmVsIGJlaW5nIHJlZHVjZWRcbiAqL1xuZnVuY3Rpb24gcmVkdWNlUm91dGVDb21wb25lbnRzKCByb3V0ZU9iaiwgdG9wTGV2ZWwsIHBhcmVudExldmVsLCBjb21wb25lbnQsIGlkeCwgY29tcG9uZW50cyApIHtcblx0Ly8gQ2hlY2sgdG8gc2VlIGlmIHRoaXMgY29tcG9uZW50IGlzIGEgZHluYW1pYyBVUkwgc2VnbWVudCAoaS5lLiBkZWZpbmVkIGJ5XG5cdC8vIGEgbmFtZWQgY2FwdHVyZSBncm91cCByZWd1bGFyIGV4cHJlc3Npb24pLiBuYW1lZEdyb3VwIHdpbGwgYmUgYG51bGxgIGlmXG5cdC8vIHRoZSByZWdleHAgZG9lcyBub3QgbWF0Y2gsIG9yIGVsc2UgYW4gYXJyYXkgZGVmaW5pbmcgdGhlIFJlZ0V4cCBtYXRjaCwgZS5nLlxuXHQvLyBbXG5cdC8vICAgJ1A8aWQ+W1xcXFxkXSspJyxcblx0Ly8gICAnaWQnLCAvLyBOYW1lIG9mIHRoZSBncm91cFxuXHQvLyAgICdbXFxcXGRdKycsIC8vIHJlZ3VsYXIgZXhwcmVzc2lvbiBmb3IgdGhpcyBVUkwgc2VnbWVudCdzIGNvbnRlbnRzXG5cdC8vICAgaW5kZXg6IDE1LFxuXHQvLyAgIGlucHV0OiAnL3dwL3YyL3Bvc3RzLyg/UDxpZD5bXFxcXGRdKyknXG5cdC8vIF1cblx0Y29uc3QgbmFtZWRHcm91cCA9IGNvbXBvbmVudC5tYXRjaCggbmFtZWRHcm91cFJFICk7XG5cdC8vIFB1bGwgb3V0IHJlZmVyZW5jZXMgdG8gdGhlIHJlbGV2YW50IGluZGljZXMgb2YgdGhlIG1hdGNoLCBmb3IgdXRpbGl0eTpcblx0Ly8gYG51bGxgIGNoZWNraW5nIGlzIG5lY2Vzc2FyeSBpbiBjYXNlIHRoZSBjb21wb25lbnQgZGlkIG5vdCBtYXRjaCB0aGUgUkUsXG5cdC8vIGhlbmNlIHRoZSBgbmFtZWRHcm91cCAmJmAuXG5cdGNvbnN0IGdyb3VwTmFtZSA9IG5hbWVkR3JvdXAgJiYgbmFtZWRHcm91cFsgMSBdO1xuXHRjb25zdCBncm91cFBhdHRlcm4gPSBuYW1lZEdyb3VwICYmIG5hbWVkR3JvdXBbIDIgXTtcblxuXHQvLyBXaGVuIGJyYW5jaGluZyBiYXNlZCBvbiBhIGR5bmFtaWMgY2FwdHVyZSBncm91cCB3ZSB1c2VkIHRoZSBncm91cCdzIFJFXG5cdC8vIHBhdHRlcm4gYXMgdGhlIHVuaXF1ZSBpZGVudGlmaWVyOiB0aGlzIGlzIGRvbmUgYmVjYXVzZSB0aGUgc2FtZSBncm91cFxuXHQvLyBjb3VsZCBiZSBhc3NpZ25lZCBkaWZmZXJlbnQgbmFtZXMgaW4gZGlmZmVyZW50IGVuZHBvaW50IGhhbmRsZXJzLCBlLmcuXG5cdC8vIFwiaWRcIiBmb3IgcG9zdHMvOmlkIHZzIFwicGFyZW50X2lkXCIgZm9yIHBvc3RzLzpwYXJlbnRfaWQvcmV2aXNpb25zLlxuXHQvL1xuXHQvLyBUaGVyZSBpcyBhbiBlZGdlIGNhc2Ugd2hlcmUgZ3JvdXBQYXR0ZXJuIHdpbGwgYmUgXCJcIiBpZiB3ZSBhcmUgcmVnaXN0ZXJpbmdcblx0Ly8gYSBjdXN0b20gcm91dGUgdmlhIGAucmVnaXN0ZXJSb3V0ZWAgdGhhdCBkb2VzIG5vdCBpbmNsdWRlIHBhcmFtZXRlclxuXHQvLyB2YWxpZGF0aW9uLiBJbiB0aGlzIGNhc2Ugd2UgYXNzdW1lIHRoZSBncm91cE5hbWUgaXMgc3VmZmljaWVudGx5IHVuaXF1ZSxcblx0Ly8gYW5kIGZhbGwgYmFjayB0byBgfHwgZ3JvdXBOYW1lYCBmb3IgdGhlIGxldmVsS2V5IHN0cmluZy5cblx0Y29uc3QgbGV2ZWxLZXkgPSBuYW1lZEdyb3VwID8gKCBncm91cFBhdHRlcm4gfHwgZ3JvdXBOYW1lICkgOiBjb21wb25lbnQ7XG5cblx0Ly8gTGV2ZWwgbmFtZSBvbiB0aGUgb3RoZXIgaGFuZCB0YWtlcyBpdHMgdmFsdWUgZnJvbSB0aGUgZ3JvdXAncyBuYW1lLCBpZlxuXHQvLyBkZWZpbmVkLCBhbmQgZmFsbHMgYmFjayB0byB0aGUgY29tcG9uZW50IHN0cmluZyB0byBoYW5kbGUgc2l0dWF0aW9ucyB3aGVyZVxuXHQvLyBgY29tcG9uZW50YCBpcyBhIGNvbGxlY3Rpb24gKGUuZy4gXCJyZXZpc2lvbnNcIilcblx0Y29uc3QgbGV2ZWxOYW1lID0gbmFtZWRHcm91cCA/IGdyb3VwTmFtZSA6IGNvbXBvbmVudDtcblxuXHQvLyBDaGVjayB3aGV0aGVyIHdlIGhhdmUgYSBwcmVleGlzdGluZyBub2RlIGF0IHRoaXMgbGV2ZWwgb2YgdGhlIHRyZWUsIGFuZFxuXHQvLyBjcmVhdGUgYSBuZXcgbGV2ZWwgb2JqZWN0IGlmIG5vdC4gVGhlIGNvbXBvbmVudCBzdHJpbmcgaXMgaW5jbHVkZWQgc28gdGhhdFxuXHQvLyB2YWxpZGF0b3JzIGNhbiB0aHJvdyBtZWFuaW5nZnVsIGVycm9ycyBhcyBhcHByb3ByaWF0ZS5cblx0Y29uc3QgY3VycmVudExldmVsID0gcGFyZW50TGV2ZWxbIGxldmVsS2V5IF0gfHwge1xuXHRcdGNvbXBvbmVudDogY29tcG9uZW50LFxuXHRcdG5hbWVkR3JvdXA6IG5hbWVkR3JvdXAgPyB0cnVlIDogZmFsc2UsXG5cdFx0bGV2ZWw6IGlkeCxcblx0XHRuYW1lczogW10sXG5cdH07XG5cblx0Ly8gQSBsZXZlbCdzIFwibmFtZXNcIiBjb3JyZXNwb25kIHRvIHRoZSBsaXN0IG9mIHN0cmluZ3Mgd2hpY2ggY291bGQgZGVzY3JpYmVcblx0Ly8gYW4gZW5kcG9pbnQncyBjb21wb25lbnQgc2V0dGVyIGZ1bmN0aW9uczogXCJpZFwiLCBcInJldmlzaW9uc1wiLCBldGMuXG5cdGlmICggY3VycmVudExldmVsLm5hbWVzLmluZGV4T2YoIGxldmVsTmFtZSApIDwgMCApIHtcblx0XHRjdXJyZW50TGV2ZWwubmFtZXMucHVzaCggbGV2ZWxOYW1lICk7XG5cdH1cblxuXHQvLyBBIGxldmVsJ3MgdmFsaWRhdGUgbWV0aG9kIGlzIGNhbGxlZCB0byBjaGVjayB3aGV0aGVyIGEgdmFsdWUgYmVpbmcgc2V0XG5cdC8vIG9uIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgcHJvcGVyIHR5cGUgZm9yIHRoZSBsb2NhdGlvbiBpbiB3aGljaCBpdFxuXHQvLyBpcyBzcGVjaWZpZWQuIElmIGEgZ3JvdXAgcGF0dGVybiB3YXMgZm91bmQsIHRoZSB2YWxpZGF0b3IgY2hlY2tzIHdoZXRoZXJcblx0Ly8gdGhlIGlucHV0IHN0cmluZyBleGFjdGx5IG1hdGNoZXMgdGhlIGdyb3VwIHBhdHRlcm4uXG5cdGNvbnN0IGdyb3VwUGF0dGVyblJFID0gZ3JvdXBQYXR0ZXJuID09PSAnJyA/XG5cdFx0Ly8gSWYgZ3JvdXBQYXR0ZXJuIGlzIGFuIGVtcHR5IHN0cmluZywgYWNjZXB0IGFueSBpbnB1dCB3aXRob3V0IHZhbGlkYXRpb25cblx0XHQvLiovIDpcblx0XHQvLyBPdGhlcndpc2UsIHZhbGlkYXRlIGFnYWluc3QgdGhlIGdyb3VwIHBhdHRlcm4gb3IgdGhlIGNvbXBvbmVudCBzdHJpbmdcblx0XHRuZXcgUmVnRXhwKCBncm91cFBhdHRlcm4gPyAnXicgKyBncm91cFBhdHRlcm4gKyAnJCcgOiBjb21wb25lbnQsICdpJyApO1xuXG5cdC8vIE9ubHkgb25lIHZhbGlkYXRlIGZ1bmN0aW9uIGlzIG1haW50YWluZWQgZm9yIGVhY2ggbm9kZSwgYmVjYXVzZSBlYWNoIG5vZGVcblx0Ly8gaXMgZGVmaW5lZCBlaXRoZXIgYnkgYSBzdHJpbmcgbGl0ZXJhbCBvciBieSBhIHNwZWNpZmljIHJlZ3VsYXIgZXhwcmVzc2lvbi5cblx0Y3VycmVudExldmVsLnZhbGlkYXRlID0gaW5wdXQgPT4gZ3JvdXBQYXR0ZXJuUkUudGVzdCggaW5wdXQgKTtcblxuXHQvLyBDaGVjayB0byBzZWUgd2hldGhlciB0byBleHBlY3QgbW9yZSBub2RlcyB3aXRoaW4gdGhpcyBicmFuY2ggb2YgdGhlIHRyZWUsXG5cdGlmICggY29tcG9uZW50c1sgaWR4ICsgMSBdICkge1xuXHRcdC8vIGFuZCBjcmVhdGUgYSBcImNoaWxkcmVuXCIgb2JqZWN0IHRvIGhvbGQgdGhvc2Ugbm9kZXMgaWYgbmVjZXNzYXJ5XG5cdFx0Y3VycmVudExldmVsLmNoaWxkcmVuID0gY3VycmVudExldmVsLmNoaWxkcmVuIHx8IHt9O1xuXHR9IGVsc2Uge1xuXHRcdC8vIEF0IGxlYWYgbm9kZXMsIHNwZWNpZnkgdGhlIG1ldGhvZCBjYXBhYmlsaXRpZXMgb2YgdGhpcyBlbmRwb2ludFxuXHRcdGN1cnJlbnRMZXZlbC5tZXRob2RzID0gKCByb3V0ZU9iai5tZXRob2RzIHx8IFtdICkubWFwKCBzdHIgPT4gc3RyLnRvTG93ZXJDYXNlKCkgKTtcblxuXHRcdC8vIEVuc3VyZSBIRUFEIGlzIGluY2x1ZGVkIHdoZW5ldmVyIEdFVCBpcyBzdXBwb3J0ZWQ6IHRoZSBBUEkgYXV0b21hdGljYWxseVxuXHRcdC8vIGFkZHMgc3VwcG9ydCBmb3IgSEVBRCBpZiB5b3UgaGF2ZSBHRVRcblx0XHRpZiAoIGN1cnJlbnRMZXZlbC5tZXRob2RzLmluZGV4T2YoICdnZXQnICkgPiAtMSAmJiBjdXJyZW50TGV2ZWwubWV0aG9kcy5pbmRleE9mKCAnaGVhZCcgKSA9PT0gLTEgKSB7XG5cdFx0XHRjdXJyZW50TGV2ZWwubWV0aG9kcy5wdXNoKCAnaGVhZCcgKTtcblx0XHR9XG5cblx0XHQvLyBBdCBsZWFmIG5vZGVzIGFsc28gZmxhZyAoYXQgdGhlIHRvcCBsZXZlbCkgd2hhdCBhcmd1bWVudHMgYXJlXG5cdFx0Ly8gYXZhaWxhYmxlIHRvIEdFVCByZXF1ZXN0cywgc28gdGhhdCB3ZSBtYXkgYXV0b21hdGljYWxseSBhcHBseSB0aGVcblx0XHQvLyBhcHByb3ByaWF0ZSBwYXJhbWV0ZXIgbWl4aW5zXG5cdFx0aWYgKCByb3V0ZU9iai5lbmRwb2ludHMgKSB7XG5cdFx0XHR0b3BMZXZlbC5fZ2V0QXJncyA9IHRvcExldmVsLl9nZXRBcmdzIHx8IHt9O1xuXHRcdFx0cm91dGVPYmouZW5kcG9pbnRzLmZvckVhY2goICggZW5kcG9pbnQgKSA9PiB7XG5cdFx0XHRcdC8vIGBlbmRwb2ludC5tZXRob2RzYCB3aWxsIGJlIGFuIGFycmF5IG9mIG1ldGhvZHMgbGlrZSBgWyAnR0VUJyBdYDogd2Vcblx0XHRcdFx0Ly8gb25seSBjYXJlIGFib3V0IEdFVCBmb3IgdGhpcyBleGVyY2lzZS4gVmFsaWRhdGluZyBQT1NUIGFuZCBQVVQgYXJnc1xuXHRcdFx0XHQvLyBjb3VsZCBiZSB1c2VmdWwgYnV0IGlzIGN1cnJlbnRseSBkZWVtZWQgdG8gYmUgb3V0LW9mLXNjb3BlLlxuXHRcdFx0XHRlbmRwb2ludC5tZXRob2RzLmZvckVhY2goICggbWV0aG9kICkgPT4ge1xuXHRcdFx0XHRcdGlmICggbWV0aG9kLnRvTG93ZXJDYXNlKCkgPT09ICdnZXQnICkge1xuXHRcdFx0XHRcdFx0T2JqZWN0LmtleXMoIGVuZHBvaW50LmFyZ3MgKS5mb3JFYWNoKCAoIGFyZ0tleSApID0+IHtcblx0XHRcdFx0XHRcdFx0Ly8gUmVmZXJlbmNlIHBhcmFtIGRlZmluaXRpb24gb2JqZWN0cyBpbiB0aGUgdG9wIF9nZXRBcmdzIGRpY3Rpb25hcnlcblx0XHRcdFx0XHRcdFx0dG9wTGV2ZWwuX2dldEFyZ3NbIGFyZ0tleSBdID0gZW5kcG9pbnQuYXJnc1sgYXJnS2V5IF07XG5cdFx0XHRcdFx0XHR9ICk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9ICk7XG5cdFx0XHR9ICk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBjaGlsZCBub2RlIG9iamVjdCBhcyB0aGUgbmV3IFwibGV2ZWxcIlxuXHRwYXJlbnRMZXZlbFsgbGV2ZWxLZXkgXSA9IGN1cnJlbnRMZXZlbDtcblx0cmV0dXJuIGN1cnJlbnRMZXZlbC5jaGlsZHJlbjtcbn1cblxuLyoqXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIG5hbWVzcGFjZXMgVGhlIG1lbW8gb2JqZWN0IHRoYXQgYmVjb21lcyBhIGRpY3Rpb25hcnkgbWFwcGluZyBBUElcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmFtZXNwYWNlcyB0byBhbiBvYmplY3Qgb2YgdGhlIG5hbWVzcGFjZSdzIHJvdXRlc1xuICogQHBhcmFtIHtvYmplY3R9ICAgcm91dGVPYmogICBBIHJvdXRlIGRlZmluaXRpb24gb2JqZWN0XG4gKiBAcGFyYW0ge3N0cmluZ30gICByb3V0ZSAgICAgIFRoZSBzdHJpbmcga2V5IG9mIHRoZSBgcm91dGVPYmpgIHJvdXRlIG9iamVjdFxuICogQHJldHVybnMge29iamVjdH0gVGhlIG5hbWVzcGFjZXMgZGljdGlvbmFyeSBtZW1vIG9iamVjdFxuICovXG5mdW5jdGlvbiByZWR1Y2VSb3V0ZVRyZWUoIG5hbWVzcGFjZXMsIHJvdXRlT2JqLCByb3V0ZSApIHtcblx0Y29uc3QgbnNGb3JSb3V0ZSA9IHJvdXRlT2JqLm5hbWVzcGFjZTtcblxuXHRjb25zdCByb3V0ZVN0cmluZyA9IHJvdXRlXG5cdFx0Ly8gU3RyaXAgdGhlIG5hbWVzcGFjZSBmcm9tIHRoZSByb3V0ZSBzdHJpbmcgKGFsbCByb3V0ZXMgc2hvdWxkIGhhdmUgdGhlXG5cdFx0Ly8gZm9ybWF0IGAvbmFtZXNwYWNlL290aGVyL3N0dWZmYCkgQFRPRE86IFZhbGlkYXRlIHRoaXMgYXNzdW1wdGlvblxuXHRcdC5yZXBsYWNlKCAnLycgKyBuc0ZvclJvdXRlICsgJy8nLCAnJyApXG5cdFx0Ly8gQWxzbyBzdHJpcCBhbnkgdHJhaWxpbmcgXCIvP1wiOiB0aGUgc2xhc2ggaXMgYWxyZWFkeSBvcHRpb25hbCBhbmQgYSBzaW5nbGVcblx0XHQvLyBxdWVzdGlvbiBtYXJrIHdvdWxkIGJyZWFrIHRoZSByZWdleCBwYXJzZXJcblx0XHQucmVwbGFjZSggL1xcL1xcPyQvLCAnJyApO1xuXG5cdC8vIFNwbGl0IHRoZSByb3V0ZXMgdXAgaW50byBoaWVyYXJjaGljYWwgcm91dGUgY29tcG9uZW50c1xuXHRjb25zdCByb3V0ZUNvbXBvbmVudHMgPSBzcGxpdFBhdGgoIHJvdXRlU3RyaW5nICk7XG5cblx0Ly8gRG8gbm90IG1ha2UgYSBuYW1lc3BhY2UgZ3JvdXAgZm9yIHRoZSBBUEkgcm9vdFxuXHQvLyBEbyBub3QgYWRkIHRoZSBuYW1lc3BhY2Ugcm9vdCB0byBpdHMgb3duIGdyb3VwXG5cdC8vIERvIG5vdCB0YWtlIGFueSBhY3Rpb24gaWYgcm91dGVTdHJpbmcgaXMgZW1wdHlcblx0aWYgKCAhIG5zRm9yUm91dGUgfHwgJy8nICsgbnNGb3JSb3V0ZSA9PT0gcm91dGUgfHwgISByb3V0ZVN0cmluZyApIHtcblx0XHRyZXR1cm4gbmFtZXNwYWNlcztcblx0fVxuXG5cdC8vIEVuc3VyZSB0aGF0IHRoZSBuYW1lc3BhY2Ugb2JqZWN0IGZvciB0aGlzIG5hbWVzcGFjZSBleGlzdHNcblx0ZW5zdXJlKCBuYW1lc3BhY2VzLCBuc0ZvclJvdXRlLCB7fSApO1xuXG5cdC8vIEdldCBhIGxvY2FsIHJlZmVyZW5jZSB0byBuYW1lc3BhY2Ugb2JqZWN0XG5cdGNvbnN0IG5zID0gbmFtZXNwYWNlc1sgbnNGb3JSb3V0ZSBdO1xuXG5cdC8vIFRoZSBmaXJzdCBlbGVtZW50IG9mIHRoZSByb3V0ZSB0ZWxscyB1cyB3aGF0IHR5cGUgb2YgcmVzb3VyY2UgdGhpcyByb3V0ZVxuXHQvLyBpcyBmb3IsIGUuZy4gXCJwb3N0c1wiIG9yIFwiY29tbWVudHNcIjogd2UgYnVpbGQgb25lIGhhbmRsZXIgcGVyIHJlc291cmNlXG5cdC8vIHR5cGUsIHNvIHdlIGdyb3VwIGxpa2UgcmVzb3VyY2UgcGF0aHMgdG9nZXRoZXIuXG5cdGNvbnN0IHJlc291cmNlID0gcm91dGVDb21wb25lbnRzWzBdO1xuXG5cdC8vIEBUT0RPOiBUaGlzIGNvZGUgYWJvdmUgY3VycmVudGx5IHByZWNsdWRlcyBiYXNlbGVzcyByb3V0ZXMsIGUuZy5cblx0Ly8gbXlwbHVnaW4vdjIvKD9QPHJlc291cmNlPlxcdyspIC0tIHNob3VsZCB0aG9zZSBiZSBzdXBwb3J0ZWQ/XG5cblx0Ly8gQ3JlYXRlIGFuIGFycmF5IHRvIHJlcHJlc2VudCB0aGlzIHJlc291cmNlLCBhbmQgZW5zdXJlIGl0IGlzIGFzc2lnbmVkXG5cdC8vIHRvIHRoZSBuYW1lc3BhY2Ugb2JqZWN0LiBUaGUgYXJyYXkgd2lsbCBzdHJ1Y3R1cmUgdGhlIFwibGV2ZWxzXCIgKHBhdGhcblx0Ly8gY29tcG9uZW50cyBhbmQgc3VicmVzb3VyY2UgdHlwZXMpIG9mIHRoaXMgcmVzb3VyY2UncyBlbmRwb2ludCBoYW5kbGVyLlxuXHRlbnN1cmUoIG5zLCByZXNvdXJjZSwge30gKTtcblx0Y29uc3QgbGV2ZWxzID0gbnNbIHJlc291cmNlIF07XG5cblx0Ly8gUmVjdXJzZSB0aHJvdWdoIHRoZSByb3V0ZSBjb21wb25lbnRzLCBtdXRhdGluZyBsZXZlbHMgd2l0aCBpbmZvcm1hdGlvbiBhYm91dFxuXHQvLyBlYWNoIGNoaWxkIG5vZGUgZW5jb3VudGVyZWQgd2hpbGUgd2Fsa2luZyB0aHJvdWdoIHRoZSByb3V0ZXMgdHJlZSBhbmQgd2hhdFxuXHQvLyBhcmd1bWVudHMgKHBhcmFtZXRlcnMpIGFyZSBhdmFpbGFibGUgZm9yIEdFVCByZXF1ZXN0cyB0byB0aGlzIGVuZHBvaW50LlxuXHRyb3V0ZUNvbXBvbmVudHMucmVkdWNlKFxuXHRcdHJlZHVjZVJvdXRlQ29tcG9uZW50cy5iaW5kKCBudWxsLCByb3V0ZU9iaiwgbGV2ZWxzICksXG5cdFx0bGV2ZWxzXG5cdCk7XG5cblx0cmV0dXJuIG5hbWVzcGFjZXM7XG59XG5cbi8qKlxuICogQnVpbGQgYSByb3V0ZSB0cmVlIGJ5IHJlZHVjaW5nIG92ZXIgYSByb3V0ZXMgZGVmaW5pdGlvbiBvYmplY3QgZnJvbSB0aGUgQVBJXG4gKiByb290IGVuZHBvaW50IHJlc3BvbnNlIG9iamVjdFxuICpcbiAqIEBtZXRob2QgYnVpbGRcbiAqIEBwYXJhbSB7b2JqZWN0fSByb3V0ZXMgQSBkaWN0aW9uYXJ5IG9mIHJvdXRlcyBrZXllZCBieSByb3V0ZSByZWdleCBzdHJpbmdzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBBIGRpY3Rpb25hcnksIGtleWVkIGJ5IG5hbWVzcGFjZSwgb2YgcmVzb3VyY2UgaGFuZGxlclxuICogZmFjdG9yeSBtZXRob2RzIGZvciBlYWNoIG5hbWVzcGFjZSdzIHJlc291cmNlc1xuICovXG5mdW5jdGlvbiBidWlsZFJvdXRlVHJlZSggcm91dGVzICkge1xuXHRyZXR1cm4gb2JqZWN0UmVkdWNlKCByb3V0ZXMsIHJlZHVjZVJvdXRlVHJlZSwge30gKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG5cdGJ1aWxkOiBidWlsZFJvdXRlVHJlZSxcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0eSBmdW5jdGlvbiBmb3Igc29ydGluZyBhcnJheXMgb2YgbnVtYmVycyBvciBzdHJpbmdzLlxuICpcbiAqIEBtb2R1bGUgdXRpbC9hbHBoYW51bWVyaWMtc29ydFxuICogQHBhcmFtIHtTdHJpbmd8TnVtYmVyfSBhIFRoZSBmaXJzdCBjb21wYXJhdG9yIG9wZXJhbmRcbiAqIEBwYXJhbSB7U3RyaW5nfE51bWJlcn0gYSBUaGUgc2Vjb25kIGNvbXBhcmF0b3Igb3BlcmFuZFxuICogQHJldHVybnMgLTEgaWYgdGhlIHZhbHVlcyBhcmUgYmFja3dhcmRzLCAxIGlmIHRoZXkncmUgb3JkZXJlZCwgYW5kIDAgaWYgdGhleSdyZSB0aGUgc2FtZVxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICggYSwgYiApID0+IHtcblx0aWYgKCBhID4gYiApIHtcblx0XHRyZXR1cm4gMTtcblx0fVxuXHRpZiAoIGEgPCBiICkge1xuXHRcdHJldHVybiAtMTtcblx0fVxuXHRyZXR1cm4gMDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQXVnbWVudCBhbiBvYmplY3QgKHNwZWNpZmljYWxseSBhIHByb3RvdHlwZSkgd2l0aCBhIG1peGluIG1ldGhvZFxuICogKHRoZSBwcm92aWRlZCBvYmplY3QgaXMgbXV0YXRlZCBieSByZWZlcmVuY2UpXG4gKlxuICogQG1vZHVsZSB1dGlsL2FwcGx5LW1peGluXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgKHVzdWFsbHkgYSBwcm90b3R5cGUpIHRvIGF1Z21lbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgVGhlIHByb3BlcnR5IHRvIHdoaWNoIHRoZSBtaXhpbiBtZXRob2Qgc2hvdWxkIGJlIGFzc2lnbmVkXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtaXhpbiBUaGUgbWl4aW4gbWV0aG9kXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIG9iaiwga2V5LCBtaXhpbiApID0+IHtcblx0Ly8gV2lsbCBub3Qgb3ZlcndyaXRlIGV4aXN0aW5nIG1ldGhvZHNcblx0aWYgKCB0eXBlb2YgbWl4aW4gPT09ICdmdW5jdGlvbicgJiYgISBvYmpbIGtleSBdICkge1xuXHRcdG9ialsga2V5IF0gPSBtaXhpbjtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXR1cm4gdHJ1ZSBpZiB0aGUgcHJvdmlkZWQgYXJndW1lbnQgaXMgYSBudW1iZXIsIGEgbnVtZXJpYyBzdHJpbmcsIG9yIGFuXG4gKiBhcnJheSBvZiBudW1iZXJzIG9yIG51bWVyaWMgc3RyaW5nc1xuICpcbiAqIEBtb2R1bGUgdXRpbC9hcmd1bWVudC1pcy1udW1lcmljXG4gKiBAcGFyYW0ge051bWJlcnxTdHJpbmd8TnVtYmVyW118U3RyaW5nW119IHZhbCBUaGUgdmFsdWUgdG8gaW5zcGVjdFxuICogQHBhcmFtIHtTdHJpbmd9IGtleSBUaGUgcHJvcGVydHkgdG8gd2hpY2ggdGhlIG1peGluIG1ldGhvZCBzaG91bGQgYmUgYXNzaWduZWRcbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1peGluIFRoZSBtaXhpbiBtZXRob2RcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5jb25zdCBhcmd1bWVudElzTnVtZXJpYyA9ICggdmFsICkgPT4ge1xuXHRpZiAoIHR5cGVvZiB2YWwgPT09ICdudW1iZXInICkge1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0aWYgKCB0eXBlb2YgdmFsID09PSAnc3RyaW5nJyApIHtcblx0XHRyZXR1cm4gL15cXGQrJC8udGVzdCggdmFsICk7XG5cdH1cblxuXHRpZiAoIEFycmF5LmlzQXJyYXkoIHZhbCApICkge1xuXHRcdGZvciAoIGxldCBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKyApIHtcblx0XHRcdC8vIEZhaWwgZWFybHkgaWYgYW55IGFyZ3VtZW50IGlzbid0IGRldGVybWluZWQgdG8gYmUgbnVtZXJpY1xuXHRcdFx0aWYgKCAhIGFyZ3VtZW50SXNOdW1lcmljKCB2YWxbIGkgXSApICkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9XG5cblx0Ly8gSWYgaXQncyBub3QgYW4gYXJyYXksIGFuZCBub3QgYSBzdHJpbmcsIGFuZCBub3QgYSBudW1iZXIsIHdlIGRvbid0XG5cdC8vIGtub3cgd2hhdCB0byBkbyB3aXRoIGl0XG5cdHJldHVybiBmYWxzZTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXJndW1lbnRJc051bWVyaWM7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVmVyaWZ5IHRoYXQgYSBzcGVjaWZpYyBIVFRQIG1ldGhvZCBpcyBzdXBwb3J0ZWQgYnkgdGhlIHByb3ZpZGVkIFdQUmVxdWVzdFxuICpcbiAqIEBtb2R1bGUgdXRpbC9jaGVjay1tZXRob2Qtc3VwcG9ydFxuICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZCBBbiBIVFRQIG1ldGhvZCB0byBjaGVjayAoJ2dldCcsICdwb3N0JywgZXRjKVxuICogQHBhcmFtIHtXUFJlcXVlc3R9IHJlcXVlc3QgQSBXUFJlcXVlc3Qgb2JqZWN0IHdpdGggYSBfc3VwcG9ydGVkTWV0aG9kcyBhcnJheVxuICogQHJldHVybnMgdHJ1ZSBpZmYgdGhlIG1ldGhvZCBpcyB3aXRoaW4gcmVxdWVzdC5fc3VwcG9ydGVkTWV0aG9kc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9ICggbWV0aG9kLCByZXF1ZXN0ICkgPT4ge1xuXHRpZiAoIHJlcXVlc3QuX3N1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZiggbWV0aG9kLnRvTG93ZXJDYXNlKCkgKSA9PT0gLTEgKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0J1Vuc3VwcG9ydGVkIG1ldGhvZDsgc3VwcG9ydGVkIG1ldGhvZHMgYXJlOiAnICtcblx0XHRcdHJlcXVlc3QuX3N1cHBvcnRlZE1ldGhvZHMuam9pbiggJywgJyApXG5cdFx0KTtcblx0fVxuXG5cdHJldHVybiB0cnVlO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBhIHByb3BlcnR5IGlzIHByZXNlbnQgaW4gYW4gb2JqZWN0LCBpbml0aWFsaXppbmcgaXQgdG8gYSBkZWZhdWx0XG4gKiB2YWx1ZSBpZiBpdCBpcyBub3QgYWxyZWFkeSBkZWZpbmVkLiBNb2RpZmllcyB0aGUgcHJvdmlkZWQgb2JqZWN0IGJ5IHJlZmVyZW5jZS5cbiAqXG4gKiBAbW9kdWxlIHV0aWwvZW5zdXJlXG4gKiBAcGFyYW0ge29iamVjdH0gb2JqICAgICAgICAgICAgICBUaGUgb2JqZWN0IGluIHdoaWNoIHRvIGVuc3VyZSBhIHByb3BlcnR5IGV4aXN0c1xuICogQHBhcmFtIHtzdHJpbmd9IHByb3AgICAgICAgICAgICAgVGhlIHByb3BlcnR5IGtleSB0byBlbnN1cmVcbiAqIEBwYXJhbSB7fSAgICAgICBwcm9wRGVmYXVsdFZhbHVlIFRoZSBkZWZhdWx0IHZhbHVlIGZvciB0aGUgcHJvcGVydHlcbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICggb2JqLCBwcm9wLCBwcm9wRGVmYXVsdFZhbHVlICkgPT4ge1xuXHRpZiAoIG9iaiAmJiBvYmpbIHByb3AgXSA9PT0gdW5kZWZpbmVkICkge1xuXHRcdG9ialsgcHJvcCBdID0gcHJvcERlZmF1bHRWYWx1ZTtcblx0fVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBEZXRlcm1pbmUgd2hldGhlciBhbiBwcm92aWRlZCB2YWx1ZSBpcyBhbiBlbXB0eSBvYmplY3RcbiAqXG4gKiBAbW9kdWxlIHV0aWwvaXMtZW1wdHktb2JqZWN0XG4gKiBAcGFyYW0ge30gdmFsdWUgQSB2YWx1ZSB0byB0ZXN0IGZvciBlbXB0eS1vYmplY3QtbmVzc1xuICogQHJldHVybnMge2Jvb2xlYW59IFdoZXRoZXIgdGhlIHByb3ZpZGVkIHZhbHVlIGlzIGFuIGVtcHR5IG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9ICggdmFsdWUgKSA9PiB7XG5cdC8vIElmIHRoZSB2YWx1ZSBpcyBub3Qgb2JqZWN0LWxpa2UsIHRoZW4gaXQgaXMgY2VydGFpbmx5IG5vdCBhbiBlbXB0eSBvYmplY3Rcblx0aWYgKCB0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnICkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXG5cdC8vIEZvciBvdXIgcHVycG9zZXMgYW4gZW1wdHkgYXJyYXkgc2hvdWxkIG5vdCBiZSB0cmVhdGVkIGFzIGFuIGVtcHR5IG9iamVjdFxuXHQvLyAoU2luY2UgdGhpcyBpcyB1c2VkIHRvIHByb2Nlc3MgaW52YWxpZCBjb250ZW50LXR5cGUgcmVzcG9uc2VzLCApXG5cdGlmICggQXJyYXkuaXNBcnJheSggdmFsdWUgKSApIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRmb3IgKCBjb25zdCBrZXkgaW4gdmFsdWUgKSB7XG5cdFx0aWYgKCB2YWx1ZS5oYXNPd25Qcm9wZXJ0eSgga2V5ICkgKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRydWU7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENvbnZlcnQgYSAoa2V5LCB2YWx1ZSkgcGFpciB0byBhIHsga2V5OiB2YWx1ZSB9IG9iamVjdFxuICpcbiAqIEBtb2R1bGUgdXRpbC9rZXktdmFsLXRvLW9ialxuICogQHBhcmFtIHtzdHJpbmd9IGtleSAgIFRoZSBrZXkgdG8gdXNlIGluIHRoZSByZXR1cm5lZCBvYmplY3RcbiAqIEBwYXJhbSB7fSAgICAgICB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduIHRvIHRoZSBwcm92aWRlZCBrZXlcbiAqIEByZXR1cm5zIHtvYmplY3R9IEEgZGljdGlvbmFyeSBvYmplY3QgY29udGFpbmluZyB0aGUga2V5LXZhbHVlIHBhaXJcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIGtleSwgdmFsdWUgKSA9PiB7XG5cdGNvbnN0IG9iaiA9IHt9O1xuXHRvYmpbIGtleSBdID0gdmFsdWU7XG5cdHJldHVybiBvYmo7XG59O1xuIiwiLyoqXG4gKiBAbW9kdWxlIHV0aWwvbmFtZWQtZ3JvdXAtcmVnZXhwXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgcGF0dGVybiA9IFtcblx0Ly8gQ2FwdHVyZSBncm91cCBzdGFydFxuXHQnXFxcXChcXFxcPycsXG5cdC8vIENhcHR1cmUgZ3JvdXAgbmFtZSBiZWdpbnMgZWl0aGVyIGBQPGAsIGA8YCBvciBgJ2Bcblx0Jyg/OlA8fDx8XFwnKScsXG5cdC8vIEV2ZXJ5dGhpbmcgdXAgdG8gdGhlIG5leHQgYD5gYCBvciBgJ2AgKGRlcGVuZGluZykgd2lsbCBiZSB0aGUgY2FwdHVyZSBncm91cCBuYW1lXG5cdCcoW14+XFwnXSspJyxcblx0Ly8gQ2FwdHVyZSBncm91cCBlbmRcblx0J1s+XFwnXScsXG5cdC8vIEdldCBldmVyeXRoaW5nIHVwIHRvIHRoZSBlbmQgb2YgdGhlIGNhcHR1cmUgZ3JvdXA6IHRoaXMgaXMgdGhlIFJlZ0V4cCB1c2VkXG5cdC8vIHdoZW4gbWF0Y2hpbmcgVVJMcyB0byB0aGlzIHJvdXRlLCB3aGljaCB3ZSBjYW4gdXNlIGZvciB2YWxpZGF0aW9uIHB1cnBvc2VzLlxuXHQnKFteXFxcXCldKiknLFxuXHQvLyBDYXB0dXJlIGdyb3VwIGVuZFxuXHQnXFxcXCknLFxuXS5qb2luKCAnJyApO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcblx0LyoqXG5cdCAqIFN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgZXhwb3J0ZWQgUmVndWxhciBFeHByZXNzaW9uOyB3ZSBjb25zdHJ1Y3QgdGhpc1xuXHQgKiBSZWdFeHAgZnJvbSBhIHN0cmluZyB0byBlbmFibGUgbW9yZSBkZXRhaWxlZCBhbm5vdGF0aW9uIGFuZCBwZXJtdXRhdGlvblxuXHQgKlxuXHQgKiBAcHJvcCB7U3RyaW5nfSBwYXR0ZXJuXG5cdCAqL1xuXHRwYXR0ZXJuOiBwYXR0ZXJuLFxuXG5cdC8qKlxuXHQgKiBSZWd1bGFyIEV4cHJlc3Npb24gdG8gaWRlbnRpZnkgYSBjYXB0dXJlIGdyb3VwIGluIFBDUkUgZm9ybWF0c1xuXHQgKiBgKD88bmFtZT5yZWdleClgLCBgKD8nbmFtZSdyZWdleClgIG9yIGAoP1A8bmFtZT5yZWdleClgIChzZWVcblx0ICogcmVndWxhci1leHByZXNzaW9ucy5pbmZvL3JlZmV4dC5odG1sKVxuXHQgKlxuXHQgKiBAcHJvcCB7UmVnRXhwfSBuYW1lZEdyb3VwUkVcblx0ICovXG5cdG5hbWVkR3JvdXBSRTogbmV3IFJlZ0V4cCggcGF0dGVybiApLFxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVdGlsaXR5IG1ldGhvZCB0byBwZXJtaXQgQXJyYXkjcmVkdWNlLWxpa2Ugb3BlcmF0aW9ucyBvdmVyIG9iamVjdHNcbiAqXG4gKiBUaGlzIGlzIGxpa2VseSB0byBiZSBzbGlnaHRseSBtb3JlIGluZWZmaWNpZW50IHRoYW4gdXNpbmcgbG9kYXNoLnJlZHVjZSxcbiAqIGJ1dCByZXN1bHRzIGluIH41MGtiIGxlc3Mgc2l6ZSBpbiB0aGUgcmVzdWx0aW5nIGJ1bmRsZWQgY29kZSBiZWZvcmVcbiAqIG1pbmlmaWNhdGlvbiBhbmQgfjEya2Igb2Ygc2F2aW5ncyB3aXRoIG1pbmlmaWNhdGlvbi5cbiAqXG4gKiBVbmxpa2UgbG9kYXNoLnJlZHVjZSgpLCB0aGUgaXRlcmF0b3IgYW5kIGluaXRpYWwgdmFsdWUgcHJvcGVydGllcyBhcmUgTk9UXG4gKiBvcHRpb25hbDogdGhpcyBpcyBkb25lIHRvIHNpbXBsaWZ5IHRoZSBjb2RlLCB0aGlzIG1vZHVsZSBpcyBub3QgaW50ZW5kZWQgdG9cbiAqIGJlIGEgZnVsbCByZXBsYWNlbWVudCBmb3IgbG9kYXNoLnJlZHVjZSBhbmQgaW5zdGVhZCBwcmlvcml0aXplcyBzaW1wbGljaXR5XG4gKiBmb3IgYSBzcGVjaWZpYyBjb21tb24gY2FzZS5cbiAqXG4gKiBAbW9kdWxlIHV0aWwvb2JqZWN0LXJlZHVjZVxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogQW4gb2JqZWN0IG9mIGtleS12YWx1ZSBwYWlyc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0b3IgQSBmdW5jdGlvbiB0byB1c2UgdG8gcmVkdWNlIHRoZSBvYmplY3RcbiAqIEBwYXJhbSB7Kn0gaW5pdGlhbFN0YXRlIFRoZSBpbml0aWFsIHZhbHVlIHRvIHBhc3MgdG8gdGhlIHJlZHVjZXIgZnVuY3Rpb25cbiAqIEByZXR1cm5zIFRoZSByZXN1bHQgb2YgdGhlIHJlZHVjdGlvbiBvcGVyYXRpb25cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIG9iaiwgaXRlcmF0b3IsIGluaXRpYWxTdGF0ZSApID0+IE9iamVjdFxuXHQua2V5cyggb2JqIClcblx0LnJlZHVjZShcblx0XHQoIG1lbW8sIGtleSApID0+IGl0ZXJhdG9yKCBtZW1vLCBvYmpbIGtleSBdLCBrZXkgKSxcblx0XHRpbml0aWFsU3RhdGVcblx0KTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBIZWxwZXIgdG8gY3JlYXRlIGEgc2ltcGxlIHBhcmFtZXRlciBzZXR0ZXIgY29udmVuaWVuY2UgbWV0aG9kXG4gKlxuICogQG1vZHVsZSB1dGlsL3BhcmFtZXRlci1zZXR0ZXJcbiAqIEBwYXJhbSB7U3RyaW5nfSBwYXJhbSBUaGUgc3RyaW5nIGtleSBvZiB0aGUgcGFyYW1ldGVyIHRoaXMgbWV0aG9kIHdpbGwgc2V0XG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc2V0dGVyIG1ldGhvZCB0aGF0IGNhbiBiZSBhc3NpZ25lZCB0byBhIHJlcXVlc3QgaW5zdGFuY2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSAoIHBhcmFtICkgPT4ge1xuXHQvKipcblx0ICogQSBzZXR0ZXIgZm9yIGEgc3BlY2lmaWMgcGFyYW1ldGVyXG5cdCAqXG5cdCAqIEBjaGFpbmFibGVcblx0ICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHNldCBmb3IgdGhlIHRoZSBwYXJhbWV0ZXJcblx0ICogQHJldHVybnMgVGhlIHJlcXVlc3QgaW5zdGFuY2Ugb24gd2hpY2ggdGhpcyBtZXRob2Qgd2FzIGNhbGxlZCAoZm9yIGNoYWluaW5nKVxuXHQgKi9cblx0cmV0dXJuIGZ1bmN0aW9uKCB2YWwgKSB7XG5cdFx0cmV0dXJuIHRoaXMucGFyYW0oIHBhcmFtLCB2YWwgKTtcblx0fTtcbn07XG4iLCIvKipcbiAqIEBtb2R1bGUgdXRpbC9zcGxpdC1wYXRoXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuY29uc3QgbmFtZWRHcm91cFBhdHRlcm4gPSByZXF1aXJlKCAnLi9uYW1lZC1ncm91cC1yZWdleHAnICkucGF0dGVybjtcblxuLy8gQ29udmVydCBjYXB0dXJlIGdyb3VwcyB0byBub24tbWF0Y2hpbmcgZ3JvdXBzLCBiZWNhdXNlIGFsbCBjYXB0dXJlIGdyb3Vwc1xuLy8gYXJlIGluY2x1ZGVkIGluIHRoZSByZXN1bHRpbmcgYXJyYXkgd2hlbiBhbiBSRSBpcyBwYXNzZWQgdG8gYC5zcGxpdCgpYFxuLy8gKFdlIHJlLXVzZSB0aGUgZXhpc3RpbmcgbmFtZWQgZ3JvdXAncyBjYXB0dXJlIHBhdHRlcm4gaW5zdGVhZCBvZiBjcmVhdGluZ1xuLy8gYSBuZXcgUmVnRXhwIGp1c3QgZm9yIHRoaXMgcHVycG9zZSlcbmNvbnN0IHBhdHRlcm5XaXRob3V0U3ViZ3JvdXBzID0gbmFtZWRHcm91cFBhdHRlcm5cblx0LnJlcGxhY2UoIC8oW15cXFxcXSlcXCgoW14/XSkvZywgJyQxKD86JDInICk7XG5cbi8vIE1ha2UgYSBuZXcgUmVnRXhwIHVzaW5nIHRoZSBzYW1lIHBhdHRlcm4gYXMgb25lIHNpbmdsZSB1bmlmaWVkIGNhcHR1cmUgZ3JvdXAsXG4vLyBzbyB0aGUgbWF0Y2ggYXMgYSB3aG9sZSB3aWxsIGJlIHByZXNlcnZlZCBhZnRlciBgLnNwbGl0KClgLiBQZXJtaXQgbm9uLXNsYXNoXG4vLyBjaGFyYWN0ZXJzIGJlZm9yZSBvciBhZnRlciB0aGUgbmFtZWQgY2FwdHVyZSBncm91cCwgYWx0aG91Z2ggdGhvc2UgY29tcG9uZW50c1xuLy8gd2lsbCBub3QgeWllbGQgZnVuY3Rpb25pbmcgc2V0dGVycy5cbmNvbnN0IG5hbWVkR3JvdXBSRSA9IG5ldyBSZWdFeHAoICcoW14vXSonICsgcGF0dGVybldpdGhvdXRTdWJncm91cHMgKyAnW14vXSopJyApO1xuXG4vKipcbiAqIERpdmlkZSBhIHJvdXRlIHN0cmluZyB1cCBpbnRvIGhpZXJhcmNoaWNhbCBjb21wb25lbnRzIGJ5IGJyZWFraW5nIGl0IGFwYXJ0XG4gKiBvbiBmb3J3YXJkIHNsYXNoIGNoYXJhY3RlcnMuXG4gKlxuICogVGhlcmUgYXJlIHBsdWdpbnMgKGluY2x1ZGluZyBKZXRwYWNrKSB0aGF0IHJlZ2lzdGVyIHJvdXRlcyB3aXRoIHJlZ2V4IGNhcHR1cmVcbiAqIGdyb3VwcyB3aGljaCBhbHNvIGNvbnRhaW4gZm9yd2FyZCBzbGFzaGVzLCBzbyB0aG9zZSBncm91cHMgaGF2ZSB0byBiZSBwdWxsZWRcbiAqIG91dCBmaXJzdCBiZWZvcmUgdGhlIHJlbWFpbmRlciBvZiB0aGUgc3RyaW5nIGNhbiBiZSAuc3BsaXQoKSBhcyBub3JtYWwuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhTdHIgQSByb3V0ZSBwYXRoIHN0cmluZyB0byBicmVhayBpbnRvIGNvbXBvbmVudHNcbiAqIEByZXR1cm5zIHtTdHJpbmdbXX0gQW4gYXJyYXkgb2Ygcm91dGUgY29tcG9uZW50IHN0cmluZ3NcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBwYXRoU3RyID0+IHBhdGhTdHJcblx0Ly8gRGl2aWRlIGEgc3RyaW5nIGxpa2UgXCIvc29tZS9wYXRoLyg/UDx3aXRoX25hbWVkX2dyb3Vwcz4pL2V0Y1wiIGludG8gYW5cblx0Ly8gYXJyYXkgYFsgXCIvc29tZS9wYXRoL1wiLCBcIig/UDx3aXRoX25hbWVkX2dyb3Vwcz4pXCIsIFwiL2V0Y1wiIF1gLlxuXHQuc3BsaXQoIG5hbWVkR3JvdXBSRSApXG5cdC8vIFRoZW4sIHJlZHVjZSB0aHJvdWdoIHRoZSBhcnJheSBvZiBwYXJ0cywgc3BsaXR0aW5nIGFueSBub24tY2FwdHVyZS1ncm91cFxuXHQvLyBwYXJ0cyBvbiBmb3J3YXJkIHNsYXNoZXMgYW5kIGRpc2NhcmRpbmcgZW1wdHkgc3RyaW5ncyB0byBjcmVhdGUgdGhlIGZpbmFsXG5cdC8vIGFycmF5IG9mIHBhdGggY29tcG9uZW50cy5cblx0LnJlZHVjZSggKCBjb21wb25lbnRzLCBwYXJ0ICkgPT4ge1xuXHRcdGlmICggISBwYXJ0ICkge1xuXHRcdFx0Ly8gSWdub3JlIGVtcHR5IHN0cmluZ3MgcGFydHNcblx0XHRcdHJldHVybiBjb21wb25lbnRzO1xuXHRcdH1cblxuXHRcdGlmICggbmFtZWRHcm91cFJFLnRlc3QoIHBhcnQgKSApIHtcblx0XHRcdC8vIEluY2x1ZGUgbmFtZWQgY2FwdHVyZSBncm91cHMgYXMtaXNcblx0XHRcdHJldHVybiBjb21wb25lbnRzLmNvbmNhdCggcGFydCApO1xuXHRcdH1cblxuXHRcdC8vIFNwbGl0IHRoZSBwYXJ0IG9uIC8gYW5kIGZpbHRlciBvdXQgZW1wdHkgc3RyaW5nc1xuXHRcdHJldHVybiBjb21wb25lbnRzLmNvbmNhdCggcGFydC5zcGxpdCggJy8nICkuZmlsdGVyKCBCb29sZWFuICkgKTtcblx0fSwgW10gKTtcbiIsIi8qKlxuICogUmV0dXJuIGFuIGFycmF5IHdpdGggYWxsIGR1cGxpY2F0ZSBpdGVtcyByZW1vdmVkLlxuICpcbiAqIFRoaXMgZnVuY3Rpb25hbGl0eSB3YXMgcHJldmlvdXNseSBwcm92aWRlZCBieSBsb2Rhc2gudW5pcSwgYnV0IHRoaXNcbiAqIG1vZGVybiBKUyBzb2x1dGlvbiB5aWVsZHMgYSBzbWFsbGVyIGJ1bmRsZSBzaXplLlxuICpcbiAqIEBwYXJhbSB7QXJyYXl9IGFyciBBbiBhcnJheSB0byBkZS1kdXBsaWNhdGVcbiAqIEByZXR1cm5zIHtBcnJheX0gQSBkZS1kdXBsaWNhdGVkIGFycmF5XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gYXJyID0+IEFycmF5LmZyb20oIG5ldyBTZXQoIGFyciApICk7XG4iLCIndXNlIHN0cmljdCc7XG5cbmNvbnN0IGJ1aWxkUm91dGVUcmVlID0gcmVxdWlyZSggJy4vcm91dGUtdHJlZScgKS5idWlsZDtcbmNvbnN0IGdlbmVyYXRlRW5kcG9pbnRGYWN0b3JpZXMgPSByZXF1aXJlKCAnLi9lbmRwb2ludC1mYWN0b3JpZXMnICkuZ2VuZXJhdGU7XG5jb25zdCBwYXJhbVNldHRlciA9IHJlcXVpcmUoICcuL3V0aWwvcGFyYW1ldGVyLXNldHRlcicgKTtcbmNvbnN0IGFwcGx5TWl4aW4gPSByZXF1aXJlKCAnLi91dGlsL2FwcGx5LW1peGluJyApO1xuY29uc3QgbWl4aW5zID0gcmVxdWlyZSggJy4vbWl4aW5zJyApO1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgcmV0dXJuIGEgaGFuZGxlciBmb3IgYW4gYXJiaXRyYXJ5IFdQIFJFU1QgQVBJIGVuZHBvaW50LlxuICpcbiAqIFRoZSBmaXJzdCB0d28gcGFyYW1ldGVycyBtaXJyb3IgYHJlZ2lzdGVyX3Jlc3Rfcm91dGVgIGluIHRoZSBSRVNUIEFQSVxuICogY29kZWJhc2U6XG4gKlxuICogQG1lbWJlcm9mISBXUEFQSSNcbiAqIEBwYXJhbSB7c3RyaW5nfSAgIG5hbWVzcGFjZSAgICAgICAgIEEgbmFtZXNwYWNlIHN0cmluZywgZS5nLiAnbXlwbHVnaW4vdjEnXG4gKiBAcGFyYW0ge3N0cmluZ30gICByZXN0QmFzZSAgICAgICAgICBBIFJFU1Qgcm91dGUgc3RyaW5nLCBlLmcuICcvYXV0aG9yLyg/UDxpZD5cXGQrKSdcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIFtvcHRpb25zXSAgICAgICAgIEFuIChvcHRpb25hbCkgb3B0aW9ucyBvYmplY3RcbiAqIEBwYXJhbSB7b2JqZWN0fSAgIFtvcHRpb25zLm1peGluc10gIEEgaGFzaCBvZiBmdW5jdGlvbnMgdG8gYXBwbHkgYXMgbWl4aW5zXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBbb3B0aW9ucy5tZXRob2RzXSBBbiBhcnJheSBvZiBtZXRob2RzIHRvIHdoaXRlbGlzdCAob24gdGhlIGxlYWYgbm9kZSBvbmx5KVxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBbiBlbmRwb2ludCBoYW5kbGVyIGZhY3RvcnkgZnVuY3Rpb24gZm9yIHRoZSBzcGVjaWZpZWQgcm91dGVcbiAqL1xuZnVuY3Rpb24gcmVnaXN0ZXJSb3V0ZSggbmFtZXNwYWNlLCByZXN0QmFzZSwgb3B0aW9ucyA9IHt9ICkge1xuXHQvLyBTdXBwb3J0IGFsbCBtZXRob2RzIHVudGlsIHJlcXVlc3RlZCB0byBkbyBvdGhlcndpc2Vcblx0bGV0IHN1cHBvcnRlZE1ldGhvZHMgPSBbICdoZWFkJywgJ2dldCcsICdwYXRjaCcsICdwdXQnLCAncG9zdCcsICdkZWxldGUnIF07XG5cblx0aWYgKCBBcnJheS5pc0FycmF5KCBvcHRpb25zLm1ldGhvZHMgKSApIHtcblx0XHQvLyBQZXJtaXQgc3VwcG9ydGVkIG1ldGhvZHMgdG8gYmUgc3BlY2lmaWVkIGFzIGFuIGFycmF5XG5cdFx0c3VwcG9ydGVkTWV0aG9kcyA9IG9wdGlvbnMubWV0aG9kcy5tYXAoIG1ldGhvZCA9PiBtZXRob2QudHJpbSgpLnRvTG93ZXJDYXNlKCkgKTtcblx0fSBlbHNlIGlmICggdHlwZW9mIG9wdGlvbnMubWV0aG9kcyA9PT0gJ3N0cmluZycgKSB7XG5cdFx0Ly8gUGVybWl0IGEgc3VwcG9ydGVkIG1ldGhvZCB0byBiZSBzcGVjaWZpZWQgYXMgYSBzdHJpbmdcblx0XHRzdXBwb3J0ZWRNZXRob2RzID0gWyBvcHRpb25zLm1ldGhvZHMudHJpbSgpLnRvTG93ZXJDYXNlKCkgXTtcblx0fVxuXG5cdC8vIEVuc3VyZSB0aGF0IGlmIEdFVCBpcyBzdXBwb3J0ZWQsIHRoZW4gSEVBRCBpcyBhcyB3ZWxsLCBhbmQgdmljZS12ZXJzYVxuXHRpZiAoIHN1cHBvcnRlZE1ldGhvZHMuaW5kZXhPZiggJ2dldCcgKSAhPT0gLTEgJiYgc3VwcG9ydGVkTWV0aG9kcy5pbmRleE9mKCAnaGVhZCcgKSA9PT0gLTEgKSB7XG5cdFx0c3VwcG9ydGVkTWV0aG9kcy5wdXNoKCAnaGVhZCcgKTtcblx0fSBlbHNlIGlmICggc3VwcG9ydGVkTWV0aG9kcy5pbmRleE9mKCAnaGVhZCcgKSAhPT0gLTEgJiYgc3VwcG9ydGVkTWV0aG9kcy5pbmRleE9mKCAnZ2V0JyApID09PSAtMSApIHtcblx0XHRzdXBwb3J0ZWRNZXRob2RzLnB1c2goICdnZXQnICk7XG5cdH1cblxuXHRjb25zdCBmdWxsUm91dGUgPSBuYW1lc3BhY2Vcblx0XHQvLyBSb3V0ZSBzaG91bGQgYWx3YXlzIGhhdmUgcHJlY2VkaW5nIHNsYXNoXG5cdFx0LnJlcGxhY2UoIC9eW1xccy9dKi8sICcvJyApXG5cdFx0Ly8gUm91dGUgc2hvdWxkIGFsd2F5cyBiZSBqb2luZWQgdG8gbmFtZXNwYWNlIHdpdGggYSBzaW5nbGUgc2xhc2hcblx0XHQucmVwbGFjZSggL1tcXHMvXSokLywgJy8nICkgKyByZXN0QmFzZS5yZXBsYWNlKCAvXltcXHMvXSovLCAnJyApO1xuXG5cdGNvbnN0IHJvdXRlT2JqID0ge307XG5cdHJvdXRlT2JqWyBmdWxsUm91dGUgXSA9IHtcblx0XHRuYW1lc3BhY2U6IG5hbWVzcGFjZSxcblx0XHRtZXRob2RzOiBzdXBwb3J0ZWRNZXRob2RzLFxuXHR9O1xuXG5cdC8vIEdvIHRocm91Z2ggdGhlIHNhbWUgc3RlcHMgdXNlZCB0byBib290c3RyYXAgdGhlIGNsaWVudCB0byBwYXJzZSB0aGVcblx0Ly8gcHJvdmlkZWQgcm91dGUgb3V0IGludG8gYSBoYW5kbGVyIHJlcXVlc3QgbWV0aG9kXG5cdGNvbnN0IHJvdXRlVHJlZSA9IGJ1aWxkUm91dGVUcmVlKCByb3V0ZU9iaiApO1xuXHQvLyBQYXJzZSB0aGUgbW9jayByb3V0ZSBvYmplY3QgaW50byBlbmRwb2ludCBmYWN0b3JpZXNcblx0Y29uc3QgZW5kcG9pbnRGYWN0b3JpZXMgPSBnZW5lcmF0ZUVuZHBvaW50RmFjdG9yaWVzKCByb3V0ZVRyZWUgKVsgbmFtZXNwYWNlIF07XG5cdGNvbnN0IEVuZHBvaW50UmVxdWVzdCA9IGVuZHBvaW50RmFjdG9yaWVzWyBPYmplY3Qua2V5cyggZW5kcG9pbnRGYWN0b3JpZXMgKVsgMCBdIF0uQ3RvcjtcblxuXHRpZiAoIG9wdGlvbnMgJiYgb3B0aW9ucy5wYXJhbXMgKSB7XG5cdFx0b3B0aW9ucy5wYXJhbXMuZm9yRWFjaCggKCBwYXJhbSApID0+IHtcblx0XHRcdC8vIE9ubHkgYWNjZXB0IHN0cmluZyBwYXJhbWV0ZXJzXG5cdFx0XHRpZiAoIHR5cGVvZiBwYXJhbSAhPT0gJ3N0cmluZycgKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgdGhlIHBhcmFtZXRlciBjYW4gYmUgbWFwcGVkIHRvIGEgbWl4aW4sIGFwcGx5IHRoYXQgbWl4aW5cblx0XHRcdGlmICggdHlwZW9mIG1peGluc1sgcGFyYW0gXSA9PT0gJ29iamVjdCcgKSB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKCBtaXhpbnNbIHBhcmFtIF0gKS5mb3JFYWNoKCAoIGtleSApID0+IHtcblx0XHRcdFx0XHRhcHBseU1peGluKCBFbmRwb2ludFJlcXVlc3QucHJvdG90eXBlLCBrZXksIG1peGluc1sgcGFyYW0gXVsga2V5IF0gKTtcblx0XHRcdFx0fSApO1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdC8vIEF0dGVtcHQgdG8gY3JlYXRlIGEgc2ltcGxlIHNldHRlciBmb3IgYW55IHBhcmFtZXRlcnMgZm9yIHdoaWNoXG5cdFx0XHQvLyB3ZSBkbyBub3QgYWxyZWFkeSBoYXZlIGEgY3VzdG9tIG1peGluXG5cdFx0XHRhcHBseU1peGluKCBFbmRwb2ludFJlcXVlc3QucHJvdG90eXBlLCBwYXJhbSwgcGFyYW1TZXR0ZXIoIHBhcmFtICkgKTtcblx0XHR9ICk7XG5cdH1cblxuXHQvLyBTZXQgYW55IGV4cGxpY2l0bHktcHJvdmlkZWQgb2JqZWN0IG1peGluc1xuXHRpZiAoIG9wdGlvbnMgJiYgdHlwZW9mIG9wdGlvbnMubWl4aW5zID09PSAnb2JqZWN0JyApIHtcblxuXHRcdC8vIFNldCBhbnkgc3BlY2lmaWVkIG1peGluIGZ1bmN0aW9ucyBvbiB0aGUgcmVzcG9uc2Vcblx0XHRPYmplY3Qua2V5cyggb3B0aW9ucy5taXhpbnMgKS5mb3JFYWNoKCAoIGtleSApID0+IHtcblx0XHRcdGFwcGx5TWl4aW4oIEVuZHBvaW50UmVxdWVzdC5wcm90b3R5cGUsIGtleSwgb3B0aW9ucy5taXhpbnNbIGtleSBdICk7XG5cdFx0fSApO1xuXHR9XG5cblx0ZnVuY3Rpb24gZW5kcG9pbnRGYWN0b3J5KCBvcHRpb25zID0ge30gKSB7XG5cdFx0cmV0dXJuIG5ldyBFbmRwb2ludFJlcXVlc3QoIHtcblx0XHRcdC4uLm9wdGlvbnMsXG5cdFx0XHQuLi4oIHRoaXMgPyB0aGlzLl9vcHRpb25zIDoge30gKSxcblx0XHR9ICk7XG5cdH1cblx0ZW5kcG9pbnRGYWN0b3J5LkN0b3IgPSBFbmRwb2ludFJlcXVlc3Q7XG5cblx0cmV0dXJuIGVuZHBvaW50RmFjdG9yeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWdpc3RlclJvdXRlO1xuIiwiLyoqXG4gKiBBIFdQIFJFU1QgQVBJIGNsaWVudCBmb3IgTm9kZS5qc1xuICpcbiAqIEBleGFtcGxlXG4gKiAgICAgdmFyIHdwID0gbmV3IFdQQVBJKHsgZW5kcG9pbnQ6ICdodHRwOi8vc3JjLndvcmRwcmVzcy1kZXZlbG9wLmRldi93cC1qc29uJyB9KTtcbiAqICAgICB3cC5wb3N0cygpLnRoZW4oZnVuY3Rpb24oIHBvc3RzICkge1xuICogICAgICAgICBjb25zb2xlLmxvZyggcG9zdHMgKTtcbiAqICAgICB9KS5jYXRjaChmdW5jdGlvbiggZXJyICkge1xuICogICAgICAgICBjb25zb2xlLmVycm9yKCBlcnIgKTtcbiAqICAgICB9KTtcbiAqXG4gKiBAbGljZW5zZSBNSVRcbiB9KVxuICovXG4ndXNlIHN0cmljdCc7XG5cbmNvbnN0IG9iamVjdFJlZHVjZSA9IHJlcXVpcmUoICcuL2xpYi91dGlsL29iamVjdC1yZWR1Y2UnICk7XG5cbi8vIFRoaXMgSlNPTiBmaWxlIHByb3ZpZGVzIGVub3VnaCBkYXRhIHRvIGNyZWF0ZSBoYW5kbGVyIG1ldGhvZHMgZm9yIGFsbCB2YWxpZFxuLy8gQVBJIHJvdXRlcyBpbiBXb3JkUHJlc3MgNC43XG5jb25zdCBkZWZhdWx0Um91dGVzID0gcmVxdWlyZSggJy4vbGliL2RhdGEvZGVmYXVsdC1yb3V0ZXMuanNvbicgKTtcbmNvbnN0IGJ1aWxkUm91dGVUcmVlID0gcmVxdWlyZSggJy4vbGliL3JvdXRlLXRyZWUnICkuYnVpbGQ7XG5jb25zdCBnZW5lcmF0ZUVuZHBvaW50RmFjdG9yaWVzID0gcmVxdWlyZSggJy4vbGliL2VuZHBvaW50LWZhY3RvcmllcycgKS5nZW5lcmF0ZTtcblxuLy8gVGhlIGRlZmF1bHQgZW5kcG9pbnQgZmFjdG9yaWVzIHdpbGwgYmUgbGF6eS1sb2FkZWQgYnkgcGFyc2luZyB0aGUgZGVmYXVsdFxuLy8gcm91dGUgdHJlZSBkYXRhIGlmIGEgZGVmYXVsdC1tb2RlIFdQQVBJIGluc3RhbmNlIGlzIGNyZWF0ZWQgKGkuZS4gb25lIHRoYXRcbi8vIGlzIHRvIGJlIGJvb3RzdHJhcHBlZCB3aXRoIHRoZSBoYW5kbGVycyBmb3IgYWxsIG9mIHRoZSBidWlsdC1pbiByb3V0ZXMpXG5sZXQgZGVmYXVsdEVuZHBvaW50RmFjdG9yaWVzO1xuXG4vLyBDb25zdGFudCB1c2VkIHRvIGRldGVjdCBmaXJzdC1wYXJ0eSBXb3JkUHJlc3MgUkVTVCBBUEkgcm91dGVzXG5jb25zdCBhcGlEZWZhdWx0TmFtZXNwYWNlID0gJ3dwL3YyJztcblxuLy8gUHVsbCBpbiBhdXRvZGlzY292ZXJ5IG1ldGhvZHNcbmNvbnN0IGF1dG9kaXNjb3ZlcnkgPSByZXF1aXJlKCAnLi9saWIvYXV0b2Rpc2NvdmVyeScgKTtcblxuLy8gUHVsbCBpbiBiYXNlIG1vZHVsZSBjb25zdHJ1Y3RvcnNcbmNvbnN0IFdQUmVxdWVzdCA9IHJlcXVpcmUoICcuL2xpYi9jb25zdHJ1Y3RvcnMvd3AtcmVxdWVzdCcgKTtcblxuLy8gUHVsbCBpbiBkZWZhdWx0IEhUVFAgdHJhbnNwb3J0XG5jb25zdCBodHRwVHJhbnNwb3J0ID0gcmVxdWlyZSggJy4vbGliL2h0dHAtdHJhbnNwb3J0JyApO1xuXG4vKipcbiAqIENvbnN0cnVjdCBhIFJFU1QgQVBJIGNsaWVudCBpbnN0YW5jZSBvYmplY3QgdG8gY3JlYXRlXG4gKlxuICogQGNvbnN0cnVjdG9yIFdQQVBJXG4gKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAgICAgICAgICAgICBBbiBvcHRpb25zIGhhc2ggdG8gY29uZmlndXJlIHRoZSBpbnN0YW5jZVxuICogQHBhcmFtIHtTdHJpbmd9IG9wdGlvbnMuZW5kcG9pbnQgICAgVGhlIFVSSSBmb3IgYSBXUC1BUEkgZW5kcG9pbnRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy51c2VybmFtZV0gIEEgV1AtQVBJIEJhc2ljIEF1dGggdXNlcm5hbWVcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5wYXNzd29yZF0gIEEgV1AtQVBJIEJhc2ljIEF1dGggcGFzc3dvcmRcbiAqIEBwYXJhbSB7U3RyaW5nfSBbb3B0aW9ucy5ub25jZV0gICAgIEEgV1Agbm9uY2UgZm9yIHVzZSB3aXRoIGNvb2tpZSBhdXRoZW50aWNhdGlvblxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zLnJvdXRlc10gICAgQSBkaWN0aW9uYXJ5IG9mIEFQSSByb3V0ZXMgd2l0aCB3aGljaCB0b1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9vdHN0cmFwIHRoZSBXUEFQSSBpbnN0YW5jZTogdGhlIGluc3RhbmNlIHdpbGxcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGluaXRpYWxpemVkIHdpdGggZGVmYXVsdCByb3V0ZXMgb25seVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdGhpcyBwcm9wZXJ0eSBpcyBvbWl0dGVkXG4gKiBAcGFyYW0ge1N0cmluZ30gW29wdGlvbnMudHJhbnNwb3J0XSBBbiBvcHRpb25hbCBkaWN0aW9uYXJ5IG9mIEhUVFAgdHJhbnNwb3J0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2RzICguZ2V0LCAucG9zdCwgLnB1dCwgLmRlbGV0ZSwgLmhlYWQpXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB1c2UgaW5zdGVhZCBvZiB0aGUgZGVmYXVsdHMsIGUuZy4gdG8gdXNlXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhIGRpZmZlcmVudCBIVFRQIGxpYnJhcnkgdGhhbiBzdXBlcmFnZW50XG4gKi9cbmZ1bmN0aW9uIFdQQVBJKCBvcHRpb25zICkge1xuXG5cdC8vIEVuZm9yY2UgYG5ld2Bcblx0aWYgKCB0aGlzIGluc3RhbmNlb2YgV1BBUEkgPT09IGZhbHNlICkge1xuXHRcdHJldHVybiBuZXcgV1BBUEkoIG9wdGlvbnMgKTtcblx0fVxuXG5cdGlmICggdHlwZW9mIG9wdGlvbnMuZW5kcG9pbnQgIT09ICdzdHJpbmcnICkge1xuXHRcdHRocm93IG5ldyBFcnJvciggJ29wdGlvbnMgaGFzaCBtdXN0IGNvbnRhaW4gYW4gQVBJIGVuZHBvaW50IFVSTCBzdHJpbmcnICk7XG5cdH1cblxuXHQvLyBEaWN0aW9uYXJ5IHRvIGJlIGZpbGxlZCBieSBoYW5kbGVycyBmb3IgZGVmYXVsdCBuYW1lc3BhY2VzXG5cdHRoaXMuX25zID0ge307XG5cblx0dGhpcy5fb3B0aW9ucyA9IHtcblx0XHQvLyBFbnN1cmUgdHJhaWxpbmcgc2xhc2ggb24gZW5kcG9pbnQgVVJJXG5cdFx0ZW5kcG9pbnQ6IG9wdGlvbnMuZW5kcG9pbnQucmVwbGFjZSggIC9cXC8/JC8sICcvJyApLFxuXHR9O1xuXG5cdC8vIElmIGFueSBhdXRoZW50aWNhdGlvbiBjcmVkZW50aWFscyB3ZXJlIHByb3ZpZGVkLCBhc3NpZ24gdGhlbSBub3dcblx0aWYgKCBvcHRpb25zICYmICggb3B0aW9ucy51c2VybmFtZSB8fCBvcHRpb25zLnBhc3N3b3JkIHx8IG9wdGlvbnMubm9uY2UgKSApIHtcblx0XHR0aGlzLmF1dGgoIG9wdGlvbnMgKTtcblx0fVxuXG5cdHJldHVybiB0aGlzXG5cdFx0Ly8gQ29uZmlndXJlIGN1c3RvbSBIVFRQIHRyYW5zcG9ydCBtZXRob2RzLCBpZiBwcm92aWRlZFxuXHRcdC50cmFuc3BvcnQoIG9wdGlvbnMudHJhbnNwb3J0IClcblx0XHQvLyBCb290c3RyYXAgd2l0aCBhIHNwZWNpZmljIHJvdXRlcyBvYmplY3QsIGlmIHByb3ZpZGVkXG5cdFx0LmJvb3RzdHJhcCggb3B0aW9ucyAmJiBvcHRpb25zLnJvdXRlcyApO1xufVxuXG4vKipcbiAqIFNldCBjdXN0b20gdHJhbnNwb3J0IG1ldGhvZHMgdG8gdXNlIHdoZW4gbWFraW5nIEhUVFAgcmVxdWVzdHMgYWdhaW5zdCB0aGUgQVBJXG4gKlxuICogUGFzcyBhbiBvYmplY3Qgd2l0aCBhIGZ1bmN0aW9uIGZvciBvbmUgb3IgbWFueSBvZiBcImdldFwiLCBcInBvc3RcIiwgXCJwdXRcIixcbiAqIFwiZGVsZXRlXCIgYW5kIFwiaGVhZFwiIGFuZCB0aGF0IGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gbWFraW5nIHRoYXQgdHlwZVxuICogb2YgcmVxdWVzdC4gVGhlIHByb3ZpZGVkIHRyYW5zcG9ydCBmdW5jdGlvbnMgc2hvdWxkIHRha2UgYSBXUFJlcXVlc3QgaGFuZGxlclxuICogaW5zdGFuY2UgKF9lLmcuXyB0aGUgcmVzdWx0IG9mIGEgYHdwLnBvc3RzKCkuLi5gIGNoYWluIG9yIGFueSBvdGhlciBjaGFpbmluZ1xuICogcmVxdWVzdCBoYW5kbGVyKSBhcyB0aGVpciBmaXJzdCBhcmd1bWVudDsgYSBgZGF0YWAgb2JqZWN0IGFzIHRoZWlyIHNlY29uZFxuICogYXJndW1lbnQgKGZvciBQT1NULCBQVVQgYW5kIERFTEVURSByZXF1ZXN0cyk7IGFuZCBhbiBvcHRpb25hbCBjYWxsYmFjayBhc1xuICogdGhlaXIgZmluYWwgYXJndW1lbnQuIFRyYW5zcG9ydCBtZXRob2RzIHNob3VsZCBpbnZva2UgdGhlIGNhbGxiYWNrIHdpdGggdGhlXG4gKiByZXNwb25zZSBkYXRhIChvciBlcnJvciwgYXMgYXBwcm9wcmlhdGUpLCBhbmQgc2hvdWxkIGFsc28gcmV0dXJuIGEgUHJvbWlzZS5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5zaG93aW5nIGhvdyBhIGNhY2hlIGhpdCAoa2V5ZWQgYnkgVVJJKSBjb3VsZCBzaG9ydC1jaXJjdWl0IGEgZ2V0IHJlcXVlc3Q8L2NhcHRpb24+XG4gKlxuICogICAgIHZhciBzaXRlID0gbmV3IFdQQVBJKHtcbiAqICAgICAgIGVuZHBvaW50OiAnaHR0cDovL215LXNpdGUuY29tL3dwLWpzb24nXG4gKiAgICAgfSk7XG4gKlxuICogICAgIC8vIE92ZXJ3cml0ZSB0aGUgR0VUIGJlaGF2aW9yIHRvIGluamVjdCBhIGNhY2hpbmcgbGF5ZXJcbiAqICAgICBzaXRlLnRyYW5zcG9ydCh7XG4gKiAgICAgICBnZXQ6IGZ1bmN0aW9uKCB3cHJlcSwgY2IgKSB7XG4gKiAgICAgICAgIHZhciByZXN1bHQgPSBjYWNoZVsgd3ByZXEgXTtcbiAqICAgICAgICAgLy8gSWYgYSBjYWNoZSBoaXQgaXMgZm91bmQsIHJldHVybiBpdCB2aWEgdGhlIHNhbWUgY2FsbGJhY2svcHJvbWlzZVxuICogICAgICAgICAvLyBzaWduYXR1cmUgYXMgdGhlIGRlZmF1bHQgdHJhbnNwb3J0IG1ldGhvZFxuICogICAgICAgICBpZiAoIHJlc3VsdCApIHtcbiAqICAgICAgICAgICBpZiAoIGNiICYmIHR5cGVvZiBjYiA9PT0gJ2Z1bmN0aW9uJyApIHtcbiAqICAgICAgICAgICAgIGNiKCBudWxsLCByZXN1bHQgKTtcbiAqICAgICAgICAgICB9XG4gKiAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSggcmVzdWx0ICk7XG4gKiAgICAgICAgIH1cbiAqXG4gKiAgICAgICAgIC8vIERlbGVnYXRlIHRvIGRlZmF1bHQgdHJhbnNwb3J0IGlmIG5vIGNhY2hlZCBkYXRhIHdhcyBmb3VuZFxuICogICAgICAgICByZXR1cm4gV1BBUEkudHJhbnNwb3J0LmdldCggd3ByZXEsIGNiICkudGhlbihmdW5jdGlvbiggcmVzdWx0ICkge1xuICogICAgICAgICAgIGNhY2hlWyB3cHJlcSBdID0gcmVzdWx0O1xuICogICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gKiAgICAgICAgIH0pO1xuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIFRoaXMgaXMgYWR2YW5jZWQgYmVoYXZpb3I7IHlvdSB3aWxsIG9ubHkgbmVlZCB0byB1dGlsaXplIHRoaXMgZnVuY3Rpb25hbGl0eVxuICogaWYgeW91ciBhcHBsaWNhdGlvbiBoYXMgdmVyeSBzcGVjaWZpYyBIVFRQIGhhbmRsaW5nIG9yIGNhY2hpbmcgcmVxdWlyZW1lbnRzLlxuICogUmVmZXIgdG8gdGhlIFwiaHR0cC10cmFuc3BvcnRcIiBtb2R1bGUgd2l0aGluIHRoaXMgYXBwbGljYXRpb24gZm9yIHRoZSBjb2RlXG4gKiBpbXBsZW1lbnRpbmcgdGhlIGJ1aWx0LWluIHRyYW5zcG9ydCBtZXRob2RzLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBtZXRob2QgdHJhbnNwb3J0XG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge09iamVjdH0gICB0cmFuc3BvcnQgICAgICAgICAgQSBkaWN0aW9uYXJ5IG9mIEhUVFAgdHJhbnNwb3J0IG1ldGhvZHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0cmFuc3BvcnQuZ2V0XSAgICBUaGUgZnVuY3Rpb24gdG8gdXNlIGZvciBHRVQgcmVxdWVzdHNcbiAqIEBwYXJhbSB7RnVuY3Rpb259IFt0cmFuc3BvcnQucG9zdF0gICBUaGUgZnVuY3Rpb24gdG8gdXNlIGZvciBQT1NUIHJlcXVlc3RzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHJhbnNwb3J0LnB1dF0gICAgVGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3IgUFVUIHJlcXVlc3RzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHJhbnNwb3J0LmRlbGV0ZV0gVGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3IgREVMRVRFIHJlcXVlc3RzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbdHJhbnNwb3J0LmhlYWRdICAgVGhlIGZ1bmN0aW9uIHRvIHVzZSBmb3IgSEVBRCByZXF1ZXN0c1xuICogQHJldHVybnMge1dQQVBJfSBUaGUgV1BBUEkgaW5zdGFuY2UsIGZvciBjaGFpbmluZ1xuICovXG5XUEFQSS5wcm90b3R5cGUudHJhbnNwb3J0ID0gZnVuY3Rpb24oIHRyYW5zcG9ydCApIHtcblx0Ly8gTG9jYWwgcmVmZXJlbmNlIHRvIGF2b2lkIG5lZWQgdG8gcmVmZXJlbmNlIHZpYSBgdGhpc2AgaW5zaWRlIGZvckVhY2hcblx0Y29uc3QgX29wdGlvbnMgPSB0aGlzLl9vcHRpb25zO1xuXG5cdC8vIENyZWF0ZSB0aGUgZGVmYXVsdCB0cmFuc3BvcnQgaWYgaXQgZG9lcyBub3QgZXhpc3Rcblx0aWYgKCAhIF9vcHRpb25zLnRyYW5zcG9ydCApIHtcblx0XHRfb3B0aW9ucy50cmFuc3BvcnQgPSBPYmplY3QuY3JlYXRlKCBXUEFQSS50cmFuc3BvcnQgKTtcblx0fVxuXG5cdC8vIFdoaXRlbGlzdCB0aGUgbWV0aG9kcyB0aGF0IG1heSBiZSBhcHBsaWVkXG5cdFsgJ2dldCcsICdoZWFkJywgJ3Bvc3QnLCAncHV0JywgJ2RlbGV0ZScgXS5mb3JFYWNoKCAoIGtleSApID0+IHtcblx0XHRpZiAoIHRyYW5zcG9ydCAmJiB0cmFuc3BvcnRbIGtleSBdICkge1xuXHRcdFx0X29wdGlvbnMudHJhbnNwb3J0WyBrZXkgXSA9IHRyYW5zcG9ydFsga2V5IF07XG5cdFx0fVxuXHR9ICk7XG5cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIERlZmF1bHQgSFRUUCB0cmFuc3BvcnQgbWV0aG9kcyBvYmplY3QgZm9yIGFsbCBXUEFQSSBpbnN0YW5jZXNcbiAqXG4gKiBUaGVzZSBtZXRob2RzIG1heSBiZSBleHRlbmRlZCBvciByZXBsYWNlZCBvbiBhbiBpbnN0YW5jZS1ieS1pbnN0YW5jZSBiYXNpc1xuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBzdGF0aWNcbiAqIEBwcm9wZXJ0eSB0cmFuc3BvcnRcbiAqIEB0eXBlIHtPYmplY3R9XG4gKi9cbldQQVBJLnRyYW5zcG9ydCA9IE9iamVjdC5jcmVhdGUoIGh0dHBUcmFuc3BvcnQgKTtcbk9iamVjdC5mcmVlemUoIFdQQVBJLnRyYW5zcG9ydCApO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIG1ldGhvZCBmb3IgbWFraW5nIGEgbmV3IFdQQVBJIGluc3RhbmNlXG4gKlxuICogQGV4YW1wbGVcbiAqIFRoZXNlIGFyZSBlcXVpdmFsZW50OlxuICpcbiAqICAgICB2YXIgd3AgPSBuZXcgV1BBUEkoeyBlbmRwb2ludDogJ2h0dHA6Ly9teS5ibG9nLnVybC93cC1qc29uJyB9KTtcbiAqICAgICB2YXIgd3AgPSBXUEFQSS5zaXRlKCAnaHR0cDovL215LmJsb2cudXJsL3dwLWpzb24nICk7XG4gKlxuICogYFdQQVBJLnNpdGVgIGNhbiB0YWtlIGFuIG9wdGlvbmFsIEFQSSByb290IHJlc3BvbnNlIEpTT04gb2JqZWN0IHRvIHVzZSB3aGVuXG4gKiBib290c3RyYXBwaW5nIHRoZSBjbGllbnQncyBlbmRwb2ludCBoYW5kbGVyIG1ldGhvZHM6IGlmIG5vIHNlY29uZCBwYXJhbWV0ZXJcbiAqIGlzIHByb3ZpZGVkLCB0aGUgY2xpZW50IGluc3RhbmNlIGlzIGFzc3VtZWQgdG8gYmUgdXNpbmcgdGhlIGRlZmF1bHQgQVBJXG4gKiB3aXRoIG5vIGFkZGl0aW9uYWwgcGx1Z2lucyBhbmQgaXMgaW5pdGlhbGl6ZWQgd2l0aCBoYW5kbGVycyBmb3Igb25seSB0aG9zZVxuICogZGVmYXVsdCBBUEkgcm91dGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBUaGVzZSBhcmUgZXF1aXZhbGVudDpcbiAqXG4gKiAgICAgLy8gey4uLn0gbWVhbnMgdGhlIEpTT04gb3V0cHV0IG9mIGh0dHA6Ly9teS5ibG9nLnVybC93cC1qc29uXG4gKiAgICAgdmFyIHdwID0gbmV3IFdQQVBJKHtcbiAqICAgICAgIGVuZHBvaW50OiAnaHR0cDovL215LmJsb2cudXJsL3dwLWpzb24nLFxuICogICAgICAganNvbjogey4uLn1cbiAqICAgICB9KTtcbiAqICAgICB2YXIgd3AgPSBXUEFQSS5zaXRlKCAnaHR0cDovL215LmJsb2cudXJsL3dwLWpzb24nLCB7Li4ufSApO1xuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBzdGF0aWNcbiAqIEBwYXJhbSB7U3RyaW5nfSBlbmRwb2ludCBUaGUgVVJJIGZvciBhIFdQLUFQSSBlbmRwb2ludFxuICogQHBhcmFtIHtPYmplY3R9IHJvdXRlcyAgIFRoZSBcInJvdXRlc1wiIG9iamVjdCBmcm9tIHRoZSBKU09OIG9iamVjdCByZXR1cm5lZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gdGhlIHJvb3QgQVBJIGVuZHBvaW50IG9mIGEgV1Agc2l0ZSwgd2hpY2ggc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgYSBkaWN0aW9uYXJ5IG9mIHJvdXRlIGRlZmluaXRpb24gb2JqZWN0cyBrZXllZCBieVxuICogICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSByb3V0ZSdzIHJlZ2V4IHBhdHRlcm5cbiAqIEByZXR1cm5zIHtXUEFQSX0gQSBuZXcgV1BBUEkgaW5zdGFuY2UsIGJvdW5kIHRvIHRoZSBwcm92aWRlZCBlbmRwb2ludFxuICovXG5XUEFQSS5zaXRlID0gZnVuY3Rpb24oIGVuZHBvaW50LCByb3V0ZXMgKSB7XG5cdHJldHVybiBuZXcgV1BBUEkoIHtcblx0XHRlbmRwb2ludDogZW5kcG9pbnQsXG5cdFx0cm91dGVzOiByb3V0ZXMsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSByZXF1ZXN0IGFnYWluc3QgYSBjb21wbGV0ZWx5IGFyYml0cmFyeSBlbmRwb2ludCwgd2l0aCBubyBhc3N1bXB0aW9ucyBhYm91dFxuICogb3IgbXV0YXRpb24gb2YgcGF0aCwgZmlsdGVyaW5nLCBvciBxdWVyeSBwYXJhbWV0ZXJzLiBUaGlzIHJlcXVlc3QgaXMgbm90IHJlc3RyaWN0ZWQgdG9cbiAqIHRoZSBlbmRwb2ludCBzcGVjaWZpZWQgZHVyaW5nIFdQQVBJIG9iamVjdCBpbnN0YW50aWF0aW9uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBHZW5lcmF0ZSBhIHJlcXVlc3QgdG8gdGhlIGV4cGxpY2l0IFVSTCBcImh0dHA6Ly95b3VyLndlYnNpdGUuY29tL3dwLWpzb24vc29tZS9jdXN0b20vcGF0aFwiXG4gKlxuICogICAgIHdwLnVybCggJ2h0dHA6Ly95b3VyLndlYnNpdGUuY29tL3dwLWpzb24vc29tZS9jdXN0b20vcGF0aCcgKS5nZXQoKS4uLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byByZXF1ZXN0XG4gKiBAcmV0dXJucyB7V1BSZXF1ZXN0fSBBIFdQUmVxdWVzdCBvYmplY3QgYm91bmQgdG8gdGhlIHByb3ZpZGVkIFVSTFxuICovXG5XUEFQSS5wcm90b3R5cGUudXJsID0gZnVuY3Rpb24oIHVybCApIHtcblx0cmV0dXJuIG5ldyBXUFJlcXVlc3QoIHtcblx0XHQuLi50aGlzLl9vcHRpb25zLFxuXHRcdGVuZHBvaW50OiB1cmwsXG5cdH0gKTtcbn07XG5cbi8qKlxuICogR2VuZXJhdGUgYSBxdWVyeSBhZ2FpbnN0IGFuIGFyYml0cmFyeSBwYXRoIG9uIHRoZSBjdXJyZW50IGVuZHBvaW50LiBUaGlzIGlzIHVzZWZ1bCBmb3JcbiAqIHJlcXVlc3RpbmcgcmVzb3VyY2VzIGF0IGN1c3RvbSBXUC1BUEkgZW5kcG9pbnRzLCBzdWNoIGFzIFdvb0NvbW1lcmNlJ3MgYC9wcm9kdWN0c2AuXG4gKlxuICogQG1lbWJlcm9mISBXUEFQSVxuICogQHBhcmFtIHtTdHJpbmd9IFtyZWxhdGl2ZVBhdGhdIEFuIGVuZHBvaW50LXJlbGF0aXZlIHBhdGggdG8gd2hpY2ggdG8gYmluZCB0aGUgcmVxdWVzdFxuICogQHJldHVybnMge1dQUmVxdWVzdH0gQSByZXF1ZXN0IG9iamVjdFxuICovXG5XUEFQSS5wcm90b3R5cGUucm9vdCA9IGZ1bmN0aW9uKCByZWxhdGl2ZVBhdGggKSB7XG5cdHJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlUGF0aCB8fCAnJztcblx0Y29uc3Qgb3B0aW9ucyA9IHtcblx0XHQuLi50aGlzLl9vcHRpb25zLFxuXHR9O1xuXHQvLyBSZXF1ZXN0IHNob3VsZCBiZVxuXHRjb25zdCByZXF1ZXN0ID0gbmV3IFdQUmVxdWVzdCggb3B0aW9ucyApO1xuXG5cdC8vIFNldCB0aGUgcGF0aCB0ZW1wbGF0ZSB0byB0aGUgc3RyaW5nIHBhc3NlZCBpblxuXHRyZXF1ZXN0Ll9wYXRoID0geyAnMCc6IHJlbGF0aXZlUGF0aCB9O1xuXG5cdHJldHVybiByZXF1ZXN0O1xufTtcblxuLyoqXG4gKiBTZXQgdGhlIGRlZmF1bHQgaGVhZGVycyB0byB1c2UgZm9yIGFsbCBIVFRQIHJlcXVlc3RzIGNyZWF0ZWQgZnJvbSB0aGlzIFdQQVBJXG4gKiBzaXRlIGluc3RhbmNlLiBBY2NlcHRzIGEgaGVhZGVyIG5hbWUgYW5kIGl0cyBhc3NvY2lhdGVkIHZhbHVlIGFzIHR3byBzdHJpbmdzLFxuICogb3IgbXVsdGlwbGUgaGVhZGVycyBhcyBhbiBvYmplY3Qgb2YgbmFtZS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAZXhhbXBsZSA8Y2FwdGlvbj5TZXQgYSBzaW5nbGUgaGVhZGVyIHRvIGJlIHVzZWQgYnkgYWxsIHJlcXVlc3RzIHRvIHRoaXMgc2l0ZTwvY2FwdGlvbj5cbiAqXG4gKiAgICAgc2l0ZS5zZXRIZWFkZXJzKCAnQXV0aG9yaXphdGlvbicsICdCZWFyZXIgdHJ1c3RtZScgKS4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPlNldCBtdWx0aXBsZSBoZWFkZXJzIHRvIGJlIHVzZWQgYnkgYWxsIHJlcXVlc3RzIHRvIHRoaXMgc2l0ZTwvY2FwdGlvbj5cbiAqXG4gKiAgICAgc2l0ZS5zZXRIZWFkZXJzKHtcbiAqICAgICAgIEF1dGhvcml6YXRpb246ICdCZWFyZXIgY29tZW9ud2VyZW9sZGZyaWVuZHNyaWdodCcsXG4gKiAgICAgICAnQWNjZXB0LUxhbmd1YWdlJzogJ2VuLUNBJ1xuICogICAgIH0pLi4uXG4gKlxuICogQG1lbWJlcm9mISBXUEFQSVxuICogQHNpbmNlIDEuMS4wXG4gKiBAY2hhaW5hYmxlXG4gKiBAcGFyYW0ge1N0cmluZ3xPYmplY3R9IGhlYWRlcnMgVGhlIG5hbWUgb2YgdGhlIGhlYWRlciB0byBzZXQsIG9yIGFuIG9iamVjdCBvZlxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlciBuYW1lcyBhbmQgdGhlaXIgYXNzb2NpYXRlZCBzdHJpbmcgdmFsdWVzXG4gKiBAcGFyYW0ge1N0cmluZ30gICAgICAgIFt2YWx1ZV0gVGhlIHZhbHVlIG9mIHRoZSBoZWFkZXIgYmVpbmcgc2V0XG4gKiBAcmV0dXJucyB7V1BBUEl9IFRoZSBXUEFQSSBzaXRlIGhhbmRsZXIgaW5zdGFuY2UsIGZvciBjaGFpbmluZ1xuICovXG5XUEFQSS5wcm90b3R5cGUuc2V0SGVhZGVycyA9IFdQUmVxdWVzdC5wcm90b3R5cGUuc2V0SGVhZGVycztcblxuLyoqXG4gKiBTZXQgdGhlIGF1dGhlbnRpY2F0aW9uIHRvIHVzZSBmb3IgYSBXUEFQSSBzaXRlIGhhbmRsZXIgaW5zdGFuY2UuIEFjY2VwdHMgYmFzaWNcbiAqIEhUVFAgYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHMgKHN0cmluZyB1c2VybmFtZSAmIHBhc3N3b3JkKSBvciBhIE5vbmNlIChmb3JcbiAqIGNvb2tpZSBhdXRoZW50aWNhdGlvbikgYnkgZGVmYXVsdDsgbWF5IGJlIG92ZXJsb2FkZWQgdG8gYWNjZXB0IE9BdXRoIGNyZWRlbnRpYWxzXG4gKiBpbiB0aGUgZnV0dXJlLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkJhc2ljIEF1dGhlbnRpY2F0aW9uPC9jYXB0aW9uPlxuICpcbiAqICAgICBzaXRlLmF1dGgoe1xuICogICAgICAgdXNlcm5hbWU6ICdhZG1pbicsXG4gKiAgICAgICBwYXNzd29yZDogJ3NlY3VyZXBhc3M1NSdcbiAqICAgICB9KS4uLlxuICpcbiAqIEBleGFtcGxlIDxjYXB0aW9uPkNvb2tpZS9Ob25jZSBBdXRoZW50aWNhdGlvbjwvY2FwdGlvbj5cbiAqXG4gKiAgICAgc2l0ZS5hdXRoKHtcbiAqICAgICAgIG5vbmNlOiAnc29tZW5vbmNlJ1xuICogICAgIH0pLi4uXG4gKlxuICogQG1lbWJlcm9mISBXUEFQSVxuICogQG1ldGhvZFxuICogQGNoYWluYWJsZVxuICogQHBhcmFtIHtPYmplY3R9IGNyZWRlbnRpYWxzICAgICAgICAgICAgQW4gYXV0aGVudGljYXRpb24gY3JlZGVudGlhbHMgb2JqZWN0XG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLnVzZXJuYW1lXSBBIFdQLUFQSSBCYXNpYyBIVFRQIEF1dGhlbnRpY2F0aW9uIHVzZXJuYW1lXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLnBhc3N3b3JkXSBBIFdQLUFQSSBCYXNpYyBIVFRQIEF1dGhlbnRpY2F0aW9uIHBhc3N3b3JkXG4gKiBAcGFyYW0ge1N0cmluZ30gW2NyZWRlbnRpYWxzLm5vbmNlXSAgICBBIFdQIG5vbmNlIGZvciB1c2Ugd2l0aCBjb29raWUgYXV0aGVudGljYXRpb25cbiAqIEByZXR1cm5zIHtXUEFQSX0gVGhlIFdQQVBJIHNpdGUgaGFuZGxlciBpbnN0YW5jZSwgZm9yIGNoYWluaW5nXG4gKi9cbldQQVBJLnByb3RvdHlwZS5hdXRoID0gV1BSZXF1ZXN0LnByb3RvdHlwZS5hdXRoO1xuXG4vLyBBcHBseSB0aGUgcmVnaXN0ZXJSb3V0ZSBtZXRob2QgdG8gdGhlIHByb3RvdHlwZVxuV1BBUEkucHJvdG90eXBlLnJlZ2lzdGVyUm91dGUgPSByZXF1aXJlKCAnLi9saWIvd3AtcmVnaXN0ZXItcm91dGUnICk7XG5cbi8qKlxuICogRGVkdWNlIHJlcXVlc3QgbWV0aG9kcyBmcm9tIGEgcHJvdmlkZWQgQVBJIHJvb3QgSlNPTiByZXNwb25zZSBvYmplY3Qnc1xuICogcm91dGVzIGRpY3Rpb25hcnksIGFuZCBhc3NpZ24gdGhvc2UgbWV0aG9kcyB0byB0aGUgY3VycmVudCBpbnN0YW5jZS4gSWZcbiAqIG5vIHJvdXRlcyBkaWN0aW9uYXJ5IGlzIHByb3ZpZGVkIHRoZW4gdGhlIGluc3RhbmNlIHdpbGwgYmUgYm9vdHN0cmFwcGVkXG4gKiB3aXRoIHJvdXRlIGhhbmRsZXJzIGZvciB0aGUgZGVmYXVsdCBBUEkgZW5kcG9pbnRzIG9ubHkuXG4gKlxuICogVGhpcyBtZXRob2QgaXMgY2FsbGVkIGF1dG9tYXRpY2FsbHkgZHVyaW5nIFdQQVBJIGluc3RhbmNlIGNyZWF0aW9uLlxuICpcbiAqIEBtZW1iZXJvZiEgV1BBUElcbiAqIEBjaGFpbmFibGVcbiAqIEBwYXJhbSB7T2JqZWN0fSByb3V0ZXMgVGhlIFwicm91dGVzXCIgb2JqZWN0IGZyb20gdGhlIEpTT04gb2JqZWN0IHJldHVybmVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gdGhlIHJvb3QgQVBJIGVuZHBvaW50IG9mIGEgV1Agc2l0ZSwgd2hpY2ggc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgIGJlIGEgZGljdGlvbmFyeSBvZiByb3V0ZSBkZWZpbml0aW9uIG9iamVjdHMga2V5ZWQgYnlcbiAqICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJvdXRlJ3MgcmVnZXggcGF0dGVyblxuICogQHJldHVybnMge1dQQVBJfSBUaGUgYm9vdHN0cmFwcGVkIFdQQVBJIGNsaWVudCBpbnN0YW5jZSAoZm9yIGNoYWluaW5nIG9yIGFzc2lnbm1lbnQpXG4gKi9cbldQQVBJLnByb3RvdHlwZS5ib290c3RyYXAgPSBmdW5jdGlvbiggcm91dGVzICkge1xuXHRsZXQgcm91dGVzQnlOYW1lc3BhY2U7XG5cdGxldCBlbmRwb2ludEZhY3Rvcmllc0J5TmFtZXNwYWNlO1xuXG5cdGlmICggISByb3V0ZXMgKSB7XG5cdFx0Ly8gQXV0by1nZW5lcmF0ZSBkZWZhdWx0IGVuZHBvaW50IGZhY3RvcmllcyBpZiB0aGV5IGFyZSBub3QgYWxyZWFkeSBhdmFpbGFibGVcblx0XHRpZiAoICEgZGVmYXVsdEVuZHBvaW50RmFjdG9yaWVzICkge1xuXHRcdFx0cm91dGVzQnlOYW1lc3BhY2UgPSBidWlsZFJvdXRlVHJlZSggZGVmYXVsdFJvdXRlcyApO1xuXHRcdFx0ZGVmYXVsdEVuZHBvaW50RmFjdG9yaWVzID0gZ2VuZXJhdGVFbmRwb2ludEZhY3Rvcmllcyggcm91dGVzQnlOYW1lc3BhY2UgKTtcblx0XHR9XG5cdFx0ZW5kcG9pbnRGYWN0b3JpZXNCeU5hbWVzcGFjZSA9IGRlZmF1bHRFbmRwb2ludEZhY3Rvcmllcztcblx0fSBlbHNlIHtcblx0XHRyb3V0ZXNCeU5hbWVzcGFjZSA9IGJ1aWxkUm91dGVUcmVlKCByb3V0ZXMgKTtcblx0XHRlbmRwb2ludEZhY3Rvcmllc0J5TmFtZXNwYWNlID0gZ2VuZXJhdGVFbmRwb2ludEZhY3Rvcmllcyggcm91dGVzQnlOYW1lc3BhY2UgKTtcblx0fVxuXG5cdC8vIEZvciBlYWNoIG5hbWVzcGFjZSBmb3Igd2hpY2ggcm91dGVzIHdlcmUgaWRlbnRpZmllZCwgc3RvcmUgdGhlIGdlbmVyYXRlZFxuXHQvLyByb3V0ZSBoYW5kbGVycyBvbiB0aGUgV1BBUEkgaW5zdGFuY2UncyBwcml2YXRlIF9ucyBkaWN0aW9uYXJ5LiBUaGVzZSBuYW1lc3BhY2VkXG5cdC8vIGhhbmRsZXIgbWV0aG9kcyBjYW4gYmUgYWNjZXNzZWQgYnkgY2FsbGluZyBgLm5hbWVzcGFjZSggc3RyIClgIG9uIHRoZVxuXHQvLyBjbGllbnQgaW5zdGFuY2UgYW5kIHBhc3NpbmcgYSByZWdpc3RlcmVkIG5hbWVzcGFjZSBzdHJpbmcuXG5cdC8vIEhhbmRsZXJzIGZvciBkZWZhdWx0ICh3cC92Mikgcm91dGVzIHdpbGwgYWxzbyBiZSBhc3NpZ25lZCB0byB0aGUgV1BBUElcblx0Ly8gY2xpZW50IGluc3RhbmNlIG9iamVjdCBpdHNlbGYsIGZvciBicmV2aXR5LlxuXHRyZXR1cm4gb2JqZWN0UmVkdWNlKCBlbmRwb2ludEZhY3Rvcmllc0J5TmFtZXNwYWNlLCAoIHdwSW5zdGFuY2UsIGVuZHBvaW50RmFjdG9yaWVzLCBuYW1lc3BhY2UgKSA9PiB7XG5cblx0XHQvLyBTZXQgKG9yIGF1Z21lbnQpIHRoZSByb3V0ZSBoYW5kbGVyIGZhY3RvcmllcyBmb3IgdGhpcyBuYW1lc3BhY2UuXG5cdFx0d3BJbnN0YW5jZS5fbnNbIG5hbWVzcGFjZSBdID0gb2JqZWN0UmVkdWNlKFxuXHRcdFx0ZW5kcG9pbnRGYWN0b3JpZXMsXG5cdFx0XHQoIG5zSGFuZGxlcnMsIGhhbmRsZXJGbiwgbWV0aG9kTmFtZSApID0+IHtcblx0XHRcdFx0bnNIYW5kbGVyc1sgbWV0aG9kTmFtZSBdID0gaGFuZGxlckZuO1xuXHRcdFx0XHRyZXR1cm4gbnNIYW5kbGVycztcblx0XHRcdH0sXG5cdFx0XHR3cEluc3RhbmNlLl9uc1sgbmFtZXNwYWNlIF0gfHwge1xuXHRcdFx0XHQvLyBDcmVhdGUgYWxsIG5hbWVzcGFjZSBkaWN0aW9uYXJpZXMgd2l0aCBhIGRpcmVjdCByZWZlcmVuY2UgdG8gdGhlIG1haW4gV1BBUElcblx0XHRcdFx0Ly8gaW5zdGFuY2UncyBfb3B0aW9ucyBwcm9wZXJ0eSBzbyB0aGF0IHRoaW5ncyBsaWtlIGF1dGggcHJvcGFnYXRlIHByb3Blcmx5XG5cdFx0XHRcdF9vcHRpb25zOiB3cEluc3RhbmNlLl9vcHRpb25zLFxuXHRcdFx0fVxuXHRcdCk7XG5cblx0XHQvLyBGb3IgdGhlIGRlZmF1bHQgbmFtZXNwYWNlLCBlLmcuIFwid3AvdjJcIiBhdCB0aGUgdGltZSB0aGlzIGNvbW1lbnQgd2FzXG5cdFx0Ly8gd3JpdHRlbiwgZW5zdXJlIGFsbCBtZXRob2RzIGFyZSBhc3NpZ25lZCB0byB0aGUgcm9vdCBjbGllbnQgb2JqZWN0IGl0c2VsZlxuXHRcdC8vIGluIGFkZGl0aW9uIHRvIHRoZSBwcml2YXRlIF9ucyBkaWN0aW9uYXJ5OiB0aGlzIGlzIGRvbmUgc28gdGhhdCB0aGVzZVxuXHRcdC8vIG1ldGhvZHMgY2FuIGJlIGNhbGxlZCB3aXRoIGUuZy4gYHdwLnBvc3RzKClgIGFuZCBub3QgdGhlIG1vcmUgdmVyYm9zZVxuXHRcdC8vIGB3cC5uYW1lc3BhY2UoICd3cC92MicgKS5wb3N0cygpYC5cblx0XHRpZiAoIG5hbWVzcGFjZSA9PT0gYXBpRGVmYXVsdE5hbWVzcGFjZSApIHtcblx0XHRcdE9iamVjdC5rZXlzKCB3cEluc3RhbmNlLl9uc1sgbmFtZXNwYWNlIF0gKS5mb3JFYWNoKCAoIG1ldGhvZE5hbWUgKSA9PiB7XG5cdFx0XHRcdHdwSW5zdGFuY2VbIG1ldGhvZE5hbWUgXSA9IHdwSW5zdGFuY2UuX25zWyBuYW1lc3BhY2UgXVsgbWV0aG9kTmFtZSBdO1xuXHRcdFx0fSApO1xuXHRcdH1cblxuXHRcdHJldHVybiB3cEluc3RhbmNlO1xuXHR9LCB0aGlzICk7XG59O1xuXG4vKipcbiAqIEFjY2VzcyBBUEkgZW5kcG9pbnQgaGFuZGxlcnMgZnJvbSBhIHBhcnRpY3VsYXIgQVBJIG5hbWVzcGFjZSBvYmplY3RcbiAqXG4gKiBAZXhhbXBsZVxuICpcbiAqICAgICB3cC5uYW1lc3BhY2UoICdteXBsdWdpbi92MScgKS5hdXRob3IoKS4uLlxuICpcbiAqICAgICAvLyBEZWZhdWx0IFdQIGVuZHBvaW50IGhhbmRsZXJzIGFyZSBhc3NpZ25lZCB0byB0aGUgd3AgaW5zdGFuY2UgaXRzZWxmLlxuICogICAgIC8vIFRoZXNlIGFyZSBlcXVpdmFsZW50OlxuICogICAgIHdwLm5hbWVzcGFjZSggJ3dwL3YyJyApLnBvc3RzKCkuLi5cbiAqICAgICB3cC5wb3N0cygpLi4uXG4gKlxuICogQG1lbWJlcm9mISBXUEFQSVxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVzcGFjZSBBIG5hbWVzcGFjZSBzdHJpbmdcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCBvZiByb3V0ZSBlbmRwb2ludCBoYW5kbGVyIG1ldGhvZHMgZm9yIHRoZVxuICogcm91dGVzIHdpdGhpbiB0aGUgc3BlY2lmaWVkIG5hbWVzcGFjZVxuICovXG5XUEFQSS5wcm90b3R5cGUubmFtZXNwYWNlID0gZnVuY3Rpb24oIG5hbWVzcGFjZSApIHtcblx0aWYgKCAhIHRoaXMuX25zWyBuYW1lc3BhY2UgXSApIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoICdFcnJvcjogbmFtZXNwYWNlICcgKyBuYW1lc3BhY2UgKyAnIGlzIG5vdCByZWNvZ25pemVkJyApO1xuXHR9XG5cdHJldHVybiB0aGlzLl9uc1sgbmFtZXNwYWNlIF07XG59O1xuXG4vKipcbiAqIFRha2UgYW4gYXJiaXRyYXJ5IFdvcmRQcmVzcyBzaXRlLCBkZWR1Y2UgdGhlIFdQIFJFU1QgQVBJIHJvb3QgZW5kcG9pbnQsIHF1ZXJ5XG4gKiB0aGF0IGVuZHBvaW50LCBhbmQgcGFyc2UgdGhlIHJlc3BvbnNlIEpTT04uIFVzZSB0aGUgcmV0dXJuZWQgSlNPTiByZXNwb25zZVxuICogdG8gaW5zdGFudGlhdGUgYSBXUEFQSSBpbnN0YW5jZSBib3VuZCB0byB0aGUgcHJvdmlkZWQgc2l0ZS5cbiAqXG4gKiBAbWVtYmVyb2YhIFdQQVBJXG4gKiBAc3RhdGljXG4gKiBAcGFyYW0ge3N0cmluZ30gdXJsIEEgVVJMIHdpdGhpbiBhIFJFU1QgQVBJLWVuYWJsZWQgV29yZFByZXNzIHdlYnNpdGVcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGNvbmZpZ3VyZWQgV1BBUEkgaW5zdGFuY2UgYm91bmRcbiAqIHRvIHRoZSBkZWR1Y2VkIGVuZHBvaW50LCBvciByZWplY3RlZCBpZiBhbiBlbmRwb2ludCBpcyBub3QgZm91bmQgb3IgdGhlXG4gKiBsaWJyYXJ5IGlzIHVuYWJsZSB0byBwYXJzZSB0aGUgcHJvdmlkZWQgZW5kcG9pbnQuXG4gKi9cbldQQVBJLmRpc2NvdmVyID0gKCB1cmwgKSA9PiB7XG5cdC8vIGxvY2FsIHBsYWNlaG9sZGVyIGZvciBBUEkgcm9vdCBVUkxcblx0bGV0IGVuZHBvaW50O1xuXG5cdC8vIFRyeSBIRUFEIHJlcXVlc3QgZmlyc3QsIGZvciBzbWFsbGVyIHBheWxvYWQ6IHVzZSBXUEFQSS5zaXRlIHRvIHByb2R1Y2Vcblx0Ly8gYSByZXF1ZXN0IHRoYXQgdXRpbGl6ZXMgdGhlIGRlZmluZWQgSFRUUCB0cmFuc3BvcnRzXG5cdGNvbnN0IHJlcSA9IFdQQVBJLnNpdGUoIHVybCApLnJvb3QoKTtcblx0cmV0dXJuIHJlcS5oZWFkZXJzKClcblx0XHQuY2F0Y2goICgpID0+IHtcblx0XHRcdC8vIE9uIHRoZSBoeXBvdGhlc2lzIHRoYXQgYW55IGVycm9yIGhlcmUgaXMgcmVsYXRlZCB0byB0aGUgSEVBRCByZXF1ZXN0XG5cdFx0XHQvLyBmYWlsaW5nLCBwcm92aXNpb25hbGx5IHRyeSBhZ2FpbiB1c2luZyBHRVQgYmVjYXVzZSB0aGF0IG1ldGhvZCBpc1xuXHRcdFx0Ly8gbW9yZSB3aWRlbHkgc3VwcG9ydGVkXG5cdFx0XHRyZXR1cm4gcmVxLmdldCgpO1xuXHRcdH0gKVxuXHRcdC8vIEluc3BlY3QgcmVzcG9uc2UgdG8gZmluZCBBUEkgbG9jYXRpb24gaGVhZGVyXG5cdFx0LnRoZW4oIGF1dG9kaXNjb3ZlcnkubG9jYXRlQVBJUm9vdEhlYWRlciApXG5cdFx0LnRoZW4oICggYXBpUm9vdFVSTCApID0+IHtcblx0XHRcdC8vIFNldCB0aGUgZnVuY3Rpb24tc2NvcGUgdmFyaWFibGUgdGhhdCB3aWxsIGJlIHVzZWQgdG8gaW5zdGFudGlhdGVcblx0XHRcdC8vIHRoZSBib3VuZCBXUEFQSSBpbnN0YW5jZSxcblx0XHRcdGVuZHBvaW50ID0gYXBpUm9vdFVSTDtcblxuXHRcdFx0Ly8gdGhlbiBHRVQgdGhlIEFQSSByb290IEpTT04gb2JqZWN0XG5cdFx0XHRyZXR1cm4gV1BBUEkuc2l0ZSggYXBpUm9vdFVSTCApLnJvb3QoKS5nZXQoKTtcblx0XHR9IClcblx0XHQudGhlbiggKCBhcGlSb290SlNPTiApID0+IHtcblx0XHRcdC8vIEluc3RhbnRpYXRlICYgYm9vdHN0cmFwIHdpdGggdGhlIGRpc2NvdmVyZWQgbWV0aG9kc1xuXHRcdFx0cmV0dXJuIG5ldyBXUEFQSSgge1xuXHRcdFx0XHRlbmRwb2ludDogZW5kcG9pbnQsXG5cdFx0XHRcdHJvdXRlczogYXBpUm9vdEpTT04ucm91dGVzLFxuXHRcdFx0fSApO1xuXHRcdH0gKVxuXHRcdC5jYXRjaCggKCBlcnIgKSA9PiB7XG5cdFx0XHQvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5cdFx0XHRjb25zb2xlLmVycm9yKCBlcnIgKTtcblx0XHRcdGlmICggZW5kcG9pbnQgKSB7XG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ0VuZHBvaW50IGRldGVjdGVkLCBwcm9jZWVkaW5nIGRlc3BpdGUgZXJyb3IuLi4nICk7XG5cdFx0XHRcdGNvbnNvbGUud2FybiggJ0JpbmRpbmcgdG8gJyArIGVuZHBvaW50ICsgJyBhbmQgYXNzdW1pbmcgZGVmYXVsdCByb3V0ZXMnICk7XG5cdFx0XHRcdHJldHVybiBuZXcgV1BBUEkuc2l0ZSggZW5kcG9pbnQgKTtcblx0XHRcdH1cblx0XHRcdHRocm93IG5ldyBFcnJvciggJ0F1dG9kaXNjb3ZlcnkgZmFpbGVkJyApO1xuXHRcdH0gKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gV1BBUEk7XG4iLCJpbXBvcnQgd3AgZnJvbSAnLi93cCdcbmltcG9ydCB7IHRhcCwgcmVtb3ZlRWxlbWVudCwgZ2V0VmFsdWUsIGlzSW50ZXJzZWN0aW5nLCBzYW5pdGl6ZSB9IGZyb20gJy4vdXRpbCdcblxuLyoqXG4gKiBIYW5kbGVzIGluZmluaXRlIHNjcm9sbGluZ1xuICpcbiAqIEB0b2RvIEFic3RyYWN0IGF3YXkgdGVhc2Ugc3BlY2lmaWMgbG9naWNcbiAqL1xuZXhwb3J0IGNsYXNzIEluZmluaXRlU2Nyb2xsaW5nIHtcbiAgY29uc3RydWN0b3IgKCkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhc2UtdGVtcGxhdGUnKVxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYXNlLWNvbnRhaW5lcicpXG4gICAgdGhpcy5sb2FkaWNhdG9yID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYXNlLWxvYWRpY2F0b3InKVxuICAgIHRoaXMucGFnZVNpemUgPSB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbi5sZW5ndGhcbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gMVxuICAgIHRoaXMudG90YWxQYWdlcyA9IEluZmluaXR5XG4gICAgdGhpcy5pc0xvYWRpbmcgPSBmYWxzZVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgY29uc3QgeyBwYXJlbnROb2RlLCBuZXh0U2libGluZyB9ID0gdGhpcy5jb250YWluZXJcblxuICAgIGNvbnN0IHNlbnRpbmVsID0gcGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoXG4gICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKSxcbiAgICAgIG5leHRTaWJsaW5nXG4gICAgKVxuXG4gICAgbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzLCBvYnNlcnZlcikgPT4ge1xuICAgICAgaWYgKGVudHJpZXMuc29tZShpc0ludGVyc2VjdGluZykpIHtcbiAgICAgICAgdGhpcy5sb2FkUG9zdHMob2JzZXJ2ZXIpXG4gICAgICB9XG4gICAgfSkub2JzZXJ2ZShzZW50aW5lbClcbiAgfVxuXG4gIHRvZ2dsZUxvYWRpbmcgKGlzTG9hZGluZykge1xuICAgIHRoaXMuaXNMb2FkaW5nID0gaXNMb2FkaW5nXG4gICAgdGhpcy5sb2FkaWNhdG9yLmNsYXNzTGlzdC50b2dnbGUoJ2xvYWRpY2F0b3ItLWFjdGl2ZScsIGlzTG9hZGluZylcbiAgfVxuXG4gIHBvcHVsYXRlQ2F0ZWdvcmllcyAodGVhc2UsIHBvc3QpIHtcbiAgICBjb25zdCBjYXRlZ29yaWVzID0gdGVhc2UucXVlcnlTZWxlY3RvcignLmpzLXRlYXNlLWNhdGVnb3JpZXMnKVxuXG4gICAgaWYgKCFjYXRlZ29yaWVzKSB7XG4gICAgICByZXR1cm5cbiAgICB9XG5cbiAgICBjb25zdCB0ZXJtID0gZ2V0VmFsdWUoXG4gICAgICAnX2VtYmVkZGVkJyxcbiAgICAgICd3cDp0ZXJtJyxcbiAgICAgIDBcbiAgICApKHBvc3QpXG5cbiAgICBpZiAoIXRlcm0pIHtcbiAgICAgIHJldHVybiByZW1vdmVFbGVtZW50KGNhdGVnb3JpZXMpXG4gICAgfVxuXG4gICAgdGVybS5tYXAoKHsgbmFtZSwgbGluayB9KSA9PiBPYmplY3QuYXNzaWduKFxuICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpLFxuICAgICAgeyB0ZXh0Q29udGVudDogbmFtZSwgaHJlZjogbGluayB9XG4gICAgKSkuZm9yRWFjaChsaW5rID0+IGNhdGVnb3JpZXMuYXBwZW5kQ2hpbGQobGluaykpXG4gIH1cblxuICBzZXRUaHVtYm5haWwgKHRlYXNlLCBwb3N0KSB7XG4gICAgY29uc3QgdGh1bWJuYWlsID0gdGVhc2UucXVlcnlTZWxlY3RvcignLmpzLXRlYXNlLXRodW1ibmFpbCcpXG5cbiAgICBjb25zdCB0aHVtYm5haWxTcmMgPSBnZXRWYWx1ZShcbiAgICAgICdfZW1iZWRkZWQnLFxuICAgICAgJ3dwOmZlYXR1cmVkbWVkaWEnLFxuICAgICAgMCxcbiAgICAgICdtZWRpYV9kZXRhaWxzJyxcbiAgICAgICdzaXplcycsXG4gICAgICAndGh1bWJuYWlsJyxcbiAgICAgICdzb3VyY2VfdXJsJ1xuICAgICkocG9zdClcblxuICAgIGlmICghdGh1bWJuYWlsU3JjKSB7XG4gICAgICByZXR1cm4gcmVtb3ZlRWxlbWVudCh0aHVtYm5haWwpXG4gICAgfVxuXG4gICAgdGh1bWJuYWlsLnF1ZXJ5U2VsZWN0b3IoJ2ltZycpLnNyYyA9IHRodW1ibmFpbFNyY1xuICB9XG5cbiAgYXBwZW5kUG9zdCAocG9zdCkge1xuICAgIGNvbnN0IHRlYXNlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLCB0cnVlKS5jb250ZW50XG4gICAgY29uc3QgaXRlbSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJylcbiAgICBjb25zdCB0aXRsZSA9IHRlYXNlLnF1ZXJ5U2VsZWN0b3IoJy5qcy10ZWFzZS10aXRsZScpXG4gICAgY29uc3QgZXhjZXJwdCA9IHRlYXNlLnF1ZXJ5U2VsZWN0b3IoJy5qcy10ZWFzZS1leGNlcnB0JylcblxuICAgIHRoaXMucG9wdWxhdGVDYXRlZ29yaWVzKHRlYXNlLCBwb3N0KVxuICAgIHRoaXMuc2V0VGh1bWJuYWlsKHRlYXNlLCBwb3N0KVxuXG4gICAgdGl0bGUuaHJlZiA9IHBvc3QubGlua1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gc2FuaXRpemUocG9zdC50aXRsZS5yZW5kZXJlZClcbiAgICBleGNlcnB0LmlubmVySFRNTCA9IHNhbml0aXplKHBvc3QuZXhjZXJwdC5yZW5kZXJlZClcblxuICAgIGl0ZW0uYXBwZW5kQ2hpbGQodGVhc2UpXG4gICAgdGhpcy5jb250YWluZXIuaW5zZXJ0QmVmb3JlKGl0ZW0sIHRoaXMubG9hZGljYXRvcilcbiAgfVxuXG4gIGxvYWRQb3N0cyAob2JzZXJ2ZXIpIHtcbiAgICBpZiAodGhpcy5pc0xvYWRpbmcpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMudG90YWxQYWdlcykge1xuICAgICAgcmV0dXJuIG9ic2VydmVyLmRpc2Nvbm5lY3QoKVxuICAgIH1cblxuICAgIHRoaXMudG9nZ2xlTG9hZGluZyh0cnVlKVxuICAgIHRoaXMuY3VycmVudFBhZ2UrK1xuXG4gICAgd3BcbiAgICAgIC5wb3N0cygpXG4gICAgICAucGVyUGFnZSh0aGlzLnBhZ2VTaXplKVxuICAgICAgLnBhZ2UodGhpcy5jdXJyZW50UGFnZSlcbiAgICAgIC5lbWJlZCgpXG4gICAgICAudGhlbih0YXAoKHsgX3BhZ2luZyB9KSA9PiB7XG4gICAgICAgIHRoaXMudG90YWxQYWdlcyA9IF9wYWdpbmcudG90YWxQYWdlc1xuICAgICAgfSkpXG4gICAgICAudGhlbihwb3N0cyA9PiBwb3N0cy5mb3JFYWNoKHBvc3QgPT4gdGhpcy5hcHBlbmRQb3N0KHBvc3QpKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMudG9nZ2xlTG9hZGluZyhmYWxzZSkpXG4gIH1cbn1cblxubmV3IEluZmluaXRlU2Nyb2xsaW5nKCkuaW5pdCgpXG4iLCJleHBvcnQgY29uc3QgdGFwID0gY2FsbGJhY2sgPT4gdmFsdWUgPT4ge1xuICBjYWxsYmFjayh2YWx1ZSlcbiAgcmV0dXJuIHZhbHVlXG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVFbGVtZW50ID0gZWxlbWVudCA9PiBlbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbWVudClcblxuZXhwb3J0IGNvbnN0IGlzSW50ZXJzZWN0aW5nID0gKHsgaXNJbnRlcnNlY3RpbmcgfSkgPT4gaXNJbnRlcnNlY3RpbmdcblxuZXhwb3J0IGNvbnN0IGdldFZhbHVlID0gKC4uLnBhdGgpID0+IG9iamVjdCA9PiBwYXRoLnJlZHVjZSgocmVzdWx0LCBwcm9wKSA9PiB7XG4gIHJldHVybiB0eXBlb2YgcmVzdWx0ID09PSAnb2JqZWN0JyA/IHJlc3VsdFtwcm9wXSA6IHVuZGVmaW5lZFxufSwgb2JqZWN0KVxuXG5leHBvcnQgY29uc3QgbmVnYXRlID0gdmFsdWUgPT4gIXZhbHVlXG5cbmV4cG9ydCBjb25zdCBwaXBlID0gZm5zID0+IHZhbHVlID0+IGZucy5yZWR1Y2UoKHJlc3VsdCwgY3VycmVudCkgPT4gY3VycmVudChyZXN1bHQpLCB2YWx1ZSlcblxuZXhwb3J0IGNvbnN0IGlzVmFsdWVFcXVhbCA9IChwcm9wLCB2YWx1ZSkgPT4gb2JqZWN0ID0+IG9iamVjdFtwcm9wXSA9PT0gdmFsdWVcblxuZXhwb3J0IGNvbnN0IGlzVmFsdWVTZXQgPSBwcm9wID0+IG9iamVjdCA9PiBvYmplY3RbcHJvcF0gIT09IHVuZGVmaW5lZFxuXG5leHBvcnQgY29uc3Qgc2FuaXRpemUgPSBodG1sID0+IHtcbiAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gIGVsZW1lbnQuaW5uZXJIVE1MID0gaHRtbFxuICByZXR1cm4gZWxlbWVudC50ZXh0Q29udGVudFxufVxuIiwiaW1wb3J0IFdQQVBJIGZyb20gJ3dwYXBpJ1xuZXhwb3J0IGRlZmF1bHQgbmV3IFdQQVBJKHsgZW5kcG9pbnQ6ICcvd3AtanNvbicgfSlcbiJdLCJzb3VyY2VSb290IjoiIn0=