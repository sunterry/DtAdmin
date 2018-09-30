import DtIcon from '_c/dt-icon';

export default {
  components: {
    DtIcon,
  },
  methods: {
    getTitle(item) {
      return (item.meta && item.meta.title) || item.name;
    },
    getIcon(item) {
      return item.icon || item.meta.icon || '';
    },
    getNameOrHref(item, children) {
      if (item.href) {
        return `hasHref_${item.href}`;
      }
      return children ? item.children[0].name : item.name;
    },
  },
};
