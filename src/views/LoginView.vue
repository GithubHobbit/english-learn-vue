<template>
  <div>
    <form @submit.prevent="loginUser">
      <h1>Логин</h1>
      <div>
        {{ error }}
      </div>
      
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="form.email"
        placeholder="Введите логин"
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
  name: "LoginView",

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
    loginUser: function () {
      this.$store
        .dispatch("LOGIN", this.form)
        .then(() => this.$router.push("/word"))
        .catch((err) => {
          this.visibleAlert = true;
          this.error = err;
        });
    },
  },
};
</script>
