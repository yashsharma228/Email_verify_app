<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useProductsStore } from '../stores/products'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'added'): void
}>()

const { addProduct } = useProductsStore()

const form = reactive({
  name: 'CakeZone Walnut Brownie',
  type: '',
  quantity: '',
  mrp: '',
  sellingPrice: '',
  brand: '',
  description: '',
  image: '',
  totalImages: '',
  productUrl: '',
  exchangeEligible: 'Yes',
})

const errors = reactive<Record<string, string>>({})
const isSubmitting = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const imagePreview = ref('')

const close = () => {
  emit('update:modelValue', false)
}

const validate = () => {
  errors.name = form.name ? '' : 'Required'
  errors.type = form.type ? '' : 'Required'
  errors.quantity = form.quantity ? '' : 'Required'
  errors.mrp = form.mrp ? '' : 'Required'
  errors.sellingPrice = form.sellingPrice ? '' : 'Required'
  errors.image = form.image ? '' : 'Required'
  errors.totalImages = form.totalImages ? '' : 'Required'
  errors.productUrl = form.productUrl ? '' : 'Required'

  return !Object.values(errors).some(Boolean)
}

const reset = () => {
  form.name = 'CakeZone Walnut Brownie'
  form.type = ''
  form.quantity = ''
  form.mrp = ''
  form.sellingPrice = ''
  form.brand = ''
  form.description = ''
  form.image = ''
  form.totalImages = ''
  form.productUrl = ''
  form.exchangeEligible = 'Yes'
  imagePreview.value = ''
  Object.keys(errors).forEach((key) => (errors[key] = ''))
}

const onFilePick = () => {
  fileInput.value?.click()
}

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const result = reader.result as string
    form.image = result
    imagePreview.value = result
    errors.image = ''
  }
  reader.readAsDataURL(file)
}

const submit = async () => {
  if (!validate()) return
  isSubmitting.value = true
  addProduct({
    name: form.name.trim(),
    type: form.type,
    quantity: Number(form.quantity),
    mrp: Number(form.mrp),
    sellingPrice: Number(form.sellingPrice),
    brand: form.brand.trim(),
    description: form.description.trim(),
    image: form.image.trim(),
    totalImages: Number(form.totalImages),
    productUrl: form.productUrl.trim(),
    exchangeEligible: form.exchangeEligible === 'Yes',
  })
  isSubmitting.value = false
  emit('added')
  reset()
  close()
}
</script>

<template>
  <div v-if="modelValue" class="modal-backdrop" @click.self="close">
    <div class="modal">
      <div class="modal-header">
        <h4>Add Product</h4>
        <button class="close" aria-label="Close" @click="close">×</button>
      </div>

      <div class="modal-body">
        <label>
          Product Name
          <input type="text" v-model="form.name" placeholder="CakeZone Walnut Brownie" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </label>

        <label>
          Product Type
          <div class="select-wrapper">
            <select v-model="form.type">
              <option value="">Select product type</option>
              <option value="Food">Food</option>
              <option value="Dessert">Dessert</option>
              <option value="Beverage">Beverage</option>
            </select>
          </div>
          <span v-if="errors.type" class="error">{{ errors.type }}</span>
        </label>

        <label>
          Quantity Stock
          <input type="number" v-model="form.quantity" placeholder="Total numbers of Stock available" />
          <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
        </label>

        <label>
          MRP
          <input type="number" v-model="form.mrp" placeholder="Total numbers of Stock available" />
          <span v-if="errors.mrp" class="error">{{ errors.mrp }}</span>
        </label>

        <label>
          Selling Price
          <input type="number" v-model="form.sellingPrice" placeholder="Total numbers of Stock available" />
          <span v-if="errors.sellingPrice" class="error">{{ errors.sellingPrice }}</span>
        </label>

        <label>
          Brand Name
          <input type="text" v-model="form.brand" placeholder="Total numbers of Stock available" />
        </label>

        <label>
          Upload Product Images
          <div class="upload-box">
            <div class="upload-text">
              <span>Select an image file</span>
              <small>PNG, JPG</small>
            </div>
            <button class="browse" type="button" @click="onFilePick">Browse</button>
            <input
              ref="fileInput"
              class="file-input"
              type="file"
              accept="image/*"
              @change="onFileChange"
            />
          </div>
          <span v-if="errors.image" class="error">{{ errors.image }}</span>
        </label>

        <div v-if="imagePreview" class="preview">
          <img :src="imagePreview" alt="Preview" />
        </div>

        <label>
          Total Number of images
          <input type="number" v-model="form.totalImages" placeholder="Total numbers of images" />
          <span v-if="errors.totalImages" class="error">{{ errors.totalImages }}</span>
        </label>

        <label>
          Product URL
          <input type="url" v-model="form.productUrl" placeholder="https://example.com/product" />
          <span v-if="errors.productUrl" class="error">{{ errors.productUrl }}</span>
        </label>

        <label>
          Exchange or return eligibility
          <div class="select-wrapper">
            <select v-model="form.exchangeEligible">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </label>
      </div>

      <div class="modal-footer">
        <button class="primary" :disabled="isSubmitting" @click="submit">
          {{ isSubmitting ? 'Saving...' : 'Save Product' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;
}

.modal {
  width: 520px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e5e7eb;
  font-weight: 600;
}

.modal-body {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow-y: auto;
  max-height: 60vh;
}

.modal-body label {
  font-size: 13px;
  color: #475569;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

input,
select {
  width: 100%;
  padding: 12px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #0f172a;
}

.select-wrapper {
  position: relative;
}

.select-wrapper select {
  appearance: none;
}

.upload-box {
  border: 1px dashed #cbd5e1;
  border-radius: 8px;
  padding: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #475569;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.browse {
  background: none;
  border: none;
  color: #1d4ed8;
  font-weight: 600;
  cursor: pointer;
}

.file-input {
  display: none;
}

.preview {
  margin-top: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 8px;
  display: flex;
  justify-content: center;
}

.preview img {
  max-height: 160px;
  object-fit: contain;
}

.modal-footer {
  padding: 12px 20px 18px;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #e5e7eb;
}

.primary {
  padding: 10px 18px;
  border-radius: 6px;
  border: none;
  background: linear-gradient(90deg, #1d4ed8, #0b43c1);
  color: #fff;
  cursor: pointer;
}

.primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #475569;
}

.error {
  color: #ef4444;
  font-size: 12px;
}
</style>

