
<template>
  <div class="words">
    <div class="word" v-for="word in words" :key="word.id">
      <div class="content">
        <div class="translate">
          <div class="firstLang">{{word.firstLang}}</div>
          <div class="secondLang">{{word.secondLang}}</div>
        </div>
        <div class="picture">
          <img
            :src="word.picture"
            alt=""
          />
        </div>
      </div>
      <div class="tools">
        <a href="">
          <div class="edit">
            <img src="@/../public/icons/editButton.svg" alt="" />
          </div>
        </a>
        <a href="">
          <div class="delete">
            <img src="@/../public/icons/deleteButton.svg" alt="" />
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DictionaryView",
  methods: {
    ...mapActions({
      fetchWords: "FETCH_WORDS",
    }),
  },
  mounted() {
    this.fetchWords();
  },

  computed: {
    // isLoggedIn: function () {
    //   return this.$store.getters.isLoggedIn;
    // },
    ...mapGetters({
      words: "WORDS",
    }),
  },
};
</script>

<style>
html {
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  /*background-color: #505160;*/
  color: #f6f7fb;
}

.words {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 10px auto;
}

.word {
  display: flex;
  justify-content: space-between;
  border: 2px solid #E1B16A;
  padding: 10px;
}

.word + .word {
  margin-top: 10px;
}

.firstLang,
.secondLang {
  margin-bottom: 10px;
  word-break: break-word;
}

.content {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.picture {
  width: 10rem;
}

.picture img {
  width: 100%;
  vertical-align: bottom; /* у блока есть вертикальное выравнивание, 
  если добавить в него картинку, то внизу появится лишний отступ, 
  равный междустрочному интервалу, данное свойство убираетэтот  отступ. 
  Аналогично можно добавить в div свойство  line-height: 0;*/
  border-radius: 10px;

}

.tools img {
  width: 25px;
  filter: invert(1) sepia(30%);
}

@media (min-width: 500px) {
  .translate {
    display: flex;
  }
  .firstLang {
    flex: 1 1 0;
  }

  .secondLang {
    flex: 1 1 0;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 2px dashed #E1B16A;
  }
}

@media (min-width: 800px) {
  .translate {
    display: flex;
    flex-grow: 1;
  }
  .firstLang {
    flex: 1 1 0;
  }

  .secondLang {
    flex: 1 1 0;
    padding-left: 10px;
    border-left: 2px dashed #E1B16A;
  }

  .picture {
    flex-grow: 0;
    min-width: 10rem;
    margin-left: 10px;
  }
  .content {
    display: flex;
    flex-direction: row;
  }
}
</style>
