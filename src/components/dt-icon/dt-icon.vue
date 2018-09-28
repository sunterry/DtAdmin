<template>
  <i :class="iconName" :style="styles"></i>
</template>

<script>
import '@/assets/fonts/iconfont.css';

export default {
  name: 'dtIcon',
  props: {
    icon: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 20,
    },
    color: {
      type: String,
      default: '',
    },
  },
  computed: {
    iconName() {
      return ['iconfont', `icon-${this.icon}`];
    },
    styles() {
      return {
        fontSize: `${this.size}px`,
        color: `${this.color}`,
      };
    },
  },
};
</script>
