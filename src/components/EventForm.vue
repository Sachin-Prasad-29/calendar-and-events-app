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
                    <v-card-title class="text-h4">Event </v-card-title>
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
                                        <v-date-picker v-model="startDate" @input="setEndDate"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6" sm="6" md="3" xs="6">
                                    <v-text-field
                                        v-model="startTime"
                                        type="time"
                                        label="Start time"
                                        :rules="startTimeRule"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="6" sm="6" md="3" xs="6">
                                    <v-menu
                                        v-model="menu2"
                                        :close-on-content-click="true"
                                        :nudge-right="40"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="auto"
                                    >
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                v-model="endDate"
                                                label="End date"
                                                append-icon="mdi-calendar-blank-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                                :rules="endDateRule"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker v-model="endDate" @input="menu2 = false"></v-date-picker>
                                    </v-menu>
                                </v-col>
                                <v-col cols="6" sm="6" md="3" xs="6">
                                    <v-text-field
                                        v-model="endTime"
                                        type="time"
                                        label="End time"
                                        :rules="endTimeRule"
                                    ></v-text-field>
                                </v-col>

                                <v-col cols="12">
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
                                                <v-list-item-content v-text="data.item"></v-list-item-content>
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
                                <v-col cols="12">
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
                                    <v-btn rounded elevation="1" color="success" @click="submit" left>
                                        <v-icon>mdi-plus-circle</v-icon>
                                        <span class="text-capitalize px-2">Add</span>
                                    </v-btn>
                                    <v-btn
                                        rounded
                                        elevation="1"
                                        color="white--text orange"
                                        class="ml-3"
                                        @click="reset"
                                        left
                                    >
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
import { mapActions, mapGetters, mapMutations } from 'vuex';

export default {
    name: 'EventForm',
    props: ['icon', 'name'],
    data() {
        return {
            menu1: false,
            menu2: false,
            dialog: false,
            title: '',
            startDate: '',
            endDate: '',
            startTime: '12:00',
            endTime: '13:00',

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
            endDateRule: [(v) => !!v || 'End Date is required', (v)=> (v >=this.startDate)|| 'End date must be equal or greater than start date'],
            endTimeRule: [(v) => !!v || 'End Time is required'],
        };
    },
    computed: {
        ...mapGetters(['allUsers', 'userDetails']),
        people() {
            return this.allUsers;
        },
    },
    methods: {
        ...mapActions(['getAllEvents']),
        ...mapMutations(['setIsLoading']),
        async submit() {
            if (this.$refs.form.validate()) {
                this.setIsLoading(true)
                const eventDetails = {
                    name: this.title,
                    startDate: this.startDate,
                    endDate: this.endDate,
                    startTime: {
                        hours: parseInt(this.startTime.substring(0, 2)),
                        minutes: parseInt(this.startTime.substring(3, 5)),
                    },
                    endTime: {
                        hours: parseInt(this.endTime.substring(0, 2)),
                        minutes: parseInt(this.endTime.substring(3, 5)),
                    },
                    createdOn: new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }),
                    category: 'event',
                    attendee: this.attendee,
                    notification: this.notification,
                    notifyBefore: this.notifyBefore,
                    location: this.location,
                    details: this.description,
                };

                const response = await addEvent(eventDetails);

                if (response.success) {
                    this.$toast.success('Event Added Successfully');
                    //  console.log(response);

                    this.dialog = false;
                } else {
                    console.log(response);
                    this.$toast.error('Opps ! Something went wrong.');
                }
                await this.getAllEvents();
                this.$emit('refreshCalendar');
                this.$refs.form.reset();
                this.setIsLoading(false)
            }
        },
        reset() {
            this.$refs.form.reset();
        },
        remove(item) {
            const index = this.attendee.indexOf(item.email);
            if (index >= 0) this.attendee.splice(index, 1);
        },
        setEndDate() {
            // console.log(event);
            this.endDate = this.startDate;
            this.menu1 = false;
        },
    },
};
</script>

<style></style>
