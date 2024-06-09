import {PiCam} from '../picam/structure/picam.js';
export {PropertyField};

function isNull(x) { return x===null; }
function isUndefined(x) { return x===undefined; }
function isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }



class PropertyField {

    #valueToLoad

    static #makeField(params) {
        const kind = params.kind;
        let field;
        switch(kind) {
            case 'bool':
                field=document.createElement('input');
                field.type='checkbox';
                break;
            case 'int':
            case 'number':
                field=document.createElement('input');
                field.type='number';
                field.min=params.min;
                field.max=params.max;
                break;
            case 'choose':
                field=document.createElement('select');
                field.multiple=false;
                params.choices.forEach (v => {
                        let o = document.createElement('option');
                        o.text=v;
                        field.add(o);
                    }
                );
                break;
            default:
                field=document.createElement('input');
                field.type='text';
                break;
        }
        field.setAttribute('name',params.name);
        return field;
    }

    constructor(params, value) {
        this.parameters = params;
        this.name=params.name;
        this.field = PropertyField.#makeField(params);
        this.oninput = (v) => {};

        this.#valueToLoad = value;

        this.field.oninput = (ev) => {
            console.log('On input fired');
            if(this.isValid) {
                this.field.setCustomValidity('');
                this.oninput(this.value);
            }
            else {
                this.field.setCustomValidity('Invalid entry');
                console.log(`Bad entry on ${name}`)
            }
        }
        this.value=value;
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
        switch (this.kind) {
            case 'bool':
                this.field.checked = value;
                break;
            default:
                this.field.value = value;
                break;
        }
    }



    get isValid() {
        console.log(`Checking validity: ${this.kind} : ${this.value}`);
        switch(this.kind) {
            case 'int':
            case 'number':
                return !Number.isNaN(this.value);
            default:
                return true;
        }
    }




}
