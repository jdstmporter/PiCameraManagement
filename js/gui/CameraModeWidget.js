
import {DOMHelper} from "./dom.js";

export {CameraModesWidget};

class CameraModesWidget {
    /**
     *
     * @param {CameraModes} camera
     */
    constructor(camera) {
        this.camera = camera;
        this.callback = (m) => { window.console.log(m.toString()); };
        this.options = null;

    }
    get onchange() { return this.callback; }
    set onchange(cb) { this.callback=cb; }

    get index() { return this.camera.index; }
    get model() { return this.camera.model; }
    get length() { return this.camera.length; }
    get strings() { return this.camera.strings; }

    map() {
        this.options = DOMHelper.Select(this.strings,false);
        this.options.setProp('oninput', (ev) => {
            let index=this.options.value;
            this.callback(this.camera.at(index));
        });
        return this.options;
    }

}