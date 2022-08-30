<template>
    <div class="not-found">
        <v-row class="align-center">
            <v-col cols="12" class="text-center">
                <v-avatar class="avatar" size="400" tile>
                    <v-img class="not-found" src="@/assets/images/404img.svg"></v-img>
                </v-avatar>

                <br />
                <br />
                <div>
                    <h1 class="text-h4 ct--text font-weight-black">Sorry!</h1>
                    <p class="text-h7 ct--text">
                        Either you aren't cool enough to visit this page or it doesn't exist!
                    </p>
                    <router-link to="/">
                        <v-btn class="mr-2" rounded color="primary">
                            <v-icon small>mdi-home-outline</v-icon>
                            <span class="text-capitalize ml-1">Home</span>
                        </v-btn>
                    </router-link>
                    <router-link to="/auth">
                        <v-btn class="ml-2" rounded color="success">
                            <v-icon small>mdi-login</v-icon>
                            <span class="text-capitalize ml-1">Login</span>
                        </v-btn>
                    </router-link>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'PageNotFound',
};
</script>

<style scoped></style>
