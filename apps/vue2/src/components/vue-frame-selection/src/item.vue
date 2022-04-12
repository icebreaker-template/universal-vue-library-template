<template>
  <div ref="dom" class="som-frame-selection-inner-box">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FrameSelectionItem',
  componentName: 'SomFrameSelectionItem',
  inject: ['SomFrameSelection'],
  mounted () {
    this.SomFrameSelection.fields.push(this)
  },
  beforeDestroy () {
    this.SomFrameSelection.fields.splice(
      this.SomFrameSelection.fields.indexOf(this),
      1
    )
  }
}
</script>
