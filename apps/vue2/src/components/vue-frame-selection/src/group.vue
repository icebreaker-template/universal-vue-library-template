<template>
  <div ref="wrap" class="som-frame-selection-group-wrapper">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { MouseSelection } from '@icebreakers/utils'
import Vue from 'vue'
import type { Component } from 'vue'

interface PositionSizeMap {
  left: number
  top: number
  width: number
  height: number
}

export default Vue.extend({
  name: 'FrameSelectionGroup',
  // @ts-ignore
  componentName: 'SomFrameSelectionGroup',
  provide () {
    return {
      SomFrameSelection: this
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
  },
  data () : {
    fields:Component[]
    selection: MouseSelection | null
    } {
    const fields: Component[] = []
    const selection: MouseSelection | null = null
    return {
      selection,
      fields
    }
  },
  computed: {
    cacheDoms () {
      return this.fields.map((x) => x.$refs.dom)
    }
  },
  methods: {
    isInTheSelection (rect:PositionSizeMap) {
      if (this.selection) {
        return this.selection.isInTheSelection(rect)
      }
    },
    getInnerBoxRectList () {
      return this.cacheDoms.map((dom) => {
        return {
          left: dom.offsetLeft,
          top: dom.offsetTop,
          width: dom.offsetWidth,
          height: dom.offsetHeight
        }
      })
    }
  },
  mounted () {
    this.selection = new MouseSelection(this.$refs.wrap as Element, {
      onMousedown: (e) => {
        this.$emit('mousedown', e)
      },
      onMousemove: (e) => {
        this.$emit('mousemove', e)
      },
      onMouseup: (e) => {
        this.$emit('mouseup', e)
      },
      className: this.className,
      disabled: () => {
        return this.disabled
      },
      stopSelector: this.stopSelector,
      stopPropagation: this.stopPropagation,
      notSetWrapPosition: this.notSetWrapPosition,
      scale: this.scale,
      zIndex: this.zIndex
    })
  }
})
</script>
