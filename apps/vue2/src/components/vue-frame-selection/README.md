# vue-frame-selection

> a frame selection component for vue2 and vue3

- [vue-frame-selection](#vue-frame-selection)
  - [Preview](#preview)
  - [Usage](#usage)
    - [Vue2](#vue2)
    - [Vue3](#vue3)
  - [Props](#props)
    - [FrameSelectionGroup](#frameselectiongroup)
      - [Slot](#slot)
    - [FrameSelectionItem](#frameselectionitem)
      - [Slot](#slot-1)
  - [APIs](#apis)
    - [FrameSelectionGroup](#frameselectiongroup-1)
      - [getInnerBoxRectList](#getinnerboxrectlist)
      - [isInTheSelection](#isintheselection)

## Preview

[Live Demo](https://www.icebreaker.top/demos/vue-frame-selection) | [Gif](https://github.com/sonofmagic/universal-vue-library-template/blob/main/apps/vue2/src/components/vue-frame-selection/assets/demo.gif)

## Usage

```sh
# vue2
npm i vue-frame-selection
# or
yarn add vue-frame-selection

#vue3
npm i vue-frame-selection@next
#or
yarn add vue-frame-selection@next
```

### Vue2


<details>
<summary>Usage Demo</summary>

```ts
// demo.vue
import {
  // wrap group
  FrameSelectionGroup,
  // items
  FrameSelectionItem,
  // inner es6 class
  MouseSelection
} from 'vue-frame-selection'

export default {
  components: {
    FrameSelectionGroup,
    FrameSelectionItem
  }
}
```

```html
<FrameSelectionGroup
  ref="selection"
  @mousedown="onMousedown"
  @mousemove="onMousemove"
  @mouseup="onMouseup"
>
  <FrameSelectionItem v-for="(item, idx) in data" :key="item[valueKey]">
    <template>
      <slot
        :selected="
          !item.disabled && (isInTheBoxList[idx] || checkSelected(idx))
        "
        :item="item"
        :index="idx"
      ></slot>
    </template>
  </FrameSelectionItem>
</FrameSelectionGroup>
```

```js
// you can write your own logic
export default {
  name: 'FrameSelection',
  components: {
    FrameSelectionGroup,
    FrameSelectionItem
  },
  props: {
    data: {
      type: [Array],
      default: () => []
    },
    valueKey: {
      type: [String],
      default: 'id'
    }
  },
  data () {
    return {
      // boolean array
      isInTheBoxList: [],
      // each item's offset (top,left,width,height)
      innerBoxRectList: [],
      // selected item index set
      selectedSet: new Set()
    }
  },
  methods: {
    checkSelected (id) {
      return this.selectedSet.has(id)
    },
    onMousedown () {
      this.isClick = true
      this.innerBoxRectList = this.$refs.selection.getInnerBoxRectList()
    },

    onMousemove () {
      this.isClick = false
      this.inBoxSync()
    },
    onMouseup () {
      if (this.isClick) {
        this.inBoxSync()
      }

      this.isInTheBoxList
        .reduce((acc, cur, idx) => {
          if (cur) {
            acc.push(idx)
          }
          return acc
        }, [])
        .forEach((x) => {
          if (!this.data[x].disabled) {
            this.selectedSet.add(x)
          }
        })

      this.isInTheBoxList = []
      this.isClick = false
    },
    inBoxSync () {
      this.isInTheBoxList = this.innerBoxRectList.map((rect) => {
        return this.$refs.selection.isInTheSelection(rect)
      })
    }
  },
  created () {
    this.isClick = false
  }
}
```

Full features See [`demo`](https://github.com/sonofmagic/universal-vue-library-template/blob/main/apps/vue2/src/components/vue-frame-selection/demo/index.vue)

</details>


### Vue3

<details>
<summary>Usage Demo</summary>

```html
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
import { FrameSelectionGroup, FrameSelectionItem }  from 'vue-frame-selection'
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
```


</details>



## Props

### FrameSelectionGroup

| name               | type    | default   | description                                               |
| ------------------ | ------- | --------- | --------------------------------------------------------- |
| className          | String  | undefined | Rectangle Selection customClassName                       |
| scale              | Number  | 1         | if you add css transform  scale you should add this param |
| zIndex             | Number  | 99999999  | Rectangle  zIndex Selection                               |
| disabled           | Boolean | false     | is disabled                                               |
| stopPropagation    | Boolean | false     | whether invoke event.stopPropagation()                    |
| stopSelector       | String  | undefined | _selectStart  at                                          |
| notSetWrapPosition | Boolean | false     | whether add position: relative                            |

#### Slot

| name    | description  |
| ------- | ------------ |
| default | default slot |

### FrameSelectionItem

#### Slot

| name    | description  |
| ------- | ------------ |
| default | default slot |

## APIs

### FrameSelectionGroup

#### getInnerBoxRectList

Get all child `FrameSelectionItem` and get it's offset postition (top,left,width,height)

```js
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
```

#### isInTheSelection

return a boolean array, for check if the item is in the selection.

```js
// rect is {top,left,width,height}
isInTheSelection (rect) {
  if (this.selection) {
    return this.selection.isInTheSelection(rect)
  }
}
```




