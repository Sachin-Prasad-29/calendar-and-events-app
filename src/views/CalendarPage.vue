<template>
    <div class="calendar">
        <NavBar />
        <v-container class="text-center">
            <div class="text-h4">Calendar</div>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getAllEvents } from '@/services/getEvents';
import { mapActions } from 'vuex';

export default {
    name: 'CalendarPage',
    components: { NavBar },
    data() {
        return {
            allEvents: [], // this will store all the events
        };
    },
    created() {
        this.loadCalender();
    },
    methods: {
        ...mapActions(['getAllUsers']),
        async loadCalender() {
            const response = await getAllEvents();
            console.log(response);
            this.allEvents = response.events;
            this.getAllUsers();
        },
    },
};
</script>
