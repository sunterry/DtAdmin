<template>
  <div>
    <div>
      <slot></slot>
    </div>
    <Menu
      v-show="!isCollapsible"
      ref="menu"
      :theme="theme"
      :width="width"
      :accordion="accordion"
      :mode="mode"
      :active-name="activeName"
      :open-names="openedNames"
      @on-select="onSelect"
      @on-open-change="onOpenChange"
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
  </div>
</template>

<script>
import mixin from '_lib/mixin';
import { getUnion } from '_lib/tools';
import DtMenuItemChild from './components/dt-menu-item-child.vue';

export default {
  name: 'dtMenu',
  mixins: [mixin],
  data() {
    return {
      openedNames: [],
    };
  },
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
  watch: {
    activeName(val) {
      if (this.accordion) {
        this.openedNames = this.getOpenedNamesByActiveName(val);
      } else {
        this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(val));
      }
    },
    openNames(val) {
      this.openedNames = val;
    },
    openedNames() {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened();
      });
    },
  },
  methods: {
    onSelect(name) {
      this.$emit('on-select', name);
    },
    onOpenChange(value) {
      this.$emit('on-open-change', value);
    },
    getOpenedNamesByActiveName(name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name);
    },
    updateOpenName(name) {
      if (name === 'home') this.openedNames = [];
      else this.openedNames = this.getOpenedNamesByActiveName(name);
    },
  },
  mounted() {
    /* eslint-disable-next-line */
    this.openedNames = getUnion(this.openedNames, this.getOpenedNamesByActiveName(name));
  },
  components: {
    DtMenuItemChild,
  },
};
</script>

<style lang="less" scoped>
  .dt-drop-down{
    .ivu-dropdown {
      display: block;
      text-align: center;
      line-height: 42px;
      &:hover {
        background: red;
      }
    }
  }
</style>
