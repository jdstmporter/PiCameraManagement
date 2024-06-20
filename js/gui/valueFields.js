import {PiCam} from '../picam/structure/picam.js';
import {DOM} from "./dom.js";
export {PropertyField};

function isNull(x) { return x===null; }
function isUndefined(x) { return x===undefined; }
function isNullOrUndefined(x) { return isNull(x) || isUndefined(x); }



class PropertyField {



    static makeField(params) {
        const kind = params.kind;
        let field;
        switch(kind) {
            case 'bool':
                field=new DOM('input',{
                    type: 'checkbox'
                });
                break;
            case 'int':
            case 'number':
                field=new DOM('input', {
                    type: 'number',
                    min: params.min,
                    max: params.max
                });
                break;
            case 'choose':
                field=new DOM('select',{
                    multiple: false
                });
                params.choices.forEach (v => {
                        let o = new DOM('option',{
                            text: v
                        });
                        field.append(o);
                    }
                );
                break;
            default:
                field=new DOM('input', {
                    type: 'text'
                });
                break;
        }
        field.setAttr('name',params.name);
        return field;
    }

    constructor(name, params, value) {
        this.parameters = params;
        this.name=name;
        this.field = PropertyField.makeField(params);
        this.oninput = (v) => {};

        this.valueToLoad = value;

        this.field.setProp('oninput', (ev) => {
            window.console.log('On input fired');
            if(this.isValid) {
                this.field.validity();
                this.oninput(this.value);
            }
            else {
                this.field.validity('Invalid entry');
                window.console.log(`Bad entry on ${name}`);
            }
        });
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
                return this.field.value;
            default:
                return this.field.value;
        }
    }
    set value(value) {
        window.console.log(`Setting ${this.name} to ${value}`);
        switch (this.kind) {
            case 'bool':
                this.field.value=value;
                break;
            default:
                this.field.value=value;
                break;
        }
        window.console.log(`${this.name}.value=${this.field.value}`);
    }



    get isValid() {
        window.console.log(`Checking validity: ${this.kind} : ${this.value}`);
        switch(this.kind) {
            case 'int':
            case 'number':
                return !Number.isNaN(this.value);
            default:
                return true;
        }
    }




}
