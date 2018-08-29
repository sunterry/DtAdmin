<template>
  <div class="dt-logo">
    <slot>DtAdmin</slot>
  </div>
</template>

<script>
export default {
  name: 'dt-logo'
}
</script>

<style scoped lang="less">
  .dt-logo {
    height: 64px;
    padding: 10px;
    text-align: center;
    color: #fff;
    font-size: 28px;
    text-shadow: 5px 0 3px rgba(1px, 1px, 2px, 1);
    img {
      height: 44px;
      width: auto;
      display: block;
      margin: 0 auto;
    }
  }
</style>
