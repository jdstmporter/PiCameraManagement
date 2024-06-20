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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dom.js */ "./js/gui/dom.js");










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

        this.tag = _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM.withID('inputs'); //document.getElementById('inputs');
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
        this.tag.empty();

        let table = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('table');
        let headerRow = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('tr');
        ApplicationGUI.Headers.forEach( text => {
            let th = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('th').text(text).setAttr('empty',text==='');
            headerRow.append(th);
        });
        table.append(headerRow);


        _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_3__.PiCam.keys(this.mode).forEach( key => table.append(this.rows[key].dom));
        this.tag.append(table);
    }
}

/***/ }),

/***/ "./js/gui/dom.js":
/*!***********************!*\
  !*** ./js/gui/dom.js ***!
  \***********************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   DOM: () => (/* binding */ DOM)
/* harmony export */ });


class DOM {

    /**
     *
     * @param {String} id
     * @returns {DOM}
     */
    static withID(id) {
        return new DOM(document.getElementById(id));
    }

    /**
     *
     * @param {string|HTMLElement }tag
     * @param {object} props
     */
    constructor(tag, props = {}) {
        if(typeof(tag)==='string') {
            this.element = document.createElement(tag);
        }
        else {
           this.element=tag;
        }
        this.setProps(props);
    }

    get dom() { return this.element; }

    /**
     *
     * @param {Node} root
     */
    map(root = document) {
        root.appendChild(this.element);
    }
    /**
     *
     * @param {DOM} child
     * @returns {DOM}
     */
    append(child) {
        this.element.appendChild(child.dom);
        return this;
    }

    empty() {
        while(this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {DOM}
     */
    text(value) {
        this.element.appendChild(document.createTextNode(value));
        return this;
    }

    setAttr(name,value) {
        this.element.setAttribute(name,value);
        return this;
    }

    setAttrs(kv) {
        Object.keys(kv).forEach(key => this.element.setAttribute(key,kv[key]));
        return this;
    }

    /**
     *
     * @param {string} name
     * @param {any} value
     * @returns {DOM}
     */
    setProp(name,value) {
        this.element[name]=value;
        return this;
    }

    /**
     *
     * @param {object} kv
     * @return {DOM}
     */
    setProps(kv) {
        Object.keys(kv).forEach(key => this.element[key]=kv[key]);
        return this;
    }

    getProp(name) {
        return this.element[name];
    }

    get value() {
        return (this.element.type==='checkbox')? this.element.checked : this.element.value;
    }
    set value(v) {
        if(this.element.type==='checkbox') {
            this.element.checked=v;
        }
        else {
            this.element.value = v;
        }
    }

    validity(error = '') {
        this.element.setCustomValidity(error);
    }

    //set [name](value) { this.element[name]=value; }
    //get [name]() { return this.element[name]; }



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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./dom.js */ "./js/gui/dom.js");






class TableRow {

    static textBox(text='',name='text') {
        return new _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM('span')
            .text(text)
            .setAttr('name',name);
    }
    static readonlyBox(value,name='') {
        return new _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM('input',{
                disabled :true,
                value: value.toString()
            }).setAttr('name',name);
    }

    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {DOM}
     */
    static button(message, name='') {
        return new _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM('button')
            .text(message)
            .setAttrs({
                type: 'button',
                name: name
            });
    }

    constructor(state) {
        let field = state.key || "";
        if(!_picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.has(field)) { throw new Error(`No such field as ${field}`); }
        this.parameters = _picam_structure_picam_js__WEBPACK_IMPORTED_MODULE_1__.PiCam.spec(field);
        this.fieldName = field;
        this.state = state;
        this.dom=this.map();
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

        this.input = new _valueFields_js__WEBPACK_IMPORTED_MODULE_0__.PropertyField(this.fieldName,this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };
        this.inBox  = this.input.field;

        this.resetD   = TableRow.button('To default','defButton');
        this.resetD.setProp('onclick', (ev) => {
            this.state.toDefault();
            this.#reload();
        });

        this.resetC   = TableRow.button('To current','currButton');
        this.resetC.setProp('onclick', (ev) => {
            this.state.toCurrent();
            this.#reload();
        });


        let cells = [this.defBox,this.descBox,this.inBox,this.resetD, this.resetC].map ( cell => {
            return new _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM('td').append(cell);
        });
        let row = new _dom_js__WEBPACK_IMPORTED_MODULE_2__.DOM('tr').setAttr('name',this.fieldName);
        cells.forEach(cell => row.append(cell));
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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "./js/gui/dom.js");




function isNull(x) { return x===null; }
function isUndefined(x) { return x===undefined; }
function isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }



class PropertyField {



    static makeField(params) {
        const kind = params.kind;
        let field;
        switch(kind) {
            case 'bool':
                field=new _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM('input',{
                    type: 'checkbox'
                });
                break;
            case 'int':
            case 'number':
                field=new _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM('input', {
                    type: 'number',
                    min: params.min,
                    max: params.max
                });
                break;
            case 'choose':
                field=new _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM('select',{
                    multiple: false
                });
                params.choices.forEach (v => {
                        let o = new _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM('option',{
                            text: v
                        });
                        field.append(o);
                    }
                );
                break;
            default:
                field=new _dom_js__WEBPACK_IMPORTED_MODULE_1__.DOM('input', {
                    type: 'text'
                });
                break;
        }
        field.setAttr('name',params.name);
        return field;
    }

    constructor(name, params, value) {
        this.parameters = params;
        this.name=name;
        this.field = PropertyField.makeField(params);
        this.oninput = (v) => {};

        this.valueToLoad = value;

        this.field.setProp('oninput', (ev) => {
            window.console.log('On input fired');
            if(this.isValid) {
                this.field.validity();
                this.oninput(this.value);
            }
            else {
                this.field.validity('Invalid entry');
                window.console.log(`Bad entry on ${name}`);
            }
        });
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
                return this.field.value;
            default:
                return this.field.value;
        }
    }
    set value(value) {
        window.console.log(`Setting ${this.name} to ${value}`);
        switch (this.kind) {
            case 'bool':
                this.field.value=value;
                break;
            default:
                this.field.value=value;
                break;
        }
        window.console.log(`${this.name}.value=${this.field.value}`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDbkM7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lZGlhbXR4Ly4vanMvYXBpLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZGVmYXVsdHMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvYXBwbGljYXRpb25HVUkuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvZG9tLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL3RhYmxlUm93LmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL3ZhbHVlRmllbGRzLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vZGF0YVRhYmxlLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vcGFyc2VyLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vc3RydWN0dXJlL3BpY2FtLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vc3RydWN0dXJlL3Byb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9zdHJ1Y3R1cmUvcHJvcGVydHlTcGVjaWZpZXIuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9yZXN0LmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcmVzdFdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lZGlhbXR4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJhc2VVUkxTLCBNZWRpYU1UWEFQSSB9IGZyb20gXCIuL3Jlc3RXcmFwcGVyLmpzXCI7XG5cbmV4cG9ydCB7TWVkaWFNVFh9O1xuXG5jbGFzcyBNZWRpYU1UWCB7XG5cbiAgICBjb25zdHJ1Y3RvcihpcCA9ICcxMjcuMC4wLjEnLFxuICAgICAgICAgICAgICAgIHBvcnQgPSAnOTk5NycsXG4gICAgICAgICAgICAgICAgY2FtZXJhTmFtZSA9IFwiY2FtXCIpIHtcbiAgICAgICAgdGhpcy5kZXZpY2U9YGh0dHA6Ly8ke2lwfToke3BvcnR9YDtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFOYW1lO1xuICAgIH1cblxuICAgIGFzeW5jIGdldCh3aGljaCA9IGJhc2VVUkxTLkRFRkFVTFRTKSB7XG4gICAgICAgIGxldCBjYW0gPSAod2hpY2g9PT1iYXNlVVJMUy5QQVRIUykgPyB0aGlzLmNhbWVyYSA6ICcnO1xuICAgICAgICBsZXQgbXR4PSBuZXcgTWVkaWFNVFhBUEkodGhpcy5kZXZpY2Usd2hpY2gsY2FtKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG10eC5yZWFkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0KHdoaWNoID0gYmFzZVVSTFMuREVGQVVMVFMsIHZhbHVlcyA9IHt9KSB7XG4gICAgICAgIGxldCBtdHg9IG5ldyBNZWRpYU1UWEFQSSh0aGlzLmRldmljZSx3aGljaCwgdGhpcy5jYW1lcmEpO1xuICAgICAgICByZXR1cm4gYXdhaXQgbXR4LndyaXRlKHZhbHVlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldChiYXNlVVJMUy5ERUZBVUxUUyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UGF0aHMoKXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KGJhc2VVUkxTLlBBVEhTKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRHbG9iYWwoKXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KGJhc2VVUkxTLkdMT0JBTCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0UGF0aCh2YWx1ZXMgPSB7fSl7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNldChiYXNlVVJMUy5QQVRIUywgdmFsdWVzKTtcbiAgICB9XG5cblxuXG5cbn1cbiIsImV4cG9ydCB7IERlZmF1bHRzIH07XG5cbi8qKlxuICpcbiAqIEBuYW1lIERlZmF1bHRzXG4gKlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIHN0cmluZz59XG4gKiBAZGVmYXVsdFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIHN0YW5kYXJkIGNvbnN0YW50cyB1c2VkIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uXG4gKiBAdG9kbyBSZXBsYWNlIHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhbiBvYmplY3Qgd2l0aCBzb21ldGhpbmcgbW9yZSBkeW5hbWljXG4gKi9cblxuY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgSVBfQUREUkVTUzogJzE5Mi4xNjguMC4yMDMnLFxuICAgIFBPUlQ6ICc5OTk3JyxcbiAgICBDQU1FUkFfTkFNRTogJ2NhbSdcbn07IiwiaW1wb3J0IHtUYWJsZVJvd30gZnJvbSBcIi4vdGFibGVSb3cuanNcIjtcbmltcG9ydCB7TW9kZXN9IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcHJvcGVydGllcy5qc1wiO1xuXG5leHBvcnQge0FwcGxpY2F0aW9uR1VJfTtcblxuaW1wb3J0IHtQaVByb3BlcnR5VmFsdWVzfSBmcm9tICcuLi9waWNhbS9kYXRhVGFibGUuanMnO1xuaW1wb3J0IHtQaUNhbX0gZnJvbSBcIi4uL3BpY2FtL3N0cnVjdHVyZS9waWNhbS5qc1wiO1xuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSBcIi4uL2RlZmF1bHRzL2RlZmF1bHRzLmpzXCI7XG5pbXBvcnQge0RPTX0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmNsYXNzIEFwcGxpY2F0aW9uR1VJIHtcblxuICAgIHN0YXRpYyBIZWFkZXJzID0gW1xuICAgICAgICAnRGVmYXVsdCcsXG4gICAgICAgICdEZXNjcmlwdGlvbicsXG4gICAgICAgICdWYWx1ZScsXG4gICAgICAgICcnLFxuICAgICAgICAnJ1xuICAgIF07XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlID0gTW9kZXMuTm9ybWFsKSB7XG4gICAgICAgIHRoaXMuSVAgPSBEZWZhdWx0cy5JUF9BRERSRVNTO1xuICAgICAgICB0aGlzLlBPUlQgPSBEZWZhdWx0cy5QT1JUO1xuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUGlQcm9wZXJ0eVZhbHVlcyh0aGlzLklQLHRoaXMuUE9SVCk7XG4gICAgICAgIHRoaXMucm93cyA9IHt9O1xuXG4gICAgICAgIHRoaXMudGFnID0gRE9NLndpdGhJRCgnaW5wdXRzJyk7IC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0cycpO1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYFBJQ0FNIGlzIFske1BpQ2FtfV1gKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkKCkge1xuXG4gICAgICAgIGxldCBzdGF0ZXMgPSBhd2FpdCB0aGlzLnByb3BlcnRpZXMubG9hZCh0aGlzLm1vZGUpO1xuICAgICAgICB0aGlzLnJvd3MgPSB7fTtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBNb2RlIGlzICR7dGhpcy5tb2RlLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgS2V5cyBhcmUgJHtQaUNhbS5rZXlzKHRoaXMubW9kZSl9YCk7XG4gICAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgICAgIGxldCByb3cgPSBuZXcgVGFibGVSb3coc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5yb3dzW3Jvdy5maWVsZE5hbWVdID0gcm93O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TW9kZXN9XG4gICAgICovXG4gICAgZ2V0IG1vZGUoKSB7IHJldHVybiB0aGlzLl9tb2RlOyB9XG4gICAgc2V0IG1vZGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbW9kZT12YWx1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMudGFnLmVtcHR5KCk7XG5cbiAgICAgICAgbGV0IHRhYmxlID0gbmV3IERPTSgndGFibGUnKTtcbiAgICAgICAgbGV0IGhlYWRlclJvdyA9IG5ldyBET00oJ3RyJyk7XG4gICAgICAgIEFwcGxpY2F0aW9uR1VJLkhlYWRlcnMuZm9yRWFjaCggdGV4dCA9PiB7XG4gICAgICAgICAgICBsZXQgdGggPSBuZXcgRE9NKCd0aCcpLnRleHQodGV4dCkuc2V0QXR0cignZW1wdHknLHRleHQ9PT0nJyk7XG4gICAgICAgICAgICBoZWFkZXJSb3cuYXBwZW5kKHRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhYmxlLmFwcGVuZChoZWFkZXJSb3cpO1xuXG5cbiAgICAgICAgUGlDYW0ua2V5cyh0aGlzLm1vZGUpLmZvckVhY2goIGtleSA9PiB0YWJsZS5hcHBlbmQodGhpcy5yb3dzW2tleV0uZG9tKSk7XG4gICAgICAgIHRoaXMudGFnLmFwcGVuZCh0YWJsZSk7XG4gICAgfVxufSIsImV4cG9ydCB7RE9NfTtcblxuY2xhc3MgRE9NIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgd2l0aElEKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgRE9NKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudCB9dGFnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcyA9IHt9KSB7XG4gICAgICAgIGlmKHR5cGVvZih0YWcpPT09J3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgdGhpcy5lbGVtZW50PXRhZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFByb3BzKHByb3BzKTtcbiAgICB9XG5cbiAgICBnZXQgZG9tKCkgeyByZXR1cm4gdGhpcy5lbGVtZW50OyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcm9vdFxuICAgICAqL1xuICAgIG1hcChyb290ID0gZG9jdW1lbnQpIHtcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RE9NfSBjaGlsZFxuICAgICAqIEByZXR1cm5zIHtET019XG4gICAgICovXG4gICAgYXBwZW5kKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZC5kb20pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBlbXB0eSgpIHtcbiAgICAgICAgd2hpbGUodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxuICAgICAqL1xuICAgIHRleHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEF0dHIobmFtZSx2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKG5hbWUsdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRBdHRycyhrdikge1xuICAgICAgICBPYmplY3Qua2V5cyhrdikuZm9yRWFjaChrZXkgPT4gdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShrZXksa3Zba2V5XSkpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHthbnl9IHZhbHVlXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzZXRQcm9wKG5hbWUsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50W25hbWVdPXZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBrdlxuICAgICAqIEByZXR1cm4ge0RPTX1cbiAgICAgKi9cbiAgICBzZXRQcm9wcyhrdikge1xuICAgICAgICBPYmplY3Qua2V5cyhrdikuZm9yRWFjaChrZXkgPT4gdGhpcy5lbGVtZW50W2tleV09a3Zba2V5XSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGdldFByb3AobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5lbGVtZW50W25hbWVdO1xuICAgIH1cblxuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsZW1lbnQudHlwZT09PSdjaGVja2JveCcpPyB0aGlzLmVsZW1lbnQuY2hlY2tlZCA6IHRoaXMuZWxlbWVudC52YWx1ZTtcbiAgICB9XG4gICAgc2V0IHZhbHVlKHYpIHtcbiAgICAgICAgaWYodGhpcy5lbGVtZW50LnR5cGU9PT0nY2hlY2tib3gnKSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuY2hlY2tlZD12O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gdjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkaXR5KGVycm9yID0gJycpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEN1c3RvbVZhbGlkaXR5KGVycm9yKTtcbiAgICB9XG5cbiAgICAvL3NldCBbbmFtZV0odmFsdWUpIHsgdGhpcy5lbGVtZW50W25hbWVdPXZhbHVlOyB9XG4gICAgLy9nZXQgW25hbWVdKCkgeyByZXR1cm4gdGhpcy5lbGVtZW50W25hbWVdOyB9XG5cblxuXG59XG5cbiIsImltcG9ydCB7IFByb3BlcnR5RmllbGQgfSBmcm9tICcuL3ZhbHVlRmllbGRzLmpzJztcbmltcG9ydCB7UGlDYW19IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanNcIjtcbmltcG9ydCB7RE9NfSBmcm9tIFwiLi9kb20uanNcIjtcblxuZXhwb3J0IHsgVGFibGVSb3cgfTtcblxuY2xhc3MgVGFibGVSb3cge1xuXG4gICAgc3RhdGljIHRleHRCb3godGV4dD0nJyxuYW1lPSd0ZXh0Jykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnc3BhbicpXG4gICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgLnNldEF0dHIoJ25hbWUnLG5hbWUpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVhZG9ubHlCb3godmFsdWUsbmFtZT0nJykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnaW5wdXQnLHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA6dHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgfSkuc2V0QXR0cignbmFtZScsbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnV0dG9uKG1lc3NhZ2UsIG5hbWU9JycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBET00oJ2J1dHRvbicpXG4gICAgICAgICAgICAudGV4dChtZXNzYWdlKVxuICAgICAgICAgICAgLnNldEF0dHJzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBsZXQgZmllbGQgPSBzdGF0ZS5rZXkgfHwgXCJcIjtcbiAgICAgICAgaWYoIVBpQ2FtLmhhcyhmaWVsZCkpIHsgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIGZpZWxkIGFzICR7ZmllbGR9YCk7IH1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gUGlDYW0uc3BlYyhmaWVsZCk7XG4gICAgICAgIHRoaXMuZmllbGROYW1lID0gZmllbGQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5kb209dGhpcy5tYXAoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXQgb25jaGFuZ2UoKSB7IHJldHVybiB0aGlzLmlucHV0Lm9uaW5wdXQoKTsgfVxuICAgIC8vc2V0IG9uY2hhbmdlKGNiKSB7IHRoaXMuaW5wdXQub25pbnB1dD1jYjsgfVxuXG5cbiAgICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmlucHV0LnZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKHYpIHsgdGhpcy5pbnB1dC52YWx1ZT12OyB9XG5cbiAgICAjcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlPXRoaXMuc3RhdGUuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIG1hcCgpIHtcbiAgICAgICAgdGhpcy5kZWZCb3ggPSBUYWJsZVJvdy5yZWFkb25seUJveCh0aGlzLnN0YXRlLmRlZmF1bHRWYWx1ZS50b1N0cmluZygpLCdkZWZhdWx0Jyk7XG4gICAgICAgIHRoaXMuZGVzY0JveCA9IFRhYmxlUm93LnRleHRCb3godGhpcy5wYXJhbWV0ZXJzLmhlbHAsJ2hlbHAnKTtcblxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IFByb3BlcnR5RmllbGQodGhpcy5maWVsZE5hbWUsdGhpcy5wYXJhbWV0ZXJzLHRoaXMuc3RhdGUuZWRpdGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0Lm9uaW5wdXQgPSAodmFsdWUpID0+IHsgdGhpcy5zdGF0ZS5lZGl0ZWRWYWx1ZSA9IHZhbHVlOyB9O1xuICAgICAgICB0aGlzLmluQm94ICA9IHRoaXMuaW5wdXQuZmllbGQ7XG5cbiAgICAgICAgdGhpcy5yZXNldEQgICA9IFRhYmxlUm93LmJ1dHRvbignVG8gZGVmYXVsdCcsJ2RlZkJ1dHRvbicpO1xuICAgICAgICB0aGlzLnJlc2V0RC5zZXRQcm9wKCdvbmNsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRvRGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4jcmVsb2FkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzZXRDICAgPSBUYWJsZVJvdy5idXR0b24oJ1RvIGN1cnJlbnQnLCdjdXJyQnV0dG9uJyk7XG4gICAgICAgIHRoaXMucmVzZXRDLnNldFByb3AoJ29uY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudG9DdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLiNyZWxvYWQoKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBsZXQgY2VsbHMgPSBbdGhpcy5kZWZCb3gsdGhpcy5kZXNjQm94LHRoaXMuaW5Cb3gsdGhpcy5yZXNldEQsIHRoaXMucmVzZXRDXS5tYXAgKCBjZWxsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRE9NKCd0ZCcpLmFwcGVuZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByb3cgPSBuZXcgRE9NKCd0cicpLnNldEF0dHIoJ25hbWUnLHRoaXMuZmllbGROYW1lKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHJvdy5hcHBlbmQoY2VsbCkpO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuXG5cbn0iLCJpbXBvcnQge1BpQ2FtfSBmcm9tICcuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanMnO1xuaW1wb3J0IHtET019IGZyb20gXCIuL2RvbS5qc1wiO1xuZXhwb3J0IHtQcm9wZXJ0eUZpZWxkfTtcblxuZnVuY3Rpb24gaXNOdWxsKHgpIHsgcmV0dXJuIHg9PT1udWxsOyB9XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh4KSB7IHJldHVybiB4PT09dW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCh4KSB7IHJldHVybiBpc051bGwoeCkgfHwgaXNVbmRlZmluZWQoeCk7IH1cblxuXG5cbmNsYXNzIFByb3BlcnR5RmllbGQge1xuXG5cblxuICAgIHN0YXRpYyBtYWtlRmllbGQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGtpbmQgPSBwYXJhbXMua2luZDtcbiAgICAgICAgbGV0IGZpZWxkO1xuICAgICAgICBzd2l0Y2goa2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW50JzpcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgICAgICAgICAgICAgIG1heDogcGFyYW1zLm1heFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICBmaWVsZD1uZXcgRE9NKCdzZWxlY3QnLHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNob2ljZXMuZm9yRWFjaCAodiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbyA9IG5ldyBET00oJ29wdGlvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuYXBwZW5kKG8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkLnNldEF0dHIoJ25hbWUnLHBhcmFtcy5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUsIHBhcmFtcywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1zO1xuICAgICAgICB0aGlzLm5hbWU9bmFtZTtcbiAgICAgICAgdGhpcy5maWVsZCA9IFByb3BlcnR5RmllbGQubWFrZUZpZWxkKHBhcmFtcyk7XG4gICAgICAgIHRoaXMub25pbnB1dCA9ICh2KSA9PiB7fTtcblxuICAgICAgICB0aGlzLnZhbHVlVG9Mb2FkID0gdmFsdWU7XG5cbiAgICAgICAgdGhpcy5maWVsZC5zZXRQcm9wKCdvbmlucHV0JywgKGV2KSA9PiB7XG4gICAgICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coJ09uIGlucHV0IGZpcmVkJyk7XG4gICAgICAgICAgICBpZih0aGlzLmlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkLnZhbGlkaXR5KCk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmlucHV0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC52YWxpZGl0eSgnSW52YWxpZCBlbnRyeScpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgQmFkIGVudHJ5IG9uICR7bmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMudmFsdWU9dmFsdWU7XG4gICAgfVxuXG4gICAgZ2V0IGtpbmQoKSB7IHJldHVybiB0aGlzLnBhcmFtZXRlcnMua2luZDsgfVxuXG4gICAgZ2V0IHZhbHVlKCkge1xuICAgICAgICBzd2l0Y2godGhpcy5raW5kKSB7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUludCh0aGlzLmZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQodGhpcy5maWVsZC52YWx1ZSk7XG4gICAgICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZC52YWx1ZTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZmllbGQudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgc2V0IHZhbHVlKHZhbHVlKSB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgU2V0dGluZyAke3RoaXMubmFtZX0gdG8gJHt2YWx1ZX1gKTtcbiAgICAgICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQudmFsdWU9dmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQudmFsdWU9dmFsdWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGAke3RoaXMubmFtZX0udmFsdWU9JHt0aGlzLmZpZWxkLnZhbHVlfWApO1xuICAgIH1cblxuXG5cbiAgICBnZXQgaXNWYWxpZCgpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBDaGVja2luZyB2YWxpZGl0eTogJHt0aGlzLmtpbmR9IDogJHt0aGlzLnZhbHVlfWApO1xuICAgICAgICBzd2l0Y2godGhpcy5raW5kKSB7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gIU51bWJlci5pc05hTih0aGlzLnZhbHVlKTtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG5cbn1cbiIsIlxuaW1wb3J0IHsgUGlDYW0gfSBmcm9tICcuL3N0cnVjdHVyZS9waWNhbS5qcyc7XG5pbXBvcnQge01lZGlhTVRYSW5zdGFuY2UsIFByb3BlcnR5fSBmcm9tIFwiLi9wYXJzZXIuanNcIjtcbmltcG9ydCB7VGFibGVSb3d9IGZyb20gXCIuLi9ndWkvdGFibGVSb3cuanNcIjtcblxuZXhwb3J0IHsgUGlQcm9wZXJ0eVZhbHVlcyB9O1xuXG5jbGFzcyBQcm9wZXJ0eVN0YXRlIHtcbiAgICAja2V5O1xuICAgICNlZGl0ZWQ7XG4gICAgI2RlZmF1bHQ7XG4gICAgI2N1cnJlbnQ7XG4gICAgI21vZGlmaWVkO1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHtQcm9wZXJ0eX0gcHJvcGVydHlcbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihrZXkscHJvcGVydHkpIHtcbiAgICAgICAgdGhpcy4ja2V5ID0ga2V5O1xuICAgICAgICB0aGlzLiNkZWZhdWx0ID0gcHJvcGVydHkuZGVmO1xuICAgICAgICB0aGlzLiNjdXJyZW50ID0gcHJvcGVydHkuY3VycmVudDtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jY3VycmVudDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtzdHJpbmd9XG4gICAgICovXG4gICAgZ2V0IGtleSgpIHsgcmV0dXJuIHRoaXMuI2tleTsgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBnZXQgaXNNb2RpZmllZCgpIHsgcmV0dXJuIHRoaXMuI21vZGlmaWVkOyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAgKiBAcmV0dXJucyB7YW55fVxuICAgICAqL1xuICAgIGdldCBlZGl0ZWRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuI2VkaXRlZDsgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICAgKi9cbiAgICBzZXQgZWRpdGVkVmFsdWUodmFsdWUpIHtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdmFsdWU7XG4gICAgICAgIHRoaXMuI21vZGlmaWVkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBnZXQgY3VycmVudFZhbHVlKCkgeyByZXR1cm4gdGhpcy4jY3VycmVudDsgfVxuICAgIGdldCBkZWZhdWx0VmFsdWUoKSB7IHJldHVybiB0aGlzLiNkZWZhdWx0OyB9XG5cbiAgICB0b0RlZmF1bHQoKXtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jZGVmYXVsdDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIHRvQ3VycmVudCgpIHtcbiAgICAgICAgdGhpcy4jZWRpdGVkID0gdGhpcy4jY3VycmVudDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICB9XG4xXG5cbiAgICBjb21taXQoKSB7XG4gICAgICAgIHRoaXMuI2N1cnJlbnQgPSB0aGlzLiNlZGl0ZWQ7XG4gICAgICAgIHRoaXMuI21vZGlmaWVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkodGhpcy5kZWZhdWx0VmFsdWUsIHRoaXMuY3VycmVudFZhbHVlKTtcbiAgICB9XG59XG5cbmNsYXNzIFBpUHJvcGVydHlWYWx1ZXMge1xuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gaXBcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcG9ydFxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGlwLCBwb3J0KSB7XG4gICAgICAgIHRoaXMubXR4ID0gbmV3IE1lZGlhTVRYSW5zdGFuY2UoaXAscG9ydCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge01vZGVzfSBtb2RlXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgbG9hZChtb2RlKSB7XG4gICAgICAgIGF3YWl0IHRoaXMubXR4LmluaXRpYWxpc2UoKTtcbiAgICAgICAgcmV0dXJuIFBpQ2FtLmtleXMobW9kZSkubWFwKCBrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHByb3BlcnR5ID0gdGhpcy5tdHguZ2V0KGtleSk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5U3RhdGUoa2V5LHByb3BlcnR5KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgc2F2ZShzdGF0ZXMgPSBbXSkge1xuICAgICAgICBsZXQgY2hhbmdlZCA9IHN0YXRlcy5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuaXNNb2RpZmllZCk7XG4gICAgICAgIGxldCBvdXRwdXQgPSB7fTtcbiAgICAgICAgY2hhbmdlZC5mb3JFYWNoKCBzdGF0ZSA9PiB7XG4gICAgICAgICAgICBvdXRwdXRbc3RhdGUua2V5XSA9IHN0YXRlLmNvbW1pdCgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cblxuXG5cblxuXG5cbn1cbiIsImltcG9ydCB7TWVkaWFNVFh9IGZyb20gJy4uL2FwaS5qcyc7XG5cbmV4cG9ydCB7TWVkaWFNVFhJbnN0YW5jZSwgUHJvcGVydHkgfTtcblxuY2xhc3MgUHJvcGVydHkge1xuICAgIGNvbnN0cnVjdG9yKGRlZixjdXJyZW50KSB7XG4gICAgICAgIHRoaXMuZGVmPWRlZjtcbiAgICAgICAgdGhpcy5jdXJyZW50PWN1cnJlbnQ7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7IGBkZWZhdWx0PVske3RoaXMuZGVmfV0gY3VycmVudD1bJHt0aGlzLmN1cnJlbnR9XWA7IH1cbn1cblxuY2xhc3MgTWVkaWFNVFhJbnN0YW5jZSB7XG5cbiAgICBjb25zdHJ1Y3RvcihpcCwgcG9ydCkge1xuICAgICAgICB0aGlzLmlwID0gaXA7XG4gICAgICAgIHRoaXMucG9ydCA9IHBvcnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5rZXlzID0gW107XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlcyA9IG5ldyBNYXAoKTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVzID0gbmV3IE1hcCgpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldERlZmF1bHRzKCkge1xuICAgICAgICBsZXQgbXR4ID0gbmV3IE1lZGlhTVRYKHRoaXMuaXAsIHRoaXMucG9ydCk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgbXR4LmdldERlZmF1bHRzKCkgfHwge307XG5cbiAgICAgICAgdGhpcy5rZXlzID0gT2JqZWN0LmtleXMoanNvbikuZmlsdGVyKGtleSA9PiAvXnJwaS8udGVzdChrZXkpKS50b1NvcnRlZCgpO1xuICAgICAgICB0aGlzLmRlZmF1bHRWYWx1ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goa2V5ID0+IHRoaXMuZGVmYXVsdFZhbHVlcy5zZXQoa2V5LCBqc29uW2tleV0pKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRDdXJyZW50cygpIHtcbiAgICAgICAgbGV0IG10eCA9IG5ldyBNZWRpYU1UWCh0aGlzLmlwLCB0aGlzLnBvcnQpO1xuICAgICAgICBsZXQganNvbiA9IGF3YWl0IG10eC5nZXRQYXRocygpIHx8IHt9O1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgICAgICAgIGxldCB2YWx1ZSA9IE9iamVjdC5oYXNPd24oanNvbixrZXkpID8ganNvbltrZXldIDogdGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVzLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgaW5pdGlhbGlzZSgpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXREZWZhdWx0cygpO1xuICAgICAgICBhd2FpdCB0aGlzLmdldEN1cnJlbnRzKCk7XG4gICAgfVxuXG4gICAgZ2V0KGtleSkge1xuICAgICAgICByZXR1cm4gbmV3IFByb3BlcnR5KHRoaXMuZGVmYXVsdFZhbHVlcy5nZXQoa2V5KSwgdGhpcy5jdXJyZW50VmFsdWVzLmdldChrZXkpKTtcbiAgICB9XG5cbiAgICBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH1cblxuICAgIHJlc2V0KGtleSkge1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpKTtcbiAgICB9XG4gICAgcmVzZXRBbGwoKSB7XG4gICAgICAgIHRoaXMua2V5cy5mb3JFYWNoKCBrZXkgPT4gdGhpcy5yZXNldChrZXkpKTtcbiAgICB9XG59XG4iLCJcbmltcG9ydCB7UHJvcGVydHlTcGVjaWZpZXJ9IGZyb20gJy4vcHJvcGVydHlTcGVjaWZpZXIuanMnO1xuaW1wb3J0IHtNb2Rlc30gZnJvbSBcIi4vcHJvcGVydGllcy5qc1wiO1xuZXhwb3J0IHtQaUNhbX07XG5cblxuY2xhc3MgX1BpQ2FtIHtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLnByb3BzID0gUHJvcGVydHlTcGVjaWZpZXIubG9hZCgpO1xuICAgIH1cblxuICAgIGFsbEtleXMoKSB7IHJldHVybiBbLi4udGhpcy5wcm9wcy5rZXlzKCldOyB9XG5cbiAgICBrZXlzKG1vZGUgPSBNb2Rlcy5Ob3JtYWwpIHtcbiAgICAgICAgcmV0dXJuIG1vZGUua2V5cztcbiAgICB9XG5cbiAgICBoYXMoa2V5LG1vZGUgPSBNb2Rlcy5BZHZhbmNlZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5rZXlzKG1vZGUpLmluY2x1ZGVzKGtleSk7XG4gICAgfVxuXG4gICAgc3BlYyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuZ2V0KGtleSk7XG4gICAgfVxuXG4gICAga2luZChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLmtpbmQ7XG4gICAgfVxuXG4gICAgaGVscChrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLmhlbHA7XG4gICAgfVxuXG4gICAgbWF4KGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkubWF4O1xuICAgIH1cblxuICAgIG1pbihrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3BlYyhrZXkpLm1pbjtcbiAgICB9XG5cbiAgICBjaG9pY2VzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkuY2hvaWNlcyB8fCBbXTtcbiAgICB9XG5cbn1cblxubGV0IFBpQ2FtID0gbmV3IF9QaUNhbSgpO1xuXG5cblxuIiwiZXhwb3J0IHtQaUNhbVNldHRpbmdzLCBNb2Rlc307XG5cbmNvbnN0IFBpQ2FtU2V0dGluZ3MgPSB7XG4vLyAgICBycGlDYW1lcmFDYW1JRDogWydpbnQnLCAwLCAyNTZdLFxuICAgIHJwaUNhbWVyYVdpZHRoOiBbJ2ludCcsIFswLCA2NTUzNl0sICdzY3JlZW4gd2lkdGggaW4gcGl4ZWxzJ10sXG4gICAgcnBpQ2FtZXJhSGVpZ2h0OiBbJ2ludCcsIFswLCA2NTUzNl0sICdzY3JlZW4gaGVpZ2h0IGluIHBpeGVscyddLFxuICAgIHJwaUNhbWVyYUhGbGlwOiBbJ2Jvb2wnLCAnaG9yaXpvbnRhbGx5IGZsaXAgaW1hZ2UnXSxcbiAgICBycGlDYW1lcmFWRmxpcDogWydib29sJywgJ3ZlcnRpY2FsbHkgZmxpcCBpbWFnZSddLFxuICAgIHJwaUNhbWVyYUJyaWdodG5lc3M6IFsnbnVtYmVyJywgWy0xLjAsIDEuMF0sICdpbWFnZSBicmlnaHRuZXNzJ10sXG4gICAgcnBpQ2FtZXJhQ29udHJhc3Q6IFsnaW50JywgWzAsIDE2XSwgJ2ltYWdlIGNvbnRyYXN0J10sXG4gICAgcnBpQ2FtZXJhU2F0dXJhdGlvbjogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2Ugc2F0dXJhdGlvbiddLFxuICAgIHJwaUNhbWVyYVNoYXJwbmVzczogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2Ugc2hhcnBuZXNzJ10sXG4gICAgcnBpQ2FtZXJhRXhwb3N1cmU6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnc2hvcnQnLCAnbG9uZycsICdjdXN0b20nXSwgJ2ltYWdlIGV4cG9zdXJlJ10sXG4gICAgcnBpQ2FtZXJhQVdCOiBbJ2Nob29zZScsIFsnYXV0bycsICdpbmNhbmRlc2NlbnQnLCAndHVuZ3N0ZW4nLCAnZmxvdXJlc2NlbnQnLCAnaW5kb29yJywgJ2RheWxpZ2h0JywgJ2Nsb3VkeScsICdjdXN0b20nXSwgJ2xpZ2h0aW5nIG1vZGVsJ10sXG4gICAgcnBpQ2FtZXJhRGVub2lzZTogWydjaG9vc2UnLCBbJ29mZicsICdjZG5fb2ZmJywgJ2Nkbl9mYXN0JywgJ2Nkbl9ocSddLCAnbm9pc2UgY29ycmVjdGlvbiddLFxuICAgIHJwaUNhbWVyYVNodXR0ZXI6IFsnaW50JywgWzAsIDEwNDg1NzZdLCAnY2FtZXJhIHNodXR0ZXIgc3BlZWQnXSxcbiAgICAvLyAgIHJwaUNhbWVyYU1ldGVyaW5nOiBbJ2Nob29zZScsWydjZW50cmUnLCdzcG90JywnbWF0cml4JywnY3VzdG9tJ11dLFxuLy8gICAgcnBpQ2FtZXJhR2FpbjogWydudW1iZXInLC0xNi45MCwxNi4wXSxcbi8vICAgIHJwaUNhbWVyYUVWOiBbJ251bWJlcicsLTEwLjAsMTAuMF0sXG4gICAgcnBpQ2FtZXJhQWZNb2RlOiBbJ2Nob29zZScsIFsnYXV0bycsICdtYW51YWwnLCAnY29udGludW91cyddLCAnYXV0b2ZvY3VzIG1vZGUnXSxcbiAgICBycGlDYW1lcmFBZlJhbmdlOiBbJ2Nob29zZScsIFsnbm9ybWFsJywgJ21hY3JvJywgJ2Z1bGwnXSwgJ2F1dG9mb2N1cyByYW5nZSddLFxuICAgIHJwaUNhbWVyYUFmU3BlZWQ6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnZmFzdCddLCAnYXV0b2ZvY3VzIHNwZWVkJ10sXG4gICAgcnBpQ2FtZXJhTGVuc1Bvc2l0aW9uOiBbJ251bWJlcicsIFswLjAsIDI1Ni4wXSwgJ2xlbnMgcG9zaXRpb24gKDEgLyBkaXN0YW5jZSB0byBvYmplY3QpJ11cbn07XG5cbmNsYXNzIE1vZGVzIHtcbiAgICBzdGF0aWMgTm9ybWFsID0gbmV3IE1vZGVzKCdOb3JtYWwnKTtcbiAgICBzdGF0aWMgQWR2YW5jZWQgPSBuZXcgTW9kZXMoJ0FkdmFuY2VkJyk7XG5cbiAgICBzdGF0aWMgbW9kZUtleXMgID0ge1xuICAgICAgICBOb3JtYWw6IFtcbiAgICAgICAgICAgICdycGlDYW1lcmFXaWR0aCcsXG4gICAgICAgICAgICAncnBpQ2FtZXJhSGVpZ2h0JyxcbiAgICAgICAgICAgICdycGlDYW1lcmFCcmlnaHRuZXNzJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFDb250cmFzdCcsXG4gICAgICAgICAgICAncnBpQ2FtZXJhU2F0dXJhdGlvbicsXG4gICAgICAgICAgICAncnBpQ2FtZXJhU2F0dXJhdGlvbicsXG4gICAgICAgICAgICAncnBpQ2FtZXJhQVdCJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFBZk1vZGUnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUxlbnNQb3NpdGlvbidcbiAgICAgICAgXSxcbiAgICAgICAgQWR2YW5jZWQ6IE9iamVjdC5rZXlzKFBpQ2FtU2V0dGluZ3MpXG4gICAgfTtcblxuICAgIHN0YXRpYyBhbGwoKSB7IHJldHVybiBbdGhpcy5Ob3JtYWwsIHRoaXMuQWR2YW5jZWRdOyB9XG5cbiAgICBjb25zdHJ1Y3RvcihuYW1lKSB7XG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkgeyByZXR1cm4gYE1vZGUuJHt0aGlzLm5hbWV9YDsgfVxuXG4gICAgZ2V0IGtleXMoKSB7XG4gICAgICAgIHJldHVybiBNb2Rlcy5tb2RlS2V5c1t0aGlzLm5hbWVdO1xuICAgIH1cbn0iLCJpbXBvcnQge1BpQ2FtU2V0dGluZ3N9IGZyb20gJy4vcHJvcGVydGllcy5qcyc7XG5leHBvcnQge1Byb3BlcnR5U3BlY2lmaWVyfTtcblxuY2xhc3MgUHJvcGVydHlTcGVjaWZpZXIge1xuICAgIGNvbnN0cnVjdG9yKGFyZ3MgPSBbXSkge1xuICAgICAgICB0aGlzLmtpbmQgPSBhcmdzWzBdIHx8ICcnO1xuICAgICAgICB0aGlzLmhlbHAgPSBhcmdzW2FyZ3MubGVuZ3RoLTFdIHx8ICcnO1xuXG4gICAgICAgIGxldCBtaW4gPSBOYU47XG4gICAgICAgIGxldCBtYXggPSBOYU47XG4gICAgICAgIGxldCBjaG9pY2VzID0gW107XG5cbiAgICAgICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgbWluID0gcGFyc2VJbnQoYXJnc1sxXVswXSk7XG4gICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VJbnQoYXJnc1sxXVsxXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIG1pbiA9IHBhcnNlRmxvYXQoYXJnc1sxXVswXSk7XG4gICAgICAgICAgICAgICAgbWF4ID0gcGFyc2VGbG9hdChhcmdzWzFdWzFdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2Nob29zZSc6XG4gICAgICAgICAgICAgICAgY2hvaWNlcyA9IGFyZ3NbMV07XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWluID0gbWluO1xuICAgICAgICB0aGlzLm1heCA9IG1heDtcbiAgICAgICAgdGhpcy5jaG9pY2VzID0gY2hvaWNlcztcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgc3dpdGNoICh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2Nob29zZSc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMua2luZH0gWyR7dGhpcy5oZWxwfV0gOiAke3RoaXMuY2hvaWNlc31gO1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMua2luZH0gWyR7dGhpcy5oZWxwfV1gO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XSA6ICR7dGhpcy5taW59LSR7dGhpcy5tYXh9YDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0YXRpYyBrZXlzKCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncyk7XG4gICAgfVxuXG4gICAgc3RhdGljIGxvYWQoKSB7XG5cbiAgICAgICAgbGV0IHByb3BzPW5ldyBNYXAoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgICAgIHByb3BzLnNldChrZXksbmV3IFByb3BlcnR5U3BlY2lmaWVyKFBpQ2FtU2V0dGluZ3Nba2V5XSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHByb3BzO1xuICAgIH1cbn1cblxuIiwiZXhwb3J0IHsgSFRUUFJlcXVlc3RzIGFzIGRlZmF1bHQgfTtcblxuXG5jbGFzcyBIVFRQUmVxdWVzdHMge1xuXG4gICAgY29uc3RydWN0b3IoKSB7fVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7SGVhZGVyc31cbiAgICAgKi9cbiAgICBoZWFkZXJzKCkge1xuICAgICAgICByZXR1cm4gbmV3IEhlYWRlcnMoe1xuICAgICAgICAgICAgXCJDb25uZWN0aW9uXCI6IFwia2VlcC1hbGl2ZVwiLFxuICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXG4gICAgICAgICAgICBcIkFjY2VwdC1FbmNvZGluZ1wiOiBcImd6aXAsIGRlZmxhdGUsIGJyXCJcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kXG4gICAgICogQHJldHVybnMge29iamVjdH1cbiAgICAgKi9cbiAgICBvcHRpb25zKG1ldGhvZCA9IFwiR0VUXCIpIHtcbiAgICAgICAgbGV0IGFjY2VwdCA9IChtZXRob2QgPT09IFwiUE9TVFwiKSA/IFwiYXBwbGljYXRpb24vanNvblwiIDogXCIqLypcIjtcbiAgICAgICAgbGV0IGhkciA9IHRoaXMuaGVhZGVycygpO1xuICAgICAgICBoZHIuYXBwZW5kKFwiQWNjZXB0XCIsIGFjY2VwdCk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgICAgICAgIGNhY2hlOiBcIm5vLWNhY2hlXCIsXG4gICAgICAgICAgICBjcmVkZW50aWFsczogXCJzYW1lLW9yaWdpblwiLFxuICAgICAgICAgICAgaGVhZGVyczogaGRyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxuICAgICAqL1xuICAgIGFzeW5jIGhhbmRsZSh1cmwsIG9wdGlvbnMpIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYE5ldHdvcmsgOiAke3Jlc3BvbnNlLnN0YXR1c31gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPCo+fVxuICAgICAqL1xuICAgIGFzeW5jIGdldCh1cmwpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnMoXCJHRVRcIik7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmhhbmRsZSh1cmwsIG9wdHMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBkYXRhXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgcGF0Y2godXJsLCBkYXRhKSB7XG4gICAgICAgIGxldCBvcHRzID0gdGhpcy5vcHRpb25zKFwiUEFUQ0hcIik7XG4gICAgICAgIG9wdHMuYm9keSA9IEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5oYW5kbGUodXJsLCBvcHRzKTtcbiAgICB9XG5cbn1cbiIsImltcG9ydCBIVFRQUmVxdWVzdHMgZnJvbSBcIi4vcmVzdC5qc1wiO1xuXG5leHBvcnQgeyBiYXNlVVJMUywgTWVkaWFNVFhBUEkgfTtcblxuY29uc3QgYmFzZVVSTFMgPSAoKG9iaikgPT4gT2JqZWN0LmZyZWV6ZShvYmopKSAoe1xuICAgIEJBU0UgOiBcIi92My9jb25maWdcIixcbiAgICBHTE9CQUwgOiBcImdsb2JhbFwiLFxuICAgIERFRkFVTFRTIDogXCJwYXRoZGVmYXVsdHNcIixcbiAgICBQQVRIUyA6IFwicGF0aHNcIixcbiAgICBMSVNUOiBcInBhdGhzL2xpc3RcIlxufSk7XG5cbmNvbnN0IGJhc2VBY3Rpb25zID0gKChvYmopID0+IE9iamVjdC5mcmVlemUob2JqKSkgKHtcbiAgICBSRUFEIDogXCJnZXRcIixcbiAgICBXUklURSA6IFwicGF0Y2hcIlxufSk7XG5cblxuXG5jbGFzcyBNZWRpYU1UWEFQSSB7XG5cbiAgICBjb25zdHJ1Y3RvcihcbiAgICAgICAgZGV2aWNlID0gJ2h0dHA6Ly8xMjcuMC4wLjE6OTk5NycsXG4gICAgICAgIHdoaWNoID0gYmFzZVVSTFMuUEFUSFMsXG4gICAgICAgIG5hbWUgPSBcIlwiKSB7XG4gICAgICAgIHRoaXMud2hpY2ggPSB3aGljaDtcbiAgICAgICAgdGhpcy5uYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5yb290ID0gYCR7ZGV2aWNlfSR7YmFzZVVSTFMuQkFTRX0vJHt0aGlzLndoaWNofWA7XG4gICAgfVxuXG4gICAgI3VybChhY3Rpb24gPSBiYXNlQWN0aW9ucy5SRUFEKSB7XG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XG4gICAgICAgICAgICBjYXNlIGJhc2VBY3Rpb25zLlJFQUQ6XG4gICAgICAgICAgICAgICAgbGV0IGNhbT0odGhpcy53aGljaD09PWJhc2VVUkxTLlBBVEhTKSA/IHRoaXMubmFtZSA6ICcnO1xuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnJvb3R9L2dldC8ke2NhbX1gO1xuICAgICAgICAgICAgY2FzZSBiYXNlQWN0aW9ucy5XUklURTpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5yb290fS9wYXRjaC8ke3RoaXMubmFtZX1gO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aHJvdyBFcnJvcigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgcmVhZCgpIHtcbiAgICAgICAgbGV0IHUgPSB0aGlzLiN1cmwoYmFzZUFjdGlvbnMuUkVBRCk7XG4gICAgICAgIHJldHVybiBhd2FpdCAobmV3IEhUVFBSZXF1ZXN0cygpLmdldCh1KSk7XG4gICAgfVxuXG4gICAgYXN5bmMgd3JpdGUoZGF0YSl7XG4gICAgICAgIGxldCB1ID0gdGhpcy4jdXJsKGJhc2VBY3Rpb25zLldSSVRFKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IChuZXcgSFRUUFJlcXVlc3RzKCkucGF0Y2godSxkYXRhKSk7XG4gICAgfVxuXG5cblxuXG59XG5cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHtBcHBsaWNhdGlvbkdVSX0gZnJvbSAnLi9ndWkvYXBwbGljYXRpb25HVUkuanMnO1xuXG5cbmZ1bmN0aW9uIHN0YXJ0KCkge1xuICAgIGxldCBhcHBHVUkgPSBuZXcgQXBwbGljYXRpb25HVUkoKTtcbiAgICBhcHBHVUkubG9hZCgpLnRoZW4oIF8gPT4ge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coJ0dVSSBsb2FkZWQnKTtcbiAgICB9KTtcbn1cblxuXG53aW5kb3cub25sb2FkID0gKF8pID0+IHtcbiAgICB3aW5kb3cuY29uc29sZS5sb2coJ1N0YXJ0aW5nJyk7XG4gICAgc3RhcnQoKTtcbiAgICB3aW5kb3cub25sb2FkID0gKF8pID0+IHt9O1xufTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9