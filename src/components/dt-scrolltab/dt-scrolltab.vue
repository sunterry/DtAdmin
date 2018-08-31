<template>
  <div class="dt-scroll-tab">
    <div class="dt-scroll-tab__common"  @click="handleScroll(240)">
       <Icon :size="18" class="prev" type="ios-arrow-back" />
    </div>
    <div class="dt-scroll-tab__scroll" ref="scrollOuter" @DOMMouseScroll="handlescroll" @mousewheel="handlescroll">
      <div ref="scrollBody" class="dt-scroll-tab__scroll--body" :style="{left: tagBodyLeft + 'px'}">
        <Tag
          ref="tagsPageOpened"
          v-for="(item, index) in tagList"
          :key="`tag-nav-${index}`"
          type="dot"
          :name="item.name"
          :closable="item.name !== 'home'"
          :color="isCurrentTag(item) ? 'warning' : 'default'"
          @click.native="tagSelect(item)"
          @on-close="closeTag(item)"
        >
          {{showTitle(item)}}
        </Tag>
      </div>
    </div>
    <div class="dt-scroll-tab__common"  @click="handleScroll(-240)">
      <Icon :size="18" class="next" type="ios-arrow-forward" />
    </div>
    <div class="dt-scroll-tab__common">
      <Dropdown transfer @on-click="handleTagsOption">
        <Icon :size="18" class="close" type="ios-close-circle-outline" />
        <DropdownMenu slot="list">
          <DropdownItem name="close-all">关闭所有</DropdownItem>
          <DropdownItem name="close-others">关闭其他</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  </div>
</template>

<script>
import {routeEqual} from '@/utils/dt-util-router'
import filter from 'lodash/filter'
export default {
  name: 'dt-scrolltab',
  data () {
    return {
      tagBodyLeft: 0,
      outerPadding: 4
    }
  },
  props: {
    routeValue: Object,
    tagList: {
      type: Array,
      default: () => []
    },
    isScroll: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentRouteObj () {
      const { name, params, query } = this.routeValue
      return { name, params, query }
    }
  },
  watch: {
    '$route' (to) {
      setTimeout(() => {
        this.getTagElementByName(to.name)
      }, 200)
    }
  },
  mounted () {
    setTimeout(() => {
      this.getTagElementByName(this.$route.name)
    }, 200)
  },
  methods: {
    handlescroll (e) {
      let type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = (e.wheelDelta) ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll (offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(this.tagBodyLeft + offset, outerWidth - bodyWidth)
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    handleTagsOption (type) {
      if (type === 'close-all') {
        // 关闭所有，除了home
        let res = this.tagList.filter(item => item.name === 'home')
        this.$emit('on-close', res, 'all')
      } else {
        let res = this.tagList.filter(item => routeEqual(this.currentRouteObj, item) || item.name === 'home')
        this.$emit('on-close', res, 'others', this.currentRouteObj)
        setTimeout(() => {
          this.getTagElementByName(this.currentRouteObj.name)
        }, 100)
      }
    },
    closeTag (current) {
      let res = filter(this.tagList, item => !routeEqual(current, item))
      this.$emit('on-close', res, undefined, current)
    },
    tagSelect (item) {
      this.$emit('input', item)
    },
    showTitle (item) {
      return item.meta && item.meta.title
    },
    isCurrentTag (item) {
      return routeEqual(this.routeValue, item)
    },

    moveToView (tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (tag.offsetLeft > -this.tagBodyLeft && tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(0, outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding)
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(tag.offsetLeft - (outerWidth - this.outerPadding - tag.offsetWidth))
      }
    },
    getTagElementByName (name) {
      this.$nextTick(() => {
        this.refsTag = this.$refs.tagsPageOpened
        this.refsTag.forEach((item, index) => {
          if (name === item.name) {
            let tag = this.refsTag[index].$el
            this.moveToView(tag)
          }
        })
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .no-select{
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .size{
    width: 100%;
    height: 100%;
  }
  .dt-scroll-tab{
    display: flex;
    height: 36px;
    .no-select;
    .size;
    &__common{
      width: 36px;
      background: #fff;
      height: 100%;
      text-align: center;
      line-height: 36px;
    }
    &__scroll{
      position: relative;
      flex: 1;
      overflow: hidden;
      &--body{
        height: 100%;
        display: inline-block;
        position: absolute;
        overflow: visible;
        white-space: nowrap;
        transition: left .3s ease;
        padding: 0 4px 0 4px;
        .ivu-tag-dot-inner{
          transition: background .2s ease;
        }
      }
    }
  }
</style>
