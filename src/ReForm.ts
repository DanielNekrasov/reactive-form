import observeProps from './core/observe-props';
import watcher from './core/watcher';

export default function ReForm(props) {
    const { data, el } = props;

    observeProps(data);

    Object.keys(data).forEach(key => {
        const inputElements = document.querySelectorAll(`${el} input[x-model="${key}"]`);
        const textElements = document.querySelectorAll(`${el} [x-text="${key}"]`);

        for (const inputElem of inputElements) {
            watcher(() => {
                inputElem.value = data[key];
            });

            inputElem.addEventListener('input', (event) => {
                data[key] = event.currentTarget.value
            })
        }

        for (const textElem of textElements) {
            watcher(() => {
                textElem.innerHTML = data[key];
            })
        }
    })
}
