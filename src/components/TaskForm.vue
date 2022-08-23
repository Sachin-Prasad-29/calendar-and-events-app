<template>
<div class="event">
        <v-dialog v-model="dialog" max-width="700px" class="ma-0" transition="dialog-bottom-transition" >
            <template v-slot:activator="{ on, attrs }">
                <div text v-bind="attrs" v-on="on">
                    <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                    <span right>Task</span>
                </div>
            </template>
            <v-card class="ma-0">
                <v-card-actions fixed class="justify-space-between mx-0 my-0">
                    <v-card-title class="text-h4">Add a new Task </v-card-title>
                    <v-btn text large fab @click="dialog = false" class="red--text">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>
                <v-form class="ma-0 pa-0" ref="form">
                    <v-card-text>
                        <v-container>
                            <v-row no-gutters>
                                <v-col cols="12">
                                    <v-text-field v-model="title" label="Title" :rules="titleRule" placeholder="Name of Task..."></v-text-field>
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
                                <v-col cols="1" sm="1" md="1">
                                    
                                </v-col>
                                <v-col cols="5" sm="3" md="3" >
                                    <v-text-field
                                        v-model="startTime"
                                        type="time"
                                        label="Start time"
                                        :rules="startTimeRule"
                                    ></v-text-field>
                                </v-col>

                                

                                
                                <v-col cols="6" sm="6" md="6" xs="6">
                                    <v-switch v-model="notification" inset label="Add notification"></v-switch>
                                </v-col>
                                <v-col cols="6" sm="3" md="4" xs="3">
                                    <v-text-field
                                        :disabled="!notification"
                                        v-model="notifyBefore"
                                        type="number"
                                        label="Notify before ( minutes )"
                                    >
                                    </v-text-field>
                                </v-col>
                                <v-col cols="12" >
                                    <v-text-field
                                        v-model="location"
                                        label="Location"
                                        prepend-inner-icon="mdi-map-marker-outline"
                                        rows="1"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-textarea
                                        v-model="description"
                                        label="Description"
                                        prepend-inner-icon="mdi-card-text-outline"
                                        rows="1"
                                        auto-grow
                                        required
                                    ></v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn rounded outlined color="success" @click="submit" left>
                                        <v-icon>mdi-plus-circle</v-icon>
                                        <span class="text-capitalize px-2">Add</span>
                                    </v-btn>
                                    <v-btn rounded outlined color="orange" class="ml-3" @click="reset" left>
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
export default {
    name: 'TaskForm',
    data() {
        return {
            menu1: false,
            menu2: false,
            dialog: false,
            people: [
                { name: 'Sandra Adams', group: 'Group 1' },
                { name: 'Aman Adams', group: 'Group 1' },
            ],
            title: '',
            startDate: '',
            endDate: '',
            startTime: '',
            endTime: '',
            category:'task',
            attendee: [],
            notification: false,
            notifyBefore: 15,
            location: '',
            description: '',
            titleRule: [
                (v) => !!v || 'Title is required',
                (v) => (v && v.length > 3) || 'Title must be greater than 3 characters',
            ],
            startDateRule: [(v) => !!v || 'Start Date is required'],
            startTimeRule: [(v) => !!v || 'Start Time is required'],
            endDateRule: [(v) => !!v || 'End Date is required'],
            endTimeRule: [(v) => !!v || 'End Time is required'],
        };
    },
    methods: {
        submit() {
            if (this.$refs.form.validate()) {
                const eventDetails = {
                    title: this.title,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    attendee: this.attendee,
                    notification: this.notification,
                    notifyBefore: this.notifyBefore,
                    location: this.location,
                    description: this.description,
                };
                console.log(eventDetails);
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        remove(item) {
            const index = this.attendee.indexOf(item.name);
            if (index >= 0) this.attendee.splice(index, 1);
        },
    },
};
</script>

<style></style>
