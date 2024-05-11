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

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MediaMTX: () => (/* binding */ MediaMTX)\n/* harmony export */ });\n/* harmony import */ var _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restWrapper.js */ \"./js/restWrapper.js\");\n\n\n\n\nclass MediaMTX {\n\n    constructor(ip = '127.0.0.1',\n                port = '9997',\n                cameraName = \"cam\") {\n        this.device=`http://${ip}:${port}`;\n        this.camera = cameraName;\n    }\n\n    async get(which = _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS) {\n        let cam = (which===_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS) ? this.camera : '';\n        let mtx= new _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTXAPI(this.device,which,cam);\n        return await mtx.read();\n    }\n\n    async set(which = _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS, values = {}) {\n        let mtx= new _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTXAPI(this.device,which, this.camera);\n        return await mtx.write(values);\n    }\n\n    async getDefaults() {\n        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS)\n    }\n\n    async getPaths(){\n        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS)\n    }\n\n    async getGlobal(){\n        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.GLOBAL)\n    }\n\n    async setPath(values = {}){\n        return await this.set(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS, values)\n    }\n\n\n\n\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/api.js?");

/***/ }),

/***/ "./js/gui/applicationGUI.js":
/*!**********************************!*\
  !*** ./js/gui/applicationGUI.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ApplicationGUI: () => (/* binding */ ApplicationGUI)\n/* harmony export */ });\n/* harmony import */ var _tableRow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableRow.js */ \"./js/gui/tableRow.js\");\n/* harmony import */ var _picam_parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../picam/parser.js */ \"./js/picam/parser.js\");\n/* harmony import */ var _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../picam/specifiers.js */ \"./js/picam/specifiers.js\");\n\n\n\n\n\n\n\n\nclass ApplicationGUI {\n\n\n\n\n\n    constructor(IP = '192.168.0.203', PORT = 9997) {\n        this.IP = IP;\n        this.PORT = PORT;\n        this.mtx = null;\n        this.tag = document.getElementById('inputs');\n        console.log(`PICAM is [${_picam_specifiers_js__WEBPACK_IMPORTED_MODULE_2__.PiCam.self()}]`)\n        this.fields = _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_2__.PiCam.keys(); //['rpiCameraWidth','rpiCameraHFlip','rpiCameraBrightness'];\n    }\n\n    async load() {\n        this.mtx = new _picam_parser_js__WEBPACK_IMPORTED_MODULE_1__.MediaMTXInstance(this.IP, this.PORT);\n        await this.mtx.initialise();\n        this.render();\n\n\n    }\n\n    render() {\n        while(this.tag.firstChild) {\n            this.tag.removeChild(this.tag.firstChild);\n        }\n\n        let table = document.createElement('table');\n        this.fields.forEach( f => {\n            let row = new _tableRow_js__WEBPACK_IMPORTED_MODULE_0__.TableRow(f);\n            let property = this.mtx.get(f);\n            console.log(`${f} : ${property.toString()}`);\n            table.appendChild(row.map(property));\n        });\n        this.tag.appendChild(table);\n\n    }\n}\n\n//# sourceURL=webpack://mediamtx/./js/gui/applicationGUI.js?");

/***/ }),

/***/ "./js/gui/tableRow.js":
/*!****************************!*\
  !*** ./js/gui/tableRow.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   TableRow: () => (/* binding */ TableRow)\n/* harmony export */ });\n/* harmony import */ var _valueFields_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./valueFields.js */ \"./js/gui/valueFields.js\");\n/* harmony import */ var _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../picam/specifiers.js */ \"./js/picam/specifiers.js\");\n\n\n\n\n\nclass TableRow {\n\n    static textBox(text='',name='text') {\n        let box = document.createElement('span');\n        box.appendChild(document.createTextNode(text));\n        box.setAttribute('name',name);\n        return box;\n    }\n    static readonlyBox(value,name='') {\n        let box = document.createElement('input');\n        box.disabled=true;\n        box.value=value.toString();\n        box.setAttribute('name',name);\n        return box;\n    }\n\n    constructor(field = '') {\n        if(!_picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.has(field)) { throw new Error('No such field'); }\n        this.parameters = _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.spec(field);\n        this.fieldName = field;\n        this.input = new _valueFields_js__WEBPACK_IMPORTED_MODULE_0__.PropertyField(this.parameters);\n        this.input.oninput = (ev) => {};\n        this.current = null;\n    }\n\n    get onchange() { return this.input.oninput(); }\n    set onchange(cb) { this.input.oninput=cb; }\n\n\n    get value() { return this.input.value; }\n    set value(v) { this.input.value=v; }\n\n    map(property) {\n        this.defBox = TableRow.readonlyBox(property.def.toString(),'default');\n        this.descBox = TableRow.textBox(this.parameters.help,'help');\n        this.inBox   = this.input.map('value');\n        this.reset   = document.createElement('button');\n        this.reset.appendChild(document.createTextNode('Revert'));\n        this.reset.setAttribute('type','button');\n        this.reset.onclick = (ev) => { this.value=defaultValue; };\n\n        let cells = [this.defBox,this.descBox,this.inBox,this.reset].map ( cell => {\n            let td = document.createElement('td');\n            td.appendChild(cell);\n            return td;\n        });\n        let row = document.createElement('tr');\n        row.setAttribute('name',this.fieldName)\n        cells.forEach(cell => row.appendChild(cell));\n        return row;\n    }\n\n\n\n}\n\n//# sourceURL=webpack://mediamtx/./js/gui/tableRow.js?");

/***/ }),

/***/ "./js/gui/valueFields.js":
/*!*******************************!*\
  !*** ./js/gui/valueFields.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PropertyField: () => (/* binding */ PropertyField)\n/* harmony export */ });\n/* harmony import */ var _picam_specifiers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../picam/specifiers.js */ \"./js/picam/specifiers.js\");\n\n\n\nfunction isNull(x) { return x===null; }\nfunction isUndefined(x) { return x===undefined; }\nfunction isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }\n\n\n\nclass PropertyField {\n\n    constructor(params,editable = true) {\n        this.parameters = params;\n        this.field = null;\n        this.oninput = (v) => {};\n        this.name=params.name;\n        this.editable = editable;\n        this.tempValue = null;\n        this.mapped = false;\n\n    }\n\n    #updateDOM() {\n        switch (this.kind) {\n            case 'bool':\n                this.field.checked = this.tempValue;\n                break;\n            default:\n                this.field.value = this.tempValue.toString();\n                break;\n        }\n    }\n\n    get kind() { return this.parameters.kind; }\n\n    get value() {\n\n        switch(this.kind) {\n            case 'int':\n                return parseInt(this.field.value);\n            case 'number':\n                return parseFloat(this.field.value);\n            case 'bool':\n                return this.field.checked;\n            default:\n                return this.field.value;\n        }\n    }\n    set value(value) {\n        this.tempValue=value;\n        if(!isNull(this.field))  this.#updateDOM();\n    }\n\n\n\n    get isValid() {\n        console.log(`Checking validity: ${this.kind} : ${this.value}`);\n        switch(this.kind) {\n            case 'int':\n            case 'number':\n                return !Number.isNaN(this.value);\n            default:\n                return true;\n        }\n    }\n\n\n\n    map(value = '',name = ''){\n        const kind = this.parameters.kind;\n        switch(kind) {\n            case 'bool':\n                this.field=document.createElement('input');\n                this.field.type='checkbox';\n                break;\n            case 'int':\n            case 'number':\n                this.field=document.createElement('input');\n                this.field.type='number';\n                this.field.min=this.parameters.min;\n                this.field.max=this.parameters.max;\n                break;\n            case 'choose':\n                this.field=document.createElement('select');\n                this.field.multiple=false;\n                this.parameters.choices.forEach (v => {\n                        let o = document.createElement('option');\n                        o.text=v;\n                        this.field.add(o);\n                    }\n                );\n                break;\n        }\n        this.field.setAttribute('name',name);\n        this.field.disabled=!this.editable;\n        if(this.editable) {\n            this.field.disabled=true;\n            this.field.oninput = (ev) => {\n                console.log('On input fired');\n                if(this.isValid) {\n                    this.field.setCustomValidity('');\n                    let event = new InputEvent('input', {\n                        data : this.value\n                    });\n                    this.oninput(event);\n                }\n                else {\n                    this.field.setCustomValidity('Invalid entry');\n                    console.log(`Bad entry on ${name}`)\n                }\n            }\n        }\n        this.value=value;\n        return this.field;\n    }\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/gui/valueFields.js?");

/***/ }),

/***/ "./js/index.js":
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _gui_applicationGUI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gui/applicationGUI.js */ \"./js/gui/applicationGUI.js\");\n\n\n\nfunction start() {\n    let IP = \"192.168.0.203\";\n    let PORT = 9997;\n\n    let appGUI = new _gui_applicationGUI_js__WEBPACK_IMPORTED_MODULE_0__.ApplicationGUI(IP, PORT);\n    appGUI.load().then( v => {\n        console.log('GUI loaded')\n    });\n}\n\n\nwindow.onload = (event) => {\n    console.log('Starting');\n    start();\n    window.onload = (event) => {};\n}\n\n\n\n//# sourceURL=webpack://mediamtx/./js/index.js?");

/***/ }),

/***/ "./js/picam/parser.js":
/*!****************************!*\
  !*** ./js/picam/parser.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MediaMTXInstance: () => (/* binding */ MediaMTXInstance)\n/* harmony export */ });\n/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ \"./js/api.js\");\n\n\n\n\nclass Property {\n    constructor(def,current) {\n        this.def=def;\n        this.current=current;\n    }\n\n    toString() { `default=[${this.def}] current=[${this.current}]`; }\n}\n\nclass MediaMTXInstance {\n\n    constructor(ip = '192.168.0.203', port = 9997) {\n        this.ip = ip;\n        this.port = port.toString();\n        this.keys = [];\n        this.defaultValues = new Map();\n        this.currentValues = new Map();\n    }\n\n    async getDefaults() {\n        let mtx = new _api_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTX(this.ip, this.port);\n        let json = await mtx.getDefaults() || {};\n\n        this.keys = Object.keys(json).filter(key => /^rpi/.test(key)).toSorted();\n        this.defaultValues.clear();\n        this.keys.forEach(key => this.defaultValues.set(key, json[key]));\n    }\n\n    async getCurrents() {\n        let mtx = new _api_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTX(this.ip, this.port);\n        let json = await mtx.getPaths() || {};\n        this.currentValues.clear();\n        this.keys.forEach(key => {\n            let value = Object.hasOwn(json,key) ? json[key] : this.defaultValues.get(key);\n            this.currentValues.set(key, value);\n        });\n    }\n\n    async initialise() {\n        await this.getDefaults();\n        await this.getCurrents();\n    }\n\n    get(key) {\n        return new Property(this.defaultValues.get(key), this.currentValues.get(key));\n    }\n\n    set(key, value) {\n        this.currentValues.set(key, value);\n    }\n\n    reset(key) {\n        this.currentValues.set(key, this.defaultValues.get(key));\n    }\n    resetAll() {\n        this.keys.forEach( key => this.reset(key));\n    }\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/picam/parser.js?");

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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   PiCam: () => (/* binding */ PiCam)\n/* harmony export */ });\n/* harmony import */ var _properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties.js */ \"./js/picam/properties.js\");\n\n\n\nclass Specifier {\n    constructor(args = []) {\n        this.kind = args[0] || '';\n        this.help = args[args.length-1] || '';\n\n        let min = NaN;\n        let max = NaN;\n        let choices = [];\n\n        switch (this.kind) {\n            case 'int':\n                min = parseInt(args[1][0]);\n                max = parseInt(args[1][1]);\n                break;\n            case 'number':\n                min = parseFloat(args[1][0]);\n                max = parseFloat(args[1][1]);\n                break;\n            case 'choose':\n                choices = args[1];\n                break;\n            default:\n                break;\n        }\n        this.min = min;\n        this.max = max;\n        this.choices = choices;\n    }\n\n    toString() {\n        switch (this.kind) {\n            case 'choose':\n                return `${this.kind} [${this.help}] : ${this.choices}`;\n            case 'bool':\n                return `${this.kind} [${this.help}]`;\n            default:\n                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`\n        }\n    }\n}\n\n\nclass PiCam {\n\n    static _self = undefined;\n\n    constructor() {\n        this.props=new Map();\n\n        Object.entries(_properties_js__WEBPACK_IMPORTED_MODULE_0__.PiCamSettings).forEach(kv => {\n            let [k,v] = kv;\n            this.props.set(k,new Specifier(v));\n        });\n        this._keys = [...this.props.keys()];\n    }\n\n    static keys() { return this.self()._keys; }\n\n    static has(key) { return this.self().props.has(key); }\n    static spec(key) { return this.self().props.get(key); }\n\n    static kind(key) { return this.spec(key).kind; }\n    static help(key) { return this.spec(key).help; }\n    static max(key) { return this.spec(key).max; }\n    static min(key) { return this.spec(key).min; }\n    static choices(key) { return this.spec(key).choices || []; }\n\n    static self() {\n        if(PiCam._self===undefined) PiCam._self=new PiCam();\n        return PiCam._self;\n    }\n}\n\n\n\n\n//# sourceURL=webpack://mediamtx/./js/picam/specifiers.js?");

/***/ }),

/***/ "./js/rest.js":
/*!********************!*\
  !*** ./js/rest.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ HTTPRequests)\n/* harmony export */ });\n\n\n\nclass HTTPRequests {\n\n    constructor() {}\n\n    headers() {\n        return new Headers({\n            \"Connection\": \"keep-alive\",\n            \"Content-Type\": \"application/json\",\n            \"Accept-Encoding\": \"gzip, deflate, br\"\n        });\n    }\n\n    options(method = \"GET\") {\n        let accept = (method === \"POST\") ? \"application/json\" : \"*/*\";\n        let hdr = this.headers();\n        hdr.append(\"Accept\", accept);\n        return {\n            method: method,\n            cache: \"no-cache\",\n            credentials: \"same-origin\",\n            headers: hdr\n        };\n    }\n\n    async handle(url, options) {\n        const response = await fetch(url, options);\n        if (!response.ok) {\n            throw new Error(`Network : ${response.status}`);\n        }\n        return response.json();\n    }\n\n    async get(url) {\n        let opts = this.options(\"GET\");\n        return await this.handle(url, opts);\n    }\n\n    async patch(url, data) {\n        let opts = this.options(\"PATCH\");\n        opts.body = JSON.stringify(data);\n        return await this.handle(url, opts);\n    }\n\n}\n\n\n//# sourceURL=webpack://mediamtx/./js/rest.js?");

/***/ }),

/***/ "./js/restWrapper.js":
/*!***************************!*\
  !*** ./js/restWrapper.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   MediaMTXAPI: () => (/* binding */ MediaMTXAPI),\n/* harmony export */   baseURLS: () => (/* binding */ baseURLS)\n/* harmony export */ });\n/* harmony import */ var _rest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest.js */ \"./js/rest.js\");\n\n\n\n\nconst baseURLS = ((obj) => Object.freeze(obj)) ({\n    BASE : \"/v3/config\",\n    GLOBAL : \"global\",\n    DEFAULTS : \"pathdefaults\",\n    PATHS : \"paths\",\n    LIST: \"paths/list\"\n});\n\nconst baseActions = ((obj) => Object.freeze(obj)) ({\n    READ : \"get\",\n    WRITE : \"patch\"\n});\n\n\n\nclass MediaMTXAPI {\n\n    constructor(\n        device = 'http://127.0.0.1:9997',\n        which = baseURLS.PATHS,\n        name = \"\") {\n        this.which = which;\n        this.name = name;\n        this.root = `${device}${baseURLS.BASE}/${this.which}`;\n    }\n\n    #url(action = baseActions.READ) {\n        switch (action) {\n            case baseActions.READ:\n                let cam=(this.which===baseURLS.PATHS) ? this.name : '';\n                return `${this.root}/get/${cam}`;\n            case baseActions.WRITE:\n                return `${this.root}/patch/${this.name}`;\n            default:\n                throw Error();\n        }\n    }\n\n    async read() {\n        let u = this.#url(baseActions.READ);\n        return await (new _rest_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().get(u));\n    }\n\n    async write(data){\n        let u = this.#url(baseActions.WRITE);\n        return await (new _rest_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]().patch(u,data));\n    }\n\n\n\n\n}\n\n\n\n//# sourceURL=webpack://mediamtx/./js/restWrapper.js?");

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