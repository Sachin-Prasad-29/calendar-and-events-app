<template>
    <div class="landing">
        <v-app-bar flat outlined color="" dense>
            <v-toolbar-title class="mr-3" left>
                <v-img max-height="35" max-width="45" src="@/assets/images/icon3.svg"></v-img>
            </v-toolbar-title>
            <v-toolbar-title>
                <span class="ct--text font-weight-medium">Calendar</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/auth">
                <v-btn rounded small color="success px-6">
                    <v-icon small>mdi-login</v-icon>
                    <span class="text-capitalize ml-1">Login</span>
                </v-btn>
            </router-link>
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
