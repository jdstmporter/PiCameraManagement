import {PiCam} from '../picam/specifiers.js';
export {PropertyField};
class PropertyField {

    constructor(field='') {
        if(!PiCam.has(field)) { throw new Error('No such field'); }
        this.parameters = PiCam.spec(field);
        this.field = null;
        this.callback = (v) => {};

    }

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



    map(name = ''){
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
