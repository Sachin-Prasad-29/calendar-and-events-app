<template>
    <v-app id="app" >
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: 'App',
    data: () => ({}),
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=DynaPuff:wght@500&display=swap');
* {
      font-family: 'Poppins', sans-serif;
}
</style>
