<template>
  <!-- ===== ГЛАВНЫЙ БАННЕР ===== -->
  <section class="hero-section">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-10 md:py-20 flex flex-col md:flex-row items-center">
      <div class="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0 relative z-10">
        <p class="text-xs md:text-lg tracking-[0.3em] text-gray-400 italic font-light">Pro.Beyond.</p>
        <h1 class="text-3xl sm:text-4xl md:text-7xl font-bold my-3 md:my-4 not-italic leading-tight">IPhone 14 Pro</h1>
        <p class="text-xs md:text-lg italic text-gray-300 max-w-md mx-auto md:mx-0">Created to change everything for the better. For everyone.</p>
        <router-link to="/catalog" class="btn-white-outline inline-block mt-4 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 text-xs md:text-sm">Shop Now</router-link>
      </div>
      <div class="w-full md:w-1/2 flex justify-center items-center min-h-[200px] md:min-h-[420px] relative">
        <img v-if="heroImageLoaded" :src="heroImageSrc" alt="iPhone 14 Pro"
          class="max-h-[300px] md:max-h-[500px] max-w-full object-contain relative z-10 drop-shadow-2xl" />
        <div v-if="!heroImageLoaded" class="relative flex items-center gap-3">
          <div class="w-28 h-48 md:w-48 md:h-80 bg-gradient-to-br from-purple-600 via-purple-400 to-blue-500 rounded-[2rem] border-[3px] border-gray-600 shadow-2xl overflow-hidden">
            <div class="w-14 h-4 bg-gray-600 rounded-b-xl mx-auto"></div>
            <div class="p-2 pt-4 text-center"><p class="text-white text-[8px]">9:41</p></div>
          </div>
          <div class="w-28 h-48 md:w-48 md:h-80 bg-gradient-to-br from-gray-800 to-gray-950 rounded-[2rem] border-[3px] border-gray-600 shadow-2xl overflow-hidden rotate-6 -ml-4">
            <div class="w-14 h-4 bg-gray-600 rounded-b-xl mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===== БЕНТО ГРИД ===== -->
  <section class="w-full px-4 md:px-0 py-5 md:py-16 ">
    <div class="flex flex-col md:grid md:grid-cols-6 md:grid-rows-2 gap-3 md:gap-4 w-full">

      <!-- PS5 -->
      <div class="rounded-2xl md:col-span-4 md:row-span-1 bg-white border border-gray-100 flex flex-col md:flex-row items-center gap-4 md:gap-6 p-5 md:p-8 w-full">
        <div class="flex items-center justify-center md:w-1/2 py-1 md:py-0">
          <img src="/images/ps5.png" alt="PS5" class="w-40 md:w-full max-w-[400px]  object-contain" />
        </div>
        <div class="text-center md:text-left md:w-1/2">
          <h3 class="text-xl md:text-3xl font-bold not-italic">PlayStation 5</h3>
          <p class="italic text-gray-500 text-sm md:text-base mt-1 hidden md:block">Incredibly powerful CPU, GPU, and an SSD with integrated I/O will redefine your experience.</p>
        </div>
      </div>

      <!-- MacBook Air — текст слева, фото справа -->
      <router-link :to="computersCategoryLink" class="rounded-2xl md:col-span-2 md:row-span-2 bg-[#EFDDD0] flex flex-col md:flex-row-reverse items-center gap-4 md:gap-5 p-5 md:p-8 w-full no-underline text-inherit">
        <div class="flex items-center justify-center md:w-3/5 py-1 md:py-0">
          <img src="/images/macbook.png" alt="MacBook Air" class="w-40 md:w-full max-w-[360px] md:max-h-[400px] object-contain" />
        </div>
        <div class="text-center md:text-left md:w-2/5">
          <h3 class="text-xl md:text-3xl font-bold not-italic text-black">Macbook Air</h3>
          <p class="italic text-gray-600 text-sm md:text-base mt-1 hidden md:block">The new 15-inch MacBook Air makes a great impression.</p>
          <span class="btn-primary inline-block mt-3 md:mt-5 w-auto px-5 md:px-7 py-2.5 text-sm">Shop Now</span>
        </div>
      </router-link>

      <!-- AirPods Max -->
      <div class="rounded-2xl md:col-span-2 md:row-span-1 bg-[#F5F5F7] flex flex-col md:flex-row items-center gap-4 md:gap-5 p-5 md:p-8 w-full">
        <div class="flex items-center justify-center md:w-1/2 py-1 md:py-0">
          <img src="/images/headpones.png" alt="AirPods" class="w-32 md:w-full max-w-[240px] object-contain" />
        </div>
        <div class="text-center md:text-left md:w-1/2">
          <h3 class="text-lg md:text-2xl font-bold not-italic">AirPods <span class="font-light">Max</span></h3>
          <p class="italic text-gray-500 text-xs md:text-sm mt-1 hidden md:block">Computational audio.</p>
        </div>
      </div>

      <!-- Vision Pro -->
      <div class="rounded-2xl md:col-span-2 md:row-span-1 bg-[#2a2a2a] text-white flex flex-col md:flex-row items-center gap-4 md:gap-5 p-5 md:p-8 w-full">
        <div class="flex items-center justify-center md:w-1/2 py-1 md:py-0">
          <img src="/images/visionpro.png" alt="Vision Pro" class="w-32 md:w-full max-w-[240px] object-contain" />
        </div>
        <div class="text-center md:text-left md:w-1/2">
          <h3 class="text-lg md:text-2xl font-bold not-italic">Vision <span class="font-light">Pro</span></h3>
          <p class="italic text-gray-400 text-xs md:text-sm mt-1 hidden md:block">An immersive way.</p>
        </div>
      </div>

    </div>
  </section>

  <!-- ===== КАТЕГОРИИ ===== -->
  <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
    <div class="flex items-center justify-between mb-5 md:mb-8">
      <h2 class="text-xl md:text-3xl font-semibold not-italic">Browse By Category</h2>
      <div class="flex gap-2">
        <button @click="scrollCat(-1)" class="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 19l-7-7 7-7"/></svg>
        </button>
        <button @click="scrollCat(1)" class="w-8 h-8 md:w-10 md:h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-black hover:text-white transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7"/></svg>
        </button>
      </div>
    </div>
    <div ref="catScrollRef" class="flex gap-4 md:gap-6 overflow-x-auto pb-2 hide-scrollbar">
      <router-link v-for="cat in displayCategories" :key="cat.id" :to="`/catalog/category/${cat.id}`"
        class="category-card w-36 md:w-52 py-6 md:py-8">
        <img :src="cat.image" :alt="cat.name" class="w-14 h-14 md:w-20 md:h-20 object-contain group-hover:scale-110 transition-transform" />
        <span class="italic text-xs md:text-base font-medium text-gray-600 text-center">{{ cat.name }}</span>
      </router-link>
    </div>
  </section>

  <!-- ===== ВИТРИНА ТОВАРОВ ===== -->
  <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
    <div class="flex items-center gap-3 md:gap-6 mb-5 md:mb-8 border-b border-gray-200 overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.key" @click="activeTab = tab.key"
        class="pb-2 md:pb-3 text-sm md:text-lg whitespace-nowrap transition"
        :class="activeTab === tab.key ? 'font-semibold border-b-2 border-black not-italic' : 'italic text-gray-400 hover:text-black'">
        {{ tab.label }}
      </button>
    </div>
    <div v-if="loading" class="text-center py-10 italic text-gray-400">
      <div class="inline-block w-7 h-7 border-2 border-gray-300 border-t-black rounded-full animate-spin mb-3"></div>
      <p class="text-sm">Загрузка...</p>
    </div>
    <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
      <ProductCard v-for="product in displayProducts" :key="product.id" :product="product" />
    </div>
    <div v-if="products.length > 8" class="text-center mt-6 md:mt-8">
      <router-link to="/catalog" class="btn-outline inline-block px-6 md:px-8 py-2.5">Смотреть все</router-link>
    </div>
  </section>

  <!-- ===== АКЦЕНТНЫЕ БАННЕРЫ ===== -->
  <section class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
      <router-link v-for="(b, i) in accentBanners" :key="i" :to="b.link"
        class="rounded-xl md:rounded-2xl p-4 md:p-8 flex flex-col min-h-[220px] md:min-h-[380px] hover-lift overflow-hidden group" :class="b.bg">
        <!-- Фото сверху -->
        <div class="flex-1 flex items-center justify-center mb-3 md:mb-4">
          <img :src="b.image" :alt="b.title" class="max-h-[100px] md:max-h-[180px] max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
        </div>
        <!-- Текст снизу -->
        <div>
          <h3 class="text-sm md:text-xl font-semibold not-italic mb-0.5 md:mb-2" :class="b.textColor">{{ b.title }}</h3>
          <p class="italic text-[10px] md:text-sm mb-2 md:mb-4" :class="b.descColor">{{ b.desc }}</p>
          <span class="btn-outline inline-block px-3 py-1.5 md:px-4 md:py-2 text-[10px] md:text-sm pointer-events-none" :class="b.btnClass">Shop Now</span>
        </div>
      </router-link>
    </div>
  </section>

  <!-- ===== СКИДКИ ===== -->
  <section v-if="discountedProducts.length > 0" class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-12">
    <h2 class="text-xl md:text-3xl font-semibold not-italic mb-5 md:mb-8">Скидки до -50%</h2>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6">
      <ProductCard v-for="product in discountedProducts" :key="product.id" :product="product" />
    </div>
  </section>

  <!-- ===== НИЖНИЙ БАННЕР ===== -->
  <section class="bg-[#353535] text-white overflow-hidden">
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-12 md:py-24 text-center relative">
      <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div class="w-48 md:w-96 h-48 md:h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
      </div>
      <h2 class="text-2xl md:text-5xl font-bold not-italic relative z-10">Big Summer Sale</h2>
      <p class="italic text-gray-300 mt-2 md:mt-4 relative z-10 text-xs md:text-base">Скидки до 50%</p>
      <router-link to="/catalog" class="inline-block mt-5 md:mt-8 px-6 md:px-8 py-2.5 md:py-3 bg-white text-black rounded-xl italic text-xs md:text-sm font-medium hover:bg-gray-100 transition relative z-10">Shop Now</router-link>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { getAllProducts, getAllCategories } from '../api'
import type { Product, Category } from '../store'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)
const activeTab = ref('new')
/* Hero-фото: положи своё фото в public/images/hero-iphone.png */
const heroImageSrc = '/images/hero-iphone.png'
const heroImageLoaded = ref(false)

function checkHeroImage() {
  const img = new Image()
  img.onload = () => { heroImageLoaded.value = true }
  img.onerror = () => { heroImageLoaded.value = false }
  img.src = heroImageSrc
}
const catScrollRef = ref<HTMLElement | null>(null)

/* Маппинг картинок по ИМЕНИ категории (case-insensitive) */
function getCategoryImage(cat: Category): string {
  const n = (cat.name || '').toLowerCase()
  if (n.includes('тел') || n.includes('фон') || n.includes('phone') || n.includes('айфон') || n.includes('iphone')) return '/images/cat-phones.png'
  if (n.includes('час') || n.includes('watch') || n.includes('смарт')) return '/images/cat-watches.png'
  if (n.includes('науш') || n.includes('head') || n.includes('airpod') || n.includes('аудио')) return '/images/cat-headphones.png'
  if (n.includes('комп') || n.includes('comp') || n.includes('пк') || n.includes('ноут') || n.includes('mac') || n.includes('laptop')) return '/images/cat-computers.png'
  if (n.includes('кам') || n.includes('cam') || n.includes('фото')) return '/images/cat-cameras.png'
  if (n.includes('гейм') || n.includes('gam') || n.includes('игр') || n.includes('play') || n.includes('консол')) return '/images/cat-phones.png'
  return '/images/cat-phones.png'
}

/* Показываем ВСЕ категории из API */
const displayCategories = computed(() => {
  if (!categories.value.length) return []
  return categories.value.map(cat => ({
    id: cat.id,
    name: cat.name,
    image: getCategoryImage(cat)
  }))
})

const tabs = [
  { key: 'new', label: 'New Arrival' },
  { key: 'best', label: 'Bestseller' },
  { key: 'top', label: 'Top Rated' },
]

const accentBanners = [
  { title: 'iPhone', desc: 'Смартфоны Apple', bg: 'bg-white border border-gray-100', textColor: 'text-black', descColor: 'text-gray-500', btnClass: '', image: '/images/14promax.png', link: '/catalog/category/2' },
  { title: 'iPad', desc: 'Планшеты для работы и развлечений', bg: 'bg-[#F5F5F7]', textColor: 'text-black', descColor: 'text-gray-500', btnClass: '', image: '/images/ipad.png', link: '/catalog/category/4' },
  { title: 'Часы', desc: 'Смарт-часы и фитнес-браслеты', bg: 'bg-[#E8E8ED]', textColor: 'text-black', descColor: 'text-gray-600', btnClass: '', image: '/images/watches.png', link: '/catalog/category/5' },
  { title: 'MacBook', desc: 'Ноутбуки Apple', bg: 'bg-[#CCCCCC]', textColor: 'text-black', descColor: 'text-gray-700', btnClass: '', image: '/images/macbook.png', link: '/catalog/category/3' },
]

const displayProducts = computed(() => {
  let sorted = [...products.value]
  if (activeTab.value === 'top') sorted.sort((a, b) => b.rating - a.rating)
  else if (activeTab.value === 'best') sorted.sort((a, b) => b.count_review - a.count_review)
  return sorted.slice(0, 8)
})

const discountedProducts = computed(() => products.value.filter(p => p.discount_price).slice(0, 4))

/* Ссылка на категорию компьютеров для MacBook Air */
const computersCategoryLink = computed(() => {
  const comp = categories.value.find(c => {
    const n = (c.name || '').toLowerCase()
    return n.includes('комп') || n.includes('comp') || n.includes('ноут') || n.includes('mac') || n.includes('пк')
  })
  return comp ? `/catalog/category/${comp.id}` : '/catalog'
})

function scrollCat(dir: number) {
  catScrollRef.value?.scrollBy({ left: dir * 200, behavior: 'smooth' })
}

/* Фоллбэк категории если API недоступен */
const fallbackCategories = [
  { id: 2, name: 'Телефоны' },
  { id: 3, name: 'Компьютеры' },
  { id: 4, name: 'Часы' },
  { id: 5, name: 'Наушники' },
]

onMounted(async () => {
  checkHeroImage()
  try {
    const [prods, cats] = await Promise.all([getAllProducts(), getAllCategories()])
    products.value = prods
    /* Показываем ВСЕ категории из API как есть */
    if (cats && cats.length) {
      categories.value = cats
      console.log('✅ Категории из API:', JSON.stringify(cats))
      cats.forEach((c: any) => console.log(`  id=${c.id} name="${c.name}"`))
    } else {
      console.log('⚠️ API вернул пустые категории, используем фоллбэк')
      categories.value = fallbackCategories
    }
  } catch (e) {
    console.error('❌ Ошибка загрузки:', e)
    categories.value = fallbackCategories
  }
  finally { loading.value = false }
})
</script>
