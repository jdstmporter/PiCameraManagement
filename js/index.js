//import {MediaMTXInstance} from './parser.js';
import {PropertyField} from './gui/valueFields.js';
 function start() {
    let IP = "192.168.0.132";
    let PORT = 9997;

    let fields = ['rpiCameraWidth','rpiCameraHFlip','rpiCameraBrightness'];
    let items = fields.map( f => {
        console.log(`Making ${f}`);
        return new PropertyField(f);
    });

    let tag = document.getElementById('')
    items.forEach(i => {
        i.map(`Field ${i}`);
        document.body.appendChild(i.field);
    });

    /*
    let m = new MediaMTXInstance(IP, PORT);
    m.initialise().then( v => {
        m.keys.forEach(key => {
            let pair = m.get(key);
            console.log(`${key} : ${pair.def} - ${pair.current}`)
        });
    });
     */

}


window.onload = (event) => {
    console.log('Starting');
    start();
    window.onload = (event) => {};
}

