import { createApp } from 'vue';
import App from './App';
import axios from 'axios';
import router from '@/router';
import store from '@/store';

const app = createApp(App);
app.use(router).use(store(app)).mount('#app');

app.config.globalProperties.$http = axios;
const token = localStorage.getItem('token');
if (token) {
  app.config.globalProperties.$http.defaults.headers = {
    Authorization: `Bearer ${token}`,
  };
}
