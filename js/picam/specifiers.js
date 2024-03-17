import {PiCamSettings} from './properties.js';
export {PiCam};

class Specifier {
    constructor(args = []) {
        this.kind = args[0] || '';
        this.help = args[args.length-1] || '';

        let min = NaN;
        let max = NaN;
        let choices = [];

        switch (this.kind) {
            case 'int':
                min = parseInt(args[1][0]);
                max = parseInt(args[1][1]);
                break;
            case 'number':
                min = parseFloat(args[1][0]);
                max = parseFloat(args[1][1]);
                break;
            case 'choose':
                choices = args[1];
                break;
            default:
                break;
        }
        this.min = min;
        this.max = max;
        this.choices = choices;
    }

    toString() {
        switch (this.kind) {
            case 'choose':
                return `${this.kind} [${this.help}] : ${this.choices}`;
            case 'bool':
                return `${this.kind} [${this.help}]`;
            default:
                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`
        }
    }
}


class _PiCam {

    constructor() {
        this.props=new Map();

        Object.entries(PiCamSettings).forEach(kv => {
            let [k,v] = kv;
            this.props.set(k,new Specifier(v));
        });
    }

    has(key) { return this.props.has(key); }
    spec(key) { return this.props.get(key); }

    kind(key) { return this.spec(key).kind; }
    help(key) { return this.spec(key).help; }
    max(key) { return this.spec(key).max; }
    min(key) { return this.spec(key).min; }
    choices(key) { return this.spec(key).choices || []; }
}

const PiCam = new _PiCam();
