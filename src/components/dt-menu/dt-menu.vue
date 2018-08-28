<template>
  <div class="dt-menu">
    <slot />
    <Menu
      ref="menu"
      :mode="mode"
      :theme="theme"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :width="width"
      @on-open-change="openChange"
      @on-select="onSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <dt-side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            v-else
            :key="`menu-${item.children[0].name}`"
            :name="getNamehasHref(item, true)"
          >
            <dt-icon :type="getIcon(item.children[0])"/>
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <dt-side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          />
          <menu-item
            v-else
            :name="getNamehasHref(item)"
            :key="`menu-${item.name}`"
          >
            <dt-icon :type="getIcon(item)"/>
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
  </div>
</template>

<script>
import DtSideMenuItem from './dt-side-menu-item'
import unionWith from 'lodash/unionWith'
import mixin from './mixin'
export default {
  name: 'dt-menu',
  mixins: [mixin],
  data () {
    return {
      openedNames: []
    }
  },
  props: {
    mode: {
      type: String,
      default: 'vertical'
    },
    theme: {
      type: String,
      default: 'dark'
    },
    activeName: {
      type: String,
      required: true
    },
    openNames: {
      type: Array,
      default: () => []
    },
    accordion: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String],
      default: 'auto'
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    // 通过active-name 的变化来确定当前应该展开哪一个
    activeName (name) {
      if (this.accordion) this.openedNames = this.getOpenedNamesByActiveName(name)
      else this.openedNames = this.getOpenedNames(name)
    },
    // 当前激活的路由
    openNames (newNames) {
      this.openedNames = newNames
    },
    openedNames () {
      this.$nextTick(() => {
        this.$refs.menu.updateOpened()
      })
    }
  },
  mounted () {
    this.openedNames = this.getOpenedNames(this.activeName)
  },
  methods: {
    // 当前展开的subMenu 的 name 值数组
    openChange (value) {
      this.$emit('on-open-change', value)
    },
    // 选择的Menu菜单
    onSelect (name) {
      this.$emit('on-select-change', name)
    },
    // 展开的数组驱虫
    getOpenedNames (name) {
      return unionWith(this.openedNames, this.getOpenedNamesByActiveName(name))
    },
    // 通过获取当前选中的路由来判断应该展开哪一个 ['components', 'components/icon']  => ['components']
    getOpenedNamesByActiveName (name) {
      return this.$route.matched.map(item => item.name).filter(item => item !== name)
    },
    updateOpenName (name) {
      if (name === 'home') this.openedNames = []
      else this.openedNames = this.getOpenedNamesByActiveName(name)
    }
  },
  components: {
    DtSideMenuItem
  }
}
</script>

<style scoped>

</style>
