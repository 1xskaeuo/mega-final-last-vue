<template>
  <header class="fixed top-0 left-0 right-0 bg-white z-50">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex items-center justify-between relative">
      <!-- Logo -->
      <router-link to="/" class="shrink-0">
        <img :src="'/images/logo.png'" alt="Cyber Store" class="h-7 md:h-8 object-contain" />
      </router-link>

      <!-- Search Desktop -->
      <div class="hidden md:flex flex-1 max-w-xl mx-8 relative">
        <div class="relative w-full">
          <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <input
            type="text"
            placeholder="Search"
            v-model="localQuery"
            @input="onSearchInput"
            @focus="showDropdown = true"
            @keyup.enter="goToCatalog"
            class="w-full bg-[#F5F5F7] rounded-xl py-3 pl-10 pr-4 text-sm italic outline-none focus:ring-2 focus:ring-gray-200 transition placeholder:not-italic"
          />
          <!-- Autocomplete Dropdown -->
          <div v-if="showDropdown && localQuery.length >= 1 && searchResults.length > 0"
            class="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-80 overflow-y-auto z-50">
            <button v-for="p in searchResults.slice(0, 6)" :key="p.id"
              @click="goToProduct(p.id)"
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left">
              <div class="w-10 h-10 bg-[#F5F5F7] rounded-lg flex items-center justify-center shrink-0 p-1">
                <img v-if="p.images?.[0]" :src="'http://localhost:1452/' + p.images[0]" class="max-h-full max-w-full object-contain" />
                <span v-else class="text-lg">📱</span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm italic truncate">{{ p.name }}</p>
                <p class="text-xs text-gray-400 italic">{{ p.brand }} · {{ p.color }}</p>
              </div>
              <span class="text-sm font-semibold italic shrink-0">{{ p.price?.toLocaleString('ru-RU') }} ₽</span>
            </button>
            <button @click="goToCatalog" class="w-full py-3 text-center text-sm italic text-gray-500 hover:bg-gray-50 transition border-t border-gray-100">
              Show all results →
            </button>
          </div>
        </div>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="md:hidden p-2" @click="showMobileSearch = !showMobileSearch">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </button>
        <!-- Fav icon — NO circle border -->
        <router-link to="/favorites" class="relative p-2 hover:opacity-70 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
          </svg>
          <span v-if="favCount > 0" class="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center not-italic">{{ favCount }}</span>
        </router-link>
        <!-- Cart icon — NO circle border -->
        <router-link to="/cart" class="relative p-2 hover:opacity-70 transition">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
          </svg>
          <span v-if="cartCount > 0" class="absolute -top-0.5 -right-0.5 bg-black text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center not-italic">{{ cartCount }}</span>
        </router-link>
      </div>
    </div>

    <!-- Mobile search -->
    <div v-if="showMobileSearch" class="md:hidden px-4 pb-3 relative">
      <input type="text" placeholder="Search" v-model="localQuery" @input="onSearchInput" @keyup.enter="goToCatalog"
        class="w-full bg-[#F5F5F7] rounded-xl py-3 pl-4 pr-4 text-sm italic outline-none" />
      <!-- Mobile autocomplete -->
      <div v-if="localQuery.length >= 1 && searchResults.length > 0"
        class="mt-2 bg-white rounded-xl shadow-xl border border-gray-100 max-h-60 overflow-y-auto">
        <button v-for="p in searchResults.slice(0, 4)" :key="p.id" @click="goToProduct(p.id); showMobileSearch = false"
          class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition text-left">
          <div class="w-8 h-8 bg-[#F5F5F7] rounded-lg flex items-center justify-center shrink-0 p-0.5">
            <img v-if="p.images?.[0]" :src="'http://localhost:1452/' + p.images[0]" class="max-h-full max-w-full object-contain" />
          </div>
          <span class="text-sm italic truncate">{{ p.name }}</span>
        </button>
      </div>
    </div>
    <div class="h-px bg-gray-200"></div>
  </header>
  <!-- Click outside to close dropdown -->
  <div v-if="showDropdown" class="fixed inset-0 z-40" @click="showDropdown = false"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { cartCount, favCount, searchQuery } from '../store'
import { getAllProducts } from '../api'
import type { Product } from '../store'

const router = useRouter()
const showMobileSearch = ref(false)
const showDropdown = ref(false)
const localQuery = ref(searchQuery.value)
const allProducts = ref<Product[]>([])
const searchResults = ref<Product[]>([])

function onSearchInput() {
  searchQuery.value = localQuery.value
  const q = localQuery.value.toLowerCase().trim()
  if (q.length >= 1) {
    searchResults.value = allProducts.value.filter(p =>
      p.name?.toLowerCase().includes(q) ||
      p.brand?.toLowerCase().includes(q)
    )
    showDropdown.value = true
  } else {
    searchResults.value = []
    showDropdown.value = false
  }
}

function goToCatalog() {
  showDropdown.value = false
  showMobileSearch.value = false
  router.push('/catalog')
}

function goToProduct(id: number) {
  showDropdown.value = false
  showMobileSearch.value = false
  localQuery.value = ''
  searchQuery.value = ''
  searchResults.value = []
  router.push(`/product/${id}`)
}

onMounted(async () => {
  try {
    allProducts.value = await getAllProducts()
  } catch (e) {
    console.error('Failed to preload products for search:', e)
  }
})
</script>
