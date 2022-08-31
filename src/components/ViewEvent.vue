<template>
    <div class="view-event">
        <v-dialog v-model="dialog" width="500">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-eye-outline</v-icon>
            </template>

            <v-card class="px-5 py-1">
                <v-card-actions fixed class="justify-space-between mx-0 my-0">
                    <span>
                        <v-icon large :color="event.color">mdi-checkbox-blank-circle</v-icon>
                    </span>
                    <v-card-title class="text-h5 text-capitalize">{{ event.name }} </v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn text fab @click="dialog = false" class="red--text">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                </v-card-actions>

                <v-list class="mx-5">
                    <v-layout column>
                        <v-flex class="">
                            <div class="mb-3">
                                <v-icon class="mr-2">mdi-calendar-outline</v-icon>
                                {{ event.startDate | date }}{{ endDate }}
                            </div>
                            <div class="mb-3">
                                <v-icon class="mr-2">mdi-clock-time-eight-outline</v-icon>
                                {{ startTime }} {{ endTime }}
                                <span></span>
                            </div>

                            <div v-show="event.category === 'event'" class="mb-3">
                                <v-icon class="mr-2">mdi-account-multiple-outline</v-icon>
                                {{ event.attendee.length }} peoples invited
                                <v-btn x-small text elevation="0" fab @click="showPeople = !showPeople">
                                    <v-icon>mdi-{{ showPeople ? 'chevron-up' : 'chevron-down' }}</v-icon>
                                </v-btn>
                                <div v-show="showPeople" class="ml-7">
                                    <div v-for="(people, index) in event.attendee" :key="index" class="mt-1">
                                        {{ people }}
                                    </div>
                                </div>
                            </div>

                            <div v-show="event.category === 'event'" class="mb-3">
                                <v-icon class="mr-2">mdi-account-outline</v-icon>
                                {{ event.createdBy }} ( owner )
                            </div>
                            <div v-show="event.notification" class="mb-3">
                                <v-icon class="mr-2">mdi-bell-outline</v-icon>
                                {{ event.notifyBefore ? event.notifyBefore : 0 }} Minutes before
                            </div>
                            <div v-show="event.location" class="mb-3">
                                <v-icon class="mr-2">mdi-map-marker-outline</v-icon>
                                {{ event.location }}
                            </div>
                            <div v-show="event.details" class="mb-3">
                                <v-icon class="mr-2">mdi-card-text-outline</v-icon>
                                {{ event.details }}
                            </div>
                        </v-flex>
                    </v-layout>
                </v-list>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import format from 'date-fns/format';
import { getTime } from '@/filters/time';
export default {
    name: 'ViewEvent',
    props: ['event'],
    data() {
        return {
            dialog: false,
            showPeople: false,
        };
    },
    computed: {
        endDate() {
            if (this.event.endDate) {
                return ` - ${format(new Date(this.event.endDate), 'MMM d, yyyy')}`;
            }
            return '';
        },
        endTime() {
            const endTime = getTime(this.event.endTime);
            if (endTime) return `- ${endTime}`;
            return '';
        },
        startTime() {
            return getTime(this.event.startTime);
        },
    },
};
</script>

<style></style>
