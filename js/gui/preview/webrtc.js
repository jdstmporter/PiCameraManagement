

import {DOM,DOMHelper} from '../dom.js';
export {WebRTC};

class WebRTC {
        constructor(ip,port='8889',channel='cam') {
            this.url=`http://${ip}:${port}/${channel}`;
            this.section=null;
            this.iframe=null;
        }

        map() {
            this.section=DOM.withID('preview');
            let show=DOMHelper.Button('show','show').
            setProp('onclick', () => { this.start(); });
            let hide = DOMHelper.Button('hide','hide').
            setProp('onclick', () => { this.stop(); });
            this.section?.append(show);
            this.section?.append(hide);
        }

        start() {
            if(this.iframe!==null) { return; }
            this.iframe=new DOM('iframe').setAttr('src',this.url);
            this.section?.append(this.iframe);
        }

        stop() {
            if(this.iframe===null) { return; }
            this.iframe.unmap();
            this.iframe=null;
        }
    }