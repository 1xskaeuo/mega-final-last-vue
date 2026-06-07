import { ref, reactive, computed } from 'vue'

export interface Product {
  id: number
  createdAt: string
  price: number
  discount_price: number | null
  guarantee: number
  rating: number
  count_review: number
  is_available: boolean | string
  store_address: string | null
  color: string
  brand: string
  country: string
  category: string
  name: string
  images: string[]
  characteristics: {
    characteristic: string
    unit_type: string
    value: string
  }[]
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: number
  name: string
}

export const searchQuery = ref('')

const state = reactive({
  cart: [] as CartItem[],
  favorites: [] as Product[],
})

export const cartCount = computed(() =>
  state.cart.reduce((sum, item) => sum + item.quantity, 0)
)

export const favCount = computed(() => state.favorites.length)

export function addToCart(product: Product) {
  const existing = state.cart.find(item => item.product.id === product.id)
  if (existing) existing.quantity++
  else state.cart.push({ product, quantity: 1 })
}

export function removeFromCart(productId: number) {
  const idx = state.cart.findIndex(item => item.product.id === productId)
  if (idx >= 0) state.cart.splice(idx, 1)
}

export function updateCartQuantity(productId: number, qty: number) {
  const item = state.cart.find(item => item.product.id === productId)
  if (item) item.quantity = Math.max(1, qty)
}

export function clearCart() {
  state.cart.splice(0, state.cart.length)
}

export function toggleFavorite(product: Product) {
  const idx = state.favorites.findIndex(p => p.id === product.id)
  if (idx >= 0) state.favorites.splice(idx, 1)
  else state.favorites.push(product)
}

export function isFavorite(productId: number): boolean {
  return state.favorites.some(p => p.id === productId)
}

const API_BASE = 'http://localhost:1452'

export function getProductImage(product: Product): string {
  const img = product.images?.[0]
  if (!img) return ''
  return `${API_BASE}/${img}`
}

export function getProductImages(product: Product): string[] {
  if (!product.images?.length) return []
  return product.images.map(img => `${API_BASE}/${img}`)
}

export function getDisplayPrice(product: Product): number {
  return product.discount_price || product.price
}

export function formatPrice(price: number): string {
  return price.toLocaleString('ru-RU') + ' ₽'
}

export function getProductName(product: Product): string {
  return product.name || 'Unknown Product'
}

export default state
