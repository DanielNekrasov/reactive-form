import Dep from './dep';

export default function observeProps(object) {
    Object.keys(object).forEach(key => {
        let currentValue = object[key];
        const dep = new Dep();

        Object.defineProperty(object, key, {
            get: function () {
                // console.log(currentValue);
                dep.depend();
                return currentValue;
            },
            set: function (newValue) {
                currentValue = newValue;
                dep.notify();
            }
        });
    });
}