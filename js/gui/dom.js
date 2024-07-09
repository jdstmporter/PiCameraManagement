export {DOM, DOMHelper};

class DOM {

    /**
     *
     * @param {String} id
     * @returns {DOM}
     */
    static withID(id) {
        return new DOM(document.getElementById(id));
    }

    /**
     * @desc class constructor
     * @param {string|HTMLElement} tag
     * @param {object} props
     */
    constructor(tag, props = {}) {
        if(typeof(tag)==='string') {
            this.element = document.createElement(tag);
        }
        else {
           this.element=tag;
        }
        this.setProps(props);
    }

    get dom() { return this.element; }

    /**
     * @desc Attach as child
     * @param {Node} root - the parent
     */
    map(root = document) {
        root.appendChild(this.element);
    }
    /**
     *
     * @param {DOM} child
     * @returns {DOM}
     */
    append(child) {
        this.element.appendChild(child.dom);
        return this;
    }

    /**
     * @desc Remove all child elements
     * @returns {DOM}
     */
    empty() {
        while(this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        return this;
    }

    unmap() {
        this.element.parentElement?.removeChild(this.element);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {DOM}
     */
    text(value) {
        this.element.appendChild(document.createTextNode(value));
        return this;
    }

    /**
     *
     * @param {string} name
     * @param {any}value
     * @returns {DOM}
     */
    setAttr(name,value) {
        this.element.setAttribute(name,value);
        return this;
    }

    /**
     *
     * @param {Object<string,any>} kv - ket-value pairs for properties to set
     * @returns {DOM} - this
     */
    setAttrs(kv) {
        Object.keys(kv).forEach(key => this.element.setAttribute(key,kv[key]));
        return this;
    }

    /**
     *
     * @param {string} name
     * @param {any} value
     * @returns {DOM}
     */
    setProp(name,value) {
        this.element[name]=value;
        return this;
    }

    /**
     *
     * @param {Object<string,any>} kv
     * @return {DOM}
     */
    setProps(kv) {
        Object.keys(kv).forEach(key => this.element[key]=kv[key]);
        return this;
    }

    /**
     *
     * @param {string} name - parameter name
     * @returns {*}
     */
    getProp(name) {
        return this.element[name];
    }

    /**
     *
     * @param {Array<string>} classes
     * @returns {DOM}
     */
    addClasses(classes = []) {
        this.element.classList.add(...classes);
        return this;
    }

    /**
     *
     * @param {string} klass
     * @returns {DOM}
     */
    addClass(klass) {
        return this.addClasses([klass]);
    }

    /**
     *
     * @param {string} klass
     * @returns {boolean}
     */
    hasClass(klass = '') {
        return this.element.classList.contains(klass);
    }




    /**
     * @desc Getter for data value (depending on control type)
     * @returns {*}
     */
    get value() {
        return (this.element.type==='checkbox')? this.element.checked : this.element.value;
    }

    /**
     * @desc Setter for data value (depending on control type)
     * @param v
     */
    set value(v) {
        if(this.element.type==='checkbox') {
            this.element.checked=v;
        }
        else {
            this.element.value = v;
        }
    }

    /**
     *
     * @param {string} [error=] - validity error message to set ('' -> no error)
     */
    validity(error = '') {
        this.element.setCustomValidity(error);
    }

    //set [name](value) { this.element[name]=value; }
    //get [name]() { return this.element[name]; }

    click() {
        this.element.click();
    }


}

class DOMHelper {
    /**
     *
     * @param {string} message
     * @param {string} name
     * @returns {DOM}
     * @constructor
     */
    static Button(message,name='') {
        return new DOM('button')
            .text(message)
            .setAttrs({
                type: 'button',
                name: name
            });
    }
}

