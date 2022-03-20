<template>
  <main class="py-5">
    <div class="container pt-5">
      <div class="row justify-content-center">
        <div class="col-lg-6 col-sm-8">
          <div class="card shadow">
            <form action="index.html" class="card-body p-4" @submit.prevent="register">
              <h2 class="mb-5 text-center">Регистрация</h2>
              <div class="mb-4">
                <input
                  type="name"
                  class="form-control"
                  :class="{'is-invalid': errors.name}"
                  placeholder="Ваше имя"
                  v-model="form.name"
                />
                <span class="invalid-feedback">{{ errors.name }}</span>
              </div>
              <div class="mb-4">
                <input
                  type="email"
                  class="form-control"
                  :class="{'is-invalid': errors.email}"
                  placeholder="Ваш email"
                  v-model="form.email"
                />
                <span class="invalid-feedback"
                  >{{ errors.email }}</span
                >
              </div>
              <div class="mb-4">
                <input
                  type="password"
                  class="form-control"
                  :class="{'is-invalid': errors.password}"
                  placeholder="Придумайте пароль"
                  v-model="form.password"
                />
                <span class="invalid-feedback"
                  >{{ errors.password }}</span
                >
              </div>
              <button class="btn w-100 mb-3" :class="{'btn-primary': !loading, 'btn-light': loading}">
                {{ loading ? 'Проверка...' : 'Создать аккаунт' }}
              </button>
              <div class="text-center">
                <small>
                  Уже зарегистрированы? <router-link to="/login">Войти</router-link>
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
  name: "RegisterView",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
      },
      errors: {},
      loading: false
    };
  },
  methods: {
    register: function () {
      this.loading = true
      this.errors = {};
      fetch("http://afanasso.beget.tech/api/register", {
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