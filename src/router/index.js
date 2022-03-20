import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import QuestionView from '../views/QuestionView.vue'
import ResultsView from '../views/ResultsView.vue'
import CreateView from '../views/CreateView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/question/:id',
    name: 'question',
    component: QuestionView,
    props: true
  },
  {
    path: '/results/:id',
    name: 'results',
    component: ResultsView,
    props: true
  },
  {
    path: '/create',
    name: 'create',
    component: CreateView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(!localStorage.getItem('user') && !['login', 'register'].includes(to.name)) next({name: 'login'})
  else next()
})

export default router
