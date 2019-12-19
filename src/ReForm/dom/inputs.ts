import watcher from "../core/watcher";

export function addInputWatchers(props) {
    const {data, el, computed} = props;
    const form = document.querySelector(el);

    const inputElements = form.querySelectorAll('input') as NodeListOf<HTMLInputElement>;

    for (const inputElem of inputElements) {
        const prop = inputElem.name;

        if(data.hasOwnProperty(prop)) {
            switch (inputElem.type) {
                case "checkbox":
                    watcher(() => {
                        inputElem.checked = data[prop].value;
                        inputElem.required = data[prop].required;
                    });
                    break;
                case "radio":
                    watcher(() => {
                        inputElem.checked = data[prop].value === inputElem.value;
                        inputElem.required = data[prop].required;
                    });
                    break;
                default:
                    watcher(() => {
                        inputElem.value = data[prop].value;
                        inputElem.required = data[prop].required;
                    });
                    break;
            }
        }

        if(computed.hasOwnProperty(prop)){
            watcher(() => {
                inputElem.value = computed[prop].call(data);
            });
        }
    }
}