<template>
  <div ref="dom" class="som-frame-selection-inner-box">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'FrameSelectionItem',
  // @ts-ignore
  componentName: 'SomFrameSelectionItem',
  inject: ['SomFrameSelection'],
  mounted () {
    // @ts-ignore
    this.SomFrameSelection.fields.push(this)
  },
  beforeDestroy () {
    // @ts-ignore
    this.SomFrameSelection.fields.splice(
      // @ts-ignore
      this.SomFrameSelection.fields.indexOf(this),
      1
    )
  }
})
</script>
