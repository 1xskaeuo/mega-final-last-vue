<template>
  <div v-if="loading" class="text-center py-16 italic text-gray-400">
    <div class="inline-block w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
    <p class="text-sm">Загрузка...</p>
  </div>
  <div v-else-if="!product" class="text-center py-16 italic text-gray-400">
    <div class="text-5xl mb-4">😕</div>
    <p>Товар не найден</p>
    <router-link to="/catalog" class="btn-primary inline-block w-auto px-6 py-2.5 mt-4">Каталог</router-link>
  </div>
  <div v-else>
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 pt-4 md:pt-6">
      <nav class="flex items-center gap-1.5 text-[11px] md:text-sm italic text-gray-400 flex-wrap">
        <router-link to="/" class="hover:text-black">Home</router-link><span>/</span>
        <router-link to="/catalog" class="hover:text-black">Catalog</router-link><span>/</span>
        <span class="text-black">{{ product.name }}</span>
      </nav>
    </div>

    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-10">
      <div class="flex flex-col md:flex-row gap-5 md:gap-12">

        <div class="w-full md:w-1/2">
          <div class="flex flex-row-reverse gap-2 md:gap-4">
            <div class="flex-1 bg-[#F5F5F7] rounded-xl md:rounded-2xl flex items-center justify-center h-[260px] md:h-[500px] p-4 md:p-8">
              <img v-if="currentImageUrl" :src="currentImageUrl" :alt="product.name" class="max-h-full max-w-full object-contain" />
              <div v-else class="text-6xl md:text-8xl">📱</div>
            </div>
            <div v-if="allImages.length > 1" class="flex md:flex-col gap-1.5 md:gap-3">
              <button v-for="(imgUrl, i) in allImages" :key="i" @click="selectedImage = i"
                class="w-12 h-12 md:w-20 md:h-20 rounded-lg md:rounded-xl bg-[#F5F5F7] flex items-center justify-center p-1 md:p-2 shrink-0 transition"
                :class="selectedImage === i ? 'ring-2 ring-black' : 'hover:ring-1 hover:ring-gray-300'">
                <img :src="imgUrl" class="max-h-full max-w-full object-contain" />
              </button>
            </div>
          </div>
        </div>

        <div class="w-full md:w-1/2">
          <h1 class="text-xl md:text-3xl font-semibold italic mb-1 md:mb-2">{{ product.name }}</h1>
          <p class="text-xs md:text-sm text-gray-400 italic mb-3 md:mb-4">{{ product.brand }} · {{ product.color }} · {{ product.country }}</p>

          <div class="flex items-baseline gap-2 md:gap-3 mb-4 md:mb-6">
            <span v-if="product.discount_price" class="line-through text-gray-400 text-sm md:text-xl italic">{{ formatPrice(product.price) }}</span>
            <span class="text-xl md:text-3xl font-bold italic">{{ formatPrice(displayPrice) }}</span>
            <span v-if="product.discount_price" class="bg-red-100 text-red-600 text-[10px] md:text-xs italic px-2 py-0.5 rounded-full">
              -{{ Math.round((1 - product.discount_price / product.price) * 100) }}%
            </span>
          </div>

          <div v-if="product.characteristics?.length" class="grid grid-cols-3 gap-1.5 md:gap-3 mb-4 md:mb-6">
            <div v-for="char in product.characteristics.slice(0, 6)" :key="char.characteristic" class="bg-[#F5F5F7] rounded-lg md:rounded-xl p-2 md:p-3 text-center">
              <p class="italic text-[10px] md:text-sm font-medium">{{ char.value }}</p>
              <p class="text-[9px] md:text-xs text-gray-400 italic">{{ char.characteristic }}</p>
            </div>
          </div>

          <p class="text-gray-600 italic text-xs md:text-sm leading-relaxed mb-4 md:mb-6">
            {{ product.name }} — флагманское устройство от {{ product.brand }} с безупречным дизайном.
            Цвет {{ product.color }}, производство {{ product.country }}. Гарантия {{ product.guarantee }} мес.
          </p>

          <div class="flex gap-2 md:gap-3 mb-4 md:mb-6">
            <button @click="handleAddToWishlist" class="btn-outline flex-1 flex items-center justify-center gap-1.5 py-2.5 md:py-3">
              <svg class="w-4 h-4 md:w-5 md:h-5" :class="{ 'text-red-500': isFav }" :fill="isFav ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
              <span class="hidden sm:inline">В избранное</span>
            </button>
            <button @click="handleAddToCart" class="btn-primary flex-1 py-2.5 md:py-3">В корзину</button>
          </div>

          <div class="flex flex-wrap gap-3 md:gap-6 text-[10px] md:text-sm">
            <div class="flex items-center gap-1 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"/></svg>
              <span class="italic">Бесплатная доставка</span>
            </div>
            <div class="flex items-center gap-1" :class="product.is_available ? 'text-green-600' : 'text-red-500'">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
              <span class="italic">{{ product.is_available ? 'В наличии' : 'Нет' }}</span>
            </div>
            <div class="flex items-center gap-1 text-gray-500">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"/></svg>
              <span class="italic">{{ product.guarantee }} мес.</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-[#F5F5F7]">
      <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
        <h2 class="text-xl md:text-2xl font-semibold not-italic mb-3 md:mb-4">Характеристики</h2>
        <div class="bg-white rounded-xl md:rounded-2xl p-4 md:p-6 mb-4 md:mb-6">
          <div v-for="(char, i) in product.characteristics" :key="i" class="flex justify-between py-2.5 md:py-3" :class="{ 'border-t border-gray-100': i > 0 }">
            <span class="text-gray-500 italic text-xs md:text-sm">{{ char.characteristic }}</span>
            <span class="font-medium italic text-xs md:text-sm">{{ char.value }}<span v-if="char.unit_type && char.unit_type !== 'значение'" class="text-gray-400 ml-1 text-[10px]">{{ char.unit_type }}</span></span>
          </div>
          <div v-if="!product.characteristics?.length" class="py-6 text-center italic text-gray-400 text-xs">Нет данных</div>
        </div>
        <div class="bg-white rounded-xl md:rounded-2xl p-5 md:p-8 flex flex-col sm:flex-row items-center gap-4 md:gap-8">
          <div class="flex flex-col items-center">
            <div class="text-4xl md:text-6xl font-bold not-italic">{{ product.rating }}</div>
            <div class="text-xs text-gray-400 italic">из 5</div>
          </div>
          <div class="flex flex-col items-center sm:items-start gap-1.5">
            <div class="flex gap-0.5">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 md:w-7 md:h-7" :class="i <= Math.round(product.rating) ? 'text-yellow-400' : 'text-gray-200'" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <span class="text-gray-500 italic text-xs md:text-sm">{{ product.count_review }} отзывов</span>
          </div>
        </div>
      </div>
    </div>

    <div v-if="relatedProducts.length > 0" class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
      <h2 class="text-xl md:text-2xl font-semibold not-italic mb-4 md:mb-6">Похожие товары</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
        <ProductCard v-for="p in relatedProducts" :key="p.id" :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { getProductById, getAllProducts } from '../api'
import { toggleFavorite, isFavorite, addToCart, getProductImages, getDisplayPrice, formatPrice } from '../store'
import type { Product } from '../store'

const route = useRoute()
const router = useRouter()
const product = ref<Product | null>(null)
const relatedProducts = ref<Product[]>([])
const loading = ref(true)
const selectedImage = ref(0)

const displayPrice = computed(() => product.value ? getDisplayPrice(product.value) : 0)
const isFav = computed(() => product.value ? isFavorite(product.value.id) : false)
const allImages = computed(() => product.value ? getProductImages(product.value) : [])
const currentImageUrl = computed(() => allImages.value[selectedImage.value] || '')

function handleAddToWishlist() { if (product.value) toggleFavorite(product.value) }
function handleAddToCart() {
  if (product.value) {
    addToCart(product.value)
    router.push('/cart')
  }
}

onMounted(async () => {
  try {
    const id = route.params.id as string
    product.value = await getProductById(id)
    const all = await getAllProducts()
    relatedProducts.value = all.filter((p: Product) => p.category === product.value?.category && p.id !== product.value?.id).slice(0, 4)
  } catch (e) { console.error(e) }
  finally { loading.value = false }
})
</script>
