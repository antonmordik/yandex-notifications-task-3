<template>
  <div class="conf">
    <div class="conf__title">
      {{ conf.title }}
    </div>
    <div class="conf__desc">
      {{ conf.description }}
    </div>
    <div class="conf__date">
      <p>
        {{ dateView }}
      </p>
    </div>
    <button class="icon">
      3d
    </button>
    <button class="icon">
      7d
    </button>
    <button class="icon">
      14d
    </button>
  </div>
</template>

<script>
export default {
  name: 'Conf',
  props: ['conf'],
  computed: {
    dateView() {
      const [d, m, y] = this.conf.date.split('-');
      return `${d}/${(parseInt(m) + 1)}/${y}`
    }
  }
}
</script>

<style>
.conf {
  width: 700px;
  display: grid;
  grid-template-columns: 1fr 52px 52px 52px;
  margin-bottom: 20px;
}

.conf__title {
  background-color: #9abd97;
  grid-column: 1/5;
  padding: 15px;
}

.conf__desc {
  background-color: #b6d7b9;
  grid-column: 1/5;
  padding: 15px;
}

.conf__date {
  background-color: #d0f1bf;
  display: grid;
}

.conf__date p {
  align-self: center;
  padding-left: 15px;
}

.icon {
  background-color: #d0f1bf;
  border: none;
  width: 52px;
  height: 52px;
  cursor: pointer;
}

.icon:hover {
  background-color: #b6d7b9;
}
</style>
