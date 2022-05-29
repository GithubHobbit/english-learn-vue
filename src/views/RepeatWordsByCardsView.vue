<template lang="">
  <div class="row mx-auto" style="max-width: 480px">
    <template v-if="words.length"
      ><div class="mt-2">
        <div class="bg-secondary rounded text-light text-center">
          Слово {{ index + 1 }} из {{ words.length }}
        </div>
      </div>

      <WordCard :word="words[index]" />

      <div class="mb-2 d-flex">
        <div class="btn btn-secondary btn-lg" @click="prevCard">
          <svg class="bi" width="18" height="18" fill="white">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-left"
            />
          </svg>
        </div>

        <div
          class="btn btn-secondary btn-lg text-light d-flex align-items-center justify-content-center flex-grow-1 mx-2"
          @click="changeWord"
        >
          Не вспомнил
        </div>

        <div class="btn btn-secondary btn-lg" @click="nextCard">
          <svg class="bi" width="18" height="18" fill="white">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-right"
            />
          </svg>
        </div>
      </div>
      <div>
        <div
          class="btn btn-warning d-flex justify-content-center"
          @click="updateWords"
        >
          Закончить
        </div>
      </div>
    </template>
    <h5 v-else class="mt-3">Пока нет слов для повторения</h5>
  </div>
</template>
<script>
import WordCard from '@/components/WordCardRepeat.vue';

export default {
  data() {
    return {
      words: [],
      index: 0,
    };
  },
  components: {
    WordCard,
  },
  methods: {
    nextCard() {
      this.index++;
      if (this.index >= this.words.length) this.index = this.words.length - 1;
    },
    prevCard() {
      this.index--;
      if (this.index < 0) this.index = 0;
    },
    changeWord() {
      //this.words[this.index].lastRepetition = new Date();
      //console.log(this.words[this.index].lastRepetition);
      this.words[this.index].numberErrors++;
      this.nextCard();
    },
    updateWords() {
      const words = this.words;
      for (let i in words) {
        words[i].lastRepetition = new Date();
        words[i].numberRepetition++;
      }
      this.$store.dispatch('UPDATE_REPETED_WORDS', { words }).then((words) => {
        console.log(words);
        this.$router.push({ name: 'home' });
      });
    },
  },
  created() {
    this.$store
      .dispatch(
        'FETCH_WORDS_TO_REPEAT',
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )
      .then((repeatWords) => {
        this.words = repeatWords;
      });
  },
};
</script>
