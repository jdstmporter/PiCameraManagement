import {TableRow} from "./tableRow.js";


export {ApplicationGUI};

import {MediaMTXInstance} from '../picam/parser.js';
import {PiCam} from "../picam/specifiers.js";

class ApplicationGUI {





    constructor(IP = '192.168.0.203', PORT = 9997) {
        this.IP = IP;
        this.PORT = PORT;
        this.mtx = null;
        this.tag = document.getElementById('inputs');
        console.log(`PICAM is [${PiCam.self()}]`)
        this.fields = PiCam.keys(); //['rpiCameraWidth','rpiCameraHFlip','rpiCameraBrightness'];
    }

    async load() {
        this.mtx = new MediaMTXInstance(this.IP, this.PORT);
        await this.mtx.initialise();
        this.render();


    }

    render() {
        while(this.tag.firstChild) {
            this.tag.removeChild(this.tag.firstChild);
        }

        let table = document.createElement('table');
        this.fields.forEach( f => {
            let row = new TableRow(f);
            let property = this.mtx.get(f);
            console.log(`${f} : ${property.toString()}`);
            table.appendChild(row.map(property));
        });
        this.tag.appendChild(table);

    }
}