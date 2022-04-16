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

import GAuth from 'vue3-google-oauth2'

const gAuthOptions = { clientId: '909172888250-rq68nt21309v34u4gjggnl8likfnhi2e.apps.googleusercontent.com', prompt: 'consent', fetch_basic_profile: false }

const app = createApp(App);
app
  .use(router)
  .use(store)
  .use(PrimeVue)
  .use(GAuth, gAuthOptions)
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
    'Authorization': `Bearer ${token}`,
  };

  // app.config.globalProperties.$http.defaults.headers.common['Authorization'] =
  //   'Bearer ' + token;
}