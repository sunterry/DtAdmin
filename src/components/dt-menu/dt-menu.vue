<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <Menu
      :theme="theme"
      :width="width"
      :accordion="accordion"
      :mode="mode"
      :active-name="activeName"
      :open-names="openNames"
    >
      <template v-for="item in menuList">
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
            <dt-icon :icon="getIcon(item)" :size="14"/>
            <span>{{ getTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div></div>
  </div>
</template>

<script>
import mixin from '_lib/mixin';
import DtMenuItemChild from './components/dt-menu-item-child.vue';

export default {
  name: 'dtMenu',
  mixins: [mixin],
  props: {
    isCollapsible: {
      props: Boolean,
      default: false,
    },
    width: {
      type: String,
      default: 'auto',
    },
    theme: {
      type: String,
      default: 'dark',
    },
    accordion: {
      type: Boolean,
      default: false,
    },
    mode: {
      type: String,
      default: 'vertical',
    },
    activeName: [String, Number],
    openNames: {
      type: Array,
      default: () => [],
    },
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    DtMenuItemChild,
  },
};
</script>

<style scoped lang="less">

</style>
