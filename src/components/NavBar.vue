<template>
    <div class="nav">
        <v-app-bar dense flat outlined color="">
            <v-app-bar-nav-icon @click="menu" left class="menu-Icon">
                <v-icon> {{ menuIcon }}</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title class="mr-1 time-title" left>
                <router-link to="/calendar">
                    <v-img max-height="35" max-width="45" src="@/assets/images/icon3.svg"></v-img>
                </router-link>
            </v-toolbar-title>
            <v-toolbar-title class="font-weight-medium text-h5">
                <span class="ct--text">{{ this.currPage }}</span>
            </v-toolbar-title>

            <!-- drop down menu -->
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <h4 class="mr-4 mt-1 ct--text time-title font-weight-medium">{{ date | date }}</h4>
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
                        <v-avatar size="39"><v-img :src="userInfo.profilePic" alt="" /></v-avatar>
                    </v-btn>
                </template>
                <v-card max-width="300px">
                    <v-list>
                        <v-layout column text-center>
                            <v-flex class="mt-5">
                                <v-badge avatar color="transparent" overlap offset-x="30" offset-y="30" bottom>
                                    <template v-slot:badge>
                                        <v-btn fab x-small elevation="0" class="h-6 info">
                                            <ChangeProfile />
                                        </v-btn>
                                    </template>

                                    <v-avatar size="100">
                                        <v-img :src="userInfo.profilePic"></v-img>
                                    </v-avatar>
                                </v-badge>
                                <div class="text-h7 mt-4">{{ userInfo.name }}</div>
                                <div class="caption mt-1">{{ userInfo.email }}</div>
                                <div class="mt-3">
                                    <v-btn color="primary " elevation="1" rounded router to="/profile">
                                        <v-icon> mdi-account-outline</v-icon>
                                        <span class="text-capitalize ml-2"> view profile </span>
                                    </v-btn>
                                </div>

                                <div class="my-4">
                                    <v-btn color="error" elevation="1" rounded @click="signOut">
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
                        <v-img :src="userInfo.profilePic" alt="" />
                    </v-avatar>
                    <p class="subheading mt-4">{{ userInfo.name }}</p>
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
                            <v-list-item-title
                                ><EventForm icon="mdi-calendar-edit" name="Event" @refreshCalendar="refreshCalendar"
                            /></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title
                                ><TaskForm
                                    icon="mdi-checkbox-marked-circle-outline"
                                    name="Task"
                                    @refreshCalendar="refreshCalendar"
                            /></v-list-item-title>
                        </v-list-item>
                        <v-list-item>
                            <v-list-item-title
                                ><ReminderForm icon="mdi-reminder" name="Reminder" @refreshCalendar="refreshCalendar"
                            /></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </v-layout>

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
        </v-navigation-drawer>
        <v-tooltip left color="grey">
            <template v-slot:activator="{ on, attrs }">
                <transition name="bounce">
                    <v-btn
                        color="grey darken-4"
                        dark
                        fab
                        small
                        elevation="0"
                        class="theme-btn"
                        v-show="speeddial"
                        @click="$vuetify.theme.dark = !$vuetify.theme.dark"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <v-icon color="white">mdi-invert-colors</v-icon>
                    </v-btn>
                </transition>
            </template>
            <span>{{ $vuetify.theme.dark ? 'Light' : 'Dark' }} theme</span>
        </v-tooltip>

        <v-tooltip left color="orange">
            <template v-slot:activator="{ on, attrs }">
                <transition name="bounce">
                    <v-btn
                        color="orange"
                        dark
                        fab
                        elevation="0"
                        small
                        class="event-btn"
                        v-show="speeddial"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <ReminderForm icon="mdi-reminder" @refreshCalendar="refreshCalendar" />
                    </v-btn>
                </transition>
            </template>
            <span>Add Reminder</span>
        </v-tooltip>

        <v-tooltip left color="success">
            <template v-slot:activator="{ on, attrs }">
                <transition name="bounce">
                    <v-btn
                        color="success"
                        dark
                        fab
                        elevation="0"
                        small
                        class="task-btn"
                        v-show="speeddial"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <TaskForm icon="mdi-checkbox-marked-circle-outline" @refreshCalendar="refreshCalendar" />
                    </v-btn>
                </transition>
            </template>
            <span>Add Task</span>
        </v-tooltip>
        <v-tooltip left color="primary">
            <template v-slot:activator="{ on, attrs }">
                <transition name="bounce">
                    <v-btn
                        color="primary"
                        dark
                        fab
                        elevation="0"
                        small
                        class="reminder-btn"
                        v-show="speeddial"
                        v-bind="attrs"
                        v-on="on"
                    >
                        <EventForm icon="mdi-calendar-edit" @refreshCalendar="refreshCalendar" />
                    </v-btn>
                </transition>
            </template>
            <span>Add Event</span>
        </v-tooltip>
        <v-btn color="red" dark fab large elevation="0" class="v-btn--example" @click="speeddial = !speeddial">
            <v-icon>mdi-{{ !speeddial ? 'plus' : 'close' }} </v-icon>
        </v-btn>
    </div>
</template>

<script>
import EventForm from '@/components/EventForm';
import TaskForm from '@/components/TaskForm';
import ReminderForm from '@/components/ReminderForm';
import ChangeProfile from '@/components/ChangeProfile';
import { mapGetters, mapActions } from 'vuex';
export default {
    name: 'NavBar',
    components: { EventForm, TaskForm, ReminderForm, ChangeProfile },
    props: ['currPage'],
    data() {
        return {
            drawer: false,
            menuTab: false,
            profileView: false,
            filterEvent: false,
            filterTask: false,
            filterReminder: false,
            filterHoliday: false,
            speeddial: false,
            date: new Date(),

            links: [
                { icon: 'calendar-month-outline', text: 'Calendar', route: '/calendar' },
                { icon: 'clipboard-list-outline', text: 'Events', route: '/event' },
                { icon: 'clipboard-check-outline', text: 'Todo List', route: '/todo' },
            ],
        };
    },

    computed: {
        ...mapGetters(['userDetails']),
        userInfo() {
            if (this.userDetails) return this.userDetails;
            return '';
        },
        menuIcon() {
            if (!this.drawer) return 'mdi-menu';
            return 'mdi-close';
        },
    },
    async mounted() {
        if (!this.userDetails) await this.getUserDetails();
    },
    methods: {
        ...mapActions(['getUserDetails', 'getAllUsers']),
        //method to open and close the menu
        menu() {
            this.drawer = !this.drawer;
        },

        //method to sign out from the app
        signOut() {
            this.spinner = this.$loading.show(this.$spinner);
            setTimeout(() => {
                localStorage.clear();
                this.$router.replace('/auth');
                this.spinner.hide();
            }, 1000);
        },
        // this method will emit one method which will refresh the calendar page
        refreshCalendar() {
            this.$emit('refreshCalendar');
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
    position: fixed;
}

.v-btn--floating {
    position: relative;
}

.v-btn--example {
    bottom: 0;
    right: 10px;
    position: fixed;
    z-index: 1000;

    margin: 0 0 16px 16px;
}
.event-btn {
    bottom: 70px;
    right: 22px;
    position: fixed;
    z-index: 1000;

    margin: 0 0 16px 16px;
}
.task-btn {
    bottom: 120px;
    right: 22px;
    position: fixed;
    z-index: 1000;

    margin: 0 0 16px 16px;
}
.reminder-btn {
    bottom: 170px;
    right: 22px;
    position: fixed;
    z-index: 1000;
    margin: 0 0 16px 16px;
}

.theme-btn {
    bottom: 220px;
    right: 22px;
    position: fixed;
    z-index: 1000;

    margin: 0 0 16px 16px;
}

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
@media all and (max-width: 600px) {
    .time-title {
        visibility: hidden;
        width: 0;
    }
}
</style>