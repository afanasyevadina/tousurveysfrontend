<template>
  <main class="py-5">
    <div class="container">
      <div class="d-flex justify-content-center py-4" v-if="loading">
        <div class="loader"></div>
      </div>
      <div class="card shadow" v-if="question">
        <div class="card-body p-4">
          <div class="d-sm-flex align-items-center justify-content-between">
            <h2 class="mb-3 mb-sm-0">{{ question.text }}</h2>
            <small class="text-secondary"
              ><i class="far fa-user-circle"></i> {{ question.user.name }},
              {{ new Date(question.created_at).toLocaleString() }}</small
            >
          </div>
          <hr class="my-4" />
          <div class="mb-4" v-for="variant in question.variants" :key="variant.id">
            <div class="mb-2">{{ variant.text }} - {{ percent(variant.users.length) }}%</div>
            <div class="progress">
              <div
                class="progress-bar"
                role="progressbar"
                :style="{width: `${percent(variant.users.length)}%`}"
                :aria-valuenow="percent(variant.users.length)"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <small class="text-secondary">
              {{ variant.users.slice(0, 3).map(v => v.name).join(', ') }}
              <span v-if="variant.users.length > 3">и еще {{ variant.users.length - 3 }}</span>
            </small>
          </div>
          <hr />
          <router-link :to="`/question/${id}`" class="btn btn-sm btn-light">
            <i class="fas fa-pencil"></i>
            Изменить свой ответ
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ResultsView",
  props: ["id"],
  computed: {
    ...mapGetters(["user"]),
    allAnswers: function() {
      return this.question.variants.reduce((a, c) => a.concat(c.users), [])
    }
  },
  data() {
    return {
      question: null,
      loading: true
    }
  },
  methods: {
    percent: function(value) {
      return value ? Math.round(value / this.allAnswers.length * 100) : 0
    },
    loadResults: function() {
      fetch(`http://afanasso.beget.tech/api/questions/${this.id}/results`, {
        headers: {
          Authorization: `Bearer ${this.user.api_token}`,
        },
      })
        .then((response) => response.json())
        .then((json) => {
          if(json.errors) {
            this.$router.push(`/question/${this.id}`)
          } else {
            this.question = json.data
          }
          this.loading = false
        });
    },
  },
  created() {
    this.loadResults()
  }
};
</script>