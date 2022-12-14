<template>
    <v-app id="app">
        <v-content>
            <LoadingSpinner v-if="isLoad" />
            <router-view ></router-view>
        </v-content>
    </v-app>
</template>

<script>
import LoadingSpinner from '@/components/utils/LoadingSpinner.vue';
import { mapGetters } from 'vuex';
export default {
    name: 'App',
    components: { LoadingSpinner },
    data: () => ({}),
    computed: {
        ...mapGetters(['isLoading']),
        isLoad() {
            return this.isLoading;
        },
    },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@500&display=swap');
* {
    font-family: 'Poppins', sans-serif;
}
</style>
