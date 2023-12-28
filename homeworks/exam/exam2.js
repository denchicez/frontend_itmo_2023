class EventEmitter {
    eventStorage = new Map(); // eventName : [listener1, ..., listenerN]
    listenerStorage = new Map(); // listener : [eventName1, ..., eventName2]
    listenerStorageOnce = new Set();
    maxListeners = null;

    addEventListener(eventName, listener) { // O(1)
        // add to storage
        let oldEventArray = this.eventStorage.has(eventName) ? this.eventStorage.get(eventName) : new Set()
        if (this.maxListeners !== null && this.maxListeners < oldEventArray.size + 1) {
            return
        }
        oldEventArray.add(listener)
        this.eventStorage.set(eventName, oldEventArray)

        // add to listener
        let oldListenerStorage = this.listenerStorage.has(listener) ? this.listenerStorage.get(listener) : new Set()
        oldListenerStorage.add(eventName)
        this.listenerStorage.set(listener, oldListenerStorage)
    }

    removeEventListener(eventName, listener) { // O(1)
        // remove from storage
        let oldEventArray = this.eventStorage.has(eventName) ? this.eventStorage.get(eventName) : new Set()
        oldEventArray.delete(listener)
        this.eventStorage.set(eventName, oldEventArray)

        // remove from listener
        let oldListenerStorage = this.listenerStorage.has(listener) ? this.listenerStorage.get(listener) : new Set()
        oldListenerStorage.delete(eventName)
        this.listenerStorage.set(listener, oldListenerStorage)
        this.listenerStorageOnce.delete(listener)
    }

    emit(eventName) {
        for (let listener of (this.eventStorage.has(eventName) ? this.eventStorage.get(eventName) : new Set())) {
            listener.triger()
            if (this.listenerStorageOnce.has(listener)) { // solo delete
                this.listenerStorageOnce.delete(listener)
                for (let eventNameListener of (this.listenerStorage.has(listener) ? this.listenerStorage.get(listener) : new Set())) {
                    let oldEventArray = this.eventStorage.has(eventNameListener) ? this.eventStorage.get(eventNameListener) : new Set()
                    oldEventArray.delete(listener)
                    this.eventStorage.set(eventNameListener, oldEventArray)
                }
                this.listenerStorage.set(listener, new Set())
            }
        }
    }

    once(eventName, listener) {
        let oldSize = this.eventStorage.has(eventName) ? this.eventStorage.get(eventName).size : 0
        this.addEventListener(eventName, listener)
        let newSize = this.eventStorage.has(eventName) ? this.eventStorage.get(eventName).size : 0
        if (oldSize !== newSize) {
            this.listenerStorageOnce.add(listener)
        }
    }

    setMaxListeners(n) {
        this.maxListeners = n
    }
}

// second part task

const listener1 = {
    triger: function () {
        console.log("triger1!")
    }
}

const listener2 = {
    triger: function () {
        console.log("triger2!")
    }
}

const listener3 = {
    triger: function () {
        console.log("triger3!")
    }
}


eventEmitter = new EventEmitter()
eventEmitter.removeEventListener("a", listener1)
eventEmitter.removeEventListener("asfpkalskfjal,smnfcz,lxnvlksajdf", listener1)
console.log("bad test\n")

eventEmitter.addEventListener("a", listener1)
eventEmitter.emit("a")
eventEmitter.emit("a")
eventEmitter.emit("a")
eventEmitter.emit("a")
console.log("need be trigger 4x of listener1\n")

eventEmitter.setMaxListeners(0)
eventEmitter.addEventListener("b", listener2)
eventEmitter.emit("b")
console.log("need be trigger nothing\n")

eventEmitter.setMaxListeners(2)
eventEmitter.addEventListener("b", listener2)
eventEmitter.emit("b")
console.log("need be trigger of listener2\n")

eventEmitter.setMaxListeners(2)
eventEmitter.addEventListener("a", listener3)
eventEmitter.emit("a")
console.log("need be trigger of listener1, listener3\n")

eventEmitter.removeEventListener("a", listener3)
eventEmitter.emit("a")
console.log("need be trigger of listener1\n")

eventEmitter.addEventListener("a", listener3)
eventEmitter.emit("a")
console.log("need be trigger of listener1, listener3\n")

eventEmitter.addEventListener("a", listener2)
eventEmitter.emit("a")
console.log("need be trigger of listener1, listener3\n")

eventEmitter.setMaxListeners(100)
eventEmitter.once("c", listener1)
eventEmitter.emit("c")
console.log("need be trigger of listener1\n")
eventEmitter.emit("c")
console.log("need be trigger nothing\n")
eventEmitter.emit("c")
console.log("need be trigger nothing\n")

eventEmitter.setMaxListeners(2)
eventEmitter.addEventListener("d", listener1)
eventEmitter.once("d", listener2)
eventEmitter.addEventListener("d", listener3)
eventEmitter.emit("d")
console.log("need be trigger listener1, listener2\n")

eventEmitter.addEventListener("d", listener3)
eventEmitter.emit("d")
console.log("need be trigger listener1, listener3\n")

eventEmitter.once("e", listener1)
eventEmitter.once("e", listener2)
eventEmitter.once("e", listener3)
eventEmitter.emit("e")
console.log("need be trigger listener1, listener2\n")
eventEmitter.emit("e")
console.log("need be trigger nothing\n")