<template>
  <div ref="dom" class="som-frame-selection-inner-box">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, onBeforeUnmount, ref } from 'vue'
import { FrameSelectionSymbol } from './shared'
import type { IProvideMethods } from './shared'

export default defineComponent({
  name: 'FrameSelectionItem',
  componentName: 'SomFrameSelectionItem',
  setup () {
    const SomFrameSelection = inject<IProvideMethods>(FrameSelectionSymbol)
    const dom = ref<HTMLElement>()
    onMounted(() => {
      SomFrameSelection?.addField(dom.value as HTMLElement)
    })
    onBeforeUnmount(() => {
      SomFrameSelection?.removeField(dom.value as HTMLElement)
    })
    return {
      dom
    }
  }

})
</script>
