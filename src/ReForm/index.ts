import observeProps from './core/observe-props';
import {addInputWatchers} from './dom/inputs';
import {addSelectWatchers} from './dom/select';
import {onFormChangeHandler} from './dom/actions';

type Prop = {
    value: any,
    required: boolean
};

type Config = {
    el: string
    data: {
        [key: string]: Prop
    },
    computed: { [key: string]: () => any }
}

function ReForm(props: Config) {
    const {data, el} = props;
    const form = document.querySelector(el);

    if (!form) {
        throw 'The form element is not found';
    }

    observeProps(data);

    addInputWatchers(props);
    addSelectWatchers(props);

    onFormChangeHandler(props);
}

export default ReForm;
