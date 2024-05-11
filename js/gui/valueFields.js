import {PiCam} from '../picam/specifiers.js';
export {PropertyField};

function isNull(x) { return x===null; }
function isUndefined(x) { return x===undefined; }
function isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }



class PropertyField {

    constructor(params,editable = true) {
        this.parameters = params;
        this.field = null;
        this.oninput = (v) => {};
        this.name=params.name;
        this.editable = editable;
        this.tempValue = null;
        this.mapped = false;

    }

    #updateDOM() {
        switch (this.kind) {
            case 'bool':
                this.field.checked = this.tempValue;
                break;
            default:
                this.field.value = this.tempValue.toString();
                break;
        }
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
        this.tempValue=value;
        if(!isNull(this.field))  this.#updateDOM();
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



    map(value = '',name = ''){
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
        this.field.setAttribute('name',name);
        this.field.disabled=!this.editable;
        if(this.editable) {
            this.field.disabled=true;
            this.field.oninput = (ev) => {
                console.log('On input fired');
                if(this.isValid) {
                    this.field.setCustomValidity('');
                    let event = new InputEvent('input', {
                        data : this.value
                    });
                    this.oninput(event);
                }
                else {
                    this.field.setCustomValidity('Invalid entry');
                    console.log(`Bad entry on ${name}`)
                }
            }
        }
        this.value=value;
        return this.field;
    }
}
