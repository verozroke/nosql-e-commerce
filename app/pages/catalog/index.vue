<template>
  <div class="bg-slate-100 w-screen min-h-screen overflow-x-hidden flex flex-col px-20 py-10">
    <n-h1>
      Catalog
    </n-h1>
    <n-p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, totam! Eos, dolorem quis. Alias, officia!
    </n-p>
    <n-input-group class="max-w-1/2">
      <n-input
        v-model:value="searchParams.q"
        @input="search"
      >
        <template #prefix>
          <n-icon>
            <SearchOutlined />
          </n-icon>
        </template>
      </n-input>
      <n-button
        type="primary"
        ghost
      >
        Search
      </n-button>
    </n-input-group>
    <div class="flex w-full gap-8">
      <div class="flex flex-col w-sm">
        <n-h4>Category</n-h4>
        <n-select
          v-model:value="searchParams.category"
          filterable
          class="w-full"
          multiple
          placeholder="Please select a category"
          :options="categories"
          @update:value="search"
        />
      </div>
      <div class="flex flex-col w-sm">
        <n-h4>Price</n-h4>
        <n-slider
          v-model:value="priceRange"
          range
          :step="10000"
          :max='200000'
          @update:value="search"
        />
      </div>
    </div>
    <n-pagination
      v-model:page="searchParams.page"
      :page-count="Math.ceil(totalProductsCount / 12)"
      @update:page="search"
    />
    <ProductList :products="products" />
  </div>
</template>

<script setup lang="ts">
import { useMessage, NH1, NH4, NP, NSelect, NSlider, NInput, NInputGroup, NButton, NIcon, NPagination } from 'naive-ui';

import { productService, type SearchParamsType } from '~/core/services/product.service';
import type { Product } from '~/core/types/product';
import { SearchOutlined } from '@vicons/material'
import { debounce } from '~/core/utils/debounce';
const router = useRouter()
const message = useMessage()
const products = ref<Product[]>([])

const categories = [
  { label: "Hoodies", value: "hoodies" },
  { label: "Pants", value: "pants" },
  { label: "T-Shirts", value: "t-shirts" },
  { label: "Outerwear", value: "outerwear" },
  { label: "Shoes", value: "shoes" },

  { label: "T-Shirt", value: "t-shirt" },
  { label: "Hoodie", value: "hoodie" },
  { label: "Sweatshirt", value: "sweatshirt" },
  { label: "Pants", value: "pants" },
  { label: "Shorts", value: "shorts" },
  { label: "Jacket", value: "jacket" },
  { label: "Sneakers", value: "sneakers" },
  { label: "Cap", value: "cap" },
  { label: "Socks", value: "socks" },
  { label: "Backpack", value: "backpack" },
  { label: "Shirt", value: "shirt" }
]

const priceRange = ref([0, 40000])
const totalProductsCount = ref(0)

const searchParams = ref<SearchParamsType>({
  q: '',
  min_price: priceRange.value[0],
  max_price: priceRange.value[1],
  category: null,
  page: 1
})



async function getProducts() {
  try {
    const data = await productService.products(searchParams.value)
    products.value = data.items
    searchParams.value.page = data.page
    totalProductsCount.value = data.total
  } catch (error) {
    console.error(error)
    message.error('Could not get products')
  }
}

const debouncedSearch = debounce(() => {
  getProducts()
}, 400)

function search() {
  searchParams.value.min_price = priceRange.value[0]
  searchParams.value.max_price = priceRange.value[1]

  debouncedSearch()
}


onMounted(async () => {
  if (!localStorage.getItem('token')) {
    router.push('/sign-in')
    return
  }

  await getProducts()

})


</script>

<style scoped></style>