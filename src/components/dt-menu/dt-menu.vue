<template>
  <Menu
    :theme="theme"
    :width="width"
    :accordion="accordion"
    :mode="mode"
    :active-name="activeName"
    :open-names="openNames"
  >
    <Submenu name="1">
      <template slot="title">
        <Icon type="ios-paper" />
        内容管理
      </template>
      <menu-item name="1-1">文章管理</menu-item>
      <menu-item name="1-2">评论管理</menu-item>
      <menu-item name="1-3">举报管理</menu-item>
    </Submenu>
    <Submenu name="2">
      <template slot="title">
        <Icon type="ios-people" />
        用户管理
      </template>
      <menu-item name="2-1">新增用户</menu-item>
      <menu-item name="2-2">活跃用户</menu-item>
    </Submenu>
    <Submenu name="3">
      <template slot="title">
        <Icon type="ios-stats" />
        统计分析
      </template>
      <MenuGroup title="使用">
        <menu-item name="3-1">新增和启动</menu-item>
        <menu-item name="3-2">活跃分析</menu-item>
        <menu-item name="3-3">时段分析</menu-item>
      </MenuGroup>
      <MenuGroup title="留存">
        <menu-item name="3-4">用户留存</menu-item>
        <menu-item name="3-5">流失用户</menu-item>
      </MenuGroup>
    </Submenu>
  </Menu>
</template>

<script>
export default {
  name: 'dtMenu',
  props: {
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
  },
};
</script>

<style scoped lang="less">

</style>
