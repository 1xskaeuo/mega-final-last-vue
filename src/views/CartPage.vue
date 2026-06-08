  <template>
    <div class="max-w-[1400px] mx-auto px-4 md:px-8 py-6 md:py-8">
      <h1 class="text-xl md:text-3xl font-bold not-italic mb-5 md:mb-8">Корзина</h1>

      <div v-if="state.cart.length === 0" class="text-center py-14 md:py-20">
        <div class="text-5xl mb-4"></div>
        <p class="italic text-gray-400 text-base md:text-lg mb-2">Корзина пуста</p>
        <router-link to="/catalog" class="btn-primary inline-block w-auto px-8 py-3 mt-4">Каталог</router-link>
      </div>

      <div v-else class="flex flex-col lg:flex-row gap-6 md:gap-8">

        <div class="flex-1 min-w-0">
          <div v-for="(item, index) in state.cart" :key="item.product.id"
            class="cart-item" :class="{ 'border-t border-gray-200': index > 0 }">

            <router-link :to="`/product/${item.product.id}`" class="cart-item-image">
              <img v-if="getProductImage(item.product)" :src="getProductImage(item.product)" class="max-h-full max-w-full object-contain" />
              <div v-else class="text-2xl">📱</div>
            </router-link>

            <div class="flex-1 min-w-0">
              <router-link :to="`/product/${item.product.id}`" class="font-medium italic text-sm md:text-base hover:underline line-clamp-2">
                {{ item.product.name }}
              </router-link>
              <p class="text-gray-400 text-xs italic mt-1">{{ item.product.brand }} · {{ item.product.color }}</p>
              <p class="text-gray-300 text-[10px] italic">Арт. #{{ String(item.product.id).padStart(6, '0') }}</p>
            </div>

            <div class="cart-quantity-control">
              <button @click="updateCartQuantity(item.product.id, item.quantity - 1)" class="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/></svg>
              </button>
              <span class="italic text-sm w-6 text-center font-semibold">{{ item.quantity }}</span>
              <button @click="updateCartQuantity(item.product.id, item.quantity + 1)" class="w-7 h-7 flex items-center justify-center text-gray-500 hover:text-black transition">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>
              </button>
            </div>

            <div class="text-right shrink-0 w-20 md:w-24">
              <p class="italic font-semibold text-sm md:text-base">{{ formatPrice(getDisplayPrice(item.product) * item.quantity) }}</p>
              <p v-if="item.product.discount_price" class="text-[10px] text-gray-400 line-through italic">{{ formatPrice(item.product.price * item.quantity) }}</p>
            </div>

            <button @click="removeFromCart(item.product.id)" class="p-2 text-gray-300 hover:text-red-500 transition shrink-0">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div class="order-summary w-full lg:w-96 h-fit lg:sticky lg:top-24">
          <h2 class="text-lg md:text-xl font-semibold not-italic mb-5">Оформление заказа</h2>

          <div class="mb-3">
            <label class="text-xs text-gray-500 italic mb-1 block">Промокод</label>
            <div class="flex gap-2">
              <input v-model="promoCode" type="text" placeholder="Введите код"
                class="flex-1 bg-[#F5F5F7] rounded-lg px-3 py-2.5 text-sm italic outline-none focus:ring-1 focus:ring-gray-300 placeholder:not-italic" />
              <button class="px-4 py-2.5 bg-black text-white rounded-lg italic text-sm hover:bg-gray-800 transition">OK</button>
            </div>
          </div>

          <div class="mb-6">
            <label class="text-xs text-gray-500 italic mb-1 block">Бонусная карта</label>
            <div class="flex gap-2">
              <input v-model="bonusCard" type="text" placeholder="Номер карты"
                class="flex-1 bg-[#F5F5F7] rounded-lg px-3 py-2.5 text-sm italic outline-none focus:ring-1 focus:ring-gray-300 placeholder:not-italic" />
              <button class="px-4 py-2.5 bg-black text-white rounded-lg italic text-sm hover:bg-gray-800 transition">OK</button>
            </div>
          </div>

          <div class="h-px bg-gray-200 mb-5"></div>

          <div class="space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="italic text-gray-500">Подытог</span>
              <span class="italic font-medium">{{ formatPrice(subtotal) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="italic text-gray-500">Налог (5%)</span>
              <span class="italic font-medium">{{ Math.round(tax).toLocaleString('ru-RU') }} ₽</span>
            </div>
            <div class="flex justify-between">
              <span class="italic text-gray-500">Доставка</span>
              <span class="italic font-medium">{{ shipping === 0 ? 'Бесплатно' : shipping + ' ₽' }}</span>
            </div>
            <div class="h-px bg-gray-200 my-2"></div>
            <div class="flex justify-between items-center">
              <span class="font-bold not-italic text-base">Итого</span>
              <span class="font-bold text-xl not-italic">{{ formatPrice(Math.round(total)) }}</span>
            </div>
          </div>

          <button @click="handleCheckout" class="btn-primary mt-6 py-4 text-base md:text-lg rounded-2xl">
            Оформить заказ
          </button>
          <router-link to="/catalog" class="block text-center mt-3 italic text-xs text-gray-400 hover:text-black transition">
            Продолжить покупки →
          </router-link>
        </div>
      </div>

      <div v-if="showSuccess" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showSuccess = false">
        <div class="bg-white rounded-2xl p-8 max-w-sm w-full text-center">
          <div class="text-5xl mb-4"></div>
          <h3 class="text-xl font-bold not-italic mb-2">Заказ оформлен!</h3>
          <p class="italic text-gray-500 text-sm mb-6">Спасибо за покупку!</p>
          <router-link to="/catalog" @click="showSuccess = false" class="btn-primary inline-block w-auto px-8 py-3">Каталог</router-link>
        </div>
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import state, { removeFromCart, updateCartQuantity, clearCart, getProductImage, getDisplayPrice, formatPrice } from '../store'

  const promoCode = ref('')
  const bonusCard = ref('')
  const showSuccess = ref(false)

  const subtotal = computed(() => state.cart.reduce((sum, i) => sum + getDisplayPrice(i.product) * i.quantity, 0))
  const tax = computed(() => subtotal.value * 0.05)
  const shipping = computed(() => subtotal.value > 5000 ? 0 : 300)
  const total = computed(() => subtotal.value + tax.value + shipping.value)

  function handleCheckout() { showSuccess.value = true; clearCart() }
  </script>
