<template>
    <div>
        <v-app-bar dense flat outlined color="" >
            <v-app-bar-nav-icon @click="menu" left>
                <v-icon> {{ menuIcon }}</v-icon>
            </v-app-bar-nav-icon>

            <v-toolbar-title class="mr-3" left>  
                <v-img
                   
                    max-height="35"
                    max-width="35"
                    src="@/assets/images/icon3.svg"
                ></v-img>
            </v-toolbar-title>
            <v-toolbar-title>
                
                
                <span class="font-weight-bold textColor--text">Calendar</span>
            </v-toolbar-title>

            <v-spacer></v-spacer>
            <!-- drop down menu -->

            <v-btn text>
                <span>Sign Out</span>
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app class="">
            <v-layout column text-center>
                <v-flex class="mt-5">
                    <v-avatar size="100">
                        <img src="@/assets/images/avator-1.jpg" alt="" />
                    </v-avatar>
                    <p class="subheading mt-4">Sachin</p>
                </v-flex>
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
            </v-list>

            <v-switch v-model="$vuetify.theme.dark" inset color="black" right class="ma-5"></v-switch
        ></v-navigation-drawer>
    </div>
</template>

<script>
export default {
    name: 'NavBar',
    data() {
        return {
            drawer: false,
            links: [
                { icon: 'calendar-month-outline', text: 'Calendar', route: '/calendar' },
                { icon: 'clipboard-check-outline', text: 'View', route: '/event' },
                { icon: 'plus-box-outline', text: 'Add', route: '' },
            ],
        };
    },
    computed: {
        menuIcon() {
            if (!this.drawer) return 'mdi-menu';
            return 'mdi-close';
        },
    },
    methods: {
        menu() {
            this.drawer = !this.drawer;
        },
    },
};
</script>

<style></style>
