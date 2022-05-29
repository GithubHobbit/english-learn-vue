<template lang="">
  <div class="row mx-auto" style="max-width: 480px">
    <template v-if="words.length"
      ><div class="mt-2">
        <div class="bg-secondary rounded text-light text-center">
          Слово {{ index + 1 }} из {{ words.length }}
        </div>
      </div>

      <SentenceCard
        :example="words[index].example"
        :translateExample="words[index].translateExample"
        @changeSentence="changeSentence"
      />
      <div v-if="isRight === true" style="color: green">Отлично!</div>
      <div v-else-if="isRight === false" style="color: red">Не правильно</div>
      <div v-if="isRight === true" style="color: green">
        {{ words[index].example }}
      </div>
      <div v-else-if="isRight === false" style="color: red">
        {{ words[index].example }}
      </div>
      <div class="d-flex">
        <div
          v-if="isChecked === true"
          class="btn btn-success btn-lg text-light flex-grow-1 m-1"
          @click="nextCard"
        >
          Дальше
        </div>
        <div
          v-else
          class="btn btn-secondary btn-lg text-light flex-grow-1 m-1"
          @click="checkWord"
        >
          Проверить
        </div>
        <div
          class="btn btn-warning btn-lg flex-grow-1 m-1"
          @click="$router.push({ name: 'home' })"
        >
          Закончить
        </div>
      </div>
    </template>
    <h5 v-else class="mt-3">Пока нет слов для повторения</h5>
  </div>
</template>
<script>
import SentenceCard from '@/components/SentenceCardRepeat.vue';

export default {
  data() {
    return {
      words: [],
      currentSentence: '',
      index: 0,
      isChecked: false,
      isRight: null,
    };
  },
  components: {
    SentenceCard,
  },
  methods: {
    nextCard() {
      if (this.index >= this.words.length) this.$router.push({ name: 'home' });

      const word = this.words[this.index];
      word.lastRepetition = new Date();
      word.numberRepetition++;
      this.$store
        .dispatch('UPDATE_REPETED_WORDS', { words: [word] })
        .then((words) => {
          console.log(words);
        });

      this.index++;
      this.isChecked = false;
      this.isRight = null;
      this.currentSentence = '';
    },

    checkWord() {
      this.isChecked = true;
      if (this.words[this.index].example !== this.currentSentence) {
        this.words[this.index].numberErrors++;
        this.isRight = false;
      } else this.isRight = true;
    },

    changeSentence(sentence) {
      this.currentSentence = sentence;
    },
  },
  created() {
    this.$store
      .dispatch(
        'FETCH_WORDS_TO_REPEAT_WITH_SENTENCES',
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
      .then((repeatWords) => {
        this.words = repeatWords;
        console.log(this.words);
      });
  },
};
</script>
