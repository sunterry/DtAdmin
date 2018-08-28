<template>
  <component :is="iconType" :type="iconName" :size="iconSize" :color="iconColor"></component>
</template>

<script>
import Icons from './components/icons'
export default {
  name: 'dt-icon',
  components: {Icons},
  props: {
    type: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    color: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconType () {
      return this.type.indexOf('_') === 0 ? 'Icons' : 'Icon'
    },
    iconName () {
      return this.iconType === 'Icons' ? this.getCustomIconName(this.type) : this.type
    },
    iconSize () {
      return this.size || (this.iconType === 'Icons' ? 16 : undefined)
    },
    iconColor () {
      return this.color || ''
    }
  },
  methods: {
    getCustomIconName (type) {
      return type.slice(1)
    }
  }
}
</script>

<style scoped>

</style>
