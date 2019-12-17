import observeProps from './core/observe-props';
import watcher from './core/watcher';

type config  = {
    el: string
    data: object
}

export default function ReForm(props: config) {
    const { data, el } = props;
    const form = document.querySelector(el);

    observeProps(data);

    if(form){
        Object.keys(data).forEach(prop => {
            const inputElements = form.querySelectorAll(`input[name="${prop}"]`);

            for (const inputElem of inputElements) {
                if (inputElem.type === 'checkbox') {
                    watcher(() => {
                        inputElem.checked = data[prop];
                    });
                } else {
                    watcher(() => {
                        inputElem.value = data[prop];
                    });
                }
            }
        });

        form.addEventListener('input', (event) => {
            const inputElem = event.target;
            if (inputElem){
                const prop = inputElem.name;

                if(inputElem.type === 'checkbox') {
                    data[prop] = inputElem.checked;
                } else {
                    data[prop] = inputElem.value;
                }
            }
        });
    }
}