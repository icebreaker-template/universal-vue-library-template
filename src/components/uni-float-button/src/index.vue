<template>
  <view
    class="pointer-events-none fixed z-50"
    :style="{
      top: padding[0] + 'rpx',
      right: padding[1] + 'rpx',
      bottom: padding[2] + 'rpx',
      left: padding[3] + 'rpx',
    }"
  >
    <movable-area class="h-full w-full">
      <movable-view
        direction="all"
        @change="fabChange"
        @touchend="touchend"
        :x="position.x"
        :y="position.y"
        class="w-10 h-10"
      >
        <view v-if="$slots.expand">
          <slot name="expand"></slot>
        </view>

        <slot> </slot>
      </movable-view>
    </movable-area>
  </view>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import debounce from 'lodash/debounce'
const btnWidth = uni.upx2px(80)
const edgeWidth = uni.upx2px(32)
export default Vue.extend({
  props: {
    // 本地保存位置的 key
    storeKey: {
      type: String,
      default: ''
    },
    // 安全距离
    padding: {
      type: Array,
      default: () => [256, 32, 64, 32]
    }
  },
  data () {
    return {
      position: {
        x: 0,
        y: 0
      }
    }
  },
  computed: {
    // 获得的 systemInfo,用于获取屏幕宽度
    ...mapGetters(['systemInfo'])
  },

  methods: {
    onClick () {
      this.$emit('click')
    },
    async touchend () {
      console.log('touchend')
      setTimeout(() => {
        if (
          this.position.x >
          (this.systemInfo.windowWidth - btnWidth - edgeWidth * 2) / 2
        ) {
          this.position.x = this.systemInfo.windowWidth
        } else {
          this.position.x = 0
        }
        if (this.storeKey) {
          setTimeout(() => {
            // @ts-ignore
            uni.setStorageSync(
              this.storeKey,
              JSON.stringify({
                // @ts-ignore
                x: this.position.x,
                // @ts-ignore
                y: this.position.y
              })
            )
          }, 0)
        }
      }, 200)
    },
    resetToYaxis: debounce(function (x, y, source) {
      if (source) {
        this.position.x = x
        this.position.y = y
      }

      console.log('[Final]', x, y, source)
    }, 100),
    // @ts-ignore
    fabChange (event) {
      if (event && event.detail) {
        const { x, y, source } = event.detail
        // @ts-ignore
        this.resetToYaxis(x, y, source)
      }
    }
  },
  mounted () {},
  created () {
    if (this.systemInfo) {
      const { windowHeight, windowWidth } = this.systemInfo
      this.position.x = windowWidth
      this.position.y = windowHeight / 1.25
    }
    if (this.storeKey) {
      try {
        const p = uni.getStorageSync(this.storeKey)
        if (p) {
          Object.assign(this.position, JSON.parse(p))
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
})
</script>

<style>
</style>
