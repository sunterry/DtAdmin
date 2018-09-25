<template>
  <div>
    <Breadcrumb :separator="separator">
      <BreadcrumbItem
        v-for="item in dataSource"
        :key="`bread-crumb-${item.name}`"
        :to="item.to"
        :replace="item.replace"
      >

        <dt-icon :icon="getIcon(item)" :size="iconSize" />
        <span class="bread-crumb-title">{{ getTitle(item) }}</span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import mixin from '_lib/mixin';

export default {
  name: 'dt-breadcrumb',
  mixins: [mixin],
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    separator: {
      type: String,
      default: '/',
    },
    iconSize: {
      type: Number,
      default: 14,
    },
  },
};
</script>

<style scoped>
  .bread-crumb-title {
    padding: 0 2px;
    font-size: 14px;
  }
</style>
