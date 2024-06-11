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
            let th = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('th').text(text);
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
        this.element.setAttr(name,value);
        return this;
    }

    setAttrs(kv) {
        Object.keys(kv).forEach(key => this.element.setAttr(key,kv[key]));
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

    set [name](value) { this.element[name]=value; }
    get [name]() { return this.element[name]; }



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

        this.input = new _valueFields_js__WEBPACK_IMPORTED_MODULE_0__.PropertyField(this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };

        this.inBox  = this.input.field;

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
                        field.add(o);
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
                this.field.checked=value;
                break;
            default:
                this.field.value=value;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZUFBZSxRQUFRO0FBQ3ZCLGVBQWUsUUFBUTtBQUN2QixpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFcUM7O0FBRUo7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7OztBQUlEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixPQUFPLEVBQUUsY0FBYyxHQUFHLFdBQVc7QUFDNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVSxPQUFPLElBQUk7QUFDL0M7QUFDQSwwQkFBMEIsVUFBVSxTQUFTLFVBQVU7QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixnREFBWTtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGdEQUFZO0FBQ3RDOzs7OztBQUtBOzs7Ozs7OztVQ3ZEQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTnVEOzs7QUFHdkQ7QUFDQSxxQkFBcUIsa0VBQWM7QUFDbkM7QUFDQTtBQUNBLEtBQUs7QUFDTDs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL21lZGlhbXR4Ly4vanMvYXBpLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZGVmYXVsdHMvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvYXBwbGljYXRpb25HVUkuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9ndWkvZG9tLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL3RhYmxlUm93LmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL3ZhbHVlRmllbGRzLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vZGF0YVRhYmxlLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vcGFyc2VyLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vc3RydWN0dXJlL3BpY2FtLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vc3RydWN0dXJlL3Byb3BlcnRpZXMuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9waWNhbS9zdHJ1Y3R1cmUvcHJvcGVydHlTcGVjaWZpZXIuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9yZXN0LmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcmVzdFdyYXBwZXIuanMiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL21lZGlhbXR4L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGJhc2VVUkxTLCBNZWRpYU1UWEFQSSB9IGZyb20gXCIuL3Jlc3RXcmFwcGVyLmpzXCI7XG5cbmV4cG9ydCB7TWVkaWFNVFh9O1xuXG5jbGFzcyBNZWRpYU1UWCB7XG5cbiAgICBjb25zdHJ1Y3RvcihpcCA9ICcxMjcuMC4wLjEnLFxuICAgICAgICAgICAgICAgIHBvcnQgPSAnOTk5NycsXG4gICAgICAgICAgICAgICAgY2FtZXJhTmFtZSA9IFwiY2FtXCIpIHtcbiAgICAgICAgdGhpcy5kZXZpY2U9YGh0dHA6Ly8ke2lwfToke3BvcnR9YDtcbiAgICAgICAgdGhpcy5jYW1lcmEgPSBjYW1lcmFOYW1lO1xuICAgIH1cblxuICAgIGFzeW5jIGdldCh3aGljaCA9IGJhc2VVUkxTLkRFRkFVTFRTKSB7XG4gICAgICAgIGxldCBjYW0gPSAod2hpY2g9PT1iYXNlVVJMUy5QQVRIUykgPyB0aGlzLmNhbWVyYSA6ICcnO1xuICAgICAgICBsZXQgbXR4PSBuZXcgTWVkaWFNVFhBUEkodGhpcy5kZXZpY2Usd2hpY2gsY2FtKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG10eC5yZWFkKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0KHdoaWNoID0gYmFzZVVSTFMuREVGQVVMVFMsIHZhbHVlcyA9IHt9KSB7XG4gICAgICAgIGxldCBtdHg9IG5ldyBNZWRpYU1UWEFQSSh0aGlzLmRldmljZSx3aGljaCwgdGhpcy5jYW1lcmEpO1xuICAgICAgICByZXR1cm4gYXdhaXQgbXR4LndyaXRlKHZhbHVlcyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RGVmYXVsdHMoKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldChiYXNlVVJMUy5ERUZBVUxUUyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0UGF0aHMoKXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KGJhc2VVUkxTLlBBVEhTKTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXRHbG9iYWwoKXtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZ2V0KGJhc2VVUkxTLkdMT0JBTCk7XG4gICAgfVxuXG4gICAgYXN5bmMgc2V0UGF0aCh2YWx1ZXMgPSB7fSl7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLnNldChiYXNlVVJMUy5QQVRIUywgdmFsdWVzKTtcbiAgICB9XG5cblxuXG5cbn1cbiIsImV4cG9ydCB7IERlZmF1bHRzIH07XG5cbi8qKlxuICpcbiAqIEBuYW1lIERlZmF1bHRzXG4gKlxuICogQGNvbnN0YW50XG4gKiBAdHlwZSB7T2JqZWN0LjxzdHJpbmcsIHN0cmluZz59XG4gKiBAZGVmYXVsdFxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIHN0YW5kYXJkIGNvbnN0YW50cyB1c2VkIHRocm91Z2hvdXQgdGhlIGFwcGxpY2F0aW9uXG4gKiBAdG9kbyBSZXBsYWNlIHRoZSBpbXBsZW1lbnRhdGlvbiBhcyBhbiBvYmplY3Qgd2l0aCBzb21ldGhpbmcgbW9yZSBkeW5hbWljXG4gKi9cblxuY29uc3QgRGVmYXVsdHMgPSB7XG4gICAgSVBfQUREUkVTUzogJzE5Mi4xNjguMC4yMDMnLFxuICAgIFBPUlQ6ICc5OTk3JyxcbiAgICBDQU1FUkFfTkFNRTogJ2NhbSdcbn07IiwiaW1wb3J0IHtUYWJsZVJvd30gZnJvbSBcIi4vdGFibGVSb3cuanNcIjtcbmltcG9ydCB7TW9kZXN9IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcHJvcGVydGllcy5qc1wiO1xuXG5leHBvcnQge0FwcGxpY2F0aW9uR1VJfTtcblxuaW1wb3J0IHtQaVByb3BlcnR5VmFsdWVzfSBmcm9tICcuLi9waWNhbS9kYXRhVGFibGUuanMnO1xuaW1wb3J0IHtQaUNhbX0gZnJvbSBcIi4uL3BpY2FtL3N0cnVjdHVyZS9waWNhbS5qc1wiO1xuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSBcIi4uL2RlZmF1bHRzL2RlZmF1bHRzLmpzXCI7XG5pbXBvcnQge0RPTX0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmNsYXNzIEFwcGxpY2F0aW9uR1VJIHtcblxuICAgIHN0YXRpYyBIZWFkZXJzID0gW1xuICAgICAgICAnRGVmYXVsdCcsXG4gICAgICAgICdEZXNjcmlwdGlvbicsXG4gICAgICAgICdWYWx1ZScsXG4gICAgICAgICcnLFxuICAgICAgICAnJ1xuICAgIF07XG5cbiAgICBjb25zdHJ1Y3Rvcihtb2RlID0gTW9kZXMuTm9ybWFsKSB7XG4gICAgICAgIHRoaXMuSVAgPSBEZWZhdWx0cy5JUF9BRERSRVNTO1xuICAgICAgICB0aGlzLlBPUlQgPSBEZWZhdWx0cy5QT1JUO1xuICAgICAgICB0aGlzLl9tb2RlID0gbW9kZTtcblxuICAgICAgICB0aGlzLnByb3BlcnRpZXMgPSBuZXcgUGlQcm9wZXJ0eVZhbHVlcyh0aGlzLklQLHRoaXMuUE9SVCk7XG4gICAgICAgIHRoaXMucm93cyA9IHt9O1xuXG4gICAgICAgIHRoaXMudGFnID0gRE9NLndpdGhJRCgnaW5wdXRzJyk7IC8vZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2lucHV0cycpO1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYFBJQ0FNIGlzIFske1BpQ2FtfV1gKTtcbiAgICB9XG5cbiAgICBhc3luYyBsb2FkKCkge1xuXG4gICAgICAgIGxldCBzdGF0ZXMgPSBhd2FpdCB0aGlzLnByb3BlcnRpZXMubG9hZCh0aGlzLm1vZGUpO1xuICAgICAgICB0aGlzLnJvd3MgPSB7fTtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBNb2RlIGlzICR7dGhpcy5tb2RlLnRvU3RyaW5nKCl9YCk7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgS2V5cyBhcmUgJHtQaUNhbS5rZXlzKHRoaXMubW9kZSl9YCk7XG4gICAgICAgIHN0YXRlcy5mb3JFYWNoKHN0YXRlID0+IHtcbiAgICAgICAgICAgIGxldCByb3cgPSBuZXcgVGFibGVSb3coc3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5yb3dzW3Jvdy5maWVsZE5hbWVdID0gcm93O1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcblxuXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7TW9kZXN9XG4gICAgICovXG4gICAgZ2V0IG1vZGUoKSB7IHJldHVybiB0aGlzLl9tb2RlOyB9XG4gICAgc2V0IG1vZGUodmFsdWUpIHtcbiAgICAgICAgdGhpcy5fbW9kZT12YWx1ZTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICByZW5kZXIoKSB7XG4gICAgICAgIHRoaXMudGFnLmVtcHR5KCk7XG5cbiAgICAgICAgbGV0IHRhYmxlID0gbmV3IERPTSgndGFibGUnKTtcbiAgICAgICAgbGV0IGhlYWRlclJvdyA9IG5ldyBET00oJ3RyJyk7XG4gICAgICAgIEFwcGxpY2F0aW9uR1VJLkhlYWRlcnMuZm9yRWFjaCggdGV4dCA9PiB7XG4gICAgICAgICAgICBsZXQgdGggPSBuZXcgRE9NKCd0aCcpLnRleHQodGV4dCk7XG4gICAgICAgICAgICBoZWFkZXJSb3cuYXBwZW5kKHRoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHRhYmxlLmFwcGVuZChoZWFkZXJSb3cpO1xuXG5cbiAgICAgICAgUGlDYW0ua2V5cyh0aGlzLm1vZGUpLmZvckVhY2goIGtleSA9PiB0YWJsZS5hcHBlbmQodGhpcy5yb3dzW2tleV0uZG9tKSk7XG4gICAgICAgIHRoaXMudGFnLmFwcGVuZCh0YWJsZSk7XG4gICAgfVxufSIsImV4cG9ydCB7RE9NfTtcblxuY2xhc3MgRE9NIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgd2l0aElEKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgRE9NKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudCB9dGFnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcyA9IHt9KSB7XG4gICAgICAgIGlmKHR5cGVvZih0YWcpPT09J3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgdGhpcy5lbGVtZW50PXRhZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFByb3BzKHByb3BzKTtcbiAgICB9XG5cbiAgICBnZXQgZG9tKCkgeyByZXR1cm4gdGhpcy5lbGVtZW50OyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZX0gcm9vdFxuICAgICAqL1xuICAgIG1hcChyb290ID0gZG9jdW1lbnQpIHtcbiAgICAgICAgcm9vdC5hcHBlbmRDaGlsZCh0aGlzLmVsZW1lbnQpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RE9NfSBjaGlsZFxuICAgICAqIEByZXR1cm5zIHtET019XG4gICAgICovXG4gICAgYXBwZW5kKGNoaWxkKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChjaGlsZC5kb20pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBlbXB0eSgpIHtcbiAgICAgICAgd2hpbGUodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5yZW1vdmVDaGlsZCh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxuICAgICAqL1xuICAgIHRleHQodmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHZhbHVlKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEF0dHIobmFtZSx2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cihuYW1lLHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0QXR0cnMoa3YpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoa3YpLmZvckVhY2goa2V5ID0+IHRoaXMuZWxlbWVudC5zZXRBdHRyKGtleSxrdltrZXldKSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcGFyYW0ge2FueX0gdmFsdWVcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxuICAgICAqL1xuICAgIHNldFByb3AobmFtZSx2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnRbbmFtZV09dmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGt2XG4gICAgICogQHJldHVybiB7RE9NfVxuICAgICAqL1xuICAgIHNldFByb3BzKGt2KSB7XG4gICAgICAgIE9iamVjdC5rZXlzKGt2KS5mb3JFYWNoKGtleSA9PiB0aGlzLmVsZW1lbnRba2V5XT1rdltrZXldKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZ2V0UHJvcChuYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsZW1lbnRbbmFtZV07XG4gICAgfVxuXG4gICAgc2V0IFtuYW1lXSh2YWx1ZSkgeyB0aGlzLmVsZW1lbnRbbmFtZV09dmFsdWU7IH1cbiAgICBnZXQgW25hbWVdKCkgeyByZXR1cm4gdGhpcy5lbGVtZW50W25hbWVdOyB9XG5cblxuXG59XG5cbiIsImltcG9ydCB7IFByb3BlcnR5RmllbGQgfSBmcm9tICcuL3ZhbHVlRmllbGRzLmpzJztcbmltcG9ydCB7UGlDYW19IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanNcIjtcbmltcG9ydCB7RE9NfSBmcm9tIFwiLi9kb20uanNcIjtcblxuZXhwb3J0IHsgVGFibGVSb3cgfTtcblxuY2xhc3MgVGFibGVSb3cge1xuXG4gICAgc3RhdGljIHRleHRCb3godGV4dD0nJyxuYW1lPSd0ZXh0Jykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnc3BhbicpXG4gICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgLnNldEF0dHIoJ25hbWUnLG5hbWUpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVhZG9ubHlCb3godmFsdWUsbmFtZT0nJykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnaW5wdXQnLHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA6dHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgfSkuc2V0QXR0cignbmFtZScsbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnV0dG9uKG1lc3NhZ2UsIG5hbWU9JycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBET00oJ2J1dHRvbicpXG4gICAgICAgICAgICAudGV4dChtZXNzYWdlKVxuICAgICAgICAgICAgLnNldEF0dHJzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBsZXQgZmllbGQgPSBzdGF0ZS5rZXkgfHwgXCJcIjtcbiAgICAgICAgaWYoIVBpQ2FtLmhhcyhmaWVsZCkpIHsgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIGZpZWxkIGFzICR7ZmllbGR9YCk7IH1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gUGlDYW0uc3BlYyhmaWVsZCk7XG4gICAgICAgIHRoaXMuZmllbGROYW1lID0gZmllbGQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5kb209dGhpcy5tYXAoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXQgb25jaGFuZ2UoKSB7IHJldHVybiB0aGlzLmlucHV0Lm9uaW5wdXQoKTsgfVxuICAgIC8vc2V0IG9uY2hhbmdlKGNiKSB7IHRoaXMuaW5wdXQub25pbnB1dD1jYjsgfVxuXG5cbiAgICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmlucHV0LnZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKHYpIHsgdGhpcy5pbnB1dC52YWx1ZT12OyB9XG5cbiAgICAjcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlPXRoaXMuc3RhdGUuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIG1hcCgpIHtcbiAgICAgICAgdGhpcy5kZWZCb3ggPSBUYWJsZVJvdy5yZWFkb25seUJveCh0aGlzLnN0YXRlLmRlZmF1bHRWYWx1ZS50b1N0cmluZygpLCdkZWZhdWx0Jyk7XG4gICAgICAgIHRoaXMuZGVzY0JveCA9IFRhYmxlUm93LnRleHRCb3godGhpcy5wYXJhbWV0ZXJzLmhlbHAsJ2hlbHAnKTtcblxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IFByb3BlcnR5RmllbGQodGhpcy5wYXJhbWV0ZXJzLHRoaXMuc3RhdGUuZWRpdGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0Lm9uaW5wdXQgPSAodmFsdWUpID0+IHsgdGhpcy5zdGF0ZS5lZGl0ZWRWYWx1ZSA9IHZhbHVlOyB9O1xuXG4gICAgICAgIHRoaXMuaW5Cb3ggID0gdGhpcy5pbnB1dC5maWVsZDtcblxuICAgICAgICB0aGlzLnJlc2V0RCAgID0gVGFibGVSb3cuYnV0dG9uKCdUbyBkZWZhdWx0JywnZGVmQnV0dG9uJyk7XG4gICAgICAgIHRoaXMucmVzZXRELm9uY2xpY2sgPSAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudG9EZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLiNyZWxvYWQoKTtcbiAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnJlc2V0QyAgID0gVGFibGVSb3cuYnV0dG9uKCdUbyBjdXJyZW50JywnY3VyckJ1dHRvbicpO1xuICAgICAgICB0aGlzLnJlc2V0Qy5vbmNsaWNrID0gKGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRvQ3VycmVudCgpO1xuICAgICAgICAgICAgdGhpcy4jcmVsb2FkKCk7XG4gICAgICAgIH07XG5cblxuICAgICAgICBsZXQgY2VsbHMgPSBbdGhpcy5kZWZCb3gsdGhpcy5kZXNjQm94LHRoaXMuaW5Cb3gsdGhpcy5yZXNldEQsIHRoaXMucmVzZXRDXS5tYXAgKCBjZWxsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRE9NKCd0ZCcpLmFwcGVuZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByb3cgPSBuZXcgRE9NKCd0cicpLnNldEF0dHIoJ25hbWUnLHRoaXMuZmllbGROYW1lKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHJvdy5hcHBlbmQoY2VsbCkpO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuXG5cbn0iLCJpbXBvcnQge1BpQ2FtfSBmcm9tICcuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanMnO1xuaW1wb3J0IHtET019IGZyb20gXCIuL2RvbS5qc1wiO1xuZXhwb3J0IHtQcm9wZXJ0eUZpZWxkfTtcblxuZnVuY3Rpb24gaXNOdWxsKHgpIHsgcmV0dXJuIHg9PT1udWxsOyB9XG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh4KSB7IHJldHVybiB4PT09dW5kZWZpbmVkOyB9XG5mdW5jdGlvbiBpc051bGxPclVuZGVmaW5lZCh4KSB7IHJldHVybiBpc051bGwoeCkgfHwgaXNVbmRlZmluZWQoeCk7IH1cblxuXG5cbmNsYXNzIFByb3BlcnR5RmllbGQge1xuXG5cblxuICAgIHN0YXRpYyBtYWtlRmllbGQocGFyYW1zKSB7XG4gICAgICAgIGNvbnN0IGtpbmQgPSBwYXJhbXMua2luZDtcbiAgICAgICAgbGV0IGZpZWxkO1xuICAgICAgICBzd2l0Y2goa2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2NoZWNrYm94J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW50JzpcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgICAgICBtaW46IHBhcmFtcy5taW4sXG4gICAgICAgICAgICAgICAgICAgIG1heDogcGFyYW1zLm1heFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICBmaWVsZD1uZXcgRE9NKCdzZWxlY3QnLHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGU6IGZhbHNlXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcGFyYW1zLmNob2ljZXMuZm9yRWFjaCAodiA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgbyA9IG5ldyBET00oJ29wdGlvbicse1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRleHQ6IHZcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQuYWRkKG8pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgZmllbGQ9bmV3IERPTSgnaW5wdXQnLCB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICd0ZXh0J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGZpZWxkLnNldEF0dHIoJ25hbWUnLHBhcmFtcy5uYW1lKTtcbiAgICAgICAgcmV0dXJuIGZpZWxkO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHBhcmFtcywgdmFsdWUpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gcGFyYW1zO1xuICAgICAgICB0aGlzLm5hbWU9cGFyYW1zLm5hbWU7XG4gICAgICAgIHRoaXMuZmllbGQgPSBQcm9wZXJ0eUZpZWxkLm1ha2VGaWVsZChwYXJhbXMpO1xuICAgICAgICB0aGlzLm9uaW5wdXQgPSAodikgPT4ge307XG5cbiAgICAgICAgdGhpcy52YWx1ZVRvTG9hZCA9IHZhbHVlO1xuXG4gICAgICAgIHRoaXMuZmllbGQub25pbnB1dCA9IChldikgPT4ge1xuICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKCdPbiBpbnB1dCBmaXJlZCcpO1xuICAgICAgICAgICAgaWYodGhpcy5pc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnJyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbmlucHV0KHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5zZXRDdXN0b21WYWxpZGl0eSgnSW52YWxpZCBlbnRyeScpO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgQmFkIGVudHJ5IG9uICR7bmFtZX1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy52YWx1ZT12YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQga2luZCgpIHsgcmV0dXJuIHRoaXMucGFyYW1ldGVycy5raW5kOyB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZmllbGQudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLmNoZWNrZWQ7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWx1ZSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC5jaGVja2VkPXZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkLnZhbHVlPXZhbHVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxuICAgIGdldCBpc1ZhbGlkKCkge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYENoZWNraW5nIHZhbGlkaXR5OiAke3RoaXMua2luZH0gOiAke3RoaXMudmFsdWV9YCk7XG4gICAgICAgIHN3aXRjaCh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiAhTnVtYmVyLmlzTmFOKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxufVxuIiwiXG5pbXBvcnQgeyBQaUNhbSB9IGZyb20gJy4vc3RydWN0dXJlL3BpY2FtLmpzJztcbmltcG9ydCB7TWVkaWFNVFhJbnN0YW5jZSwgUHJvcGVydHl9IGZyb20gXCIuL3BhcnNlci5qc1wiO1xuaW1wb3J0IHtUYWJsZVJvd30gZnJvbSBcIi4uL2d1aS90YWJsZVJvdy5qc1wiO1xuXG5leHBvcnQgeyBQaVByb3BlcnR5VmFsdWVzIH07XG5cbmNsYXNzIFByb3BlcnR5U3RhdGUge1xuICAgICNrZXk7XG4gICAgI2VkaXRlZDtcbiAgICAjZGVmYXVsdDtcbiAgICAjY3VycmVudDtcbiAgICAjbW9kaWZpZWQ7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGtleSxwcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLiNrZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuI2RlZmF1bHQgPSBwcm9wZXJ0eS5kZWY7XG4gICAgICAgIHRoaXMuI2N1cnJlbnQgPSBwcm9wZXJ0eS5jdXJyZW50O1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNjdXJyZW50O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQga2V5KCkgeyByZXR1cm4gdGhpcy4ja2V5OyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBpc01vZGlmaWVkKCkgeyByZXR1cm4gdGhpcy4jbW9kaWZpZWQ7IH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZ2V0IGVkaXRlZFZhbHVlKCkgeyByZXR1cm4gdGhpcy4jZWRpdGVkOyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgICAqL1xuICAgIHNldCBlZGl0ZWRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50VmFsdWUoKSB7IHJldHVybiB0aGlzLiNjdXJyZW50OyB9XG4gICAgZ2V0IGRlZmF1bHRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuI2RlZmF1bHQ7IH1cblxuICAgIHRvRGVmYXVsdCgpe1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNkZWZhdWx0O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9DdXJyZW50KCkge1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNjdXJyZW50O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IGZhbHNlO1xuICAgIH1cbjFcblxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgdGhpcy4jY3VycmVudCA9IHRoaXMuI2VkaXRlZDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh0aGlzLmRlZmF1bHRWYWx1ZSwgdGhpcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbn1cblxuY2xhc3MgUGlQcm9wZXJ0eVZhbHVlcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3J0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaXAsIHBvcnQpIHtcbiAgICAgICAgdGhpcy5tdHggPSBuZXcgTWVkaWFNVFhJbnN0YW5jZShpcCxwb3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW9kZXN9IG1vZGVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKG1vZGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5tdHguaW5pdGlhbGlzZSgpO1xuICAgICAgICByZXR1cm4gUGlDYW0ua2V5cyhtb2RlKS5tYXAoIGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLm10eC5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlTdGF0ZShrZXkscHJvcGVydHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKHN0YXRlcyA9IFtdKSB7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5pc01vZGlmaWVkKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHt9O1xuICAgICAgICBjaGFuZ2VkLmZvckVhY2goIHN0YXRlID0+IHtcbiAgICAgICAgICAgIG91dHB1dFtzdGF0ZS5rZXldID0gc3RhdGUuY29tbWl0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG5cblxufVxuIiwiaW1wb3J0IHtNZWRpYU1UWH0gZnJvbSAnLi4vYXBpLmpzJztcblxuZXhwb3J0IHtNZWRpYU1UWEluc3RhbmNlLCBQcm9wZXJ0eSB9O1xuXG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGVmLGN1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5kZWY9ZGVmO1xuICAgICAgICB0aGlzLmN1cnJlbnQ9Y3VycmVudDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHsgYGRlZmF1bHQ9WyR7dGhpcy5kZWZ9XSBjdXJyZW50PVske3RoaXMuY3VycmVudH1dYDsgfVxufVxuXG5jbGFzcyBNZWRpYU1UWEluc3RhbmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKGlwLCBwb3J0KSB7XG4gICAgICAgIHRoaXMuaXAgPSBpcDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RGVmYXVsdHMoKSB7XG4gICAgICAgIGxldCBtdHggPSBuZXcgTWVkaWFNVFgodGhpcy5pcCwgdGhpcy5wb3J0KTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCBtdHguZ2V0RGVmYXVsdHMoKSB8fCB7fTtcblxuICAgICAgICB0aGlzLmtleXMgPSBPYmplY3Qua2V5cyhqc29uKS5maWx0ZXIoa2V5ID0+IC9ecnBpLy50ZXN0KGtleSkpLnRvU29ydGVkKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmtleXMuZm9yRWFjaChrZXkgPT4gdGhpcy5kZWZhdWx0VmFsdWVzLnNldChrZXksIGpzb25ba2V5XSkpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEN1cnJlbnRzKCkge1xuICAgICAgICBsZXQgbXR4ID0gbmV3IE1lZGlhTVRYKHRoaXMuaXAsIHRoaXMucG9ydCk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgbXR4LmdldFBhdGhzKCkgfHwge307XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0Lmhhc093bihqc29uLGtleSkgPyBqc29uW2tleV0gOiB0aGlzLmRlZmF1bHRWYWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBpbml0aWFsaXNlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmdldERlZmF1bHRzKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0Q3VycmVudHMoKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkodGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpLCB0aGlzLmN1cnJlbnRWYWx1ZXMuZ2V0KGtleSkpO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVzZXQoa2V5KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5zZXQoa2V5LCB0aGlzLmRlZmF1bHRWYWx1ZXMuZ2V0KGtleSkpO1xuICAgIH1cbiAgICByZXNldEFsbCgpIHtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goIGtleSA9PiB0aGlzLnJlc2V0KGtleSkpO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHtQcm9wZXJ0eVNwZWNpZmllcn0gZnJvbSAnLi9wcm9wZXJ0eVNwZWNpZmllci5qcyc7XG5pbXBvcnQge01vZGVzfSBmcm9tIFwiLi9wcm9wZXJ0aWVzLmpzXCI7XG5leHBvcnQge1BpQ2FtfTtcblxuXG5jbGFzcyBfUGlDYW0ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBQcm9wZXJ0eVNwZWNpZmllci5sb2FkKCk7XG4gICAgfVxuXG4gICAgYWxsS2V5cygpIHsgcmV0dXJuIFsuLi50aGlzLnByb3BzLmtleXMoKV07IH1cblxuICAgIGtleXMobW9kZSA9IE1vZGVzLk5vcm1hbCkge1xuICAgICAgICByZXR1cm4gbW9kZS5rZXlzO1xuICAgIH1cblxuICAgIGhhcyhrZXksbW9kZSA9IE1vZGVzLkFkdmFuY2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleXMobW9kZSkuaW5jbHVkZXMoa2V5KTtcbiAgICB9XG5cbiAgICBzcGVjKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBraW5kKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkua2luZDtcbiAgICB9XG5cbiAgICBoZWxwKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkuaGVscDtcbiAgICB9XG5cbiAgICBtYXgoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwZWMoa2V5KS5tYXg7XG4gICAgfVxuXG4gICAgbWluKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkubWluO1xuICAgIH1cblxuICAgIGNob2ljZXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwZWMoa2V5KS5jaG9pY2VzIHx8IFtdO1xuICAgIH1cblxufVxuXG5sZXQgUGlDYW0gPSBuZXcgX1BpQ2FtKCk7XG5cblxuXG4iLCJleHBvcnQge1BpQ2FtU2V0dGluZ3MsIE1vZGVzfTtcblxuY29uc3QgUGlDYW1TZXR0aW5ncyA9IHtcbi8vICAgIHJwaUNhbWVyYUNhbUlEOiBbJ2ludCcsIDAsIDI1Nl0sXG4gICAgcnBpQ2FtZXJhV2lkdGg6IFsnaW50JywgWzAsIDY1NTM2XSwgJ3NjcmVlbiB3aWR0aCBpbiBwaXhlbHMnXSxcbiAgICBycGlDYW1lcmFIZWlnaHQ6IFsnaW50JywgWzAsIDY1NTM2XSwgJ3NjcmVlbiBoZWlnaHQgaW4gcGl4ZWxzJ10sXG4gICAgcnBpQ2FtZXJhSEZsaXA6IFsnYm9vbCcsICdob3Jpem9udGFsbHkgZmxpcCBpbWFnZSddLFxuICAgIHJwaUNhbWVyYVZGbGlwOiBbJ2Jvb2wnLCAndmVydGljYWxseSBmbGlwIGltYWdlJ10sXG4gICAgcnBpQ2FtZXJhQnJpZ2h0bmVzczogWydudW1iZXInLCBbLTEuMCwgMS4wXSwgJ2ltYWdlIGJyaWdodG5lc3MnXSxcbiAgICBycGlDYW1lcmFDb250cmFzdDogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2UgY29udHJhc3QnXSxcbiAgICBycGlDYW1lcmFTYXR1cmF0aW9uOiBbJ2ludCcsIFswLCAxNl0sICdpbWFnZSBzYXR1cmF0aW9uJ10sXG4gICAgcnBpQ2FtZXJhU2hhcnBuZXNzOiBbJ2ludCcsIFswLCAxNl0sICdpbWFnZSBzaGFycG5lc3MnXSxcbiAgICBycGlDYW1lcmFFeHBvc3VyZTogWydjaG9vc2UnLCBbJ25vcm1hbCcsICdzaG9ydCcsICdsb25nJywgJ2N1c3RvbSddLCAnaW1hZ2UgZXhwb3N1cmUnXSxcbiAgICBycGlDYW1lcmFBV0I6IFsnY2hvb3NlJywgWydhdXRvJywgJ2luY2FuZGVzY2VudCcsICd0dW5nc3RlbicsICdmbG91cmVzY2VudCcsICdpbmRvb3InLCAnZGF5bGlnaHQnLCAnY2xvdWR5JywgJ2N1c3RvbSddLCAnbGlnaHRpbmcgbW9kZWwnXSxcbiAgICBycGlDYW1lcmFEZW5vaXNlOiBbJ2Nob29zZScsIFsnb2ZmJywgJ2Nkbl9vZmYnLCAnY2RuX2Zhc3QnLCAnY2RuX2hxJ10sICdub2lzZSBjb3JyZWN0aW9uJ10sXG4gICAgcnBpQ2FtZXJhU2h1dHRlcjogWydpbnQnLCBbMCwgMTA0ODU3Nl0sICdjYW1lcmEgc2h1dHRlciBzcGVlZCddLFxuICAgIC8vICAgcnBpQ2FtZXJhTWV0ZXJpbmc6IFsnY2hvb3NlJyxbJ2NlbnRyZScsJ3Nwb3QnLCdtYXRyaXgnLCdjdXN0b20nXV0sXG4vLyAgICBycGlDYW1lcmFHYWluOiBbJ251bWJlcicsLTE2LjkwLDE2LjBdLFxuLy8gICAgcnBpQ2FtZXJhRVY6IFsnbnVtYmVyJywtMTAuMCwxMC4wXSxcbiAgICBycGlDYW1lcmFBZk1vZGU6IFsnY2hvb3NlJywgWydhdXRvJywgJ21hbnVhbCcsICdjb250aW51b3VzJ10sICdhdXRvZm9jdXMgbW9kZSddLFxuICAgIHJwaUNhbWVyYUFmUmFuZ2U6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnbWFjcm8nLCAnZnVsbCddLCAnYXV0b2ZvY3VzIHJhbmdlJ10sXG4gICAgcnBpQ2FtZXJhQWZTcGVlZDogWydjaG9vc2UnLCBbJ25vcm1hbCcsICdmYXN0J10sICdhdXRvZm9jdXMgc3BlZWQnXSxcbiAgICBycGlDYW1lcmFMZW5zUG9zaXRpb246IFsnbnVtYmVyJywgWzAuMCwgMjU2LjBdLCAnbGVucyBwb3NpdGlvbiAoMSAvIGRpc3RhbmNlIHRvIG9iamVjdCknXVxufTtcblxuY2xhc3MgTW9kZXMge1xuICAgIHN0YXRpYyBOb3JtYWwgPSBuZXcgTW9kZXMoJ05vcm1hbCcpO1xuICAgIHN0YXRpYyBBZHZhbmNlZCA9IG5ldyBNb2RlcygnQWR2YW5jZWQnKTtcblxuICAgIHN0YXRpYyBtb2RlS2V5cyAgPSB7XG4gICAgICAgIE5vcm1hbDogW1xuICAgICAgICAgICAgJ3JwaUNhbWVyYVdpZHRoJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFIZWlnaHQnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUJyaWdodG5lc3MnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUNvbnRyYXN0JyxcbiAgICAgICAgICAgICdycGlDYW1lcmFTYXR1cmF0aW9uJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFTYXR1cmF0aW9uJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFBV0InLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUFmTW9kZScsXG4gICAgICAgICAgICAncnBpQ2FtZXJhTGVuc1Bvc2l0aW9uJ1xuICAgICAgICBdLFxuICAgICAgICBBZHZhbmNlZDogT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncylcbiAgICB9O1xuXG4gICAgc3RhdGljIGFsbCgpIHsgcmV0dXJuIFt0aGlzLk5vcm1hbCwgdGhpcy5BZHZhbmNlZF07IH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lPW5hbWU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7IHJldHVybiBgTW9kZS4ke3RoaXMubmFtZX1gOyB9XG5cbiAgICBnZXQga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIE1vZGVzLm1vZGVLZXlzW3RoaXMubmFtZV07XG4gICAgfVxufSIsImltcG9ydCB7UGlDYW1TZXR0aW5nc30gZnJvbSAnLi9wcm9wZXJ0aWVzLmpzJztcbmV4cG9ydCB7UHJvcGVydHlTcGVjaWZpZXJ9O1xuXG5jbGFzcyBQcm9wZXJ0eVNwZWNpZmllciB7XG4gICAgY29uc3RydWN0b3IoYXJncyA9IFtdKSB7XG4gICAgICAgIHRoaXMua2luZCA9IGFyZ3NbMF0gfHwgJyc7XG4gICAgICAgIHRoaXMuaGVscCA9IGFyZ3NbYXJncy5sZW5ndGgtMV0gfHwgJyc7XG5cbiAgICAgICAgbGV0IG1pbiA9IE5hTjtcbiAgICAgICAgbGV0IG1heCA9IE5hTjtcbiAgICAgICAgbGV0IGNob2ljZXMgPSBbXTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnaW50JzpcbiAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChhcmdzWzFdWzBdKTtcbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChhcmdzWzFdWzFdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgbWluID0gcGFyc2VGbG9hdChhcmdzWzFdWzBdKTtcbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUZsb2F0KGFyZ3NbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICBjaG9pY2VzID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5taW4gPSBtaW47XG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xuICAgICAgICB0aGlzLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XSA6ICR7dGhpcy5jaG9pY2VzfWA7XG4gICAgICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XWA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmtpbmR9IFske3RoaXMuaGVscH1dIDogJHt0aGlzLm1pbn0tJHt0aGlzLm1heH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhQaUNhbVNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZCgpIHtcblxuICAgICAgICBsZXQgcHJvcHM9bmV3IE1hcCgpO1xuICAgICAgICBPYmplY3Qua2V5cyhQaUNhbVNldHRpbmdzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMuc2V0KGtleSxuZXcgUHJvcGVydHlTcGVjaWZpZXIoUGlDYW1TZXR0aW5nc1trZXldKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgeyBIVFRQUmVxdWVzdHMgYXMgZGVmYXVsdCB9O1xuXG5cbmNsYXNzIEhUVFBSZXF1ZXN0cyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtIZWFkZXJzfVxuICAgICAqL1xuICAgIGhlYWRlcnMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbm5lY3Rpb25cIjogXCJrZWVwLWFsaXZlXCIsXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQWNjZXB0LUVuY29kaW5nXCI6IFwiZ3ppcCwgZGVmbGF0ZSwgYnJcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIG9wdGlvbnMobWV0aG9kID0gXCJHRVRcIikge1xuICAgICAgICBsZXQgYWNjZXB0ID0gKG1ldGhvZCA9PT0gXCJQT1NUXCIpID8gXCJhcHBsaWNhdGlvbi9qc29uXCIgOiBcIiovKlwiO1xuICAgICAgICBsZXQgaGRyID0gdGhpcy5oZWFkZXJzKCk7XG4gICAgICAgIGhkci5hcHBlbmQoXCJBY2NlcHRcIiwgYWNjZXB0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIixcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiBoZHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlKHVybCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayA6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0KHVybCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0aW9ucyhcIkdFVFwiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlKHVybCwgb3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICAgKi9cbiAgICBhc3luYyBwYXRjaCh1cmwsIGRhdGEpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnMoXCJQQVRDSFwiKTtcbiAgICAgICAgb3B0cy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmhhbmRsZSh1cmwsIG9wdHMpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEhUVFBSZXF1ZXN0cyBmcm9tIFwiLi9yZXN0LmpzXCI7XG5cbmV4cG9ydCB7IGJhc2VVUkxTLCBNZWRpYU1UWEFQSSB9O1xuXG5jb25zdCBiYXNlVVJMUyA9ICgob2JqKSA9PiBPYmplY3QuZnJlZXplKG9iaikpICh7XG4gICAgQkFTRSA6IFwiL3YzL2NvbmZpZ1wiLFxuICAgIEdMT0JBTCA6IFwiZ2xvYmFsXCIsXG4gICAgREVGQVVMVFMgOiBcInBhdGhkZWZhdWx0c1wiLFxuICAgIFBBVEhTIDogXCJwYXRoc1wiLFxuICAgIExJU1Q6IFwicGF0aHMvbGlzdFwiXG59KTtcblxuY29uc3QgYmFzZUFjdGlvbnMgPSAoKG9iaikgPT4gT2JqZWN0LmZyZWV6ZShvYmopKSAoe1xuICAgIFJFQUQgOiBcImdldFwiLFxuICAgIFdSSVRFIDogXCJwYXRjaFwiXG59KTtcblxuXG5cbmNsYXNzIE1lZGlhTVRYQVBJIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBkZXZpY2UgPSAnaHR0cDovLzEyNy4wLjAuMTo5OTk3JyxcbiAgICAgICAgd2hpY2ggPSBiYXNlVVJMUy5QQVRIUyxcbiAgICAgICAgbmFtZSA9IFwiXCIpIHtcbiAgICAgICAgdGhpcy53aGljaCA9IHdoaWNoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJvb3QgPSBgJHtkZXZpY2V9JHtiYXNlVVJMUy5CQVNFfS8ke3RoaXMud2hpY2h9YDtcbiAgICB9XG5cbiAgICAjdXJsKGFjdGlvbiA9IGJhc2VBY3Rpb25zLlJFQUQpIHtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgYmFzZUFjdGlvbnMuUkVBRDpcbiAgICAgICAgICAgICAgICBsZXQgY2FtPSh0aGlzLndoaWNoPT09YmFzZVVSTFMuUEFUSFMpID8gdGhpcy5uYW1lIDogJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucm9vdH0vZ2V0LyR7Y2FtfWA7XG4gICAgICAgICAgICBjYXNlIGJhc2VBY3Rpb25zLldSSVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnJvb3R9L3BhdGNoLyR7dGhpcy5uYW1lfWA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZWFkKCkge1xuICAgICAgICBsZXQgdSA9IHRoaXMuI3VybChiYXNlQWN0aW9ucy5SRUFEKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IChuZXcgSFRUUFJlcXVlc3RzKCkuZ2V0KHUpKTtcbiAgICB9XG5cbiAgICBhc3luYyB3cml0ZShkYXRhKXtcbiAgICAgICAgbGV0IHUgPSB0aGlzLiN1cmwoYmFzZUFjdGlvbnMuV1JJVEUpO1xuICAgICAgICByZXR1cm4gYXdhaXQgKG5ldyBIVFRQUmVxdWVzdHMoKS5wYXRjaCh1LGRhdGEpKTtcbiAgICB9XG5cblxuXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0FwcGxpY2F0aW9uR1VJfSBmcm9tICcuL2d1aS9hcHBsaWNhdGlvbkdVSS5qcyc7XG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgbGV0IGFwcEdVSSA9IG5ldyBBcHBsaWNhdGlvbkdVSSgpO1xuICAgIGFwcEdVSS5sb2FkKCkudGhlbiggXyA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZygnR1VJIGxvYWRlZCcpO1xuICAgIH0pO1xufVxuXG5cbndpbmRvdy5vbmxvYWQgPSAoXykgPT4ge1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZygnU3RhcnRpbmcnKTtcbiAgICBzdGFydCgpO1xuICAgIHdpbmRvdy5vbmxvYWQgPSAoXykgPT4ge307XG59O1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=