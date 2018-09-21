<template>
  <div>
    <Breadcrumb :separator="separator">
      <BreadcrumbItem
        v-for="item in dataSource"
        :key="`bread-crumb-${item.name}`"
        :to="item.to"
      >
        {{ getTitle(item) }}
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
  },
};
</script>
