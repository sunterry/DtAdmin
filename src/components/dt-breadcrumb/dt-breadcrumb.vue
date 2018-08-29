<template>
  <Breadcrumb class="dt-breadcrumb">
    <BreadcrumbItem v-for="item in breadCrumbList" :key="`bread-${item.name}`">
      <dt-icon v-show="showIcon" :type="getIcon(item)" />
      <span>{{getTitle(item)}}</span>
    </BreadcrumbItem>
  </Breadcrumb>
</template>

<script>
import DtIcon from '@components/dt-icon/dt-icon'
export default {
  name: 'dt-breadcrumb',
  props: {
    breadCrumbList: {
      type: Array,
      default: () => []
    },
    showIcon: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getTitle (item) {
      return item.meta && item.meta.title
    },
    getIcon (item) {
      return (item.meta && item.meta.icon) || ''
    }
  },
  components: {
    DtIcon
  }
}
</script>

<style scoped lang="less">
  .no-select{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .dt-breadcrumb {
    .no-select
  }
</style>
