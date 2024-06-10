
import {PropertySpecifier} from './propertySpecifier.js';
import {Modes} from "./properties.js";
export {PiCam};


class _PiCam {

    constructor() {
        this.props = PropertySpecifier.load();
    }

    allKeys() { return [...this.props.keys()]; }

    keys(mode = Modes.Normal) {
        return mode.keys;
    }

    has(key,mode = Modes.Advanced) {
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



