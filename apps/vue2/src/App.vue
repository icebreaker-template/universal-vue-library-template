<template>
  <HelloWorld></HelloWorld>
</template>

<script lang="ts">
import HelloWorld from './components/HelloWorld/src/index.vue'
export default {
  components: {
    HelloWorld
  }
}
</script>
<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>
