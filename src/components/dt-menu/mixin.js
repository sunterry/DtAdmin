import DtIcon from '@components/dt-icon/dt-icon'
export default {
  methods: {
    getIcon (item) {
      return (item.meta && item.meta.icon) || ''
    },
    showTitle (item) {
      return (item.meta && item.meta.title) || item.name
    },
    getNamehasHref (item, children) {
      return item.href ? `hasHrefInName_${item.href}` : (children ? item.children[0].name : item.name)
    },
    showChildren (item) {
      return item.children && (item.children.length > 1 || (item.meta && item.meta.always))
    }
  },
  components: {
    DtIcon
  }
}
