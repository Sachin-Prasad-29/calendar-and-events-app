<template>
    <div class="profile">
        <NavBar currPage="Profile"/>
        <v-container>
            <v-row>
                <v-col cols="12" class="text-center mt-1">
                    <v-badge avatar color="transparent" overlap offset-x="50" offset-y="42" bottom>
                        <template v-slot:badge>
                            <v-btn fab small elevation="0" class="h-6 info" @click="changeProfile()">
                                <ChangeProfile />
                            </v-btn>
                        </template>

                        <v-avatar class="avatar" size="200">
                            <v-img :src="profilePic"></v-img>
                        </v-avatar>
                    </v-badge>
                    <div class="main-title mb-1">Welcome, {{ user.name }}</div>
                    <div class="caption">Manage your account to make Calendar work better for you</div>
                    <div class="text-h7 mb-2">{{ user.email }}</div>
                </v-col>
            </v-row>
            <div class="px-7 card-div">
                <div class="personal-title mb-1">Basics info</div>
                <v-row>
                    <v-col cols="12" md="6" sm="6" class="">
                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-account-outline </v-icon>
                            <span class="font-weight-bold ml-2">Full Name : </span>{{ user.name }}
                        </div>
                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-email-outline </v-icon>
                            <span class="font-weight-bold ml-2">Email : </span>{{ user.email }}
                        </div>
                        <v-text-field class="ml-1" v-show="edit" dense label="Name" v-model="name"></v-text-field>
                        <v-text-field
                            v-show="edit"
                            disabled
                            class="ml-1"
                            dense
                            label="Email"
                            v-model="user.email"
                        ></v-text-field>
                        <v-text-field class="ml-1" v-show="edit" dense label="Phone" v-model="phone"></v-text-field>
                        <v-text-field
                            class="ml-1"
                            type="date"
                            v-show="edit"
                            flat
                            dense
                            label="birthday"
                            v-model="birthday"
                        ></v-text-field>

                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-phone-outline </v-icon>
                            <span class="font-weight-bold ml-2">Phone : </span>{{ user.phone }}
                        </div>
                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-cake-variant-outline </v-icon>
                            <span class="font-weight-bold ml-2">Birthday : </span>{{ birthday }}
                        </div>
                    </v-col>
                    <v-col cols="12" md="6" sm="6">
                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-gender-male-female </v-icon>
                            <span class="font-weight-bold ml-2">Gender : </span>{{ user.gender }}
                        </div>

                        <v-select
                            v-show="edit"
                            flat
                            dense
                            :items="genderOption"
                            label="Gender"
                            v-model="gender"
                        ></v-select>

                        <v-text-field
                            class="ml-1"
                            v-show="edit"
                            dense
                            label="Address"
                            v-model="location"
                        ></v-text-field>
                        <v-text-field class="ml-1" v-show="edit" dense label="website" v-model="website"></v-text-field>

                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-map-marker-outline </v-icon>
                            <span class="font-weight-bold ml-2">Address : </span>{{ user.location }}
                        </div>
                        <div v-show="!edit" class="peronal-info">
                            <v-icon> mdi-web </v-icon>
                            <span class="font-weight-bold ml-2">Website : </span
                            ><a :href="user.website">{{ user.website }}</a>
                        </div>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12 " class="text-center mb-4">
                        <v-btn
                            rounded
                            color="success  white--text"
                            class="px-5 mr-2 text-capitalize"
                            v-show="edit"
                            @click="submit"
                        >
                            <v-icon>mdi-content-save</v-icon>
                            <span class="ml-2"> Save </span>
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
            </div>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import ChangeProfile from '@/components/ChangeProfile.vue';
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { editUserProfile } from '@/services/profile.services';

export default {
    name: 'ProfilePage',
    components: { NavBar, ChangeProfile },
    data() {
        return {
            edit: false,
            genderOption: ['Male', 'Female', 'Other'],
            user: {},
            name: '',
            birthday: '',
            email: '',
            location: '',
            phone: '',
            gender: '',
            website: '',
        };
    },
    computed: {
        ...mapGetters(['userDetails']),
        profilePic() {
            if (this.userDetails) return this.userDetails.profilePic;
            return '';
        },
    },
    created() {
        this.loadProfile();
    },
    methods: {
        ...mapActions(['getUserDetails']),
        ...mapMutations(['setIsLoading']),
        async loadProfile() {
            this.setIsLoading(true)
            if (!this.userDetails) await this.getUserDetails();
            this.user = this.userDetails;
            this.name = this.user.name;
            this.gender = this.user.gender;
            this.location = this.user.location;
            this.website = this.user.website;
            this.birthday = this.user.birthday ? this.user.birthday.substring(0, 10) : '';
            this.phone = this.user.phone;
            setTimeout(() => {
                this.setIsLoading(false)
            }, 1000);
        },
        async submit() {
            this.setIsLoading(true)
            const profileDetails = {
                name: this.name,
                birthday: this.birthday,
                location: this.location,
                phone: this.phone,
                website: this.website,
                gender: this.gender,
            };
            const response = await editUserProfile(profileDetails);
            if (response.success) {
                await this.getUserDetails();
                this.user = this.userDetails;
                this.$toast.success('Profile Updated Successfully');
            } else {
                this.$toast.error('Oops ! Someting Error happened ');
            }
            this.edit = false;
            setTimeout(() => {
               this.setIsLoading(false)
            }, 1000);
        },
    },
};
</script>

<style scoped>
.card-div {
    border: 1px solid lightgray;
    border-radius: 10px;
    background: rgba(128, 128, 128, 0.096);
}
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

.bounce-enter-active {
    animation: bounce-in 0.5s;
}
.bounce-leave-active {
    animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
    }
}
.avatar {
    border: 1px solid rgb(212, 210, 210);
}
</style>
