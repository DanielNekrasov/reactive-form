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

        if(computed.hasOwnProperty(prop)){
            watcher(() => {
                inputElem.value = computed[prop].call(data);
            });
        }
    }
}