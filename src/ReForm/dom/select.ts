import watcher from "../core/watcher";

export function addSelectWatchers(props) {
    const {data, el} = props;
    const form = document.querySelector(el);

    const selectElements = form.querySelectorAll('select') as NodeListOf<HTMLSelectElement>;

    for (const selectElem of selectElements) {
        const prop = selectElem.name;

        if(data.hasOwnProperty(prop)) {
            watcher(() => {
                selectElem.value = data[prop];
            });
        }
    }
}