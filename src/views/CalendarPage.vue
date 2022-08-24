<template>
    <div class="calendar">
        <NavBar />
        <v-container class="text-center">
            <div class="text-h1">Calendar</div>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getAllEvents } from '@/services/calendar';

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
        async loadCalender() {
            const response = await getAllEvents();
            console.log(response);
            this.allEvents = response.events;
        },
    },
};
</script>
