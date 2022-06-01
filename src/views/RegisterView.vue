<template>
  <form
    class="m-auto"
    style="max-width: 480px"
    @submit.prevent="registerUser"
    @reset="onReset"
  >
    <fieldset>
      <legend><h1>Регистрация</h1></legend>
      <div>
        {{ error }}
      </div>
      <div class="form-group">
        <label for="email" class="form-label mt-4">Почта</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="form.email"
          placeholder="Введите логин"
          aria-describedby="emailHelp"
          required
        />
        <small id="emailHelp" class="form-text text-muted"
          >We'll never share your email with anyone else.</small
        >
      </div>

      <div class="form-group mb-4">
        <label for="exampleInputPassword1" class="form-label mt-4"
          >Пароль</label
        >
        <input
          type="password"
          class="form-control"
          v-model="form.password"
          id="password"
          placeholder="Введите пароль"
          required
        />
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary w-50 m-1">Создать</button>
        <button type="reset" class="btn btn-danger w-50 m-1">Очистить</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: 'RegisterView',

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      visibleAlert: false,
      error: '',
    };
  },
  methods: {
    registerUser: function () {
      this.$store
        .dispatch('REGISTER', this.form)
        .then(() => this.$router.push('/'))
        .catch((err) => {
          this.visibleAlert = true;
          this.error = err;
        });
    },
    onReset(event) {
      event.preventDefault();
      this.form.email = '';
      this.form.password = '';
    },
  },
};
</script>
