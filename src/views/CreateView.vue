<template>
  <main class="py-5">
    <div class="container">
      <div class="card shadow">
        <form class="card-body p-4" action="#" @submit.prevent="send">
          <h2 class="mb-4">Новый опрос</h2>
          <div class="mb-4">
            <textarea
              class="form-control"
              :class="{'is-invalid': errors.text}"
              placeholder="Текст вопроса"
              v-model="question.text"
            ></textarea>
            <span class="invalid-feedback">This field is required</span>
          </div>
          <div class="mb-4 row" v-for="(variant, v) in question.variants" :key="v">
            <div class="col">
              <input
                type="text"
                class="form-control"
                :class="{'is-invalid': errors[`variants.${v}.text`]}"
                :placeholder="`Вариант #${v + 1}`"
                v-model="variant.text"
              />
              <span class="invalid-feedback">This field is required</span>
            </div>
            <div class="col-auto">
              <button type="button" class="btn btn-light" @click="deleteVariant(v)">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
          <a href="#" class="btn btn-light" @click.prevent="addVariant">
            <i class="fas fa-add"></i>
            Добавить вариант ответа
          </a>
          <hr />
          <div class="d-flex justify-content-end align-items-center">
            <div class="loader-sm me-3" v-if="loading"></div>
            <button class="btn btn-primary">Опубликовать</button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CreateView",
  data() {
    return {
      question: {
        variants: [
          {text: ''}
        ]
      },
      errors: {},
      loading: false
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    addVariant: function () {
      this.question.variants.push({ text: "" });
    },
    deleteVariant: function (index) {
      this.variants.splice(index, 1);
    },
    send: function () {
      this.loading = true
      this.errors = {}
      fetch("http://afanasso.beget.tech/api/questions", {
        method: "POST",
        body: JSON.stringify(this.question),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.user.api_token}`,
        },
      })
      .then(response => {
        if(response.ok) this.$router.push('/')
        else {
          response.json()
          .then(json => this.errors = json.errors)
        }
        this.loading = false
      })
    },
  },
};
</script>
