import {
  getWord,
  getWords,
  createWord,
  deleteWord,
  editWords,
  updateRepetedWords,
  getDescription,
  getWordsToRepeat,
  getWordsToRepeatWithSentences,
} from '@/services/words.service';
import jwt from 'vue-jwt-decode';

//TODO а надо ли это?
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
  setDescription(state, description) {
    state.description = description;
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
      return words;
    } catch (err) {
      commit('setWordError', err);
    }
  },
  
  async FETCH_WORDS_TO_REPEAT({ commit }, timeZone) {
    try {

      const words = await getWordsToRepeat(timeZone);
      commit('setWords', words);
      return words;
    } catch (err) {
      commit('setWordError', err);
    }
  },

  async FETCH_WORDS_TO_REPEAT_WITH_SENTENCES({ commit }, timeZone) {
    try {
      const words = await getWordsToRepeatWithSentences(timeZone);
      commit('setWords', words);
      return words;
    } catch (err) {
      commit('setWordError', err);
    }
  },

  async CREATE_WORDS({ commit }, wordData, headers = {}) {
    try {
      const words = await createWord(wordData, headers);
      return words;
    } catch (err) {
      commit('setWordError', err);
    }
  },
  async EDIT_WORDS({ commit }, wordsData, headers = {}) {
    try {
      const words = await editWords(wordsData, headers);
      return words;
    } catch (err) {
      commit('setWordError', err);
    }
  },

  async UPDATE_REPETED_WORDS({ commit }, wordsData) {
    try {
      const words = await updateRepetedWords(wordsData);
      return words;
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

  async GET_DESCRIPTION({ commit }, word) {
    try {
      const description = await getDescription(word);
      commit('setDescription', description);
      return description;
    } catch (err) {
      commit('setWordError', err);
    }
  },
};

const getters = {
  WORD: ({ word }) => word,
  WORDS: ({ words }) => words,
  DESCRIPTION: ({ description }) => description,
  WORD_ERROR: ({ wordError }) => wordError,
};

const state = () => ({
  word: {},
  words: [],
  description: {},
  wordError: null,
});

export default {
  mutations,
  getters,
  actions,
  state,
};
