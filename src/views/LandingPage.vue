<template>
    <div id="landing-page">
        <v-app-bar flat outlined color="" dense fixed>
            <v-toolbar-title class="mr-3" left>
                <v-img max-height="35" max-width="45" src="@/assets/images/icon3.svg"></v-img>
            </v-toolbar-title>
            <v-toolbar-title>
                <span class="ct--text font-weight-bold">Calendar and Events</span>
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <router-link to="/auth">
                <v-btn rounded small color="success px-6">
                    <v-icon small>mdi-login</v-icon>
                    <span class="text-capitalize ml-1">Login</span>
                </v-btn>
            </router-link>
        </v-app-bar>
        <div class="blue lighten-5">
            <v-container>
                <v-row class="align-center mr-auto mt-7">
                    <v-col cols="12" md="7" sm="6" xs="12" class="mr-auto">
                        <div class="maintitle left-align success--text">Make the most of every day</div>
                        <div class="subtitle left-align ct--text">
                            The Calendar app helps you spend less time managing your schedule and more time enjoying it.
                        </div>
                    </v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="4" sm="6" xs="12">
                        <v-img src="@/assets/landingPage/Lblue.svg" width="400"></v-img
                    ></v-col>
                </v-row>
            </v-container>
        </div>
        <div class="teal accent-1">
            <v-container>
                <v-row class="align-center ml-auto mt-5 d-flex flex-wrap-reverse">
                    <v-col cols="12" md="4" sm="6" xs="12" class="order-xs-last "
                        ><v-img src="@/assets/landingPage/Rgreen.svg" width="400"></v-img
                    ></v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="7" sm="6" xs="12" class="order-xs-first "
                        ><div class="maintitle right-align primary--text">Create Event with Your Friends</div>
                        <div class="subtitle right-align ct--text">
                            When you create an event like a Party, Vacation, Meeting or Dinner, it will be added to your
                            calendar automatically.
                        </div></v-col
                    > </v-row
            ></v-container>
        </div>
        <div class="blue lighten-5">
            <v-container>
                <v-row class="align-center mr-auto mt-5">
                    <v-col cols="12" md="7" sm="6" xs="12"
                        ><div class="maintitle left-align success--text">Build in Todo List</div>
                        <div class="subtitle left-align ct--text">
                            Take Advantage of build in todo list inside your Calender, to manage and keep track of your
                            daily work
                        </div></v-col
                    >
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="4" sm="6" xs="12"
                        ><v-img src="@/assets/landingPage/Rblue.svg" width="600"></v-img
                    ></v-col>
                </v-row>
            </v-container>
        </div>
        <div class="teal accent-1">
            <v-container>
                <v-row class="align-center ml-auto mt-5 mb-6 d-flex flex-wrap-reverse" >
                    <v-col cols="12" md="4" sm="6" xs="12" class="order-xs-last "
                        ><v-img src="@/assets/landingPage/Lgreen.svg" width="400"></v-img
                    ></v-col>
                    <v-spacer></v-spacer>
                    <v-col cols="12" md="7" sm="6" xs="12" class="order-xs-first "
                        ><div class="maintitle right-align primary--text">Fill in your calendar, quickly and easily</div>
                        <div class="subtitle right-align ct--text">
                            With Assists, Calendar helps you create events, Tasks and Reminder, in just a few taps with
                            event titles, people and places
                        </div></v-col
                    >
                    
                </v-row>
            </v-container>
        </div>

        <v-footer dark padless>
            <v-card flat tile class="primary text-center pt-3" width="100%">
                <v-card-text>
                    <a href="https://www.facebook.com/sachin.prasad.12327">
                        <v-btn class="mx-4 white--text" icon>
                            <v-icon size="35px"> mdi-facebook </v-icon>
                        </v-btn>
                    </a>
                    <a href="https://www.instagram.com/__.sachin.__._/">
                        <v-btn class="mx-4 white--text" icon>
                            <v-icon size="35px"> mdi-instagram </v-icon>
                        </v-btn>
                    </a>
                    <a href="https://www.linkedin.com/in/sachin-prasad-11091516a/">
                        <v-btn class="mx-4 white--text" icon>
                            <v-icon size="35px"> mdi-linkedin </v-icon>
                        </v-btn>
                    </a>
                    <a href="https://twitter.com/Sachin_Prasad__">
                        <v-btn class="mx-4 white--text" icon>
                            <v-icon size="35px"> mdi-twitter </v-icon>
                        </v-btn>
                    </a>
                    <a href="mailto:sachin.kprasad09@gmail.com">
                        <v-btn class="mx-4 white--text" icon>
                            <v-icon size="35px"> mdi-email </v-icon>
                        </v-btn>
                    </a>
                </v-card-text>

                <div class="ma-1 white--text">Have any Question ? or Want to Report any Bug ?</div>
                <div class="ma-1">
                    Drop us a line at -<a href="mailto:sachin.kprasad09@gmail.com" class="link-text">
                        sachin.kprasad09@gmail.com</a
                    >
                </div>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    <v-icon>mdi-copyright</v-icon> {{ new Date().getFullYear() }} — <strong>sachin</strong>
                </v-card-text>
            </v-card>
        </v-footer>
    </div>
</template>

<script>
export default {
    name: 'LandingPage',
    data() {
        return {
            isActive1: false,
            isActive2: false,
            isActive3: false,
            isActive4: false,
        };
    },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800&display=swap');

.right-align {
    text-align: right;
}
.left-align {
    text-align: left;
}
.center-align {
    text-align: center;
}
#landing-page {
    font-family: 'Poppins', sans-serif;
}
.subtitle {
    font-size: 20px;
}
.maintitle {
    font-size: 3em;
    font-weight: 500;
}
.link-text {
    text-decoration: none;
    color: rgb(238, 234, 15);
}
</style>
