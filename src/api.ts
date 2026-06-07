const API_BASE = 'http://localhost:1452'

export const getImageUrl = (path: string): string => {
  return `${API_BASE}/${path}`
}

export const getAllProducts = async () => {
  const res = await fetch(`${API_BASE}/api/products`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getProductById = async (id: number | string) => {
  const res = await fetch(`${API_BASE}/api/products/${id}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getCategoryById = async (id: number | string) => {
  const res = await fetch(`${API_BASE}/api/category/${id}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getAllCategories = async () => {
  const res = await fetch(`${API_BASE}/api/category`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getSubcategories = async (categoryId: number | string) => {
  const res = await fetch(`${API_BASE}/api/subcategory?category=${categoryId}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getProductsBySubcategory = async (id: number | string) => {
  const res = await fetch(`${API_BASE}/api/subcategory/${id}`)
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}
