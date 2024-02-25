import { baseURLS, MediaMTXAPI } from "./restWrapper.js";

export {MediaMTX};

class MediaMTX {

    constructor(ip = '127.0.0.1',
                port = '9997',
                cameraName = "cam") {
        this.device=`http://${ip}:${port}`;
        this.camera = cameraName;
    }

    async get(which = baseURLS.DEFAULTS) {
        let mtx= new MediaMTXAPI(this.device,which);
        return await mtx.read();
    }

    async set(which = baseURLS.DEFAULTS, values = {}) {
        let mtx= new MediaMTXAPI(this.device,which, this.camera);
        return await mtx.write(values);
    }

    async getDefaults() {
        return await this.get(baseURLS.DEFAULTS)
    }

    async getPaths(){
        return await this.get(baseURLS.PATHS)
    }

    async getGlobal(){
        return await this.get(baseURLS.GLOBAL)
    }

    async setPath(values = {}){
        return await this.set(baseURLS.PATHS, values)
    }




}
