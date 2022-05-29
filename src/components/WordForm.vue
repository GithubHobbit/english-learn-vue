<template lang="">
  <div class="" :id="index">
    <div class="row">
      <div class="col-2 d-flex align-items-center">
        <h3 v-if="index !== null">{{ index + 1 }}.</h3>
      </div>
      <div class="col-10 d-flex justify-content-end">
        <div
          type="button"
          class="delete btn btn-danger mb-2"
          style="cursor: pointer"
          v-if="index !== null"
          @click="$emit('deleteWord', index)"
        >
          <svg class="bi" width="22" height="22" fill="white">
            <use xlink:href="@/assets/bootstrap-icons.svg#trash" />
          </svg>
        </div>

        <div class="btn btn-dark mb-2 ms-2">
          <input
            type="file"
            :id="`file${index}`"
            class="inputFile"
            accept=".png, .jpg, .jpeg"
            @change="handleFileUpload(index, $event)"
          />
          <label :for="`file${index}`" style="cursor: pointer">
            <svg class="bi" width="22" height="22" fill="white">
              <use xlink:href="@/assets/bootstrap-icons.svg#camera" />
            </svg>
          </label>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="mb-2 col-6">
        <input
          type="text"
          class="form-control"
          placeholder="Слово"
          v-model="newWord.firstLang"
        />
      </div>

      <div class="mb-2 col-6">
        <button
          class="btn btn-success w-100"
          @click="getWordDescription(index)"
        >
          Описание
        </button>
      </div>
      <div v-if="notFindWord" style="color: red">Слово не найдено</div>
    </div>
    <textarea
      class="form-control mb-2"
      id="exampleTextarea"
      rows="2"
      placeholder="Перевод:"
      v-bind:value="wordDescription.translate"
      @input="newWord.secondLang = $event.target.value"
    ></textarea>

    <div class="row mb-2" :id="`wordDescription${index}`" style="display: none">
      <div class="d-flex">
        <button class="btn btn-secondary" @click="prevExample">
          <svg class="bi" width="18" height="18" fill="white">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-left"
            />
          </svg>
        </button>

        <div
          class="bg-secondary rounded text-light d-flex align-items-center justify-content-center flex-grow-1 mx-2"
        >
          {{ indexExample + 1 }} пример из {{ numberExamples }}
        </div>

        <button class="btn btn-secondary" @click="nextExample">
          <svg class="bi" width="18" height="18" fill="white">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-right"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="row">
      <div class="mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Пример предложения:"
          :value="wordDescription.englishExamples[indexExample]"
          @input="newWord.example = $event.target.value"
        />
      </div>
      <div class="mb-2">
        <input
          type="text"
          class="form-control"
          placeholder="Пример перевода:"
          :value="wordDescription.russianExamples[indexExample]"
          @input="newWord.translateExample = $event.target.value"
        />
      </div>
    </div>

    <div class="picture"><img width="150" :src="newWord.picture" alt="" /></div>
    <hr />
  </div>
</template>

<script>
export default {
  name: 'WordForm',
  data() {
    return {
      newWord: this.word,
      indexExample: 0,
      wordDescription: {
        translate: '',
        englishExamples: [],
        russianExamples: [],
      },
      notFindWord: false,
    };
  },
  props: {
    word: {
      type: Object,
      default: function () {
        return {
          firstLang: '',
          secondLang: '',
          example: '',
          translateExample: '',
          picture: null,
        };
      },
    },
    index: {
      type: Number,
      default: null,
    },
  },

  methods: {
    handleFileUpload(index, event) {
      this.newWord.picture = event.target.files[0];
      const word = document.getElementById(index);
      const preview = word.querySelector('img');
      const reader = new FileReader();
      reader.onloadend = function () {
        preview.src = reader.result;
      };
      reader.readAsDataURL(this.newWord.picture);
    },

    async getWordDescription(index) {
      const word = this.newWord.firstLang;
      this.$store.dispatch('GET_DESCRIPTION', word).then((description) => {
        console.log(description.translate);
        if (description.translate === '') {
          this.notFindWord = true;
          this.wordDescription = {
            translate: '',
            englishExamples: [],
            russianExamples: [],
          };
          this.newWord.secondLang = '';
          this.newWord.example = '';
          this.newWord.translateExample = '';
          return;
        } else this.notFindWord = false;

        this.wordDescription = description;
        this.newWord.secondLang = description.translate;
        this.newWord.example = description.englishExamples[0];
        this.newWord.translateExample = description.russianExamples[0];
        this.indexExample = 0;
        document.getElementById(`wordDescription${index}`).style.display =
          'flex';
      });
    },

    prevExample() {
      this.indexExample - 1 < 0
        ? (this.indexExample = this.numberExamples - 1)
        : this.indexExample--;
    },
    nextExample() {
      this.indexExample + 1 >= this.numberExamples
        ? (this.indexExample = 0)
        : this.indexExample++;
    },
  },

  computed: {
    numberExamples() {
      const englishNumber = this.wordDescription.englishExamples.length;
      const russianNumber = this.wordDescription.russianExamples.length;

      return englishNumber < russianNumber ? englishNumber : russianNumber;
    },
  },

  watch: {
    indexExample(index) {
      this.newWord.example = this.wordDescription.englishExamples[index];
      this.newWord.translateExample =
        this.wordDescription.russianExamples[index];
    },

    word: {
      handler(newWord) {
        this.newWord = { ...newWord };
        this.wordDescription.translate = this.newWord.secondLang;
        this.wordDescription.englishExamples.push(this.newWord.example);
        this.wordDescription.russianExamples.push(
          this.newWord.translateExample
        );
      },
    },
    newWord: {
      handler(newWord) {
        this.$emit('changeWord', newWord, this.index);
      },
      deep: true,
    },
  },
};
</script>

<style>
.inputFile {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
}
.picture img {
  width: 100%;
  max-width: 10rem;
  border-radius: 10px;
}
</style>
