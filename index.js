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

Dep.prototype.notify = function () {
    this.subscribers.forEach(sub => sub());
};

function Store(props) {
    const { data, el } = props;
    // Watcher function
    function watcher(myTargetFn) {
        target = myTargetFn;
        target();
        target = null;
    }

    Object.keys(data).forEach(key => {
        let currentValue = data[key];
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
    });

    Object.keys(data).forEach(key => {
        const inputElem = document.querySelector(`${el} input[name="data.${key}"]`);

        if (inputElem) {
            watcher(() => {
                inputElem.value = data[key];
            })

            inputElem.addEventListener('change', (event) => {
                data[key] = event.currentTarget.value
            })
        }
    })
}


const store = new Store({
    el: '#form',
    data: {
        prop1: "Hello45",
        prop2: "World"
    }
})


