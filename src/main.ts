import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia';
import router from './router';

const app = createApp(App);
const pinia = createPinia();

// === vuetify ===
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { ru } from 'vuetify/locale'

// иконки
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
    components,
    directives,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {
            mdi,
        },
    },
    theme: {
        defaultTheme: "glavreklama",
        themes: {
            glavreklama: {
                dark: false,
                colors: {
                    primary: "#e7474c"
                }
            }
        }
    },
    locale: {
        locale: 'ru',
        messages: { ru }
    }
});

app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app')
