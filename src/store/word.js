import {
  getWord,
  getWords,
  createWord,
  deleteWord,
  editWord,
} from '@/services/words.service';
import jwt from 'vue-jwt-decode';

function getDataToken() {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const userData = jwt.decode(token);
      return userData;
    } catch (error) {
      // return error in production env
      console.log(error, 'error from decoding token');
    }
  }
}

const mutations = {
  setWord(state, word) {
    state.word = word;
  },
  setWords(state, words) {
    state.words = words;
  },
  setWordError(state, error) {
    state.wordError = error;
  },
};

const actions = {
  async FETCH_WORD({ commit }, id) {
    try {
      const word = await getWord(id);
      commit('setWord', word);
    } catch (err) {
      commit('setWordError', err);
    }
  },
  async FETCH_WORDS({ commit }) {
    try {
      const {id} = getDataToken();
      const words = await getWords(id);
      commit('setWords', words);
    } catch (err) {
      commit('setWordError', err);
    }
  },
  async CREATE_WORD({ commit }, wordData) {
    try {
      await createWord(wordData);
    } catch (err) {
      commit('setWordError', err);
    }
  },
  async EDIT_WORD({ commit }, { form, id }) {
    console.log(form);
    console.log(id);
    try {
      await editWord(form, id);
    } catch (err) {
      commit('setWordError', err);
    }
  },

  async DELETE_WORD({ commit }, id) {
    try {
      await deleteWord(id);
    } catch (err) {
      commit('setWordError', err);
    }
  },
};

const getters = {
  WORD: ({ word }) => word,
  WORDS: ({ words }) => words,
  WORD_ERROR: ({ wordError }) => wordError,
};

const state = () => ({
  word: {},
  words: [],
  wordError: null,
});

export default {
  mutations,
  getters,
  actions,
  state,
};
