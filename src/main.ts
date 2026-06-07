import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'
import HomePage from './views/HomePage.vue'
import CatalogPage from './views/CatalogPage.vue'
import ProductDetailPage from './views/ProductDetailPage.vue'
import CartPage from './views/CartPage.vue'
import FavoritesPage from './views/FavoritesPage.vue'
import './index.css'

const routes = [
  { path: '/', component: HomePage },
  { path: '/catalog', component: CatalogPage },
  { path: '/catalog/category/:id', component: CatalogPage },
  { path: '/product/:id', component: ProductDetailPage },
  { path: '/cart', component: CartPage },
  { path: '/favorites', component: FavoritesPage },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

createApp(App).use(router).mount('#app')
