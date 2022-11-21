import Vue from 'vue';
import VueRouter from 'vue-router';
import AccountPage from '@/views/AccountPage';
import CalendarPage from '@/views/CalendarPage';
import ProfilePage from '@/views/ProfilePage';
import EventPage from '@/views/EventPage';
import LandingPage from '@/views/LandingPage';
import TodoPage from '@/views/TodoPage';
import PageNotFound from '@/views/PageNotFound';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'landing',
        component: LandingPage,
        meta: {
            auth: false,
        },
    },
    {
        path: '/auth',
        name: 'auth',
        component: AccountPage,
        meta: {
            auth: false,
        },
    },
    {
        path: '/calendar',
        name: 'calendar',
        component: CalendarPage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/event',
        name: 'event',
        component: EventPage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfilePage,
        meta: {
            auth: true,
        },
    },
    {
        path: '/todo',
        name: 'todo',
        component: TodoPage,
        meta: {
            auth: true,
        },
    },
    {
        name: 'page-not-found',
        path: '*',
        component: PageNotFound,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.auth && !localStorage.getItem('token')) {
        next('*');
    } else if (!to.meta.auth && localStorage.getItem('token')) {
        next('/calendar');
    } else {
        next();
    }
});

export default router;
