import {PiCamSettings} from './properties.js';
export {PropertySpecifier};

class PropertySpecifier {
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
                return `${this.kind} [${this.help}] : ${this.min}-${this.max}`;
        }
    }

    static keys() {
        return Object.keys(PiCamSettings);
    }

    static load() {

        let props=new Map();
        Object.keys(PiCamSettings).forEach(key => {
                props.set(key,new PropertySpecifier(PiCamSettings[key]));
        });
        return props;
    }
}

