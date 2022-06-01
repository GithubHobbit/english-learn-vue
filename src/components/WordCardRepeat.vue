<template lang="">
  <input type="checkbox" id="check"/>
  <label for="check">

  <div class="word row my-4 position-relative" tabindex="0">
    <div class="position-absolute">
      <div
        class="front border d-flex flex-column align-items-center justify-content-around text-center"
      >
        <p>{{ word.example }}</p>
      </div>
    </div>

    <div class="position-absolute">
      <div
        class="back border d-flex flex-column align-items-center justify-content-around text-center"
      >
        <p>{{ word.translateExample }}</p>
        <img
          v-if="word.picture"
          :src="word.picture"
          alt=""
          width="200"
        />
      </div>
    </div>
  </div>
</label>

</template>
<script>
export default {
  name: 'WordCardRepeat',
  data() {
    return {};
  },
  //TODO сделать нормальную переотрисовку
  beforeUpdate() {
    document.getElementById('check').checked = false;
  },
  props: {
    word: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
};
</script>
<style>
.word {
  cursor: pointer;
  min-height: 200px;
}

.front,
.back {
  min-height: 200px;
  overflow: hidden;
  backface-visibility: hidden;
  transition: transform 0.5s linear;
  background-image: url(../assets/card-bg-4.jpg);
}

.front {
  transform: perspective(600px) rotateY(0deg);
}

.back {
  transform: perspective(600px) rotateY(180deg);
  /* background-color: #f1f1f1; */
}

input[type=checkbox]:checked + label .front {
  transform: perspective(600px) rotateY(-180deg);
}

input[type=checkbox]:checked + label .back {
  transform: perspective(600px) rotateY(0deg);
}

input {
  display: none;
}
</style>
