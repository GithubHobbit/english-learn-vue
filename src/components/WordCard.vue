<template>
  <div class="row word">
    <div class="col-10 content">
      <div class="col-4 firstLang">{{ word.firstLang }}</div>
      <div class="col-4 secondLang">{{ word.secondLang }}</div>
      <img class="col-4 picture" :src="word.picture" alt="" />
    </div>
    <div class="col-2 d-flex flex-column align-items-center tools">
      <div class="edit">
        <svg class="bi" width="32" height="32" fill="currentColor">
          <use xlink:href="bootstrap-icons.svg#trash" />
        </svg>
      </div>
      <div class="delete" @click="deleteWord(word.id)">
        <svg class="bi" width="32" height="32" fill="currentColor">
          <use xlink:href="bootstrap-icons.svg#pencil" />
        </svg>
      </div>
    </div>
  </div>
  <!-- <div class="row word">
    <div class="content">
      <div class="translate">
        <div class="firstLang">{{ word.firstLang }}</div>
        <div class="secondLang">{{ word.secondLang }}</div>
      </div>
      <div class="picture">
        <img :src="word.picture" alt="" />
      </div>
    </div>
    <div class="tools">
      <div class="edit">
        <img src="@/../public/icons/editButton.svg" alt="" />
      </div>
      <div class="delete" @click="deleteWord(word.id)">
        <img src="@/../public/icons/deleteButton.svg" alt="" />
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'WordCard',
  props: {
    word: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    deleteWord() {
      this.$store
        .dispatch('DELETE_WORD', this.word.id)
        .then(() => this.$router.go(0)); // TODO Нужно поменять
    },
  },
};
</script>
<style>
.picture {
  width: 10rem;
}
</style>
