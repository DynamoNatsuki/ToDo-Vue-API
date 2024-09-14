import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodosView from '@/views/TodosView.vue'
import SingleToDoView from '@/views/SingleToDoView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/todos',
    name: 'todos',
    component: TodosView
  },
  {
    path: '/todos/:id',
    name: 'singleTask',
    component: SingleToDoView
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
