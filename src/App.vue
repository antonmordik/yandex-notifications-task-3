<template>
  <div id="app">
      <Conf v-for="conf in list" :conf="conf"/>
  </div>
</template>

<script>
import Conf from './Conf.vue';
import events from './json/events.json';

export default {
  name: 'App',
  components: {
    'Conf': Conf
  },
  data() {
    return {
      list:[]
    }
  },
  beforeCreate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('Service worker зарегистрирован:', registration);
        })
        .catch(err => {
          console.log('Ошибка при регистрации service worker-а:', err);
        })
    } else {
      console.log('Текущий браузер не поддерживает service worker-ы');
    }
  },
  created() {
    this.list = events;
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: auto;
  margin-top: 60px;
  display: grid;
  width: 700px;
  grid-template-columns: 1fr;
}

h1, h2 {
  font-weight: normal;
}


</style>
