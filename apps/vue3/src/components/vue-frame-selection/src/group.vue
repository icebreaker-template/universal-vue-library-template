<template>
  <div ref="wrap" class="som-frame-selection-group-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { MouseSelection } from './lib'
import { defineComponent, provide, onMounted, ref } from 'vue'
import { FrameSelectionSymbol } from './shared'
import type { IProvideMethods, PositionSizeMap } from './shared'

export default defineComponent({
  name: 'FrameSelectionGroup',
  // @ts-ignore
  componentName: 'SomFrameSelectionGroup',
  // emits: ['mousedown', 'mouseup', 'mousemove'],
  // expose: ['selection', 'fields', 'cacheDoms', 'isInTheSelection', 'getInnerBoxRectList'],
  setup (props, ctx) {
    const fields = ref<HTMLElement[]>()
    const selection = ref<MouseSelection>()
    const wrap = ref<HTMLElement>()
    const provideValue: IProvideMethods = {
      addField: (item: HTMLElement) => {
        fields.value?.push(item)
      },
      removeField: (item: HTMLElement) => {
        const v = fields.value
        if (v) {
          v.slice(v.indexOf(item), 1)
        }
      }
    }
    provide(FrameSelectionSymbol, provideValue)

    // const cacheDoms = computed(() => {
    //   // @ts-ignore
    //   return fields.value.map((x) => x.dom)
    // })
    const isInTheSelection = (rect: PositionSizeMap) => {
      if (selection) {
        return selection.value?.isInTheSelection(rect)
      }
    }
    const getInnerBoxRectList = () => {
      return fields.value?.map((dom) => {
        return {
          left: dom.offsetLeft,
          top: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight
        }
      })
    }
    onMounted(() => {
      selection.value = new MouseSelection(wrap.value, {
        onMousedown: (e) => {
          ctx.emit('mousedown', e)
        },
        onMousemove: (e) => {
          ctx.emit('mousemove', e)
        },
        onMouseup: (e) => {
          ctx.emit('mouseup', e)
        },
        className: props.className,
        disabled: () => {
          return props.disabled ?? false
        },
        stopSelector: props.stopSelector,
        stopPropagation: props.stopPropagation,
        notSetWrapPosition: props.notSetWrapPosition,
        scale: props.scale,
        zIndex: props.zIndex
      })
    })
    return {
      fields,
      selection,
      // cacheDoms,
      isInTheSelection,
      getInnerBoxRectList,
      wrap
    }
  },
  props: {
    className: {
      type: [String]
    },
    scale: {
      type: [Number]
    },
    zIndex: {
      type: [Number]
    },
    disabled: {
      type: [Boolean]
    },
    stopPropagation: {
      type: [Boolean]
    },
    stopSelector: {
      type: [String]
    },
    notSetWrapPosition: {
      type: [Boolean]
    }
  }

})

</script>
