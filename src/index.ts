import ReForm from './ReForm/index';

new ReForm({
    el: '#form',
    data: {
        prop1: {
            value: "Hello",
            required: true
        },
        prop2: {
            value: "World",
            required: false
        },
        prop3: {
            value: false,
            required: true
        },
        prop4: {
            value: 'two',
            required: false
        },
        'prop-select': {
            value: 'vue',
            required: false
        }
    },
    computed: {
        prop5: function () {
            return `${this.prop1['value']} ${this.prop2['value']}`
        },
        prop6: function () {
            return `${this.prop3['value']} ${this.prop4['value']} ${this['prop-select']['value']}`
        }
    }
});
