<template>
  <div class="conf">
    <h3 class="name">
      {{ conf.name }}
    </h3>
    <p class="date">
      {{ dateView }}
    </p>
    <div class="link">
      <a :href="conf.url" target="_blank">{{ conf.url }}</a>
    </div>
    <p class="place">
      {{ conf.country }}, {{ conf.city }}
    </p>
    <div class="allerts">
      Напомнить:
      <button class="allerts_btn" @click="notify(3)">
        за 3 дня
      </button>
      <button class="allerts_btn" @click="notify(7)">
        за 7 дней
      </button>
      <button class="allerts_btn" @click="notify(14)">
        за 14 дней
      </button>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'Conf',
  props: ['conf'],
  computed: {
    dateView() {
      const [y, m, d] = this.conf.startDate.split('-');
      return `${d}/${m}/${y}`
    }
  },
  methods: {
    notify(amount) {
      let [y, m,d] = this.conf.startDate.split('-');
      const day = new Date(y, `${m - 1}`, `${d - amount}`);
      const dayStr = `${day.getFullYear()}-${day.getMonth()}-${day.getDate()}`;
      const data = {
        name: this.conf.name,
        country: this.conf.country,
        city: this.conf.city,
        date: this.dateView
      };
      let check = true;
      let notifications = localStorage.getItem('notifications');
      if (!notifications) {
        notifications = {};
      } else {
        notifications = JSON.parse(notifications);
      }
      if (!notifications[dayStr]) {
        notifications[dayStr] = [];
      } else {
        notifications[dayStr].forEach(el => {
          const temp = JSON.stringify(el);
          if (temp === JSON.stringify(data)) {
            check = false;
          }
        });
        
      }
      if (check) {
        notifications[dayStr].push(data);
      }
      localStorage.setItem('notifications', JSON.stringify(notifications));
    }
  }
}
</script>

<style>
.conf {
  width: 500px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: 400px 100px;
}
.link, .place {
  grid-column: 1/3;
}

.allerts {
  font-size: 14px;
}

.allerts_btn {
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #ED1E79;
  color: #FFF;
  font-size: 14px;
}

.allerts_btn:hover {
  color: #2c3e50;
}

</style>
