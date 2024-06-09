
import { PiCam } from './structure/picam.js';
import {MediaMTXInstance, Property} from "./parser.js";
import {TableRow} from "../gui/tableRow.js";

export { PiPropertyValues };

class PropertyState {
    #key;
    #edited;
    #default;
    #current;
    #modified;

    constructor(key,property) {
        this.#key = key;
        this.#default = property.def;
        this.#current = property.current;
        this.#edited = this.#current;
        this.#modified = false;
    }
    get key() { return this.#key; }
    get isModified() { return this.#modified; }

    get editedValue() { return this.#edited; }
    set editedValue(value) {
        this.#edited = value;
        this.#modified = true;
    }

    get currentValue() { return this.#current; }
    get defaultValue() { return this.#default; }

    toDefault() {
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
        return new Property(this.defaultValue, this.currentValue);
    }
}

class PiPropertyValues {

    constructor(ip, port) {
        this.mtx = new MediaMTXInstance(ip,port);
    }

    async load() {
        await this.mtx.initialise();
        return PiCam.allKeys().map( key => {
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
