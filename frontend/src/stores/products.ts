import { ref, computed } from 'vue'

export type Product = {
  id: number
  name: string
  type: string
  quantity: number
  mrp: number
  sellingPrice: number
  brand: string
  description: string
  exchangeEligible: boolean
  image: string
  totalImages: number
  productUrl: string
  published: boolean
  createdAt: string
}

const sampleProducts: Product[] = [
  {
    id: 1,
    name: 'CakeZone Walnut Brownie',
    type: 'Food',
    quantity: 200,
    mrp: 2000,
    sellingPrice: 2000,
    brand: 'CakeZone',
    description: 'Rich walnut brownie',
    exchangeEligible: true,
    image:
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=60',
    totalImages: 2,
    productUrl: 'https://example.com/walnut-brownie',
    published: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'CakeZone Choco Fudge Brownie',
    type: 'Food',
    quantity: 200,
    mrp: 23,
    sellingPrice: 80,
    brand: 'CakeZone',
    description: 'Choco fudge brownie',
    exchangeEligible: true,
    image:
      'https://images.unsplash.com/photo-1589712180324-3286cba5f28e?auto=format&fit=crop&w=600&q=60',
    totalImages: 5,
    productUrl: 'https://example.com/choco-fudge-brownie',
    published: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'Theobroma Christmas Cake',
    type: 'Food',
    quantity: 200,
    mrp: 23,
    sellingPrice: 80,
    brand: 'Theobroma',
    description: 'Classic christmas cake',
    exchangeEligible: true,
    image:
      'https://images.unsplash.com/photo-1606313564200-e75d5e30476f?auto=format&fit=crop&w=600&q=60',
    totalImages: 5,
    productUrl: 'https://example.com/christmas-cake',
    published: false,
    createdAt: new Date().toISOString(),
  },
]

const products = ref<Product[]>([...sampleProducts])

const addProduct = (payload: Omit<Product, 'id' | 'createdAt' | 'published'>) => {
  const now = new Date().toISOString()
  products.value = [
    {
      id: Date.now(),
      createdAt: now,
      published: false,
      ...payload,
    },
    ...products.value,
  ]
}

const togglePublish = (id: number) => {
  products.value = products.value.map((p) =>
    p.id === id ? { ...p, published: !p.published } : p
  )
}

const removeProduct = (id: number) => {
  products.value = products.value.filter((p) => p.id !== id)
}

const hasProducts = computed(() => products.value.length > 0)

export const useProductsStore = () => ({
  products,
  hasProducts,
  addProduct,
  togglePublish,
  removeProduct,
})

