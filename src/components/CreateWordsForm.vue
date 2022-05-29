<template>
  <form
    class="modal fade"
    id="CreateWordsModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="CreateWordsModalLabel"
    aria-hidden="true"
    @submit.prevent=""
    enctype="multipart/form-data"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="CreateWordsModalLabel">Новые слова</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <WordForm
              v-for="(word, index) in newWords"
              :key="index"
              :word="word"
              :index="index"
              @changeWord="changeWord"
              @deleteWord="deleteWord"
            />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-info w-100"
            @click="addWord()"
          >
            + Добавить слово
          </button>
          <button
            @click="create"
            data-bs-dismiss="modal"
            class="btn btn-outline-success w-100"
          >
            Сохранить слова
          </button>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import WordForm from '@/components/WordForm.vue';
export default {
  name: 'CreateWordsForm',

  components: {
    WordForm,
  },
  data() {
    return {
      newWords: [
        {
          firstLang: '',
          secondLang: '',
          example: '',
          translateExample: '',
          picture: null,
        },
      ],
    };
  },

  methods: {
    addWord() {
      this.newWords.push({
        firstLang: '',
        secondLang: '',
        example: '',
        translateExample: '',
        picture: null,
      });
    },
    changeWord(word, index) {
      this.newWords[index] = word;
    },
    deleteWord(index) {
      this.newWords.splice(index, 1);
    },

    ...mapActions({
      createWords: 'CREATE_WORDS',
    }),
    async create() {
      let formData = new FormData();

      for (let i = 0; i < this.newWords.length; i++) {
        if (!this.newWords[i].firstLang || !this.newWords[i].example || !this.newWords[i].secondLang || !this.newWords[i].translateExample) {
          this.newWords.splice(i, 1);
          i--;
          continue;
        }
        const firstLang = this.newWords[i].firstLang.trim();
        const secondLang = this.newWords[i].secondLang.trim();
        const example = this.newWords[i].example.trim();
        const translateExample = this.newWords[i].translateExample.trim();

        formData.append(`firstLang${i}`, firstLang);
        formData.append(`secondLang${i}`, secondLang);
        formData.append(`example${i}`, example);
        formData.append(`translateExample${i}`, translateExample);
        formData.append(`picture${i}`, this.newWords[i].picture);
      }

      this.createWords(formData, { 'Content-Type': 'multipart/form-data' })
        .then((words) => {
          console.log(words);
          this.$emit('addWords', words);
        })
        .catch((err) => {
          console.log(err);
        });

      // this.newWords = [{}];
    },
  },
};
</script>
