<template>
  <div>
    <Breadcrumb :separator="separator">
      <BreadcrumbItem
        v-for="item in dataSource"
        :key="`bread-crumb-${item.name}`"
        :to="item.to"
        :replace="item.replace"
      >
        <span class="dt-bread-crumb">
          <dt-icon :icon="getIcon(item)" :size="iconSize" />{{ getTitle(item) }}
        </span>
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import mixin from '_lib/mixin';

export default {
  name: 'dtBreadcrumb',
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

<style scoped lang="less">
  .dt-bread-crumb {
    line-height: 64px;
    i {
      margin-right: 5px;
    }
  }
</style>
