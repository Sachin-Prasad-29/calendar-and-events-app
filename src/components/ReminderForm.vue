<template>
    <div class="event">
        <v-dialog v-model="dialog" max-width="700px" class="ma-0" transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <div text v-bind="attrs" v-on="on">
                    <v-icon class="ml-2">{{ icon }}</v-icon>
                    <span class="ml-2">{{ name }}</span>
                </div>
            </template>
            <v-card class="ma-0">
                <v-card-actions fixed class="justify-space-between mx-0 my-0">
                    <v-card-title class="text-h4">Reminder</v-card-title>
                    <v-btn text large fab @click="dialog = false" class="red--text">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-form class="ma-0 pa-0" ref="form">
                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field
                                        v-model="title"
                                        label="Title"
                                        :rules="titleRule"
                                        placeholder="Remind me to..."
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="3" md="3">
                                    <v-menu
                                        v-model="menu1"
                                        :close-on-content-click="true"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="startDate"
                                                label="Start date"
                                                append-icon="mdi-calendar-blank-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :rules="startDateRule"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="startDate" @input="menu1 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="1" sm="1" md="1"> </v-col>
                                <v-col cols="6" sm="3" md="3">
                                    <v-text-field
                                        v-model="startTime"
                                        type="time"
                                        label="Start time"
                                        :rules="startTimeRule"
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="6" sm="6" md="6" xs="6">
                                    <v-switch v-model="notification" inset label="Remind Me"></v-switch>
                                </v-col>
                                <v-col cols="6" sm="3" md="4" xs="3">
                                    <v-text-field
                                        :disabled="!notification"
                                        v-model="notifyBefore"
                                        type="number"
                                        label="Remind before ( minutes )"
                                    >
                                    </v-text-field>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn rounded elevation="1"  class="mt-4 " color="success" @click="submit" left>
                                        <v-icon>mdi-plus-circle</v-icon>
                                        <span class="text-capitalize px-2">Add</span>
                                    </v-btn>
                                    <v-btn rounded elevation="1" color="orange" class="ml-3 mt-4 white--text" @click="reset" left>
                                        <v-icon> mdi-refresh-circle </v-icon>
                                        <span class="text-capitalize px-2" right>Reset</span>
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
import { addEvent } from '@/services/event.services';
export default {
    name: 'ReminderForm',
    props: ['icon', 'name'],
    data() {
        return {
            menu1: false,
            dialog: false,
            title: '',
            startDate: '',
            startTime: '12:00',
            notification: true,
            notifyBefore: 15,
            titleRule: [
                (v) => !!v || 'Title is required',
                (v) => (v && v.length > 3) || 'Title must be greater than 3 characters',
            ],
            startDateRule: [(v) => !!v || 'Start Date is required'],
            startTimeRule: [(v) => !!v || 'Start Time is required'],
        };
    },
    methods: {
        async submit() {
            if (this.$refs.form.validate()) {
                this.spinner = this.$loading.show(this.$spinner);

                const eventDetails = {
                    name: this.title,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    startTime: {
                        hours: parseInt(this.startTime.substring(0, 2)),
                        minutes: parseInt(this.startTime.substring(3, 5)),
                    },
                    createdOn: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
                    category: 'reminder',
                    notification: this.notification,
                    notifyBefore: this.notifyBefore,
                };
                const response = await addEvent(eventDetails);
                if (response.success) {
                    this.$toast.success('Reminder Added Successfully');
                    //console.log(response);
                    this.dialog = false;
                } else {
                    console.log(response);
                    this.$toast.error('Opps ! Something went wrong.');
                }
            }
            this.$emit('refreshCalendar');
            this.$refs.form.reset();
            this.spinner.hide();
        },
        reset() {
            this.$refs.form.reset();
            this.notification = true;
        },
    },
};
</script>

<style></style>
