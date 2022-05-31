<template>
  <div class="row words" style="max-width: 1000px">
    <div class="d-flex m-auto my-2" style="max-width: 480px">
      <button class="btn btn-outline-info" @click="prevDay">
        <svg class="bi" width="18" height="18" fill="black">
          <use xlink:href="@/assets/bootstrap-icons.svg#chevron-double-left" />
        </svg>
      </button>

      <div
        class="btn btn-outline-info text-black rounded  d-flex align-items-center justify-content-center flex-grow-1 mx-2"
      >
        {{ date }}
      </div>

      <button class="btn btn-outline-info" @click="nextDay">
        <svg class="bi" width="18" height="18" fill="black">
          <use xlink:href="@/assets/bootstrap-icons.svg#chevron-double-right" />
        </svg>
      </button>
    </div>

    <WordCard
      v-for="word in wordsPage"
      :key="word.id"
      :word="word"
      :refreshCards="refreshCards"
      @editWord="editWord"
      @deleteWord="deleteWord"
    />
    <EditWordForm :oldWord="wordNeedToUpdate" @saveWord="saveWord" />
    <Pagination :totalPages="totalPages" @change="changePage" />
  </div>
</template>

<script>
import WordCard from '@/components/WordCardDictionary.vue';
import EditWordForm from '@/components/EditWordForm.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  name: 'ScheduleRepeatWords',
  data() {
    return {
      words: [],
      page: 1,
      limit: 10,
      totalPages: 0,
      wordNeedToUpdate: {},
      refreshCards: 0,

      day: null,
      month: null,
      year: null,
      currentDate: null,
    };
  },
  components: {
    WordCard,
    Pagination,
    EditWordForm,
  },

  methods: {
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

    prevDay() {
      if (
        this.currentDate.getDate() === new Date().getDate() &&
        this.currentDate.getMonth() === new Date().getMonth() &&
        this.currentDate.getYear() === new Date().getYear()
      )
        return;
      this.currentDate.setDate(this.currentDate.getDate() - 1);
      this.saveDate();
    },
    nextDay() {
      this.currentDate.setDate(this.currentDate.getDate() + 1);
      this.saveDate();
    },

    saveDate() {
      this.day = this.currentDate.getDate();
      this.month = this.currentDate.getMonth();
      this.year = this.currentDate.getFullYear();

      this.$store
        .dispatch('FETCH_WORDS_TO_REPEAT', {
          timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          dateToRepeat: this.currentDate,
        })
        .then((repeatWords) => {
          this.words = repeatWords;
          console.log(repeatWords);
        });
    },
  },

  created() {
    this.currentDate = new Date();
    this.saveDate();
  },

  computed: {
    wordsPage: function () {
      return this.words.slice(
        this.page * this.limit - this.limit,
        this.page * this.limit
      );
    },

    date: function () {
      let month = '';
      switch (this.month) {
        case 0:
          month = 'Янавря';
          break;
        case 1:
          month = 'Февраля';
          break;
        case 2:
          month = 'Марта';
          break;
        case 3:
          month = 'Апреля';
          break;
        case 4:
          month = 'Мая';
          break;
        case 5:
          month = 'Июня';
          break;
        case 6:
          month = 'Июля';
          break;
        case 7:
          month = 'Августа';
          break;
        case 8:
          month = 'Сентября';
          break;
        case 9:
          month = 'Октября';
          break;
        case 10:
          month = 'Ноября';
          break;
        case 11:
          month = 'Декабря';
          break;
        default:
          month = '?';
          break;
      }

      return this.day + ' ' + month + ' ' + this.year;
    },
  },
};
</script>
