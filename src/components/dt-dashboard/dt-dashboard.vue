<template>
  <Layout>
    <Sider
      v-model="isSider"
      :collapsible="collapsible"
      :collapsed-width="collapsedWidth"
      :hide-trigger="hideTrigger"
      :default-collapsed="defaultCollapsed"
      :width="width"
      :breakpoint="breakpoint"
      :reverse-arrow="reverseArrow"
    >
      <DtMenu />
    </Sider>
    <Layout>
      <Header class="dt-header">
        <Row type="flex" justify="space-between">
          <i-col>
            <dt-bread-crumb :dataSource="dataSource" />
          </i-col>
          <i-col>
            <DtUser
              src="https://i.loli.net/2017/08/21/599a521472424.jpg"
              size="large"
              icon="ios-person"
              :dropSource="dropSource"
              placement="bottom"
              user-name="Admin"
              @on-change="handleChange"
            />
          </i-col>
        </Row>
      </Header>
      <Content>Content</Content>
    </Layout>
  </Layout>
</template>

<script>
import DtBreadCrumb from '_c/dt-breadCrumb';
import DtUser from '_c/dt-user';
import DtMenu from '_c/dt-menu';

const collapsible = true;
const collapsedWidth = 64;
const hideTrigger = true;
const defaultCollapsed = false;
const width = 230;
const breakpoint = 'sm'; // xs,sm,md,lg,xl 或 xxl
const reverseArrow = false;

export default {
  name: 'dt-dashboard',
  data() {
    return {
      isSider: false,
      collapsible,
      collapsedWidth,
      hideTrigger,
      defaultCollapsed,
      width,
      breakpoint,
      reverseArrow,
      dataSource: [
        {
          name: 'home',
          meta: { title: '首页' },
          to: 'home',
          icon: 'home',
        },
        {
          name: 'scenic',
          meta: { title: '景区' },
          to: 'scenic',
          icon: 'rocket',
        },
      ],
      dropSource: [
        { type: 'logout', name: '退出登录', icon: 'logout' },
        {
          type: 'editPass',
          name: '修改密码',
          icon: 'edit-square',
          divided: true,
        },
      ],
    };
  },
  methods: {
    handleChange(name) {
      console.log(name);
    },
  },
  components: {
    DtBreadCrumb,
    DtUser,
    DtMenu,
  },
};
</script>

<style lang="less" scoped>
  .dt-header {
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    padding: 0 32px;
  }
</style>
