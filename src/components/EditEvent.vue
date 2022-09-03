<template>
    <div class="editevent">
        <v-dialog v-model="dialog" max-width="700px" class="" transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-pencil-outline</v-icon>
            </template>
            <v-card class="ma-0">
                <v-card-actions fixed class="justify-space-between mx-0 my-0">
                    <v-card-title class="text-h4 text-capitalize">{{ event.category }} </v-card-title>
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
                                        placeholder="Name of Event"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6" md="3" xs="6">
                                    <v-text-field v-model="startDate" type="date" class="mr-4"> </v-text-field>
                                </v-col>
                                <v-col cols="6" sm="6" md="3" xs="6">
                                    <v-text-field
                                        v-model="startTime"
                                        type="time"
                                        label="Start time"
                                        :rules="startTimeRule"
                                        class="mr-4"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6" md="3" xs="6" v-show="event.category === 'event'">
                                    <v-text-field v-model="endDate" type="date" class="mr-4"> </v-text-field
                                ></v-col>
                                <v-col cols="6" sm="6" md="3" xs="6" v-show="event.category === 'event'">
                                    <v-text-field
                                        v-model="endTime"
                                        type="time"
                                        label="End time"
                                        class="mr-4"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12" v-show="event.category === 'event'">
                                    <v-autocomplete
                                        v-model="attendee"
                                        :items="people"
                                        dense
                                        chips
                                        color="black"
                                        label="Add Attendees"
                                        item-text="email"
                                        item-value="email"
                                        multiple
                                    >
                                        <template v-slot:selection="data">
                                            <v-chip
                                                v-bind="data.attrs"
                                                :input-value="data.selected"
                                                close
                                                @click="data.select"
                                                @click:close="remove(data.item)"
                                            >
                                                <v-avatar left>
                                                    <v-img :src="data.item.profilePic"></v-img>
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template v-slot:item="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-item-content v-text="data.item.email"></v-list-item-content>
                                            </template>
                                            <template v-else>
                                                <v-list-item-avatar>
                                                    <img :src="data.item.profilePic" />
                                                </v-list-item-avatar>
                                                <v-list-item-content>
                                                    <v-list-item-title v-html="data.item.name"></v-list-item-title>
                                                    <v-list-item-subtitle
                                                        v-html="data.item.email"
                                                    ></v-list-item-subtitle>
                                                </v-list-item-content>
                                            </template>
                                        </template>
                                    </v-autocomplete>
                                </v-col>
                                <v-col cols="6" sm="6" md="4" xs="6">
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
                                <v-col cols="12" v-show="event.category !== 'reminder'">
                                    <v-text-field
                                        v-model="location"
                                        label="Location"
                                        prepend-inner-icon="mdi-map-marker-outline"
                                        rows="1"
                                        required
                                    ></v-text-field>
                                </v-col>
                                <v-col cols="12" v-show="event.category !== 'reminder'">
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
                                    <v-btn rounded elevation="1" color="primary" @click="editEvent" left>
                                        <v-icon>mdi-pencil-outline</v-icon>
                                        <span class="text-capitalize px-2">Upadate</span>
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
import { mapGetters } from 'vuex';
import { editEvent } from '@/services/event.services';
export default {
    name: 'EditEvent',
    props: ['event'],
    data() {
        return {
            dialog: false,
            menu1: false,
            menu2: false,
            title: this.event.name,
            startDate: this.event.startDate.substring(0, 10),
            endDate: this.getEndDate(),
            startTime: this.getStartTime(),
            endTime: this.getEndTime(),
            attendee: this.event.attendee,
            notification: this.event.notification,
            notifyBefore: this.event.notifyBefore,
            location: this.event.location || '',
            description: this.event.details || '',
            titleRule: [
                (v) => !!v || 'Title is required',
                (v) => (v && v.length > 3) || 'Title must be greater than 3 characters',
            ],
            startDateRule: [(v) => !!v || 'Start Date is required'],
            startTimeRule: [(v) => !!v || 'Start Time is required'],
        };
    },
    computed: {
        ...mapGetters(['allUsers']),
        people() {
            return this.allUsers;
        },
    },
    methods: {
        //method to edit the event 
        async editEvent() {
            if (this.$refs.form.validate()) {
                this.spinner = this.$loading.show(this.$spinner);
                const eventId = this.event._id;
                const eventDetails = {
                    name: this.title,
                    startDate: this.startDate,

                    startTime: {
                        hours: parseInt(this.startTime.substring(0, 2)),
                        minutes: parseInt(this.startTime.substring(3, 5)),
                    },
                    attendee: this.attendee,
                    notification: this.notification,
                    notifyBefore: this.notifyBefore,
                    location: this.location,
                    details: this.description,
                };
                if (this.endDate) {
                    eventDetails.endDate = this.endDate;
                }
                if (this.endTime) {
                    eventDetails.endTime = {
                        hours: parseInt(this.endTime.substring(0, 2)),
                        minutes: parseInt(this.endTime.substring(3, 5)),
                    };
                }

                const response = await editEvent(eventId, eventDetails);
                if (response.success) {
                    this.$toast.success('Updated Successfully');
                  
                } else {
                    console.log(response);
                    this.$toast.error('Opps ! Something went wrong');
                }
                this.dialog = false;
                this.$emit('refreshEvent');
                this.spinner.hide();
                
            }
        },
        remove(item) {
            const index = this.attendee.indexOf(item.email);
            if (index >= 0) this.attendee.splice(index, 1);
        },
        getEndDate() {
            if (this.event.endDate) {
                return this.event.endDate.substring(0, 10);
            }
            return '';
        },
        getEndTime() {
            if (this.event.endTime) {
                let hours;
                let min;
                if (this.event.endTime.hours < 10) hours = `0${this.event.endTime.hours}`;
                else hours = this.event.endTime.hours;
                if (this.event.endTime.minutes < 10) min = `0${this.event.endTime.minutes}`;
                else min = this.event.endTime.minutes;
                return `${hours}:${min}`;
            }
            return '';
        },
        getStartTime() {
            if (this.event.startTime) {
                let hours;
                let min;
                if (this.event.startTime.hours < 10) hours = `0${this.event.startTime.hours}`;
                else hours = this.event.startTime.hours;
                if (this.event.startTime.minutes < 10) min = `0${this.event.startTime.minutes}`;
                else min = this.event.startTime.minutes;
                return `${hours}:${min}`;
            }
            return '';
        },
    },
};
</script>

<style></style>
