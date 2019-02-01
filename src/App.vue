<template>
  <div id="app">
    <h1>JavaScript конференции 2019</h1>
    <div class="navigation">
      <button class="back" @click="back">
        <
      </button>
      <div class="current">
        {{ start + 1 }}
      </div>
      <button class="next" @click="next">
        >
      </button>
      
    </div>
    <div class="conferences">
      <Conf v-for="conf in listShow" :conf="conf" :key="JSON.stringify(conf)"/>
    </div>
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
      list: [],
      today: [],
      start: 0
    }
  },
  computed: {
    listShow() {
      return this.list.slice(this.start*10, this.start*10 + 10);
    },
    end() {
      return Math.floor(this.list.length / 10);
    }
  },
  methods: {
    back() {
      this.list = events;
      if (this.start > 0) {
        this.start -= 1;
      }
    },
    next() {
      this.list = events;
      if (this.start < this.end) {
        this.start += 1;
      }
    }
  },
  beforeCreate() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js')
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
    if (!('Notification' in window)) {
      console.log('Ваш браузер не поддерживает уведомления');
    }
    else if (Notification.permission === 'granted') {
      this.list = events;
      this.list = this.list.filter(el => new Date() < new Date(el.startDate.split('-')));
      const now = new Date();
      const nowStr = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}`;
      let notifications = localStorage.getItem('notifications');
      if (!notifications) {
        notifications = {};
      } else {
        notifications = JSON.parse(notifications);
      }
      if (notifications[nowStr]) {
        notifications[nowStr].forEach((el, index) => {
          setTimeout(()=> {
            const notification = new Notification(el.name, {
              body: `${el.country} ${el.city} - ${el.date}`,
              icon: require('./assets/Calendar.png')
            });
            setTimeout(notification.close.bind(notification), 3800);
          }, index*4000);
        })
      }
    }
    else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
      Notification.requestPermission();
      this.list = events;
      this.list = this.list.filter(el => new Date() < new Date(el.startDate.split('-')));
    }  
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  outline: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: auto;
  margin-top: 20px;
  display: grid;
  width: 500px;
  grid-template-columns: 1fr;
}

.navigation {
  width: 150px;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(3, 50px);
  margin: auto;
}

a {
  color: #ED1E79;
}

h1 {
  text-align: center;
}

.back, .next {
  cursor: pointer;
  background-color: #fff;
  border: none;
}

.back, .next, .current {
  align-self: center;
  justify-self: center;
  padding: 10px 12px;
}

.back:hover, .next:hover {
  background-color: #ED1E79;
}


</style>
