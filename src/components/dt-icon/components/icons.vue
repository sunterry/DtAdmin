<template>
  <i :class="iconClass" :style="styles"></i>
</template>

<script>
export default {
  name: 'icons',
  props: {
    type: {
      type: String,
      required: true
    },
    color: {
      type: String,
      default: '#5c6b77'
    },
    size: {
      type: Number,
      default: 16
    }
  },
  computed: {
    iconClass () {
      return ['iconfont', `icon-${this.type}`]
    },
    styles () {
      return {
        fontSize: this.size + 'px',
        color: this.color
      }
    }
  }
}
</script>

<style scoped>

</style>
