export { HTTPRequests as default };


class HTTPRequests {

    constructor() {}

    headers() {
        return new Headers({
            "Connection": "keep-alive",
            "Content-Type": "application/json",
            "Accept-Encoding": "gzip, deflate,  br"
        });
    }

    options(method = "GET") {
        let accept = (method === "POST") ? "application/json" : "*/*";
        let hdr = this.headers();
        hdr.append("Accept", accept);
        return {
            method: method,
            cache: "no-cache",
            credentials: "same-origin",
            headers: hdr
        };
    }

    async handle(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Network : ${response.status}`);
        }
        return response.json();
    }

    async get(url) {
        let opts = this.options("GET");
        return await this.handle(url, opts);
    }

    async patch(url, data) {
        let opts = this.options("PATCH");
        opts.body = JSON.stringify(data);
        return await this.handle(url, opts);
    }

}
