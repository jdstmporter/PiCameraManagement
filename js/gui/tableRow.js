import { PropertyField } from './valueFields.js';
import {PiCam} from "../picam/structure/picam.js";

export { TableRow };

class TableRow {

    static textBox(text='',name='text') {
        let box = document.createElement('span');
        box.appendChild(document.createTextNode(text));
        box.setAttribute('name',name);
        return box;
    }
    static readonlyBox(value,name='') {
        let box = document.createElement('input');
        box.disabled=true;
        box.value=value.toString();
        box.setAttribute('name',name);
        return box;
    }

    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {HTMLButtonElement}
     */
    static button(message, name='') {
        let button = document.createElement('button');
        button.appendChild(document.createTextNode(message));
        button.setAttribute('type','button');
        button.setAttribute('name',name);
        return button;
    }

    constructor(state) {
        let field = state.key || "";
        if(!PiCam.has(field)) { throw new Error('No such field'); }
        this.parameters = PiCam.spec(field);
        this.fieldName = field;
        this.state = state;


    }

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
        this.inBox   = this.input.map(this.state.currentValue);
        this.resetD   = TableRow.button('To default','defButton');
        this.resetD.onclick = (ev) => {
            this.state.toDefault();
            this.#reload();
        };

        this.resetC   = TableRow.button('To current','currButton');
        this.resetC.onclick = (ev) => {
            this.state.toCurrent();
            this.#reload();
        };
        this.input = new PropertyField(this.parameters,this.state.editedValue);
        this.input.oninput = (value) => { this.state.editedValue = value; };

        let cells = [this.defBox,this.descBox,this.inBox,this.resetD, this.resetC].map ( cell => {
            let td = document.createElement('td');
            td.appendChild(cell);
            return td;
        });
        let row = document.createElement('tr');
        row.setAttribute('name',this.fieldName);
        cells.forEach(cell => row.appendChild(cell));
        return row;
    }



}