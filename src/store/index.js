import Vue from 'vue';
import Vuex from 'vuex';
import { getUserDetails, getAllUsers } from '@/services/actionServices/account.services';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userDetails: null,
        allUsers: [],
    },

    getters: {
        userDetails: (state) => state.userDetails,
        allUsers: (state) => state.allUsers,
    },

    mutations: {
        setUserDetails(state, userDetails) {
            state.userDetails = userDetails;
        },
        setAllUsers(state, allUsers) {
            state.allUsers = allUsers;
        },
    },

    actions: {
        async getUserDetails({ commit }) {
            const userDetails = await getUserDetails();
            commit('setUserDetails', userDetails);
        },
        async getAllUsers({ commit }) {
            const allUsers = await getAllUsers();
            commit('setAllUsers', allUsers);
        },
    },

    modules: {},
});
