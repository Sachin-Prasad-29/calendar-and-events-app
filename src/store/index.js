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
    },

    getters: {
        userDetails: (state) => state.userDetails,
        allUsers: (state) => state.allUsers,
        allEvents: (state) => state.allEvents,
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
    },

    actions: {
        //action method to get user details
        async getUserDetails({ commit }) {
            const userDetails = await getUserDetails();
            if (!userDetails.profilePic) {
                userDetails.profilePic = '@/assets/images/noPic.png';
            }
            commit('setUserDetails', userDetails);
        },

        // action method to get all the users
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
        
        //action mehod to get all the event of logged in user
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
});
