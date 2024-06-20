import {TableRow} from "./tableRow.js";
import {Modes} from "../picam/structure/properties.js";

export {ApplicationGUI};

import {PiPropertyValues} from '../picam/dataTable.js';
import {PiCam} from "../picam/structure/picam.js";
import {Defaults} from "../defaults/defaults.js";
import {DOM} from "./dom.js";

class ApplicationGUI {

    static Headers = [
        'Default',
        'Description',
        'Value',
        '',
        ''
    ];

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

    render() {
        this.tag.empty();

        let table = new DOM('table');
        let headerRow = new DOM('tr');
        ApplicationGUI.Headers.forEach( text => {
            let th = new DOM('th').text(text).setAttr('empty',text==='');
            headerRow.append(th);
        });
        table.append(headerRow);


        PiCam.keys(this.mode).forEach( key => table.append(this.rows[key].dom));
        this.tag.append(table);
    }
}