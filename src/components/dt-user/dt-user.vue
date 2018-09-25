<template>
  <Dropdown
    :trigger="trigger"
    :visible="visible"
    :placement="placement"
    :transfer="transfer"
    @on-click="handleClick"
    @on-visible-change="handleVisible"
    class="dt-avatar"
  >
    <div>
      <Avatar
        :shape="shape"
        :size="size"
        :src="src"
        :icon="icon"
        :customIcon="customIcon"
      />
      <span class="dt-avatar__user">{{userName}}</span>
      <Icon
        :type="iconType"
        :color="iconColor"
        :size="iconSize"
        :class="triggerClass"
      />
    </div>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item, index) in dropSource"
          :key="`drop-down-menu-${index}`"
          :name="item.type"
          :disabled="item.disabled"
          :divided="item.divided"
          :selected="item.selected"
        >
          <dt-icon
            :icon="getIcon(item)"
            :size="14"
          />
          <span class="dt-drop-select">{{ getTitle(item) }}</span>
        </DropdownItem>
      </DropdownMenu>
  </Dropdown>
</template>

<script>
import { oneOf } from '_lib/tools';
import mixin from '_lib/mixin';

export default {
  name: 'dt-user',
  mixins: [mixin],
  data() {
    return {
      visibleTrigger: false,
    };
  },
  computed: {
    triggerClass() {
      return this.visibleTrigger ? 'trigger' : '';
    },
  },
  props: {
    shape: {
      validator(value) {
        return oneOf(value, ['circle', 'square']);
      },
      default: 'circle',
    },
    size: {
      validator(value) {
        return oneOf(value, ['small', 'large', 'default']);
      },
      default: 'small',
    },
    src: {
      type: String,
    },
    icon: {
      type: String,
    },
    customIcon: {
      type: String,
    },
    iconType: {
      type: String,
      default: 'md-arrow-dropdown',
    },
    iconColor: {
      type: String,
      default: '#464c5b',
    },
    iconSize: {
      type: Number,
      default: 20,
    },
    dropSource: {
      type: Array,
      default: () => [],
    },
    trigger: {
      validator(value) {
        return oneOf(value, [
          'hover',
          'click',
          'contextMenu',
          'custom',
        ]);
      },
      default: 'click',
    },
    visible: {
      type: Boolean,
      default: false,
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    placement: {
      validator(value) {
        return oneOf(value, [
          'top',
          'top-start',
          'top-end',
          'bottom',
          'bottom-start',
          'bottom-end',
          'left',
          'left-start',
          'left-end',
          'right',
          'right-start',
          'right-end',
        ]);
      },
      default() {
        return 'bottom';
      },
    },
    userName: {
      type: String,
      default: 'Admin',
    },
  },
  methods: {
    handleClick(type) {
      this.$emit('on-change', type);
    },
    handleVisible(visibleTrigger) {
      this.visibleTrigger = visibleTrigger;
    },
  },
};
</script>

<style lang="less" scoped>
  @import './../../assets/css/mixin';
  @import "./../../assets/css/variable";
  .dt-avatar {
    .no-select;
    cursor: pointer;
    transition: transfrom .5s ease;
    .trigger{
      transform: rotateZ(-180deg);
      transition: transfrom .3s ease;
    }
    .dt-avatar__user {
      font-size: @secondary-size;
      font-weight: @weight;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      padding: 0 5px;
    }
  }
</style>
