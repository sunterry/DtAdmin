<template>
  <Dropdown
    :trigger="trigger"
    :visible="visible"
    :placement="placement"
    :transfer="transfer"
    @on-click="handleClick"
  >
    <div class="dt-avatar">
      <Avatar
        :shape="shape"
        :size="size"
        :src="src"
        :icon="icon"
        :customIcon="customIcon"
      />
      <slot></slot>
      <Icon :type="iconType" :color="iconColor" :size="iconSize" />
    </div>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(item, index) in dropSource"
          :key="`drop-down-menu-${index}`"
          :name="item.name"
          :disabled="item.disabled"
          :divided="item.divided"
          :selected="item.selected"
        >{{item.title}}</DropdownItem>
      </DropdownMenu>
  </Dropdown>
</template>

<script>
import { oneOf } from '_lib/tools';

export default {
  name: 'dt-user',
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
  },
  methods: {
    handleClick(type) {
      this.$emit('on-change', type);
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
  }
  .user{
    font-size: @secondary-size;
    font-weight: @weight;
    margin-left: 5px;
    vertical-align: middle;
  }
</style>
