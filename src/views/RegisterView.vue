<template>
  <div>
    <h1>Регистрация</h1>
    <form @submit.prevent="registerUser" @reset="onReset">
      <div>
        {{ error }}
      </div>
      
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="form.email"
        placeholder="Введите email"
        required
      />

      <label for="password">Пароль:</label>
      <input
        type="password"
        v-model="form.password"
        id="password"
        placeholder="Введите пароль"
        required
      />
          <button type="submit"
            >Отправить
          </button>
          <button type="reset">
            Сбросить
          </button>
    </form>
  </div>
</template>

<script>
export default {
  name: "RegisterView",

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      visibleAlert: false,
      error: "",
    };
  },
  methods: {
    registerUser: function () {
      this.$store
        .dispatch("REGISTER", this.form)
        .then(() => this.$router.push("/"))
        .catch((err) => {
          this.visibleAlert = true;
          this.error = err;
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = "";
      this.form.password = "";
    },
  },
};
</script>
