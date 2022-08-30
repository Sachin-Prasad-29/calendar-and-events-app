<template>
    <div class="view-event">
        <v-dialog v-model="dialog" width="450">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-eye-outline</v-icon>
            </template>

            <v-card>
                <v-list>
                    <v-layout column text-center>
                        <v-flex class="">
                            <div>{{ event.name }}</div>
                            <div>{{ event.startDate | date }}</div>
                            <div>{{ event.startTime }}</div>
                            <div>{{ event.endDate }}</div>
                            <div>{{ event.endTime }}</div>
                            <div>{{ event.attendee }}</div>
                            <div>{{ event.notifyBefore }}</div>
                            <div>{{ event.location }}</div>
                            <div>{{ event.description }}</div>

                            <v-btn rounded elevation="1" color="grey white--text" @click="dialog = false" class="ml-2">
                                <v-icon>mdi-close-circle-outline</v-icon>
                                <span class="text-capitalize ml-1">Cancel</span>
                            </v-btn>
                        </v-flex>
                    </v-layout>
                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    name: 'ViewEvent',
    props: ['event'],
    data() {
        return {
            dialog: false,
        };
    },
};
</script>

<style></style>
