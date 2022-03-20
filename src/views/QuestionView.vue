<template>
  <main class="py-5">
    <div class="container">
      <div class="card shadow" v-if="question">
        <form class="card-body p-4" action="#" @submit.prevent="send">
          <div class="d-sm-flex align-items-center justify-content-between">
            <h2 class="mb-3 mb-sm-0">{{ question.text }}</h2>
            <small class="text-secondary"
              ><i class="far fa-user-circle"></i> {{ question.user.name }},
              {{ new Date(question.created_at).toLocaleString() }}</small
            >
          </div>
          <hr class="my-4" />
          <label class="mb-3 d-block" v-for="variant in question.variants" :key="variant.id">
            <input
              type="radio"
              name="variant_id"
              v-model="variant_id"
              :value="variant.id"
              class="me-2"
            />
            {{ variant.text }}
          </label>
          <hr />
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <button class="btn btn-primary" :disabled="!variant_id">Ответить</button>
              <div class="loader-sm ms-3" v-if="loading"></div>
            </div>
            <small class="text-secondary"
              ><i class="far fa-hand"></i> {{ question.answers_count }} ответов</small
            >
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  name: "QuestionView",
  props: ["id"],
  computed: mapGetters(['user']),
  data() {
    return {
      question: null,
      variant_id: null,
      loading: false
    };
  },
  methods: {
    loadQuestion: function () {
      fetch(`http://afanasso.beget.tech/api/questions/${this.id}`, {
        headers: {
          Authorization: `Bearer ${this.user.api_token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => this.question = json.data);
    },
    send: function() {
      this.loading = true
      fetch(`http://afanasso.beget.tech/api/questions/${this.id}/answer`, {
        method: 'POST',
        body: JSON.stringify({variant_id: this.variant_id}),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.user.api_token}`,
        },
      })
      .then(response => {
        if(response.ok) {
          this.$router.push(`/results/${this.id}`)
        }
        this.loading = false
      })
    }
  },
  created() {
    this.loadQuestion()
  }
};
</script>