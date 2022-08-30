<template>
    <div class="editevent">
        <v-dialog v-model="dialog" max-width="700px" class="" transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-pencil-outline</v-icon>
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
                                    <v-btn rounded elevation="1" color="success" @click="editEvent" left>
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
export default {
    name: 'EditEvent',
    props: ['event'],
    data() {
        return {
            dialog: false,
        };
    },
    methods: {
        editEvent() {
            console.log('edit event');
        },
    },
};
</script>

<style></style>
