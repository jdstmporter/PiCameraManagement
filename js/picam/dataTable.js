
import { PiCam } from './specifiers.js';
import {MediaMTXInstance} from "./parser.js";
import {TableRow} from "../gui/tableRow.js";

export { PiDataSet };


class PiDataSet {

    constructor(ip = '192.168.0.132', port=9997,keys = []) {
        this.keys = (keys.length===0) ? PiCam.keys : keys;
        this.mtx = new MediaMTXInstance(ip,port);
        this.fields=new Map();
        this.keys.forEach( k => this.fields.set(k,PiCam.spec(k)));
    }

    async load() {
        await this.mtx.initialise();
    }

    has(key) { return this.keys.includes(key); }
    specifier(key) { return this.fields.get(key); }
    defaultValue(key) { return this.mtx.get(key).def; }
    getCurrentValue(key) { return this.mtx.get(key).current; }
    setCurrentValue(key,value) { this.mtx.set(key,value); }
    reset(key) { this.mtx.reset(key); }
    resetAll() { this.mtx.resetAll(); }




}
