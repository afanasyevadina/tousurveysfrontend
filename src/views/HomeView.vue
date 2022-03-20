<template>
  <main class="py-5">
    <div class="container">
      <div
        class="
          d-flex
          flex-column flex-sm-row
          justify-content-between
          align-items-center
          mb-3
        "
      >
        <h2 class="mb-4">Последние опросы</h2>
        <router-link to="/create" class="btn btn-primary mb-4">Создать новый</router-link>
      </div>
      <div class="d-flex justify-content-center py-4" v-if="loading">
        <div class="loader"></div>
      </div>
      <div v-else-if="!questions.length" class="h4 py-4 text-center">Пока что ничего...</div>
      <div class="card mb-4 shadow" v-for="question in questions" :key="question.id">
        <div class="card-body">
          <router-link :to="`/${question.has_answers ? 'results' : 'question'}/${question.id}`" class="h4 text-decoration-none"
            >{{ question.text }}</router-link
          >
          <div class="d-sm-flex justify-content-between mt-4">
            <div class="text-secondary">
              <i class="far fa-user-circle"></i> {{ question.user.name }}
            </div>
            <div class="text-success mt-2 mt-sm-0" v-if="question.has_answers">
              <i class="fas fa-check"></i> Вы ответили
            </div>
          </div>
          <hr />
          <div class="d-flex justify-content-between text-secondary">
            <small><i class="far fa-calendar"></i> {{new Date(question.created_at).toLocaleString() }}</small>
            <small><i class="far fa-hand"></i> {{ question.answers_count }} ответов</small>
          </div>
        </div>
      </div>
      <nav class="pt-4" v-if="links.length > 3">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{'disabled': !link.url, 'active': link.active}" v-for="(link, l) in links" :key="l">
            <a class="page-link" href="#" v-html="link.label" @click.prevent="loadQuestions(link.url)"></a>
          </li>
        </ul>
      </nav>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeView",
  data() {
    return {
      questions: [],
      links: [],
      loading: true
    };
  },
  computed: mapGetters(["user"]),
  methods: {
    loadQuestions: function (url = "http://afanasso.beget.tech/api/questions") {
      this.loading = true
      fetch(url, {
        headers: {
          Authorization: `Bearer ${this.user.api_token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          this.questions = json.data;
          this.links = json.meta.links;
          this.loading = false
        });
    },
  },
  created() {
      this.loadQuestions()
  }
};
</script>
