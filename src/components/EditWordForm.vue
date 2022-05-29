<template>
  <form
    class="modal fade"
    id="EditWordModal"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="EditWordModalLabel"
    aria-hidden="true"
    @submit.prevent=""
    enctype="multipart/form-data"
  >
    <div class="modal-dialog modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="EditWordModalLabel">Изменить слово</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Закрыть"
          ></button>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <WordForm :word="oldWord" :index="-1" @changeWord="changeWord" />
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            data-bs-dismiss="modal"
            class="btn btn-outline-success w-100"
            @click="saveWord()"
          >
            + Сохранить слово
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
  name: 'EditWordsForm',

  components: {
    WordForm,
  },

  data() {
    return {
      newWord: this.oldWord,
    };
  },

  props: {
    oldWord: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },

  methods: {
    changeWord(word) {
      this.newWord = word;
    },

    ...mapActions({
      editWords: 'EDIT_WORDS',
    }),
    async saveWord() {
      let formData = new FormData();

      formData.append(`id0`, this.newWord.id);
      formData.append(`firstLang0`, this.newWord.firstLang);
      formData.append(`secondLang0`, this.newWord.secondLang);
      formData.append(`example0`, this.newWord.example);
      formData.append(`translateExample0`, this.newWord.translateExample);
      formData.append(`picture0`, this.newWord.picture);

      this.editWords(formData, { 'Content-Type': 'multipart/form-data' })
        .then((words) => {
          console.log(words);
          console.log(words[0]);
          this.$emit('saveWord', words[0] /**this.newWord */);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
