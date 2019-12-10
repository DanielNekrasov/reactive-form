let data = {
    prop1: "Hello",
    prop2: "World"
};

let target = null;

// Dependency class
function Dep() {
    this.subscribers = [];
}

Dep.prototype.depend = function () {
    if (target && !this.subscribers.includes(target)) {
        this.subscribers.push(target);
    }
};

Dep.prototype.notify = function () {
    this.subscribers.forEach(sub => sub());
};

// Watcher function
function watcher(myTargetFn) {
    target = myTargetFn;
    target();
    target = null;
}

Object.keys(data).forEach(key => {
    let currentValue = data[key];
    const dep = new Dep();
    console.log(dep);

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
});


Object.keys(data).forEach(key => {
    const el = document.querySelector(`#form input[name="data.${key}"]`);

    if (el) {
        watcher(() => {
            el.value = data[key];
        })

        el.addEventListener('change', (event) => {
            data[key] = event.currentTarget.value
        })
    }
})

