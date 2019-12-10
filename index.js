import Dep from './src/Dep.js';

function Store(props) {
    const { data, el } = props;
    // Watcher function
    function watcher(myTargetFn) {
        Dep.target = myTargetFn;
        Dep.target();
        Dep.target = null;
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
        prop1: "Hello",
        prop2: "World"
    }
})
