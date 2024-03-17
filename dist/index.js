/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/dataTable.js":
/*!*************************!*\
  !*** ./js/dataTable.js ***!
  \*************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   RpiProperty: () => (/* binding */ RpiProperty)\n/* harmony export */ });\n\n\n\nclass Specifier {\n    constructor(args = []) {\n        this.kind = args[0] || '';\n        this.help = args[args.length-1] || '';\n\n        let min = NaN;\n        let max = NaN;\n        let choices = [];\n\n        switch (this.kind) {\n            case 'int':\n                min = parseInt(args[1][0]);\n                max = parseInt(args[1][1]);\n                break;\n            case 'number':\n                min = parseFloat(args[1][0]);\n                max = parseFloat(args[1][1]);\n                break;\n            case 'choose':\n                choices = args[1];\n                break;\n            default:\n                break;\n        }\n        this.min = min;\n        this.max = max;\n        this.choices = choices;\n    }\n\n    toString() {\n        switch (this.kind) {\n            case 'choose':\n                return `${this.kind} [${this.help}] : ${this.choices}`;\n            case 'bool':\n                return `${this.kind} [${this.help}]`;\n            default:\n                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`\n        }\n    }\n}\n\nclass RpiParameters {\n\n    static #boxKinds = {\n//    rpiCameraCamID: ['int', 0, 256],\n        rpiCameraWidth: ['int', [0, 65536], 'screen width in pixels'],\n        rpiCameraHeight: ['int', [0, 65536], 'screen height in pixels'],\n        rpiCameraHFlip: ['bool', 'horizontally flip image'],\n        rpiCameraVFlip: ['bool', 'vertically flip image'],\n        rpiCameraBrightness: ['number', [-1.0, 1.0], 'image brightness'],\n        rpiCameraContrast: ['int', [0, 16], 'image contrast'],\n        rpiCameraSaturation: ['int', [0, 16], 'image saturation'],\n        rpiCameraSharpness: ['int', [0, 16], 'image sharpness'],\n        rpiCameraExposure: ['choose', ['normal', 'short', 'long', 'custom'], 'image exposure'],\n        rpiCameraAWB: ['choose', ['auto', 'incandescent', 'tungsten', 'flourescent', 'indoor', 'daylight', 'cloudy', 'custom'], 'lighting model'],\n        rpiCameraDenoise: ['choose', ['off', 'cdn_off', 'cdn_fast', 'cdn_hq'], 'noise correction'],\n        rpiCameraShutter: ['int', [0, 1048576], 'camera shutter speed'],\n        //   rpiCameraMetering: ['choose',['centre','spot','matrix','custom']],\n//    rpiCameraGain: ['number',-16.90,16.0],\n//    rpiCameraEV: ['number',-10.0,10.0],\n        rpiCameraAfMode: ['choose', ['auto', 'manual', 'continuous'], 'autofocus mode'],\n        rpiCameraAfRange: ['choose', ['normal', 'macro', 'full'], 'autofocus range'],\n        rpiCameraAfSpeed: ['choose', ['normal', 'fast'], 'autofocus speed'],\n        rpiCameraLensPosition: ['number', [0.0, 256.0], 'lens position (1 / distance to object)']\n    }\n\n    static properties;\n\n    static {\n        this.properties=new Map();\n        for (const [k,v] of Object.entries(this.#boxKinds)) { this.properties.set(k,new Specifier(v)); }\n    }\n\n    static get(field = '') {\n        return this.properties.get(field);\n    }\n    static has(field = '') {\n        return this.properties.has(field);\n    }\n\n}\n\n\nclass RpiProperty {\n\n    get kind() { return this.parameters.kind; }\n\n     get value() {\n        switch(this.kind) {\n            case 'int':\n                return parseInt(this.field.value);\n            case 'number':\n                return parseFloat(this.field.value);\n            case 'bool':\n                return this.field.checked;\n            default:\n                return this.field.value;\n        }\n    }\n     set value(value) {\n        switch(this.kind) {\n            case 'bool':\n                this.field.checked=value;\n                break;\n            default:\n                this.field.value=value.toString();\n                break;\n        }\n    }\n\n     get isValid() {\n        switch(this.kind) {\n            case 'int':\n            case 'number':\n                return !Number.isNaN(this.value);\n            default:\n                return true;\n        }\n    }\n\n    constructor(field='') {\n       if(!RpiParameters.has(field)) { throw new Error('No such field'); }\n       this.parameters = RpiParameters.get(field);\n       this.field = new HTMLElement();\n       this.callback = (v) => {};\n\n    }\n\n    map(name = '') {\n        const kind = this.parameters.kind;\n        switch(kind) {\n            case 'bool':\n                this.field=document.createElement('input');\n                this.field.type='checkbox';\n                break;\n            case 'int':\n            case 'number':\n                this.field=document.createElement('input');\n                this.field.type='number';\n                this.field.min=this.parameters.min;\n                this.field.max=this.parameters.max;\n                break;\n            case 'choose':\n                this.field=document.createElement('select');\n                this.field.multiple=false;\n                this.parameters.choices.forEach (v => {\n                    let o = document.createElement('option');\n                    o.text=v;\n                    this.field.add(o);\n                    }\n                );\n                break;\n        }\n        this.field.name=name;\n        this.field.oninput = (ev) => {\n            if(this.isValid) {\n                this.field.setCustomValidity('');\n                this.callback(this.value);\n            }\n            else {\n                this.field.setCustomValidity('Invalid entry');\n            }\n        }\n        return this.field;\n    }\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/dataTable.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _dataTable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataTable.js */ \"./js/dataTable.js\");\n//import {MediaMTXInstance} from './parser.js';\n\n function start() {\n    let IP = \"192.168.0.132\";\n    let PORT = 9997;\n\n    let fields = ['rpiCameraWidth','rpiCameraHFlip','rpiCameraBrightness'];\n    let items = fields.map( f => {\n        console.log(`Making ${f}`);\n        return new _dataTable_js__WEBPACK_IMPORTED_MODULE_0__.RpiProperty(f);\n    });\n\n    items.forEach(i => {\n        console.log(i.toString());\n        document.body.appendChild(i.map());\n    });\n\n    /*\n    let m = new MediaMTXInstance(IP, PORT);\n    m.initialise().then( v => {\n        m.keys.forEach(key => {\n            let pair = m.get(key);\n            console.log(`${key} : ${pair.def} - ${pair.current}`)\n        });\n    });\n     */\n\n}\n\n\nwindow.onload = (event) => {\n    console.log('Starting');\n    start();\n    window.onload = (event) => {};\n}\n\n\n\n//# sourceURL=webpack://mediamtx/./js/index.js?");

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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./js/index.js");
/******/ 	
/******/ })()
;