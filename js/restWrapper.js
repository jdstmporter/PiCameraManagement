import HTTPRequests from "./rest.js";

export { baseURLS, MediaMTXAPI };

const baseURLS = ((obj) => Object.freeze(obj)) ({
    BASE : "/v3/config",
    GLOBAL : "global",
    DEFAULTS : "pathdefaults",
    PATHS : "paths",
    LIST: "paths/list"
});

const baseActions = ((obj) => Object.freeze(obj)) ({
    READ : "get",
    WRITE : "patch"
});



class MediaMTXAPI {

    constructor(
        device = 'http://127.0.0.1:9997',
        which = baseURLS.PATHS,
        name = "") {
        this.which = which;
        this.name = name;
        this.root = `${device}${baseURLS.BASE}/${this.which}`;
    }

    #url(action = baseActions.READ) {
        switch (action) {
            case baseActions.READ:
                return `${this.root}/get`;
            case baseActions.WRITE:
                return `${this.root}/patch/${this.name}`;
            default:
                throw Error();
        }
    }

    async read() {
        let u = this.#url(baseActions.READ);
        return await (new HTTPRequests().get(u));
    }

    async write(data){
        let u = this.#url(baseActions.WRITE);
        return await (new HTTPRequests().patch(u,data));
    }




}

