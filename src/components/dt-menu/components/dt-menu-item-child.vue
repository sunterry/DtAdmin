<template>
  <submenu :name="parentName">
    <template slot="title">
      <dt-icon :icon="getIcon(parentItem)" :size="14" />
      <span>{{ getTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <dt-menu-item-child
          v-if="showChildren(item)"
          :key="`menu-item-${item.name}`"
          :parent-item="item"
        />
        <menu-item
          v-else
          :key="`menu-item-${item.children[0].name}`"
          :name="getNameOrHref(item, true)"
        >
          <dt-icon :icon="getIcon(item.children[0])" :size="14" />
          <span>{{ getTitle(item.children[0]) }}</span>
        </menu-item>
      </template>
      <template v-else>
        <dt-menu-item-child
          v-if="showChildren(item)"
          :key="`menu-item-${item.name}`"
          :parent-item="item"
        />
        <menu-item
          v-else
          :key="`menu-item-${item.name}`"
          :name="getNameOrHref(item)"
        >
          <dt-icon :icon="getIcon(item)" :size="14" />
          <span>{{ getTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
  </submenu>
</template>

<script>
import mixin from '_lib/mixin';

export default {
  name: 'dt-menu-item-child',
  mixins: [mixin],
  props: {
    parentItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
    parentName() {
      return this.parentItem.name;
    },
    children() {
      return this.parentItem.children;
    },
  },
};
</script>

<style scoped>

</style>
