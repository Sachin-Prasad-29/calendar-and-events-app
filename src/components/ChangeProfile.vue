<template>
    <div class="event">
        <v-dialog v-model="dialog" max-width="350px" class="ma-0" transition="dialog-bottom-transition">
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
                                        <v-icon>mdi-close</v-icon>
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
                                    <v-avatar size="200">
                                        <img :src="user.profile" alt="" />
                                    </v-avatar>
                                </v-col>

                                <v-col cols="12" class="my-4">
                                    <hr class="ma-5 grey" />
                                    <v-dialog v-model="changeDialog" width="300">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn
                                                rounded
                                                text
                                                outlined
                                                color="primary"
                                                class="mr-1"
                                                v-bind="attrs"
                                                v-on="on"
                                            >
                                                <v-icon>mdi-pencil-circle</v-icon>
                                                <span class="text-capitalize ml-1">change</span>
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <v-card-title class="text-h5 grey lighten-2">
                                                Change profile picture
                                            </v-card-title>

                                            <v-card-text class="pa-7">
                                                <v-file-input
                                                    :rules="rules"
                                                    accept="image/png, image/jpeg, image/jpg"
                                                    prepend-inner-icon="mdi-camera"
                                                    label="Profile Image"
                                                ></v-file-input>
                                            </v-card-text>

                                            <v-divider></v-divider>

                                            <v-card-actions>
                                                <v-btn
                                                    outlined
                                                    rounded
                                                    elevation="0"
                                                    color="primary"
                                                    text
                                                    class="ml-6 my-1 px-4"
                                                    @click="submit"
                                                >
                                                    <v-icon>mdi-cloud-upload-outline</v-icon>
                                                    <span class="text-capitalize ml-1"> Save</span>
                                                </v-btn>
                                                <v-btn
                                                    outlined
                                                    rounded
                                                    elevation="0"
                                                    color="red"
                                                    text
                                                    @click="changeDialog = false"
                                                    class="ml-5 px-2 my-1"
                                                >
                                                    <v-icon>mdi-close-circle-outline</v-icon>
                                                    <span class="text-capitalize ml-1">cancel</span>
                                                </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                    </v-dialog>

                                    <v-btn rounded text outlined color="error" class="ml-1">
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
            changeDialog: false,
            user: {
                name: 'Sachin Prasad',
                email: 'skpkorba9009@gmail.com',
                profile: '/avator-1.jpg',
            },
            rules: [(value) => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'],
        };
    },
    methods: {
        submit() {
            console.log('Upload success');
            this.changeDialog = false;
        },
    },
};
</script>

<style></style>
