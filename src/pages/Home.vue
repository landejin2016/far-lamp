<template>
  <div class="home">
    <page-layout title="首页"></page-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {
  private message: string = 'landejin';
}
</script>
