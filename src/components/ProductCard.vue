<template>
  <div class="product-card" @click="goToProduct">
    <button class="product-card-fav-btn" @click.stop="toggleFav">
      <svg class="w-5 h-5" :class="isFav ? 'text-red-500' : 'text-gray-400 hover:text-red-400'" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
      </svg>
    </button>
    <div class="product-card-image h-28 sm:h-36 md:h-44">
      <img v-if="imageUrl" :src="imageUrl" :alt="name" class="max-h-full max-w-full object-contain" loading="lazy"
        @error="($event.target as HTMLImageElement).style.display='none'" />
      <div v-if="!imageUrl" class="text-4xl text-gray-300">📱</div>
    </div>
    <h3 class="product-card-title text-[11px] sm:text-xs md:text-sm min-h-[1.6rem] md:min-h-[2.2rem] mb-1">{{ name }}</h3>
    <p class="text-center text-[9px] md:text-xs text-gray-400 italic mb-1">{{ product.brand }} · {{ product.color }}</p>
    <div class="product-card-price text-xs sm:text-sm md:text-base">
      <span v-if="product.discount_price" class="line-through text-gray-400 mr-1 text-[10px] md:text-xs">{{ formatPrice(product.price) }}</span>
      <span class="font-semibold">{{ formatPrice(displayPrice) }}</span>
    </div>
    <button class="product-card-buy-btn mt-2 md:mt-3 text-[11px] md:text-sm" @click.stop="handleBuy">Купить</button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { isFavorite, toggleFavorite, addToCart, getProductName, getProductImage, getDisplayPrice, formatPrice } from '../store'
import type { Product } from '../store'

const props = defineProps<{ product: Product }>()
const router = useRouter()

const name = computed(() => getProductName(props.product))
const imageUrl = computed(() => getProductImage(props.product))
const displayPrice = computed(() => getDisplayPrice(props.product))
const isFav = computed(() => isFavorite(props.product.id))

function goToProduct() { router.push(`/product/${props.product.id}`) }
function toggleFav() { toggleFavorite(props.product) }
function handleBuy() {
  addToCart(props.product)
  router.push('/cart')
}
</script>
