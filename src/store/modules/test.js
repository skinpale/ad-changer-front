export default {
    state: {
        counter: parseInt(localStorage.getItem('counter') || '0'),
    },
    mutations: {
        increment(state) {
            state.counter++;
            localStorage.setItem('counter', state.counter);
        },
        decrement(state) {
            state.counter--;
            localStorage.setItem('counter', state.counter);
        },
    },
    actions: {
        increment(context) {
            context.commit('increment');
        },
        decrement(context) {
            context.commit('decrement');
        },
    },
    getters: {
        counter(state) {
            return state.counter
        }
    },
}