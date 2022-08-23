<template>
    <div>
        <v-app-bar flat outlined color="">
            <v-app-bar-nav-icon @click="menu" left>
                <v-icon> {{ menuIcon }}</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title class="mr-3" left>
                <v-img max-height="35" max-width="45" src="@/assets/images/icon3.svg"></v-img>
            </v-toolbar-title>
            <v-toolbar-title>
                <router-link to="/calendar" class="font-weight-bold text-h5 text-decoration-none">
                    <span class="ct--text">Calendar</span>
                </router-link>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- drop down menu -->
            <div></div>
            <v-menu
                :nudge-width="220"
                transition="slide-y-transition"
                offset-y
                right
                rounded="lg"
                text-center
                v-model="profileView"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab elevation="0 white" small class="pa-0" outlined v-bind="attrs" v-on="on">
                        <v-avatar size="39"><img :src="user.profile" alt="" /></v-avatar>
                    </v-btn>
                </template>
                <v-card max-width="300px">
                    <v-list>
                        <v-layout column text-center>
                            <v-flex class="mt-5">
                                <v-badge avatar color="transparent" overlap offset-x="30" offset-y="30" bottom>
                                    <template v-slot:badge>
                                        <v-btn fab x-small elevation="0" class="h-6 info" @click="changeProfile()">
                                            <ChangeProfile />
                                        </v-btn>
                                    </template>

                                    <v-avatar size="100">
                                        <v-img :src="user.profile"></v-img>
                                    </v-avatar>
                                </v-badge>
                                <div class="subheading mt-4">{{ user.name }}</div>
                                <div class="caption subheading mt-1">{{ user.email }}</div>
                                <div class="mt-3">
                                    <v-btn color="primary " text outlined rounded router to="/profile">
                                        <v-icon> mdi-pencil-circle-outline</v-icon>
                                        <span class="text-capitalize ml-2"> edit profile </span>
                                    </v-btn>
                                </div>

                                <div class="my-4">
                                    <v-btn color="error" text outlined rounded>
                                        <v-icon> mdi-location-exit </v-icon>
                                        <span class="text-capitalize ml-2"> sign out </span>
                                    </v-btn>
                                </div>
                            </v-flex>
                        </v-layout>
                    </v-list>
                </v-card>
            </v-menu>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app class="">
            <v-layout column text-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img :src="user.profile" alt="" />
                    </v-avatar>
                    <p class="subheading mt-4">{{ user.name }}</p>
                </v-flex>
            </v-layout>

            <v-layout column align-center>
                <v-menu transition="slide-x-transition" offset-x right rounded="lg" text-center v-model="menuTab">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn class="mb-3" large rounded v-bind="attrs" v-on="on">
                            <v-icon left class="primary--text text-h4 pl-5 pr-4">mdi-plus</v-icon>
                            <span right class="pr-2 text-capitalize"> Create </span>
                            <v-icon>mdi-menu-right</v-icon>
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item>
                            <v-list-item-title><EventForm icon="mdi-calendar-edit" name="Event" /></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title
                                ><TaskForm icon="mdi-checkbox-marked-circle-outline" name="Task"
                            /></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title><ReminderForm icon="mdi-reminder" name="Reminder" /></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-layout>
            <!-- <v-layout column align-center>
                <v-btn
                    rounded
                    small
                    outlined
                    slot="activator"
                    class="success--text text-capitalize mb-3"
                    v-bind="attrs"
                    v-on="on"
                >
                    <v-icon left small>mdi-pencil-circle</v-icon>
                    Edit profile
                </v-btn>
            </v-layout> -->
            <v-list>
                <v-list-item-group active-class="">
                    <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                        <!-- <v-list-item> -->
                        <v-list-item-action>
                            <v-icon>mdi-{{ link.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title class="">{{ link.text }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
                <!-- <v-list-item> -->
            </v-list>
            <div class="ml-4">
                <v-checkbox
                    v-model="filterEvent"
                    label="Event"
                    class="primary-text ma-0 p-0"
                    color="primary "
                ></v-checkbox>
                <v-checkbox v-model="filterTask" label="Task" class="success-text ma-0" color="success "></v-checkbox>
                <v-checkbox
                    v-model="filterReminder"
                    label="Reminder"
                    class="orange-text ma-0"
                    color="orange "
                ></v-checkbox>
                <v-checkbox
                    v-model="filterHoliday"
                    label="Holiday"
                    class="purple-text ma-0"
                    color="purple "
                ></v-checkbox>
            </div>
        </v-navigation-drawer>

        <v-speed-dial
            v-model="fab"
            :bottom="true"
            :right="true"
            direction="top"
            transition="slide-y-reverse-transition"
        >
            <template v-slot:activator>
                <v-btn v-model="fab" color="red darken-2" dark fab>
                    <v-icon v-if="fab"> mdi-close </v-icon>
                    <v-icon v-else> mdi-plus</v-icon>
                </v-btn>
            </template>

            <v-tooltip left color="orange">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab dark small color="orange" v-bind="attrs" v-on="on">
                        <ReminderForm icon="mdi-reminder" />
                    </v-btn>
                </template>
                <span>Add Reminder</span>
            </v-tooltip>
            <v-tooltip left color="success">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab dark small color="success" v-bind="attrs" v-on="on">
                        <TaskForm icon="mdi-checkbox-marked-circle-outline" />
                    </v-btn>
                </template>
                <span>Add Task</span>
            </v-tooltip>
            <v-tooltip left color="primary">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn fab dark small color="primary" v-bind="attrs" v-on="on">
                        <EventForm icon="mdi-calendar-edit" />
                    </v-btn>
                </template>
                <span>Add Event</span>
            </v-tooltip>

            <v-switch v-model="$vuetify.theme.dark" inset color="black" right class="ma-5"></v-switch>
        </v-speed-dial>
    </div>
</template>

<script>
import EventForm from '@/components/EventForm';
import TaskForm from '@/components/TaskForm';
import ReminderForm from '@/components/ReminderForm';
import ChangeProfile from '@/components/ChangeProfile';
export default {
    name: 'NavBar',
    components: { EventForm, TaskForm, ReminderForm, ChangeProfile },
    data() {
        return {
            drawer: false,

            menuTab: false,
            profileView: false,
            filterEvent: false,
            filterTask: false,
            filterReminder: false,
            filterHoliday: false,

            links: [
                { icon: 'calendar-month-outline', text: 'Calendar', route: '/calendar' },
                { icon: 'clipboard-check-outline', text: 'View', route: '/event' },
            ],
            user: {
                name: 'Sachin Prasad',
                email: 'skpkorba9009@gmail.com',
                profile: '/avator-1.jpg',
            },
            fab: false,
            fling: false,

            tabs: null,
        };
    },

    computed: {
        menuIcon() {
            if (!this.drawer) return 'mdi-menu';
            return 'mdi-close';
        },
    },
    created() {},
    methods: {
        menu() {
            this.drawer = !this.drawer;
        },
        changeProfile() {
            console.log('this');
        },
    },
};
</script>

<style scoped>
.profilebtn {
    border: 1px solid black;
    padding: 5px 7px;
    border-radius: 50%;
}

.v-speed-dial {
    position: absolute;
}

.v-btn--floating {
    position: relative;
}
</style>
