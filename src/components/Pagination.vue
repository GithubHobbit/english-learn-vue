<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page-item"
        @click="changePage(pageNumber)"
      >
        <a class="page-link" href="#">{{ pageNumber }}</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="#" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  name: 'PaginationComponent',
  props: {
    totalPages: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('change', pageNumber);
    },
  },
};
</script>
<style lang="">
</style>
