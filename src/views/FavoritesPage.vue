<template>
  <div class="max-w-[1000px] mx-auto px-4 md:px-8 py-6 md:py-8">
    <h1 class="text-xl md:text-3xl font-bold not-italic mb-2">Избранное</h1>
    <div class="h-px bg-gray-200 mb-6 md:mb-8"></div>

    <div v-if="state.favorites.length === 0" class="text-center py-14 md:py-20">
      <div class="text-5xl mb-4"></div>
      <p class="italic text-gray-400 text-base mb-2">Список избранного пуст</p>
      <router-link to="/catalog" class="btn-primary inline-block w-auto px-8 py-3 mt-4">Каталог</router-link>
    </div>

    <div v-else>
      <div class="flex items-center justify-between mb-6">
        <span class="italic text-gray-500 text-sm">{{ state.favorites.length }} товар(ов)</span>
        <button @click="clearAll" class="italic text-sm text-gray-400 hover:text-red-500 transition">Очистить всё</button>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div v-for="product in state.favorites" :key="product.id" class="favorite-card">

          <button @click.stop="toggleFavorite(product)" class="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full hover:bg-white transition">
            <svg class="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
            </svg>
          </button>

          <router-link :to="`/product/${product.id}`" class="block">
            <div class="h-40 md:h-52 flex items-center justify-center mb-4 px-3 bg-white/40 rounded-xl">
              <img v-if="getProductImage(product)" :src="getProductImage(product)" :alt="product.name" class="max-h-full max-w-full object-contain" loading="lazy" />
              <div v-else class="text-5xl">📱</div>
            </div>
          </router-link>

          <router-link :to="`/product/${product.id}`" class="block">
            <h3 class="text-sm md:text-base font-medium italic text-center line-clamp-2 min-h-[2.5rem] hover:underline">{{ product.name }}</h3>
          </router-link>

          <p class="text-center text-xs text-gray-400 italic my-1">{{ product.brand }} · {{ product.color }}</p>

          <div class="flex items-center justify-center gap-0.5 mb-3">
            <svg v-for="i in 5" :key="i" class="w-3.5 h-3.5" :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-[10px] text-gray-400 italic ml-1">{{ product.rating }}</span>
          </div>

          <div class="text-center italic text-base md:text-lg mb-4">
            <span v-if="product.discount_price" class="line-through text-gray-400 mr-2 text-xs">{{ formatPrice(product.price) }}</span>
            <span class="font-bold">{{ formatPrice(getDisplayPrice(product)) }}</span>
          </div>

          <button @click.stop="addToCartAndGo(product)" class="btn-primary flex items-center justify-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import state, { toggleFavorite, addToCart, getProductImage, getDisplayPrice, formatPrice } from '../store'
import type { Product } from '../store'

const router = useRouter()
function clearAll() { while (state.favorites.length > 0) state.favorites.pop() }
function addToCartAndGo(product: Product) { addToCart(product); router.push('/cart') }
</script>
