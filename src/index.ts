import ReForm from './ReForm/index';

new ReForm({
    el: '#form',
    data: {
        prop1: "Hello",
        prop2: "World",
        prop3: true,
        prop4: 'two'
    },
    computed: {
        prop5: function () {
            return this.prop1 + this.prop2
        }
    }
});
