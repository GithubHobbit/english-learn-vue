<template>
  <div>
    <Menubar :model="items">
      <template #start>
        <img
          alt="logo"
          src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png"
          height="40"
          class="mr-2"
        />
      </template>
      <template #end>
        <InputText placeholder="Search" type="text" />
      </template>
    </Menubar>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          label: "Home",
          icon: "pi pi-home",
        },
        {
          label: "About",
          icon: "pi pi-exclamation-circle",
        },
        {
          label: "Users",
          visible: () => this.isLoggedIn(),
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Words",
              icon: "pi pi-book",
              to: "/word",
            },
            {
              label: "Sign out",
              icon: "pi pi-sign-out",
              command: () => this.logout(),
            },
          ],
        },
        {
          label: "Guest",
          visible: () => !this.isLoggedIn(),
          icon: "pi pi-fw pi-user",
          items: [
            {
              label: "Sign in",
              icon: "pi pi-sign-in",
              to: "/login",
            },
            {
              label: "Sign up",
              icon: "pi pi-fw pi-user-plus",
              to: "/register",
            },
          ],
        },
                {
          label: "Create Word",
          icon: "pi pi-exclamation-circle",
          to: "/word/create"
        },
      ],
    };
  },
  methods: {
    isLoggedIn() {
      return this.$store.getters.IS_LOGGED_IN;
    },
    logout() {
      this.$store.dispatch("LOGOUT").then(() => {
        this.$router.push("/login");
      });
    },
  },
};
</script>
