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

/***/ "./js/gui/tableRow.js":
/*!****************************!*\
  !*** ./js/gui/tableRow.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TableRow: () => (/* binding */ TableRow)\n/* harmony export */ });\n/* harmony import */ var _valueFields_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./valueFields.js */ \"./js/gui/valueFields.js\");\n/* harmony import */ var _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../picam/specifiers.js */ \"./js/picam/specifiers.js\");\n\n\n\n\n\nclass TableRow {\n\n    static textBox(text='',name='text') {\n        let box = document.createElement('span');\n        box.appendChild(document.createTextNode(text));\n        box.setAttribute('name',name);\n        return box;\n    }\n    static readonlyBox(value,name='') {\n        let box = document.createElement('input');\n        box.disabled=true;\n        box.value=value.toString();\n        box.setAttribute('name',name);\n        return box;\n    }\n\n    constructor(field = '') {\n        if(!_picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.has(field)) { throw new Error('No such field'); }\n        this.parameters = _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.spec(field);\n        this.fieldName = field;\n        this.input = new _valueFields_js__WEBPACK_IMPORTED_MODULE_0__.PropertyField(this.parameters);\n        this.current = null;\n    }\n\n    map(defaultValue) {\n        this.defBox = TableRow.readonlyBox(defaultValue.toString(),'default');\n        this.descBox = TableRow.textBox(this.parameters.help,'help');\n        this.inBox   = this.input.map('value');\n\n        let cells = [this.defBox,this.descBox,this.inBox].map ( cell => {\n            let td = document.createElement('td');\n            td.appendChild(cell);\n            return td;\n        });\n        let row = document.createElement('tr');\n        row.setAttribute('name',this.fieldName)\n        cells.forEach(cell => row.appendChild(cell));\n        return row;\n    }\n\n\n}\n\n//# sourceURL=webpack://mediamtx/./js/gui/tableRow.js?");

/***/ }),

/***/ "./js/gui/valueFields.js":
/*!*******************************!*\
  !*** ./js/gui/valueFields.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PropertyField: () => (/* binding */ PropertyField)\n/* harmony export */ });\n/* harmony import */ var _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../picam/specifiers.js */ \"./js/picam/specifiers.js\");\n\n\nclass PropertyField {\n\n    constructor(params,editable = true) {\n        this.parameters = params;\n        this.field = null;\n        this.callback = (v) => {};\n        this.name=params.name;\n        this.editable = editable;\n\n    }\n\n    get kind() { return this.parameters.kind; }\n\n    get value() {\n        switch(this.kind) {\n            case 'int':\n                return parseInt(this.field.value);\n            case 'number':\n                return parseFloat(this.field.value);\n            case 'bool':\n                return this.field.checked;\n            default:\n                return this.field.value;\n        }\n    }\n    set value(value) {\n        switch(this.kind) {\n            case 'bool':\n                this.field.checked=value;\n                break;\n            default:\n                this.field.value=value.toString();\n                break;\n        }\n    }\n\n\n\n    get isValid() {\n        console.log(`Checking validity: ${this.kind} : ${this.value}`);\n        switch(this.kind) {\n            case 'int':\n            case 'number':\n                return !Number.isNaN(this.value);\n            default:\n                return true;\n        }\n    }\n\n\n\n    map(name = ''){\n        const kind = this.parameters.kind;\n        switch(kind) {\n            case 'bool':\n                this.field=document.createElement('input');\n                this.field.type='checkbox';\n                break;\n            case 'int':\n            case 'number':\n                this.field=document.createElement('input');\n                this.field.type='number';\n                this.field.min=this.parameters.min;\n                this.field.max=this.parameters.max;\n                break;\n            case 'choose':\n                this.field=document.createElement('select');\n                this.field.multiple=false;\n                this.parameters.choices.forEach (v => {\n                        let o = document.createElement('option');\n                        o.text=v;\n                        this.field.add(o);\n                    }\n                );\n                break;\n        }\n        this.field.setAttribute('name',name);\n        this.field.disabled=!this.editable;\n        if(this.editable) {\n            this.field.disabled=true;\n            this.field.oninput = (ev) => {\n                console.log('On input fired');\n                if(this.isValid) {\n                    this.field.setCustomValidity('');\n                    this.callback(this.value);\n                }\n                else {\n                    this.field.setCustomValidity('Invalid entry');\n                    console.log(`Bad entry on ${name}`)\n                }\n            }\n        }\n\n        return this.field;\n    }\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/gui/valueFields.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gui_tableRow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gui/tableRow.js */ \"./js/gui/tableRow.js\");\n//import {MediaMTXInstance} from './parser.js';\n\n function start() {\n    let IP = \"192.168.0.132\";\n    let PORT = 9997;\n\n    let fields = ['rpiCameraWidth','rpiCameraHFlip','rpiCameraBrightness'];\n    let items = fields.map( f => {\n        console.log(`Making ${f}`);\n        //return new PropertyField(f);\n        return new _gui_tableRow_js__WEBPACK_IMPORTED_MODULE_0__.TableRow(f);\n    });\n\n    let tag = document.getElementById('inputs');\n    let table = document.createElement('table');\n    items.forEach(i => {\n        let tag=i.map('default');\n        table.appendChild(tag);\n    });\n    tag.appendChild(table);\n\n    /*\n    let m = new MediaMTXInstance(IP, PORT);\n    m.initialise().then( v => {\n        m.keys.forEach(key => {\n            let pair = m.get(key);\n            console.log(`${key} : ${pair.def} - ${pair.current}`)\n        });\n    });\n     */\n\n}\n\n\nwindow.onload = (event) => {\n    console.log('Starting');\n    start();\n    window.onload = (event) => {};\n}\n\n\n\n//# sourceURL=webpack://mediamtx/./js/index.js?");

/***/ }),

/***/ "./js/picam/properties.js":
/*!********************************!*\
  !*** ./js/picam/properties.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PiCamSettings: () => (/* binding */ PiCamSettings)\n/* harmony export */ });\n\n\nconst PiCamSettings = {\n//    rpiCameraCamID: ['int', 0, 256],\n    rpiCameraWidth: ['int', [0, 65536], 'screen width in pixels'],\n    rpiCameraHeight: ['int', [0, 65536], 'screen height in pixels'],\n    rpiCameraHFlip: ['bool', 'horizontally flip image'],\n    rpiCameraVFlip: ['bool', 'vertically flip image'],\n    rpiCameraBrightness: ['number', [-1.0, 1.0], 'image brightness'],\n    rpiCameraContrast: ['int', [0, 16], 'image contrast'],\n    rpiCameraSaturation: ['int', [0, 16], 'image saturation'],\n    rpiCameraSharpness: ['int', [0, 16], 'image sharpness'],\n    rpiCameraExposure: ['choose', ['normal', 'short', 'long', 'custom'], 'image exposure'],\n    rpiCameraAWB: ['choose', ['auto', 'incandescent', 'tungsten', 'flourescent', 'indoor', 'daylight', 'cloudy', 'custom'], 'lighting model'],\n    rpiCameraDenoise: ['choose', ['off', 'cdn_off', 'cdn_fast', 'cdn_hq'], 'noise correction'],\n    rpiCameraShutter: ['int', [0, 1048576], 'camera shutter speed'],\n    //   rpiCameraMetering: ['choose',['centre','spot','matrix','custom']],\n//    rpiCameraGain: ['number',-16.90,16.0],\n//    rpiCameraEV: ['number',-10.0,10.0],\n    rpiCameraAfMode: ['choose', ['auto', 'manual', 'continuous'], 'autofocus mode'],\n    rpiCameraAfRange: ['choose', ['normal', 'macro', 'full'], 'autofocus range'],\n    rpiCameraAfSpeed: ['choose', ['normal', 'fast'], 'autofocus speed'],\n    rpiCameraLensPosition: ['number', [0.0, 256.0], 'lens position (1 / distance to object)']\n};\n\n\n//# sourceURL=webpack://mediamtx/./js/picam/properties.js?");

/***/ }),

/***/ "./js/picam/specifiers.js":
/*!********************************!*\
  !*** ./js/picam/specifiers.js ***!
  \********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PiCam: () => (/* binding */ PiCam)\n/* harmony export */ });\n/* harmony import */ var _properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties.js */ \"./js/picam/properties.js\");\n\n\n\nclass Specifier {\n    constructor(args = []) {\n        this.kind = args[0] || '';\n        this.help = args[args.length-1] || '';\n\n        let min = NaN;\n        let max = NaN;\n        let choices = [];\n\n        switch (this.kind) {\n            case 'int':\n                min = parseInt(args[1][0]);\n                max = parseInt(args[1][1]);\n                break;\n            case 'number':\n                min = parseFloat(args[1][0]);\n                max = parseFloat(args[1][1]);\n                break;\n            case 'choose':\n                choices = args[1];\n                break;\n            default:\n                break;\n        }\n        this.min = min;\n        this.max = max;\n        this.choices = choices;\n    }\n\n    toString() {\n        switch (this.kind) {\n            case 'choose':\n                return `${this.kind} [${this.help}] : ${this.choices}`;\n            case 'bool':\n                return `${this.kind} [${this.help}]`;\n            default:\n                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`\n        }\n    }\n}\n\n\nclass _PiCam {\n\n    constructor() {\n        this.props=new Map();\n\n        Object.entries(_properties_js__WEBPACK_IMPORTED_MODULE_0__.PiCamSettings).forEach(kv => {\n            let [k,v] = kv;\n            this.props.set(k,new Specifier(v));\n        });\n    }\n\n    has(key) { return this.props.has(key); }\n    spec(key) { return this.props.get(key); }\n\n    kind(key) { return this.spec(key).kind; }\n    help(key) { return this.spec(key).help; }\n    max(key) { return this.spec(key).max; }\n    min(key) { return this.spec(key).min; }\n    choices(key) { return this.spec(key).choices || []; }\n}\n\nconst PiCam = new _PiCam();\n\n\n//# sourceURL=webpack://mediamtx/./js/picam/specifiers.js?");

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