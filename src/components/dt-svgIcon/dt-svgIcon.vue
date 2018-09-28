<template>
  <svg
    class="icon"
    aria-hidden="true"
    :style="styles"
  >
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'dtSvgIcon',
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`;
    },
    styles() {
      return {
        fontSize: `${this.size}px`,
      };
    },
  },
};
</script>
<style lang="less" scoped>
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
