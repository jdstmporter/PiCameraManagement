/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaMTX: () => (/* binding */ MediaMTX)
/* harmony export */ });
/* harmony import */ var _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./restWrapper.js */ "./js/restWrapper.js");




class MediaMTX {

    constructor(ip = '127.0.0.1',
                port = '9997',
                cameraName = "cam") {
        this.device=`http://${ip}:${port}`;
        this.camera = cameraName;
    }

    async get(which = _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS) {
        let cam = (which===_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS) ? this.camera : '';
        let mtx= new _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTXAPI(this.device,which,cam);
        return await mtx.read();
    }

    async set(which = _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS, values = {}) {
        let mtx= new _restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTXAPI(this.device,which, this.camera);
        return await mtx.write(values);
    }

    async getDefaults() {
        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.DEFAULTS);
    }

    async getPaths(){
        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS);
    }

    async getGlobal(){
        return await this.get(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.GLOBAL);
    }

    async setPath(values = {}){
        return await this.set(_restWrapper_js__WEBPACK_IMPORTED_MODULE_0__.baseURLS.PATHS, values);
    }




}


/***/ }),

/***/ "./js/defaults/defaults.js":
/*!*********************************!*\
  !*** ./js/defaults/defaults.js ***!
  \*********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Defaults: () => (/* binding */ Defaults)
/* harmony export */ });


/**
 *
 * @name Defaults
 *
 * @constant
 * @type {Object.<string, string>}
 * @default
 * @description Provides standard constants used throughout the application
 * @todo Replace the implementation as an object with something more dynamic
 */

const Defaults = {
    IP_ADDRESS: '192.168.0.203',
    PORT: '9997',
    CAMERA_NAME: 'cam'
};

/***/ }),

/***/ "./js/gui/applicationGUI.js":
/*!**********************************!*\
  !*** ./js/gui/applicationGUI.js ***!
  \**********************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ApplicationGUI: () => (/* binding */ ApplicationGUI)
/* harmony export */ });
/* harmony import */ var _tableRow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tableRow.js */ "./js/gui/tableRow.js");
/* harmony import */ var _picam_structure_properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../picam/structure/properties.js */ "./js/picam/structure/properties.js");
/* harmony import */ var _picam_dataTable_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../picam/dataTable.js */ "./js/picam/dataTable.js");
/* harmony import */ var _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../picam/structure/picam.js */ "./js/picam/structure/picam.js");
/* harmony import */ var _defaults_defaults_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../defaults/defaults.js */ "./js/defaults/defaults.js");









class ApplicationGUI {

    static Headers = [
        'Default',
        'Description',
        'Value',
        '',
        ''
    ];

    constructor(mode = _picam_structure_properties_js__WEBPACK_IMPORTED_MODULE_1__.Modes.Normal) {
        this.IP = _defaults_defaults_js__WEBPACK_IMPORTED_MODULE_4__.Defaults.IP_ADDRESS;
        this.PORT = _defaults_defaults_js__WEBPACK_IMPORTED_MODULE_4__.Defaults.PORT;
        this._mode = mode;

        this.properties = new _picam_dataTable_js__WEBPACK_IMPORTED_MODULE_2__.PiPropertyValues(this.IP,this.PORT);
        this.rows = {};

        this.tag = document.getElementById('inputs');
        window.console.log(`PICAM is [${_picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_3__.PiCam}]`);
    }

    async load() {

        let states = await this.properties.load(this.mode);
        this.rows = {};
        window.console.log(`Mode is ${this.mode.toString()}`);
        window.console.log(`Keys are ${_picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_3__.PiCam.keys(this.mode)}`);
        states.forEach(state => {
            let row = new _tableRow_js__WEBPACK_IMPORTED_MODULE_0__.TableRow(state);
            this.rows[row.fieldName] = row;
        });
        this.render();


    }

    /**
     *
     * @returns {Modes}
     */
    get mode() { return this._mode; }
    set mode(value) {
        this._mode=value;
        this.render();
    }

    render() {
        while(this.tag.firstChild) {
            this.tag.removeChild(this.tag.firstChild);
        }

        let table = document.createElement('table');
        let headerRow = document.createElement('tr');
        ApplicationGUI.Headers.forEach( text => {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(text));
            headerRow.appendChild(th);
        });
        table.appendChild(headerRow);


        _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_3__.PiCam.keys(this.mode).forEach( key => table.appendChild(this.rows[key].html));
        this.tag.appendChild(table);
    }
}

/***/ }),

/***/ "./js/gui/tableRow.js":
/*!****************************!*\
  !*** ./js/gui/tableRow.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TableRow: () => (/* binding */ TableRow)
/* harmony export */ });
/* harmony import */ var _valueFields_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./valueFields.js */ "./js/gui/valueFields.js");
/* harmony import */ var _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../picam/structure/picam.js */ "./js/picam/structure/picam.js");





class TableRow {

    static textBox(text='',name='text') {
        let box = document.createElement('span');
        box.appendChild(document.createTextNode(text));
        box.setAttribute('name',name);
        return box;
    }
    static readonlyBox(value,name='') {
        let box = document.createElement('input');
        box.disabled=true;
        box.value=value.toString();
        box.setAttribute('name',name);
        return box;
    }

    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {HTMLButtonElement}
     */
    static button(message, name='') {
        let button = document.createElement('button');
        button.appendChild(document.createTextNode(message));
        button.setAttribute('type','button');
        button.setAttribute('name',name);
        return button;
    }

    constructor(state) {
        let field = state.key || "";
        if(!_picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.has(field)) { throw new Error(`No such field as ${field}`); }
        this.parameters = _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.spec(field);
        this.fieldName = field;
        this.state = state;
        this.html=this.map();
    }



    /**
     * @desc Callback
     * @returns {*}
     */
    get onchange() { return this.input.oninput(); }
    //set onchange(cb) { this.input.oninput=cb; }


    get value() { return this.input.value; }
    set value(v) { this.input.value=v; }

    #reload() {
        this.input.value=this.state.currentValue;
    }

    map() {
        this.defBox = TableRow.readonlyBox(this.state.defaultValue.toString(),'default');
        this.descBox = TableRow.textBox(this.parameters.help,'help');

        this.input = new _valueFields_js__WEBPACK_IMPORTED_MODULE_0__.PropertyField(this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };

        this.inBox   = this.input.field;

        this.resetD   = TableRow.button('To default','defButton');
        this.resetD.onclick = (ev) => {
            this.state.toDefault();
            this.#reload();
        };

        this.resetC   = TableRow.button('To current','currButton');
        this.resetC.onclick = (ev) => {
            this.state.toCurrent();
            this.#reload();
        };


        let cells = [this.defBox,this.descBox,this.inBox,this.resetD, this.resetC].map ( cell => {
            let td = document.createElement('td');
            td.appendChild(cell);
            return td;
        });
        let row = document.createElement('tr');
        row.setAttribute('name',this.fieldName);
        cells.forEach(cell => row.appendChild(cell));
        return row;
    }



}

/***/ }),

/***/ "./js/gui/valueFields.js":
/*!*******************************!*\
  !*** ./js/gui/valueFields.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertyField: () => (/* binding */ PropertyField)
/* harmony export */ });
/* harmony import */ var _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../picam/structure/picam.js */ "./js/picam/structure/picam.js");



function isNull(x) { return x===null; }
function isUndefined(x) { return x===undefined; }
function isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }



class PropertyField {



    static makeField(params) {
        const kind = params.kind;
        let field;
        switch(kind) {
            case 'bool':
                field=document.createElement('input');
                field.type='checkbox';
                break;
            case 'int':
            case 'number':
                field=document.createElement('input');
                field.type='number';
                field.min=params.min;
                field.max=params.max;
                break;
            case 'choose':
                field=document.createElement('select');
                field.multiple=false;
                params.choices.forEach (v => {
                        let o = document.createElement('option');
                        o.text=v;
                        field.add(o);
                    }
                );
                break;
            default:
                field=document.createElement('input');
                field.type='text';
                break;
        }
        field.setAttribute('name',params.name);
        return field;
    }

    constructor(params, value) {
        this.parameters = params;
        this.name=params.name;
        this.field = PropertyField.makeField(params);
        this.oninput = (v) => {};

        this.valueToLoad = value;

        this.field.oninput = (ev) => {
            window.console.log('On input fired');
            if(this.isValid) {
                this.field.setCustomValidity('');
                this.oninput(this.value);
            }
            else {
                this.field.setCustomValidity('Invalid entry');
                window.console.log(`Bad entry on ${name}`);
            }
        };
        this.value=value;
    }

    get kind() { return this.parameters.kind; }

    get value() {
        switch(this.kind) {
            case 'int':
                return parseInt(this.field.value);
            case 'number':
                return parseFloat(this.field.value);
            case 'bool':
                return this.field.checked;
            default:
                return this.field.value;
        }
    }
    set value(value) {
        switch (this.kind) {
            case 'bool':
                this.field.checked = value;
                break;
            default:
                this.field.value = value;
                break;
        }
    }



    get isValid() {
        window.console.log(`Checking validity: ${this.kind} : ${this.value}`);
        switch(this.kind) {
            case 'int':
            case 'number':
                return !Number.isNaN(this.value);
            default:
                return true;
        }
    }




}


/***/ }),

/***/ "./js/picam/dataTable.js":
/*!*******************************!*\
  !*** ./js/picam/dataTable.js ***!
  \*******************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PiPropertyValues: () => (/* binding */ PiPropertyValues)
/* harmony export */ });
/* harmony import */ var _structure_picam_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./structure/picam.js */ "./js/picam/structure/picam.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parser.js */ "./js/picam/parser.js");
/* harmony import */ var _gui_tableRow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../gui/tableRow.js */ "./js/gui/tableRow.js");







class PropertyState {
    #key;
    #edited;
    #default;
    #current;
    #modified;

    /**
     *
     * @param {string} key
     * @param {Property} property
     */
    constructor(key,property) {
        this.#key = key;
        this.#default = property.def;
        this.#current = property.current;
        this.#edited = this.#current;
        this.#modified = false;
    }

    /**
     *
     * @returns {string}
     */
    get key() { return this.#key; }

    /**
     *
     * @returns {boolean}
     */
    get isModified() { return this.#modified; }

    /**
     *
      * @returns {any}
     */
    get editedValue() { return this.#edited; }

    /**
     *
     * @param {any} value
     */
    set editedValue(value) {
        this.#edited = value;
        this.#modified = true;
    }

    get currentValue() { return this.#current; }
    get defaultValue() { return this.#default; }

    toDefault(){
        this.#edited = this.#default;
        this.#modified = true;
    }

    toCurrent() {
        this.#edited = this.#current;
        this.#modified = false;
    }
1

    commit() {
        this.#current = this.#edited;
        this.#modified = false;
        return new _parser_js__WEBPACK_IMPORTED_MODULE_1__.Property(this.defaultValue, this.currentValue);
    }
}

class PiPropertyValues {

    /**
     *
     * @param {string} ip
     * @param {string} port
     */
    constructor(ip, port) {
        this.mtx = new _parser_js__WEBPACK_IMPORTED_MODULE_1__.MediaMTXInstance(ip,port);
    }

    /**
     *
     * @param {Modes} mode
     * @returns {Promise<*>}
     */
    async load(mode) {
        await this.mtx.initialise();
        return _structure_picam_js__WEBPACK_IMPORTED_MODULE_0__.PiCam.keys(mode).map( key => {
            let property = this.mtx.get(key);
            return new PropertyState(key,property);
        });
    }

    save(states = []) {
        let changed = states.filter(state => state.isModified);
        let output = {};
        changed.forEach( state => {
            output[state.key] = state.commit();
        });
    }







}


/***/ }),

/***/ "./js/picam/parser.js":
/*!****************************!*\
  !*** ./js/picam/parser.js ***!
  \****************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaMTXInstance: () => (/* binding */ MediaMTXInstance),
/* harmony export */   Property: () => (/* binding */ Property)
/* harmony export */ });
/* harmony import */ var _api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api.js */ "./js/api.js");




class Property {
    constructor(def,current) {
        this.def=def;
        this.current=current;
    }

    toString() { `default=[${this.def}] current=[${this.current}]`; }
}

class MediaMTXInstance {

    constructor(ip, port) {
        this.ip = ip;
        this.port = port.toString();
        this.keys = [];
        this.defaultValues = new Map();
        this.currentValues = new Map();
    }

    async getDefaults() {
        let mtx = new _api_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTX(this.ip, this.port);
        let json = await mtx.getDefaults() || {};

        this.keys = Object.keys(json).filter(key => /^rpi/.test(key)).toSorted();
        this.defaultValues.clear();
        this.keys.forEach(key => this.defaultValues.set(key, json[key]));
    }

    async getCurrents() {
        let mtx = new _api_js__WEBPACK_IMPORTED_MODULE_0__.MediaMTX(this.ip, this.port);
        let json = await mtx.getPaths() || {};
        this.currentValues.clear();
        this.keys.forEach(key => {
            let value = Object.hasOwn(json,key) ? json[key] : this.defaultValues.get(key);
            this.currentValues.set(key, value);
        });
    }

    async initialise() {
        await this.getDefaults();
        await this.getCurrents();
    }

    get(key) {
        return new Property(this.defaultValues.get(key), this.currentValues.get(key));
    }

    set(key, value) {
        this.currentValues.set(key, value);
    }

    reset(key) {
        this.currentValues.set(key, this.defaultValues.get(key));
    }
    resetAll() {
        this.keys.forEach( key => this.reset(key));
    }
}


/***/ }),

/***/ "./js/picam/structure/picam.js":
/*!*************************************!*\
  !*** ./js/picam/structure/picam.js ***!
  \*************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PiCam: () => (/* binding */ PiCam)
/* harmony export */ });
/* harmony import */ var _propertySpecifier_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./propertySpecifier.js */ "./js/picam/structure/propertySpecifier.js");
/* harmony import */ var _properties_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./properties.js */ "./js/picam/structure/properties.js");






class _PiCam {

    constructor() {
        this.props = _propertySpecifier_js__WEBPACK_IMPORTED_MODULE_0__.PropertySpecifier.load();
    }

    allKeys() { return [...this.props.keys()]; }

    keys(mode = _properties_js__WEBPACK_IMPORTED_MODULE_1__.Modes.Normal) {
        return mode.keys;
    }

    has(key,mode = _properties_js__WEBPACK_IMPORTED_MODULE_1__.Modes.Advanced) {
        return this.keys(mode).includes(key);
    }

    spec(key) {
        return this.props.get(key);
    }

    kind(key) {
        return this.spec(key).kind;
    }

    help(key) {
        return this.spec(key).help;
    }

    max(key) {
        return this.spec(key).max;
    }

    min(key) {
        return this.spec(key).min;
    }

    choices(key) {
        return this.spec(key).choices || [];
    }

}

let PiCam = new _PiCam();





/***/ }),

/***/ "./js/picam/structure/properties.js":
/*!******************************************!*\
  !*** ./js/picam/structure/properties.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Modes: () => (/* binding */ Modes),
/* harmony export */   PiCamSettings: () => (/* binding */ PiCamSettings)
/* harmony export */ });


const PiCamSettings = {
//    rpiCameraCamID: ['int', 0, 256],
    rpiCameraWidth: ['int', [0, 65536], 'screen width in pixels'],
    rpiCameraHeight: ['int', [0, 65536], 'screen height in pixels'],
    rpiCameraHFlip: ['bool', 'horizontally flip image'],
    rpiCameraVFlip: ['bool', 'vertically flip image'],
    rpiCameraBrightness: ['number', [-1.0, 1.0], 'image brightness'],
    rpiCameraContrast: ['int', [0, 16], 'image contrast'],
    rpiCameraSaturation: ['int', [0, 16], 'image saturation'],
    rpiCameraSharpness: ['int', [0, 16], 'image sharpness'],
    rpiCameraExposure: ['choose', ['normal', 'short', 'long', 'custom'], 'image exposure'],
    rpiCameraAWB: ['choose', ['auto', 'incandescent', 'tungsten', 'flourescent', 'indoor', 'daylight', 'cloudy', 'custom'], 'lighting model'],
    rpiCameraDenoise: ['choose', ['off', 'cdn_off', 'cdn_fast', 'cdn_hq'], 'noise correction'],
    rpiCameraShutter: ['int', [0, 1048576], 'camera shutter speed'],
    //   rpiCameraMetering: ['choose',['centre','spot','matrix','custom']],
//    rpiCameraGain: ['number',-16.90,16.0],
//    rpiCameraEV: ['number',-10.0,10.0],
    rpiCameraAfMode: ['choose', ['auto', 'manual', 'continuous'], 'autofocus mode'],
    rpiCameraAfRange: ['choose', ['normal', 'macro', 'full'], 'autofocus range'],
    rpiCameraAfSpeed: ['choose', ['normal', 'fast'], 'autofocus speed'],
    rpiCameraLensPosition: ['number', [0.0, 256.0], 'lens position (1 / distance to object)']
};

class Modes {
    static Normal = new Modes('Normal');
    static Advanced = new Modes('Advanced');

    static modeKeys  = {
        Normal: [
            'rpiCameraWidth',
            'rpiCameraHeight',
            'rpiCameraBrightness',
            'rpiCameraContrast',
            'rpiCameraSaturation',
            'rpiCameraSaturation',
            'rpiCameraAWB',
            'rpiCameraAfMode',
            'rpiCameraLensPosition'
        ],
        Advanced: Object.keys(PiCamSettings)
    };

    static all() { return [this.Normal, this.Advanced]; }

    constructor(name) {
        this.name=name;
    }

    toString() { return `Mode.${this.name}`; }

    get keys() {
        return Modes.modeKeys[this.name];
    }
}

/***/ }),

/***/ "./js/picam/structure/propertySpecifier.js":
/*!*************************************************!*\
  !*** ./js/picam/structure/propertySpecifier.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PropertySpecifier: () => (/* binding */ PropertySpecifier)
/* harmony export */ });
/* harmony import */ var _properties_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./properties.js */ "./js/picam/structure/properties.js");



class PropertySpecifier {
    constructor(args = []) {
        this.kind = args[0] || '';
        this.help = args[args.length-1] || '';

        let min = NaN;
        let max = NaN;
        let choices = [];

        switch (this.kind) {
            case 'int':
                min = parseInt(args[1][0]);
                max = parseInt(args[1][1]);
                break;
            case 'number':
                min = parseFloat(args[1][0]);
                max = parseFloat(args[1][1]);
                break;
            case 'choose':
                choices = args[1];
                break;
            default:
                break;
        }
        this.min = min;
        this.max = max;
        this.choices = choices;
    }

    toString() {
        switch (this.kind) {
            case 'choose':
                return `${this.kind} [${this.help}] : ${this.choices}`;
            case 'bool':
                return `${this.kind} [${this.help}]`;
            default:
                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`;
        }
    }

    static keys() {
        return Object.keys(_properties_js__WEBPACK_IMPORTED_MODULE_0__.PiCamSettings);
    }

    static load() {

        let props=new Map();
        Object.keys(_properties_js__WEBPACK_IMPORTED_MODULE_0__.PiCamSettings).forEach(key => {
                props.set(key,new PropertySpecifier(_properties_js__WEBPACK_IMPORTED_MODULE_0__.PiCamSettings[key]));
        });
        return props;
    }
}



/***/ }),

/***/ "./js/rest.js":
/*!********************!*\
  !*** ./js/rest.js ***!
  \********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ HTTPRequests)
/* harmony export */ });



class HTTPRequests {

    constructor() {}

    /**
     *
     * @returns {Headers}
     */
    headers() {
        return new Headers({
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate, br"
        });
    }

    /**
     *
     * @param {string} method
     * @returns {object}
     */
    options(method = "GET") {
        let accept = (method === "POST") ? "application/json" : "*/*";
        let hdr = this.headers();
        hdr.append("Accept", accept);
        return {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            headers: hdr
        };
    }

    /**
     *
     * @param {string} url
     * @param {object} options
     * @returns {Promise<any>}
     */
    async handle(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Network : ${response.status}`);
        }
        return response.json();
    }

    /**
     *
     * @param {string} url
     * @returns {Promise<*>}
     */
    async get(url) {
        let opts = this.options("GET");
        return await this.handle(url, opts);
    }

    /**
     *
     * @param {string} url
     * @param {object} data
     * @returns {Promise<*>}
     */
    async patch(url, data) {
        let opts = this.options("PATCH");
        opts.body = JSON.stringify(data);
        return await this.handle(url, opts);
    }

}


/***/ }),

/***/ "./js/restWrapper.js":
/*!***************************!*\
  !*** ./js/restWrapper.js ***!
  \***************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MediaMTXAPI: () => (/* binding */ MediaMTXAPI),
/* harmony export */   baseURLS: () => (/* binding */ baseURLS)
/* harmony export */ });
/* harmony import */ var _rest_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rest.js */ "./js/rest.js");




const baseURLS = ((obj) => Object.freeze(obj)) ({
    BASE : "/v3/config",
    GLOBAL : "global",
    DEFAULTS : "pathdefaults",
    PATHS : "paths",
    LIST: "paths/list"
});

const baseActions = ((obj) => Object.freeze(obj)) ({
    READ : "get",
    WRITE : "patch"
});



class MediaMTXAPI {

    constructor(
        device = 'http://127.0.0.1:9997',
        which = baseURLS.PATHS,
        name = "") {
        this.which = which;
        this.name = name;
        this.root = `${device}${baseURLS.BASE}/${this.which}`;
    }

    #url(action = baseActions.READ) {
        switch (action) {
            case baseActions.READ:
                let cam=(this.which===baseURLS.PATHS) ? this.name : '';
                return `${this.root}/get/${cam}`;
            case baseActions.WRITE:
                return `${this.root}/patch/${this.name}`;
            default:
                throw Error();
        }
    }

    async read() {
        let u = this.#url(baseActions.READ);
        return await (new _rest_js__WEBPACK_IMPORTED_MODULE_0__["default"]().get(u));
    }

    async write(data){
        let u = this.#url(baseActions.WRITE);
        return await (new _rest_js__WEBPACK_IMPORTED_MODULE_0__["default"]().patch(u,data));
    }




}



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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _gui_applicationGUI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gui/applicationGUI.js */ "./js/gui/applicationGUI.js");



function start() {
    let appGUI = new _gui_applicationGUI_js__WEBPACK_IMPORTED_MODULE_0__.ApplicationGUI();
    appGUI.load().then( _ => {
        window.console.log('GUI loaded');
    });
}


window.onload = (_) => {
    window.console.log('Starting');
    start();
    window.onload = (_) => {};
};


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFcUM7O0FBRUo7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPLEVBQUUsY0FBYyxHQUFHLFdBQVc7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVSxPQUFPLElBQUk7QUFDL0M7QUFDQSwwQkFBMEIsVUFBVSxTQUFTLFVBQVU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixnREFBWTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGdEQUFZO0FBQ3RDOzs7OztBQUtBOzs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnVEOzs7QUFHdkQ7QUFDQSxxQkFBcUIsa0VBQWM7QUFDbkM7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lZGlhbXR4Ly4vanMvYXBpLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZGVmYXVsdHMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvYXBwbGljYXRpb25HVUkuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvdGFibGVSb3cuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvdmFsdWVGaWVsZHMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9kYXRhVGFibGUuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9wYXJzZXIuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9zdHJ1Y3R1cmUvcHJvcGVydGllcy5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3BpY2FtL3N0cnVjdHVyZS9wcm9wZXJ0eVNwZWNpZmllci5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3Jlc3QuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9yZXN0V3JhcHBlci5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9tZWRpYW10eC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9tZWRpYW10eC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYmFzZVVSTFMsIE1lZGlhTVRYQVBJIH0gZnJvbSBcIi4vcmVzdFdyYXBwZXIuanNcIjtcblxuZXhwb3J0IHtNZWRpYU1UWH07XG5cbmNsYXNzIE1lZGlhTVRYIHtcblxuICAgIGNvbnN0cnVjdG9yKGlwID0gJzEyNy4wLjAuMScsXG4gICAgICAgICAgICAgICAgcG9ydCA9ICc5OTk3JyxcbiAgICAgICAgICAgICAgICBjYW1lcmFOYW1lID0gXCJjYW1cIikge1xuICAgICAgICB0aGlzLmRldmljZT1gaHR0cDovLyR7aXB9OiR7cG9ydH1gO1xuICAgICAgICB0aGlzLmNhbWVyYSA9IGNhbWVyYU5hbWU7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0KHdoaWNoID0gYmFzZVVSTFMuREVGQVVMVFMpIHtcbiAgICAgICAgbGV0IGNhbSA9ICh3aGljaD09PWJhc2VVUkxTLlBBVEhTKSA/IHRoaXMuY2FtZXJhIDogJyc7XG4gICAgICAgIGxldCBtdHg9IG5ldyBNZWRpYU1UWEFQSSh0aGlzLmRldmljZSx3aGljaCxjYW0pO1xuICAgICAgICByZXR1cm4gYXdhaXQgbXR4LnJlYWQoKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXQod2hpY2ggPSBiYXNlVVJMUy5ERUZBVUxUUywgdmFsdWVzID0ge30pIHtcbiAgICAgICAgbGV0IG10eD0gbmV3IE1lZGlhTVRYQVBJKHRoaXMuZGV2aWNlLHdoaWNoLCB0aGlzLmNhbWVyYSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBtdHgud3JpdGUodmFsdWVzKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXREZWZhdWx0cygpIHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KGJhc2VVUkxTLkRFRkFVTFRTKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRQYXRocygpe1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXQoYmFzZVVSTFMuUEFUSFMpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEdsb2JhbCgpe1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXQoYmFzZVVSTFMuR0xPQkFMKTtcbiAgICB9XG5cbiAgICBhc3luYyBzZXRQYXRoKHZhbHVlcyA9IHt9KXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuc2V0KGJhc2VVUkxTLlBBVEhTLCB2YWx1ZXMpO1xuICAgIH1cblxuXG5cblxufVxuIiwiZXhwb3J0IHsgRGVmYXVsdHMgfTtcblxuLyoqXG4gKlxuICogQG5hbWUgRGVmYXVsdHNcbiAqXG4gKiBAY29uc3RhbnRcbiAqIEB0eXBlIHtPYmplY3QuPHN0cmluZywgc3RyaW5nPn1cbiAqIEBkZWZhdWx0XG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgc3RhbmRhcmQgY29uc3RhbnRzIHVzZWQgdGhyb3VnaG91dCB0aGUgYXBwbGljYXRpb25cbiAqIEB0b2RvIFJlcGxhY2UgdGhlIGltcGxlbWVudGF0aW9uIGFzIGFuIG9iamVjdCB3aXRoIHNvbWV0aGluZyBtb3JlIGR5bmFtaWNcbiAqL1xuXG5jb25zdCBEZWZhdWx0cyA9IHtcbiAgICBJUF9BRERSRVNTOiAnMTkyLjE2OC4wLjIwMycsXG4gICAgUE9SVDogJzk5OTcnLFxuICAgIENBTUVSQV9OQU1FOiAnY2FtJ1xufTsiLCJpbXBvcnQge1RhYmxlUm93fSBmcm9tIFwiLi90YWJsZVJvdy5qc1wiO1xuaW1wb3J0IHtNb2Rlc30gZnJvbSBcIi4uL3BpY2FtL3N0cnVjdHVyZS9wcm9wZXJ0aWVzLmpzXCI7XG5cbmV4cG9ydCB7QXBwbGljYXRpb25HVUl9O1xuXG5pbXBvcnQge1BpUHJvcGVydHlWYWx1ZXN9IGZyb20gJy4uL3BpY2FtL2RhdGFUYWJsZS5qcyc7XG5pbXBvcnQge1BpQ2FtfSBmcm9tIFwiLi4vcGljYW0vc3RydWN0dXJlL3BpY2FtLmpzXCI7XG5pbXBvcnQge0RlZmF1bHRzfSBmcm9tIFwiLi4vZGVmYXVsdHMvZGVmYXVsdHMuanNcIjtcblxuY2xhc3MgQXBwbGljYXRpb25HVUkge1xuXG4gICAgc3RhdGljIEhlYWRlcnMgPSBbXG4gICAgICAgICdEZWZhdWx0JyxcbiAgICAgICAgJ0Rlc2NyaXB0aW9uJyxcbiAgICAgICAgJ1ZhbHVlJyxcbiAgICAgICAgJycsXG4gICAgICAgICcnXG4gICAgXTtcblxuICAgIGNvbnN0cnVjdG9yKG1vZGUgPSBNb2Rlcy5Ob3JtYWwpIHtcbiAgICAgICAgdGhpcy5JUCA9IERlZmF1bHRzLklQX0FERFJFU1M7XG4gICAgICAgIHRoaXMuUE9SVCA9IERlZmF1bHRzLlBPUlQ7XG4gICAgICAgIHRoaXMuX21vZGUgPSBtb2RlO1xuXG4gICAgICAgIHRoaXMucHJvcGVydGllcyA9IG5ldyBQaVByb3BlcnR5VmFsdWVzKHRoaXMuSVAsdGhpcy5QT1JUKTtcbiAgICAgICAgdGhpcy5yb3dzID0ge307XG5cbiAgICAgICAgdGhpcy50YWcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaW5wdXRzJyk7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgUElDQU0gaXMgWyR7UGlDYW19XWApO1xuICAgIH1cblxuICAgIGFzeW5jIGxvYWQoKSB7XG5cbiAgICAgICAgbGV0IHN0YXRlcyA9IGF3YWl0IHRoaXMucHJvcGVydGllcy5sb2FkKHRoaXMubW9kZSk7XG4gICAgICAgIHRoaXMucm93cyA9IHt9O1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYE1vZGUgaXMgJHt0aGlzLm1vZGUudG9TdHJpbmcoKX1gKTtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBLZXlzIGFyZSAke1BpQ2FtLmtleXModGhpcy5tb2RlKX1gKTtcbiAgICAgICAgc3RhdGVzLmZvckVhY2goc3RhdGUgPT4ge1xuICAgICAgICAgICAgbGV0IHJvdyA9IG5ldyBUYWJsZVJvdyhzdGF0ZSk7XG4gICAgICAgICAgICB0aGlzLnJvd3Nbcm93LmZpZWxkTmFtZV0gPSByb3c7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuXG5cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtNb2Rlc31cbiAgICAgKi9cbiAgICBnZXQgbW9kZSgpIHsgcmV0dXJuIHRoaXMuX21vZGU7IH1cbiAgICBzZXQgbW9kZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLl9tb2RlPXZhbHVlO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH1cblxuICAgIHJlbmRlcigpIHtcbiAgICAgICAgd2hpbGUodGhpcy50YWcuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy50YWcucmVtb3ZlQ2hpbGQodGhpcy50YWcuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgdGFibGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0YWJsZScpO1xuICAgICAgICBsZXQgaGVhZGVyUm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndHInKTtcbiAgICAgICAgQXBwbGljYXRpb25HVUkuSGVhZGVycy5mb3JFYWNoKCB0ZXh0ID0+IHtcbiAgICAgICAgICAgIGxldCB0aCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RoJyk7XG4gICAgICAgICAgICB0aC5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSh0ZXh0KSk7XG4gICAgICAgICAgICBoZWFkZXJSb3cuYXBwZW5kQ2hpbGQodGgpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGFibGUuYXBwZW5kQ2hpbGQoaGVhZGVyUm93KTtcblxuXG4gICAgICAgIFBpQ2FtLmtleXModGhpcy5tb2RlKS5mb3JFYWNoKCBrZXkgPT4gdGFibGUuYXBwZW5kQ2hpbGQodGhpcy5yb3dzW2tleV0uaHRtbCkpO1xuICAgICAgICB0aGlzLnRhZy5hcHBlbmRDaGlsZCh0YWJsZSk7XG4gICAgfVxufSIsImltcG9ydCB7IFByb3BlcnR5RmllbGQgfSBmcm9tICcuL3ZhbHVlRmllbGRzLmpzJztcbmltcG9ydCB7UGlDYW19IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanNcIjtcblxuZXhwb3J0IHsgVGFibGVSb3cgfTtcblxuY2xhc3MgVGFibGVSb3cge1xuXG4gICAgc3RhdGljIHRleHRCb3godGV4dD0nJyxuYW1lPSd0ZXh0Jykge1xuICAgICAgICBsZXQgYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpO1xuICAgICAgICBib3guYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodGV4dCkpO1xuICAgICAgICBib3guc2V0QXR0cmlidXRlKCduYW1lJyxuYW1lKTtcbiAgICAgICAgcmV0dXJuIGJveDtcbiAgICB9XG4gICAgc3RhdGljIHJlYWRvbmx5Qm94KHZhbHVlLG5hbWU9JycpIHtcbiAgICAgICAgbGV0IGJveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0Jyk7XG4gICAgICAgIGJveC5kaXNhYmxlZD10cnVlO1xuICAgICAgICBib3gudmFsdWU9dmFsdWUudG9TdHJpbmcoKTtcbiAgICAgICAgYm94LnNldEF0dHJpYnV0ZSgnbmFtZScsbmFtZSk7XG4gICAgICAgIHJldHVybiBib3g7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge0hUTUxCdXR0b25FbGVtZW50fVxuICAgICAqL1xuICAgIHN0YXRpYyBidXR0b24obWVzc2FnZSwgbmFtZT0nJykge1xuICAgICAgICBsZXQgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgICAgIGJ1dHRvbi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCdidXR0b24nKTtcbiAgICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnbmFtZScsbmFtZSk7XG4gICAgICAgIHJldHVybiBidXR0b247XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3Ioc3RhdGUpIHtcbiAgICAgICAgbGV0IGZpZWxkID0gc3RhdGUua2V5IHx8IFwiXCI7XG4gICAgICAgIGlmKCFQaUNhbS5oYXMoZmllbGQpKSB7IHRocm93IG5ldyBFcnJvcihgTm8gc3VjaCBmaWVsZCBhcyAke2ZpZWxkfWApOyB9XG4gICAgICAgIHRoaXMucGFyYW1ldGVycyA9IFBpQ2FtLnNwZWMoZmllbGQpO1xuICAgICAgICB0aGlzLmZpZWxkTmFtZSA9IGZpZWxkO1xuICAgICAgICB0aGlzLnN0YXRlID0gc3RhdGU7XG4gICAgICAgIHRoaXMuaHRtbD10aGlzLm1hcCgpO1xuICAgIH1cblxuXG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBDYWxsYmFja1xuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldCBvbmNoYW5nZSgpIHsgcmV0dXJuIHRoaXMuaW5wdXQub25pbnB1dCgpOyB9XG4gICAgLy9zZXQgb25jaGFuZ2UoY2IpIHsgdGhpcy5pbnB1dC5vbmlucHV0PWNiOyB9XG5cblxuICAgIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMuaW5wdXQudmFsdWU7IH1cbiAgICBzZXQgdmFsdWUodikgeyB0aGlzLmlucHV0LnZhbHVlPXY7IH1cblxuICAgICNyZWxvYWQoKSB7XG4gICAgICAgIHRoaXMuaW5wdXQudmFsdWU9dGhpcy5zdGF0ZS5jdXJyZW50VmFsdWU7XG4gICAgfVxuXG4gICAgbWFwKCkge1xuICAgICAgICB0aGlzLmRlZkJveCA9IFRhYmxlUm93LnJlYWRvbmx5Qm94KHRoaXMuc3RhdGUuZGVmYXVsdFZhbHVlLnRvU3RyaW5nKCksJ2RlZmF1bHQnKTtcbiAgICAgICAgdGhpcy5kZXNjQm94ID0gVGFibGVSb3cudGV4dEJveCh0aGlzLnBhcmFtZXRlcnMuaGVscCwnaGVscCcpO1xuXG4gICAgICAgIHRoaXMuaW5wdXQgPSBuZXcgUHJvcGVydHlGaWVsZCh0aGlzLnBhcmFtZXRlcnMsdGhpcy5zdGF0ZS5lZGl0ZWRWYWx1ZSk7XG4gICAgICAgIHRoaXMuaW5wdXQub25pbnB1dCA9ICh2YWx1ZSkgPT4geyB0aGlzLnN0YXRlLmVkaXRlZFZhbHVlID0gdmFsdWU7IH07XG5cbiAgICAgICAgdGhpcy5pbkJveCAgID0gdGhpcy5pbnB1dC5maWVsZDtcblxuICAgICAgICB0aGlzLnJlc2V0RCAgID0gVGFibGVSb3cuYnV0dG9uKCdUbyBkZWZhdWx0JywnZGVmQnV0dG9uJyk7XG4gICAgICAgIHRoaXMucmVzZXRELm9uY2xpY2sgPSAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudG9EZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiNyZWxvYWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc2V0QyAgID0gVGFibGVSb3cuYnV0dG9uKCdUbyBjdXJyZW50JywnY3VyckJ1dHRvbicpO1xuICAgICAgICB0aGlzLnJlc2V0Qy5vbmNsaWNrID0gKGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRvQ3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy4jcmVsb2FkKCk7XG4gICAgICAgIH07XG5cblxuICAgICAgICBsZXQgY2VsbHMgPSBbdGhpcy5kZWZCb3gsdGhpcy5kZXNjQm94LHRoaXMuaW5Cb3gsdGhpcy5yZXNldEQsIHRoaXMucmVzZXRDXS5tYXAgKCBjZWxsID0+IHtcbiAgICAgICAgICAgIGxldCB0ZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RkJyk7XG4gICAgICAgICAgICB0ZC5hcHBlbmRDaGlsZChjZWxsKTtcbiAgICAgICAgICAgIHJldHVybiB0ZDtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByb3cgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0cicpO1xuICAgICAgICByb3cuc2V0QXR0cmlidXRlKCduYW1lJyx0aGlzLmZpZWxkTmFtZSk7XG4gICAgICAgIGNlbGxzLmZvckVhY2goY2VsbCA9PiByb3cuYXBwZW5kQ2hpbGQoY2VsbCkpO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuXG5cbn0iLCJpbXBvcnQge1BpQ2FtfSBmcm9tICcuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanMnO1xuZXhwb3J0IHtQcm9wZXJ0eUZpZWxkfTtcblxuZnVuY3Rpb24gaXNOdWxsKHgpIHsgcmV0dXJuIHg9PT1udWxsOyB9XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh4KSB7IHJldHVybiB4PT09dW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCh4KSB7IHJldHVybiBpc051bGwoeCkgfHwgaXNVbmRlZmluZWQoeCk7IH1cblxuXG5cbmNsYXNzIFByb3BlcnR5RmllbGQge1xuXG5cblxuICAgIHN0YXRpYyBtYWtlRmllbGQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGtpbmQgPSBwYXJhbXMua2luZDtcbiAgICAgICAgbGV0IGZpZWxkO1xuICAgICAgICBzd2l0Y2goa2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgZmllbGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBmaWVsZC50eXBlPSdjaGVja2JveCc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBmaWVsZD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpO1xuICAgICAgICAgICAgICAgIGZpZWxkLnR5cGU9J251bWJlcic7XG4gICAgICAgICAgICAgICAgZmllbGQubWluPXBhcmFtcy5taW47XG4gICAgICAgICAgICAgICAgZmllbGQubWF4PXBhcmFtcy5tYXg7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaG9vc2UnOlxuICAgICAgICAgICAgICAgIGZpZWxkPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NlbGVjdCcpO1xuICAgICAgICAgICAgICAgIGZpZWxkLm11bHRpcGxlPWZhbHNlO1xuICAgICAgICAgICAgICAgIHBhcmFtcy5jaG9pY2VzLmZvckVhY2ggKHYgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IG8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG8udGV4dD12O1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuYWRkKG8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmllbGQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgICAgICAgICBmaWVsZC50eXBlPSd0ZXh0JztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBmaWVsZC5zZXRBdHRyaWJ1dGUoJ25hbWUnLHBhcmFtcy5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1zO1xuICAgICAgICB0aGlzLm5hbWU9cGFyYW1zLm5hbWU7XG4gICAgICAgIHRoaXMuZmllbGQgPSBQcm9wZXJ0eUZpZWxkLm1ha2VGaWVsZChwYXJhbXMpO1xuICAgICAgICB0aGlzLm9uaW5wdXQgPSAodikgPT4ge307XG5cbiAgICAgICAgdGhpcy52YWx1ZVRvTG9hZCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZmllbGQub25pbnB1dCA9IChldikgPT4ge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKCdPbiBpbnB1dCBmaXJlZCcpO1xuICAgICAgICAgICAgaWYodGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmlucHV0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnSW52YWxpZCBlbnRyeScpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgQmFkIGVudHJ5IG9uICR7bmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy52YWx1ZT12YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQga2luZCgpIHsgcmV0dXJuIHRoaXMucGFyYW1ldGVycy5raW5kOyB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZmllbGQudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLmNoZWNrZWQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5jaGVja2VkID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbiAgICBnZXQgaXNWYWxpZCgpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBDaGVja2luZyB2YWxpZGl0eTogJHt0aGlzLmtpbmR9IDogJHt0aGlzLnZhbHVlfWApO1xuICAgICAgICBzd2l0Y2godGhpcy5raW5kKSB7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gIU51bWJlci5pc05hTih0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn1cbiIsIlxuaW1wb3J0IHsgUGlDYW0gfSBmcm9tICcuL3N0cnVjdHVyZS9waWNhbS5qcyc7XG5pbXBvcnQge01lZGlhTVRYSW5zdGFuY2UsIFByb3BlcnR5fSBmcm9tIFwiLi9wYXJzZXIuanNcIjtcbmltcG9ydCB7VGFibGVSb3d9IGZyb20gXCIuLi9ndWkvdGFibGVSb3cuanNcIjtcblxuZXhwb3J0IHsgUGlQcm9wZXJ0eVZhbHVlcyB9O1xuXG5jbGFzcyBQcm9wZXJ0eVN0YXRlIHtcbiAgICAja2V5O1xuICAgICNlZGl0ZWQ7XG4gICAgI2RlZmF1bHQ7XG4gICAgI2N1cnJlbnQ7XG4gICAgI21vZGlmaWVkO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihrZXkscHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy4ja2V5ID0ga2V5O1xuICAgICAgICB0aGlzLiNkZWZhdWx0ID0gcHJvcGVydHkuZGVmO1xuICAgICAgICB0aGlzLiNjdXJyZW50ID0gcHJvcGVydHkuY3VycmVudDtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jY3VycmVudDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IGtleSgpIHsgcmV0dXJuIHRoaXMuI2tleTsgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgaXNNb2RpZmllZCgpIHsgcmV0dXJuIHRoaXMuI21vZGlmaWVkOyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldCBlZGl0ZWRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuI2VkaXRlZDsgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQgZWRpdGVkVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuI21vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFZhbHVlKCkgeyByZXR1cm4gdGhpcy4jY3VycmVudDsgfVxuICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7IHJldHVybiB0aGlzLiNkZWZhdWx0OyB9XG5cbiAgICB0b0RlZmF1bHQoKXtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jZGVmYXVsdDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvQ3VycmVudCgpIHtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jY3VycmVudDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICB9XG4xXG5cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHRoaXMuI2N1cnJlbnQgPSB0aGlzLiNlZGl0ZWQ7XG4gICAgICAgIHRoaXMuI21vZGlmaWVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkodGhpcy5kZWZhdWx0VmFsdWUsIHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG59XG5cbmNsYXNzIFBpUHJvcGVydHlWYWx1ZXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9ydFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlwLCBwb3J0KSB7XG4gICAgICAgIHRoaXMubXR4ID0gbmV3IE1lZGlhTVRYSW5zdGFuY2UoaXAscG9ydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vZGVzfSBtb2RlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgbG9hZChtb2RlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubXR4LmluaXRpYWxpc2UoKTtcbiAgICAgICAgcmV0dXJuIFBpQ2FtLmtleXMobW9kZSkubWFwKCBrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5tdHguZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5U3RhdGUoa2V5LHByb3BlcnR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZShzdGF0ZXMgPSBbXSkge1xuICAgICAgICBsZXQgY2hhbmdlZCA9IHN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuaXNNb2RpZmllZCk7XG4gICAgICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICAgICAgY2hhbmdlZC5mb3JFYWNoKCBzdGF0ZSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRbc3RhdGUua2V5XSA9IHN0YXRlLmNvbW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuXG5cbn1cbiIsImltcG9ydCB7TWVkaWFNVFh9IGZyb20gJy4uL2FwaS5qcyc7XG5cbmV4cG9ydCB7TWVkaWFNVFhJbnN0YW5jZSwgUHJvcGVydHkgfTtcblxuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKGRlZixjdXJyZW50KSB7XG4gICAgICAgIHRoaXMuZGVmPWRlZjtcbiAgICAgICAgdGhpcy5jdXJyZW50PWN1cnJlbnQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7IGBkZWZhdWx0PVske3RoaXMuZGVmfV0gY3VycmVudD1bJHt0aGlzLmN1cnJlbnR9XWA7IH1cbn1cblxuY2xhc3MgTWVkaWFNVFhJbnN0YW5jZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihpcCwgcG9ydCkge1xuICAgICAgICB0aGlzLmlwID0gaXA7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldERlZmF1bHRzKCkge1xuICAgICAgICBsZXQgbXR4ID0gbmV3IE1lZGlhTVRYKHRoaXMuaXAsIHRoaXMucG9ydCk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgbXR4LmdldERlZmF1bHRzKCkgfHwge307XG5cbiAgICAgICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXMoanNvbikuZmlsdGVyKGtleSA9PiAvXnJwaS8udGVzdChrZXkpKS50b1NvcnRlZCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goa2V5ID0+IHRoaXMuZGVmYXVsdFZhbHVlcy5zZXQoa2V5LCBqc29uW2tleV0pKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDdXJyZW50cygpIHtcbiAgICAgICAgbGV0IG10eCA9IG5ldyBNZWRpYU1UWCh0aGlzLmlwLCB0aGlzLnBvcnQpO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IG10eC5nZXRQYXRocygpIHx8IHt9O1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE9iamVjdC5oYXNPd24oanNvbixrZXkpID8ganNvbltrZXldIDogdGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdGlhbGlzZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREZWZhdWx0cygpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldEN1cnJlbnRzKCk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHRoaXMuZGVmYXVsdFZhbHVlcy5nZXQoa2V5KSwgdGhpcy5jdXJyZW50VmFsdWVzLmdldChrZXkpKTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlc2V0KGtleSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpKTtcbiAgICB9XG4gICAgcmVzZXRBbGwoKSB7XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKCBrZXkgPT4gdGhpcy5yZXNldChrZXkpKTtcbiAgICB9XG59XG4iLCJcbmltcG9ydCB7UHJvcGVydHlTcGVjaWZpZXJ9IGZyb20gJy4vcHJvcGVydHlTcGVjaWZpZXIuanMnO1xuaW1wb3J0IHtNb2Rlc30gZnJvbSBcIi4vcHJvcGVydGllcy5qc1wiO1xuZXhwb3J0IHtQaUNhbX07XG5cblxuY2xhc3MgX1BpQ2FtIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb3BzID0gUHJvcGVydHlTcGVjaWZpZXIubG9hZCgpO1xuICAgIH1cblxuICAgIGFsbEtleXMoKSB7IHJldHVybiBbLi4udGhpcy5wcm9wcy5rZXlzKCldOyB9XG5cbiAgICBrZXlzKG1vZGUgPSBNb2Rlcy5Ob3JtYWwpIHtcbiAgICAgICAgcmV0dXJuIG1vZGUua2V5cztcbiAgICB9XG5cbiAgICBoYXMoa2V5LG1vZGUgPSBNb2Rlcy5BZHZhbmNlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzKG1vZGUpLmluY2x1ZGVzKGtleSk7XG4gICAgfVxuXG4gICAgc3BlYyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAga2luZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLmtpbmQ7XG4gICAgfVxuXG4gICAgaGVscChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLmhlbHA7XG4gICAgfVxuXG4gICAgbWF4KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkubWF4O1xuICAgIH1cblxuICAgIG1pbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLm1pbjtcbiAgICB9XG5cbiAgICBjaG9pY2VzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkuY2hvaWNlcyB8fCBbXTtcbiAgICB9XG5cbn1cblxubGV0IFBpQ2FtID0gbmV3IF9QaUNhbSgpO1xuXG5cblxuIiwiZXhwb3J0IHtQaUNhbVNldHRpbmdzLCBNb2Rlc307XG5cbmNvbnN0IFBpQ2FtU2V0dGluZ3MgPSB7XG4vLyAgICBycGlDYW1lcmFDYW1JRDogWydpbnQnLCAwLCAyNTZdLFxuICAgIHJwaUNhbWVyYVdpZHRoOiBbJ2ludCcsIFswLCA2NTUzNl0sICdzY3JlZW4gd2lkdGggaW4gcGl4ZWxzJ10sXG4gICAgcnBpQ2FtZXJhSGVpZ2h0OiBbJ2ludCcsIFswLCA2NTUzNl0sICdzY3JlZW4gaGVpZ2h0IGluIHBpeGVscyddLFxuICAgIHJwaUNhbWVyYUhGbGlwOiBbJ2Jvb2wnLCAnaG9yaXpvbnRhbGx5IGZsaXAgaW1hZ2UnXSxcbiAgICBycGlDYW1lcmFWRmxpcDogWydib29sJywgJ3ZlcnRpY2FsbHkgZmxpcCBpbWFnZSddLFxuICAgIHJwaUNhbWVyYUJyaWdodG5lc3M6IFsnbnVtYmVyJywgWy0xLjAsIDEuMF0sICdpbWFnZSBicmlnaHRuZXNzJ10sXG4gICAgcnBpQ2FtZXJhQ29udHJhc3Q6IFsnaW50JywgWzAsIDE2XSwgJ2ltYWdlIGNvbnRyYXN0J10sXG4gICAgcnBpQ2FtZXJhU2F0dXJhdGlvbjogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2Ugc2F0dXJhdGlvbiddLFxuICAgIHJwaUNhbWVyYVNoYXJwbmVzczogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2Ugc2hhcnBuZXNzJ10sXG4gICAgcnBpQ2FtZXJhRXhwb3N1cmU6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnc2hvcnQnLCAnbG9uZycsICdjdXN0b20nXSwgJ2ltYWdlIGV4cG9zdXJlJ10sXG4gICAgcnBpQ2FtZXJhQVdCOiBbJ2Nob29zZScsIFsnYXV0bycsICdpbmNhbmRlc2NlbnQnLCAndHVuZ3N0ZW4nLCAnZmxvdXJlc2NlbnQnLCAnaW5kb29yJywgJ2RheWxpZ2h0JywgJ2Nsb3VkeScsICdjdXN0b20nXSwgJ2xpZ2h0aW5nIG1vZGVsJ10sXG4gICAgcnBpQ2FtZXJhRGVub2lzZTogWydjaG9vc2UnLCBbJ29mZicsICdjZG5fb2ZmJywgJ2Nkbl9mYXN0JywgJ2Nkbl9ocSddLCAnbm9pc2UgY29ycmVjdGlvbiddLFxuICAgIHJwaUNhbWVyYVNodXR0ZXI6IFsnaW50JywgWzAsIDEwNDg1NzZdLCAnY2FtZXJhIHNodXR0ZXIgc3BlZWQnXSxcbiAgICAvLyAgIHJwaUNhbWVyYU1ldGVyaW5nOiBbJ2Nob29zZScsWydjZW50cmUnLCdzcG90JywnbWF0cml4JywnY3VzdG9tJ11dLFxuLy8gICAgcnBpQ2FtZXJhR2FpbjogWydudW1iZXInLC0xNi45MCwxNi4wXSxcbi8vICAgIHJwaUNhbWVyYUVWOiBbJ251bWJlcicsLTEwLjAsMTAuMF0sXG4gICAgcnBpQ2FtZXJhQWZNb2RlOiBbJ2Nob29zZScsIFsnYXV0bycsICdtYW51YWwnLCAnY29udGludW91cyddLCAnYXV0b2ZvY3VzIG1vZGUnXSxcbiAgICBycGlDYW1lcmFBZlJhbmdlOiBbJ2Nob29zZScsIFsnbm9ybWFsJywgJ21hY3JvJywgJ2Z1bGwnXSwgJ2F1dG9mb2N1cyByYW5nZSddLFxuICAgIHJwaUNhbWVyYUFmU3BlZWQ6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnZmFzdCddLCAnYXV0b2ZvY3VzIHNwZWVkJ10sXG4gICAgcnBpQ2FtZXJhTGVuc1Bvc2l0aW9uOiBbJ251bWJlcicsIFswLjAsIDI1Ni4wXSwgJ2xlbnMgcG9zaXRpb24gKDEgLyBkaXN0YW5jZSB0byBvYmplY3QpJ11cbn07XG5cbmNsYXNzIE1vZGVzIHtcbiAgICBzdGF0aWMgTm9ybWFsID0gbmV3IE1vZGVzKCdOb3JtYWwnKTtcbiAgICBzdGF0aWMgQWR2YW5jZWQgPSBuZXcgTW9kZXMoJ0FkdmFuY2VkJyk7XG5cbiAgICBzdGF0aWMgbW9kZUtleXMgID0ge1xuICAgICAgICBOb3JtYWw6IFtcbiAgICAgICAgICAgICdycGlDYW1lcmFXaWR0aCcsXG4gICAgICAgICAgICAncnBpQ2FtZXJhSGVpZ2h0JyxcbiAgICAgICAgICAgICdycGlDYW1lcmFCcmlnaHRuZXNzJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFDb250cmFzdCcsXG4gICAgICAgICAgICAncnBpQ2FtZXJhU2F0dXJhdGlvbicsXG4gICAgICAgICAgICAncnBpQ2FtZXJhU2F0dXJhdGlvbicsXG4gICAgICAgICAgICAncnBpQ2FtZXJhQVdCJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFBZk1vZGUnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUxlbnNQb3NpdGlvbidcbiAgICAgICAgXSxcbiAgICAgICAgQWR2YW5jZWQ6IE9iamVjdC5rZXlzKFBpQ2FtU2V0dGluZ3MpXG4gICAgfTtcblxuICAgIHN0YXRpYyBhbGwoKSB7IHJldHVybiBbdGhpcy5Ob3JtYWwsIHRoaXMuQWR2YW5jZWRdOyB9XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkgeyByZXR1cm4gYE1vZGUuJHt0aGlzLm5hbWV9YDsgfVxuXG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICAgIHJldHVybiBNb2Rlcy5tb2RlS2V5c1t0aGlzLm5hbWVdO1xuICAgIH1cbn0iLCJpbXBvcnQge1BpQ2FtU2V0dGluZ3N9IGZyb20gJy4vcHJvcGVydGllcy5qcyc7XG5leHBvcnQge1Byb3BlcnR5U3BlY2lmaWVyfTtcblxuY2xhc3MgUHJvcGVydHlTcGVjaWZpZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MgPSBbXSkge1xuICAgICAgICB0aGlzLmtpbmQgPSBhcmdzWzBdIHx8ICcnO1xuICAgICAgICB0aGlzLmhlbHAgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdIHx8ICcnO1xuXG4gICAgICAgIGxldCBtaW4gPSBOYU47XG4gICAgICAgIGxldCBtYXggPSBOYU47XG4gICAgICAgIGxldCBjaG9pY2VzID0gW107XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQoYXJnc1sxXVswXSk7XG4gICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQoYXJnc1sxXVsxXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlRmxvYXQoYXJnc1sxXVswXSk7XG4gICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VGbG9hdChhcmdzWzFdWzFdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nob29zZSc6XG4gICAgICAgICAgICAgICAgY2hvaWNlcyA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWluID0gbWluO1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICAgICAgdGhpcy5jaG9pY2VzID0gY2hvaWNlcztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nob29zZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMua2luZH0gWyR7dGhpcy5oZWxwfV0gOiAke3RoaXMuY2hvaWNlc31gO1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMua2luZH0gWyR7dGhpcy5oZWxwfV1gO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XSA6ICR7dGhpcy5taW59LSR7dGhpcy5tYXh9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWQoKSB7XG5cbiAgICAgICAgbGV0IHByb3BzPW5ldyBNYXAoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnNldChrZXksbmV3IFByb3BlcnR5U3BlY2lmaWVyKFBpQ2FtU2V0dGluZ3Nba2V5XSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHsgSFRUUFJlcXVlc3RzIGFzIGRlZmF1bHQgfTtcblxuXG5jbGFzcyBIVFRQUmVxdWVzdHMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKi9cbiAgICBoZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gbmV3IEhlYWRlcnMoe1xuICAgICAgICAgICAgXCJDb25uZWN0aW9uXCI6IFwia2VlcC1hbGl2ZVwiLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBcIkFjY2VwdC1FbmNvZGluZ1wiOiBcImd6aXAsIGRlZmxhdGUsIGJyXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKi9cbiAgICBvcHRpb25zKG1ldGhvZCA9IFwiR0VUXCIpIHtcbiAgICAgICAgbGV0IGFjY2VwdCA9IChtZXRob2QgPT09IFwiUE9TVFwiKSA/IFwiYXBwbGljYXRpb24vanNvblwiIDogXCIqLypcIjtcbiAgICAgICAgbGV0IGhkciA9IHRoaXMuaGVhZGVycygpO1xuICAgICAgICBoZHIuYXBwZW5kKFwiQWNjZXB0XCIsIGFjY2VwdCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczogaGRyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgICAqL1xuICAgIGFzeW5jIGdldCh1cmwpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnMoXCJHRVRcIik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmhhbmRsZSh1cmwsIG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgcGF0Y2godXJsLCBkYXRhKSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5vcHRpb25zKFwiUEFUQ0hcIik7XG4gICAgICAgIG9wdHMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5oYW5kbGUodXJsLCBvcHRzKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBIVFRQUmVxdWVzdHMgZnJvbSBcIi4vcmVzdC5qc1wiO1xuXG5leHBvcnQgeyBiYXNlVVJMUywgTWVkaWFNVFhBUEkgfTtcblxuY29uc3QgYmFzZVVSTFMgPSAoKG9iaikgPT4gT2JqZWN0LmZyZWV6ZShvYmopKSAoe1xuICAgIEJBU0UgOiBcIi92My9jb25maWdcIixcbiAgICBHTE9CQUwgOiBcImdsb2JhbFwiLFxuICAgIERFRkFVTFRTIDogXCJwYXRoZGVmYXVsdHNcIixcbiAgICBQQVRIUyA6IFwicGF0aHNcIixcbiAgICBMSVNUOiBcInBhdGhzL2xpc3RcIlxufSk7XG5cbmNvbnN0IGJhc2VBY3Rpb25zID0gKChvYmopID0+IE9iamVjdC5mcmVlemUob2JqKSkgKHtcbiAgICBSRUFEIDogXCJnZXRcIixcbiAgICBXUklURSA6IFwicGF0Y2hcIlxufSk7XG5cblxuXG5jbGFzcyBNZWRpYU1UWEFQSSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZGV2aWNlID0gJ2h0dHA6Ly8xMjcuMC4wLjE6OTk5NycsXG4gICAgICAgIHdoaWNoID0gYmFzZVVSTFMuUEFUSFMsXG4gICAgICAgIG5hbWUgPSBcIlwiKSB7XG4gICAgICAgIHRoaXMud2hpY2ggPSB3aGljaDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5yb290ID0gYCR7ZGV2aWNlfSR7YmFzZVVSTFMuQkFTRX0vJHt0aGlzLndoaWNofWA7XG4gICAgfVxuXG4gICAgI3VybChhY3Rpb24gPSBiYXNlQWN0aW9ucy5SRUFEKSB7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIGJhc2VBY3Rpb25zLlJFQUQ6XG4gICAgICAgICAgICAgICAgbGV0IGNhbT0odGhpcy53aGljaD09PWJhc2VVUkxTLlBBVEhTKSA/IHRoaXMubmFtZSA6ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnJvb3R9L2dldC8ke2NhbX1gO1xuICAgICAgICAgICAgY2FzZSBiYXNlQWN0aW9ucy5XUklURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5yb290fS9wYXRjaC8ke3RoaXMubmFtZX1gO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZCgpIHtcbiAgICAgICAgbGV0IHUgPSB0aGlzLiN1cmwoYmFzZUFjdGlvbnMuUkVBRCk7XG4gICAgICAgIHJldHVybiBhd2FpdCAobmV3IEhUVFBSZXF1ZXN0cygpLmdldCh1KSk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGUoZGF0YSl7XG4gICAgICAgIGxldCB1ID0gdGhpcy4jdXJsKGJhc2VBY3Rpb25zLldSSVRFKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IChuZXcgSFRUUFJlcXVlc3RzKCkucGF0Y2godSxkYXRhKSk7XG4gICAgfVxuXG5cblxuXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtBcHBsaWNhdGlvbkdVSX0gZnJvbSAnLi9ndWkvYXBwbGljYXRpb25HVUkuanMnO1xuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGxldCBhcHBHVUkgPSBuZXcgQXBwbGljYXRpb25HVUkoKTtcbiAgICBhcHBHVUkubG9hZCgpLnRoZW4oIF8gPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coJ0dVSSBsb2FkZWQnKTtcbiAgICB9KTtcbn1cblxuXG53aW5kb3cub25sb2FkID0gKF8pID0+IHtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coJ1N0YXJ0aW5nJyk7XG4gICAgc3RhcnQoKTtcbiAgICB3aW5kb3cub25sb2FkID0gKF8pID0+IHt9O1xufTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9