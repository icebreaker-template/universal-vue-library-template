<template>
  <div class="som-calendar-wrap">
    <div class="month-label">{{ month }}月</div>
    <div class="main-content">
      <div class="date-row axis">
        <div class="row-item" :key="x" v-for="x in xAxisArr">{{ x }}</div>
      </div>
      <div class="date-row">
        <template v-for="(item, idx) in items">
          <slot :item="item" :index="idx">
            <div
              class="row-item"
              :class="[
                {
                  disabled: item.disabled,
                  selected: item.selected
                }
              ]"
              :key="item.value"
              @click="onClick(item)"
            >
              {{ item.text }}
            </div>
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import dayjs from 'dayjs'
import Vue from 'vue'

const xAxisArr = ['日', '一', '二', '三', '四', '五', '六']

interface IDateItem {
  id: string
  text: number
  disabled: boolean
  value: string
  type?: string
  selected: boolean
  color: string | null
}

export default Vue.extend({
  data () {
    const items: IDateItem[] = []
    return {
      xAxisArr,
      items
    }
  },
  props: {
    // now: {
    //   type: [Object],
    //   default: () => dayjs()
    // },
    month: {
      type: [Number],
      default: 1
    },
    year: {
      type: [Number],
      default: 2022
    },
    value: {
      type: [Set],
      default: () => new Set()
    }
    // genId
  },
  watch: {
    month () {
      this.sync()
    },
    year () {
      this.sync()
    }
  },
  computed: {
    _dates (): {
      workday: IDateItem[]
      saturday: IDateItem[]
      sunday: IDateItem[]
      } {
      const workday: IDateItem[] = []
      const saturday: IDateItem[] = []
      const sunday: IDateItem[] = []
      let p: IDateItem[]
      for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i]
        const idx = i % 7
        if (idx === 0) {
          p = sunday
        } else if (idx === 6) {
          p = saturday
        } else {
          p = workday
        }
        if (!item.disabled) {
          p.push(item)
        }
      }
      return {
        workday,
        saturday,
        sunday
      }
    },
    workday (): IDateItem[] {
      return this._dates.workday
    },
    saturday (): IDateItem[] {
      return this._dates.saturday
    },
    sunday (): IDateItem[] {
      return this._dates.sunday
    }
  },
  methods: {
    valueFormat (year: number, month: number, date: number) {
      return [year, month + 1, date].join('-')
    },
    onClick (item: IDateItem) {
      if (!item.disabled) {
        if (item.selected) {
          this.value.delete(item.value)
        } else {
          this.value.add(item.value)
        }

        item.selected = !item.selected
      }
    },
    createDateItem (item: Partial<IDateItem>): IDateItem {
      return Object.assign<
        Partial<IDateItem>,
        Partial<IDateItem>,
        Partial<IDateItem>
      >(
        {},
        {
          disabled: true,
          selected: false,
          color: null
        },
        item
      ) as IDateItem
    },
    getItems () {
      const { year, month } = this
      // Months are zero indexed, so January is month 0.
      const now = dayjs()
        .year(year)
        .month(month - 1)
      const daysInMonth = now.daysInMonth()
      const start = now.startOf('month')
      const prevMonth = now.add(-1, 'month')
      const nextMonth = now.add(1, 'month')
      const prevMonthEnd = prevMonth.endOf('month')
      const prevMonthEndDate = prevMonthEnd.date()
      const startIdx = start.day()
      const arr = new Array(6 * 7).fill(0).map((_x, idx) => {
        const offset = idx - startIdx
        // 上个月
        if (offset < 0) {
          const text = prevMonthEndDate + offset + 1

          return this.createDateItem({
            text,
            value: this.valueFormat(prevMonth.year(), prevMonth.month(), text)
          })
        } else if (offset >= daysInMonth) {
          // 下个月
          const text = offset - daysInMonth + 1
          const value = this.valueFormat(
            nextMonth.year(),
            nextMonth.month(),
            text
          )
          return this.createDateItem({
            text,
            value
          })
        }
        const text = offset + 1
        const value = this.valueFormat(now.year(), now.month(), text)
        const disabled = false
        return this.createDateItem({
          text,
          disabled,
          value,
          selected: this.value.has(value) && !disabled
        })
      })
      return arr
    },
    sync () {
      this.items = this.getItems()
      this.$emit('init', this.items)
    }
  },
  created () {
    this.sync()
  }
})
</script>

<style lang="scss" scoped>
.som-calendar-wrap {
  @apply w-[236px];
  .month-label {
    @apply select-none text-lg font-medium text-[#3380FF];
  }
  .main-content {
    @apply h-[188px];
    .date-row {
      @apply grid h-[161px] grid-cols-7;
      &.axis {
        @apply h-[26.8px];
        .row-item {
          @apply cursor-auto text-[#333333];
        }
      }
      .row-item {
        @apply flex h-5 w-5 cursor-pointer select-none items-center justify-center text-[13px] font-medium leading-[20px] text-[#666666] transition-colors;

        &.disabled {
          @apply cursor-not-allowed text-[#C0C4CC];
        }
        &.selected {
          @apply bg-[#3380ff] text-white #{!important};
        }
      }
    }
  }
}
</style>
