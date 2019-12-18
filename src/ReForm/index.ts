import observeProps from './core/observe-props';
import watcher from './core/watcher';

type config = {
    el: string
    data: object,
    computed: any
}

export default function ReForm(props: config) {
    const {data, el, computed} = props;
    const form = document.querySelector(el);

    if (!form) {
        throw 'The form element is not found';
    }

    observeProps(data);

    Object.keys(data).forEach(prop => {
        const inputElements = form.querySelectorAll(`input[name="${prop}"]`) as NodeListOf<HTMLInputElement>;

        for (const inputElem of inputElements) {
            switch (inputElem.type) {
                case "checkbox":
                    watcher(() => {
                        inputElem.checked = data[prop];
                    });
                    break;
                case "radio":
                    watcher(() => {
                        inputElem.checked = data[prop] === inputElem.value;
                    });
                    break;
                default:
                    watcher(() => {
                        inputElem.value = data[prop];
                    });
                    break;
            }
        }
    });

    Object.keys(computed).forEach(prop => {
        const inputElements = form.querySelectorAll(`input[name="${prop}"]`) as NodeListOf<HTMLInputElement>;

        for (const inputElem of inputElements) {
            watcher(() => {
                inputElem.value = computed[prop].call(data);
            });
        }
    });

    form.addEventListener('input', (event) => {
        const inputElem = event.target as HTMLInputElement,
            prop = inputElem.name;

        if (inputElem.type === 'checkbox') {
            data[prop] = inputElem.checked;
        } else {
            data[prop] = inputElem.value;
        }
    });

    return computed;
}