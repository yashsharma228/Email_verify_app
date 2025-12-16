<script setup lang="ts">
import { ref } from 'vue'
import ProductModal from './ProductModal.vue'
import { useProductsStore } from '../stores/products'

const showModal = ref(false)
const { hasProducts } = useProductsStore()

const toggleModal = () => {
  showModal.value = !showModal.value
}
</script>

<template>
  <div class="empty-state">
    <div class="icon">
      <div></div><div></div>
      <div></div><div class="plus">+</div>
    </div>

    <h3 v-if="!hasProducts">Feels a little empty over here...</h3>
    <h3 v-else>Add more products</h3>
    <p>
      You can create products without connecting store<br />
      you can add products to store anytime
    </p>

    <button class="primary" @click="toggleModal">Add your Products</button>

    <ProductModal v-model="showModal" @added="toggleModal" />
  </div>
</template>

<style scoped>
/* center block exactly like your first image */
.empty-state {
  text-align: center;
  color: #475569;
}
.icon {
  display: grid;
  grid-template-columns: repeat(2, 32px);
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
}
.icon div {
  width: 32px;
  height: 32px;
  border: 2px solid #1e3a8a;
  border-radius: 6px;
}
.icon .plus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}
.primary {
  margin-top: 16px;
  padding: 10px 28px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(90deg, #1d4ed8, #0b43c1);
  color: #fff;
  cursor: pointer;
}
</style>
