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

    /**
     *
     * @returns {Object.<string,string>}
     * @constructor
     */
    static Headers() {
        return {
            'Default': 'text',
            'Description': 'text',
            'Value': 'text',
            'To default': 'button',
            'To current': 'button'
        };
    }

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

    /**
     *
     * @param {string} key
     */
    #actions(key) {
        let match = /To\s([a-zA-Z]+)$/.exec(key);
        if(match===null || match.length<2) { return; }
        let field=match[1];
        Object.keys(this.rows).forEach(key => {
            console.log(`Resetting ${field} on row ${key}`);
            this.rows[key].reset(field);
        });
    }

    render() {
        this.tag.empty();

        let table = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('table');
        let headerRow = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('tr');
        let hdrs = ApplicationGUI.Headers();
        Object.keys(hdrs).forEach(key => {
            let value = hdrs[key];
            let th = new _dom_js__WEBPACK_IMPORTED_MODULE_5__.DOM('th');
            switch(value) {
                case 'text':
                    th.text(key);
                    break;
                case 'button':
                    th.append(_dom_js__WEBPACK_IMPORTED_MODULE_5__.DOMHelper.Button(key,key).setProp('onclick', (ev) => {
                        this.#actions(key);
                    }));
                    break;
                default:
                    break;
            }
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
/* harmony export */   DOM: () => (/* binding */ DOM),
/* harmony export */   DOMHelper: () => (/* binding */ DOMHelper)
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
     * @desc class constructor
     * @param {string|HTMLElement} tag
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
     * @desc Attach as child
     * @param {Node} root - the parent
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

    /**
     * @desc Remove all child elements
     * @returns {DOM}
     */
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

    /**
     *
     * @param {string} name
     * @param {any}value
     * @returns {DOM}
     */
    setAttr(name,value) {
        this.element.setAttribute(name,value);
        return this;
    }

    /**
     *
     * @param {Object<string,any>} kv - ket-value pairs for properties to set
     * @returns {DOM} - this
     */
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
     * @param {Object<string,any>} kv
     * @return {DOM}
     */
    setProps(kv) {
        Object.keys(kv).forEach(key => this.element[key]=kv[key]);
        return this;
    }

    /**
     *
     * @param {string} name - parameter name
     * @returns {*}
     */
    getProp(name) {
        return this.element[name];
    }



    /**
     * @desc Getter for data value (depending on control type)
     * @returns {*}
     */
    get value() {
        return (this.element.type==='checkbox')? this.element.checked : this.element.value;
    }

    /**
     * @desc Setter for data value (depending on control type)
     * @param v
     */
    set value(v) {
        if(this.element.type==='checkbox') {
            this.element.checked=v;
        }
        else {
            this.element.value = v;
        }
    }

    /**
     *
     * @param {string} [error=] - validity error message to set ('' -> no error)
     */
    validity(error = '') {
        this.element.setCustomValidity(error);
    }

    //set [name](value) { this.element[name]=value; }
    //get [name]() { return this.element[name]; }

    click() {
        this.element.click();
    }


}

class DOMHelper {
    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {DOM}
     * @constructor
     */
    static Button(message,name='') {
        return new DOM('button')
            .text(message)
            .setAttrs({
                type: 'button',
                name: name
            });
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

    reset(field) {
        switch(field) {
            case 'default':
                this.resetD.click();
                break;
            case 'current':
                this.resetC.click();
                break;
            default:
                break;
        }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUN2QixlQUFlLFFBQVE7QUFDdkIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RXFDOztBQUVKOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7QUFJRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTyxFQUFFLGNBQWMsR0FBRyxXQUFXO0FBQzVEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLFVBQVUsT0FBTyxJQUFJO0FBQy9DO0FBQ0EsMEJBQTBCLFVBQVUsU0FBUyxVQUFVO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsZ0RBQVk7QUFDdEM7O0FBRUE7QUFDQTtBQUNBLDBCQUEwQixnREFBWTtBQUN0Qzs7Ozs7QUFLQTs7Ozs7Ozs7VUN2REE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ051RDs7O0FBR3ZEO0FBQ0EscUJBQXFCLGtFQUFjO0FBQ25DO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2FwaS5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2RlZmF1bHRzL2RlZmF1bHRzLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL2FwcGxpY2F0aW9uR1VJLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvZ3VpL2RvbS5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2d1aS90YWJsZVJvdy5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL2d1aS92YWx1ZUZpZWxkcy5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3BpY2FtL2RhdGFUYWJsZS5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3BpY2FtL3BhcnNlci5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3BpY2FtL3N0cnVjdHVyZS9waWNhbS5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3BpY2FtL3N0cnVjdHVyZS9wcm9wZXJ0aWVzLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcGljYW0vc3RydWN0dXJlL3Byb3BlcnR5U3BlY2lmaWVyLmpzIiwid2VicGFjazovL21lZGlhbXR4Ly4vanMvcmVzdC5qcyIsIndlYnBhY2s6Ly9tZWRpYW10eC8uL2pzL3Jlc3RXcmFwcGVyLmpzIiwid2VicGFjazovL21lZGlhbXR4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21lZGlhbXR4L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9tZWRpYW10eC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21lZGlhbXR4L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWVkaWFtdHgvLi9qcy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBiYXNlVVJMUywgTWVkaWFNVFhBUEkgfSBmcm9tIFwiLi9yZXN0V3JhcHBlci5qc1wiO1xuXG5leHBvcnQge01lZGlhTVRYfTtcblxuY2xhc3MgTWVkaWFNVFgge1xuXG4gICAgY29uc3RydWN0b3IoaXAgPSAnMTI3LjAuMC4xJyxcbiAgICAgICAgICAgICAgICBwb3J0ID0gJzk5OTcnLFxuICAgICAgICAgICAgICAgIGNhbWVyYU5hbWUgPSBcImNhbVwiKSB7XG4gICAgICAgIHRoaXMuZGV2aWNlPWBodHRwOi8vJHtpcH06JHtwb3J0fWA7XG4gICAgICAgIHRoaXMuY2FtZXJhID0gY2FtZXJhTmFtZTtcbiAgICB9XG5cbiAgICBhc3luYyBnZXQod2hpY2ggPSBiYXNlVVJMUy5ERUZBVUxUUykge1xuICAgICAgICBsZXQgY2FtID0gKHdoaWNoPT09YmFzZVVSTFMuUEFUSFMpID8gdGhpcy5jYW1lcmEgOiAnJztcbiAgICAgICAgbGV0IG10eD0gbmV3IE1lZGlhTVRYQVBJKHRoaXMuZGV2aWNlLHdoaWNoLGNhbSk7XG4gICAgICAgIHJldHVybiBhd2FpdCBtdHgucmVhZCgpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldCh3aGljaCA9IGJhc2VVUkxTLkRFRkFVTFRTLCB2YWx1ZXMgPSB7fSkge1xuICAgICAgICBsZXQgbXR4PSBuZXcgTWVkaWFNVFhBUEkodGhpcy5kZXZpY2Usd2hpY2gsIHRoaXMuY2FtZXJhKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IG10eC53cml0ZSh2YWx1ZXMpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldERlZmF1bHRzKCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXQoYmFzZVVSTFMuREVGQVVMVFMpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldFBhdGhzKCl7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldChiYXNlVVJMUy5QQVRIUyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0R2xvYmFsKCl7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmdldChiYXNlVVJMUy5HTE9CQUwpO1xuICAgIH1cblxuICAgIGFzeW5jIHNldFBhdGgodmFsdWVzID0ge30pe1xuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5zZXQoYmFzZVVSTFMuUEFUSFMsIHZhbHVlcyk7XG4gICAgfVxuXG5cblxuXG59XG4iLCJleHBvcnQgeyBEZWZhdWx0cyB9O1xuXG4vKipcbiAqXG4gKiBAbmFtZSBEZWZhdWx0c1xuICpcbiAqIEBjb25zdGFudFxuICogQHR5cGUge09iamVjdC48c3RyaW5nLCBzdHJpbmc+fVxuICogQGRlZmF1bHRcbiAqIEBkZXNjcmlwdGlvbiBQcm92aWRlcyBzdGFuZGFyZCBjb25zdGFudHMgdXNlZCB0aHJvdWdob3V0IHRoZSBhcHBsaWNhdGlvblxuICogQHRvZG8gUmVwbGFjZSB0aGUgaW1wbGVtZW50YXRpb24gYXMgYW4gb2JqZWN0IHdpdGggc29tZXRoaW5nIG1vcmUgZHluYW1pY1xuICovXG5cbmNvbnN0IERlZmF1bHRzID0ge1xuICAgIElQX0FERFJFU1M6ICcxOTIuMTY4LjAuMjAzJyxcbiAgICBQT1JUOiAnOTk5NycsXG4gICAgQ0FNRVJBX05BTUU6ICdjYW0nXG59OyIsImltcG9ydCB7VGFibGVSb3d9IGZyb20gXCIuL3RhYmxlUm93LmpzXCI7XG5pbXBvcnQge01vZGVzfSBmcm9tIFwiLi4vcGljYW0vc3RydWN0dXJlL3Byb3BlcnRpZXMuanNcIjtcblxuZXhwb3J0IHtBcHBsaWNhdGlvbkdVSX07XG5cbmltcG9ydCB7UGlQcm9wZXJ0eVZhbHVlc30gZnJvbSAnLi4vcGljYW0vZGF0YVRhYmxlLmpzJztcbmltcG9ydCB7UGlDYW19IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanNcIjtcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gXCIuLi9kZWZhdWx0cy9kZWZhdWx0cy5qc1wiO1xuaW1wb3J0IHtET00sIERPTUhlbHBlcn0gZnJvbSBcIi4vZG9tLmpzXCI7XG5cbmNsYXNzIEFwcGxpY2F0aW9uR1VJIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge09iamVjdC48c3RyaW5nLHN0cmluZz59XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgc3RhdGljIEhlYWRlcnMoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnRGVmYXVsdCc6ICd0ZXh0JyxcbiAgICAgICAgICAgICdEZXNjcmlwdGlvbic6ICd0ZXh0JyxcbiAgICAgICAgICAgICdWYWx1ZSc6ICd0ZXh0JyxcbiAgICAgICAgICAgICdUbyBkZWZhdWx0JzogJ2J1dHRvbicsXG4gICAgICAgICAgICAnVG8gY3VycmVudCc6ICdidXR0b24nXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobW9kZSA9IE1vZGVzLk5vcm1hbCkge1xuICAgICAgICB0aGlzLklQID0gRGVmYXVsdHMuSVBfQUREUkVTUztcbiAgICAgICAgdGhpcy5QT1JUID0gRGVmYXVsdHMuUE9SVDtcbiAgICAgICAgdGhpcy5fbW9kZSA9IG1vZGU7XG5cbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IFBpUHJvcGVydHlWYWx1ZXModGhpcy5JUCx0aGlzLlBPUlQpO1xuICAgICAgICB0aGlzLnJvd3MgPSB7fTtcblxuICAgICAgICB0aGlzLnRhZyA9IERPTS53aXRoSUQoJ2lucHV0cycpOyAvL2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdpbnB1dHMnKTtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBQSUNBTSBpcyBbJHtQaUNhbX1dYCk7XG4gICAgfVxuXG4gICAgYXN5bmMgbG9hZCgpIHtcblxuICAgICAgICBsZXQgc3RhdGVzID0gYXdhaXQgdGhpcy5wcm9wZXJ0aWVzLmxvYWQodGhpcy5tb2RlKTtcbiAgICAgICAgdGhpcy5yb3dzID0ge307XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZyhgTW9kZSBpcyAke3RoaXMubW9kZS50b1N0cmluZygpfWApO1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYEtleXMgYXJlICR7UGlDYW0ua2V5cyh0aGlzLm1vZGUpfWApO1xuICAgICAgICBzdGF0ZXMuZm9yRWFjaChzdGF0ZSA9PiB7XG4gICAgICAgICAgICBsZXQgcm93ID0gbmV3IFRhYmxlUm93KHN0YXRlKTtcbiAgICAgICAgICAgIHRoaXMucm93c1tyb3cuZmllbGROYW1lXSA9IHJvdztcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG5cblxuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge01vZGVzfVxuICAgICAqL1xuICAgIGdldCBtb2RlKCkgeyByZXR1cm4gdGhpcy5fbW9kZTsgfVxuICAgIHNldCBtb2RlKHZhbHVlKSB7XG4gICAgICAgIHRoaXMuX21vZGU9dmFsdWU7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5XG4gICAgICovXG4gICAgI2FjdGlvbnMoa2V5KSB7XG4gICAgICAgIGxldCBtYXRjaCA9IC9Ub1xccyhbYS16QS1aXSspJC8uZXhlYyhrZXkpO1xuICAgICAgICBpZihtYXRjaD09PW51bGwgfHwgbWF0Y2gubGVuZ3RoPDIpIHsgcmV0dXJuOyB9XG4gICAgICAgIGxldCBmaWVsZD1tYXRjaFsxXTtcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5yb3dzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgUmVzZXR0aW5nICR7ZmllbGR9IG9uIHJvdyAke2tleX1gKTtcbiAgICAgICAgICAgIHRoaXMucm93c1trZXldLnJlc2V0KGZpZWxkKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmVuZGVyKCkge1xuICAgICAgICB0aGlzLnRhZy5lbXB0eSgpO1xuXG4gICAgICAgIGxldCB0YWJsZSA9IG5ldyBET00oJ3RhYmxlJyk7XG4gICAgICAgIGxldCBoZWFkZXJSb3cgPSBuZXcgRE9NKCd0cicpO1xuICAgICAgICBsZXQgaGRycyA9IEFwcGxpY2F0aW9uR1VJLkhlYWRlcnMoKTtcbiAgICAgICAgT2JqZWN0LmtleXMoaGRycykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gaGRyc1trZXldO1xuICAgICAgICAgICAgbGV0IHRoID0gbmV3IERPTSgndGgnKTtcbiAgICAgICAgICAgIHN3aXRjaCh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ3RleHQnOlxuICAgICAgICAgICAgICAgICAgICB0aC50ZXh0KGtleSk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ2J1dHRvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoLmFwcGVuZChET01IZWxwZXIuQnV0dG9uKGtleSxrZXkpLnNldFByb3AoJ29uY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuI2FjdGlvbnMoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGhlYWRlclJvdy5hcHBlbmQodGgpO1xuICAgICAgICB9KTtcblxuICAgICAgICB0YWJsZS5hcHBlbmQoaGVhZGVyUm93KTtcblxuXG4gICAgICAgIFBpQ2FtLmtleXModGhpcy5tb2RlKS5mb3JFYWNoKCBrZXkgPT4gdGFibGUuYXBwZW5kKHRoaXMucm93c1trZXldLmRvbSkpO1xuICAgICAgICB0aGlzLnRhZy5hcHBlbmQodGFibGUpO1xuICAgIH1cbn0iLCJleHBvcnQge0RPTSwgRE9NSGVscGVyfTtcblxuY2xhc3MgRE9NIHtcblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGlkXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgd2l0aElEKGlkKSB7XG4gICAgICAgIHJldHVybiBuZXcgRE9NKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgY2xhc3MgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xIVE1MRWxlbWVudH0gdGFnXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHByb3BzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IodGFnLCBwcm9wcyA9IHt9KSB7XG4gICAgICAgIGlmKHR5cGVvZih0YWcpPT09J3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgdGhpcy5lbGVtZW50PXRhZztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNldFByb3BzKHByb3BzKTtcbiAgICB9XG5cbiAgICBnZXQgZG9tKCkgeyByZXR1cm4gdGhpcy5lbGVtZW50OyB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBBdHRhY2ggYXMgY2hpbGRcbiAgICAgKiBAcGFyYW0ge05vZGV9IHJvb3QgLSB0aGUgcGFyZW50XG4gICAgICovXG4gICAgbWFwKHJvb3QgPSBkb2N1bWVudCkge1xuICAgICAgICByb290LmFwcGVuZENoaWxkKHRoaXMuZWxlbWVudCk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtET019IGNoaWxkXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBhcHBlbmQoY2hpbGQpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGNoaWxkLmRvbSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBkZXNjIFJlbW92ZSBhbGwgY2hpbGQgZWxlbWVudHNcbiAgICAgKiBAcmV0dXJucyB7RE9NfVxuICAgICAqL1xuICAgIGVtcHR5KCkge1xuICAgICAgICB3aGlsZSh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnJlbW92ZUNoaWxkKHRoaXMuZWxlbWVudC5maXJzdENoaWxkKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtET019XG4gICAgICovXG4gICAgdGV4dCh2YWx1ZSkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUodmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7YW55fXZhbHVlXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzZXRBdHRyKG5hbWUsdmFsdWUpIHtcbiAgICAgICAgdGhpcy5lbGVtZW50LnNldEF0dHJpYnV0ZShuYW1lLHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsYW55Pn0ga3YgLSBrZXQtdmFsdWUgcGFpcnMgZm9yIHByb3BlcnRpZXMgdG8gc2V0XG4gICAgICogQHJldHVybnMge0RPTX0gLSB0aGlzXG4gICAgICovXG4gICAgc2V0QXR0cnMoa3YpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoa3YpLmZvckVhY2goa2V5ID0+IHRoaXMuZWxlbWVudC5zZXRBdHRyaWJ1dGUoa2V5LGt2W2tleV0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgICAqIEByZXR1cm5zIHtET019XG4gICAgICovXG4gICAgc2V0UHJvcChuYW1lLHZhbHVlKSB7XG4gICAgICAgIHRoaXMuZWxlbWVudFtuYW1lXT12YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdDxzdHJpbmcsYW55Pn0ga3ZcbiAgICAgKiBAcmV0dXJuIHtET019XG4gICAgICovXG4gICAgc2V0UHJvcHMoa3YpIHtcbiAgICAgICAgT2JqZWN0LmtleXMoa3YpLmZvckVhY2goa2V5ID0+IHRoaXMuZWxlbWVudFtrZXldPWt2W2tleV0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIC0gcGFyYW1ldGVyIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXRQcm9wKG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudFtuYW1lXTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgR2V0dGVyIGZvciBkYXRhIHZhbHVlIChkZXBlbmRpbmcgb24gY29udHJvbCB0eXBlKVxuICAgICAqIEByZXR1cm5zIHsqfVxuICAgICAqL1xuICAgIGdldCB2YWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLmVsZW1lbnQudHlwZT09PSdjaGVja2JveCcpPyB0aGlzLmVsZW1lbnQuY2hlY2tlZCA6IHRoaXMuZWxlbWVudC52YWx1ZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAZGVzYyBTZXR0ZXIgZm9yIGRhdGEgdmFsdWUgKGRlcGVuZGluZyBvbiBjb250cm9sIHR5cGUpXG4gICAgICogQHBhcmFtIHZcbiAgICAgKi9cbiAgICBzZXQgdmFsdWUodikge1xuICAgICAgICBpZih0aGlzLmVsZW1lbnQudHlwZT09PSdjaGVja2JveCcpIHtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5jaGVja2VkPXY7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQudmFsdWUgPSB2O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2Vycm9yPV0gLSB2YWxpZGl0eSBlcnJvciBtZXNzYWdlIHRvIHNldCAoJycgLT4gbm8gZXJyb3IpXG4gICAgICovXG4gICAgdmFsaWRpdHkoZXJyb3IgPSAnJykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuc2V0Q3VzdG9tVmFsaWRpdHkoZXJyb3IpO1xuICAgIH1cblxuICAgIC8vc2V0IFtuYW1lXSh2YWx1ZSkgeyB0aGlzLmVsZW1lbnRbbmFtZV09dmFsdWU7IH1cbiAgICAvL2dldCBbbmFtZV0oKSB7IHJldHVybiB0aGlzLmVsZW1lbnRbbmFtZV07IH1cblxuICAgIGNsaWNrKCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xpY2soKTtcbiAgICB9XG5cblxufVxuXG5jbGFzcyBET01IZWxwZXIge1xuICAgIC8qKlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtET019XG4gICAgICogQGNvbnN0cnVjdG9yXG4gICAgICovXG4gICAgc3RhdGljIEJ1dHRvbihtZXNzYWdlLG5hbWU9JycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBET00oJ2J1dHRvbicpXG4gICAgICAgICAgICAudGV4dChtZXNzYWdlKVxuICAgICAgICAgICAgLnNldEF0dHJzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICB9XG59XG5cbiIsImltcG9ydCB7IFByb3BlcnR5RmllbGQgfSBmcm9tICcuL3ZhbHVlRmllbGRzLmpzJztcbmltcG9ydCB7UGlDYW19IGZyb20gXCIuLi9waWNhbS9zdHJ1Y3R1cmUvcGljYW0uanNcIjtcbmltcG9ydCB7RE9NfSBmcm9tIFwiLi9kb20uanNcIjtcblxuZXhwb3J0IHsgVGFibGVSb3cgfTtcblxuY2xhc3MgVGFibGVSb3cge1xuXG4gICAgc3RhdGljIHRleHRCb3godGV4dD0nJyxuYW1lPSd0ZXh0Jykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnc3BhbicpXG4gICAgICAgICAgICAudGV4dCh0ZXh0KVxuICAgICAgICAgICAgLnNldEF0dHIoJ25hbWUnLG5hbWUpO1xuICAgIH1cbiAgICBzdGF0aWMgcmVhZG9ubHlCb3godmFsdWUsbmFtZT0nJykge1xuICAgICAgICByZXR1cm4gbmV3IERPTSgnaW5wdXQnLHtcbiAgICAgICAgICAgICAgICBkaXNhYmxlZCA6dHJ1ZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUudG9TdHJpbmcoKVxuICAgICAgICAgICAgfSkuc2V0QXR0cignbmFtZScsbmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge0RPTX1cbiAgICAgKi9cbiAgICBzdGF0aWMgYnV0dG9uKG1lc3NhZ2UsIG5hbWU9JycpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBET00oJ2J1dHRvbicpXG4gICAgICAgICAgICAudGV4dChtZXNzYWdlKVxuICAgICAgICAgICAgLnNldEF0dHJzKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYnV0dG9uJyxcbiAgICAgICAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihzdGF0ZSkge1xuICAgICAgICBsZXQgZmllbGQgPSBzdGF0ZS5rZXkgfHwgXCJcIjtcbiAgICAgICAgaWYoIVBpQ2FtLmhhcyhmaWVsZCkpIHsgdGhyb3cgbmV3IEVycm9yKGBObyBzdWNoIGZpZWxkIGFzICR7ZmllbGR9YCk7IH1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gUGlDYW0uc3BlYyhmaWVsZCk7XG4gICAgICAgIHRoaXMuZmllbGROYW1lID0gZmllbGQ7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgICAgdGhpcy5kb209dGhpcy5tYXAoKTtcbiAgICB9XG5cblxuXG4gICAgLyoqXG4gICAgICogQGRlc2MgQ2FsbGJhY2tcbiAgICAgKiBAcmV0dXJucyB7Kn1cbiAgICAgKi9cbiAgICBnZXQgb25jaGFuZ2UoKSB7IHJldHVybiB0aGlzLmlucHV0Lm9uaW5wdXQoKTsgfVxuICAgIC8vc2V0IG9uY2hhbmdlKGNiKSB7IHRoaXMuaW5wdXQub25pbnB1dD1jYjsgfVxuXG5cbiAgICBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLmlucHV0LnZhbHVlOyB9XG4gICAgc2V0IHZhbHVlKHYpIHsgdGhpcy5pbnB1dC52YWx1ZT12OyB9XG5cbiAgICAjcmVsb2FkKCkge1xuICAgICAgICB0aGlzLmlucHV0LnZhbHVlPXRoaXMuc3RhdGUuY3VycmVudFZhbHVlO1xuICAgIH1cblxuICAgIG1hcCgpIHtcbiAgICAgICAgdGhpcy5kZWZCb3ggPSBUYWJsZVJvdy5yZWFkb25seUJveCh0aGlzLnN0YXRlLmRlZmF1bHRWYWx1ZS50b1N0cmluZygpLCdkZWZhdWx0Jyk7XG4gICAgICAgIHRoaXMuZGVzY0JveCA9IFRhYmxlUm93LnRleHRCb3godGhpcy5wYXJhbWV0ZXJzLmhlbHAsJ2hlbHAnKTtcblxuICAgICAgICB0aGlzLmlucHV0ID0gbmV3IFByb3BlcnR5RmllbGQodGhpcy5maWVsZE5hbWUsdGhpcy5wYXJhbWV0ZXJzLHRoaXMuc3RhdGUuZWRpdGVkVmFsdWUpO1xuICAgICAgICB0aGlzLmlucHV0Lm9uaW5wdXQgPSAodmFsdWUpID0+IHsgdGhpcy5zdGF0ZS5lZGl0ZWRWYWx1ZSA9IHZhbHVlOyB9O1xuICAgICAgICB0aGlzLmluQm94ICA9IHRoaXMuaW5wdXQuZmllbGQ7XG5cbiAgICAgICAgdGhpcy5yZXNldEQgICA9IFRhYmxlUm93LmJ1dHRvbignVG8gZGVmYXVsdCcsJ2RlZkJ1dHRvbicpO1xuICAgICAgICB0aGlzLnJlc2V0RC5zZXRQcm9wKCdvbmNsaWNrJywgKGV2KSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN0YXRlLnRvRGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy4jcmVsb2FkKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMucmVzZXRDICAgPSBUYWJsZVJvdy5idXR0b24oJ1RvIGN1cnJlbnQnLCdjdXJyQnV0dG9uJyk7XG4gICAgICAgIHRoaXMucmVzZXRDLnNldFByb3AoJ29uY2xpY2snLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUudG9DdXJyZW50KCk7XG4gICAgICAgICAgICB0aGlzLiNyZWxvYWQoKTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICBsZXQgY2VsbHMgPSBbdGhpcy5kZWZCb3gsdGhpcy5kZXNjQm94LHRoaXMuaW5Cb3gsdGhpcy5yZXNldEQsIHRoaXMucmVzZXRDXS5tYXAgKCBjZWxsID0+IHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgRE9NKCd0ZCcpLmFwcGVuZChjZWxsKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCByb3cgPSBuZXcgRE9NKCd0cicpLnNldEF0dHIoJ25hbWUnLHRoaXMuZmllbGROYW1lKTtcbiAgICAgICAgY2VsbHMuZm9yRWFjaChjZWxsID0+IHJvdy5hcHBlbmQoY2VsbCkpO1xuICAgICAgICByZXR1cm4gcm93O1xuICAgIH1cblxuICAgIHJlc2V0KGZpZWxkKSB7XG4gICAgICAgIHN3aXRjaChmaWVsZCkge1xuICAgICAgICAgICAgY2FzZSAnZGVmYXVsdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEQuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2N1cnJlbnQnOlxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRDLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufSIsImltcG9ydCB7UGlDYW19IGZyb20gJy4uL3BpY2FtL3N0cnVjdHVyZS9waWNhbS5qcyc7XG5pbXBvcnQge0RPTX0gZnJvbSBcIi4vZG9tLmpzXCI7XG5leHBvcnQge1Byb3BlcnR5RmllbGR9O1xuXG5mdW5jdGlvbiBpc051bGwoeCkgeyByZXR1cm4geD09PW51bGw7IH1cbmZ1bmN0aW9uIGlzVW5kZWZpbmVkKHgpIHsgcmV0dXJuIHg9PT11bmRlZmluZWQ7IH1cbmZ1bmN0aW9uIGlzTnVsbE9yVW5kZWZpbmVkKHgpIHsgcmV0dXJuIGlzTnVsbCh4KSB8fCBpc1VuZGVmaW5lZCh4KTsgfVxuXG5cblxuY2xhc3MgUHJvcGVydHlGaWVsZCB7XG5cblxuXG4gICAgc3RhdGljIG1ha2VGaWVsZChwYXJhbXMpIHtcbiAgICAgICAgY29uc3Qga2luZCA9IHBhcmFtcy5raW5kO1xuICAgICAgICBsZXQgZmllbGQ7XG4gICAgICAgIHN3aXRjaChraW5kKSB7XG4gICAgICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICAgICAgICBmaWVsZD1uZXcgRE9NKCdpbnB1dCcse1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnY2hlY2tib3gnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnQnOlxuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICBmaWVsZD1uZXcgRE9NKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICAgICAgICAgIG1pbjogcGFyYW1zLm1pbixcbiAgICAgICAgICAgICAgICAgICAgbWF4OiBwYXJhbXMubWF4XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdjaG9vc2UnOlxuICAgICAgICAgICAgICAgIGZpZWxkPW5ldyBET00oJ3NlbGVjdCcse1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsZTogZmFsc2VcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBwYXJhbXMuY2hvaWNlcy5mb3JFYWNoICh2ID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBvID0gbmV3IERPTSgnb3B0aW9uJyx7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dDogdlxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZC5hcHBlbmQobyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBmaWVsZD1uZXcgRE9NKCdpbnB1dCcsIHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3RleHQnXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgZmllbGQuc2V0QXR0cignbmFtZScscGFyYW1zLm5hbWUpO1xuICAgICAgICByZXR1cm4gZmllbGQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobmFtZSwgcGFyYW1zLCB2YWx1ZSkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMgPSBwYXJhbXM7XG4gICAgICAgIHRoaXMubmFtZT1uYW1lO1xuICAgICAgICB0aGlzLmZpZWxkID0gUHJvcGVydHlGaWVsZC5tYWtlRmllbGQocGFyYW1zKTtcbiAgICAgICAgdGhpcy5vbmlucHV0ID0gKHYpID0+IHt9O1xuXG4gICAgICAgIHRoaXMudmFsdWVUb0xvYWQgPSB2YWx1ZTtcblxuICAgICAgICB0aGlzLmZpZWxkLnNldFByb3AoJ29uaW5wdXQnLCAoZXYpID0+IHtcbiAgICAgICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZygnT24gaW5wdXQgZmlyZWQnKTtcbiAgICAgICAgICAgIGlmKHRoaXMuaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZmllbGQudmFsaWRpdHkoKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uaW5wdXQodGhpcy52YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpZWxkLnZhbGlkaXR5KCdJbnZhbGlkIGVudHJ5Jyk7XG4gICAgICAgICAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBCYWQgZW50cnkgb24gJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy52YWx1ZT12YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQga2luZCgpIHsgcmV0dXJuIHRoaXMucGFyYW1ldGVycy5raW5kOyB9XG5cbiAgICBnZXQgdmFsdWUoKSB7XG4gICAgICAgIHN3aXRjaCh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlSW50KHRoaXMuZmllbGQudmFsdWUpO1xuICAgICAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh0aGlzLmZpZWxkLnZhbHVlKTtcbiAgICAgICAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZpZWxkLnZhbHVlO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5maWVsZC52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsdWUpIHtcbiAgICAgICAgd2luZG93LmNvbnNvbGUubG9nKGBTZXR0aW5nICR7dGhpcy5uYW1lfSB0byAke3ZhbHVlfWApO1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC52YWx1ZT12YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgdGhpcy5maWVsZC52YWx1ZT12YWx1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYCR7dGhpcy5uYW1lfS52YWx1ZT0ke3RoaXMuZmllbGQudmFsdWV9YCk7XG4gICAgfVxuXG5cblxuICAgIGdldCBpc1ZhbGlkKCkge1xuICAgICAgICB3aW5kb3cuY29uc29sZS5sb2coYENoZWNraW5nIHZhbGlkaXR5OiAke3RoaXMua2luZH0gOiAke3RoaXMudmFsdWV9YCk7XG4gICAgICAgIHN3aXRjaCh0aGlzLmtpbmQpIHtcbiAgICAgICAgICAgIGNhc2UgJ2ludCc6XG4gICAgICAgICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiAhTnVtYmVyLmlzTmFOKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cblxufVxuIiwiXG5pbXBvcnQgeyBQaUNhbSB9IGZyb20gJy4vc3RydWN0dXJlL3BpY2FtLmpzJztcbmltcG9ydCB7TWVkaWFNVFhJbnN0YW5jZSwgUHJvcGVydHl9IGZyb20gXCIuL3BhcnNlci5qc1wiO1xuaW1wb3J0IHtUYWJsZVJvd30gZnJvbSBcIi4uL2d1aS90YWJsZVJvdy5qc1wiO1xuXG5leHBvcnQgeyBQaVByb3BlcnR5VmFsdWVzIH07XG5cbmNsYXNzIFByb3BlcnR5U3RhdGUge1xuICAgICNrZXk7XG4gICAgI2VkaXRlZDtcbiAgICAjZGVmYXVsdDtcbiAgICAjY3VycmVudDtcbiAgICAjbW9kaWZpZWQ7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXlcbiAgICAgKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKGtleSxwcm9wZXJ0eSkge1xuICAgICAgICB0aGlzLiNrZXkgPSBrZXk7XG4gICAgICAgIHRoaXMuI2RlZmF1bHQgPSBwcm9wZXJ0eS5kZWY7XG4gICAgICAgIHRoaXMuI2N1cnJlbnQgPSBwcm9wZXJ0eS5jdXJyZW50O1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNjdXJyZW50O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICogQHJldHVybnMge3N0cmluZ31cbiAgICAgKi9cbiAgICBnZXQga2V5KCkgeyByZXR1cm4gdGhpcy4ja2V5OyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGdldCBpc01vZGlmaWVkKCkgeyByZXR1cm4gdGhpcy4jbW9kaWZpZWQ7IH1cblxuICAgIC8qKlxuICAgICAqXG4gICAgICAqIEByZXR1cm5zIHthbnl9XG4gICAgICovXG4gICAgZ2V0IGVkaXRlZFZhbHVlKCkgeyByZXR1cm4gdGhpcy4jZWRpdGVkOyB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7YW55fSB2YWx1ZVxuICAgICAqL1xuICAgIHNldCBlZGl0ZWRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB2YWx1ZTtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGdldCBjdXJyZW50VmFsdWUoKSB7IHJldHVybiB0aGlzLiNjdXJyZW50OyB9XG4gICAgZ2V0IGRlZmF1bHRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMuI2RlZmF1bHQ7IH1cblxuICAgIHRvRGVmYXVsdCgpe1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNkZWZhdWx0O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IHRydWU7XG4gICAgfVxuXG4gICAgdG9DdXJyZW50KCkge1xuICAgICAgICB0aGlzLiNlZGl0ZWQgPSB0aGlzLiNjdXJyZW50O1xuICAgICAgICB0aGlzLiNtb2RpZmllZCA9IGZhbHNlO1xuICAgIH1cbjFcblxuICAgIGNvbW1pdCgpIHtcbiAgICAgICAgdGhpcy4jY3VycmVudCA9IHRoaXMuI2VkaXRlZDtcbiAgICAgICAgdGhpcy4jbW9kaWZpZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9wZXJ0eSh0aGlzLmRlZmF1bHRWYWx1ZSwgdGhpcy5jdXJyZW50VmFsdWUpO1xuICAgIH1cbn1cblxuY2xhc3MgUGlQcm9wZXJ0eVZhbHVlcyB7XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBpcFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwb3J0XG4gICAgICovXG4gICAgY29uc3RydWN0b3IoaXAsIHBvcnQpIHtcbiAgICAgICAgdGhpcy5tdHggPSBuZXcgTWVkaWFNVFhJbnN0YW5jZShpcCxwb3J0KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7TW9kZXN9IG1vZGVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICAgKi9cbiAgICBhc3luYyBsb2FkKG1vZGUpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5tdHguaW5pdGlhbGlzZSgpO1xuICAgICAgICByZXR1cm4gUGlDYW0ua2V5cyhtb2RlKS5tYXAoIGtleSA9PiB7XG4gICAgICAgICAgICBsZXQgcHJvcGVydHkgPSB0aGlzLm10eC5nZXQoa2V5KTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvcGVydHlTdGF0ZShrZXkscHJvcGVydHkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBzYXZlKHN0YXRlcyA9IFtdKSB7XG4gICAgICAgIGxldCBjaGFuZ2VkID0gc3RhdGVzLmZpbHRlcihzdGF0ZSA9PiBzdGF0ZS5pc01vZGlmaWVkKTtcbiAgICAgICAgbGV0IG91dHB1dCA9IHt9O1xuICAgICAgICBjaGFuZ2VkLmZvckVhY2goIHN0YXRlID0+IHtcbiAgICAgICAgICAgIG91dHB1dFtzdGF0ZS5rZXldID0gc3RhdGUuY29tbWl0KCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuXG5cblxuXG5cblxufVxuIiwiaW1wb3J0IHtNZWRpYU1UWH0gZnJvbSAnLi4vYXBpLmpzJztcblxuZXhwb3J0IHtNZWRpYU1UWEluc3RhbmNlLCBQcm9wZXJ0eSB9O1xuXG5jbGFzcyBQcm9wZXJ0eSB7XG4gICAgY29uc3RydWN0b3IoZGVmLGN1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5kZWY9ZGVmO1xuICAgICAgICB0aGlzLmN1cnJlbnQ9Y3VycmVudDtcbiAgICB9XG5cbiAgICB0b1N0cmluZygpIHsgYGRlZmF1bHQ9WyR7dGhpcy5kZWZ9XSBjdXJyZW50PVske3RoaXMuY3VycmVudH1dYDsgfVxufVxuXG5jbGFzcyBNZWRpYU1UWEluc3RhbmNlIHtcblxuICAgIGNvbnN0cnVjdG9yKGlwLCBwb3J0KSB7XG4gICAgICAgIHRoaXMuaXAgPSBpcDtcbiAgICAgICAgdGhpcy5wb3J0ID0gcG9ydC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmtleXMgPSBbXTtcbiAgICAgICAgdGhpcy5kZWZhdWx0VmFsdWVzID0gbmV3IE1hcCgpO1xuICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMgPSBuZXcgTWFwKCk7XG4gICAgfVxuXG4gICAgYXN5bmMgZ2V0RGVmYXVsdHMoKSB7XG4gICAgICAgIGxldCBtdHggPSBuZXcgTWVkaWFNVFgodGhpcy5pcCwgdGhpcy5wb3J0KTtcbiAgICAgICAgbGV0IGpzb24gPSBhd2FpdCBtdHguZ2V0RGVmYXVsdHMoKSB8fCB7fTtcblxuICAgICAgICB0aGlzLmtleXMgPSBPYmplY3Qua2V5cyhqc29uKS5maWx0ZXIoa2V5ID0+IC9ecnBpLy50ZXN0KGtleSkpLnRvU29ydGVkKCk7XG4gICAgICAgIHRoaXMuZGVmYXVsdFZhbHVlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmtleXMuZm9yRWFjaChrZXkgPT4gdGhpcy5kZWZhdWx0VmFsdWVzLnNldChrZXksIGpzb25ba2V5XSkpO1xuICAgIH1cblxuICAgIGFzeW5jIGdldEN1cnJlbnRzKCkge1xuICAgICAgICBsZXQgbXR4ID0gbmV3IE1lZGlhTVRYKHRoaXMuaXAsIHRoaXMucG9ydCk7XG4gICAgICAgIGxldCBqc29uID0gYXdhaXQgbXR4LmdldFBhdGhzKCkgfHwge307XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5jbGVhcigpO1xuICAgICAgICB0aGlzLmtleXMuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gT2JqZWN0Lmhhc093bihqc29uLGtleSkgPyBqc29uW2tleV0gOiB0aGlzLmRlZmF1bHRWYWx1ZXMuZ2V0KGtleSk7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWx1ZXMuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBpbml0aWFsaXNlKCkge1xuICAgICAgICBhd2FpdCB0aGlzLmdldERlZmF1bHRzKCk7XG4gICAgICAgIGF3YWl0IHRoaXMuZ2V0Q3VycmVudHMoKTtcbiAgICB9XG5cbiAgICBnZXQoa2V5KSB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvcGVydHkodGhpcy5kZWZhdWx0VmFsdWVzLmdldChrZXkpLCB0aGlzLmN1cnJlbnRWYWx1ZXMuZ2V0KGtleSkpO1xuICAgIH1cblxuICAgIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfVxuXG4gICAgcmVzZXQoa2V5KSB7XG4gICAgICAgIHRoaXMuY3VycmVudFZhbHVlcy5zZXQoa2V5LCB0aGlzLmRlZmF1bHRWYWx1ZXMuZ2V0KGtleSkpO1xuICAgIH1cbiAgICByZXNldEFsbCgpIHtcbiAgICAgICAgdGhpcy5rZXlzLmZvckVhY2goIGtleSA9PiB0aGlzLnJlc2V0KGtleSkpO1xuICAgIH1cbn1cbiIsIlxuaW1wb3J0IHtQcm9wZXJ0eVNwZWNpZmllcn0gZnJvbSAnLi9wcm9wZXJ0eVNwZWNpZmllci5qcyc7XG5pbXBvcnQge01vZGVzfSBmcm9tIFwiLi9wcm9wZXJ0aWVzLmpzXCI7XG5leHBvcnQge1BpQ2FtfTtcblxuXG5jbGFzcyBfUGlDYW0ge1xuXG4gICAgY29uc3RydWN0b3IoKSB7XG4gICAgICAgIHRoaXMucHJvcHMgPSBQcm9wZXJ0eVNwZWNpZmllci5sb2FkKCk7XG4gICAgfVxuXG4gICAgYWxsS2V5cygpIHsgcmV0dXJuIFsuLi50aGlzLnByb3BzLmtleXMoKV07IH1cblxuICAgIGtleXMobW9kZSA9IE1vZGVzLk5vcm1hbCkge1xuICAgICAgICByZXR1cm4gbW9kZS5rZXlzO1xuICAgIH1cblxuICAgIGhhcyhrZXksbW9kZSA9IE1vZGVzLkFkdmFuY2VkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmtleXMobW9kZSkuaW5jbHVkZXMoa2V5KTtcbiAgICB9XG5cbiAgICBzcGVjKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5nZXQoa2V5KTtcbiAgICB9XG5cbiAgICBraW5kKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkua2luZDtcbiAgICB9XG5cbiAgICBoZWxwKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkuaGVscDtcbiAgICB9XG5cbiAgICBtYXgoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwZWMoa2V5KS5tYXg7XG4gICAgfVxuXG4gICAgbWluKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zcGVjKGtleSkubWluO1xuICAgIH1cblxuICAgIGNob2ljZXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNwZWMoa2V5KS5jaG9pY2VzIHx8IFtdO1xuICAgIH1cblxufVxuXG5sZXQgUGlDYW0gPSBuZXcgX1BpQ2FtKCk7XG5cblxuXG4iLCJleHBvcnQge1BpQ2FtU2V0dGluZ3MsIE1vZGVzfTtcblxuY29uc3QgUGlDYW1TZXR0aW5ncyA9IHtcbi8vICAgIHJwaUNhbWVyYUNhbUlEOiBbJ2ludCcsIDAsIDI1Nl0sXG4gICAgcnBpQ2FtZXJhV2lkdGg6IFsnaW50JywgWzAsIDY1NTM2XSwgJ3NjcmVlbiB3aWR0aCBpbiBwaXhlbHMnXSxcbiAgICBycGlDYW1lcmFIZWlnaHQ6IFsnaW50JywgWzAsIDY1NTM2XSwgJ3NjcmVlbiBoZWlnaHQgaW4gcGl4ZWxzJ10sXG4gICAgcnBpQ2FtZXJhSEZsaXA6IFsnYm9vbCcsICdob3Jpem9udGFsbHkgZmxpcCBpbWFnZSddLFxuICAgIHJwaUNhbWVyYVZGbGlwOiBbJ2Jvb2wnLCAndmVydGljYWxseSBmbGlwIGltYWdlJ10sXG4gICAgcnBpQ2FtZXJhQnJpZ2h0bmVzczogWydudW1iZXInLCBbLTEuMCwgMS4wXSwgJ2ltYWdlIGJyaWdodG5lc3MnXSxcbiAgICBycGlDYW1lcmFDb250cmFzdDogWydpbnQnLCBbMCwgMTZdLCAnaW1hZ2UgY29udHJhc3QnXSxcbiAgICBycGlDYW1lcmFTYXR1cmF0aW9uOiBbJ2ludCcsIFswLCAxNl0sICdpbWFnZSBzYXR1cmF0aW9uJ10sXG4gICAgcnBpQ2FtZXJhU2hhcnBuZXNzOiBbJ2ludCcsIFswLCAxNl0sICdpbWFnZSBzaGFycG5lc3MnXSxcbiAgICBycGlDYW1lcmFFeHBvc3VyZTogWydjaG9vc2UnLCBbJ25vcm1hbCcsICdzaG9ydCcsICdsb25nJywgJ2N1c3RvbSddLCAnaW1hZ2UgZXhwb3N1cmUnXSxcbiAgICBycGlDYW1lcmFBV0I6IFsnY2hvb3NlJywgWydhdXRvJywgJ2luY2FuZGVzY2VudCcsICd0dW5nc3RlbicsICdmbG91cmVzY2VudCcsICdpbmRvb3InLCAnZGF5bGlnaHQnLCAnY2xvdWR5JywgJ2N1c3RvbSddLCAnbGlnaHRpbmcgbW9kZWwnXSxcbiAgICBycGlDYW1lcmFEZW5vaXNlOiBbJ2Nob29zZScsIFsnb2ZmJywgJ2Nkbl9vZmYnLCAnY2RuX2Zhc3QnLCAnY2RuX2hxJ10sICdub2lzZSBjb3JyZWN0aW9uJ10sXG4gICAgcnBpQ2FtZXJhU2h1dHRlcjogWydpbnQnLCBbMCwgMTA0ODU3Nl0sICdjYW1lcmEgc2h1dHRlciBzcGVlZCddLFxuICAgIC8vICAgcnBpQ2FtZXJhTWV0ZXJpbmc6IFsnY2hvb3NlJyxbJ2NlbnRyZScsJ3Nwb3QnLCdtYXRyaXgnLCdjdXN0b20nXV0sXG4vLyAgICBycGlDYW1lcmFHYWluOiBbJ251bWJlcicsLTE2LjkwLDE2LjBdLFxuLy8gICAgcnBpQ2FtZXJhRVY6IFsnbnVtYmVyJywtMTAuMCwxMC4wXSxcbiAgICBycGlDYW1lcmFBZk1vZGU6IFsnY2hvb3NlJywgWydhdXRvJywgJ21hbnVhbCcsICdjb250aW51b3VzJ10sICdhdXRvZm9jdXMgbW9kZSddLFxuICAgIHJwaUNhbWVyYUFmUmFuZ2U6IFsnY2hvb3NlJywgWydub3JtYWwnLCAnbWFjcm8nLCAnZnVsbCddLCAnYXV0b2ZvY3VzIHJhbmdlJ10sXG4gICAgcnBpQ2FtZXJhQWZTcGVlZDogWydjaG9vc2UnLCBbJ25vcm1hbCcsICdmYXN0J10sICdhdXRvZm9jdXMgc3BlZWQnXSxcbiAgICBycGlDYW1lcmFMZW5zUG9zaXRpb246IFsnbnVtYmVyJywgWzAuMCwgMjU2LjBdLCAnbGVucyBwb3NpdGlvbiAoMSAvIGRpc3RhbmNlIHRvIG9iamVjdCknXVxufTtcblxuY2xhc3MgTW9kZXMge1xuICAgIHN0YXRpYyBOb3JtYWwgPSBuZXcgTW9kZXMoJ05vcm1hbCcpO1xuICAgIHN0YXRpYyBBZHZhbmNlZCA9IG5ldyBNb2RlcygnQWR2YW5jZWQnKTtcblxuICAgIHN0YXRpYyBtb2RlS2V5cyAgPSB7XG4gICAgICAgIE5vcm1hbDogW1xuICAgICAgICAgICAgJ3JwaUNhbWVyYVdpZHRoJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFIZWlnaHQnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUJyaWdodG5lc3MnLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUNvbnRyYXN0JyxcbiAgICAgICAgICAgICdycGlDYW1lcmFTYXR1cmF0aW9uJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFTYXR1cmF0aW9uJyxcbiAgICAgICAgICAgICdycGlDYW1lcmFBV0InLFxuICAgICAgICAgICAgJ3JwaUNhbWVyYUFmTW9kZScsXG4gICAgICAgICAgICAncnBpQ2FtZXJhTGVuc1Bvc2l0aW9uJ1xuICAgICAgICBdLFxuICAgICAgICBBZHZhbmNlZDogT2JqZWN0LmtleXMoUGlDYW1TZXR0aW5ncylcbiAgICB9O1xuXG4gICAgc3RhdGljIGFsbCgpIHsgcmV0dXJuIFt0aGlzLk5vcm1hbCwgdGhpcy5BZHZhbmNlZF07IH1cblxuICAgIGNvbnN0cnVjdG9yKG5hbWUpIHtcbiAgICAgICAgdGhpcy5uYW1lPW5hbWU7XG4gICAgfVxuXG4gICAgdG9TdHJpbmcoKSB7IHJldHVybiBgTW9kZS4ke3RoaXMubmFtZX1gOyB9XG5cbiAgICBnZXQga2V5cygpIHtcbiAgICAgICAgcmV0dXJuIE1vZGVzLm1vZGVLZXlzW3RoaXMubmFtZV07XG4gICAgfVxufSIsImltcG9ydCB7UGlDYW1TZXR0aW5nc30gZnJvbSAnLi9wcm9wZXJ0aWVzLmpzJztcbmV4cG9ydCB7UHJvcGVydHlTcGVjaWZpZXJ9O1xuXG5jbGFzcyBQcm9wZXJ0eVNwZWNpZmllciB7XG4gICAgY29uc3RydWN0b3IoYXJncyA9IFtdKSB7XG4gICAgICAgIHRoaXMua2luZCA9IGFyZ3NbMF0gfHwgJyc7XG4gICAgICAgIHRoaXMuaGVscCA9IGFyZ3NbYXJncy5sZW5ndGgtMV0gfHwgJyc7XG5cbiAgICAgICAgbGV0IG1pbiA9IE5hTjtcbiAgICAgICAgbGV0IG1heCA9IE5hTjtcbiAgICAgICAgbGV0IGNob2ljZXMgPSBbXTtcblxuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnaW50JzpcbiAgICAgICAgICAgICAgICBtaW4gPSBwYXJzZUludChhcmdzWzFdWzBdKTtcbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUludChhcmdzWzFdWzFdKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ251bWJlcic6XG4gICAgICAgICAgICAgICAgbWluID0gcGFyc2VGbG9hdChhcmdzWzFdWzBdKTtcbiAgICAgICAgICAgICAgICBtYXggPSBwYXJzZUZsb2F0KGFyZ3NbMV1bMV0pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICBjaG9pY2VzID0gYXJnc1sxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5taW4gPSBtaW47XG4gICAgICAgIHRoaXMubWF4ID0gbWF4O1xuICAgICAgICB0aGlzLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgIH1cblxuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMua2luZCkge1xuICAgICAgICAgICAgY2FzZSAnY2hvb3NlJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XSA6ICR7dGhpcy5jaG9pY2VzfWA7XG4gICAgICAgICAgICBjYXNlICdib29sJzpcbiAgICAgICAgICAgICAgICByZXR1cm4gYCR7dGhpcy5raW5kfSBbJHt0aGlzLmhlbHB9XWA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLmtpbmR9IFske3RoaXMuaGVscH1dIDogJHt0aGlzLm1pbn0tJHt0aGlzLm1heH1gO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhdGljIGtleXMoKSB7XG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhQaUNhbVNldHRpbmdzKTtcbiAgICB9XG5cbiAgICBzdGF0aWMgbG9hZCgpIHtcblxuICAgICAgICBsZXQgcHJvcHM9bmV3IE1hcCgpO1xuICAgICAgICBPYmplY3Qua2V5cyhQaUNhbVNldHRpbmdzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICAgICAgICAgICAgcHJvcHMuc2V0KGtleSxuZXcgUHJvcGVydHlTcGVjaWZpZXIoUGlDYW1TZXR0aW5nc1trZXldKSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gcHJvcHM7XG4gICAgfVxufVxuXG4iLCJleHBvcnQgeyBIVFRQUmVxdWVzdHMgYXMgZGVmYXVsdCB9O1xuXG5cbmNsYXNzIEhUVFBSZXF1ZXN0cyB7XG5cbiAgICBjb25zdHJ1Y3RvcigpIHt9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtIZWFkZXJzfVxuICAgICAqL1xuICAgIGhlYWRlcnMoKSB7XG4gICAgICAgIHJldHVybiBuZXcgSGVhZGVycyh7XG4gICAgICAgICAgICBcIkNvbm5lY3Rpb25cIjogXCJrZWVwLWFsaXZlXCIsXG4gICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICAgICAgICAgIFwiQWNjZXB0LUVuY29kaW5nXCI6IFwiZ3ppcCwgZGVmbGF0ZSwgYnJcIlxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBtZXRob2RcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIG9wdGlvbnMobWV0aG9kID0gXCJHRVRcIikge1xuICAgICAgICBsZXQgYWNjZXB0ID0gKG1ldGhvZCA9PT0gXCJQT1NUXCIpID8gXCJhcHBsaWNhdGlvbi9qc29uXCIgOiBcIiovKlwiO1xuICAgICAgICBsZXQgaGRyID0gdGhpcy5oZWFkZXJzKCk7XG4gICAgICAgIGhkci5hcHBlbmQoXCJBY2NlcHRcIiwgYWNjZXB0KTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgICAgICAgY2FjaGU6IFwibm8tY2FjaGVcIixcbiAgICAgICAgICAgIGNyZWRlbnRpYWxzOiBcInNhbWUtb3JpZ2luXCIsXG4gICAgICAgICAgICBoZWFkZXJzOiBoZHJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlPGFueT59XG4gICAgICovXG4gICAgYXN5bmMgaGFuZGxlKHVybCwgb3B0aW9ucykge1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHVybCwgb3B0aW9ucyk7XG4gICAgICAgIGlmICghcmVzcG9uc2Uub2spIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTmV0d29yayA6ICR7cmVzcG9uc2Uuc3RhdHVzfWApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXNwb25zZS5qc29uKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHJldHVybnMge1Byb21pc2U8Kj59XG4gICAgICovXG4gICAgYXN5bmMgZ2V0KHVybCkge1xuICAgICAgICBsZXQgb3B0cyA9IHRoaXMub3B0aW9ucyhcIkdFVFwiKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaGFuZGxlKHVybCwgb3B0cyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGRhdGFcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZTwqPn1cbiAgICAgKi9cbiAgICBhc3luYyBwYXRjaCh1cmwsIGRhdGEpIHtcbiAgICAgICAgbGV0IG9wdHMgPSB0aGlzLm9wdGlvbnMoXCJQQVRDSFwiKTtcbiAgICAgICAgb3B0cy5ib2R5ID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XG4gICAgICAgIHJldHVybiBhd2FpdCB0aGlzLmhhbmRsZSh1cmwsIG9wdHMpO1xuICAgIH1cblxufVxuIiwiaW1wb3J0IEhUVFBSZXF1ZXN0cyBmcm9tIFwiLi9yZXN0LmpzXCI7XG5cbmV4cG9ydCB7IGJhc2VVUkxTLCBNZWRpYU1UWEFQSSB9O1xuXG5jb25zdCBiYXNlVVJMUyA9ICgob2JqKSA9PiBPYmplY3QuZnJlZXplKG9iaikpICh7XG4gICAgQkFTRSA6IFwiL3YzL2NvbmZpZ1wiLFxuICAgIEdMT0JBTCA6IFwiZ2xvYmFsXCIsXG4gICAgREVGQVVMVFMgOiBcInBhdGhkZWZhdWx0c1wiLFxuICAgIFBBVEhTIDogXCJwYXRoc1wiLFxuICAgIExJU1Q6IFwicGF0aHMvbGlzdFwiXG59KTtcblxuY29uc3QgYmFzZUFjdGlvbnMgPSAoKG9iaikgPT4gT2JqZWN0LmZyZWV6ZShvYmopKSAoe1xuICAgIFJFQUQgOiBcImdldFwiLFxuICAgIFdSSVRFIDogXCJwYXRjaFwiXG59KTtcblxuXG5cbmNsYXNzIE1lZGlhTVRYQVBJIHtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBkZXZpY2UgPSAnaHR0cDovLzEyNy4wLjAuMTo5OTk3JyxcbiAgICAgICAgd2hpY2ggPSBiYXNlVVJMUy5QQVRIUyxcbiAgICAgICAgbmFtZSA9IFwiXCIpIHtcbiAgICAgICAgdGhpcy53aGljaCA9IHdoaWNoO1xuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLnJvb3QgPSBgJHtkZXZpY2V9JHtiYXNlVVJMUy5CQVNFfS8ke3RoaXMud2hpY2h9YDtcbiAgICB9XG5cbiAgICAjdXJsKGFjdGlvbiA9IGJhc2VBY3Rpb25zLlJFQUQpIHtcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcbiAgICAgICAgICAgIGNhc2UgYmFzZUFjdGlvbnMuUkVBRDpcbiAgICAgICAgICAgICAgICBsZXQgY2FtPSh0aGlzLndoaWNoPT09YmFzZVVSTFMuUEFUSFMpID8gdGhpcy5uYW1lIDogJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGAke3RoaXMucm9vdH0vZ2V0LyR7Y2FtfWA7XG4gICAgICAgICAgICBjYXNlIGJhc2VBY3Rpb25zLldSSVRFOlxuICAgICAgICAgICAgICAgIHJldHVybiBgJHt0aGlzLnJvb3R9L3BhdGNoLyR7dGhpcy5uYW1lfWA7XG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyByZWFkKCkge1xuICAgICAgICBsZXQgdSA9IHRoaXMuI3VybChiYXNlQWN0aW9ucy5SRUFEKTtcbiAgICAgICAgcmV0dXJuIGF3YWl0IChuZXcgSFRUUFJlcXVlc3RzKCkuZ2V0KHUpKTtcbiAgICB9XG5cbiAgICBhc3luYyB3cml0ZShkYXRhKXtcbiAgICAgICAgbGV0IHUgPSB0aGlzLiN1cmwoYmFzZUFjdGlvbnMuV1JJVEUpO1xuICAgICAgICByZXR1cm4gYXdhaXQgKG5ldyBIVFRQUmVxdWVzdHMoKS5wYXRjaCh1LGRhdGEpKTtcbiAgICB9XG5cblxuXG5cbn1cblxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge0FwcGxpY2F0aW9uR1VJfSBmcm9tICcuL2d1aS9hcHBsaWNhdGlvbkdVSS5qcyc7XG5cblxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgbGV0IGFwcEdVSSA9IG5ldyBBcHBsaWNhdGlvbkdVSSgpO1xuICAgIGFwcEdVSS5sb2FkKCkudGhlbiggXyA9PiB7XG4gICAgICAgIHdpbmRvdy5jb25zb2xlLmxvZygnR1VJIGxvYWRlZCcpO1xuICAgIH0pO1xufVxuXG5cbndpbmRvdy5vbmxvYWQgPSAoXykgPT4ge1xuICAgIHdpbmRvdy5jb25zb2xlLmxvZygnU3RhcnRpbmcnKTtcbiAgICBzdGFydCgpO1xuICAgIHdpbmRvdy5vbmxvYWQgPSAoXykgPT4ge307XG59O1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=