<template>
  <div class="container" style="font-size: 18px; max-width: 1000px;">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  components: {
    Header,
  },
};
</script>

