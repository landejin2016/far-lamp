<template>
    <div class="home">
        <page-layout title="2020-01" leftText="" @clickLeft="openUserCenter" :back="false">
          <span slot="left">切换年月</span>
          <van-image slot="right" :src="avatar" :height="30" :width="30"></van-image>
          
          <ul class="date-list f-row-between date-list-fixed">
            <li v-for="item in weekList" :key="item" class="date-item">
              {{item}}
            </li>
          </ul>

          <van-swipe class="day-swipe" :loop="false" :show-indicators="false" lazy-render>
            <van-swipe-item v-for="item in 4" :key="item">
              <ul class="date-list f-row-between">
                <li v-for="day in 7" :key="day" :class="{active: active === day,'date-item': true}">
                  {{day}}
                </li>
              </ul>
            </van-swipe-item>
          </van-swipe>

           <div class="todo-list">
              <div class="day-item" v-for="item in 10" :key="item">
                <p class="day-item-title">标题</p>
                  <time class="day-item-close">x</time>
                <div class="f-row-between">
                  <time class="day-item-time">16:40</time>
                  <time class="day-item-time">更多</time>
                </div>
              </div>
            </div>

          <van-popup v-model="showPopup" position="top">
            <van-datetime-picker
              v-model="currentDate"
              type="year-month"
              title="选择年月"
              :show-toolbar="false"
              @change="selectTime"
            />
            <div class="popup-button-group">
              <div class="popup-button cancel" @click="showPopup = false">取消</div>
              <div class="popup-button config" @click="configTime">确定</div>
            </div>
          </van-popup>
        </page-layout>
    </div>
</template>

<script lang="ts">
import { Config } from '@/interface';
import Vue from 'vue';
import Component from 'vue-class-component';

@Component
export default class Home extends Vue {
    private message: string = 'landejin';
    private active: number = 1;
    private weekList: string[] = ['日', '一', '二', '三', '四', '五', '六'];
    private avatar: string = require('@/assets/image/logo.png');
    private showPopup: boolean = false;
    private currentDate: Config = new Date();

    private openUserCenter() {
      this.showPopup = true;
    }

    private selectTime() {
      console.log('滚动');
    }

    private configTime() {
      this.showPopup = false;
    }
}
</script>

<style lang="less" scoped>
.date-list {
  padding: 5px 10px;
  box-sizing: border-box;
  background: #fff;
  width: 100vw;

  .date-item {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.date-list-fixed {
  position: fixed;
  z-index: 9;
  top: 46px;
}

.day-swipe {
  position: fixed;
  z-index: 9;
  top: 85px;
  border-bottom: #f3f3f3 solid 1px;
  width: 100vw;

  .active {
    background: #333;
    color: #fff;
    border-radius: 4px;
  }
}

.todo-list {
  padding: 15px;
  padding-top: 100px;
}

.day-item {
  box-shadow: 0 2px 5px 5px #f3f3f3;
  border-radius: 8px;
  padding: 10px;
  position: relative;
  margin-bottom: 20px;

  &-title {
    font-size: 18px;
    padding-bottom: 15px;
  }

  &-time {
    font-size: 12px;
    color: #999999;
  }

  &-close {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 12px;
  }
}

.popup-button-group {
  display: flex;
  font-size: 14px;

  .popup-button {
    flex: 1;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .cancel {
    background: #f3f3f3;
  }
  
  .config {
    background: #333;
    color: #fff;
  }
}
</style>