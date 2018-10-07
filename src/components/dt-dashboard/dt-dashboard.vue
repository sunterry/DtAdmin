<template>
  <Layout>
    <Sider
      v-model="isCollapsible"
      :collapsible="collapsible"
      :collapsed-width="collapsedWidth"
      :hide-trigger="hideTrigger"
      :default-collapsed="defaultCollapsed"
      :width="width"
      :breakpoint="breakpoint"
      :reverse-arrow="reverseArrow"
    >
      <DtMenu
        ref="dtMenu"
        :isCollapsible="isCollapsible"
        :menuList="menuList"
        :active-name="$route.name"
        @on-select="handleSelect"
      />
    </Sider>
    <Layout>
      <Header class="dt-header">
        <Row type="flex" justify="space-between">
          <i-col>
            <Row type="flex">
              <i-col>
                <Icon
                  :class="collaps"
                  @click.native="handleCollapsible"
                  type="md-menu"
                  :size="28"
                />
              </i-col>
              <i-col >
                <dt-bread-crumb :dataSource="breadCrumbList"  />
              </i-col>
            </Row>
          </i-col>
          <i-col>
            <DtUser
              :src="userInfo.avatar"
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
      <Content>
        <!--<dt-scroll-tab />-->
        <router-view />
      </Content>
    </Layout>
  </Layout>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';
import DtBreadCrumb from '_c/dt-breadCrumb';
import DtUser from '_c/dt-user';
import DtMenu from '_c/dt-menu';
import DtScrollTab from '_c/dt-scrollTab';
// import { getNewTagList } from '_lib/utils';

const collapsible = true; // 导航收缩
const collapsedWidth = 64; // 收缩宽度
const hideTrigger = true; // 隐藏默认的切换器
const defaultCollapsed = false; // 默认不收缩
const width = 230; // 导航宽度
const breakpoint = 'sm'; // xs,sm,md,lg,xl 或 xxl
const reverseArrow = false; // 反向图标不启用

export default {
  name: 'dtDashboard',
  data() {
    return {
      isCollapsible: false,
      collapsible,
      collapsedWidth,
      hideTrigger,
      defaultCollapsed,
      width,
      breakpoint,
      reverseArrow,
      value2: '',
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
  computed: {
    ...mapGetters(['userAuth', 'userInfo', 'menuList', 'breadCrumbList', 'homeRoute', 'tagNavList']),
    collaps() {
      return [
        'icon',
        this.isCollapsible ? 'trigger-rotate' : '',
      ];
    },
  },
  watch: {
    $route(newRoute) {
      // const {
      //   name, query, params, meta,
      // } = newRoute;
      // this.addTag({
      //   route: {
      //     name, query, params, meta,
      //   },
      //   type: 'push',
      // });
      this.setBreadCrumb(newRoute);
      // this.setTagNavList(getNewTagList(this.tagNavList, newRoute));
      this.$refs.dtMenu.updateOpenName(newRoute.name);
    },
  },
  methods: {
    ...mapActions(['loginOut']),
    ...mapMutations(['setBreadCrumb', 'addTag', 'setTagNavList']),
    // 用户组件下拉点击
    handleChange(name) {
      switch (name) {
        case 'logout':
          this.logout();
          break;
        default:
          break;
      }
    },
    // 退出
    logout() {
      this.loginOut().then(() => {
        this.$router.push('login');
      });
    },
    // 导航收缩
    handleCollapsible() {
      this.isCollapsible = !this.isCollapsible;
    },
    // 页面跳转
    handleSelect(route) {
      let { name, params, query } = {};
      if (typeof route === 'string') {
        name = route;
      } else {
        /* eslint prefer-destructuring: ["error", {AssignmentExpression: {array: true}}] */
        name = route.name;
        params = route.params;
        query = route.query;
      }
      if (name.indexOf('hasHref_') > -1) {
        window.open(name.split('_')[1]);
        return false;
      }
      this.$router.push({
        name,
        params,
        query,
      });
      return false;
    },
  },
  mounted() {
    this.setTagNavList();
    this.addTag({
      route: this.homeRoute,
    });
    this.setBreadCrumb(this.$route);
  },
  components: {
    DtBreadCrumb,
    DtUser,
    DtMenu,
    DtScrollTab,
  },
};
</script>

<style lang="less" scoped>
  .dt-header {
    background: #fff;
    border-bottom: 1px solid #f8f8f9;
    padding: 0 32px;
    .icon {
      cursor: pointer;
      margin-right: 20px;
      line-height: 64px;
      transition: transform .3s ease;
      &.trigger-rotate {
        transform: rotateZ(-90deg);
        transition: transform .3s ease;
      }
    }
  }
</style>
