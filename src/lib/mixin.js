export default {
  methods: {
    getTitle(item) {
      return (item.meta && item.meta.title) || item.name;
    },
  },
};
