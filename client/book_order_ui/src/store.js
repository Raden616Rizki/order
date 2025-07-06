import { createStore } from "vuex"

import User from "./models/User"

export const login = 'LOGIN';
export const logout = 'LOGOUT'

// Define the initial state of the store
const state = {
    user: User.from(localStorage?.token),
    token: localStorage.getItem('token'),
    isLoggedIn: !!localStorage.getItem('token') // Check if token exist
}

// Define mutations to modify the state
const mutations = {
    login (state, data) {
        state.token = data.token;
        state.user = User.from(data.token);
        localStorage.setItem('token', data.token);
    },
    logout (state) {
        state.token = null;
        state.user = null;
        localStorage.removeItem('token');
    }
}

// Define getters to access the state
const getters = {
    currentUser: state => {
        return state.user;
    },
    isLoggedIn: state => {
        return state.isLoggedIn;
    }
}

// Define actions to commit mutations
const actions = {
    login({commit}) {
        commit(login);
    },
    logout({commit}) {
        commit(logout);
    }
}

export default createStore({
    state,
    mutations,
    getters,
    actions,
});