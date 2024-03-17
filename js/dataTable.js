
export { RpiProperty };

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

class RpiParameters {

    static #boxKinds = {
//    rpiCameraCamID: ['int', 0, 256],
        rpiCameraWidth: ['int', [0, 65536], 'screen width in pixels'],
        rpiCameraHeight: ['int', [0, 65536], 'screen height in pixels'],
        rpiCameraHFlip: ['bool', 'horizontally flip image'],
        rpiCameraVFlip: ['bool', 'vertically flip image'],
        rpiCameraBrightness: ['number', [-1.0, 1.0], 'image brightness'],
        rpiCameraContrast: ['int', [0, 16], 'image contrast'],
        rpiCameraSaturation: ['int', [0, 16], 'image saturation'],
        rpiCameraSharpness: ['int', [0, 16], 'image sharpness'],
        rpiCameraExposure: ['choose', ['normal', 'short', 'long', 'custom'], 'image exposure'],
        rpiCameraAWB: ['choose', ['auto', 'incandescent', 'tungsten', 'flourescent', 'indoor', 'daylight', 'cloudy', 'custom'], 'lighting model'],
        rpiCameraDenoise: ['choose', ['off', 'cdn_off', 'cdn_fast', 'cdn_hq'], 'noise correction'],
        rpiCameraShutter: ['int', [0, 1048576], 'camera shutter speed'],
        //   rpiCameraMetering: ['choose',['centre','spot','matrix','custom']],
//    rpiCameraGain: ['number',-16.90,16.0],
//    rpiCameraEV: ['number',-10.0,10.0],
        rpiCameraAfMode: ['choose', ['auto', 'manual', 'continuous'], 'autofocus mode'],
        rpiCameraAfRange: ['choose', ['normal', 'macro', 'full'], 'autofocus range'],
        rpiCameraAfSpeed: ['choose', ['normal', 'fast'], 'autofocus speed'],
        rpiCameraLensPosition: ['number', [0.0, 256.0], 'lens position (1 / distance to object)']
    }

    static properties;

    static {
        this.properties=new Map();
        for (const [k,v] of Object.entries(this.#boxKinds)) { this.properties.set(k,new Specifier(v)); }
    }

    static get(field = '') {
        return this.properties.get(field);
    }
    static has(field = '') {
        return this.properties.has(field);
    }

}


class RpiProperty {

    get kind() { return this.parameters.kind; }

     get value() {
        switch(this.kind) {
            case 'int':
                return parseInt(this.field.value);
            case 'number':
                return parseFloat(this.field.value);
            case 'bool':
                return this.field.checked;
            default:
                return this.field.value;
        }
    }
     set value(value) {
        switch(this.kind) {
            case 'bool':
                this.field.checked=value;
                break;
            default:
                this.field.value=value.toString();
                break;
        }
    }

     get isValid() {
        switch(this.kind) {
            case 'int':
            case 'number':
                return !Number.isNaN(this.value);
            default:
                return true;
        }
    }

    constructor(field='') {
       if(!RpiParameters.has(field)) { throw new Error('No such field'); }
       this.parameters = RpiParameters.get(field);
       this.field = new HTMLElement();
       this.callback = (v) => {};

    }

    map(name = '') {
        const kind = this.parameters.kind;
        switch(kind) {
            case 'bool':
                this.field=document.createElement('input');
                this.field.type='checkbox';
                break;
            case 'int':
            case 'number':
                this.field=document.createElement('input');
                this.field.type='number';
                this.field.min=this.parameters.min;
                this.field.max=this.parameters.max;
                break;
            case 'choose':
                this.field=document.createElement('select');
                this.field.multiple=false;
                this.parameters.choices.forEach (v => {
                    let o = document.createElement('option');
                    o.text=v;
                    this.field.add(o);
                    }
                );
                break;
        }
        this.field.name=name;
        this.field.oninput = (ev) => {
            if(this.isValid) {
                this.field.setCustomValidity('');
                this.callback(this.value);
            }
            else {
                this.field.setCustomValidity('Invalid entry');
            }
        }
        return this.field;
    }
}
