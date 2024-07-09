import {TableRow} from "./tableRow.js";
import {Modes} from "../picam/structure/properties.js";

export {ApplicationGUI};

import {PiPropertyValues} from '../picam/dataTable.js';
import {PiCam} from "../picam/structure/picam.js";
import {Defaults} from "../defaults/defaults.js";
import {DOM, DOMHelper} from "./dom.js";

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

    constructor(mode = Modes.Normal) {
        this.IP = Defaults.IP_ADDRESS;
        this.PORT = Defaults.PORT;
        this._mode = mode;

        this.properties = new PiPropertyValues(this.IP,this.PORT);
        this.rows = {};

        this.tag = DOM.withID('inputs'); //document.getElementById('inputs');
        window.console.log(`PICAM is [${PiCam}]`);
    }

    async load() {

        let states = await this.properties.load(this.mode);
        this.rows = {};
        window.console.log(`Mode is ${this.mode.toString()}`);
        window.console.log(`Keys are ${PiCam.keys(this.mode)}`);
        states.forEach(state => {
            let row = new TableRow(state);
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

    #headerRow() {
        let headerRow = new DOM('tr');
        let hdrs = ApplicationGUI.Headers();
        Object.keys(hdrs).forEach(key => {
            let value = hdrs[key];
            let th = new DOM('th');
            switch(value) {
                case 'text':
                    th.text(key);
                    break;
                case 'button':
                    th.append(DOMHelper.Button(key,key).addClass('all')
                        .setProp('onclick', (ev) => {
                        this.#actions(key);
                    }));
                    break;
                default:
                    break;
            }
            headerRow.append(th);
        });
        return headerRow;
    }

    render() {
        this.tag.empty();

        let table = new DOM('table');

        table.append(this.#headerRow());


        PiCam.keys(this.mode).forEach( key => table.append(this.rows[key].dom));
        this.tag.append(table);
    }
}