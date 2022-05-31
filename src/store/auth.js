import axios from 'axios';
import { regUser, loginUser } from '@/services/auth.service';

const auth = (app) => {
  const state = {
    status: '',
    token: localStorage.getItem('token') || '',
    user: {},
  };
  const mutations = {
    auth_request(state) {
      state.status = 'loading';
    },
    auth_success(state, token, user) {
      state.status = 'success';
      state.token = token;
      state.user = user;
    },
    auth_error(state) {
      state.status = 'error';
    },
    logout(state) {
      state.status = '';
      state.token = '';
    },
  };

  const actions = {
    async LOGIN({ commit }, userData) {
      try {
        commit('auth_request');
        const { token, user } = await loginUser(userData);
        
        localStorage.setItem('token', token);

        app.config.globalProperties.$http.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };

        commit('auth_success', token, user);
        return 'good';
      } catch (err) {
        commit('auth_error', err);
        console.log(err.response);
        localStorage.removeItem('token');
        if (err.response.data.errors) {
          return err.response.data.errors[0].msg;
        }
        return err.response.data.message;
      }
    },
    async REGISTER({ commit }, userData) {
      try {
        commit('auth_request');
        const data = await regUser(userData);
        const token = data.token;
        const user = data.user;

        localStorage.setItem('token', token);

        app.config.globalProperties.$http.defaults.headers = {
          Authorization: `Bearer ${token}`,
        };
        
        commit('auth_success', token, user);
        return data;
      } catch (err) {
        commit('auth_error', err);
        localStorage.removeItem('token');
        if (err.response.data.errors) {
          return Promise.reject(err.response.data.errors[0].msg);
        }
        return Promise.reject(err.response.data.message);
      }
    },

    LOGOUT({ commit }) {
      localStorage.removeItem('token');
      axios.defaults.headers.common = {};
      axios.defaults.headers.common['Authorization'] = '';
      commit('logout');
    },
  };
  const getters = {
    IS_LOGGED_IN: (state) => !!state.token,
    AUTH_STATUS: (state) => state.status,
  };

  return {
    mutations,
    getters,
    actions,
    state,
  };
};

export default (app) => auth(app);

// export default {
//   mutations,
//   getters,
//   actions,
//   state,
// };
