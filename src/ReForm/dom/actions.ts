export function onFormChangeHandler(props) {
    const {data, el} = props;
    const form = document.querySelector(el);

    form.addEventListener('input', (event) => {
        const inputElem = event.target as HTMLInputElement,
            prop = inputElem.name;

        if (inputElem.type === 'checkbox') {
            data[prop] = {
                ...data[prop],
                value: inputElem.checked
            };
        } else {
            data[prop] = {
                ...data[prop],
                value: inputElem.value
            };
        }
    });
}