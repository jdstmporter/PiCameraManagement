
import {PropertySpecifier} from './propertySpecifier.js'
import {Modes} from "./properties.js";
export {PiCam};


class _PiCam {

    constructor() {
        this.props = PropertySpecifier.load();
        this.mode = Modes.Normal;
    }

    allKeys() { return [...this.props.keys()]; }

    keys() {
        return this.mode.keys;
    }

    has(key) {
        return this.keys().includes(key);
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



