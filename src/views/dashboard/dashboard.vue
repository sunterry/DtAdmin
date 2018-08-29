<template>
  <div class="layout">
    <Layout class="dt-container">
      <Sider
        collapsible
        :collapsed-width="collapsedWidth"
        breakpoint="md"
        :width="width"
        :hide-trigger="hideTrigger"
        :default-collapsed="defaultCollapsed"
        :reverse-arrow="reverseArrow"
        @on-collapse="onCollapse"
        v-model="isCollapsed">
        <dt-menu
          ref="sideMenu"
          theme="dark"
          :active-name="$route.name"
          accordion
          :menu-list="menuList"
          @on-select-change="onSelected"
        >
          <dt-logo>
            <img :src="require('./../../assets/img/logo.png')" width="161" height="44" alt="">
          </dt-logo>
        </dt-menu>
      </Sider>
      <Layout>
        <Header class="dt-container__header">
          <dt-breadcrumb class="dt-breadcrumb" showIcon :breadCrumbList="breadCrumbList" />
          <dt-user class="dt-user" :userinfo="userinfo"/>
        </Header>
        <dt-title v-show="showTitle" placement="bottom-right" :title="title" />
        <Content  >
          <div class="dt-container__bar">
            <dt-scrolltab
              :routeValue="$route"
              :tagList="tagNavList"
              @input="tagNative"
              @on-close="closeNative"
              class="dt-container__bar__tag" />
          </div>
          <div class="dt-container__view">
            <Row>
              <Col span="24">
                <keep-alive :include="cacheList">
                  <router-view />
                </keep-alive>
              </Col>
            </Row>
          </div>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import DtBreadcrumb from '@/components/dt-breadcrumb/dt-breadcrumb'
import DtScrolltab from '@/components/dt-scrolltab/dt-scrolltab'
import DtMenu from '@components/dt-menu/dt-menu'
import DtTitle from '@components/dt-title/dt-title'
import DtUser from '@components/dt-user/dt-user'
import DtLogo from '@components/dt-logo/dt-logo'
import {DTADMIN} from '@/utils/dt-common-types'
import {getNewTagList, routeEqual, getNextRoute} from '@/utils/dt-util-router'
import filter from 'lodash/filter'
export default {
  name: 'dashboard',
  data () {
    return {
      isCollapsed: false,
      collapsible: true,
      hideTrigger: true,
      defaultCollapsed: false,
      reverseArrow: false,
      collapsedWidth: 78,
      width: 200,
      showTitle: false,
      title: '首页'
    }
  },
  computed: {
    ...mapGetters(['menuList', 'homeRoute', 'breadCrumbList', 'tagNavList', 'userinfo']),
    cacheList () {
      return this.tagNavList.length ? filter(this.tagNavList, item => !(item.meta && item.meta.notCache)).map(item => item.name) : []
    }
  },
  watch: {
    '$route' (targetRoute) {
      this.setBreadCrumb(targetRoute.matched)
      this.setDocumentTitle(targetRoute)
      this.setTagNavList(getNewTagList(this.tagNavList, targetRoute))
    }
  },
  mounted () {
    this.setBreadCrumb(this.$route.matched)
    this.setDocumentTitle(this.$route)
    this.setTagNavList()
    this.addTag({route: this.homeRoute})
  },
  methods: {
    ...mapMutations(['setBreadCrumb', 'setTagNavList', 'addTag']),
    // 展开收起的回调
    onCollapse (value) {
      console.log(value)
    },
    // 选择导航跳转
    onSelected (route) {
      let {name, params, query} = route
      if (typeof route === 'string') {
        name = route
      } else {
        params = route.params
        query = route.query
        name = route.name
      }
      if (name.indexOf('hasHrefInName_') === 0) {
        window.open(name.split('_')[1])
        return false
      } else {
        this.$router.push({
          name,
          params,
          query
        })
      }
    },
    // 设置title
    setDocumentTitle (route) {
      document.title = (route.meta && route.meta.title) || DTADMIN
      this.title = (route.meta && route.meta.title) || ''
    },
    // tag标签切换
    tagNative (value) {
      this.onSelected(value)
    },
    // 关闭标签
    closeNative (res, type, route) {
      let openName = ''
      if (type === 'all') {
        this.onSelected('home')
        openName = 'home'
      } else if (routeEqual(this.$route, route)) {
        if (type === 'others') {
          openName = route.name
        } else {
          const nextRoute = getNextRoute(this.tagNavList, route)
          this.$router.push(nextRoute)
          openName = nextRoute.name
        }
      }
      this.setTagNavList(res)
      this.$refs.sideMenu.updateOpenName(openName)
    }
  },
  components: {
    DtBreadcrumb,
    DtScrolltab,
    DtMenu,
    DtTitle,
    DtUser,
    DtLogo
  }
}
</script>

<style scoped lang="less">
  .dt-container {
    min-height: 100vh;
    &__header {
      padding: 0 30px;
      border-bottom: 1px solid #e6e6e6;
      background: #fff;
      display: flex;
      .dt-breadcrumb {
        flex: 1;
      }
      .dt-user {
        width: 100px;
      }
    }
    &__view {
      padding: 15px;
      background: #fff;
    }
    &__bar {
      display: flex;
      &__title {
        width: 140px;
        margin: 2px 0;
        line-height: 32px;
      }
      &__tag {
        width: 100%;
        height: 36px;
        overflow: hidden;
      }
    }
  }
</style>
