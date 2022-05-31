<template lang="">
  <div class="row mx-auto" style="max-width: 600px">
    <div v-if="words.length">
      <div class="mt-2">
        <div class="bg-success rounded text-light text-center">
          Всего слов: {{ words.length }}
        </div>
      </div>

      <div v-for="(word, index) in words" :key="index" class="">
        <div
          class="row border-bottom border-2 border-primary py-4 my-3"
          style="min-height: 142px"
        >
          <div class="col-8">
            <div class="mb-2">{{ word.secondLang }}</div>
            <div
              v-if="wordsResult[index].isPrompted === true"
              style="color: red"
            >
              {{ word.firstLang }}
            </div>
            <input
              v-else
              type="text"
              class="form-control mb-2"
              v-model="wordsResult[index].answer"
              placeholder="Слово"
            />

            <div
              v-if="wordsResult[index].isRightAnswer === true"
              style="color: green"
            >
              Отлично!
            </div>
            <div
              v-else-if="wordsResult[index].isRightAnswer === false"
              style="color: red"
            >
              Не правильно
            </div>
          </div>
          <div class="col-4 d-flex flex-column align-content-stretch">
            <button
              class="flex-grow-1 btn btn-info my-1"
              @click="checkWord(index)"
            >
              Проверить
            </button>
            <button
              class="flex-grow-1 btn btn-warning"
              @click="promptWord(index)"
            >
              Подсказать
            </button>
          </div>
        </div>
      </div>
      <button class="btn btn-outline-success w-100" @click="updateWords">
        Закончить
      </button>
    </div>
    <h5 v-else class="mt-3">Пока нет слов для повторения</h5>
  </div>
</template>
<script>
export default {
  data() {
    return {
      words: [],
      wordsResult: [],
      index: 0,
    };
  },
  methods: {
    checkWord(index) {
      if (this.words[index].firstLang === this.wordsResult[index].answer) {
        this.wordsResult[index].isRightAnswer = true;
      } else {
        this.wordsResult[index].isRightAnswer = false;
        this.wordsResult[index].isPrompted = true;
      }
    },
    promptWord(index) {
      this.wordsResult[index].isPrompted = true;
    },
    updateWords() {
      for (let word in this.words) {
        if (
          !('isRightAnswer' in this.wordsResult[word]) &&
          this.wordsResult[word].isPrompted !== true
        )
          continue;

        this.words[word].lastRepetition = new Date();
        this.words[word].numberRepetition++;
        if (
          this.wordsResult[word].isRightAnswer === false ||
          this.wordsResult[word].isPrompted
        )
          this.words[word].numberErrors++;
      }
      this.$store
        .dispatch('UPDATE_REPETED_WORDS', { words: this.words })
        .then((words) => {
          console.log(words);
          this.$router.push({ name: 'home' });
        });
    },
  },

  created() {
    this.$store
      .dispatch('FETCH_WORDS_TO_REPEAT', {
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        dateToRepeat: new Date(),
      })
      .then((repeatWords) => {
        this.words = repeatWords;
        for (let i = 0; i < this.words.length; i++) this.wordsResult.push({});
        console.log(repeatWords);
      });
  },
};
</script>
