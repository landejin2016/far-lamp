<template>
  <section>
    <van-nav-bar v-bind="$attrs" v-on="$listeners" @click-left="toBack" :border="border" :left-arrow="false">
      <slot name="left" slot="left">
        <van-icon name="arrow-left" color="#999" size="0.5rem" v-if="leftArrow"/>
      </slot>
      <slot name="right" slot="right">
        <van-icon name="more-o" v-if="!hideRight" color="#999" size="0.4rem"/>
      </slot>
    </van-nav-bar>
  </section>
</template>
<script lang="ts">
import { NavBar } from 'vant';
import Vue from 'vue';
import Component from 'vue-class-component';

const NavbarProps = Vue.extend({
  props: {
    hideRight: {
      type: Boolean
    },
    back: {
      type: Boolean,
      default: true
    },
    border: {
      type: Boolean,
      default: false,
    },
    leftArrow: {
      type: Boolean,
      default: true
    }
  }
});

@Component({
    name: 'PageLayout',
    components: {
        vanNavBar: NavBar
    }
})
export default class PageNavBar extends NavbarProps {
  private toBack(): void {
    if (this.back) {
      this.$router.back();
    }
    this.$emit('click-left');
  }
}
</script>