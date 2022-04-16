<template>
  <div class="container words">
    <WordCard v-for="word in wordsPage" :key="word.id" :word="word" />
    <Pagination :totalPages="totalPages" @change="changePage"/>
  </div>
</template>

<script>
import WordCard from '@/components/WordCard.vue';
import Pagination from '@/components/Pagination.vue';

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
    WordCard, Pagination,
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
  },
};
</script>

<style>


/* .words {
  display: flex;
  flex-direction: column;
  max-width: 800px;
  margin: 10px auto;
} */
</style>
