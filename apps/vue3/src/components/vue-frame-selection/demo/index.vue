<template>
    <div class="p-4">
        <FrameSelectionGroup class="space-x-4" ref="selection" @mousedown="onMousedown" @mousemove="onMousemove"
            @mouseup="onMouseup">
            <FrameSelectionItem :key="i" v-for="i in 100 " class="w-10 h-10 bg-black inline-block"></FrameSelectionItem>
        </FrameSelectionGroup>

        <!-- <Calendar :year="1995" :month="9" :value="set"></Calendar> -->
    </div>
</template>

<script lang="ts" setup>
import { defineProps, computed, withDefaults, ref, defineComponent } from 'vue'
import FrameSelectionGroup from '../src/group.vue'
import FrameSelectionItem from '../src/item.vue'

const isClick = false

const isInTheBoxList = []
const innerBoxRectList = []
const selectedSet = new Set()
const selection = ref()
interface Props {
    modelValue?: string[]
    valueKey?: string
}

withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  valueKey: 'id'
})
// const totalCalendarArray = computed(({ calendarArray }) => {
//   return calendarArray.reduce((acc, cur) => {
//     acc = acc.concat(cur)
//     return acc
//   }, [])
// })

// function clear () {
//   this.selectedSet.clear()
// }
// function isSelected (item, index, pidx) {
//   const notDisabled = !item.disabled
//   const idx = (pidx - 1) * this.calendarItemCount + index
//   return (
//     notDisabled && (this.isInTheBoxList[idx] || this.checkSelected(idx))
//   )
// }
// function checkSelected (idx) {
//   return this.selectedSet.has(idx)
// }
function onMousedown () {
//   isClick = true
//   innerBoxRectList = selection.getInnerBoxRectList()
}

function onMousemove () {
//   isClick = false
//   inBoxSync()
}
function onMouseup () {
  // if (isClick) {
  // .inBoxSync()
  // }

  // isInTheBoxList
  //     .reduce((acc, cur, idx) => {
  //         if (cur) {
  //             acc.push(idx)
  //         }
  //         return acc
  //     }, [])
  //     .forEach((x) => {
  //         if (!totalCalendarArray[x].disabled) {
  //             if (isClick) {
  //                 // toggle
  //                 if (selectedSet.has(x)) {
  //                     selectedSet.delete(x)
  //                 } else {
  //                     selectedSet.add(x)
  //                 }
  //             } else {
  //                 selectedSet.add(x)
  //             }
  //         }
  //     })

  // isInTheBoxList = []
  // isClick = false
}
// function inBoxSync() {
//     isInTheBoxList = this.innerBoxRectList.map((rect) => {
//         return this.$refs.selection.isInTheSelection(rect)
//     })
// }

</script>

<style lang="scss">
@mixin responsive-grid-items($container-width, $card-width, $col-num) {
    @apply grid grid-cols-1;

    @if $col-num>1 {
        @for $i from 2 through $col-num {

            // @debug $container-width - $card-width * ($col-num - $i);
            @media screen and (min-width: $container-width - $card-width * ($col-num - $i)) {
                @apply grid-cols-#{$i};
            }
        }
    }
}

.date-selection-area {
    @include responsive-grid-items(1920px, 236px, 6);
}

// .frame-selection-rectangle-element {
//   border-style: dashed !important;
// }
</style>
