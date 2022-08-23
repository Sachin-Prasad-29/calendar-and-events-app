<template>
    <div class="event">
        <v-dialog v-model="dialog" max-width="320px" class="ma-0" transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <div text v-bind="attrs" v-on="on">
                    <v-icon small>mdi-camera</v-icon>
                </div>
            </template>
            <v-card class="ma-0">
                <v-form class="ma-0 pa-0" ref="form">
                    <v-card-text class="ma-0 pa-0">
                        <v-container text-center>
                            <v-row no-gutters>
                                <span>
                                    <v-btn text small fab @click="dialog = !dialog" color="red" class="">
                                        <v-icon >mdi-close</v-icon>
                                    </v-btn>
                                </span>
                                <v-col cols="12">
                                    <div class="text-h5 mb-3">Profile Picture</div>
                                </v-col>
                                <v-col cols="12">
                                    <div class="caption mx-2">
                                        A picture helps people recognize you and lets you know when you’re signed in to
                                        your account
                                    </div>
                                    
                                </v-col>

                                <v-col cols="12" class="mt-3">
                                    <v-avatar size="150">
                                        <img :src="user.profile" alt="" />
                                    </v-avatar>
                                </v-col>

                                <v-col cols="12" class="my-3">
                                    <hr class="ma-5 grey" />
                                    <v-btn rounded text outlined color="primary" class="mr-1">
                                        <v-icon>mdi-pencil-circle</v-icon>
                                        <span class="text-capitalize ml-1">change</span>
                                    </v-btn>
                                    <v-btn rounded text outlined color="error" class="ml-1 ">
                                        <v-icon>mdi-delete-circle</v-icon>
                                        <span class="text-capitalize ml-1">remove</span>
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-container>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'ChangeProfile',
    data() {
        return {
            dialog: false,
            user: {
                name: 'Sachin Prasad',
                email: 'skpkorba9009@gmail.com',
                profile: '/avator-1.jpg',
            },
        };
    },
};
</script>

<style></style>
