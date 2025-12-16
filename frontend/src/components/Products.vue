<script setup lang="ts">
import { computed, ref } from 'vue'
import ProductModal from './ProductModal.vue'
import { useProductsStore } from '../stores/products'

const showModal = ref(false)
const search = ref('')
const { products, hasProducts, togglePublish, removeProduct } = useProductsStore()

const filtered = computed(() => {
  const term = search.value.toLowerCase()
  if (!term) return products.value
  return products.value.filter(
    (p) =>
      p.name.toLowerCase().includes(term) ||
      p.type.toLowerCase().includes(term) ||
      p.brand.toLowerCase().includes(term)
  )
})

const onPublishToggle = (id: number) => togglePublish(id)
const onDelete = (id: number) => removeProduct(id)
</script>

<template>
  <div class="products">
    <div class="header">
      <div>
        <h2>Products</h2>
        <p class="sub">Manage and view your products</p>
      </div>
      <button class="primary" @click="showModal = true">Add Product</button>
    </div>

    <div class="toolbar">
      <input
        class="search"
        v-model="search"
        type="text"
        placeholder="Search products"
      />
    </div>

    <div v-if="!hasProducts" class="empty">No products yet. Add your first product.</div>

    <div v-else class="cards">
      <div v-for="item in filtered" :key="item.id" class="card">
        <div class="image-wrap">
          <img :src="item.image" :alt="item.name" />
        </div>

        <div class="info">
          <h4 class="title">{{ item.name }}</h4>
          <div class="grid">
            <div class="label">Product type - <span>{{ item.type || 'General' }}</span></div>
            <div class="label">Quantity Stock - <span>{{ item.quantity }}</span></div>
            <div class="label">MRP- <span>₹ {{ item.mrp }}</span></div>
            <div class="label">Selling Price - <span>₹ {{ item.sellingPrice }}</span></div>
            <div class="label">Brand Name - <span>{{ item.brand || 'Unbranded' }}</span></div>
            <div class="label">Total Number of images - <span>{{ item.totalImages }}</span></div>
            <div class="label">
              Exchange Eligibility - <span>{{ item.exchangeEligible ? 'YES' : 'NO' }}</span>
            </div>
            <div class="label">
              Product URL -
              <span>
                <a :href="item.productUrl" target="_blank" rel="noopener noreferrer">{{ item.productUrl }}</a>
              </span>
            </div>
          </div>
        </div>

        <div class="actions">
          <button
            class="publish"
            :class="item.published ? 'green' : 'blue'"
            @click="onPublishToggle(item.id)"
          >
            {{ item.published ? 'Unpublish' : 'Publish' }}
          </button>
          <button class="ghost">Edit</button>
          <button class="ghost danger" @click="onDelete(item.id)">🗑</button>
        </div>
      </div>
    </div>

    <ProductModal v-model="showModal" />
  </div>
</template>

<style scoped>
.products {
  width: 100%;
  padding: 24px;
  color: #0f172a;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.sub {
  color: #64748b;
  margin-top: 4px;
}

.toolbar {
  margin: 16px 0;
}

.search {
  width: 100%;
  padding: 10px 12px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
}

.empty {
  margin-top: 20px;
  color: #64748b;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 16px;
  margin-top: 8px;
}

.card {
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.image-wrap {
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  height: 180px;
}

.image-wrap img {
  max-height: 160px;
  width: auto;
  object-fit: contain;
}

.info {
  padding: 0 16px 6px;
}

.title {
  margin-bottom: 8px;
  font-size: 15px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  color: #475569;
  font-size: 13px;
}

.label span {
  font-weight: 600;
  color: #0f172a;
}

.actions {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 12px;
}

.primary {
  padding: 10px 16px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(90deg, #1d4ed8, #0b43c1);
  color: #fff;
  cursor: pointer;
}

.publish {
  flex: 1;
  padding: 8px 10px;
  border: none;
  border-radius: 8px;
  color: #fff;
  cursor: pointer;
}

.publish.blue {
  background: #1d4ed8;
}

.publish.green {
  background: #22c55e;
}

.ghost {
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  background: #fff;
  cursor: pointer;
  color: #0f172a;
}

.danger {
  color: #ef4444;
  border-color: #fecdd3;
}
</style>

