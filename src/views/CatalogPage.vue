<template>
  <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-4 md:py-8">

    <h1 v-if="currentCategoryName" class="text-xl md:text-2xl font-bold not-italic mb-4 md:mb-6">{{ currentCategoryName }}</h1>
    <div class="flex gap-5 md:gap-8">

      <aside class="hidden md:block w-52 lg:w-60 shrink-0">
        <h3 class="font-bold not-italic text-base mb-3">Фильтры</h3>

        <div class="filter-section">
          <button @click="brandOpen = !brandOpen" class="flex items-center justify-between w-full text-left">
            <span class="font-semibold not-italic text-sm">Бренд</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': brandOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-show="brandOpen" class="mt-2">
            <input v-model="brandSearch" placeholder="Поиск..." class="w-full bg-[#F5F5F7] rounded-lg px-2.5 py-1.5 text-xs italic mb-2 outline-none placeholder:not-italic" />
            <div class="space-y-1.5 max-h-40 overflow-y-auto">
              <label v-for="brand in filteredBrands" :key="brand" class="filter-checkbox">
                <input type="checkbox" :value="brand" v-model="selectedBrands" class="accent-black w-3.5 h-3.5" />
                <span class="italic text-xs">{{ brand }}</span>
              </label>
            </div>
          </div>
        </div>

        <div class="filter-section">
          <button @click="priceOpen = !priceOpen" class="flex items-center justify-between w-full text-left">
            <span class="font-semibold not-italic text-sm">Цена</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': priceOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-show="priceOpen" class="mt-2 flex gap-2">
            <input v-model.number="priceMin" type="number" placeholder="от" class="w-full bg-[#F5F5F7] rounded-lg px-2.5 py-1.5 text-xs italic outline-none placeholder:not-italic" />
            <input v-model.number="priceMax" type="number" placeholder="до" class="w-full bg-[#F5F5F7] rounded-lg px-2.5 py-1.5 text-xs italic outline-none placeholder:not-italic" />
          </div>
        </div>

        <div class="filter-section">
          <button @click="colorOpen = !colorOpen" class="flex items-center justify-between w-full text-left">
            <span class="font-semibold not-italic text-sm">Цвет</span>
            <svg class="w-4 h-4 transition-transform" :class="{ 'rotate-180': colorOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
          </button>
          <div v-show="colorOpen" class="mt-2 space-y-1.5 max-h-40 overflow-y-auto">
            <label v-for="color in availableColors" :key="color" class="filter-checkbox">
              <input type="checkbox" :value="color" v-model="selectedColors" class="accent-black w-3.5 h-3.5" />
              <span class="italic text-xs">{{ color }}</span>
            </label>
          </div>
        </div>

        <button v-if="hasActiveFilters" @click="clearFilters" class="btn-outline w-full mt-3 py-2 text-xs">Сбросить</button>
      </aside>

      <div class="flex-1 min-w-0">

        <div v-if="searchQuery" class="mb-3 flex items-center gap-2 bg-[#F5F5F7] rounded-lg px-3 py-2">
          <svg class="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <span class="italic text-xs">Поиск: <strong class="not-italic">{{ searchQuery }}</strong></span>
          <button @click="searchQuery = ''" class="ml-auto"><svg class="w-3.5 h-3.5 text-gray-400 hover:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg></button>
        </div>

        <div class="flex items-center justify-between mb-4">
          <span class="italic text-gray-500 text-xs">Найдено: <strong class="not-italic">{{ totalFiltered }}</strong></span>
          <select v-model="sortBy" class="bg-[#F5F5F7] rounded-lg px-2 py-1.5 italic text-xs outline-none">
            <option value="rating">По рейтингу</option>
            <option value="price-asc">Цена ↑</option>
            <option value="price-desc">Цена ↓</option>
            <option value="name">По имени</option>
          </select>
        </div>

        <button @click="showMobileFilters = !showMobileFilters" class="md:hidden w-full bg-[#F5F5F7] rounded-lg py-2.5 mb-3 italic text-xs flex items-center justify-center gap-1.5">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
          {{ showMobileFilters ? 'Скрыть' : 'Фильтры' }}
        </button>

        <div v-if="showMobileFilters" class="md:hidden bg-white border rounded-lg p-3 mb-3 space-y-3">
          <div><p class="font-semibold not-italic text-xs mb-1">Бренд</p>
            <div class="space-y-1 max-h-24 overflow-y-auto">
              <label v-for="brand in filteredBrands" :key="brand" class="filter-checkbox"><input type="checkbox" :value="brand" v-model="selectedBrands" class="accent-black w-3.5 h-3.5" /><span class="italic text-xs">{{ brand }}</span></label>
            </div>
          </div>
          <div><p class="font-semibold not-italic text-xs mb-1">Цена</p>
            <div class="flex gap-2">
              <input v-model.number="priceMin" type="number" placeholder="от" class="w-full bg-[#F5F5F7] rounded px-2 py-1.5 text-xs italic outline-none" />
              <input v-model.number="priceMax" type="number" placeholder="до" class="w-full bg-[#F5F5F7] rounded px-2 py-1.5 text-xs italic outline-none" />
            </div>
          </div>
        </div>

        <div v-if="loading" class="text-center py-12 italic text-gray-400">
          <div class="inline-block w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
          <p class="text-sm">Загрузка...</p>
        </div>

        <div v-else-if="error" class="text-center py-12">
          <div class="text-4xl mb-3"></div>
          <p class="italic text-gray-400 text-sm mb-1">Ошибка загрузки</p>
          <p class="text-[10px] text-gray-300 italic mb-3"></p>
          <button @click="loadProducts" class="btn-primary w-auto px-5 py-2 inline-block">Повторить</button>
        </div>

        <div v-else-if="paginatedProducts.length === 0" class="text-center py-12 italic text-gray-400">
          <div class="text-4xl mb-3">🔍</div>
          <p class="text-sm">Ничего не найдено</p>
          <button @click="clearFilters" class="btn-outline inline-block px-5 py-2 mt-3 text-xs">Сбросить</button>
        </div>

        <transition name="fade" mode="out-in">
          <div v-if="!loading && !error && paginatedProducts.length > 0" :key="currentPage" class="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-5">
            <ProductCard v-for="product in paginatedProducts" :key="product.id" :product="product" />
          </div>
        </transition>

        
        <div v-if="totalPages > 1" class="flex justify-center items-center gap-1 md:gap-2 mt-6 md:mt-10">
          <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" class="pagination-btn border border-gray-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>
          </button>
          <template v-for="page in visiblePages" :key="page">
            <button v-if="page !== '...'" @click="goToPage(page as number)" class="pagination-btn" :class="currentPage === page ? 'pagination-btn-active' : 'pagination-btn-inactive'">{{ page }}</button>
            <span v-else class="text-gray-400 text-xs">...</span>
          </template>
          <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" class="pagination-btn border border-gray-300 hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-current">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { getAllProducts, getCategoryById } from '../api'
import { searchQuery, getDisplayPrice } from '../store'
import type { Product } from '../store'

const route = useRoute()
const products = ref<Product[]>([])
const loading = ref(true)
const error = ref('')
const currentPage = ref(1)
const perPage = 9
const sortBy = ref('rating')
const currentCategoryName = ref('')
const selectedBrands = ref<string[]>([])
const selectedColors = ref<string[]>([])
const brandSearch = ref('')
const priceMin = ref<number | undefined>(undefined)
const priceMax = ref<number | undefined>(undefined)
const brandOpen = ref(true)
const priceOpen = ref(false)
const colorOpen = ref(false)
const showMobileFilters = ref(false)

const availableBrands = computed(() => [...new Set(products.value.map(p => p.brand).filter(Boolean))].sort())
const availableColors = computed(() => [...new Set(products.value.map(p => p.color).filter(Boolean))].sort())
const filteredBrands = computed(() => !brandSearch.value ? availableBrands.value : availableBrands.value.filter(b => b.toLowerCase().includes(brandSearch.value.toLowerCase())))
const hasActiveFilters = computed(() => selectedBrands.value.length > 0 || selectedColors.value.length > 0 || priceMin.value || priceMax.value || searchQuery.value)

const filteredProducts = computed(() => {
  let r = [...products.value]
  const q = searchQuery.value.toLowerCase().trim()
  if (q) r = r.filter(p => p.name?.toLowerCase().includes(q) || p.brand?.toLowerCase().includes(q) || p.color?.toLowerCase().includes(q))
  if (selectedBrands.value.length) r = r.filter(p => selectedBrands.value.includes(p.brand))
  if (selectedColors.value.length) r = r.filter(p => selectedColors.value.includes(p.color))
  if (priceMin.value) r = r.filter(p => getDisplayPrice(p) >= priceMin.value!)
  if (priceMax.value) r = r.filter(p => getDisplayPrice(p) <= priceMax.value!)
  switch (sortBy.value) {
    case 'price-asc': r.sort((a, b) => getDisplayPrice(a) - getDisplayPrice(b)); break
    case 'price-desc': r.sort((a, b) => getDisplayPrice(b) - getDisplayPrice(a)); break
    case 'name': r.sort((a, b) => a.name.localeCompare(b.name)); break
    default: r.sort((a, b) => b.rating - a.rating)
  }
  return r
})

const totalFiltered = computed(() => filteredProducts.value.length)
const totalPages = computed(() => Math.ceil(totalFiltered.value / perPage))
const paginatedProducts = computed(() => filteredProducts.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage))
const visiblePages = computed(() => {
  const p: (number | string)[] = [], t = totalPages.value, c = currentPage.value
  if (t <= 7) { for (let i = 1; i <= t; i++) p.push(i) }
  else { p.push(1); if (c > 3) p.push('...'); for (let i = Math.max(2, c - 1); i <= Math.min(t - 1, c + 1); i++) p.push(i); if (c < t - 2) p.push('...'); p.push(t) }
  return p
})

function goToPage(page: number) { if (page >= 1 && page <= totalPages.value) { currentPage.value = page; window.scrollTo({ top: 0, behavior: 'smooth' }) } }
function clearFilters() { selectedBrands.value = []; selectedColors.value = []; priceMin.value = undefined; priceMax.value = undefined; brandSearch.value = ''; searchQuery.value = ''; currentPage.value = 1 }
async function loadProducts() {
  loading.value = true; error.value = ''; currentPage.value = 1
  try {
    const catId = route.params.id as string
    if (catId) {
      products.value = await getCategoryById(catId)
      /* Получаем имя категории из загруженных продуктов */
      if (products.value.length > 0 && products.value[0].category) {
        currentCategoryName.value = products.value[0].category
      } else {
        currentCategoryName.value = 'Категория'
      }
    } else {
      products.value = await getAllProducts()
      currentCategoryName.value = ''
    }
  }
  catch (e: any) { error.value = e?.message; products.value = [] }
  finally { loading.value = false }
}
watch([selectedBrands, selectedColors, priceMin, priceMax, sortBy, searchQuery], () => { currentPage.value = 1 })
onMounted(loadProducts)
watch(() => route.params.id, loadProducts)
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
