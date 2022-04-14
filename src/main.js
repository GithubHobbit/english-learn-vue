import { createApp } from 'vue';
import App from './App';
import axios from 'axios';
import VueJwtDecode from 'vue-jwt-decode';
import router from '@/router';
import store from '@/store';

import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';

import 'primevue/resources/themes/saga-blue/theme.css'; //theme
import 'primevue/resources/primevue.min.css'; //core css
import 'primeicons/primeicons.css'; //icons

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(PrimeVue)
  .component('Menubar', Menubar)
  .component('InputText', InputText)
  .component('Card', Card)
  .mount('#app');

app.config.globalProperties.$http = axios;
const token = localStorage.getItem('token');
if (token) {
  try {
    const b = VueJwtDecode.decode(token);
    console.log(b);
  } catch (error) {
    // return error in production env
    console.log(error, 'error from decoding token');
  }

  app.config.globalProperties.$http.defaults.headers = {
    'Cache-Control': null,
    'X-Requested-With': null,
    Authorization: 'Bearer ' + token,
  };

  // app.config.globalProperties.$http.defaults.headers.common['Authorization'] =
  //   'Bearer ' + token;
}
