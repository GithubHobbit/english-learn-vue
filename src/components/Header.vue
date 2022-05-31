<template lang="">
  <nav class="row navbar navbar-expand-md navbar-dark bg-primary bg-gradient">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img src="@/assets/logo.png" width="50"/>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarColor01">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <router-link class="nav-link active" to="/"
              >Home
              <span class="visually-hidden">(current)</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about">About</router-link>
          </li>
        </ul>

        <form class="d-flex">
          <input
            class="form-control me-sm-2"
            type="text"
            placeholder="Search"
          />
          <button class="btn btn-secondary my-2 my-sm-0" type="submit">
            Search
          </button>
        </form>
        <ul class="navbar-nav">
          <li v-if="isLoggedIn()" class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              href="#"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
              >Профиль</a
            >
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/word">Words</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="#" @click="logout"
                >Sign out</router-link
              >
            </div>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li v-if="!isLoggedIn()" class="nav-item">
            <router-link class="nav-link" to="/register">Sign up</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  name: 'HeaderComponent',
  methods: {
    isLoggedIn() {
      return this.$store.getters.IS_LOGGED_IN;
    },
    logout(e) {
      e.preventDefault();
      this.$store.dispatch('LOGOUT').then(() => {
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style lang=""></style>
