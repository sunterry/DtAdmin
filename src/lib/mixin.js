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
      return item.icon || '';
    },
  },
};
