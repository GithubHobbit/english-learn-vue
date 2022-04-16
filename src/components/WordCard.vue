<template>
  <div class="word">
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
  </div>
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
.word {
  display: flex;
  justify-content: space-between;
  border: 2px solid #e1b16a;
  padding: 10px;
}

.word + .word {
  margin-top: 10px;
}

.firstLang,
.secondLang {
  margin-bottom: 10px;
  word-break: break-word;
}

.content {
  margin-right: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.picture {
  width: 10rem;
}

.picture img {
  width: 100%;
  vertical-align: bottom; /* у блока есть вертикальное выравнивание, 
  если добавить в него картинку, то внизу появится лишний отступ, 
  равный междустрочному интервалу, данное свойство убираетэтот  отступ. 
  Аналогично можно добавить в div свойство  line-height: 0;*/
  border-radius: 10px;
}

.tools img {
  width: 25px;
  /* filter: invert(1) sepia(30%); */
}

@media (min-width: 500px) {
  .translate {
    display: flex;
  }
  .firstLang {
    flex: 1 1 0;
  }

  .secondLang {
    flex: 1 1 0;
    padding-left: 10px;
    margin-left: 10px;
    border-left: 2px dashed #e1b16a;
  }
}

@media (min-width: 800px) {
  .translate {
    display: flex;
    flex-grow: 1;
  }
  .firstLang {
    flex: 1 1 0;
  }

  .secondLang {
    flex: 1 1 0;
    padding-left: 10px;
    border-left: 2px dashed #e1b16a;
  }

  .picture {
    flex-grow: 0;
    min-width: 10rem;
    margin-left: 10px;
  }
  .content {
    display: flex;
    flex-direction: row;
  }
}
</style>
