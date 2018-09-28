<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
@import "assets/css/variable";
html, body, #app, .ivu-layout {
  width: 100%;
  height: 100%;
  font-size: @desc-size;
  background: #f8f8f9;
}
</style>
