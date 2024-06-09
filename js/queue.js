

const NullCallback = (e) => {};

class MessageQueue {

    constructor(name = 'queue') {
        this.name = name;
        this.listeners = [];
    }

    listen(listener,callback = NullCallback) {
        listener.addEventListener(this.name,callback,false);
        this.listeners.push(listener);
    }

    fire(data = null) {
       let event = new CustomEvent(
           this.name,
           data
       );
       this.listeners.forEach(l => l.dispatchEvent(event));
    }
}