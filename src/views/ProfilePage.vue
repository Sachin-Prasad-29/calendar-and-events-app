<template>
    <div class="profile">
        <NavBar />
        <v-container>
            <v-row>
                <v-col cols="12" class="text-center mt-1">
                    <v-badge avatar color="transparent" overlap offset-x="50" offset-y="42" bottom>
                        <template v-slot:badge>
                            <v-btn fab small elevation="0" class="h-6 info" @click="changeProfile()">
                                <ChangeProfile />
                            </v-btn>
                        </template>

                        <v-avatar size="200">
                            <v-img :src="user.profilePic"></v-img>
                        </v-avatar>
                    </v-badge>
                    <div class="main-title mb-1">Welcome, {{ user.name }}</div>
                    <div class="caption">Manage your account to make Calendar work better for you</div>
                    <div class="text-h7 mb-2">{{ user.email }}</div>
                </v-col>
            </v-row>
            <v-card class="px-7" elevation="0" outlined>
                <div class="personal-title">Basics info</div>
                <v-row>
                    <v-col cols="12" md="6" sm="6" class="">
                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-account-outline </v-icon>
                            <span class="font-weight-bold ml-2">Full Name : </span>{{ user.name }}
                        </div>
                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-email-outline </v-icon>
                            <span class="font-weight-bold ml-2">Email : </span>{{ user.email }}
                        </div>
                        <v-text-field
                            rounded
                            v-show="edit"
                            outlined
                            dense
                            label="Name"
                            v-model="user.name"
                        ></v-text-field>
                        <v-text-field
                            rounded
                            v-show="edit"
                            disabled
                            outlined
                            dense
                            label="Email"
                            v-model="user.email"
                        ></v-text-field>
                        <v-text-field
                            v-show="edit"
                            rounded
                            outlined
                            dense
                            label="Phone"
                            v-model="user.phone"
                        ></v-text-field>
                        <v-text-field
                            rounded
                            v-show="edit"
                            outlined
                            flat
                            dense
                            label="birthday"
                            v-model="user.birthday"
                        ></v-text-field>

                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-phone-outline </v-icon>
                            <span class="font-weight-bold ml-2">Phone : </span>{{ user.phone }}
                        </div>
                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-cake-variant-outline </v-icon>
                            <span class="font-weight-bold ml-2">Birthday : </span>{{ user.birthday }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-gender-male-female </v-icon>
                            <span class="font-weight-bold ml-2">Gender : </span>{{ user.gender }}
                        </div>
                        <v-text-field
                            rounded
                            v-show="edit"
                            outlined
                            dense
                            label="Gender"
                            v-model="user.gender"
                        ></v-text-field>
                        <v-text-field
                            rounded
                            v-show="edit"
                            outlined
                            dense
                            label="Address"
                            v-model="user.location"
                        ></v-text-field>
                        <v-text-field
                            rounded
                            v-show="edit"
                            outlined
                            dense
                            label="website"
                            v-model="user.website"
                        ></v-text-field>

                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-map-marker-outline </v-icon>
                            <span class="font-weight-bold ml-2">Address : </span>{{ user.location }}
                        </div>
                        <div v-show="!edit" class="peronal-info ct--text">
                            <v-icon> mdi-web </v-icon>
                            <span class="font-weight-bold ml-2">Website : </span
                            ><a href="user.website">{{ user.website }}</a>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12 " class="text-center mb-4">
                        <v-btn rounded color="success  white--text" class=" px-5 mr-2 text-capitalize" v-show="edit" @click="submit">
                            <v-icon>mdi-content-save</v-icon>
                           <span class="ml-2 "> Save </span> 
                        </v-btn>
                        <v-btn rounded color="orange white--text" class="text-capitalize" v-show="edit">
                            <v-icon> mdi-refresh-circle </v-icon>
                            <span class="ml-1"> Reset </span> 
                        </v-btn>
                        <v-btn
                            rounded
                            color="red white--text"
                            class="ml-2 text-capitalize"
                            @click="edit = !edit"
                            v-show="edit"
                        >
                            <v-icon>mdi-close-circle</v-icon>
                           <span class="ml-1"> cancel </span> 
                        </v-btn>
                        <v-btn rounded color="primary" @click="edit = !edit" v-show="!edit">
                            <v-icon>mdi-pencil-circle</v-icon>
                            <span class="ml-1 text-capitalize">Edit Profile </span>
                        </v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ChangeProfile from '@/components/ChangeProfile.vue';
export default {
    name: 'ProfilePage',
    components: { NavBar, ChangeProfile },
    data() {
        return {
            edit: true,
            user: {
                name: 'Sachin',
                email: 'skpkorba@gmail.com',
                birthday: '29 -09',
                location: 'Hyderabad',
                phone: '8787',
                profilePic: '/avator-1.jpg',
                website: 'fksdjfk',
                gender: 'Male',
            },
        };
    },
    methods:{
        submit(){
            const profileDetails = {
                name:this.user.name,
                birthday:this.user.birthday,
                location:this.user.location,
                phone:this.user.phone,
                website:this.user.website,
                gender:this.user.gender
            }
            console.log(profileDetails);
        }
    }
};
</script>

<style scoped>
.personal-title {
    padding: 6px;
    padding-top: 12px;
    font-size: 25px;
}
.main-title {
    font-size: 25px;
}
.peronal-info {
    padding: 8px;
}
</style>
