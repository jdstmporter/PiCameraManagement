import {ApplicationGUI} from './gui/applicationGUI.js';


function start() {
    let IP = "192.168.0.203";
    let PORT = 9997;

    let appGUI = new ApplicationGUI(IP, PORT);
    appGUI.load().then( v => {
        console.log('GUI loaded')
    });
}


window.onload = (event) => {
    console.log('Starting');
    start();
    window.onload = (event) => {};
}

