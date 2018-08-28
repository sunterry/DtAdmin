<template>
  <Tag type="dot" color="primary"><span class="dt-title">{{`当前页面：${title}`}}</span></Tag>
</template>

<script>
export default {
  name: 'dt-title',
  props: {
    title: {
      type: String,
      default: '未找到该页面名称'
    }
  }
}
</script>

<style scoped lang="less">
.dt-title {
  color: #2D8cF0;
  font-weight: bold;
}
</style>
