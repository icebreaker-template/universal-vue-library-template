<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld/src/com.vue';
import HelloWorld2 from 'vue3-hello-world';
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <HelloWorld2 msg="1234"></HelloWorld2>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
