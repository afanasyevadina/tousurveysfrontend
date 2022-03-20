<template>
  <main class="py-5">
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-sm-8">
          <div class="card shadow">
            <form action="#" class="card-body p-4" @submit.prevent="login">
              <h2 class="mb-5 text-center">Авторизация</h2>
              <div class="mb-4">
                <input
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': errors.email || errors.error}"
                  placeholder="Ваш email"
                  v-model="form.email"
                />
                <span class="invalid-feedback"
                  >{{ errors.email || errors.error }}</span
                >
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': errors.password}"
                  placeholder="Ваш пароль"
                  v-model="form.password"
                />
                <span class="invalid-feedback"
                  >{{ errors.password }}</span
                >
              </div>
              <button class="btn w-100 mb-3" :class="{'btn-primary': !loading, 'btn-light': loading}">
                {{ loading ? 'Вход...' : 'Войти' }}
              </button>
              <div class="text-center">
                <small>
                  Нет аккаунта? <router-link to="/register">Регистрация</router-link>
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
      loading: false
    };
  },
  methods: {
    login: function () {
      this.loading = true
      this.errors = {};
      fetch("http://afanasso.beget.tech/api/login", {
        method: "POST",
        body: JSON.stringify(this.form),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.errors) {
            this.errors = json.errors;
          } else {
            this.$store.commit("login", json.data);
            this.$router.push("/");
          }
          this.loading = false
        });
    },
  },
};
</script>