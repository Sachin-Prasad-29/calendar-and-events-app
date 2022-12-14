import Vue from 'vue';
import Vuex from 'vuex';
import { getUserDetails, getAllUsers } from '@/services/action.services';
import { getAllEvents } from '@/services/event.services';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userDetails: null,
        allUsers: [],
        allEvents: [],
        isLoading: false,
    },

    getters: {
        userDetails: (state) => state.userDetails,
        allUsers: (state) => state.allUsers,
        allEvents: (state) => state.allEvents,
        isLoading: (state) => state.isLoading,
    },

    mutations: {
        setUserDetails(state, userDetails) {
            state.userDetails = userDetails;
        },
        setAllUsers(state, allUsers) {
            state.allUsers = allUsers;
        },
        setAllEvents(state, allEvents) {
            state.allEvents = allEvents;
        },
        setIsLoading(state, isLoading) {
            state.isLoading = isLoading;
        },
    },

    actions: {
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
        async getAllEvents({ commit }) {
            const response = await getAllEvents();
            if (response.success) {
                let events = [];
                response.events.forEach((event) => {
                    event.start = '';
                    event.end = '';
                    event.start = event.startDate.substr(0, 10);
                    event.end = event.endDate ? event.endDate.substr(0, 10) : event.start;

                    events.push(event);
                });
                commit('setAllEvents', events);
            } else {
                console.log(response);
            }
        },
    },

    modules: {},
});
