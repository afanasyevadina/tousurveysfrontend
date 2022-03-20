<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-light bg-white shadow">
      <div class="container">
        <router-link class="navbar-brand" to="/"> ToU Surveys </router-link>
        <div v-if="user">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item dropdown">
              <a
                id="navbarDropdown"
                class="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {{ user.name }}
              </a>

              <div
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdown"
              >
                <a class="dropdown-item" href="#" @click.prevent="logout"> Выход </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: mapGetters(['user']),
  methods: {
    logout: function() {
      this.$store.commit('logout')
      this.$router.push('/login')
    },
  },
  created() {
    this.$store.commit('restoreUser')
  }
}
</script>

<style>
.loader {
  width: 70px;
  height: 70px;
  border: 5px solid rgb(179, 179, 179);
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;
}
.loader-sm {
  width: 30px;
  height: 30px;
  border: 3px solid rgb(179, 179, 179);
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;
}
@keyframes rotate {
  100% {
    transform: rotate(360deg);
  }
}
</style>