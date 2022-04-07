<template>
  <div>
    <template v-for="(item, idx) in items">
      {{ void ((arr = getStatus(item)), (k = arr.length)) || 'hello world' }}
      <div :key="idx" class="space-x-4">
        <span>{{ arr }}</span>
        <span>{{ k }}</span>
        <span>{{ idx }}</span>
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    getStatus(idx) {
      return new Array(idx).fill(idx)
    }
  }
}
</script> 

