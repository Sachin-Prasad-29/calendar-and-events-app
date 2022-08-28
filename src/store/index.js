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
        async loader() {
            getUserDetails();
            getAllUsers();
        },
        async getUserDetails({ commit }) {
            const userDetails = await getUserDetails();
            if (!userDetails.profilePic) {
                userDetails.profilePic = '@/assets/images/noPic.png';
            }
            commit('setUserDetails', userDetails);
        },
        async getAllUsers({ commit }) {
            let allUsers = await getAllUsers();

            for (let i = 0; i < allUsers.length; i++) {
                if (this.state.userDetails.email === allUsers[i].email) {
                    allUsers.splice(i, 1);
                    break;
                }
            }

            commit('setAllUsers', allUsers);
        },
    },

    modules: {},
});
