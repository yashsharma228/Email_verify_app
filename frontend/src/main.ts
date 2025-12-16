import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import HelloWorld from './components/HelloWorld.vue'
import Login from './components/Login.vue'
import Products from './components/Products.vue'
import Layout from './components/Layout.vue'

// If you need a Products component, you'll need to create it
// import Products from './components/Products.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'login', component: Login },
  {
    path: '/app',
    component: Layout,
    children: [
      { path: 'home', name: 'home', component: HelloWorld },
      { path: 'products', name: 'products', component: Products },
      { path: '', redirect: '/app/home' },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')