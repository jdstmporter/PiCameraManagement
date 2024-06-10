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
     */
    constructor(tag) {
        if(typeof(tag)==='string') {
            this.element = document.createElement(tag);
        }
        else {
           this.element=tag;
        }
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
        this.element.setAttr(name,value);
        return this;
    }

    setProp(name,value) {
        this.element[name]=value;
        return this;
    }
    getProp(name) {
        return this.element[name];
    }

    set [name](value) { this.element[name]=value; }
    get [name]() { return this.element[name]; }

}