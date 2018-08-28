<template>
  <Dropdown @on-click="handleClick">
    <Avatar v-show="avator" :src="avator" />
    <Avatar v-show="!avator" style="color: #f56a00;background-color: #fde3cf">Admin</Avatar>
    <span>{{username}}</span><Icon :size="18" type="md-arrow-dropdown"></Icon>
    <DropdownMenu slot="list">
      <DropdownItem name="logout">退出登录</DropdownItem>
      <DropdownItem name="github">GITHUB</DropdownItem>
    </DropdownMenu>
  </Dropdown>
</template>

<script>
import {mapActions} from 'vuex'

export default {
  name: 'dt-user',
  props: {
    userinfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    username () {
      return this.userinfo && this.userinfo.admin_true_name
    },
    avator () {
      return this.userinfo && this.userinfo.avator
    }
  },
  methods: {
    ...mapActions([
      'handleLogOut'
    ]),
    handleClick (name) {
      switch (name) {
        case 'logout':
          this.handleLogOut().then(() => {
            this.$router.push({
              name: 'login'
            })
          })
          break
      }
    }
  }
}
</script>

<style scoped lang="less">
  span {
    margin: 0 2px;
    font-weight: bold;
    color: #333;
  }
</style>
