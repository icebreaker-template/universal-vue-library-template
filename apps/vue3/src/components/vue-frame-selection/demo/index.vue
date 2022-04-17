<template>
    <div class="p-4">
        <FrameSelectionGroup ref="selection" @mousedown="onMousedown" @mousemove="onMousemove" @mouseup="onMouseup">
            <FrameSelectionItem :key="i" v-for="i in 100 " class="w-10 h-10  inline-block select-none" :class="[
                isSelected(i - 1) ? 'bg-blue-500' : 'bg-gray-500',
            ]"></FrameSelectionItem>
        </FrameSelectionGroup>
    </div>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults, ref } from 'vue'
import FrameSelectionGroup from '../src/group.vue'
import FrameSelectionItem from '../src/item.vue'
import type { PositionSizeMap } from '../src/shared'
let isClick = false

const isInTheBoxListRef = ref<boolean[]>([])

let innerBoxRectList: PositionSizeMap[] = []
const selectedSet = ref<Set<number>>(new Set())

const selection = ref()
interface Props {
    modelValue?: string[]
    valueKey?: string
}
// toRefs(data)
withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  valueKey: 'id'
})

function checkSelected (idx: number) {
  return selectedSet.value.has(idx)
}

function isSelected (idx: number) {
  return (
    isInTheBoxListRef.value[idx] || checkSelected(idx)
  )
}

function inBoxSync () {
  isInTheBoxListRef.value = innerBoxRectList.map((rect) => {
    return selection.value.isInTheSelection(rect)
  })
}
function onMousedown () {
  isClick = true
  innerBoxRectList = selection.value.getInnerBoxRectList()
}

function onMousemove () {
  isClick = false
  inBoxSync()
}
function onMouseup () {
  if (isClick) {
    inBoxSync()
  }
  const sv = selectedSet.value
  isInTheBoxListRef.value
    .reduce<number[]>((acc, cur, idx) => {
      if (cur) {
        acc.push(idx)
      }
      return acc
    }, [])
    .forEach((x) => {
      if (isClick) {
        // toggle
        if (sv.has(x)) {
          sv.delete(x)
        } else {
          sv.add(x)
        }
      } else {
        sv.add(x)
      }
    })

  isInTheBoxListRef.value = []
  isClick = false
}

</script>
