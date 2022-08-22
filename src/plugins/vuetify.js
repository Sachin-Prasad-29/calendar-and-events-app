import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        dark: false,
        themes: {
            light: {
                primary: '#4285F4',
                success: '#0F9D58',
                error: '#DB4437',
                textColor: '#757575',
            },
            dark: {
                primary: '#4285F4',
                success: '#0F9D58',
                error: '#DB4437',
                textColor: '#F5F5F5',
            },
        },
    },
});
