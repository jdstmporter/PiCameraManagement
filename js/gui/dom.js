export {DOM};

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
     *
     * @param {string|HTMLElement }tag
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
     *
     * @param {Node} root
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

    empty() {
        while(this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
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

    setAttr(name,value) {
        this.element.setAttribute(name,value);
        return this;
    }

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
     * @param {object} kv
     * @return {DOM}
     */
    setProps(kv) {
        Object.keys(kv).forEach(key => this.element[key]=kv[key]);
        return this;
    }

    getProp(name) {
        return this.element[name];
    }

    get value() {
        return (this.element.type==='checkbox')? this.element.checked : this.element.value;
    }
    set value(v) {
        if(this.element.type==='checkbox') {
            this.element.checked=v;
        }
        else {
            this.element.value = v;
        }
    }

    validity(error = '') {
        this.element.setCustomValidity(error);
    }

    //set [name](value) { this.element[name]=value; }
    //get [name]() { return this.element[name]; }



}

