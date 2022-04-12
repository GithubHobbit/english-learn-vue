import Vuex from "vuex";
import word from "./word";
import auth from "./auth";

export default new Vuex.Store({
  modules: {
    word,
    auth,
  },
});
