let data = {
    quantity: 5,
    price: 10
}

let target = null;

let total = 0;
let sale = 0;

// Dependency class
function Dep() {
    this.subscribers = [];
}

Dep.prototype.depend = function () {
    if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
    }
}

Dep.prototype.notify = function () {
    this.subscribers.forEach(sub => sub())
}


// Watcher function
function watcher(myTargetFn) {
    target = myTargetFn
    target();
    target = null;
}


Object.keys(data).forEach(key => {
    let currentValue = data[key]
    const dep = new Dep();

    Object.defineProperty(data, key, {
        get: function () {
            dep.depend();
            return currentValue;
        },
        set: function (newValue) {
            currentValue = newValue;
            dep.notify();
        }
    });

})

watcher(() => {
    total = data.price * data.quantity;
})
watcher(() => {
    sale = data.price - data.price * 0.10;
})

console.log(sale);
data.price = 100;
console.log(sale);
