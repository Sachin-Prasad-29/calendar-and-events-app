<template>
    <div class="delete">
        <v-dialog v-model="dialog" width="450">
            <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on">mdi-delete-outline</v-icon>
            </template>

            <v-card >
                <v-list>
                    <v-layout column text-center>
                        <v-flex class="">
                            <v-avatar size="200">
                                <v-img src="@/assets/images/deleteLogo.svg" ></v-img>
                            </v-avatar>

                            <div class="text-h6 ">You are about to delete an Item</div>
                            <div class="caption mt-1 mb-4">This will delete your Item from catalog are you sure ?</div>
                            <div class="mb-2">
                                <v-btn rounded elevation="1" color="error" class="mr-2" @click="deleteEvent">
                                    <v-icon>mdi-delete-outline</v-icon>
                                    <span class="text-capitalize ml-1"> Delete</span>
                                </v-btn>
                                <v-btn rounded elevation="1" color="grey white--text" @click="dialog = false" class=" ml-2">
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
export default {
    name: 'DeleteEvent',
    props:['event'],
    data(){
        return {
            dialog:false
        }
    },
    methods:{
        deleteEvent(){
            console.log('delete event')
        }
    }
};
</script>

<style></style>
