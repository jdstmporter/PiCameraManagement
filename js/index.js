import {ApplicationGUI} from './gui/applicationGUI.js';
import {PiCam} from "./picam/structure/picam.js";

const defaultFields = [];

function start() {
    let appGUI = new ApplicationGUI();
    appGUI.load().then( v => {
        console.log('GUI loaded')
    });
}


window.onload = (event) => {
    console.log('Starting');
    start();
    window.onload = (event) => {};
}

