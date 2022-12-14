<template>
    <div class="event">
        <NavBar @refreshCalendar="loadEvent(1)" currPage="Events"/>
        <v-container class="text-center">
            <v-row class="justify-center">
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-menu
                        v-model="menu"
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
                                    <v-col cols="12" md="4" sm="4" xs="12">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            flat
                                            dense
                                            v-model="keyword"
                                            label="Keyword"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="4" sm="4" xs="6">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            type="date"
                                            flat
                                            dense
                                            label="Created on"
                                            v-model="createdOn"
                                        ></v-text-field> </v-col
                                    ><v-col cols="6" md="4" sm="4" xs="6">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            type="date"
                                            flat
                                            dense
                                            label="Starts on"
                                            v-model="startDate"
                                        ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="4" sm="4" xs="6">
                                        <v-text-field
                                            clear-icon="mdi-close-circle"
                                            clearable
                                            dense
                                            label="Created By"
                                            v-model="createdBy"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="6" md="4" sm="4" xs="6">
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
                                    <v-col cols="6" md="4" sm="4" xs="6">
                                        <v-checkbox
                                            v-model="completed"
                                            label="Completed / Uncompleted"
                                            dense
                                        ></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12" xs="12">
                                        <v-btn
                                            rounded
                                            @click="loadEvent(1)"
                                            elevation="0"
                                            color=" primary"
                                            class="text-capitalize"
                                        >
                                            <v-icon left>mdi-magnify</v-icon>
                                            Search</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-menu>
                </v-col>
                <v-col cols="8" md="8" sm="8" xs="6">
                    <v-text-field
                        v-model="title"
                        filled
                        dense
                        solo
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Search event by Name..."
                    ></v-text-field>
                </v-col>
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-btn fab small elevation="0" @click="loadEvent(1)" class="primary">
                        <v-icon small>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
        <v-btn elevation="3" fab x-small class="v-btn--desc" @click="incPage">
            <v-icon>mdi-chevron-up </v-icon>
        </v-btn>
        <v-btn color="primary" elevation="3" dark fab x-small class="v-btn--example">
            <span large>{{ page }}</span>
        </v-btn>
        <v-btn elevation="3" fab x-small class="v-btn--insc" @click="descPage">
            <v-icon>mdi-chevron-down </v-icon>
        </v-btn>

        <v-container class="card">
            <v-row class="align-center mt-5 pa-5" v-show="noEvent">
                <v-col cols="12" class="text-center mt-1">
                    <v-avatar class="avatar" size="310" tile>
                        <v-img class="not-found" src="@/assets/images/Search.svg"></v-img>
                    </v-avatar>

                    <br />
                    <br />
                    <div class="text-h5 mb-2 blue-grey--text text-lighten-4">No Result Found !</div>
                </v-col>
            </v-row>

            <v-card
                elevation="1"
                tile
                outlined
                class="px-4 justify-space-between d-flex"
                v-for="event in events"
                :class="event.category"
                :key="event._id"
            >
                <v-row class="justify-space-between">
                    <v-col cols="12" md="4" sm="4" xs="12">
                        <v-card elevation="0" class="mt-1">
                            <v-btn fab text elevation="0" small color="primary"
                                ><span class="text-h5">{{ event.startDate.substring(8, 10) }}</span></v-btn
                            >
                            <span class="caption ml-1"
                                >{{ month[parseInt(event.startDate.substring(5, 7)) - 1] }},
                            </span>
                            <span class="caption mr-5 ml-1">{{ event.startDate.substring(0, 4) }} </span>
                            <v-avatar size="25" :class="event.color" class=""> </v-avatar>
                            <span class="ml-5 mr-3"
                                >{{
                                    event.startTime.hours % 12 !== 0
                                        ? event.startTime.hours % 12 === 10
                                            ? ''
                                            : 0
                                        : ''
                                }}{{ event.startTime.hours % 12 === 0 ? 12 : event.startTime.hours % 12 }} :
                                {{ event.startTime.minutes > 9 ? '' : 0 }}{{ event.startTime.minutes }}
                                {{ event.startTime.hours > 11 ? 'PM' : 'AM' }}
                            </span>
                        </v-card>
                    </v-col>
                    <v-col cols="12" md="4" sm="4" xs="12" class="mt-2">
                        <span class="">{{ event.name }}</span>
                    </v-col>
                    <!-- view button -->
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="3" sm="4" xs="12">
                        <v-card elevation="0" class="">
                            <v-tooltip top color="success">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        x-small
                                        fab
                                        elevation="0"
                                        color=" success"
                                        class="ma-2"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <ViewEvent :event="event" />
                                    </v-btn>
                                </template>
                                <span>View {{ event.category }}</span>
                            </v-tooltip>

                            <!-- edit button -->

                            <v-tooltip top color="primary">
                                <template v-slot:activator="{ on, attrs }"
                                    ><v-btn
                                        x-small
                                        fab
                                        elevation="0"
                                        color=" primary"
                                        class="ma-2"
                                        :disabled="event.createdBy !== userEmail"
                                        v-bind="attrs"
                                        v-on="on"
                                        ><EditEvent :event="event" @refreshEvent="loadEvent()" />
                                    </v-btn>
                                </template>
                                <span>Edit {{ event.category }}</span>
                            </v-tooltip>

                            <!-- excuse button -->
                            <v-tooltip top color="error">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        x-small
                                        fab
                                        elevation="0"
                                        color="error"
                                        class="ma-2"
                                        :disabled="event.createdBy === userEmail"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <ExcuseEvent :event="event" @refreshEvent="loadEvent()" />
                                    </v-btn>
                                </template>
                                <span>Excuse {{ event.category }}</span>
                            </v-tooltip>

                            <!-- delete button -->
                            <v-tooltip top color="error">
                                <template v-slot:activator="{ on, attrs }"
                                    ><v-btn
                                        x-small
                                        fab
                                        elevation="0"
                                        color="error"
                                        class="am-2"
                                        :disabled="event.createdBy !== userEmail"
                                        v-bind="attrs"
                                        v-on="on"
                                    >
                                        <DeleteEvent :event="event" @refreshEvent="loadEvent()" />
                                    </v-btn>
                                </template>
                                <span>Delete {{ event.category }}</span>
                            </v-tooltip>
                        </v-card>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar';
import EditEvent from '@/components/EditEvent';
import ViewEvent from '@/components/ViewEvent';
import DeleteEvent from '@/components/DeleteEvent';
import ExcuseEvent from '@/components/ExcuseEvent';
import { getEvents } from '@/services/event.services';
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'EventPage',
    components: { NavBar, EditEvent, ViewEvent, DeleteEvent, ExcuseEvent },
    data() {
        return {
            page: 1,
            month: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],

            categories: ['Event', 'Task', 'Reminder'],
            menu: false,
            context: false,
            length: '',

            title: '',
            category: '',
            createdOn: '',
            startDate: '',
            completed: '',
            keyword: '',
            createdBy: '',
            allEvents: [],
            noEvent: false,
        };
    },
    computed: {
        ...mapGetters(['userDetails']),
        userEmail() {
            if (this.userDetails) return this.userDetails.email;
            return '';
        },
        events() {
            return this.allEvents;
        },
    },
    created() {
        this.loadEvent();
    },

    methods: {
        ...mapActions(['getAllUsers']),
        ...mapMutations(['setIsLoading']),
        getColor(event) {
            if (event === 'event') return 'error';
            if (event === 'reminder') return 'orange';
            return 'primary';
        },
        async loadEvent(p) {
            this.setIsLoading(true)
            if (p) this.page = p;
            this.menu = false;
            if (!this.createdOn) this.createdOn = '';
            if (!this.startDate) this.startDate = '';
            if (!this.title) this.title = '';
            if (!this.keyword) this.keyword = '';
            if (!this.createdBy) this.createdBy = '';
            if (!this.category) this.category = '';
            if (this.category) this.category = this.category.toLowerCase();

            const params = `page=${this.page}&name=${this.title}&category=${this.category}&createdOn=${this.createdOn}&startDate=${this.startDate}&completed=${this.completed}&keyword=${this.keyword}&createdBy=${this.createdBy}`;
            //console.log(params);
            const response = await getEvents(params);
            if (response.success) {
                if (response.events.length === 0) {
                    this.noEvent = true;
                } else this.noEvent = false;
            } else {
                console.log(response);
            }
            await this.getAllUsers();
            this.setIsLoading(false)
            this.allEvents = response.events;
        },
        incPage() {
            const length = this.allEvents.length;
            if (length === 10) {
                this.page += 1;
                this.loadEvent();
            }
        },
        descPage() {
            if (this.page > 1) {
                this.page -= 1;
                this.loadEvent();
            }
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
.not-found {
    opacity: 0.5;
}
.v-btn--insc {
    bottom: 314px;
    right: 10px;
    position: fixed;
    z-index: 1000;

    margin: 10px 0;
}
.event-card {
    border: 1px solid black;
}
.card .event {
    border-left: 4px solid #4285f4;
}
.card .task {
    border-left: 4px solid #0f9d58;
}
.card .reminder {
    border-left: 4px solid orange;
}
</style>
