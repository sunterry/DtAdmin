<template>
  <div class="hello">
    <dt-bread-crumb :dataSource="dataSource" />
    <h1>{{ msg }}</h1>
    <DtUser src="https://i.loli.net/2017/08/21/599a521472424.jpg"
      size="large"
      icon="ios-person"
      :dropSource="dropSource"
      placement="bottom"
      @on-change="handleChange"
    >
      <span class="user">Admin</span>
    </DtUser>
  </div>
</template>

<script>
import DtBreadCrumb from '@/components/dt-breadCrumb';
import DtUser from '@/components/dt-user';

export default {
  name: 'HelloWorld',
  data() {
    return {
      dataSource: [
        { name: 'home', meta: { title: '首页' }, to: 'home' },
        { name: 'scenic', meta: { title: '景区' }, to: 'scenic' },
      ],
      dropSource: [
        { name: 'logout', title: '退出登录' },
        { name: 'editPass', title: '修改密码' },
      ],
    };
  },
  props: {
    msg: String,
  },
  methods: {
    handleChange(type) {
      switch (type) {
        case 'logout':
          break;
        case 'editpass':
          break;
        default:
          break;
      }
    },
  },
  components: {
    DtBreadCrumb,
    DtUser,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../assets/css/variable";
.user{
  font-size: @secondary-size;
  font-weight: @weight;
  margin-left: 5px;
  vertical-align: middle;
}
</style>
