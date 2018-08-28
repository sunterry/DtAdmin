<template>
  <Breadcrumb>
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

<style scoped>

</style>
