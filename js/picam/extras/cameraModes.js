import {CameraExtrasAPI} from "./lookup.js";
export {CameraModes};


class CameraMode {
    constructor(mode={}) {
        this.mode=mode;
    }
    get format() { return this.mode.format; }
    get fps() { return this.mode.fps; }
    get width() { return this.mode.width; }
    get height() { return this.mode.height; }

    toString() {
        return `(${this.width}x${this.height}) @ ${this.fps}fps`;
    }

}


/**
 *
 */
class CameraModes {
    constructor(modes=[]) {
        let empty = modes.length===0;
        this.index= empty ? NaN : modes[0].index;
        this.model= empty ? '' : modes[0].model;
        this.modes=modes.map(mode => new CameraMode(mode));
    }


    get isValid() { return !Number.isNaN(this.index); }
    get length() { return this.modes.length; }

    static Invalid() { return new CameraModes(); }

    /**
     * @param {string} key
     * @returns {CameraMode|undefined}
     */
    *[Symbol.iterator]() {
        yield* this.modes;
    }
    at(index) { return this.modes[index]; }

    get strings() { return this.modes.map(mode => mode.toString()); }


}

class CameraModeInformation {

    constructor(ip='127.0.0.1',port = 8080,dummy=false) {
        let device = `http://${ip}:${port}`;
        this.server = new CameraExtrasAPI(device,dummy);
        this.info=[];

    }

    async load() {
        try {
            let data = await this.server.read();
            this.info = data.map(cam => new CameraModes(cam)).filter(c => c.isValid);
        }
        catch {
            this.info=[];
        }
    }



    get length() { return this.info.length; }
    /**
     *
     * @returns {CameraModes}
     */
    camera(index=0) {
        let possibles=this.info.filter(modes => modes.index===index);
        return (possibles.length>0) ? possibles[0] : CameraModes.Invalid();
    }

    index(camera = 0) { return this.camera(camera).index; }
    model(camera = 0) { return this.camera(camera).model; }
    modes(camera = 0) { return this.camera(camera).modes; }
    nModes(camera=0) { return this.modes(camera).length; }

}