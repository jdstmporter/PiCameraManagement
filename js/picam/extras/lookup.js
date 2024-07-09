import {HTTPRequests} from '../../rest.js';
export {CameraExtrasAPI};

const baseURLS = ((obj) => Object.freeze(obj)) ({
    BASE : '',
    PATHS : ''
});

const baseActions = ((obj) => Object.freeze(obj)) ({
    READ : "get",
});

class CameraExtrasAPI {
    constructor(
        device = 'http://127.0.0.1:8080',
        dummy = false
    ) {
        this.dummy = dummy;
        this.root = `${device}${baseURLS.BASE}/`;
    }

    #url(action = baseActions.READ) {
        switch (action) {
            case baseActions.READ:
                return this.root;
            default:
                throw Error();
        }
    }

    async read() {
        if(this.dummy) {
            return [[{
                index: 0,
                model: 'dummy',
                format: 'dummy',
                width: 1920,
                height: 1080,
                fps: 30
            }]];
        }
        else {
            let u = this.#url(baseActions.READ);
            return await (new HTTPRequests().get(u));
        }
    }
}
