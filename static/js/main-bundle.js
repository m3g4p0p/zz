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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/dom-util.js":
/*!****************************!*\
  !*** ./src/js/dom-util.js ***!
  \****************************/
/*! exports provided: chainFrame */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "chainFrame", function() { return chainFrame; });
var chainFrame = function chainFrame(callback) {
  return new Promise(function (resolve) {
    return window.requestAnimationFrame(function (now) {
      return resolve(callback ? callback(now) : now);
    });
  });
};

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll_to_top__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll-to-top */ "./src/js/scroll-to-top.js");
/* harmony import */ var _navigation_toggle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./navigation-toggle */ "./src/js/navigation-toggle.js");


new _scroll_to_top__WEBPACK_IMPORTED_MODULE_0__["ScrollToTop"]().init();
new _navigation_toggle__WEBPACK_IMPORTED_MODULE_1__["NavigationToggle"]().init();

/***/ }),

/***/ "./src/js/mobile-indicator.js":
/*!************************************!*\
  !*** ./src/js/mobile-indicator.js ***!
  \************************************/
/*! exports provided: MobileIndicator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MobileIndicator", function() { return MobileIndicator; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var MobileIndicator =
/*#__PURE__*/
function () {
  _createClass(MobileIndicator, [{
    key: "isVisible",
    get: function get() {
      return window.getComputedStyle(this.inicator).getPropertyValue('display') !== 'none';
    }
  }]);

  function MobileIndicator() {
    _classCallCheck(this, MobileIndicator);

    this.inicator = document.getElementById('mobile-indicator');
  }

  return MobileIndicator;
}();

/***/ }),

/***/ "./src/js/navigation-toggle.js":
/*!*************************************!*\
  !*** ./src/js/navigation-toggle.js ***!
  \*************************************/
/*! exports provided: NavigationToggle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NavigationToggle", function() { return NavigationToggle; });
/* harmony import */ var _mobile_indicator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mobile-indicator */ "./src/js/mobile-indicator.js");
/* harmony import */ var _dom_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-util */ "./src/js/dom-util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



var CLASS_COLLAPSED = 'navigation--collapsed';
var CLASS_ANIMATING = 'navigation--animating';
var NavigationToggle =
/*#__PURE__*/
function () {
  _createClass(NavigationToggle, [{
    key: "isCollapsed",
    get: function get() {
      return this.navigation.classList.contains('navigation--collapsed');
    }
  }]);

  function NavigationToggle() {
    _classCallCheck(this, NavigationToggle);

    this.toggle = document.getElementById('menu-toggle');
    this.navigation = document.getElementById('navigation');
    this.menu = document.getElementById('menu');
    this.mobileIndicator = new _mobile_indicator__WEBPACK_IMPORTED_MODULE_0__["MobileIndicator"]();
    this.isAnimating = false;
  }

  _createClass(NavigationToggle, [{
    key: "init",
    value: function init() {
      this.toggle.addEventListener('click', this);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      switch (event.type) {
        case 'click':
          this.handleClick(event);
          break;

        case 'transitionend':
          this.handleTransitionend(event);
          break;

        default: // Do nothing

      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (this.mobileIndicator.isVisible) {
        event.preventDefault();
      }

      if (!this.isAnimating) {
        this.toggleMenu();
      }
    }
  }, {
    key: "handleTransitionend",
    value: function handleTransitionend() {
      if (event.target === this.navigation) {
        return this.endAnimation();
      }
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      var _this = this;

      this.startAnimation().then(function () {
        return _this.isCollapsed ? _this.collapse().then(function () {
          return _this.expand();
        }) : _this.expand().then(function () {
          return _this.collapse();
        });
      });
    }
  }, {
    key: "expand",
    value: function expand() {
      var _this2 = this;

      return Object(_dom_util__WEBPACK_IMPORTED_MODULE_1__["chainFrame"])(function () {
        _this2.navigation.style.height = _this2.menu.offsetHeight + 'px';

        _this2.navigation.classList.remove(CLASS_COLLAPSED);
      });
    }
  }, {
    key: "collapse",
    value: function collapse() {
      var _this3 = this;

      return Object(_dom_util__WEBPACK_IMPORTED_MODULE_1__["chainFrame"])(function () {
        _this3.navigation.style.height = 0;

        _this3.navigation.classList.add(CLASS_COLLAPSED);
      });
    }
  }, {
    key: "startAnimation",
    value: function startAnimation() {
      var _this4 = this;

      return Object(_dom_util__WEBPACK_IMPORTED_MODULE_1__["chainFrame"])(function () {
        _this4.isAnimating = true;

        _this4.navigation.classList.add(CLASS_ANIMATING);

        _this4.navigation.addEventListener('transitionend', _this4);
      });
    }
  }, {
    key: "endAnimation",
    value: function endAnimation() {
      var _this5 = this;

      return Object(_dom_util__WEBPACK_IMPORTED_MODULE_1__["chainFrame"])(function () {
        _this5.isAnimating = false;
        _this5.navigation.style.height = '';

        _this5.navigation.classList.remove(CLASS_ANIMATING);

        _this5.navigation.removeEventListener('transitionend', _this5);
      });
    }
  }]);

  return NavigationToggle;
}();

/***/ }),

/***/ "./src/js/scroll-to-top.js":
/*!*********************************!*\
  !*** ./src/js/scroll-to-top.js ***!
  \*********************************/
/*! exports provided: ScrollToTop */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScrollToTop", function() { return ScrollToTop; });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./src/js/util.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }


var ScrollToTop =
/*#__PURE__*/
function () {
  function ScrollToTop() {
    _classCallCheck(this, ScrollToTop);

    this.link = document.getElementById('scroll-to-top');
  }

  _createClass(ScrollToTop, [{
    key: "init",
    value: function init() {
      var _this = this;

      new IntersectionObserver(function (entries) {
        _this.toggleActive(entries.some(_util__WEBPACK_IMPORTED_MODULE_0__["isIntersecting"]) && window.innerHeight < document.body.clientHeight);
      }, {
        threshold: 1
      }).observe(this.link);
      this.link.addEventListener('click', this);
    }
  }, {
    key: "toggleActive",
    value: function toggleActive(isActive) {
      this.link.classList.toggle('footer__scroll-to-top--active', isActive);
    }
  }, {
    key: "handleEvent",
    value: function handleEvent(event) {
      event.preventDefault();
      window.location.hash = event.target.hash;
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }]);

  return ScrollToTop;
}();

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

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL2RvbS11dGlsLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tYWluLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9tb2JpbGUtaW5kaWNhdG9yLmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9uYXZpZ2F0aW9uLXRvZ2dsZS5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvc2Nyb2xsLXRvLXRvcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdXRpbC5qcyJdLCJuYW1lcyI6WyJjaGFpbkZyYW1lIiwiY2FsbGJhY2siLCJQcm9taXNlIiwicmVzb2x2ZSIsIndpbmRvdyIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm5vdyIsIlNjcm9sbFRvVG9wIiwiaW5pdCIsIk5hdmlnYXRpb25Ub2dnbGUiLCJNb2JpbGVJbmRpY2F0b3IiLCJnZXRDb21wdXRlZFN0eWxlIiwiaW5pY2F0b3IiLCJnZXRQcm9wZXJ0eVZhbHVlIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIkNMQVNTX0NPTExBUFNFRCIsIkNMQVNTX0FOSU1BVElORyIsIm5hdmlnYXRpb24iLCJjbGFzc0xpc3QiLCJjb250YWlucyIsInRvZ2dsZSIsIm1lbnUiLCJtb2JpbGVJbmRpY2F0b3IiLCJpc0FuaW1hdGluZyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsInR5cGUiLCJoYW5kbGVDbGljayIsImhhbmRsZVRyYW5zaXRpb25lbmQiLCJpc1Zpc2libGUiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZU1lbnUiLCJ0YXJnZXQiLCJlbmRBbmltYXRpb24iLCJzdGFydEFuaW1hdGlvbiIsInRoZW4iLCJpc0NvbGxhcHNlZCIsImNvbGxhcHNlIiwiZXhwYW5kIiwic3R5bGUiLCJoZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJyZW1vdmUiLCJhZGQiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwibGluayIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwiZW50cmllcyIsInRvZ2dsZUFjdGl2ZSIsInNvbWUiLCJpc0ludGVyc2VjdGluZyIsImlubmVySGVpZ2h0IiwiYm9keSIsImNsaWVudEhlaWdodCIsInRocmVzaG9sZCIsIm9ic2VydmUiLCJpc0FjdGl2ZSIsImxvY2F0aW9uIiwiaGFzaCIsInNjcm9sbFRvIiwidG9wIiwiYmVoYXZpb3IiLCJ0YXAiLCJ2YWx1ZSIsInJlbW92ZUVsZW1lbnQiLCJlbGVtZW50IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiZ2V0VmFsdWUiLCJwYXRoIiwib2JqZWN0IiwicmVkdWNlIiwicmVzdWx0IiwicHJvcCIsInVuZGVmaW5lZCIsIm5lZ2F0ZSIsInBpcGUiLCJmbnMiLCJjdXJyZW50IiwiaXNWYWx1ZUVxdWFsIiwiaXNWYWx1ZVNldCIsInNhbml0aXplIiwiaHRtbCIsImNyZWF0ZUVsZW1lbnQiLCJpbm5lckhUTUwiLCJ0ZXh0Q29udGVudCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFF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LFVBQUFkLEtBQUs7QUFBQSxXQUFJYyxHQUFHLENBQUNOLE1BQUosQ0FBVyxVQUFDQyxNQUFELEVBQVNNLE9BQVQ7QUFBQSxhQUFxQkEsT0FBTyxDQUFDTixNQUFELENBQTVCO0FBQUEsS0FBWCxFQUFpRFQsS0FBakQsQ0FBSjtBQUFBLEdBQVQ7QUFBQSxDQUFoQjtBQUVBLElBQU1nQixZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDTixJQUFELEVBQU9WLEtBQVA7QUFBQSxTQUFpQixVQUFBTyxNQUFNO0FBQUEsV0FBSUEsTUFBTSxDQUFDRyxJQUFELENBQU4sS0FBaUJWLEtBQXJCO0FBQUEsR0FBdkI7QUFBQSxDQUFyQjtBQUVBLElBQU1pQixVQUFVLEdBQUcsU0FBYkEsVUFBYSxDQUFBUCxJQUFJO0FBQUEsU0FBSSxVQUFBSCxNQUFNO0FBQUEsV0FBSUEsTUFBTSxDQUFDRyxJQUFELENBQU4sS0FBaUJDLFNBQXJCO0FBQUEsR0FBVjtBQUFBLENBQXZCO0FBRUEsSUFBTU8sUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQUMsSUFBSSxFQUFJO0FBQzlCLE1BQU1qQixPQUFPLEdBQUdwRCxRQUFRLENBQUNzRSxhQUFULENBQXVCLEtBQXZCLENBQWhCO0FBQ0FsQixTQUFPLENBQUNtQixTQUFSLEdBQW9CRixJQUFwQjtBQUNBLFNBQU9qQixPQUFPLENBQUNvQixXQUFmO0FBQ0QsQ0FKTSxDIiwiZmlsZSI6ImpzL21haW4tYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvanMvbWFpbi5qc1wiKTtcbiIsImV4cG9ydCBjb25zdCBjaGFpbkZyYW1lID0gY2FsbGJhY2sgPT5cbiAgbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobm93ID0+XG4gICAgICByZXNvbHZlKGNhbGxiYWNrID8gY2FsbGJhY2sobm93KSA6IG5vdylcbiAgICApXG4gIClcbiIsImltcG9ydCB7IFNjcm9sbFRvVG9wIH0gZnJvbSAnLi9zY3JvbGwtdG8tdG9wJ1xuaW1wb3J0IHsgTmF2aWdhdGlvblRvZ2dsZSB9IGZyb20gJy4vbmF2aWdhdGlvbi10b2dnbGUnXG5cbm5ldyBTY3JvbGxUb1RvcCgpLmluaXQoKVxubmV3IE5hdmlnYXRpb25Ub2dnbGUoKS5pbml0KClcbiIsImV4cG9ydCBjbGFzcyBNb2JpbGVJbmRpY2F0b3Ige1xuICBnZXQgaXNWaXNpYmxlICgpIHtcbiAgICByZXR1cm4gd2luZG93XG4gICAgICAuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmluaWNhdG9yKVxuICAgICAgLmdldFByb3BlcnR5VmFsdWUoJ2Rpc3BsYXknKSAhPT0gJ25vbmUnXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5pbmljYXRvciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtb2JpbGUtaW5kaWNhdG9yJylcbiAgfVxufVxuIiwiaW1wb3J0IHsgTW9iaWxlSW5kaWNhdG9yIH0gZnJvbSAnLi9tb2JpbGUtaW5kaWNhdG9yJ1xuaW1wb3J0IHsgY2hhaW5GcmFtZSB9IGZyb20gJy4vZG9tLXV0aWwnXG5cbmNvbnN0IENMQVNTX0NPTExBUFNFRCA9ICduYXZpZ2F0aW9uLS1jb2xsYXBzZWQnXG5jb25zdCBDTEFTU19BTklNQVRJTkcgPSAnbmF2aWdhdGlvbi0tYW5pbWF0aW5nJ1xuXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvblRvZ2dsZSB7XG4gIGdldCBpc0NvbGxhcHNlZCAoKSB7XG4gICAgcmV0dXJuIHRoaXMubmF2aWdhdGlvbi5jbGFzc0xpc3QuY29udGFpbnMoJ25hdmlnYXRpb24tLWNvbGxhcHNlZCcpXG4gIH1cblxuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy50b2dnbGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudS10b2dnbGUnKVxuICAgIHRoaXMubmF2aWdhdGlvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduYXZpZ2F0aW9uJylcbiAgICB0aGlzLm1lbnUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVudScpXG4gICAgdGhpcy5tb2JpbGVJbmRpY2F0b3IgPSBuZXcgTW9iaWxlSW5kaWNhdG9yKClcbiAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2VcbiAgfVxuXG4gIGluaXQgKCkge1xuICAgIHRoaXMudG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcylcbiAgfVxuXG4gIGhhbmRsZUV2ZW50IChldmVudCkge1xuICAgIHN3aXRjaCAoZXZlbnQudHlwZSkge1xuICAgICAgY2FzZSAnY2xpY2snOlxuICAgICAgICB0aGlzLmhhbmRsZUNsaWNrKGV2ZW50KVxuICAgICAgICBicmVha1xuXG4gICAgICBjYXNlICd0cmFuc2l0aW9uZW5kJzpcbiAgICAgICAgdGhpcy5oYW5kbGVUcmFuc2l0aW9uZW5kKGV2ZW50KVxuICAgICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBEbyBub3RoaW5nXG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ2xpY2sgKGV2ZW50KSB7XG4gICAgaWYgKHRoaXMubW9iaWxlSW5kaWNhdG9yLmlzVmlzaWJsZSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIH1cblxuICAgIGlmICghdGhpcy5pc0FuaW1hdGluZykge1xuICAgICAgdGhpcy50b2dnbGVNZW51KClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVUcmFuc2l0aW9uZW5kICgpIHtcbiAgICBpZiAoZXZlbnQudGFyZ2V0ID09PSB0aGlzLm5hdmlnYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZEFuaW1hdGlvbigpXG4gICAgfVxuICB9XG5cbiAgdG9nZ2xlTWVudSAoKSB7XG4gICAgdGhpcy5zdGFydEFuaW1hdGlvbigpLnRoZW4oKCkgPT4gdGhpcy5pc0NvbGxhcHNlZFxuICAgICAgPyB0aGlzLmNvbGxhcHNlKCkudGhlbigoKSA9PiB0aGlzLmV4cGFuZCgpKVxuICAgICAgOiB0aGlzLmV4cGFuZCgpLnRoZW4oKCkgPT4gdGhpcy5jb2xsYXBzZSgpKVxuICAgIClcbiAgfVxuXG4gIGV4cGFuZCAoKSB7XG4gICAgcmV0dXJuIGNoYWluRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uLnN0eWxlLmhlaWdodCA9IHRoaXMubWVudS5vZmZzZXRIZWlnaHQgKyAncHgnXG4gICAgICB0aGlzLm5hdmlnYXRpb24uY2xhc3NMaXN0LnJlbW92ZShDTEFTU19DT0xMQVBTRUQpXG4gICAgfSlcbiAgfVxuXG4gIGNvbGxhcHNlICgpIHtcbiAgICByZXR1cm4gY2hhaW5GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLm5hdmlnYXRpb24uc3R5bGUuaGVpZ2h0ID0gMFxuICAgICAgdGhpcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC5hZGQoQ0xBU1NfQ09MTEFQU0VEKVxuICAgIH0pXG4gIH1cblxuICBzdGFydEFuaW1hdGlvbiAoKSB7XG4gICAgcmV0dXJuIGNoYWluRnJhbWUoKCkgPT4ge1xuICAgICAgdGhpcy5pc0FuaW1hdGluZyA9IHRydWVcbiAgICAgIHRoaXMubmF2aWdhdGlvbi5jbGFzc0xpc3QuYWRkKENMQVNTX0FOSU1BVElORylcbiAgICAgIHRoaXMubmF2aWdhdGlvbi5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgdGhpcylcbiAgICB9KVxuICB9XG5cbiAgZW5kQW5pbWF0aW9uICgpIHtcbiAgICByZXR1cm4gY2hhaW5GcmFtZSgoKSA9PiB7XG4gICAgICB0aGlzLmlzQW5pbWF0aW5nID0gZmFsc2VcbiAgICAgIHRoaXMubmF2aWdhdGlvbi5zdHlsZS5oZWlnaHQgPSAnJ1xuICAgICAgdGhpcy5uYXZpZ2F0aW9uLmNsYXNzTGlzdC5yZW1vdmUoQ0xBU1NfQU5JTUFUSU5HKVxuICAgICAgdGhpcy5uYXZpZ2F0aW9uLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCB0aGlzKVxuICAgIH0pXG4gIH1cbn1cbiIsImltcG9ydCB7IGlzSW50ZXJzZWN0aW5nIH0gZnJvbSAnLi91dGlsJ1xuXG5leHBvcnQgY2xhc3MgU2Nyb2xsVG9Ub3Age1xuICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgdGhpcy5saW5rID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njcm9sbC10by10b3AnKVxuICB9XG5cbiAgaW5pdCAoKSB7XG4gICAgbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgdGhpcy50b2dnbGVBY3RpdmUoXG4gICAgICAgIGVudHJpZXMuc29tZShpc0ludGVyc2VjdGluZykgJiZcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0IDwgZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHRcbiAgICAgIClcbiAgICB9LCB7XG4gICAgICB0aHJlc2hvbGQ6IDFcbiAgICB9KS5vYnNlcnZlKHRoaXMubGluaylcblxuICAgIHRoaXMubGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMpXG4gIH1cblxuICB0b2dnbGVBY3RpdmUgKGlzQWN0aXZlKSB7XG4gICAgdGhpcy5saW5rLmNsYXNzTGlzdC50b2dnbGUoJ2Zvb3Rlcl9fc2Nyb2xsLXRvLXRvcC0tYWN0aXZlJywgaXNBY3RpdmUpXG4gIH1cblxuICBoYW5kbGVFdmVudCAoZXZlbnQpIHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBldmVudC50YXJnZXQuaGFzaFxuICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogMCwgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXG4gIH1cbn1cbiIsImV4cG9ydCBjb25zdCB0YXAgPSBjYWxsYmFjayA9PiB2YWx1ZSA9PiB7XG4gIGNhbGxiYWNrKHZhbHVlKVxuICByZXR1cm4gdmFsdWVcbn1cblxuZXhwb3J0IGNvbnN0IHJlbW92ZUVsZW1lbnQgPSBlbGVtZW50ID0+IGVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbGVtZW50KVxuXG5leHBvcnQgY29uc3QgaXNJbnRlcnNlY3RpbmcgPSAoeyBpc0ludGVyc2VjdGluZyB9KSA9PiBpc0ludGVyc2VjdGluZ1xuXG5leHBvcnQgY29uc3QgZ2V0VmFsdWUgPSAoLi4ucGF0aCkgPT4gb2JqZWN0ID0+IHBhdGgucmVkdWNlKChyZXN1bHQsIHByb3ApID0+IHtcbiAgcmV0dXJuIHR5cGVvZiByZXN1bHQgPT09ICdvYmplY3QnID8gcmVzdWx0W3Byb3BdIDogdW5kZWZpbmVkXG59LCBvYmplY3QpXG5cbmV4cG9ydCBjb25zdCBuZWdhdGUgPSB2YWx1ZSA9PiAhdmFsdWVcblxuZXhwb3J0IGNvbnN0IHBpcGUgPSBmbnMgPT4gdmFsdWUgPT4gZm5zLnJlZHVjZSgocmVzdWx0LCBjdXJyZW50KSA9PiBjdXJyZW50KHJlc3VsdCksIHZhbHVlKVxuXG5leHBvcnQgY29uc3QgaXNWYWx1ZUVxdWFsID0gKHByb3AsIHZhbHVlKSA9PiBvYmplY3QgPT4gb2JqZWN0W3Byb3BdID09PSB2YWx1ZVxuXG5leHBvcnQgY29uc3QgaXNWYWx1ZVNldCA9IHByb3AgPT4gb2JqZWN0ID0+IG9iamVjdFtwcm9wXSAhPT0gdW5kZWZpbmVkXG5cbmV4cG9ydCBjb25zdCBzYW5pdGl6ZSA9IGh0bWwgPT4ge1xuICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgZWxlbWVudC5pbm5lckhUTUwgPSBodG1sXG4gIHJldHVybiBlbGVtZW50LnRleHRDb250ZW50XG59XG4iXSwic291cmNlUm9vdCI6IiJ9