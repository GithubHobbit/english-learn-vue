<template lang="">
  <div class="m-auto d-flex flex-column mt-4" style="max-width: 480px">
    <div class="d-flex">
      <button
        type="button"
        class="btn btn-outline-success btn-lg w-50 m-1"
        data-bs-toggle="modal"
        data-bs-target="#CreateWordsModal"
      >
        + Слова
      </button>
      <CreateWordsForm />

      <router-link class="btn btn-outline-primary btn-lg w-50 m-1" to="/word"
        >Словарь</router-link
      >
    </div>

    <hr />

    <router-link
      class="d-flex text-decoration-none my-1"
      to="/repeat_words_by_cards"
    >
      <div class="btn btn-dark btn-lg">
        <svg class="bi" width="25" height="25" fill="none">
          <use xlink:href="@/assets/bootstrap-icons.svg#card-heading" />
        </svg>
      </div>
      <div class="btn btn-dark btn-lg flex-grow-1">Карточки</div>
      <div class="btn btn-dark btn-lg d-flex align-items-center">
        <svg class="bi" width="25" height="25" fill="white">
          <use xlink:href="@/assets/bootstrap-icons.svg#card-heading" />
        </svg>
      </div>
    </router-link>

    <router-link
      class="d-flex text-decoration-none my-1"
      to="/repeat_words_by_write_words"
    >
      <div class="btn btn-warning btn-lg">
        <svg class="bi" width="25" height="25" fill="none">
          <use xlink:href="@/assets/bootstrap-icons.svg#pencil-square" />
        </svg>
      </div>
      <div class="btn btn-warning btn-lg flex-grow-1">Правописание</div>
      <div class="btn btn-warning btn-lg d-flex align-items-center">
        <svg class="bi" width="25" height="25" fill="white">
          <use xlink:href="@/assets/bootstrap-icons.svg#pencil-square" />
        </svg>
      </div>
    </router-link>

    <router-link
      class="d-flex text-decoration-none my-1"
      to="/repeat_words_by_build_a_sentence"
    >
    <div class="btn btn-info btn-lg">
        <svg class="bi" width="25" height="25" fill="none">
          <use xlink:href="@/assets/bootstrap-icons.svg#body-text" />
        </svg>
      </div>
      <div class="btn btn-info btn-lg flex-grow-1">Составить предложение</div>
      <div class="btn btn-info btn-lg d-flex align-items-center">
        <svg class="bi" width="25" height="25" fill="white">
          <use xlink:href="@/assets/bootstrap-icons.svg#body-text" />
        </svg>
      </div>
    </router-link>

    <hr />

    <router-link
      class="btn btn-outline-primary btn-lg m-1"
      to="schedule_repeat_words"
      >Расписание</router-link
    >
  </div>
</template>
<script>
import CreateWordsForm from '@/components/CreateWordsForm.vue';

export default {
  name: 'DictionaryView',
  components: {
    CreateWordsForm,
  },
};
</script>
<style lang=""></style>
