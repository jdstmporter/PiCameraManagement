import {TableRow} from "./tableRow.js";


export {ApplicationGUI};

import {PiPropertyValues} from '../picam/dataTable.js';
import {PiCam} from "../picam/structure/picam.js";
import {Defaults} from "../defaults/defaults.js";

class ApplicationGUI {

    constructor() {
        this.IP = Defaults.IP_ADDRESS;
        this.PORT = Defaults.PORT;

        this.properties = new PiPropertyValues(this.IP,this.PORT);
        this.rows = {};

        this.tag = document.getElementById('inputs');
        console.log(`PICAM is [${PiCam}]`);
    }

    async load() {

        let states = await this.properties.load();
        this.rows = {};
        states.forEach(state => {
            let row = new TableRow(state);
            row.map();
            this.rows[row.fieldName] = row;
        });
        this.render();


    }

    get mode() { return PiCam.mode; }
    set mode(value) {
        PiCam.mode=value;
        self.render();
    }

    render() {
        while(this.tag.firstChild) {
            this.tag.removeChild(this.tag.firstChild);
        }

        let table = document.createElement('table');
        PiCam.keys().forEach( key => table.appendChild(this.rows[key]));
        this.tag.appendChild(table);
    }
}