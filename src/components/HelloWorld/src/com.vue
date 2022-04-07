<script setup>
import { ref } from 'vue'

const items = ref([1, 2, 3, 4, 5, 6])

const getStatus = (idx) => {
  return new Array(idx).fill(idx)
}
// createTextVNode
</script>

<template>
  <h1>{{ msg }}</h1>
  <template :key="idx" v-for="(item,idx) in items">
    {{ void ((arr = getStatus(item)), (k = arr.length)) }}
    <div class="space-x-4"> 
      <span>{{ arr }}</span>
      <span>{{ k }}</span>
      <span>{{ idx }}</span>
      <span>{{ item }}</span>
    </div>
  </template>
</template>

<style scoped>
</style>
