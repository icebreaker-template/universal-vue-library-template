<template>
  <div>
    <template v-for="(item, idx) in items">
      {{ void ((arr = getStatus(item)), (k = arr.length)) }}
      <div :key="idx" class="space-x-4">
        <span>arr: {{ arr }}</span>
        <span>k: {{ k }}</span>
        <span>idx: {{ idx }}</span>

        <span> item: {{ item }}</span>
        <span> {{ ((_ooo = innerItem(idx)), void 0) }}_ooo: {{ _ooo }}</span>
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
      console.log(idx)
      return new Array(idx).fill(idx)
    },
    innerItem(idx) {
      console.log(`innerItem:${idx}`)
      return idx
    }
  }
}
</script> 

