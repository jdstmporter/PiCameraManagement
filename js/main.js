import {MediaMTX} from './api.js';

let IP="192.168.0.132";
let PORT="9997";

let m = new MediaMTX(IP,PORT);
let v = await m.getDefaults();
console.log(v);