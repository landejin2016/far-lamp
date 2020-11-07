<style lang="less">
.home {
  height: 100%;
}
</style>

<template>
  <div class="home">
    <page-layout title="年">
      <van-swipe class="my-swipe" indicator-color="white" loop='false'>
        <van-swipe-item><plan title="2020年计划"></plan></van-swipe-item>
        <van-swipe-item><plan title="2021年计划"></plan></van-swipe-item>
      </van-swipe>
    </page-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import Plan from '../../components/Home/Plan/index.vue';
@Component({
  components: {
    Plan,
  },
})
export default class YearList extends Vue {}
</script>
