<template>
    <div class="calendar">
        <NavBar @refreshCalendar="loadCalendar" />

        <v-row class="fill-height side-padding">
            <v-col>
                <v-sheet height="64">
                    <v-toolbar flat>
                        <v-btn outlined class="mr-4" @click="setToday"> Today </v-btn>
                        <v-btn fab text small @click="prev">
                            <v-icon small> mdi-chevron-left </v-icon>
                        </v-btn>
                        <v-btn fab text small @click="next">
                            <v-icon small> mdi-chevron-right </v-icon>
                        </v-btn>
                        <v-toolbar-title v-if="$refs.calendar">
                            {{ $refs.calendar.title }}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-menu bottom right>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn outlined v-bind="attrs" v-on="on">
                                    <span>{{ typeToLabel[type] }}</span>
                                    <v-icon right> mdi-menu-down </v-icon>
                                </v-btn>
                            </template>

                            <v-list>
                                <v-list-item @click="type = 'day'">
                                    <v-list-item-title>Day</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'week'">
                                    <v-list-item-title>Week</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = 'month'">
                                    <v-list-item-title>Month</v-list-item-title>
                                </v-list-item>
                                <v-list-item @click="type = '4day'">
                                    <v-list-item-title>4 days</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </v-toolbar>
                </v-sheet>

                <v-sheet height="600">
                    <v-calendar
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        :events="events"
                        :event-color="getEventColor"
                        :type="type"
                        @click:event="showEvent"
                        @click:more="viewDay"
                        @click:date="viewDay"
                        @change="updateRange"
                    ></v-calendar>

                    <v-menu
                        v-model="selectedOpen"
                        :close-on-content-click="false"
                        :activator="selectedElement"
                        offset-x
                    >
                        <v-card elevation="0" outlined color="" min-width="350px">
                            <v-toolbar dense flat :color="selectedEvent.color" dark>
                                <v-toolbar-title>{{ selectedEvent.name }}</v-toolbar-title>
                                <span class="text-h7 ml-2 mt-1"
                                    ><span class="caption">on</span> {{ selectedEvent.startDate | date }}</span
                                >
                                <v-spacer></v-spacer>
                            </v-toolbar>
                            <v-card-text>
                                <div>
                                    <span class="font-weight-bold">Created by : </span> {{ selectedEvent.createdBy }}
                                </div>

                                <span>{{ selectedEvent.details }}</span>
                                <v-spacer></v-spacer>
                            </v-card-text>
                            <v-card-actions>
                                <v-btn
                                    small
                                    outlined
                                    elevation="0"
                                    color="error"
                                    @click="selectedOpen = false"
                                    class="text-capitalize"
                                >
                                    Cancel
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-menu>
                </v-sheet>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'CalendarPage',
    components: { NavBar },
    data() {
        return {
            today: new Date().toISOString().substr(0, 10),
            focus: new Date().toISOString().substr(0, 10),
            type: 'month',
            typeToLabel: {
                month: 'Month',
                week: 'Week',
                day: 'Day',
                '4day': '4 Days',
            },
            name: null,
            details: null,
            start: null,
            end: null,
            color: 'primary',
            currentlyEditing: null,
            selectedEvent: {},
            selectedElement: null,
            selectedOpen: false,
            events: [],

            dialog: false,
            names: ['sachin', 'sameer', 'NItish'],
            colors: ['primary', 'success'],
        };
    },
    mounted() {
        this.loadCalendar();
    },
    computed: {
        ...mapGetters(['userDetails', 'allEvents']),
    },

    methods: {
        ...mapActions(['getUserDetails', 'getAllUsers', 'getAllEvents']),

        async loadCalendar() {
            this.spinner = this.$loading.show(this.$spinner);
            if (!this.userDetails) await this.getUserDetails();
            await this.getAllEvents();
            this.events = this.updateRange(this.allEvents);
            this.getAllUsers();
            this.spinner.hide();
        },

        viewDay({ date }) {
            this.focus = date;
            this.type = 'day';
        },

        getEventColor(event) {
            return event.color;
        },

        setToday() {
            this.focus = this.today;
        },

        prev() {
            this.$refs.calendar.prev();
        },

        next() {
            this.$refs.calendar.next();
        },

        showEvent({ nativeEvent, event }) {
            const open = () => {
                this.selectedEvent = event;
                this.selectedElement = nativeEvent.target;
                requestAnimationFrame(() => requestAnimationFrame(() => (this.selectedOpen = true)));
            };

            if (this.selectedOpen) {
                this.selectedOpen = false;
                requestAnimationFrame(() => requestAnimationFrame(() => open()));
            } else {
                open();
            }

            nativeEvent.stopPropagation();
        },
        updateRange(events) {
            for (let i = 0; i < events.length; i++) {
                const startDate = events[i].start;
                let endDate;
                let endTimeMin;
                let endTimehours;
                if (events.endDate) {
                    endDate = events[i].end;
                    endTimehours = events[i].endTime.hours;
                    endTimeMin = events[i].endTime.minutes;
                } else {
                    endDate = events[i].end;
                    endTimehours = events[i].startTime.hours + 1;
                    endTimeMin = events[i].startTime.minutes;
                }

                const startTimehours = events[i].startTime.hours;
                const startTimeMin = events[i].startTime.minutes;
                events[i].start = `${startDate} ${startTimehours}:${startTimeMin}`;
                events[i].end = `${endDate} ${endTimehours}:${endTimeMin}`;
            }

            return events;
        },

        nth(d) {
            return d > 3 && d < 21 ? 'th' : ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'][d % 10];
        },
    },
};
</script>

<style scoped>
.side-padding {
    margin-left: 4%;
    margin-right: 4%;
}
@media all and (max-width: 700px) {
    .side-padding {
        margin-left: 1%;
        margin-right: 1%;
    }
}
</style>
