import { PropertyField } from './valueFields.js';
import {PiCam} from "../picam/structure/picam.js";
import {DOM} from "./dom.js";

export { TableRow };

class TableRow {

    static textBox(text='',name='text') {
        let box = new DOM('span').text(text).setAttr('name',name);
        return box;
    }
    static readonlyBox(value,name='') {
        let box = new DOM('input');
        box.setProp('disabled',true).setProp('value',value.toString());
        box.setAttr('name',name);
        return box;
    }

    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {DOM}
     */
    static button(message, name='') {
        let button = new DOM('button');
        button.text(message).setAttr('type','button').setAttr('name',name);
        return button;
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

        this.input = new PropertyField(this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };

        this.inBox   = new DOM(this.input.field);

        this.resetD   = TableRow.button('To default','defButton');
        this.resetD.dom.onclick = (ev) => {
            this.state.toDefault();
            this.#reload();
        };

        this.resetC   = TableRow.button('To current','currButton');
        this.resetC.dom.onclick = (ev) => {
            this.state.toCurrent();
            this.#reload();
        };


        let cells = [this.defBox,this.descBox,this.inBox,this.resetD, this.resetC].map ( cell => {
            let td = new DOM('td').append(cell);
            return td;
        });
        let row = new DOM('tr'); //document.createElement('tr');
        row.setAttr('name',this.fieldName);
        cells.forEach(cell => row.append(cell));
        return row;
    }



}