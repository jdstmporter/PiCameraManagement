import { PropertyField } from './valueFields.js';
import {PiCam} from "../picam/specifiers.js";

export { TableRow }

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

    constructor(field = '') {
        if(!PiCam.has(field)) { throw new Error('No such field'); }
        this.parameters = PiCam.spec(field);
        this.fieldName = field;
        this.input = new PropertyField(this.parameters);
        this.current = null;
    }

    map(defaultValue) {
        this.defBox = TableRow.readonlyBox(defaultValue.toString(),'default');
        this.descBox = TableRow.textBox(this.parameters.help,'help');
        this.inBox   = this.input.map('value');

        let cells = [this.defBox,this.descBox,this.inBox].map ( cell => {
            let td = document.createElement('td');
            td.appendChild(cell);
            return td;
        });
        let row = document.createElement('tr');
        row.setAttribute('name',this.fieldName)
        cells.forEach(cell => row.appendChild(cell));
        return row;
    }


}