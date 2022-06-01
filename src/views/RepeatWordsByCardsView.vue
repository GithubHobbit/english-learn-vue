<template lang="">
  <div class="row mx-auto" style="max-width: 480px">
    <template v-if="words.length"
      ><div class="mt-2">
        <div class="border border-primary rounded text-center">
          Слово {{ index + 1 }} из {{ words.length }}
        </div>
      </div>

      <WordCard :word="words[index]" />

      <div class="d-flex">
        <div
          class="flex-grow-1 border border-primary text-center btn-lg m-1"
          style="cursor: pointer"
          @click="prevCard"
        >
          <svg class="bi" width="18" height="18" fill="black">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-left"
            />
          </svg>
        </div>

        <div
          class="flex-grow-1 border border-primary text-center btn-lg m-1"
          style="cursor: pointer"
          @click="nextCard"
        >
          <svg class="bi" width="18" height="18" fill="black">
            <use
              xlink:href="@/assets/bootstrap-icons.svg#chevron-double-right"
            />
          </svg>
        </div>
      </div>

      <div class="d-flex">
        <div
          :class="[
            'w-50',
            'btn',
            'btn-secondary',
            { 'btn-success': results[index] === true },
            'btn-lg',
            'm-1',
          ]"
          @click="isRight(true)"
        >
          Вспомнил
        </div>
        <div
          :class="[
            'w-50',
            'btn',
            'btn-secondary',
            { 'btn-danger': results[index] === false },
            'btn-lg',
            'm-1',
          ]"
          @click="isRight(false)"
        >
          Не вспомнил
        </div>
      </div>
      <div>
        <div
          class="btn btn-warning d-flex justify-content-center m-1"
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
      results: [],
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
    isRight(result) {
      if (this.results[this.index] === result) this.results[this.index] = null;
      else this.results[this.index] = result;
    },
    updateWords() {
      for (let i in this.results) {
        if (this.results[i] === null) continue;
        if (this.results[i] === false) this.words[i].numberErrors++;
        this.words[i].lastRepetition = new Date();
        this.words[i].numberRepetition++;
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
        while (this.results.length < this.words.length) {
          this.results.push(null);
        }
      });
  },
};
</script>
