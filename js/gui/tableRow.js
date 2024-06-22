import { PropertyField } from './valueFields.js';
import {PiCam} from "../picam/structure/picam.js";
import {DOM} from "./dom.js";

export { TableRow };

class TableRow {

    static textBox(text='',name='text') {
        return new DOM('span')
            .text(text)
            .setAttr('name',name);
    }
    static readonlyBox(value,name='') {
        return new DOM('input',{
                disabled :true,
                value: value.toString()
            }).setAttr('name',name);
    }

    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {DOM}
     */
    static button(message, name='') {
        return new DOM('button')
            .text(message)
            .setAttrs({
                type: 'button',
                name: name
            });
    }

    constructor(state) {
        let field = state.key || "";
        if(!PiCam.has(field)) { throw new Error(`No such field as ${field}`); }
        this.parameters = PiCam.spec(field);
        this.fieldName = field;
        this.state = state;
        this.dom=this.map();
    }



    /**
     * @desc Callback
     * @returns {*}
     */
    get onchange() { return this.input.oninput(); }
    //set onchange(cb) { this.input.oninput=cb; }


    get value() { return this.input.value; }
    set value(v) { this.input.value=v; }

    #reload() {
        this.input.value=this.state.currentValue;
    }

    map() {
        this.defBox = TableRow.readonlyBox(this.state.defaultValue.toString(),'default');
        this.descBox = TableRow.textBox(this.parameters.help,'help');

        this.input = new PropertyField(this.fieldName,this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };
        this.inBox  = this.input.field;

        this.resetD   = TableRow.button('To default','defButton');
        this.resetD.setProp('onclick', (ev) => {
            this.state.toDefault();
            this.#reload();
        });

        this.resetC   = TableRow.button('To current','currButton');
        this.resetC.setProp('onclick', (ev) => {
            this.state.toCurrent();
            this.#reload();
        });


        let cells = [this.defBox,this.descBox,this.inBox,this.resetD, this.resetC].map ( cell => {
            return new DOM('td').append(cell);
        });
        let row = new DOM('tr').setAttr('name',this.fieldName);
        cells.forEach(cell => row.append(cell));
        return row;
    }

    reset(field) {
        switch(field) {
            case 'default':
                this.resetD.click();
                break;
            case 'current':
                this.resetC.click();
                break;
            default:
                break;
        }
    }



}