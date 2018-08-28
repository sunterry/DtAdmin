export default {
  props: {
    parentItem: {
      type: Object,
      default: () => {}
    },
    iconSize: {
      type: Number,
      default: 16
    }
  },
  computed: {
    parentName () {
      return this.parentItem.name
    },
    children () {
      return this.parentItem.children
    }
  }
}
