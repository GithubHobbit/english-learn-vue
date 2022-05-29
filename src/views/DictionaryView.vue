<template>
  <div class="row words" style="max-width: 1000px">
    <button
      type="button"
      class="btn btn-outline-success my-2"
      data-bs-toggle="modal"
      data-bs-target="#CreateWordsModal"
    >
      + Добавить новые слова
    </button>
    <CreateWordsForm @addWords="addWords" />
    <EditWordForm :oldWord="wordNeedToUpdate" @saveWord="saveWord" />

    <WordCard
      v-for="word in wordsPage"
      :key="word.id"
      :word="word"
      :refreshCards="refreshCards"
      @editWord="editWord"
      @deleteWord="deleteWord"
    />
    <Pagination :totalPages="totalPages" @change="changePage" />
  </div>
</template>

<script>
import WordCard from '@/components/WordCardDictionary.vue';
import CreateWordsForm from '@/components/CreateWordsForm.vue';
import EditWordForm from '@/components/EditWordForm.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'DictionaryView',
  data() {
    return {
      words: [],
      page: 1,
      limit: 6,
      totalPages: 0,
      wordNeedToUpdate: {},
      refreshCards: 0,
    };
  },
  components: {
    WordCard,
    Pagination,
    CreateWordsForm,
    EditWordForm,
  },

  methods: {
    addWords(words) {
      for (let i = 0; i < words.length; i++) {
        this.words.push(words[i]);
      }
    },

    saveWord(updatedWord) {
      this.words = this.words.filter((word) => {
        return word.id !== updatedWord.id;
      });
      this.words.push(updatedWord);
      this.refreshCards++;
    },

    editWord(word) {
      this.wordNeedToUpdate = word;
    },

    deleteWord(id) {
      this.words = this.words.filter((word) => word.id !== id);
    },
    changePage(pageNumber) {
      this.page = pageNumber;
    },
  },

  mounted() {
    this.$store.dispatch('FETCH_WORDS').then((words) => {
      this.words = words;
      this.totalPages = Math.ceil(this.words.length / this.limit);
    });
  },

  computed: {
    wordsPage: function () {
      return this.words.slice(
        this.page * this.limit - this.limit,
        this.page * this.limit
      );
    },
  },
};
</script>
