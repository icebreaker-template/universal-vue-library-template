<script setup>
import { ref } from 'vue'

const items = ref([1, 2, 3, 4, 5, 6])

const getStatus = (idx) => {
  console.log('getStatus' + idx)
  return new Array(idx).fill(idx)
}
const innerItem = (idx) => {
  console.log('innerItem' + idx)
  return idx
}
</script> 



<template>
  <h1>{{ msg }}</h1>
  <template :key="idx" v-for="(item, idx) in items">
    {{ void ((arr = getStatus(idx)), (k = arr.length)) || 'hello world' }}
    <div class="space-x-4">
      <span>arr: {{ arr }}</span>
      <span>k: {{ k }}</span>
      <span>idx: {{ idx }}</span>

      <span> item: {{ item }}</span>
      <span> {{ ((_ooo = innerItem(idx)), void 0) }}_ooo: {{ _ooo }}</span>
    </div>
  </template>
</template>

<style scoped>
</style>
