<template>
    <div class="event">
        <NavBar />

        <v-container class="text-center">
            <v-row class="justify-center">
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-menu
                        :nudge-width="880"
                        transition="slide-y-transition"
                        offset-y
                        right
                        rounded="lg"
                        text-center
                        :close-on-content-click="false"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn fab small elevation="1" class="pa-0" v-bind="attrs" v-on="on">
                                <v-icon>mdi-chevron-down</v-icon>
                            </v-btn>
                        </template>
                        <v-card max-width="930px" class="pa-3">
                            <v-form ref="form" class="px-6">
                                <v-row class="mt-5">
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-text-field flat dense v-model="title" label="Title"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
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
                                                    v-model="createdOn"
                                                    label="Created on"
                                                    append-icon="mdi-calendar-blank-outline"
                                                    readonly
                                                    v-bind="attrs"
                                                    v-on="on"
                                                    dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker v-model="createdOn" @input="menu2 = false"></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
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
                                                    dense
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker
                                                solo
                                                dense
                                                v-model="startDate"
                                                @input="menu1 = false"
                                            ></v-date-picker>
                                        </v-menu>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-text-field
                                            dense
                                            label="Created By"
                                            v-model="createdBy"
                                            class="mt-7"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-select
                                            flat
                                            dense
                                            :items="categories"
                                            label="Category"
                                            v-model="category"
                                        ></v-select>
                                    </v-col>
                                    <v-col cols="12" md="6" sm="6" xs="12">
                                        <v-checkbox v-model="completed" label="Completed"></v-checkbox>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12" xs="12">
                                        <v-btn
                                            rounded
                                            @click="loadEvent"
                                            elevation="0"
                                            color=" primary"
                                            class="text-capitalize"
                                        >
                                            <v-icon left>mdi-magnify</v-icon>
                                            Search</v-btn
                                        >
                                        <v-btn
                                            @click="reset"
                                            rounded
                                            elevation="0"
                                            color=" orange"
                                            class="white--text text-capitalize ml-2"
                                        >
                                            <v-icon left>mdi-refresh-circle</v-icon> Reset</v-btn
                                        >
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>
                    </v-menu>
                </v-col>
                <v-col cols="8" md="8" sm="8" xs="6">
                    <v-text-field
                        v-model="keyword"
                        filled
                        dense
                        solo
                        clear-icon="mdi-close-circle"
                        clearable
                        label="Message"
                    ></v-text-field>
                </v-col>
                <v-col cols="1" md="1" sm="1" xs="3">
                    <v-btn fab small elevation="0" @click="loadEvent" class="primary">
                        <v-icon small>mdi-magnify</v-icon>
                    </v-btn>
                </v-col>
            </v-row>
            
        </v-container>
        <v-btn color="success" elevation="3" fab small  class="v-btn--desc" @click="speeddial = !speeddial">
            <v-icon>mdi-chevron-up </v-icon>
        </v-btn>
        <v-btn color="primary" elevation="3" dark fab small  class="v-btn--example" @click="speeddial = !speeddial">
            <span large>{{page}}</span>
        </v-btn>
        <v-btn color="success" elevation="3"  fab small  class="v-btn--insc" @click="speeddial = !speeddial">
            <v-icon>mdi-chevron-down </v-icon>
        </v-btn>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import { getEvents } from '@/services/getEvents';
export default {
    name: 'EventPage',
    components: { NavBar },
    data() {
        return {
            page: 1,

            categories: ['Event', 'Task', 'Reminder'],
            menu1: false,
            menu2: false,
            context: false,
            length: '',

            title: '',
            category: '',
            startDate: '',
            endDate: '',
            createdOn: '',
            completed: '',
            keyword: '',
            createdBy: '',
            allEvents: [],
        };
    },
    created() {
        this.loadEvent();
    },

    methods: {
        async loadEvent() {
            if (this.title == null) this.title = '';
            if (this.startDate == null) this.startDate = '';
            if (this.createdOn == null) this.createdOn = '';
            if (this.category == null) this.category = '';
            if (this.completed == null) this.completed = '';
            if (this.keyword == null) this.keyword = '';
            if (this.createdBy == null) this.createdBy = '';

            this.category = this.category.toLowerCase();

            const params = `page=${this.page}&title=${this.title}&category=${this.category}&startDate=${this.startDate}&endDate=${this.endDate}&createdOn=${this.createdOn}&completed=${this.completed}&keyword=${this.keyword}&createdBy=${this.createdBy}`;
            console.log(params);
            const response = await getEvents(params);

            this.allEvents = response.events;
            console.log(this.allEvents);
        },
        reset() {
            this.$refs.form.reset();
        },
    },
};
</script>

<style scoped>
.v-btn--example {
    bottom: 360px;
    right: 10px;
    position: fixed;

    margin: 10px 0;
}
.v-btn--desc {
    bottom:420px;
    right: 10px;
    position: fixed;

    margin: 10px 0;
}
.v-btn--insc {
    bottom: 300px;
    right: 10px;
    position: fixed;

    margin: 10px 0;
}
</style>
