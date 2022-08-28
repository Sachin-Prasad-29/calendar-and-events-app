<template>
    <div class="event">
        <NavBar />
        <v-container class="text-center">
            <v-row class="justify-center">
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-menu
                        :nudge-width="880"
                        transition="slide-y-transition"
                        offset-y
                        right
                        rounded="lg"
                        text-center
                        :close-on-content-click="false"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn fab small elevation="1" class="pa-0" v-bind="attrs" v-on="on">
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-card max-width="930px" class="pa-3">
                            <v-form ref="form" class="px-6">
                                <v-row class="mt-5">
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            flat
                                            dense
                                            v-model="title"
                                            label="Title"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6" xs="6">
                                        <v-menu
                                            v-model="menu2"
                                            :close-on-content-click="true"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    clear-icon="mdi-close-circle"
                                                    clearable
                                                    v-model="createdOn"
                                                    label="Created on"
                                                    append-icon="mdi-calendar-blank-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="createdOn" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6" xs="6">
                                        <v-menu
                                            v-model="menu1"
                                            :close-on-content-click="true"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            min-width="auto"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                                <v-text-field
                                                    clear-icon="mdi-close-circle"
                                                    clearable
                                                    v-model="startDate"
                                                    label="Start date"
                                                    append-icon="mdi-calendar-blank-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                solo
                                                dense
                                                v-model="startDate"
                                                @input="menu1 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            dense
                                            label="Created By"
                                            v-model="createdBy"
                                            class="mt-7"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6" xs="16">
                                        <v-select
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            flat
                                            dense
                                            :items="categories"
                                            label="Category"
                                            v-model="category"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="6" md="6" sm="6" xs="6">
                                        <v-checkbox
                                            v-model="completed"
                                            label="Completed / Uncompleted"
                                            dense
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12" xs="12">
                                        <v-btn
                                            rounded
                                            @click="loadEvent"
                                            elevation="0"
                                            color=" primary"
                                            class="text-capitalize"
                                        >
                                            <v-icon left>mdi-magnify</v-icon>
                                            Search</v-btn
                                        >
                                        <v-btn
                                            @click="reset"
                                            rounded
                                            elevation="0"
                                            color=" orange"
                                            class="white--text text-capitalize ml-2"
                                        >
                                            <v-icon left>mdi-refresh-circle</v-icon> Reset</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-menu>
                </v-col>
                <v-col cols="8" md="8" sm="8" xs="6">
                    <v-text-field
                        v-model="keyword"
                        filled
                        dense
                        solo
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Message"
                    ></v-text-field>
                </v-col>
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-btn fab small elevation="0" @click="loadEvent()" class="primary">
                        <v-icon small>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-btn elevation="3" fab x-small class="v-btn--desc" @click="incPage">
            <v-icon>mdi-chevron-up </v-icon>
        </v-btn>
        <v-btn color="primary" elevation="3" dark fab x-small class="v-btn--example">
            <span large>{{ pageNo }}</span>
        </v-btn>
        <v-btn elevation="3" fab x-small class="v-btn--insc" @click="descPage">
            <v-icon>mdi-chevron-down </v-icon>
        </v-btn>
        <v-container class="">
            <v-card
                elevation="1"
                outlined
                class="pt-1 px-4 justify-space-between d-flex"
                v-for="event in allEvents"
                :key="event._id"
            >
                <!-- <v-row class="align-center justify-space-around"> -->
                <v-card elevation="0" class="">
                    <v-btn fab text elevation="0" small color="primary"
                        ><span class="text-h5">{{ event.startDate.substring(8, 10) }}</span></v-btn
                    >
                    <span class="caption ml-1">{{ month[parseInt(event.startDate.substring(5, 7)) - 1] }}, </span>
                    <span class="caption mr-5 ml-1">{{ event.startDate.substring(0, 4) }} </span>
                    <v-avatar size="25" :class="event.color" class="mb-1"> </v-avatar>
                    <span class="ml-5 mr-3"
                        >{{ event.startTime.hours > 9 ? '' : 0 }}{{ event.startTime.hours }} :
                        {{ event.startTime.minutes > 9 ? '' : 0 }}{{ event.startTime.minutes }}
                    </span>
                    <span class="ml-5">{{ event.name }}</span>
                </v-card>

                <v-card elevation="0" class="">
                    <v-btn x-small fab elevation="0" color=" success" class="ma-1">
                        <v-icon small>mdi-eye-outline</v-icon>
                    </v-btn>
                    <v-btn x-small fab elevation="0" color=" primary" class="ma-1">
                        <v-icon small>mdi-pencil-outline</v-icon>
                    </v-btn>
                    <v-btn x-small fab elevation="0" color="error" class="ma-1">
                        <v-icon small>mdi-delete-outline</v-icon>
                    </v-btn>
                </v-card>
                <!-- </v-row> -->
            </v-card>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import { getEvents } from '@/services/event.services';

export default {
    name: 'EventPage',
    components: { NavBar },
    data() {
        return {
            page: 1,
            month: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

            categories: ['Event', 'Task', 'Reminder'],
            menu1: false,
            menu2: false,
            context: false,
            length: '',

            title: '',
            category: '',
            startDate: '',
            endDate: '',
            createdOn: '',
            completed: '',
            keyword: '',
            createdBy: '',
            allEvents: [],
        };
    },
    computed: {
        pageNo() {
            this.loadEvent();
            return this.page;
        },
    },
    created() {
        this.loadEvent();
    },

    methods: {
        getColor(event) {
            if (event === 'event') return 'error';
            if (event === 'reminder') return 'orange';
            return 'primary';
        },
        async loadEvent() {
            if (this.title == null) this.title = '';
            if (this.startDate == null) this.startDate = '';
            if (this.createdOn == null) this.createdOn = '';
            if (this.category == null) this.category = '';
            if (this.completed == null) this.completed = '';
            if (this.keyword == null) this.keyword = '';
            if (this.createdBy == null) this.createdBy = '';

            this.category = this.category.toLowerCase();

            const params = `page=${this.page}&title=${this.title}&category=${this.category}&startDate=${this.startDate}&endDate=${this.endDate}&createdOn=${this.createdOn}&completed=${this.completed}&keyword=${this.keyword}&createdBy=${this.createdBy}`;
            console.log(params);
            const response = await getEvents(params);

            this.allEvents = response.events;
            console.log(this.allEvents);
        },
        incPage() {
            const length = this.allEvents.length;
            if (length === 10) this.page += 1;
        },
        descPage() {
            if (this.page > 1) this.page -= 1;
        },
        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style scoped>
.event-div {
    border: 1px solid;
}
.v-btn--example {
    bottom: 360px;
    right: 10px;
    position: fixed;
    z-index: 1000;

    margin: 10px 0;
}
.v-btn--desc {
    bottom: 405px;
    right: 10px;
    position: fixed;
    z-index: 1000;

    margin: 10px 0;
}
.v-btn--insc {
    bottom: 314px;
    right: 10px;
    position: fixed;
    z-index: 1000;

    margin: 10px 0;
}
</style>
