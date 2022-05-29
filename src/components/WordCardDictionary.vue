<template>
  <div class="p-2 px-4 m-0 my-2 border border-2 rounded border-warning">
    <div class="row justify-content-between">
      <div class="col-10 col-sm-11 d-flex flex-column justify-content-between">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="row">
              <div class="firstLang col-sm-6">
                <p>{{ word.firstLang }}</p>
              </div>
              <div class="secondLang col-sm-6">
                <p>{{ word.secondLang }}</p>
              </div>
            </div>

            <div v-if="isShowExample" class="row example">
              <hr />
              <div class="col-sm-6">
                <p class="firstLang">{{ word.example }}</p>
              </div>
              <div class="col-sm-6">
                <p class="secondLang">{{ word.translateExample }}</p>
              </div>
            </div>
          </div>

          <div
            v-if="word.picture"
            class="picture col-12 col-md-4 d-flex align-items-start justify-content-md-end"
          >
            <hr class="d-md-none" />
            <img :src="word.picture" alt="" />
          </div>
        </div>
        <div style="color: green">
          Правильные ответы:
          <span style="color: orange">{{
            word.numberRepetition - word.numberErrors
          }}</span>
          из {{ word.numberRepetition }}
        </div>
      </div>

      <div class="col-2 col-sm-1 d-flex flex-column align-items-end tools">
        <a
          class="edit my-1"
          @click="deleteWord(word.id)"
          style="cursor: pointer"
        >
          <svg class="delete bi" width="25" height="25" fill="red">
            <use xlink:href="@/assets/bootstrap-icons.svg#trash" />
          </svg>
        </a>
        <a
          class="edit my-1"
          style="cursor: pointer"
          data-bs-toggle="modal"
          data-bs-target="#EditWordModal"
        >
          <svg
            class="bi"
            width="25"
            height="25"
            fill="green"
            @click="$emit('editWord', word)"
          >
            <use xlink:href="@/assets/bootstrap-icons.svg#pencil" />
          </svg>
        </a>
        <a class="example my-1" style="cursor: pointer" @click="showExample">
          <svg class="bi" width="25" height="25" fill="blue">
            <use xlink:href="@/assets/bootstrap-icons.svg#question-octagon" />
          </svg>
        </a>
        <!-- <a class="delete my-1" style="cursor: pointer" @click="test">
          <svg class="bi" width="25" height="25" fill="blue">
            <use xlink:href="@/assets/bootstrap-icons.svg#question-octagon" />
          </svg>
        </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'WordCard',
  data() {
    return {
      isShowExample: false,
    };
  },
  props: {
    word: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    editWord() {},
    deleteWord() {
      this.$store.dispatch('DELETE_WORD', this.word.id).then(() => {
        this.$emit('deleteWord', this.word.id);
      }); // TODO Нужно поменять
    },

    showExample() {
      this.isShowExample === true
        ? (this.isShowExample = false)
        : (this.isShowExample = true);
    },

    async test() {
      try {
        const id = this.word.id;
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const date = new Date();
        const offset = new Date().getTimezoneOffset();
        await axios
          .put(`${process.env.VUE_APP_BACKEND_URL}/word/${id}`, {
            timeZone,
            date,
            offset,
          })
          .then(() => this.$router.push('/word'));
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style>
.firstLang,
.secondLang {
  word-break: break-word;
}

.picture img {
  width: 100%;
  max-width: 10rem;
  border-radius: 10px;
}
</style>
