export default {
    state: {
        user: JSON.parse(localStorage.getItem('user')) || null,
    },
    mutations: {
        login(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem('user');
        },
    },
    getters: {
        user: state => state.user,
        isAuthenticated: state => state.user !== null,
    },
}