<template>
  <Submenu :name="`${parentName}`">
    <template slot="title">
      <dt-icon :type="getIcon(parentItem)"/>
      <span>{{ showTitle(parentItem) }}</span>
    </template>
    <template v-for="item in children">
      <template v-if="item.children && item.children.length === 1">
        <dt-side-menu-item
          v-if="showChildren(item)"
          :key="`menu-${item.name}`"
          :parent-item="item"
        />
        <menu-item
          v-else
          :name="getNamehasHref(item, true)"
          :key="`menu-${item.children[0].name}`"
        >
          <dt-icon :type="getIcon(item.children[0])" />
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
          <dt-icon :type="getIcon(item)" />
          <span>{{ showTitle(item) }}</span>
        </menu-item>
      </template>
    </template>
  </Submenu>
</template>

<script>
import mixinItem from './mixin-item'
import mixin from './mixin'
export default {
  name: 'dt-side-menu-item',
  mixins: [mixin, mixinItem]
}
</script>
