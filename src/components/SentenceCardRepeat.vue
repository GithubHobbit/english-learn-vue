<template lang="">
  <div class="">
    <div>{{ translateExample }}</div>
    <div>
      <div
        v-for="(word, index) in answerArr"
        :key="index"
        class="d-inline-block btn my-2 mx-1 text-dark bg-light"
        @click="moveToSentence(index)"
        style="min-height: 2em"
      >
        {{ word }}
      </div>
      <div
        v-for="i in this.sizeWords - this.answerArr.length"
        :key="i"
        class="d-inline-block btn my-2 mx-1 text-light bg-light"
      >
        {{ i }}
      </div>
    </div>
    <hr class="" />
    <div>
      <div
        v-for="(word, index) in sentenceArr"
        :key="index"
        class="d-inline-block text-white btn my-2 mx-1 bg-dark"
        @click="moveToAnswer(index)"
      >
        {{ word }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'SentenceCardRepeat',
  data() {
    return {
      sentenceArr: [],
      answerArr: [],
      sizeWords: 0,
    };
  },
  //TODO сделать нормальную переотрисовку
  props: {

    example: {
      type: String,
      default: '',
    },
    translateExample: {
      type: String,
      default: '',
    }
  },
  methods: {
    moveToAnswer(index) {
      const word = this.sentenceArr[index];
      this.sentenceArr.splice(index, 1);
      this.answerArr.push(word);
    },
    moveToSentence(index) {
      const word = this.answerArr[index];
      this.answerArr.splice(index, 1);
      this.sentenceArr.push(word);
    },
  },
  created() {
    this.sentenceArr = this.example.split(' ');
    this.sentenceArr.sort(() => Math.random() - 0.5);
    this.sizeWords = this.sentenceArr.length;
  },
  watch: {
    example(newExample) {
        this.sentenceArr = newExample.split(' ');
        this.sentenceArr.sort(() => Math.random() - 0.5);
        this.sizeWords = this.sentenceArr.length;
        this.answerArr = [];
    },

    answerArr: {
      handler(newAnswerArr) {
        let sentence = '';
        for (let i = 0; i < newAnswerArr.length; i++)
          sentence += newAnswerArr[i] + ' ';
        this.$emit('changeSentence', sentence.trim());
      },
      deep: true,
    },
  },
};
</script>
