import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountPage from '@/views/AccountPage';
import CalendarPage from '@/views/CalendarPage';
import ProfilePage from '@/views/ProfilePage';
import EventPage from '@/views/EventPage';

Vue.use(VueRouter);

const routes = [
    {
        path: '/account',
        name: 'account',
        component: AccountPage,
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarPage,
    },
    {
        path: '/event',
        name: 'event',
        component: EventPage,
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;
