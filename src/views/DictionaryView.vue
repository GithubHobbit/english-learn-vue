<template>
  <div class="words">
    <WordCard v-for="word in wordsPage" :key="word.id" :word="word" />
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          class="page-item"
          @click="changePage(pageNumber)"
        >
          <a class="page-link" href="#">{{ pageNumber }}</a>
        </li>
        <li class="page-item">
          <a class="page-link" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import WordCard from '@/components/WordCard.vue';
export default {
  name: 'DictionaryView',
  data() {
    return {
      words: [],
      page: 1,
      limit: 2,
      totalPages: 0,
    };
  },
  components: {
    WordCard,
  },

  methods: {
    changePage(pageNumber) {
      this.page = pageNumber;
    }
  },

  mounted() {
    this.$store
      .dispatch('FETCH_WORDS')
      .then((words) => {
        this.words = words;
        this.totalPages = Math.ceil(this.words.length / this.limit);
      });
  },

  computed: {
    wordsPage: function() {
      return this.words.slice(this.page * this.limit - this.limit, this.page * this.limit);
    }
    // isLoggedIn: function () {
    //   return this.$store.getters.isLoggedIn;
    // },
    // totalPages: function () {
    //   return Math.ceil(this.words.length / this.limit);
    // },
  },
};
</script>

<style>
html {
  font-family: 'Open Sans', sans-serif;
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
</style>
