<template>
  <div>
    <h1>Новое слово</h1>
    <form @submit.prevent="create" enctype="multipart/form-data">
      <div>Первое слово</div>
      <input v-model="firstLang" required />
      <div>Второе слово</div>
      <input v-model="secondLang" required />
      <input
        type="file"
        id="file"
        ref="file"
        v-on:change="handleFileUpload()"
      />
      <button type="submit">Создать</button>
    </form>
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";
import axios from 'axios';

export default {
  name: 'CreateWord',
  data() {
    return {
      image: null,
      firstLang: '',
      secondLang: '',
    };
  },

  methods: {
    // ...mapActions({
    //   fetchCategories: "FETCH_CATEGORIES",
    //   createRecipe: "CREATE_RECIPE",
    // }),

    handleFileUpload() {
      this.image = this.$refs.file.files[0];
    },
    onReset(event) {
      event.preventDefault();
      this.image = null;
      this.firstLang = '';
      this.secondLang = '';
    },
    async create() {
      let formData = new FormData();
      formData.append('image', this.image);
      formData.append('firstLang', this.firstLang);
      formData.append('secondLang', this.secondLang);

      try {
        await axios
          .post(process.env.VUE_APP_BACKEND_URL + '/word', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            // withCredentials: true,
          })
          .then(() => this.$router.push('/word'));
      } catch (err) {
        console.log(err);
      }

      // this.createRecipe({image: this.image, form: this.form})
      //   .then(() => this.$router.push("/"))
      //   .catch((err) => console.log(err));
    },
  },
};
</script>
