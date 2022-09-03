<template>
    <div class="excuse-event">
        <v-dialog v-model="dialog" width="450">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-location-exit</v-icon>
            </template>

            <v-card>
                <v-list>
                    <v-layout column text-center>
                        <v-flex class="mt-7">
                            <v-avatar size="130" tile>
                                <v-img src="@/assets/images/exit-svg.svg"></v-img>
                            </v-avatar>

                            <div class="text-h6 mt-5">You are about to left an Event</div>
                            <div class="caption mt-1 mb-4">This will remove you from event, are you sure ?</div>
                            <div class="mb-2">
                                <v-btn rounded elevation="1" color="error" class="mr-2" @click="excuseEvent">
                                    <v-icon>mdi-location-exit</v-icon>
                                    <span class="text-capitalize ml-1">Excuse</span>
                                </v-btn>
                                <v-btn
                                    rounded
                                    elevation="1"
                                    color="grey white--text"
                                    @click="dialog = false"
                                    class="ml-2"
                                >
                                    <v-icon>mdi-close-circle-outline</v-icon>
                                    <span class="text-capitalize ml-1">Cancel</span>
                                </v-btn>
                            </div>
                        </v-flex>
                    </v-layout>
                </v-list>

                <v-divider></v-divider>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { excuseEvent } from '@/services/event.services';
import { mapGetters } from 'vuex';

export default {
    name: 'ExcuseEvent',
    props: ['event'],
    data() {
        return {
            dialog: false,
        };
    },
    computed:{
        ...mapGetters(['token'])
    },
    methods: {
        //method to exucse the event
        async excuseEvent() {
            this.spinner = this.$loading.show(this.$spinner);
            const eventId = this.event._id;
            const eventDetails = this.event;
            const response = await excuseEvent(eventId, eventDetails,this.token);
            if (response.success) {
                this.$toast.success('Succesfully Left the Event');
            } else {
                console.log(response);
                this.$toast.error('Opps ! Something went wrong');
            }
            this.dialog = false;
            this.$emit('refreshEvent');
            this.spinner.hide();
        },
    },
};
</script>

<style></style>
