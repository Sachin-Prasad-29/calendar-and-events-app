<template>
    <div class="landing">
        <v-app-bar flat fixed outlined color="">
            

            <v-toolbar-title class="mr-3" left>
                <v-img max-height="35" max-width="45" src="@/assets/images/icon3.svg"></v-img>
            </v-toolbar-title>
            <v-toolbar-title>
                <router-link to="/calendar" class="font-weight-bold text-h5 text-decoration-none">
                    <span class="ct--text">Calendar</span>
                </router-link>
            </v-toolbar-title>
        </v-app-bar>
        <v-container>
            <h1>LandingPage</h1>
            
        </v-container>
    </div>
</template>

<script>
export default {
    name: 'LandingPage',
};
</script>

<style></style>
