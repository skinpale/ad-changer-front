export default {
    state: {
        client: {
            id: 1
        }
        //user: JSON.parse(localStorage.getItem('user')) || null,
    },
    actions: {
        login(context, user) {
            context.commit("login", user)
        },
        logout(context, url) {
            context.commit("logout")
            if (url !== '/') router.push('/')
        }
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
        user(state) {
            return state.user
        },
        isAuthenticated(state) {
            return state.user !== null
        },
        getCurrentUserRole(state) {
            return state.user ? state.user.role : null
        }
    }
}