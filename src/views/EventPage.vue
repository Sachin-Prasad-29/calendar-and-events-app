<template>
    <div class="event">
        <NavBar />
        <v-container class="text-center">
            <div class="text-h1">All Events</div>
            <div v-for="( event , index )  in this.allEvents" :key=index>
                
                <div>{{ event.attendee }}</div>
                <div>{{ event.category }}</div>
                <div>{{ event.completed }}</div>
                <div>{{ event.createdBy }}</div>
                <div>{{ event.createdOn }}</div>
                <div>{{ event.description }}</div>
                <div>{{ event.endDate }}</div>
                <div>{{ event.location }}</div>
                <div>{{ event.notification }}</div>
                <div>{{ event.notifyBefore }}</div>
                <div>{{ event.startDate }}</div>
                <div>{{ event.startTime }}</div>
            </div>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getEvents } from '@/services/events';
export default {
    name: 'EventPage',
    components: { NavBar },
    data() {
        return {
            page: 1,
            title: '',
            category: 'event',
            startDate: '',
            endDate: '',
            createdOn: '',
            completed: '',
            keyword: '',
            createdBy: '',
            allEvents: [],
        };
    },
    created() {
        this.loadEvent();
    },
    methods: {
        async loadEvent() {
            const params = `page=${this.page}&title=${this.title}&category=${this.category}&startDate=${this.startDate}&endDate=${this.endDate}&createdOn=${this.createdOn}&completed=${this.completed}&keyword=${this.keyword}&createdBy=${this.createdBy}`;
            const response = await getEvents(params);
            
            this.allEvents = response.events;
            console.log(this.allEvents);
        },
    },
};
</script>

<style></style>
