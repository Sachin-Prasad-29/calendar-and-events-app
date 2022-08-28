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
            this.getUserDetails();
            this.getAllUsers();
        },
        async getUserDetails({ commit }) {
            const userDetails = await getUserDetails();
            if(!userDetails.profilePic){
                userDetails.profilePic = '@/assets/images/noPic.png'
            }
            commit('setUserDetails', userDetails);
        },
        async getAllUsers({ commit }) {
            let allUsers = await getAllUsers();
            console.log(this.state.userDetails.email);
            const index = allUsers.indexOf(this.state.userDetails.email); // removing myself from allUser list
            allUsers.splice(index, 1);
            commit('setAllUsers', allUsers);
        },
    },

    modules: {},
});
